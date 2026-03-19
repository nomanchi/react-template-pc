/**
 * @파일 Providers Barrel Export
 * @설명 앱 루트 레이아웃에서 사용할 모든 Provider를 통합합니다.
 */

'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from './QueryProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * 앱 전체를 감싸는 통합 Provider
 * root layout에서 한 번만 사용합니다.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      {/* TooltipProvider: base-ui uses 'delay' not 'delayDuration' */}
      <TooltipProvider delay={200}>
        {children}
        <Toaster richColors position="top-right" />
      </TooltipProvider>
    </QueryProvider>
  );
}

export { QueryProvider };
