<div align="center">

<img src="public/images/og-image.png" alt="hyunwoo.dev" width="600" />

<br />
<br />

# 🌐 hyunwoo.dev

*"Write code, share stories."*

**Dev. Cha Hyunwoo** | Full-Stack Engineer

<br />

[![Live](https://img.shields.io/badge/🔗_Live-chahyunwoo.dev-000?style=for-the-badge&logo=vercel&logoColor=white)](https://chahyunwoo.dev)

<br />

[![CI](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/actions/workflows/ci.yml/badge.svg)](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/actions/workflows/ci.yml)
[![CodeQL](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/actions/workflows/codeql.yml/badge.svg)](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)

</div>

<br />

---

<br />

## ⚡ 기술 스택

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
      <br />Next.js 15
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
      <br />React 19
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
      <br />TypeScript
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
      <br />Tailwind 4
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vercel" width="48" height="48" alt="Vercel" />
      <br />Vercel
    </td>
  </tr>
</table>

| 분류 | 기술 |
|:-----|:-----|
| 🖥️ Framework | Next.js 15 (App Router, Turbopack) |
| 📝 Content | MDX ([next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) v6) |
| 🎨 Styling | Tailwind CSS 4, [shadcn/ui](https://ui.shadcn.com) |
| ✨ Code Highlight | [Shiki](https://shiki.matsu.io) + rehype-pretty-code |
| 🗂️ State | [Zustand](https://zustand-demo.pmnd.rs) |
| 🔍 SEO | sitemap, robots.txt, JSON-LD, Open Graph |
| 🛡️ Security | CodeQL, Dependabot |
| 📊 Quality | Lighthouse CI, ESLint |

<br />

## ✨ 주요 기능

| 기능 | 설명 |
|:-----|:-----|
| 📄 MDX 블로그 | 코드 하이라이팅, GFM, 커스텀 컴포넌트 지원 |
| 🏷️ 카테고리 & 태그 | 포스트 필터링 및 분류 시스템 |
| 🌏 다국어 소개 | 한국어 / English / 日本語 |
| 🌙 다크 모드 | 시스템 테마 연동 + 수동 전환 |
| 🔍 SEO 최적화 | sitemap, robots.txt, JSON-LD, Open Graph |
| 📱 반응형 디자인 | 모바일 ~ 데스크탑 완벽 대응 |

<br />

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 린트
npm run lint
```

> 개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

<br />

## 📁 프로젝트 구조

```
src/
├── 📂 app/            # Next.js App Router 페이지 및 라우팅
│   ├── about/         # 다국어 소개 페이지
│   ├── blog/          # 블로그 포스트 페이지
│   └── layout.tsx     # 루트 레이아웃
├── 📂 components/     # 재사용 컴포넌트
│   ├── common/        # 공통 컴포넌트
│   ├── features/      # 기능별 컴포넌트 (blog, about)
│   ├── layout/        # 헤더, 푸터, 컨테이너
│   ├── mdx/           # MDX 커스텀 컴포넌트 (Callout, Highlight 등)
│   └── ui/            # shadcn/ui 컴포넌트
├── 📂 lib/            # 유틸리티 함수
├── 📂 posts/          # MDX 블로그 포스트
├── 📂 services/       # 데이터 서비스 (포스트 조회 등)
├── 📂 stores/         # Zustand 스토어
├── 📂 styles/         # 글로벌 CSS
└── 📂 types/          # TypeScript 타입 정의
```

<br />

## 📝 블로그 포스트 작성

`src/posts/` 디렉토리에 MDX 파일을 추가하면 자동으로 블로그에 반영됩니다.

```yaml
---
title: "포스트 제목"
description: "간단한 설명"
date: "2026-03-20"
mainTag: "Frontend"
tags: ["React", "TypeScript"]
thumbnail: /thumbnail/post-slug.png
published: true
---
```

### 지원하는 MDX 컴포넌트

| 컴포넌트 | 용도 |
|:---------|:-----|
| `<Callout>` | 팁, 정보, 경고 박스 |
| `<Highlight>` | 텍스트 강조 |
| `<MdxImage>` | 캡션이 있는 이미지 |

<br />

## 🏆 Lighthouse

> 성능 최적화 진행 중입니다. 목표: 전 항목 95+ 달성

<!-- 성능 개선 완료 후 아래 주석을 캡쳐 이미지로 교체 -->
<!-- <img src="public/images/lighthouse-score.png" alt="Lighthouse Score" width="600" /> -->

| Category | Score |
|:---------|:------|
| 🟢 Performance | 측정 중 |
| 🟢 Accessibility | 측정 중 |
| 🟢 Best Practices | 측정 중 |
| 🟢 SEO | 측정 중 |

<br />

## 🤝 기여하기

버그를 발견하셨거나 새로운 기능을 제안하고 싶으시다면 언제든 환영합니다!

1. [Issues](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/issues)에서 버그 리포트 또는 기능 요청
2. Fork 후 `feature/*` 브랜치에서 작업
3. PR 제출 시 CI 자동 실행 (lint, type-check, build, Lighthouse)

<br />

## ⭐ Star

이 프로젝트의 소스코드는 MIT 라이선스로 공개되어 있습니다.

코드를 참고하셨다면 **Star**를 눌러주시면 큰 힘이 됩니다! 감사합니다. 🙏

[![Star this repo](https://img.shields.io/github/stars/chahyunwoo/hyunwoo-blog-nextjs?style=social)](https://github.com/chahyunwoo/hyunwoo-blog-nextjs)

<br />

## 📄 라이선스

[MIT License](./LICENSE) &copy; 2024-present [Hyunwoo Cha](https://github.com/chahyunwoo)
