/**
 * @파일 ExplorerLayout — 컴포넌트 탐색기 레이아웃
 */

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Layers, Menu, X } from 'lucide-react';
import { EXPLORER_NAV } from '@/config/explorer-nav';
import { cn } from '@/lib/utils';

// ─── 사이드바 내비게이션

function SidebarNav({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="px-3 py-4">
      {EXPLORER_NAV.map((group) => (
        /*
         * <details open> = 기본 펼침
         * 브라우저 네이티브 토글 — React 상태 없이 확실하게 동작
         */
        <details key={group.title} open className="mb-1 group/details">
          <summary
            className={cn(
              'flex cursor-pointer list-none items-center justify-between',
              'rounded-md px-2 py-1.5 text-xs font-bold uppercase tracking-widest',
              'select-none transition-colors hover:bg-muted',
              group.color,
            )}
          >
            <span className="flex items-center gap-2">
              <span className={cn('h-1.5 w-1.5 rounded-full', group.dotColor)} />
              {group.title}
            </span>
            {/* chevron: open이면 아래, 닫히면 오른쪽 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 transition-transform duration-200 group-open/details:rotate-0 -rotate-90"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>

          <ul className="mt-1 ml-3 space-y-0.5 border-l border-border pl-3">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavClick}
                    className={cn(
                      'block rounded-md px-2 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </nav>
  );
}

// ─── 메인 레이아웃

export function ExplorerLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // body 글로벌 스크롤 제거 (탐색기 내부 스크롤만 사용)
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">

      {/* Top Bar */}
      <header className="shrink-0 z-50 flex h-12 items-center border-b bg-background px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <Layers className="h-5 w-5" />
          <span>Component Explorer</span>
        </Link>
        <span className="ml-3 hidden text-xs text-muted-foreground sm:block">
          react-template-pc · Atomic Design
        </span>
        <button
          type="button"
          className="ml-auto rounded-md p-1.5 hover:bg-muted md:hidden"
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* PC 사이드바 */}
        <aside className="hidden w-56 shrink-0 overflow-y-auto border-r bg-card md:block">
          <SidebarNav />
        </aside>

        {/* 모바일 오버레이 */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNavOpen(false)} />
            <aside className="absolute left-0 top-12 h-[calc(100%-3rem)] w-56 overflow-y-auto border-r bg-card">
              <SidebarNav onNavClick={() => setMobileNavOpen(false)} />
            </aside>
          </div>
        )}

        {/* 컨텐츠 — 독립 스크롤 */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
