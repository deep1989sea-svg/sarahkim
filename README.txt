SNOWISE 안내 웹앱 — 배포 폴더
================================

폴더 구성
  index.html            페이지 본문 (문구 수정은 여기서)
  manifest.webmanifest  "홈 화면에 추가" 설치 정보 (앱 이름·아이콘·색)
  sw.js                 오프라인 캐시 (한 번 본 화면은 데이터 없이도 열림)
  assets/img/           이미지 27장   assets/video/  시연영상 2개
  assets/font/          SMU Snowflake 웹폰트   assets/icons/  앱 아이콘

무료로 올리는 법 (셋 중 하나, 전부 무료·카드 등록 없음)
  1) Netlify Drop — https://app.netlify.com/drop
     이 폴더를 통째로 끌어다 놓으면 끝. 바로 https://xxx.netlify.app 주소가 나옴.
     (가입하면 주소 이름 바꾸기·수정본 다시 올리기 가능)
  2) GitHub Pages — 저장소 만들고 이 폴더 내용을 올린 뒤
     Settings > Pages > Branch: main 선택 → https://아이디.github.io/저장소명/
  3) Cloudflare Pages — https://pages.cloudflare.com 에서 "Upload assets"로 폴더 업로드

수정할 때
  - index.html 고치고 같은 곳에 다시 올리면 됨.
  - 이미지·영상을 바꿨으면 sw.js 맨 위 VERSION 숫자를 하나 올릴 것 (v1 → v2).
    그래야 이미 설치한 사람 폰의 옛 캐시가 새 파일로 바뀜.

폰에 앱처럼 설치
  - iPhone: Safari에서 열고 공유 버튼 → "홈 화면에 추가"
  - Android: Chrome에서 열면 "설치" 또는 메뉴 → "홈 화면에 추가"
  - https 주소여야 설치·오프라인이 동작함 (위 세 서비스는 전부 https 기본)
