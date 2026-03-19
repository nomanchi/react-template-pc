/**
 * @파일 Atom - Spinner
 * @설명 로딩 인디케이터 컴포넌트.
 * @example
 *   <Spinner size="sm" />
 *   <Spinner size="lg" className="text-primary" />
 */

import { cn } from '@/lib/utils';
import type { BaseProps } from '@/types';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

const sizeStyles: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3 border',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
};

interface SpinnerProps extends BaseProps {
  size?: SpinnerSize;
  label?: string;
}

export function Spinner({ size = 'md', label = '로딩 중...', className }: SpinnerProps) {
  return (
    <div role="status" aria-label={label} className={cn('inline-flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-current border-t-transparent',
          sizeStyles[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
