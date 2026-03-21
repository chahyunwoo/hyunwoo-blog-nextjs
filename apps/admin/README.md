# ⚙️ Admin | hyunwoo.dev

블로그/포트폴리오 콘텐츠 관리 대시보드.

<br />

## ⚡ Tech Stack

| 분류 | 기술 |
|:---------|:-----|
| 🖥️ Runtime | Vite + React 19 |
| 🧭 Routing | TanStack Router (파일 기반) |
| 📡 Server State | TanStack Query |
| 📝 Form | TanStack Form |
| 📊 Table | TanStack Table |
| 🎨 UI | Mantine |
| 📦 Shared | @hyunwoo/shared (API, 타입, 유틸) |

<br />

## ✨ Features (Planned)

| 기능 | 설명 |
|:------|:-----|
| 🔐 인증 | JWT (accessToken + refreshToken, Token Rotation) |
| 📝 포스트 CRUD | 생성, 수정, 삭제, 썸네일 업로드 |
| 💼 포트폴리오 CRUD | 프로필, 경력, 프로젝트, 스킬, 학력, locale |

<br />

## 🚀 Getting Started

```bash
# 모노레포 루트에서
pnpm dev:admin

# 이 디렉토리에서 (port 3100)
pnpm dev
```

### 🔑 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_API_KEY=your-api-key
```
