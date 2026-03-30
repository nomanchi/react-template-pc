/**
 * @파일 탐색기 네비게이션 설정
 * @설명 좌측 사이드바에 표시할 컴포넌트 목록을 중앙 관리합니다.
 *        컴포넌트 추가 시 이 파일만 수정하면 됩니다.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  color: string;         // Tailwind text color class
  dotColor: string;      // indicator dot color
  items: NavItem[];
}

export const EXPLORER_NAV: NavGroup[] = [
  {
    title: 'Atoms',
    color: 'text-blue-600 dark:text-blue-400',
    dotColor: 'bg-blue-500',
    items: [
      { label: 'Button', href: '/explorer/components/atoms/button', description: '버튼 컴포넌트' },
      { label: 'Typography', href: '/explorer/components/atoms/typography', description: '타이포그래피' },
      { label: 'Badge', href: '/explorer/components/atoms/badge', description: '뱃지/라벨' },
      { label: 'Avatar', href: '/explorer/components/atoms/avatar', description: '아바타' },
      { label: 'Spinner', href: '/explorer/components/atoms/spinner', description: '로딩 인디케이터' },
      { label: 'Input', href: '/explorer/components/atoms/input', description: '텍스트 입력' },
      { label: 'usePullToRefresh', href: '/explorer/components/atoms/pull-to-refresh', description: '당겨서 새로고침 훅' },
    ],
  },
  {
    title: 'Molecules',
    color: 'text-purple-600 dark:text-purple-400',
    dotColor: 'bg-purple-500',
    items: [
      { label: 'FormField', href: '/explorer/components/molecules/form-field', description: 'RHF 통합 폼 필드' },
      { label: 'SearchInput', href: '/explorer/components/molecules/search-input', description: 'Debounce 검색창' },
      { label: 'ConfirmDialog', href: '/explorer/components/molecules/confirm-dialog', description: '확인/취소 모달' },
    ],
  },
  {
    title: 'Organisms',
    color: 'text-emerald-600 dark:text-emerald-400',
    dotColor: 'bg-emerald-500',
    items: [
      { label: 'Header', href: '/explorer/components/organisms/header', description: '상단 네비게이션' },
      { label: 'Sidebar', href: '/explorer/components/organisms/sidebar', description: '사이드바 메뉴' },
      { label: 'PageHeader', href: '/explorer/components/organisms/page-header', description: '페이지 헤더' },
    ],
  },
  {
    title: 'Templates',
    color: 'text-orange-600 dark:text-orange-400',
    dotColor: 'bg-orange-500',
    items: [
      { label: '개요', href: '/explorer/components/templates', description: '템플릿 목록' },
      { label: 'DefaultLayout', href: '/templates/default-layout', description: '기본 레이아웃 (새 탭)' },
      { label: 'AuthLayout', href: '/templates/auth-layout', description: '인증 레이아웃 (새 탭)' },
      { label: 'DashboardLayout', href: '/templates/dashboard-layout', description: '대시보드 레이아웃 (새 탭)' },
    ],
  },
];
