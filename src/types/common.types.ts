/**
 * @파일 공통 TypeScript 타입 정의
 * @설명 프로젝트 전반에 걸쳐 사용되는 공통 타입들을 정의합니다.
 */

// ────────────────────────────────────────────────────────────────────────────
// Utility Types
// ────────────────────────────────────────────────────────────────────────────

/** null 또는 undefined 가능 타입 */
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

/** 객체의 특정 키를 Optional로 변환 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 객체의 특정 키를 Required로 변환 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// ────────────────────────────────────────────────────────────────────────────
// Component Types
// ────────────────────────────────────────────────────────────────────────────

/** 자식 컴포넌트를 가지는 props 기본 타입 */
export interface WithChildren {
  children: React.ReactNode;
}

/** className props */
export interface WithClassName {
  className?: string;
}

/** 컴포넌트 기본 props */
export type BaseProps = WithClassName;

// ────────────────────────────────────────────────────────────────────────────
// Pagination Types
// ────────────────────────────────────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// ────────────────────────────────────────────────────────────────────────────
// Sort & Filter Types
// ────────────────────────────────────────────────────────────────────────────

export type SortOrder = 'asc' | 'desc';

export interface SortParams {
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface SearchParams {
  keyword?: string;
}

/** 공통 목록 조회 파라미터 */
export type ListParams = PaginationParams & SortParams & SearchParams;

// ────────────────────────────────────────────────────────────────────────────
// Status Types
// ────────────────────────────────────────────────────────────────────────────

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: Nullable<T>;
  status: LoadingStatus;
  error: Nullable<string>;
}

// ────────────────────────────────────────────────────────────────────────────
// Form Types
// ────────────────────────────────────────────────────────────────────────────

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
