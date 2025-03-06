# Next.js 15 Admin Dashboard Template

A modern admin dashboard built with Next.js App Router and latest web technologies.

<div align="center">
<a href="https://next-admin-dash.vercel.app/">Live Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Deploy Now</a>
</div>

## Overview

This project is a modern admin dashboard template that combines cutting-edge web technologies with powerful features and a sleek user interface.

For detailed technical information and architecture details, please refer to [architecture.md](architecture.md).

## Key Features

- 📊 Modern Dashboard UI
- 🔐 Authentication & Authorization
- 📱 Responsive Design
- 🎨 Theme Customization
- 📦 Product Management
- 🔍 Search & Filtering
- 📈 Data Visualization

## Getting Started

### 1. Environment Setup

1. Copy `.env.example` to `.env`
2. Configure GitHub/Google OAuth applications and update environment variables
3. Sync environment variables using Vercel CLI:

```bash
npm i -g vercel
vercel link
vercel env pull
```

### 2. Development Server

```bash
# Install pnpm if you haven't already
npm i -g pnpm

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Access the application at http://localhost:3000

### 3. Seeding Data

To generate test data in development:

1. Uncomment the code in `app/api/seed/route.ts`
2. Visit `http://localhost:3000/api/seed` to generate sample data

## License

MIT License - Feel free to use, modify, and distribute this template.
