'use client';

import { useState, useRef, useCallback } from 'react';
import { RefreshCw, ArrowDown, Smartphone, Mouse } from 'lucide-react';
import { usePullToRefresh } from '@/components/atoms/PullToRefresh';
import { cn } from '@/lib/utils';

// ─── 목 데이터

const MOCK_ITEMS = [
  { id: 1, emoji: '🚀', title: 'Next.js 16 릴리즈', time: '방금 전' },
  { id: 2, emoji: '✨', title: 'React 19 안정 버전 출시', time: '2분 전' },
  { id: 3, emoji: '🎨', title: 'TailwindCSS v4 정식 공개', time: '5분 전' },
  { id: 4, emoji: '🔧', title: 'TypeScript 6.0 베타', time: '12분 전' },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ─── 모바일 실제 데모

function MobileDemo() {
  const [items, setItems] = useState(MOCK_ITEMS);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const onRefresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1200));
    setItems(shuffle(MOCK_ITEMS));
    setLastRefreshed(new Date().toLocaleTimeString('ko-KR'));
  }, []);

  const { refreshing, pullHeight, handlers } = usePullToRefresh({ onRefresh, threshold: 70 });

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border shadow-md">
      {/* 폰 헤더 */}
      <div className="flex items-center justify-between bg-muted/60 px-4 py-2.5 text-xs text-muted-foreground">
        <span>📱 모바일 뷰</span>
        {lastRefreshed && <span>마지막 갱신: {lastRefreshed}</span>}
      </div>

      {/* 스크롤 영역 */}
      <div
        {...handlers}
        className="h-72 overflow-y-auto overscroll-none bg-background"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Pull 인디케이터 */}
        <div
          className="flex items-center justify-center overflow-hidden transition-[height] duration-150"
          style={{ height: pullHeight }}
        >
          {refreshing ? (
            <RefreshCw className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <ArrowDown
              className={cn(
                'h-5 w-5 transition-all duration-150',
                pullHeight > 70 ? 'rotate-180 text-primary' : 'text-muted-foreground',
              )}
            />
          )}
        </div>

        {/* 피드 아이템 */}
        <ul className="divide-y">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3">
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </li>
          ))}

          {/* 하단 패딩 */}
          <li className="py-6 text-center text-xs text-muted-foreground">
            위로 당겨서 새로고침
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─── PC 시뮬레이터

function PCSimulator() {
  const [items, setItems] = useState(MOCK_ITEMS);
  const [pullHeight, setPullHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number>(0);
  const MAX_PULL = 100;
  const THRESHOLD = 70;

  const triggerRefresh = useCallback(async () => {
    setRefreshing(true);
    setPullHeight(THRESHOLD * 0.7);
    await new Promise((r) => setTimeout(r, 1200));
    setItems(shuffle(MOCK_ITEMS));
    setLastRefreshed(new Date().toLocaleTimeString('ko-KR'));
    setRefreshing(false);
    setPullHeight(0);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || refreshing) return;
      const dy = e.clientY - startYRef.current;
      if (dy > 0) {
        const h = Math.min(dy <= MAX_PULL ? dy : MAX_PULL + Math.pow(dy - MAX_PULL, 0.5), MAX_PULL);
        setPullHeight(h);
      }
    },
    [isDragging, refreshing],
  );

  const onMouseUp = useCallback(async () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (pullHeight >= THRESHOLD && !refreshing) {
      await triggerRefresh();
    } else {
      setPullHeight(0);
    }
  }, [isDragging, pullHeight, refreshing, triggerRefresh]);

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border shadow-md select-none">
      <div className="flex items-center justify-between bg-muted/60 px-4 py-2.5 text-xs text-muted-foreground">
        <span>🖥️ PC 시뮬레이터 (마우스로 드래그)</span>
        {lastRefreshed && <span>마지막 갱신: {lastRefreshed}</span>}
      </div>

      <div
        className={cn(
          'h-72 overflow-y-auto bg-background',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Pull 인디케이터 */}
        <div
          className="flex items-center justify-center overflow-hidden transition-[height] duration-150"
          style={{ height: pullHeight }}
        >
          {refreshing ? (
            <RefreshCw className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <ArrowDown
              className={cn(
                'h-5 w-5 transition-all duration-150',
                pullHeight >= THRESHOLD ? 'rotate-180 text-primary scale-110' : 'text-muted-foreground',
              )}
            />
          )}
        </div>

        {/* 피드 */}
        <ul className="divide-y">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3">
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </li>
          ))}
          <li className="py-4 text-center text-xs text-muted-foreground">
            {pullHeight >= THRESHOLD
              ? '✅ 놓으면 새로고침됩니다!'
              : `아래로 드래그 (${Math.round(pullHeight)} / ${THRESHOLD}px)`}
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─── 탭 데모 래퍼

type DemoTab = 'pc' | 'mobile';

export function PullToRefreshDemo() {
  const [tab, setTab] = useState<DemoTab>('pc');

  return (
    <div className="space-y-4">
      {/* 탭 */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('pc')}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
            tab === 'pc'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:text-foreground',
          )}
        >
          <Mouse className="h-3.5 w-3.5" />
          PC 시뮬레이터
        </button>
        <button
          onClick={() => setTab('mobile')}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
            tab === 'mobile'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:text-foreground',
          )}
        >
          <Smartphone className="h-3.5 w-3.5" />
          모바일 (실제 훅)
        </button>
      </div>

      {/* 데모 */}
      <div className="rounded-xl border bg-muted/30 p-6">
        {tab === 'pc' ? <PCSimulator /> : <MobileDemo />}
      </div>

      {/* 안내 */}
      <p className="text-xs text-muted-foreground">
        {tab === 'pc'
          ? '💡 카드 내부를 마우스로 아래로 드래그하세요. 70px 이상 당기면 새로고침됩니다.'
          : '💡 모바일 기기에서 목록 최상단까지 스크롤한 뒤 아래로 당기세요.'}
      </p>
    </div>
  );
}
