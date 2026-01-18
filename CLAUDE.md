# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Architecture

This is a Next.js 15 personal blog with TypeScript, built using the App Router architecture. Key architectural decisions:

### Content Management
- Blog posts are stored as MDX files in `src/posts/` directory
- Content is processed using `next-mdx-remote` with syntax highlighting via `rehype-pretty-code`
- Korean language support with internationalization for the about page (`/about/[locale]/`)

### Styling & UI
- Tailwind CSS 4 with custom configuration
- shadcn/ui components in `src/components/ui/`
- Custom MDX components in `src/components/mdx/` for enhanced content rendering
- Theme switching via `next-themes` with provider in `src/providers/theme-provider.tsx`

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components organized by purpose
- `src/lib/` - Utility functions including `cn()` for class merging
- `src/types/` - TypeScript type definitions
- `src/posts/` - MDX blog content files
- `src/styles/` - Global CSS styles

### Key Features
- Dynamic blog post routing via `[slug]` pages
- SEO optimization with sitemap and robots.txt generation
- Responsive layout with Header/Footer components
- Code syntax highlighting in blog posts

### Path Aliases
Uses `@/*` alias pointing to `src/*` for clean imports.

---

## Blog Post Writing Guidelines (블로그 포스팅 가이드)

이 섹션은 블로그 포스팅 작성 시 참고해야 할 스타일 가이드입니다.

### 글쓰기 톤 & 스타일

#### 기본 원칙
- **경험 기반 글쓰기**: 개인 경험과 회사 경험을 자연스럽게 녹여냄
- **친근한 반말 + 경어체 혼합**: "솔직히", "근데" 같은 대화체 사용
- **독자와의 공감대 형성**: "처음에 이거 몰라서 한참 헤맸습니다" 같은 표현
- **AI 티 나지 않게**: 과도한 형식적 표현 지양, 자연스러운 흐름 유지

#### 자주 사용하는 표현
- 오프닝: "에 대해서 알아보도록 하겠습니다", "이번 글에서는"
- 경험: "저의 경우", "회사에서", "현업에서", "직접"
- 감정: "헤맸습니다", "당황했습니다", "생각이 들었습니다"
- 마무리: "정리하면", "좋은 점 / 고려할 점"

#### 문장 스타일
- 짧은 문장과 긴 문장 혼합으로 리듬감 유지
- 한 문단에 2-3개 문장으로 짧게 유지
- 복잡한 정보는 번호 또는 불릿 리스트로 정리

#### 어미 사용 주의사항
- **요체 남발 금지**: "~거예요", "~해볼게요", "~있어요" 같은 요체를 너무 많이 쓰지 않기
- 요체가 많으면 선생이 학생 가르치는 느낌이 남
- 기본은 "~합니다", "~겁니다", "~입니다" 체를 사용
- 가끔 자연스럽게 "~거든요", "~있거든요" 정도는 OK
- 제목은 "~뭔가요?" 보다 "~란", "~하기" 같은 명사형 선호

### 글 구조 (표준 템플릿)

```
1. 도입 - 문제/호기심 제시 + 개인 경험
2. 문제점/불편한 점 (기존 방식의 문제)
3. 솔루션 소개 (정의 + 핵심 특징)
4. 사용 방법 (설치 → 설정 → 코드 예제)
5. 심화 내용 (고급 기능, 실무 팁)
6. 마이그레이션 가이드 (전환 추천 글의 경우)
7. 정리 (좋은 점 / 고려할 점)
8. 참고 자료 (공식 문서 링크)
```

### MDX 스타일링 가이드

#### Callout 사용법
```mdx
<Callout type="tip">유용한 팁이나 조언</Callout>
<Callout type="info">추가 정보나 참고사항</Callout>
<Callout type="warning">주의사항이나 주의할 점</Callout>
```
- 한 섹션에 1-2개만 사용
- 핵심만 간결하게

#### Highlight 사용법
```mdx
<Highlight>주요 개념 강조</Highlight>
<Highlight color="blue">기술 개념</Highlight>
<Highlight color="fuchsia">핵심 키워드</Highlight>
```
- 한 문단에 1-2개만 사용
- 가장 중요한 키워드만 강조

#### 코드 블록
```mdx
\`\`\`typescript title="경로/파일명.ts"
// 코드 예제
\`\`\`
```
- 파일명(title) 명시
- 라인 하이라이팅 지원: `{13-15, 24-25}`

#### 이미지 사용
```mdx
<MdxImage
  src="/thumbnail/파일명.png"
  alt="설명"
  caption="이미지 설명문"
/>
```

### Frontmatter 구조

```yaml
---
title: "한글 제목"
description: "간단한 설명 (25-50자)"
date: "YYYY-MM-DD"
mainTag: "Frontend" | "Programming" | etc
tags: ["태그1", "태그2"]
thumbnail: /thumbnail/포스트-slug.png
published: true
---
```

#### 필드별 가이드
- **title**: 한글, 이모지 미사용, 명사형 또는 질문형
- **description**: 글의 핵심을 한 문장으로 (매우 간결하게)
- **mainTag**: 영어로 작성 (예: "Frontend", "Programming", "Career")
- **tags**: 영어로 작성, 구체적인 도구명/기술명 우선 (예: ["React", "TypeScript", "Storybook"])
- **thumbnail**: `/thumbnail/` 디렉토리에 저장, 포스트 slug 기반 명명

### 썸네일 이미지

- 포스팅마다 어울리는 썸네일 이미지 필수
- 저장 경로: `public/thumbnail/`
- 파일명: 포스트 slug와 연관 (예: `axios-to-ky-migration.png`)
- 형식: PNG 권장
- 웹에서 적절한 이미지 검색 후 다운로드하여 적용

### 품질 체크리스트

- [ ] 개인 경험이 자연스럽게 녹아들어 있는가?
- [ ] AI가 쓴 티가 나지 않는가?
- [ ] 코드 예제가 복사-붙여넣기 가능한가?
- [ ] Callout/Highlight가 과하지 않은가?
- [ ] 썸네일이 적용되었는가?
- [ ] 좋은 점/고려할 점이 정리되어 있는가?