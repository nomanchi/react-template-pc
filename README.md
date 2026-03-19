# react-template-pc

> Next.js 15 기반 PC 브라우저 프론트엔드 일관성 템플릿

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com)

---

## 소개

어떤 프로젝트를 시작해도 **동일한 패턴**으로 코드를 작성할 수 있는 PC 브라우저용 Next.js 템플릿입니다.

- **Atomic Design Pattern** 기반 컴포넌트 구조
- **TypeScript** 전면 적용 (타입 안전한 API, 환경변수, Zod 스키마)
- **shadcn/ui** + **Tailwind CSS v4** 스타일링
- **Zustand** 전역 상태 관리
- **TanStack Query** 서버 상태 관리
- **React Hook Form + Zod** 폼 유효성 검사
- **Axios** HTTP 클라이언트 (refresh token 자동 갱신 포함)

---

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env.local
# .env.local 파일에서 NEXT_PUBLIC_API_URL 등을 수정하세요.

# 3. 개발 서버 실행
npm run dev
# → http://localhost:3000
```

---

## 📁 폴더 구조

```
src/
├── app/                        # Next.js App Router
│   ├── (login/signup/...)       # 인증 페이지
│   ├── dashboard/               # 대시보드 페이지
│   └── layout.tsx               # 루트 레이아웃 (AppProviders 포함)
│
├── components/                 # Atomic Design 컴포넌트
│   ├── atoms/                  # 최소 단위 (Typography, Spinner)
│   ├── molecules/              # 조합 컴포넌트 (FormField, SearchInput, ConfirmDialog)
│   ├── organisms/              # 섹션 컴포넌트 (Header, Sidebar, PageHeader)
│   ├── templates/              # 레이아웃 뼈대 (DefaultLayout, AuthLayout, DashboardLayout)
│   └── ui/                     # shadcn/ui 자동 생성 컴포넌트
│
├── hooks/                      # 커스텀 훅 (useDebounce, useLocalStorage, useMediaQuery)
├── lib/                        # 유틸리티
│   ├── api.ts                  # Axios 클라이언트 (refresh token 인터셉터)
│   ├── query-client.ts         # TanStack Query 설정
│   ├── env.ts                  # 타입 안전 환경변수
│   └── validators/             # Zod 스키마
│
├── services/                   # API 호출 레이어
├── stores/                     # Zustand 전역 상태 (auth, ui)
├── types/                      # TypeScript 타입 정의
├── constants/                  # 상수 (ROUTES, API, STORAGE_KEYS 등)
└── providers/                  # React Provider 통합 (QueryProvider, AppProviders)
```

---

## 🧩 Atomic Design

| 레이어 | 설명 | 위치 |
|---|---|---|
| **Atoms** | 더 이상 분리 불가한 최소 UI | `components/atoms/` |
| **Molecules** | Atoms 조합으로 기능하는 컴포넌트 | `components/molecules/` |
| **Organisms** | 페이지 섹션 단위 컴포넌트 | `components/organisms/` |
| **Templates** | 레이아웃 뼈대 (데이터 없음) | `components/templates/` |

각 레이어에는 `index.ts`(Barrel Export)가 있어 import를 단순화합니다:

```tsx
import { Typography, Spinner } from '@/components/atoms';
import { FormField, SearchInput } from '@/components/molecules';
import { Header, Sidebar } from '@/components/organisms';
import { DashboardLayout } from '@/components/templates';
```

---

## 🛠 주요 패턴

### API 호출
```tsx
// services/user.service.ts 에서 정의
export const userService = {
  getUser: (id: string) => api.get<User>(`/users/${id}`),
};

// 컴포넌트에서 TanStack Query로 사용
function useUserQuery(id: string) {
  return useQuery({ queryKey: ['user', id], queryFn: () => userService.getUser(id) });
}
```

### 전역 상태 (Zustand)
```tsx
import { useAuthStore } from '@/stores';
const { user, isAuthenticated, logout } = useAuthStore();
```

### 폼 처리
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/lib/validators/common.schema';
import { FormField } from '@/components/molecules';

const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
});
```

---

## 📋 페이지 예시

| 경로 | 설명 | 레이아웃 |
|---|---|---|
| `/` | 컴포넌트 쇼케이스 | DefaultLayout |
| `/login` | 로그인 폼 | AuthLayout |
| `/dashboard` | 대시보드 통계 | DashboardLayout |

---

## 📖 추가 문서

- [코드 컨벤션](./CONVENTIONS.md) — 네이밍, 컴포넌트 배치, TypeScript, React Query 패턴 등
