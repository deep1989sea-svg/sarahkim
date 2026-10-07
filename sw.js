// SNOWISE 안내 — 오프라인 캐시용 서비스워커
// 새 버전을 올릴 때는 아래 VERSION 숫자만 올리면 이전 캐시가 정리됩니다.
const VERSION = 'snowise-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // 구글 폰트 등 외부는 브라우저에 맡김

  // 페이지(index.html)는 네트워크 우선 — 수정본이 바로 반영되게
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('./')))
    );
    return;
  }

  // 이미지·영상·폰트는 캐시 우선 — 한 번 본 건 오프라인에서도 열림
  // (영상 구간 요청(Range)은 캐시를 건너뜀: 챕터 이동이 정확히 되도록)
  if (req.headers.get('range')) return;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
