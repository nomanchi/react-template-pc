# 코드 컨벤션 가이드 (CONVENTIONS.md)

> 이 문서는 `portfolio-react` 프로젝트의 코딩 컨벤션을 정의합니다.
> 프로젝트 전반에 걸쳐 일관된 방식으로 코드를 작성할 수 있도록 합니다.

---

## 1. 파일 & 폴더 네이밍

| 종류 | 컨벤션 | 예시 |
|---|---|---|
| 컴포넌트 폴더 | PascalCase | `components/atoms/Button/` |
| 컴포넌트 파일 | `index.tsx` (폴더 하위) | `Button/index.tsx` |
| 훅 파일 | camelCase + `use` 접두사 | `useDebounce.ts` |
| 유틸리티 파일 | camelCase | `dateUtils.ts` |
| 타입 파일 | camelCase + `.types.ts` | `api.types.ts` |
| 스키마 파일 | camelCase + `.schema.ts` | `common.schema.ts` |
| 스토어 파일 | camelCase + `.store.ts` | `auth.store.ts` |
| 서비스 파일 | camelCase + `.service.ts` | `auth.service.ts` |
| 목 파일 | camelCase + `.mock.ts` | `user.mock.ts` |
| 상수 파일 | camelCase | `routes.ts`, `app.ts` |
| 설정 파일 | camelCase | `explorer-nav.ts` |
| 라우트/페이지 | kebab-case | `app/user-profile/page.tsx` |

---

## 2. 컴포넌트 네이밍

```tsx
// ✅ PascalCase로 컴포넌트명 작성
export function UserCard({ user }: UserCardProps) { ... }

// ✅ 컴포넌트 props 타입명: 컴포넌트명 + Props
interface UserCardProps {
  user: UserProfile;
  onClick?: () => void;
}

// ✅ Named export 권장
// ❌ 단, Next.js page.tsx / layout.tsx / error.tsx 등 App Router 규약 파일은 default export 필수
export default function PortfolioPage() { ... }  // page.tsx 한정 허용
```

---

## 3. Atomic Design 컴포넌트 배치 기준

| 레이어 | 기준 | 실제 예시 |
|---|---|---|
| **Atoms** | 더 이상 분리할 수 없는 최소 단위 | Typography, Spinner, Button, Input, Badge, Avatar, Skeleton, Separator, Progress |
| **Molecules** | Atoms 2개 이상의 조합으로 하나의 기능 | FormField, SearchInput, ConfirmDialog |
| **Organisms** | 페이지 섹션을 구성하는 복잡한 컴포넌트 | Header, Sidebar, PageHeader |
| **Templates** | 페이지 레이아웃 뼈대 (데이터 없음) | DefaultLayout, AuthLayout, DashboardLayout, ExplorerLayout |
| **Showcase** | Explorer 전용 컴포넌트 쇼케이스 | `components/showcase/` |

> **규칙**: 상위 레이어는 하위 레이어를 import할 수 있지만 역방향은 불가.
> `Atoms → Molecules → Organisms → Templates → Pages`

> **shadcn/ui**: `components/ui/`의 shadcn 컴포넌트는 Atoms와 동급으로 취급하며,
> `components/atoms/index.ts`에서 re-export하여 단일 진입점으로 통합합니다.

---

## 4. Import 순서

```tsx
// 1. React
import { useState, useEffect } from 'react';

// 2. Next.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 3. 외부 라이브러리
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// 4. 내부 모듈 (@/ 경로 — 가까운 것에서 먼 것 순서)
import { FormField } from '@/components/molecules/FormField';
import { useAuthStore } from '@/stores';
import { ROUTES } from '@/constants';
import type { UserProfile } from '@/types';
```

---

## 5. 커스텀 훅 네이밍

```tsx
// ✅ 상태를 반환하는 훅: use + 명사
const [value, setValue] = useLocalStorage('key', 'default');

// ✅ API 데이터 조회 훅: use + Entity + Query
function useUserQuery(id: string) { ... }

// ✅ API 데이터 변경 훅: use + Entity + Mutation
function useUpdateUserMutation() { ... }

// ✅ UI 상태 훅: use + 형용사/동사
const isMobile = useMediaQuery('(max-width: 768px)');
const debouncedValue = useDebounce(value, 300);
```

실제 구현된 훅: `useDebounce`, `useLocalStorage`, `useMediaQuery`

---

## 6. TypeScript 타입/인터페이스

```ts
// ✅ 공개 API 타입: interface 사용
interface UserProfile {
  id: string;
  name: string;
}

// ✅ 유틸리티/복합 타입: type 사용
type UserRole = 'admin' | 'user' | 'guest';
type Nullable<T> = T | null;

// ✅ Enum 대신 as const 객체 사용
const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;
type UserRoleValue = typeof USER_ROLES[keyof typeof USER_ROLES];
```

---

## 7. React Query 패턴

```tsx
// queries/useUserQuery.ts
export function useUserQuery(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => authService.getUser(id),
    enabled: !!id,
  });
}

// mutations/useUpdateUserMutation.ts
export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.updateUser,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
}
```

---

## 8. 폼 처리 패턴

```tsx
// ✅ React Hook Form + Zod 조합 사용
// 스키마는 lib/validators/common.schema.ts 에 정의
const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
  resolver: zodResolver(schema),
});

// ✅ FormField 컴포넌트로 일관된 폼 필드 렌더링
<FormField label="이메일" name="email" register={register('email')} error={errors.email} />
```

---

## 9. 상수 관리

```ts
// ✅ 라우트는 ROUTES 상수 사용
import { ROUTES } from '@/constants';
router.push(ROUTES.AUTH.LOGIN);
router.push(ROUTES.DASHBOARD.ROOT);

// ❌ 하드코딩 금지
router.push('/login');
```

실제 ROUTES 구조: `HOME`, `AUTH.LOGIN/SIGNUP/FORGOT_PASSWORD`, `DASHBOARD.ROOT/ANALYTICS/USERS/SETTINGS`

---

## 10. 서버/클라이언트 컴포넌트

```tsx
// ✅ 기본값: Server Component (use client 없음)
// ✅ 클라이언트 상태, 이벤트 핸들러, 훅이 필요한 경우만 'use client'
'use client';

// ✅ 클라이언트 컴포넌트는 최대한 트리 하단에 배치
// (Server Component가 최대한 많은 영역을 처리하도록)
```

---

## 11. Barrel Export 규칙

```ts
// ✅ 각 디렉토리에 index.ts 필수
// src/components/atoms/index.ts
export * from './Typography';
export * from './Spinner';
// shadcn/ui atoms (re-export for convenience)
export { Button } from '@/components/ui/button';
export { Badge } from '@/components/ui/badge';
// ...

// ✅ import 시 디렉토리 레벨로 import
import { Typography, Spinner, Button, Badge } from '@/components/atoms';

// ❌ 파일 직접 경로 지양 (공통 컴포넌트의 경우)
import { Button } from '@/components/atoms/Button/index';
```

---

## 12. Mock 데이터

```ts
// ✅ 개발/테스트용 목 데이터는 src/mocks/ 에 관리
// src/mocks/user.mock.ts
// src/mocks/table.mock.ts

import { mockUsers } from '@/mocks';
```

목 데이터는 UI 쇼케이스(Explorer)와 개발 환경 전용으로만 사용하며, 프로덕션 코드에서 직접 참조 금지.
