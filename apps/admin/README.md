# Admin | hyunwoo.dev

블로그/포트폴리오 콘텐츠 관리 대시보드.

## Stack

- Vite + React 19
- TanStack Router / Query / Form / Table
- Mantine UI
- `@hyunwoo/shared` (API, 타입, 유틸)

## Features (Planned)

- JWT 인증 (accessToken + refreshToken, Token Rotation)
- 블로그 포스트 CRUD (생성, 수정, 삭제, 썸네일 업로드)
- 포트폴리오 CRUD (프로필, 경력, 프로젝트, 스킬, 학력, locale)

## Dev

```bash
# From monorepo root
pnpm dev:admin

# Or from this directory (port 3100)
pnpm dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_API_KEY=your-api-key
```
