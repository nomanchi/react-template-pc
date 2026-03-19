/**
 * @파일 Organism - Sidebar
 * @설명 대시보드용 접힘/펼침 사이드바 컴포넌트.
 *        네비게이션 아이템과 그룹을 정의하여 사용합니다.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, LayoutDashboard, Settings, Users, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUiStore } from '@/stores';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    items: [
      { label: '대시보드', href: ROUTES.DASHBOARD.ROOT, icon: LayoutDashboard },
    ],
  },
  {
    title: '관리',
    items: [
      { label: '사용자', href: ROUTES.DASHBOARD.USERS, icon: Users },
      { label: '분석', href: ROUTES.DASHBOARD.ANALYTICS, icon: BarChart3 },
    ],
  },
  {
    title: '시스템',
    items: [
      { label: '설정', href: ROUTES.DASHBOARD.SETTINGS, icon: Settings },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useUiStore();

  return (
    <aside
      className={cn(
        'relative flex h-full flex-col border-r bg-card transition-[width] duration-300',
        isSidebarOpen ? 'w-56' : 'w-16',
        className,
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-sm"
        aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
      >
        <ChevronLeft
          className={cn('h-3 w-3 transition-transform', !isSidebarOpen && 'rotate-180')}
        />
      </Button>

      <ScrollArea className="flex-1 py-4">
        {navGroups.map((group, gi) => (
          <div key={gi} className="mb-2">
            {isSidebarOpen && group.title && (
              <p className="mb-1 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
            )}
            {!isSidebarOpen && gi !== 0 && <Separator className="mb-2 mx-2" />}

            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              const linkEl = (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isSidebarOpen ? 'mx-2 gap-3' : 'mx-auto h-10 w-10 justify-center',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              );

              if (!isSidebarOpen) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger>
                      {linkEl}
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                );
              }
              return linkEl;
            })}
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}
