<div align="center">

# hyunwoo.dev

*"Write code, share stories."*

**Dev. Cha Hyunwoo** | Full-Stack Developer

<br />

[![CI](https://github.com/chahyunwoo/hyunwoo-dev/actions/workflows/ci.yml/badge.svg)](https://github.com/chahyunwoo/hyunwoo-dev/actions/workflows/ci.yml)
[![CodeQL](https://github.com/chahyunwoo/hyunwoo-dev/actions/workflows/codeql.yml/badge.svg)](https://github.com/chahyunwoo/hyunwoo-dev/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)

</div>

<br />

---

<br />

## Overview

Turborepo 기반 모노레포. 블로그, 어드민, 포트폴리오를 하나의 저장소에서 관리합니다.

<br />

## Structure

```
apps/
├── blog/            Next.js 16 - 기술 블로그 (chahyunwoo.dev)
├── admin/           Vite + React - 어드민 대시보드
└── portfolio/       Next.js 16 - 포트폴리오 (예정)
packages/
└── shared/          공통 API 클라이언트, 타입, 상수, 유틸
```

| App | Stack | Port | Status |
|:----|:------|:-----|:-------|
| [Blog](apps/blog) | Next.js 16, Tailwind 4, shadcn/ui | 3000 | Live |
| [Admin](apps/admin) | Vite, React 19, TanStack Router, Mantine | 3100 | In Development |
| [Portfolio](apps/portfolio) | Next.js 16 | 3001 | Planned |

<br />

## Tech Stack

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
      <br />Next.js 16
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
      <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
      <br />Vite
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vercel" width="48" height="48" alt="Vercel" />
      <br />Vercel
    </td>
  </tr>
</table>

| Category | Tech |
|:---------|:-----|
| Monorepo | Turborepo, pnpm workspaces |
| Backend | NestJS (separate repo, REST API) |
| Lint & Format | Biome |
| CI/CD | GitHub Actions, Vercel |
| Security | CodeQL, Dependabot |

<br />

## Getting Started

```bash
# Install dependencies
pnpm install

# Run all apps
pnpm dev

# Run specific app
pnpm dev:blog
pnpm dev:admin
pnpm dev:portfolio

# Build all
pnpm build

# Lint
pnpm lint

# Test
pnpm test:run
```

<br />

## Apps

### Blog

기술 블로그. MDX 콘텐츠, 검색, 카테고리/태그, SEO 최적화.

- [README](apps/blog/README.md)
- Live: [chahyunwoo.dev](https://chahyunwoo.dev)

### Admin

블로그/포트폴리오 콘텐츠 관리. 로그인, 포스트 CRUD, 포트폴리오 CRUD.

- Stack: Vite + React + TanStack Router/Query/Form + Mantine
- [README](apps/admin/README.md)

### Portfolio

개인 포트폴리오 사이트. (예정)

- [README](apps/portfolio/README.md)

<br />

## Shared Package

`@hyunwoo/shared` - 모든 앱에서 공유하는 코드.

| Module | Contents |
|:-------|:---------|
| `@hyunwoo/shared/api` | API 클라이언트 (apiFetch, apiClientFetch), 엔드포인트 |
| `@hyunwoo/shared/config` | BASE_URL, CACHE_TAGS, API 설정 |
| `@hyunwoo/shared/types` | Post, Profile, Locale 등 공통 타입 |
| `@hyunwoo/shared/lib` | cn(), formatDate() 등 유틸리티 |

<br />

## Contributing

1. [Issues](https://github.com/chahyunwoo/hyunwoo-dev/issues)
2. Fork and create `feature/*` branch from `dev`
3. PR triggers CI (Biome lint, type-check, Vitest, build via Turborepo)

<br />

## License

[MIT License](./LICENSE) &copy; 2025-present [Hyunwoo Cha](https://github.com/chahyunwoo)
