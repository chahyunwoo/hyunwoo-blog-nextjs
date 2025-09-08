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