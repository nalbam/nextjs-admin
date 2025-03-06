# Changelog

## [Unreleased]

### Added
- Facebook OAuth 로그인 기능 추가
  - `lib/auth.ts`에 Facebook Provider 추가
  - `ARCHITECTURE.md`에 Facebook 로그인 관련 내용 업데이트
  - 필요한 환경 변수 추가:
    ```
    FACEBOOK_ID=
    FACEBOOK_SECRET=
    ```
  - OAuth 콜백 URL 설정: `[NEXTAUTH_URL]/api/auth/callback/facebook`

### Changed
- 데이터베이스 스키마 개선
  - products 테이블의 status 필드를 ENUM 타입으로 변경
  - timestamp 필드에 timezone 지원 추가
  - price 필드의 precision과 scale 명시 (10,2)
