import { Github, Instagram, Linkedin } from 'lucide-react'

export const PROFILE_KO = {
  name: 'CHA HYUNWOO',
  job: 'Full-Stack Developer',
  location: 'Seoul, Korea',
  link: [
    {
      name: 'Github',
      href: 'https://github.com/chahyunwoo',
      icon: Github,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/chwzp',
      icon: Instagram,
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/chahyunwoo',
      icon: Linkedin,
    },
  ],
  introduction: [
    '어디서든 잘 녹아드는 유연한 사고와 자세가 제 장점입니다.',
    '생산성을 높이는 코드를 작성하는 것을 좋아합니다.',
    '오늘 10분 걸린 코드가, 내일은 5분 걸릴 수 있도록 노력합니다.',
  ],
  education: [
    {
      institution: '숭실대학교',
      degree: '회계학 학사, 컴퓨터공학 부전공',
      period: '2011 - 2017',
    },
    {
      institution: '학점은행제',
      degree: '컴퓨터공학 학사',
      period: '2024 - 2025',
    },
  ],
  skills: [
    {
      category: 'Frontend',
      items: ['TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Redux', 'Zustand', 'TanStack Query'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'Java Spring', 'FastAPI', 'PostgreSQL', 'Docker'],
    },
    {
      category: 'Mobile',
      items: ['React Native', 'Flutter'],
    },
    {
      category: 'DevOps & Tools',
      items: ['GitHub Actions', 'Jenkins', 'AWS', 'Vercel', 'Docker', 'Figma'],
    },
  ],
  experience: [
    {
      title: '프리랜서 풀스택 개발자',
      role: 'Full-Stack Developer / Freelancer',
      period: '2025 - 현재',
      responsibilities: [
        '금융권 백오피스 시스템 설계 및 프론트엔드 테크 리딩 (React 19 + TanStack)',
        'Feature-First Architecture 기반 도메인 중심 모듈화 구조 설계',
        'TanStack Router/Query/Table/Virtual 기반 대규모 데이터 처리 시스템 구현',
        'SSE 기반 실시간 데이터 스트리밍 및 JWT + 2FA 인증 시스템 개발',
        'Next.js 기반 서비스 가이드 UI 개발',
        '대기업 디자인 시스템 및 공통 컴포넌트 설계/개발',
      ],
    },
    {
      title: '대규모 사용자 IoT 서비스 webOS TV App 개발',
      role: 'FE Developer / PL',
      period: '2024 - 2025',
      responsibilities: [
        'webOS TV 앱 아키텍처 설계부터 프로덕션 출시까지 프론트엔드 개발 리드',
        'Redux 에코시스템(redux-thunk, redux-saga) 기반 상태 관리 아키텍처 설계',
        'Jenkins CI/CD 파이프라인 구축 및 자동화된 빌드/배포 프로세스 최적화',
        '다국어 지원(미국, 독일, 러시아, 영국) 시스템 구축 및 i18n 통합 관리',
        'WCAG 2.1 접근성 표준 준수 및 성능 최적화 (로딩 시간 30% 단축)',
        'webOS luna API 분석 및 TV 하드웨어 리소스 최적화 연동 설계',
      ],
    },
    {
      title: '대규모 사용자 IoT 서비스 공통 컴포넌트 개발',
      role: 'FE Developer',
      period: '2023',
      responsibilities: [
        'React 기반 크로스플랫폼 웹뷰 아키텍처 설계 및 성능 최적화 (로딩 속도 40% 개선)',
        '엔터프라이즈급 컴포넌트 라이브러리 구축 및 Storybook 인터랙티브 문서화',
        'D3.js 기반 실시간 데이터 시각화 대시보드 개발',
        'iOS/Android 플랫폼별 브라우저 엔진 차이 분석 및 적응형 렌더링 로직 구현',
        'PropTypes + TypeScript 타입 안정성 강화로 런타임 오류 85% 감소',
        'FUT(Functional Under Test) 환경 구축으로 컴포넌트 테스트 자동화',
      ],
    },
    {
      title: '채용 플랫폼 서비스 프론트엔드 개발',
      role: 'FE Developer',
      period: '2021 - 2022',
      responsibilities: [
        'Vue.js, React 기반 채용 플랫폼 프론트엔드 핵심 기능 설계 및 개발',
        '초기 스타트업 핵심 멤버로 서비스 고속 성장기 확장 및 안정화 기여',
        '반응형 웹 UI/UX 설계 및 사용자 경험 최적화',
        'REST API 연동 및 클라이언트 상태 관리 아키텍처 설계',
        '재사용 가능한 컴포넌트 라이브러리 설계 및 개발',
        '사용자 트래픽 증가에 따른 성능 병목 분석 및 렌더링 최적화',
      ],
    },
    {
      title: 'Web3 & 블록체인 기반 금융 서비스 개발',
      role: 'Full-Stack Developer',
      period: '2021',
      responsibilities: [
        '은행권 모바일 앱 UI 개발 및 사용자 인터페이스 담당',
        'NFT 기반 인증 시스템 개발 (OpenSea 연동, 전자지갑 통합)',
        'Web3 기술을 활용한 탈중앙화 웹 서비스 개발',
        '메타마스크 등 전자지갑 연동 로그인 시스템 구축',
        'NFT 민팅/거래 인터페이스 설계 및 스마트 컨트랙트 연동',
        '블록체인 기반 사용자 인증 플로우 설계 및 구현',
      ],
    },
    {
      title: '금융 서비스 풀스택 개발',
      role: 'Full-Stack Developer',
      period: '2017 - 2020',
      responsibilities: [
        'Java Spring 기반 금융 서비스 백엔드 시스템 설계 및 개발',
        '금융 데이터 처리를 위한 DB 스키마 설계 및 쿼리 최적화',
        '대용량 금융 트랜잭션 처리 시스템 안정성 확보',
        '프론트엔드 + 백엔드 풀스택 웹 서비스 구축',
        'REST API 설계 및 외부 금융 API 연동 개발',
        '금융 보안 규정 준수를 위한 인증/인가 시스템 구현',
      ],
    },
  ],
  projects: [
    {
      title: 'hyunwoo.dev',
      description: 'Next.js 16 기반 개인 기술 블로그. MDX 콘텐츠, Cmd+K 검색, SEO 최적화.',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'Vercel'],
      link: 'https://chahyunwoo.dev',
    },
    {
      title: 'GitHub Tier',
      description: 'GitHub 활동을 분석해 롤 티어 스타일 랭크 카드를 생성하는 오픈소스 위젯.',
      techStack: ['Hono', 'TypeScript', 'Vercel Edge Functions', 'GitHub API'],
      link: 'https://github.com/chahyunwoo/github-tier',
    },
    {
      title: 'Discord Multi-Bot',
      description: '열차 예매 보조, 실시간 주유 최저가 알림 등 다기능 디스코드 봇.',
      techStack: ['Python', 'discord.py', 'Docker', 'AWS', 'GitHub Actions'],
      link: 'https://discord.gg/fgwtkprgyg',
    },
  ],
  copied: '이메일이 복사되었습니다.',
}
