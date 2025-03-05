# Next.js 15 Admin Dashboard Template

A modern admin dashboard built with Next.js App Router and latest web technologies.

<div align="center">
<a href="https://next-admin-dash.vercel.app/">Live Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Deploy Now</a>
</div>

## Overview

This project is a modern admin dashboard template that combines cutting-edge web technologies with powerful features and a sleek user interface.

### Tech Stack

- **Framework** - [Next.js 15 (App Router)](https://nextjs.org)
  - Server Components
  - Streaming
  - Server Actions
  - Route Interception
- **Language** - [TypeScript](https://www.typescriptlang.org)
- **Authentication** - [Auth.js](https://authjs.dev)
  - GitHub & Google OAuth Support
  - Session Management
- **Database** - [Postgres](https://vercel.com/postgres)
  - Vercel Postgres Integration
  - Drizzle ORM
- **Deployment** - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- **Styling** - [Tailwind CSS](https://tailwindcss.com)
  - JIT Compilation
  - Dark Mode Support
- **Components** - [Shadcn UI](https://ui.shadcn.com/)
  - Reusable Components
  - Radix UI Based
- **Analytics** - [Vercel Analytics](https://vercel.com/analytics)
- **Code Formatting** - [Prettier](https://prettier.io)

## Key Features

- 📊 Modern Dashboard UI
- 🔐 Authentication & Authorization
- 📱 Responsive Design
- 🎨 Theme Customization
- 📦 Product Management
- 🔍 Search & Filtering
- 📈 Data Visualization
- 🔔 Slack Notifications Integration

## Getting Started

### 1. Database Setup

A Postgres database is automatically created when deploying to Vercel. Apply the following schema:

```sql
CREATE TYPE status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE users (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  provider TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status status NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  available_at TIMESTAMP NOT NULL
);

CREATE TABLE slack_settings (
  id SERIAL PRIMARY KEY,
  settings JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### 2. Environment Setup

1. Copy `.env.example` to `.env`
2. Configure GitHub/Google OAuth applications and update environment variables
3. Sync environment variables using Vercel CLI:

```bash
npm i -g vercel
vercel link
vercel env pull
```

### 3. Development Server

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Access the application at http://localhost:3000

### 4. Seeding Data

To generate test data in development:

1. Uncomment the code in `app/api/seed/route.ts`
2. Visit `http://localhost:3000/api/seed` to generate sample data

## Project Structure

```
├── app/                  # Next.js 15+ App Router
│   ├── (dashboard)/     # Dashboard related pages
│   ├── api/             # API routes
│   └── login/           # Authentication pages
├── components/          # Reusable components
│   ├── ui/             # UI components
│   └── icons.tsx       # Icon components
├── lib/                # Utilities and configurations
│   ├── auth.ts        # Authentication setup
│   ├── db.ts          # Database configuration
│   ├── slack.ts       # Slack integration
│   └── utils.ts       # Utility functions
└── public/            # Static assets
```

## License

MIT License - Feel free to use, modify, and distribute this template.
