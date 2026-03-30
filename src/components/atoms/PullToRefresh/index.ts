import { useCallback, useRef, useState } from 'react';

// ─── 타입

export interface UsePullToRefreshOptions {
  /** 실제 데이터 갱신 콜백 */
  onRefresh: () => void | Promise<void>;
  /** 이 거리 이상 당기면 새로고침 확정 (px, 기본값: 80) */
  threshold?: number;
  /** 인디케이터 최대 높이 (px, 기본값: 120) */
  maxPull?: number;
  /** maxPull 초과 시 추가 당김 완화 지수 (기본값: 0.5) */
  resistance?: number;
  /** 수직 제스처로 볼 최소 비율 (기본값: 0.8) */
  minVerticalRatio?: number;
  /** closest 로 무시할 CSS 선택자 목록 */
  excludeSelectors?: string[];
}

export interface UsePullToRefreshHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => Promise<void>;
}

export interface UsePullToRefreshReturn {
  refreshing: boolean;
  pullHeight: number;
  handlers: UsePullToRefreshHandlers;
}

// ─── 훅

/**
 * 스크롤 최상단에서만 아래로 당겨 새로고침을 트리거한다.
 *
 * @example
 * const { refreshing, pullHeight, handlers } = usePullToRefresh({ onRefresh: fetchData });
 * return <div {...handlers}>...</div>;
 */
export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  maxPull = 120,
  resistance = 0.5,
  minVerticalRatio = 0.8,
  excludeSelectors = [],
}: UsePullToRefreshOptions): UsePullToRefreshReturn {
  const [refreshing, setRefreshing] = useState(false);
  const [pullHeight, setPullHeight] = useState(0);

  const startRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pullingRef = useRef<boolean>(false);
  const horizontalRef = useRef<boolean>(false);

  const isExcluded = useCallback(
    (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return excludeSelectors.some((sel) => target.closest(sel) !== null);
    },
    [excludeSelectors],
  );

  const reset = useCallback((): void => {
    setPullHeight(0);
    pullingRef.current = false;
    horizontalRef.current = false;
    document.body.style.overflow = '';
  }, []);

  const touchStart = useCallback(
    (e: React.TouchEvent): void => {
      if (refreshing || isExcluded(e.target)) return;
      const t = e.touches[0];
      startRef.current = { x: t.clientX, y: t.clientY };
      horizontalRef.current = false;
      pullingRef.current = false;
    },
    [refreshing, isExcluded],
  );

  const touchMove = useCallback(
    (e: React.TouchEvent): void => {
      if (window.scrollY > 0 || refreshing || isExcluded(e.target)) return;

      const t = e.touches[0];
      const dx = t.clientX - startRef.current.x;
      const dy = t.clientY - startRef.current.y;
      const dist = Math.hypot(dx, dy) || 1;
      const verticalRatio = Math.abs(dy) / dist;

      if (verticalRatio < minVerticalRatio) {
        horizontalRef.current = true;
        return;
      }

      if (!horizontalRef.current && dy > 0) {
        const h = Math.min(
          dy <= maxPull ? dy : maxPull + Math.pow(dy - maxPull, resistance),
          maxPull,
        );
        pullingRef.current = true;
        setPullHeight(h);
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        reset();
      }
    },
    [refreshing, maxPull, resistance, minVerticalRatio, isExcluded, reset],
  );

  const touchEnd = useCallback(
    async (e: React.TouchEvent): Promise<void> => {
      const t = e.changedTouches[0];
      const dy = t.clientY - startRef.current.y;

      if (dy >= threshold && !horizontalRef.current && pullingRef.current) {
        setRefreshing(true);
        setPullHeight(threshold * 0.7);
        try {
          await Promise.resolve(onRefresh());
        } finally {
          setRefreshing(false);
          reset();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      reset();
    },
    [threshold, onRefresh, reset],
  );

  return {
    refreshing,
    pullHeight,
    handlers: {
      onTouchStart: touchStart,
      onTouchMove: touchMove,
      onTouchEnd: touchEnd,
    },
  };
}