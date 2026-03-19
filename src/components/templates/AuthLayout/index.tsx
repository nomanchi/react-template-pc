/**
 * @파일 Template - AuthLayout
 * @설명 로그인/회원가입 페이지용 중앙 정렬 카드 레이아웃.
 */

import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className={cn('w-full max-w-sm', className)}>
        {/* Logo / Brand */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
            T
          </div>
          <h1 className="text-2xl font-bold">Template PC</h1>
        </div>
        {/* Content */}
        {children}
      </div>
    </div>
  );
}
