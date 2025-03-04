# Next.js 15 관리자 대시보드 템플릿

Next.js App Router를 활용한 현대적인 관리자 대시보드

<div align="center">
<a href="https://next-admin-dash.vercel.app/">데모</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">배포하기</a>
</div>

## 개요

이 프로젝트는 최신 웹 기술을 활용한 관리자 대시보드 템플릿입니다. 현대적인 UI/UX와 함께 강력한 기능을 제공합니다.

### 주요 기술 스택

- **프레임워크** - [Next.js 15 (App Router)](https://nextjs.org)
  - 서버 컴포넌트
  - 스트리밍
  - 서버 액션
  - 라우트 인터셉트
- **언어** - [TypeScript](https://www.typescriptlang.org)
- **인증** - [Auth.js](https://authjs.dev)
  - GitHub OAuth 지원
  - 세션 관리
- **데이터베이스** - [Postgres](https://vercel.com/postgres)
  - Vercel Postgres 통합
  - Drizzle ORM
- **배포** - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- **스타일링** - [Tailwind CSS](https://tailwindcss.com)
  - JIT 컴파일
  - 다크모드 지원
- **컴포넌트** - [Shadcn UI](https://ui.shadcn.com/)
  - 재사용 가능한 컴포넌트
  - Radix UI 기반
- **분석** - [Vercel Analytics](https://vercel.com/analytics)
- **코드 포맷팅** - [Prettier](https://prettier.io)

## 주요 기능

- 📊 대시보드 UI
- 🔐 인증 및 권한 관리
- 📱 반응형 디자인
- 🎨 테마 커스터마이징
- 📦 제품 관리
- 🔍 검색 및 필터링
- 📈 데이터 시각화

## 시작하기

### 1. 데이터베이스 설정

Vercel 배포 시 Postgres 데이터베이스가 자동으로 생성됩니다. 데이터베이스에 다음 스키마를 적용하세요:

```sql
CREATE TYPE status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  status status NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  available_at TIMESTAMP NOT NULL
);
```

### 2. 환경 변수 설정

1. `.env.example` 파일을 `.env`로 복사
2. GitHub OAuth 애플리케이션 설정 후 환경 변수 업데이트
3. Vercel CLI를 통한 환경 변수 동기화:

```bash
npm i -g vercel
vercel link
vercel env pull
```

### 3. 개발 서버 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

http://localhost:3000 에서 애플리케이션에 접속할 수 있습니다.

### 4. 데이터 시드

개발 환경에서 테스트 데이터를 생성하려면:

1. `app/api/seed/route.ts` 파일의 주석을 해제
2. `http://localhost:3000/api/seed` 접속하여 샘플 데이터 생성

## 프로젝트 구조

```
├── app/                  # Next.js 13+ App Router
│   ├── (dashboard)/     # 대시보드 관련 페이지
│   ├── api/            # API 라우트
│   └── login/          # 인증 페이지
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/            # UI 컴포넌트
│   └── icons.tsx      # 아이콘 컴포넌트
├── lib/                # 유틸리티 및 설정
│   ├── auth.ts        # 인증 관련 설정
│   ├── db.ts         # 데이터베이스 설정
│   └── utils.ts      # 유틸리티 함수
└── public/            # 정적 파일
```

## 라이선스

MIT License - 자유롭게 사용, 수정, 배포가 가능합니다.
