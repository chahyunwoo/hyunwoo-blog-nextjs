import { Github, Instagram, Linkedin } from 'lucide-react'

export const PROFILE_EN = {
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
    'I am a developer who is flexible and easy to adapt to any situation.',
    'I like to write code that increases productivity.',
    'I try to write code that takes 10 minutes today, but takes 5 minutes tomorrow.',
  ],
  education: [
    {
      institution: 'Soongsil University',
      degree: 'Bachelor of Accounting, Computer Science Minor',
      period: '2011 - 2017',
    },
    {
      institution: 'ACBS',
      degree: 'Bachelor of Computer Science',
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
      title: 'Freelance Full-Stack Developer',
      role: 'Full-Stack Developer / Freelancer',
      period: '2025 - Present',
      responsibilities: [
        'Financial back-office system design and frontend tech leading (React 19 + TanStack)',
        'Feature-First Architecture based domain-centric modular structure design',
        'Large-scale data processing system with TanStack Router/Query/Table/Virtual',
        'SSE-based real-time data streaming and JWT + 2FA authentication system',
        'Next.js service guide UI development',
        'Enterprise design system and shared component design/development',
      ],
    },
    {
      title: 'Large-Scale IoT Service webOS TV App Development',
      role: 'FE Developer / PL',
      period: '2024 - 2025',
      responsibilities: [
        'Led frontend development from webOS TV app architecture design to production release',
        'Redux ecosystem (redux-thunk, redux-saga) based state management architecture design',
        'Jenkins CI/CD pipeline and automated build/deployment process optimization',
        'Multi-language support (US, Germany, Russia, UK) system and i18n integration',
        'WCAG 2.1 accessibility compliance and performance optimization (30% loading time reduction)',
        'webOS luna API analysis and optimized TV hardware resource integration',
      ],
    },
    {
      title: 'Large-Scale IoT Service Shared Component Development',
      role: 'FE Developer',
      period: '2023',
      responsibilities: [
        'React cross-platform webview architecture design and performance optimization (40% loading speed improvement)',
        'Enterprise component library development with Storybook interactive documentation',
        'D3.js real-time data visualization dashboard development',
        'iOS/Android platform browser engine analysis and adaptive rendering implementation',
        'PropTypes + TypeScript type safety improvements reducing runtime errors by 85%',
        'FUT (Functional Under Test) environment for component test automation',
      ],
    },
    {
      title: 'Recruitment Platform Frontend Development',
      role: 'FE Developer',
      period: '2021 - 2022',
      responsibilities: [
        'Core frontend feature design and development for recruitment platform with Vue.js and React',
        'Contributed to service scaling and stabilization during rapid growth as an early startup member',
        'Responsive web UI/UX design and user experience optimization',
        'REST API integration and client state management architecture design',
        'Reusable component library design and development',
        'Performance bottleneck analysis and rendering optimization for growing user traffic',
      ],
    },
    {
      title: 'Web3 & Blockchain-Based Financial Service Development',
      role: 'Full-Stack Developer',
      period: '2021',
      responsibilities: [
        'Banking mobile app UI development and user interface management',
        'NFT-based authentication system development (OpenSea integration, digital wallet)',
        'Decentralized web service development utilizing Web3 technology',
        'MetaMask and digital wallet login system development',
        'NFT minting/trading interface design and smart contract integration',
        'Blockchain-based user authentication flow design and implementation',
      ],
    },
    {
      title: 'Financial Service Full-Stack Development',
      role: 'Full-Stack Developer',
      period: '2017 - 2020',
      responsibilities: [
        'Financial service backend system design and development with Java Spring',
        'DB schema design and query optimization for financial data processing',
        'High-volume financial transaction processing system stability assurance',
        'Full-stack web service development (frontend + backend)',
        'REST API design and external financial API integration',
        'Authentication/authorization system for financial security regulation compliance',
      ],
    },
  ],
  projects: [
    {
      title: 'hyunwoo.dev',
      description: 'Personal tech blog built with Next.js 16. MDX content, Cmd+K search, SEO optimized.',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'Vercel'],
      link: 'https://chahyunwoo.dev',
    },
    {
      title: 'GitHub Tier',
      description: 'Open-source widget that generates LoL-style tier rank cards based on GitHub activity.',
      techStack: ['Hono', 'TypeScript', 'Vercel Edge Functions', 'GitHub API'],
      link: 'https://github.com/chahyunwoo/github-tier',
    },
    {
      title: 'Discord Multi-Bot',
      description: 'Multi-feature Discord bot with train booking assistance and real-time gas price alerts.',
      techStack: ['Python', 'discord.py', 'Docker', 'AWS', 'GitHub Actions'],
      link: 'https://discord.gg/fgwtkprgyg',
    },
  ],
  copied: 'Email copied successfully.',
}
