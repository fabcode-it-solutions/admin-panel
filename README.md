# Base Admin Panel

A production-ready **Next.js admin panel starter kit** — built with a modern, type-safe stack and a clean, scalable architecture. This boilerplate is used as the foundation for client admin dashboards, saving weeks of setup time on every new project.

## Overview

Base Admin Panel provides a fully working authentication flow, dashboard shell, and reusable UI component library out of the box — so development can start on business features from day one instead of re-building the same scaffolding for every project.

## Key Features

- **Authentication flow** — Login, Signup, Forgot Password, Reset Password, and Email Verification screens, ready to wire up to any backend
- **Dashboard layout** — Pre-built responsive layout with navigation, ready for widgets, tables, and charts
- **Reusable UI library** — Accessible, themeable components (dialogs, dropdowns, tabs, tooltips, switches, and more) built on Radix UI primitives
- **Forms & validation** — React Hook Form + Zod for type-safe, validated forms
- **State management** — Zustand for lightweight, scalable global state
- **Data visualization** — Recharts integration for dashboard charts and analytics
- **Code display** — Shiki-powered syntax highlighting
- **Legal/policy pages** — Terms of Service page included
- **Notifications** — Toast messaging via Sonner
- **Animations** — Smooth UI transitions with Framer Motion

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Components | Radix UI |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Charts | Recharts |
| Icons | Lucide |

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── (auth)/         # Login, signup, password reset, email verification
│   ├── (dashboard)/    # Main dashboard views
│   └── (policies)/     # Terms & legal pages
├── components/         # Reusable UI, layout, and page-level components
├── config/             # App configuration
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── providers/          # App-wide context providers
├── services/           # API service layer
├── store/              # Zustand stores
└── types/              # Shared TypeScript types
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Environment Setup

Copy the example environment file and configure it for your environment:

```bash
cp .env.example .env
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## About This Project

This repository is maintained by **The Fabcode** as an internal starter template, adapted and extended for client projects requiring an admin dashboard. It reflects our approach to clean architecture, type safety, and reusable component design in production Next.js applications.

## License

Copyright © 2026 The Fabcode. All Rights Reserved.

This project is proprietary software. The source code is publicly available for viewing and reference purposes only. No permission is granted to copy, modify, distribute, or use this code without prior written permission from The Fabcode.

See [LICENSE](./LICENSE) for the full license terms.
