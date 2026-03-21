<div align="center">

# 🌐 hyunwoo.dev

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

## 📋 Overview

Turborepo 기반 모노레포. 블로그, 어드민, 포트폴리오를 하나의 저장소에서 관리합니다.

<br />

## 📁 Structure

```
apps/
├── blog/            Next.js 16 — 기술 블로그 (chahyunwoo.dev)
├── admin/           Vite + React — 어드민 대시보드
└── portfolio/       Next.js 16 — 포트폴리오 (예정)
packages/
└── shared/          공통 API 클라이언트, 타입, 상수, 유틸
```

| App | Stack | Port | Status |
|:------|:----------------------------------------------|:-------|:---------------|
| 📝 [Blog](apps/blog) | Next.js 16, Tailwind 4, shadcn/ui | 3000 | ✅ Live |
| ⚙️ [Admin](apps/admin) | Vite, React 19, TanStack Router, Mantine | 3100 | 🚧 Development |
| 💼 [Portfolio](apps/portfolio) | Next.js 16 | 3001 | 📋 Planned |

<br />

## ⚡ Tech Stack

<table>
  <tr>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
      <br /><sub>Next.js 16</sub>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
      <br /><sub>React 19</sub>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
      <br /><sub>TypeScript</sub>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
      <br /><sub>Tailwind 4</sub>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
      <br /><sub>Vite</sub>
    </td>
    <td align="center" width="110">
      <img src="https://skillicons.dev/icons?i=vercel" width="48" height="48" alt="Vercel" />
      <br /><sub>Vercel</sub>
    </td>
  </tr>
</table>

| 분류 | 기술 |
|:---------|:-----|
| 🏗️ Monorepo | Turborepo, pnpm workspaces |
| 🖥️ Backend | NestJS (별도 레포, REST API) |
| 🔧 Lint & Format | Biome |
| 🚀 CI/CD | GitHub Actions, Vercel |
| 🛡️ Security | CodeQL, Dependabot |

<br />

## 🚀 Getting Started

```bash
# 의존성 설치
pnpm install

# 전체 앱 실행
pnpm dev

# 개별 앱 실행
pnpm dev:blog        # localhost:3000
pnpm dev:admin       # localhost:3100
pnpm dev:portfolio   # localhost:3001

# 전체 빌드
pnpm build

# 린트
pnpm lint

# 테스트
pnpm test:run
```

<br />

## 📦 Apps

### 📝 Blog

기술 블로그. MDX 콘텐츠, Cmd+K 검색, 카테고리/태그, SEO 최적화.

- 📖 [상세 README](apps/blog/README.md)
- 🔗 Live: [chahyunwoo.dev](https://chahyunwoo.dev)

### ⚙️ Admin

블로그/포트폴리오 콘텐츠 관리 대시보드. 로그인, 포스트 CRUD, 포트폴리오 CRUD.

- 🛠️ Stack: Vite + React + TanStack Router/Query/Form + Mantine
- 📖 [상세 README](apps/admin/README.md)

### 💼 Portfolio

개인 포트폴리오 사이트. (개발 예정)

- 📖 [상세 README](apps/portfolio/README.md)

<br />

## 📦 Shared Package

`@hyunwoo/shared` — 모든 앱에서 공유하는 코드.

| 모듈 | 내용 |
|:--------------------------|:----------------------------------------------|
| `@hyunwoo/shared/api` | API 클라이언트 (apiFetch, apiClientFetch), 엔드포인트 |
| `@hyunwoo/shared/config` | BASE_URL, CACHE_TAGS, API 설정 |
| `@hyunwoo/shared/types` | Post, Profile, Locale 등 공통 타입 |
| `@hyunwoo/shared/lib` | cn(), formatDate() 등 유틸리티 |

<br />

## 🤝 Contributing

1. [Issues](https://github.com/chahyunwoo/hyunwoo-dev/issues)에서 버그 리포트 또는 기능 요청
2. Fork 후 `feature/*` 브랜치에서 작업 (base: `dev`)
3. PR 제출 시 CI 자동 실행 (Biome lint, type-check, Vitest, Turborepo build)

<br />

## ⭐ Star

이 프로젝트의 소스코드는 MIT 라이선스로 공개되어 있습니다.

코드를 참고하셨다면 **Star**를 눌러주시면 큰 힘이 됩니다! 🙏

[![Star this repo](https://img.shields.io/github/stars/chahyunwoo/hyunwoo-dev?style=social)](https://github.com/chahyunwoo/hyunwoo-dev)

<br />

## 📄 License

[MIT License](./LICENSE) &copy; 2025-present [Hyunwoo Cha](https://github.com/chahyunwoo)
