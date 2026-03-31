/**
 * @파일 Template - DefaultLayout
 * @설명 일반 페이지용 기본 레이아웃. Header + main + Footer 구조.
 */

import { Header } from '@/components/organisms/Header';
import { cn } from '@/lib/utils';

interface DefaultLayoutProps {
  children: React.ReactNode;
  className?: string;
  logoText?: string;
}

export function DefaultLayout({ children, className, logoText }: DefaultLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header logoText={logoText} />
      <main className={cn('flex-1 container mx-auto max-w-screen-xl px-4 py-8', className)}>
        {children}
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto max-w-screen-xl px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} React Template. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
