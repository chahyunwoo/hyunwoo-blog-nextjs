# Changelog

## [2.1.0](https://github.com/chahyunwoo/hyunwoo-dev/compare/v2.0.1...v2.1.0) (2026-03-24)


### Features

* **admin:** 2FA 인증 플로우 구현 ([#64](https://github.com/chahyunwoo/hyunwoo-dev/issues/64)) ([317fb34](https://github.com/chahyunwoo/hyunwoo-dev/commit/317fb349be66875b73bae34ab08ce213e2c5191a))
* **admin:** 2FA 인증 플로우 구현 ([#64](https://github.com/chahyunwoo/hyunwoo-dev/issues/64)) ([fc4d531](https://github.com/chahyunwoo/hyunwoo-dev/commit/fc4d531b459660a273b411f5389679741755002e))
* **admin:** Mantine 제거 + packages/ui 공통 패키지 + shadcn/Tailwind 마이그레이션 ([#52](https://github.com/chahyunwoo/hyunwoo-dev/issues/52)) ([b624987](https://github.com/chahyunwoo/hyunwoo-dev/commit/b6249878c915a5cc469680bb2514e6fd60ade188))
* **admin:** 새 API 연동 + MonthPicker + highlights IME 버그 수정 + 편집 하이라이팅 ([#55](https://github.com/chahyunwoo/hyunwoo-dev/issues/55)) ([1caca2a](https://github.com/chahyunwoo/hyunwoo-dev/commit/1caca2a4d0780dffd7844f522b3db4dde3fb9517))
* **admin:** 인증 + 대시보드 + TanStack Router ([#44](https://github.com/chahyunwoo/hyunwoo-dev/issues/44)) ([2decbdd](https://github.com/chahyunwoo/hyunwoo-dev/commit/2decbdd284850584e8bdd68b00c88d1c4ca3c284))
* **admin:** 카테고리 삭제/수정 규칙 + API 타입 수정 ([#46](https://github.com/chahyunwoo/hyunwoo-dev/issues/46)) ([18efa64](https://github.com/chahyunwoo/hyunwoo-dev/commit/18efa6419eef88db6285af1acd2042129a3d33b7))
* **admin:** 포스트 CRUD + 카테고리 관리 + 페이지뷰 트래킹 ([#45](https://github.com/chahyunwoo/hyunwoo-dev/issues/45)) ([9c945d1](https://github.com/chahyunwoo/hyunwoo-dev/commit/9c945d10d52fbb82f3bb8f4ca1654479bf6b58a8))
* **admin:** 포트폴리오 CRUD + UI 전면 개선 ([#54](https://github.com/chahyunwoo/hyunwoo-dev/issues/54)) ([a3a7267](https://github.com/chahyunwoo/hyunwoo-dev/commit/a3a7267f616ee13aa2f7b2e59837c7dc08d8643d))
* API 연동 및 콘텐츠 분리 ([83cd2a7](https://github.com/chahyunwoo/hyunwoo-dev/commit/83cd2a7db757bead00febee7fa6770057f3afd48))
* API 연동 및 콘텐츠 분리 ([d32ced5](https://github.com/chahyunwoo/hyunwoo-dev/commit/d32ced5dd6e9d11e51e2f79bedf075d2c20e0f5f))
* 포트폴리오 API 전환, On-demand Revalidation, 에러 처리 강화 ([#36](https://github.com/chahyunwoo/hyunwoo-dev/issues/36)) ([11658d7](https://github.com/chahyunwoo/hyunwoo-dev/commit/11658d7986ec02bdb39f609a79ad167dee0405b7))


### Bug Fixes

* **admin:** 2FA 플로우 변경 (setup → enable 분리, 상태 표시, 비활성화) ([#66](https://github.com/chahyunwoo/hyunwoo-dev/issues/66)) ([1b08347](https://github.com/chahyunwoo/hyunwoo-dev/commit/1b08347ff1c4537424f36f661b514bf8cb9ce132))
* **admin:** skills description 빈 문자열 → undefined 변환 ([#57](https://github.com/chahyunwoo/hyunwoo-dev/issues/57)) ([37f5fc3](https://github.com/chahyunwoo/hyunwoo-dev/commit/37f5fc37d10de550c85c5930a2dd7792c2a09ae3))
* **admin:** Vite SPA rewrite 설정 추가 (vercel.json) ([69b1416](https://github.com/chahyunwoo/hyunwoo-dev/commit/69b1416af902febbab6d4e1b5899e2d97ecfc4c6))
* **admin:** 경력 DatePicker -&gt; YearPicker 연도 선택으로 변경 ([#63](https://github.com/chahyunwoo/hyunwoo-dev/issues/63)) ([6d71418](https://github.com/chahyunwoo/hyunwoo-dev/commit/6d71418221ddd171a4dc1f72f7852efba92fb892))
* **admin:** 이미지 프리뷰 브라우저 캐시 버스팅 (Date.now 쿼리 파라미터) ([#71](https://github.com/chahyunwoo/hyunwoo-dev/issues/71)) ([0fb2862](https://github.com/chahyunwoo/hyunwoo-dev/commit/0fb28621d06f2eac5c378b9bb14639a5d504c249))
* apiFetch URL 한글 pathname encode 처리 (x-next-cache-tags ERR_INVALID_CHAR 수정) ([#88](https://github.com/chahyunwoo/hyunwoo-dev/issues/88)) ([930924b](https://github.com/chahyunwoo/hyunwoo-dev/commit/930924b5026719968ed513c0979da92e3d56c800))
* biome warn 근본 수정 (post.ts 제외) ([043caf1](https://github.com/chahyunwoo/hyunwoo-dev/commit/043caf10457c379eb30c3c8e90f3820bbb5fbf76))
* **blog:** readingTime 서버 응답 사용 + estimateReadingTime 제거 ([#67](https://github.com/chahyunwoo/hyunwoo-dev/issues/67)) ([f6c5432](https://github.com/chahyunwoo/hyunwoo-dev/commit/f6c5432d0b8dd967796a7489a7acaef4b1ccba93))
* **blog:** skills API 응답 타입 변경 대응 (string → object) ([5630e2a](https://github.com/chahyunwoo/hyunwoo-dev/commit/5630e2a35b730be3c67ded476bd26344452067cb))
* **blog:** 라우트 전환 시 리스트 스켈레톤 대신 상세 스켈레톤 표시 ([#47](https://github.com/chahyunwoo/hyunwoo-dev/issues/47)) ([2b1047c](https://github.com/chahyunwoo/hyunwoo-dev/commit/2b1047c86057bc112b872634f8922e630e5d2cd9))
* **blog:** 썸네일 URL 한글 파일명 encodeURIComponent 처리 (500 수정) ([#87](https://github.com/chahyunwoo/hyunwoo-dev/issues/87)) ([5250434](https://github.com/chahyunwoo/hyunwoo-dev/commit/52504346c2d291d1f6170235573c3a2342e74bc2))
* **blog:** 썸네일 이미지 Next.js 캐시 버스팅 ([#70](https://github.com/chahyunwoo/hyunwoo-dev/issues/70)) ([b2d9112](https://github.com/chahyunwoo/hyunwoo-dev/commit/b2d91126928fdfdc054c63ae7f0bdaa6de96d280))
* **blog:** 코드리뷰 이슈 4건 수정 ([#90](https://github.com/chahyunwoo/hyunwoo-dev/issues/90)) ([e0549eb](https://github.com/chahyunwoo/hyunwoo-dev/commit/e0549eb4945c6fb8e806b31b651e315f16618e51))
* **blog:** 한글 slug 500 에러 근본 수정 - encodeURIComponent/decodeURIComponent 전부 제거, BLOG_POST cache tag 제거 ([#89](https://github.com/chahyunwoo/hyunwoo-dev/issues/89)) ([8c14a52](https://github.com/chahyunwoo/hyunwoo-dev/commit/8c14a528b922cb27c58aa7fbf6989fcc95b67136))
* **blog:** 한글 slug params decodeURIComponent 적용 (404 수정) ([#86](https://github.com/chahyunwoo/hyunwoo-dev/issues/86)) ([142fb4d](https://github.com/chahyunwoo/hyunwoo-dev/commit/142fb4db7567e424942bfe6f5fd41387b75717f5))
* **blog:** 한글 슬러그 캐시 태그 인코딩 + publishedAt 날짜 표시 ([#68](https://github.com/chahyunwoo/hyunwoo-dev/issues/68)) ([0ce4b81](https://github.com/chahyunwoo/hyunwoo-dev/commit/0ce4b8189fda6ad8a617fe44f18a61a494c8086b))
* Frontend Developer -&gt; Full-Stack Developer 메타데이터 전체 변경 ([#65](https://github.com/chahyunwoo/hyunwoo-dev/issues/65)) ([aa8aaf6](https://github.com/chahyunwoo/hyunwoo-dev/commit/aa8aaf617a8beb48259f66cc679e793b4671d918))
* Lighthouse CI 모노레포 대응 ([12b72fe](https://github.com/chahyunwoo/hyunwoo-dev/commit/12b72fece0fb870783fef9df9cbd932f28e155bc))
* Lighthouse CI 모노레포 대응 (blog 앱 서버 실행) ([f36043b](https://github.com/chahyunwoo/hyunwoo-dev/commit/f36043b6c71cfd4b6a058df35a64f9467e161636))
* **portfolio:** 마그네틱 레터 호버 전용으로 변경, 마우스 추적 패럴랙스 제거 ([#69](https://github.com/chahyunwoo/hyunwoo-dev/issues/69)) ([f76aed8](https://github.com/chahyunwoo/hyunwoo-dev/commit/f76aed827639116a3a57db0d6cd9a0203e204bd8))
* reactCompiler 설정 위치 변경 (experimental → root) ([f4c4557](https://github.com/chahyunwoo/hyunwoo-dev/commit/f4c4557974ca87b23c7ba4508b62fd60eb89baae))
* **ui:** 클라이언트 전용 컴포넌트에 'use client' 디렉티브 추가 ([#56](https://github.com/chahyunwoo/hyunwoo-dev/issues/56)) ([d79538b](https://github.com/chahyunwoo/hyunwoo-dev/commit/d79538bd3d8cbafde2aeb311aa0b6fd605bb2bae))
* useScrollVisibility SSR window 참조 에러 수정 ([e17747e](https://github.com/chahyunwoo/hyunwoo-dev/commit/e17747e52edb18d5c1130efe57274585e3ac444d))
* 링크 색상 green-500으로 원복 ([f454a81](https://github.com/chahyunwoo/hyunwoo-dev/commit/f454a814a876cb5872b95dc78d785850015ecab6))
* 상세 스켈레톤 TOC 영역 추가 + 로그아웃 refresh 무한 루프 수정 ([#48](https://github.com/chahyunwoo/hyunwoo-dev/issues/48)) ([a975ad0](https://github.com/chahyunwoo/hyunwoo-dev/commit/a975ad0908b9390e5bca7c38c0171abe279f4733))
* 스크롤 복원 수정 ([a4fdd1c](https://github.com/chahyunwoo/hyunwoo-dev/commit/a4fdd1c1004f8171a1f0add3a5d9d1ddb1590366))
* 연관/추천 게시글 위치 및 여백, 썸네일 크기 조정 ([c6b1557](https://github.com/chahyunwoo/hyunwoo-dev/commit/c6b155740bfe30ffc16a2cc830b1f966f0605283))
* 전역 smooth scroll 제거, 페이지 이동 시 즉시 스크롤 복원 ([2a20e20](https://github.com/chahyunwoo/hyunwoo-dev/commit/2a20e20fe2535d5ebc1fd516a7239fd3c4e738ad))
* 카드 높이 통일, 이미지 placeholder, 스켈레톤 크기 수정 ([c9f1115](https://github.com/chahyunwoo/hyunwoo-dev/commit/c9f111505cdbe9f802c3a179f5bc0b87d0e0cc27))
* 캐시 버스팅, 한글 slug, contact form 개선, 어드민 폼 공통화 ([#84](https://github.com/chahyunwoo/hyunwoo-dev/issues/84)) ([b96e5eb](https://github.com/chahyunwoo/hyunwoo-dev/commit/b96e5ebc7ac82446c3bbc7d86cbdb47f8c9a24c1))
* 캐시 태그 한글 slug를 ASCII 해시로 변환 (ERR_INVALID_CHAR 해결) ([#72](https://github.com/chahyunwoo/hyunwoo-dev/issues/72)) ([88d0a44](https://github.com/chahyunwoo/hyunwoo-dev/commit/88d0a44105321693ae119fc327e1af5b0212059e))
* 테스트를 API 응답 구조에 맞게 수정 ([3474534](https://github.com/chahyunwoo/hyunwoo-dev/commit/34745346724fcf975e857d4b2dad99332a285373))
* 페이지네이션 말줄임 처리 + 모바일 개행 방지 ([efcfdf5](https://github.com/chahyunwoo/hyunwoo-dev/commit/efcfdf587fce1caa71cade4530db67055aade4de))

## [2.0.1](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/compare/v2.0.0...v2.0.1) (2026-03-20)


### Performance Improvements

* CLS 최적화 및 터치 타겟 개선 ([b5b1e39](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/b5b1e3905f3020b7c0b792f3e9d06bfea7b9d21e))
* Lighthouse 100점 최적화 ([8c706d2](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/8c706d277783aae7c9b32ad53ef88bac74ccbcf1))
* 성능 최적화 및 데드코드 정리 ([8d6c5dd](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/8d6c5ddd1845040720c68aa4d1f3fce7b2e7b684))
* 성능 최적화 및 데드코드 정리 ([b2252e5](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/b2252e5f04c096e08c983d52e50e134c218dac4b))

## [2.0.0](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/compare/v1.0.0...v2.0.0) (2026-03-20)


### ⚠ BREAKING CHANGES

* 컬러 테마, 레이아웃, 검색, About 페이지 전면 개편

### Features

* 블로그 v2 디자인 리뉴얼 완료 ([b5a26f5](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/b5a26f5ba51eabfb5ae538f19de4f64d64f3d3ea))
* 블로그 디자인 전면 리뉴얼 v2 ([e66d49a](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/e66d49aede2a76f8d1efefcf86036aad2d3cfa61))
* 블로그 디자인 전면 리뉴얼 v2 ([8b2cbed](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/8b2cbed6736d65f863e473de69466c8c7526c49e))


### Bug Fixes

* button 중첩 hydration 에러 수정 ([7933965](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/793396533a06b1caf9a5c573d4bf5d205b5055b4))
* button 중첩 hydration 에러 수정 ([9257fca](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/9257fca1d3891a6a12c542ff15115cedeaec72f9))
* CodeQL HTML sanitization 경고 해결 ([2fb6c72](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/2fb6c72391d4aa68f20071d697b3a65590f7b2bd))

## 1.0.0 (2026-03-20)


### Features

* add cluade code ([175d184](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/175d184f37175f6d6050e9709e9c3de9aaa3e240))
* GitHub Tier 개발기 블로그 포스트 작성 ([c3a19a2](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/c3a19a29adf0ac674440f7c33c56588116ad6d89))
* Next.js 16 업그레이드 및 ESLint에서 Biome으로 전환 ([0b17383](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/0b1738371329ef77f19039918ef8563b7a02ef4d))
* Next.js 16 업그레이드 및 ESLint에서 Biome으로 전환 ([49d6060](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/49d6060d2d3c361ed4a3fa6492afa1d7452d0bcb))
* release-please 자동 changelog 및 릴리즈 설정 ([04ec3fc](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/04ec3fcf58160a4f4865d837e8c9d366748fabb4))
* release-please 자동 changelog 설정 및 문서 수정 ([cb4dd33](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/cb4dd33ab467f708b9339dcc4cf7003547a71f8b))
* SEO 개선 및 크롤링 최적화 ([c8dfd49](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/c8dfd491f4cf0d2b9d39ab3d54694f02e8efa344))
* Vitest 테스트 환경 구축 및 CI 연동 ([c092d40](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/c092d40f63059a73f3de42ac22cd87a6fb44386a))
* Vitest 테스트 환경 구축 및 CI 연동 ([a14055a](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/a14055ac02e1377417060d69c346134bd3c4d38e))
* 블로그 포스팅 2건 추가 ([adf2056](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/adf205613474a2c39faa4ef51b76b7f79384e7c5))


### Bug Fixes

* apple-touch-icon 추가 및 폰트 preload 적용 ([0d714d1](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/0d714d111d774247db7f4159071d79996d7d97ef))
* canonical URL 및 hrefLang 설정 추가 ([02c4736](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/02c47361e4e755d1ce0a9b904a2c0066d1192b40))
* CI에서 build를 tsc 전에 실행하여 next-env.d.ts 생성 ([07b44fe](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/07b44fe8369354d3e7f669e8ea8b043a52fbf442))
* fast-glob 직접 의존성 추가 및 미사용 glob 제거 ([cf0b085](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/cf0b085c97841a25bfb7f3bd4961630b4f9daf5d))
* github-tier 썸네일 1200x630 검정 배경 중앙 정렬로 재생성 및 포스트 카드 원복 ([9e2fba9](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/9e2fba988e2037386e19833eebe007db039dac34))
* sitemap lastModified 고정 및 프로필 이미지 alt 개선 ([70623bc](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/70623bce2649594702d2d7cd8153b0bfc5bf6b85))
* sitemap에서 카테고리 쿼리 URL 제거 ([64749a4](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/64749a42951ab788e296c95d27f8798790bf0ffe))
* theme-switch inline func delete, cursor-pointer ([9715261](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/971526198a9168f768bdd12c09ab878dd611324b))
* Twitter 메타데이터에 site 속성 추가 ([f6fbb8f](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/f6fbb8fa63c32eb1a1d58ab965b653843da2511f))
* 썸네일 1200x630 검정 배경 중앙 정렬로 일괄 리사이즈 ([e0a8a51](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/e0a8a51c14d7063aae0807dbf03ac934fc3d8e76))
* 썸네일 aspect-video 통일 및 blur placeholder 검정 배경 적용 ([e08b568](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/e08b56879f76d6c76b11d61f92adb82cc7fc212d))
* 포스트 카드 썸네일 중앙 정렬 및 검정 배경 적용 ([36e9bd6](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/36e9bd6a9fbe30edb10c8fbc006208cfea20de03))
* 회고 포스트 description 수정 ([f6a6057](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/commit/f6a6057aab8e1ea76278d571bbac2b953f8b6763))
