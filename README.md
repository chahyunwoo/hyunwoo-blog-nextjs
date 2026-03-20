<div align="center">

# hyunwoo.dev

프론트엔드 개발자 현우의 기술 블로그

[![Live](https://img.shields.io/badge/Live-chahyunwoo.dev-000?style=flat-square&logo=vercel&logoColor=white)](https://chahyunwoo.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)
[![CI](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/actions/workflows/ci.yml/badge.svg)](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/actions/workflows/ci.yml)
[![CodeQL](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/actions/workflows/codeql.yml/badge.svg)](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/actions/workflows/codeql.yml)

</div>

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui |
| Content | MDX (next-mdx-remote v6) |
| Code Highlight | Shiki + rehype-pretty-code |
| State | Zustand |
| Deploy | Vercel |

## 주요 기능

- MDX 기반 블로그 포스팅 (코드 하이라이팅, GFM 지원)
- 카테고리 및 태그 필터링
- 다국어 소개 페이지 (한국어 / English / 日本語)
- 다크 모드
- SEO 최적화 (sitemap, robots.txt, JSON-LD, Open Graph)
- 반응형 디자인

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 린트
npm run lint
```

## 프로젝트 구조

```
src/
├── app/          # Next.js App Router 페이지
├── components/   # 재사용 컴포넌트
│   ├── features/ # 기능별 컴포넌트
│   ├── layout/   # 레이아웃 컴포넌트
│   ├── mdx/      # MDX 커스텀 컴포넌트
│   └── ui/       # shadcn/ui 컴포넌트
├── lib/          # 유틸리티 함수
├── posts/        # MDX 블로그 포스트
├── styles/       # 글로벌 스타일
└── types/        # TypeScript 타입 정의
```

## 블로그 포스트 작성

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

## 기여하기

버그 리포트나 기능 제안은 [Issues](https://github.com/chahyunwoo/hyunwoo-blog-nextjs/issues)에 남겨주세요.

## 라이선스

[MIT License](./LICENSE) &copy; Hyunwoo Cha
