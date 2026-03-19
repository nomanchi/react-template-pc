/**
 * @파일 StoryPreview - 컴포넌트 미리보기 영역
 */

import { cn } from '@/lib/utils';

interface StoryPreviewProps {
  children: React.ReactNode;
  /** 격자 배경 표시 여부 */
  grid?: boolean;
  /** 컴포넌트가 꽉 찬 너비를 차지해야 할 때 */
  fullWidth?: boolean;
  className?: string;
}

export function StoryPreview({ children, grid = false, fullWidth = false, className }: StoryPreviewProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-muted/30 p-6',
        grid && 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]',
        className,
      )}
    >
      <div className={cn('flex flex-wrap items-center gap-3', fullWidth && 'flex-col items-stretch')}>
        {children}
      </div>
    </div>
  );
}
