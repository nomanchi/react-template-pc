/**
 * @파일 Mock 테이블 데이터
 */

export interface MockTableRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
}

export const MOCK_TABLE_DATA: MockTableRow[] = [
  { id: '1', name: '김개발', email: 'kim@example.com', role: '관리자', status: 'active', joinedAt: '2024-01-15' },
  { id: '2', name: '이프론트', email: 'lee@example.com', role: '사용자', status: 'active', joinedAt: '2024-02-10' },
  { id: '3', name: '박백엔드', email: 'park@example.com', role: '사용자', status: 'inactive', joinedAt: '2024-03-05' },
  { id: '4', name: '최디자인', email: 'choi@example.com', role: '게스트', status: 'pending', joinedAt: '2024-04-20' },
  { id: '5', name: '정풀스택', email: 'jeong@example.com', role: '관리자', status: 'active', joinedAt: '2024-05-01' },
  { id: '6', name: '한DevOps', email: 'han@example.com', role: '사용자', status: 'active', joinedAt: '2024-06-15' },
  { id: '7', name: '강QA', email: 'kang@example.com', role: '사용자', status: 'inactive', joinedAt: '2024-07-08' },
];

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const MOCK_BREADCRUMBS: BreadcrumbItem[] = [
  { label: '홈', href: '/' },
  { label: '사용자 관리', href: '/components/organisms/page-header' },
  { label: '사용자 목록' },
];
