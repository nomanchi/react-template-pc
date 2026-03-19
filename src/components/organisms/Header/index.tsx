/**
 * @파일 Organism - Header
 * @설명 앱 상단 내비게이션 헤더 컴포넌트.
 *        로고, 네비게이션 링크, 유저 드롭다운 메뉴를 포함합니다.
 *
 * ⚠️  shadcn 최신버전(base-ui 기반)에서는 Button에 asChild 미지원.
 *       Link 렌더링이 필요한 경우 직접 <a> 또는 Next.js <Link>를 Button className으로 사용합니다.
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { useAuthStore } from '@/stores';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems?: NavItem[];
  logoText?: string;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: '홈', href: ROUTES.HOME },
  { label: '대시보드', href: ROUTES.DASHBOARD.ROOT },
];

export function Header({
  navItems = defaultNavItems,
  logoText = 'Template PC',
  className,
}: HeaderProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('로그아웃 되었습니다.');
    router.push(ROUTES.AUTH.LOGIN);
  };

  const initials = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : 'U';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className,
      )}
    >
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center px-4">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="mr-8 flex items-center gap-2 font-bold">
          <span className="text-primary">{logoText}</span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-1 items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Area */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> 프로필
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> 설정
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" /> 로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* base-ui Button does not support asChild; use Link styled as Button */
            <Link
              href={ROUTES.AUTH.LOGIN}
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
