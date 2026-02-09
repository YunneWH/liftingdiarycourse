# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation-First Rule

**ALWAYS** consult the relevant docs file(s) in the `/docs` directory before generating any code. The docs contain project-specific requirements, patterns, and conventions that must be followed. If a docs file covers the area you are working on, treat its contents as the source of truth for implementation decisions.cl

- /docs/ui.md

## Project Overview

Next.js 16 web application with TypeScript and Tailwind CSS 4. Uses the App Router pattern with source files in `src/app/`.

## Commands

- `npm run dev` — Start development server (http://localhost:3000)
- `npm run build` — Production build
- `npm start` — Start production server
- `npm run lint` — Run ESLint

No test framework is currently configured.

## Architecture

- **App Router**: File-based routing in `src/app/` with React Server Components by default
- **Styling**: Tailwind CSS 4 via PostCSS; light/dark mode via `prefers-color-scheme` CSS variables in `globals.css`
- **Fonts**: Geist font family loaded via `next/font`
- **Path aliases**: `@/*` maps to `./src/*`
- **TypeScript**: Strict mode enabled
- **ESLint**: Flat config (v9) extending Next.js core web vitals and TypeScript rules
