/**
 * @파일 TanStack Query Provider
 * @설명 클라이언트 컴포넌트로 QueryClientProvider를 래핑합니다.
 *       Next.js App Router의 서버컴포넌트 환경에서 안전하게 사용합니다.
 */

'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { makeQueryClient } from '@/lib/query-client';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // 클라이언트 측에서만 QueryClient를 초기화하여 상태 격리
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
