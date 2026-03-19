import { redirect } from 'next/navigation';

/**
 * 루트 → 컴포넌트 탐색기 첫 번째 항목으로 리다이렉트
 */
export default function RootPage() {
  redirect('/components/atoms/button');
}
