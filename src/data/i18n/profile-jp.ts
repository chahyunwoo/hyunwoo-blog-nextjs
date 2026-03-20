import { Github, Instagram, Linkedin } from 'lucide-react'

export const PROFILE_JP = {
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
    'どこでもよく溶け込む柔軟な思考と姿勢が私の長所です。',
    '生産性を高めるコードを作成するのが好きです。',
    '今日10分かかったコードが、明日は5分で済むように努力します。',
  ],
  education: [
    {
      institution: 'SOONGSIL UNIVERSITY',
      degree: '会計学 学士, コンピュータサイエンス 副専攻',
      period: '2011 - 2017',
    },
    {
      institution: 'ACBS',
      degree: 'コンピュータサイエンス 学士',
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
      title: 'フリーランスフルスタック開発者',
      role: 'Full-Stack Developer / Freelancer',
      period: '2025 - 現在',
      responsibilities: [
        '金融バックオフィスシステム設計・フロントエンドテックリーディング (React 19 + TanStack)',
        'Feature-First Architectureベースのドメイン中心モジュール化構造設計',
        'TanStack Router/Query/Table/Virtualベースの大規模データ処理システム実装',
        'SSEベースのリアルタイムデータストリーミング・JWT + 2FA認証システム開発',
        'Next.jsサービスガイドUI開発',
        '大企業デザインシステム・共通コンポーネント設計/開発',
      ],
    },
    {
      title: '大規模IoTサービス webOS TV App開発',
      role: 'FE Developer / PL',
      period: '2024 - 2025',
      responsibilities: [
        'webOS TVアプリのアーキテクチャ設計からプロダクションリリースまでフロントエンド開発をリード',
        'Reduxエコシステム(redux-thunk, redux-saga)ベースの状態管理アーキテクチャ設計',
        'Jenkins CI/CDパイプライン構築・自動化ビルド/デプロイプロセス最適化',
        '多言語対応(米国、ドイツ、ロシア、英国)システム構築・i18n統合管理',
        'WCAG 2.1アクセシビリティ標準準拠・パフォーマンス最適化 (ローディング時間30%短縮)',
        'webOS luna API分析・TVハードウェアリソース最適化連携設計',
      ],
    },
    {
      title: '大規模IoTサービス共通コンポーネント開発',
      role: 'FE Developer',
      period: '2023',
      responsibilities: [
        'Reactクロスプラットフォームウェブビューアーキテクチャ設計・パフォーマンス最適化 (ローディング速度40%改善)',
        'エンタープライズコンポーネントライブラリ構築・Storybookインタラクティブドキュメンテーション',
        'D3.jsリアルタイムデータ可視化ダッシュボード開発',
        'iOS/Androidプラットフォーム別ブラウザエンジン分析・適応型レンダリング実装',
        'PropTypes + TypeScript型安全性強化によりランタイムエラー85%削減',
        'FUT(Functional Under Test)環境構築によるコンポーネントテスト自動化',
      ],
    },
    {
      title: '採用プラットフォームフロントエンド開発',
      role: 'FE Developer',
      period: '2021 - 2022',
      responsibilities: [
        'Vue.js、Reactベースの採用プラットフォームのフロントエンドコア機能設計・開発',
        'スタートアップ初期メンバーとしてサービス急成長期の拡張・安定化に貢献',
        'レスポンシブウェブUI/UX設計・ユーザー体験最適化',
        'REST API連携・クライアント状態管理アーキテクチャ設計',
        '再利用可能なコンポーネントライブラリ設計・開発',
        'ユーザートラフィック増加に伴うパフォーマンスボトルネック分析・レンダリング最適化',
      ],
    },
    {
      title: 'Web3・ブロックチェーンベース金融サービス開発',
      role: 'Full-Stack Developer',
      period: '2021',
      responsibilities: [
        '銀行モバイルアプリUI開発・ユーザーインターフェース担当',
        'NFTベース認証システム開発 (OpenSea連携、電子ウォレット統合)',
        'Web3技術を活用した分散型ウェブサービス開発',
        'メタマスク等電子ウォレット連携ログインシステム構築',
        'NFTミンティング/取引インターフェース設計・スマートコントラクト連携',
        'ブロックチェーンベースのユーザー認証フロー設計・実装',
      ],
    },
    {
      title: '金融サービスフルスタック開発',
      role: 'Full-Stack Developer',
      period: '2017 - 2020',
      responsibilities: [
        'Java Springベースの金融サービスバックエンドシステム設計・開発',
        '金融データ処理のためのDBスキーマ設計・クエリ最適化',
        '大容量金融トランザクション処理システムの安定性確保',
        'フロントエンド + バックエンドフルスタックウェブサービス構築',
        'REST API設計・外部金融API連携開発',
        '金融セキュリティ規定準拠のための認証/認可システム実装',
      ],
    },
  ],
  projects: [
    {
      title: 'hyunwoo.dev',
      description: 'Next.js 16ベースの個人技術ブログ。MDXコンテンツ、Cmd+K検索、SEO最適化。',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'Vercel'],
      link: 'https://chahyunwoo.dev',
    },
    {
      title: 'GitHub Tier',
      description: 'GitHub活動を分析してLoLスタイルのティアランクカードを生成するオープンソースウィジェット。',
      techStack: ['Hono', 'TypeScript', 'Vercel Edge Functions', 'GitHub API'],
      link: 'https://github.com/chahyunwoo/github-tier',
    },
    {
      title: 'Discord Multi-Bot',
      description: '列車予約補助、リアルタイム給油最安値アラートなど多機能Discordボット。',
      techStack: ['Python', 'discord.py', 'Docker', 'AWS', 'GitHub Actions'],
      link: 'https://discord.gg/fgwtkprgyg',
    },
  ],
  copied: 'メールがコピーされました。',
}
