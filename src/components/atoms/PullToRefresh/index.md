# 당겨서 새로고침 (Pull-to-Refresh)

모바일 웹뷰에서 **스크롤이 최상단일 때** 아래로 당기면 새로고침을 트리거하는 터치 제스처 패턴. 프로젝트의 `PullToRefresh.jsx`는 이 패턴을 구현하며, 아래는 **포트폴리오용으로 일반화·단순화한 설명과 예시 코드**다.

---

## 1. 동작 요약

| 단계 | 처리 |
|---|---|
| **시작** | `touchstart`로 시작 좌표 저장. 이미 새로고침 중이거나 제외 영역이면 무시. |
| **이동** | `window.scrollY > 0`이면 무시(본문 스크롤과 충돌 방지). 수직 비율이 낮으면 가로 스크롤로 간주해 당김 취소. 아래로 당긴 거리만큼 인디케이터 영역 높이·불투명도 조절. |
| **종료** | 당김 거리가 임계값 이상이면 `refreshing` 상태로 전환, 부모에서 데이터 갱신. 미만이면 초기화. |
| **완료** | 일정 시간 후 스크롤 잠금 해제·인디케이터 리셋·상단으로 스무스 스크롤(구현별). |

**수직 판별**: 이동 벡터의 `|Δy| / √(Δx² + Δy²)`가 `minVerticalRatio`(예: 0.8) 이상일 때만 “아래로 당김”으로 처리해, 가로 스와이프와 구분한다.

**저항감**: `maxPullDistance`를 넘긴 뒤에는 거리 증가를 완만하게(`resistance` 지수) 적용해 과도한 늘어남을 줄인다.

---

## 2. 프로덕션 컴포넌트와의 대응 (`PullToRefresh.jsx`)

- 스크롤 영역에 **`contentClassName` 클래스**를 붙이고, 마운트 시 `document.querySelector`로 해당 노드에만 터치 리스너를 붙인다.
- **`exceptElementArray`**: 셀렉터 문자열 배열. `e.target.closest(selector)`로 매칭되면 제스처를 무시한다(가로 캐러셀 등).
- 새로고침 중 **`document.body.style.overflow = 'hidden'`** 으로 배경 스크롤을 잠근다.
- 인디케이터는 SVG `path`를 10px 단위로 켜며 진행도를 표현한다.

포트폴리오용 예시에서는 **콘텐츠에 `ref`를 직접 연결**하는 방식으로 바꿔, 클래스 단일 전역 검색에 의존하지 않도록 한다.

---

## 3. 일반화된 예시 코드

아래는 **의존성 최소** 버전이다. 스타일은 인라인·간단 클래스로 두었고, 실제 서비스에서는 디자인 시스템에 맞게 조정하면 된다.

### 3-1. `usePullToRefresh.js` — 로직만 분리

```javascript
import { useCallback, useRef, useState } from 'react';

/**
 * 스크롤 최상단에서만 아래로 당겨 새로고침을 트리거한다.
 * @param {Object} options
 * @param {() => void | Promise<void>} options.onRefresh - 실제 데이터 갱신
 * @param {number} [options.threshold=80] - 이 거리 이상 당기면 새로고침 확정
 * @param {number} [options.maxPull=120] - 인디케이터 최대 높이(px)
 * @param {number} [options.resistance=0.5] - maxPull 초과 시 추가 당김 완화 지수
 * @param {number} [options.minVerticalRatio=0.8] - 수직 제스처로 볼 최소 비율
 * @param {string[]} [options.excludeSelectors=[]] - closest로 무시할 영역
 */
export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  maxPull = 120,
  resistance = 0.5,
  minVerticalRatio = 0.8,
  excludeSelectors = [],
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [pullHeight, setPullHeight] = useState(0);

  const startRef = useRef({ x: 0, y: 0 });
  const pullingRef = useRef(false);
  const horizontalRef = useRef(false);

  const isExcluded = useCallback(
    (target) => excludeSelectors.some((sel) => target.closest(sel)),
    [excludeSelectors],
  );

  const reset = useCallback(() => {
    setPullHeight(0);
    pullingRef.current = false;
    horizontalRef.current = false;
    document.body.style.overflow = '';
  }, []);

  const touchStart = useCallback(
    (e) => {
      if (refreshing || isExcluded(e.target)) return;
      const t = e.touches[0];
      startRef.current = { x: t.clientX, y: t.clientY };
      horizontalRef.current = false;
      pullingRef.current = false;
    },
    [refreshing, isExcluded],
  );

  const touchMove = useCallback(
    (e) => {
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
        let h = dy <= maxPull ? dy : maxPull + Math.pow(dy - maxPull, resistance);
        h = Math.min(h, maxPull);
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
    async (e) => {
      const t = e.changedTouches[0];
      const dy = t.clientY - startRef.current.y;

      if (dy >= threshold && !horizontalRef.current && pullingRef.current) {
        setRefreshing(true);
        setPullHeight(threshold * 0.7);
        try {
          await Promise.resolve(onRefresh?.());
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
    handlers: { onTouchStart: touchStart, onTouchMove: touchMove, onTouchEnd: touchEnd },
  };
}
```

### 3-2. `PullToRefreshExample.jsx` — UI + 연결

```jsx
import { useCallback, useRef, useEffect, useState } from 'react';
import { usePullToRefresh } from './usePullToRefresh';

export default function PullToRefreshExample() {
  const scrollRootRef = useRef(null);
  const [items, setItems] = useState(() => Array.from({ length: 20 }, (_, i) => `항목 ${i + 1}`));

  const refetch = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 800));
    setItems((prev) => [...prev].reverse());
  }, []);

  const { refreshing, pullHeight, handlers } = usePullToRefresh({
    onRefresh: refetch,
    threshold: 80,
    maxPull: 120,
    excludeSelectors: ['.swiper', '[data-no-pull]'],
  });

  useEffect(() => {
    const el = scrollRootRef.current;
    if (!el) return;
    el.addEventListener('touchstart', handlers.onTouchStart, { passive: true });
    el.addEventListener('touchmove', handlers.onTouchMove, { passive: true });
    el.addEventListener('touchend', handlers.onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handlers.onTouchStart);
      el.removeEventListener('touchmove', handlers.onTouchMove);
      el.removeEventListener('touchend', handlers.onTouchEnd);
    };
  }, [handlers]);

  return (
    <div style={{ overflow: 'hidden', minHeight: '100vh', background: '#f5f5f5' }}>
      <div
        style={{
          height: pullHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: refreshing ? 'height 0.25s ease' : 'none',
          background: '#e8eefc',
        }}
      >
        <span style={{ fontSize: 13, color: '#3c70ff' }}>{refreshing ? '새로고침 중…' : '↓ 당겨서 새로고침'}</span>
      </div>

      <div
        ref={scrollRootRef}
        className="refresh_content"
        style={{ height: 'calc(100vh - 48px)', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((t) => (
          <div key={t} style={{ padding: 16, borderBottom: '1px solid #eee', background: '#fff' }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. 구현 시 체크리스트

- **최상단 조건**: `window.scrollY === 0`일 때만 당김을 허용할지, 아니면 스크롤 컨테이너의 `scrollTop`을 쓸지 서비스 구조에 맞게 선택한다.
- **`passive: true`**: 스크롤 성능을 위해 터치 리스너는 가능하면 passive로 등록한다. `preventDefault`가 필요하면 passive를 쓸 수 없다.
- **가로 스크롤 영역**: Swiper 등 내부에서 가로 제스처가 많으면 `excludeSelectors`로 빼거나, 수직 비율 임계값을 조정한다.
- **리스너 의존성**: 프로덕션 `PullToRefresh.jsx`는 `useEffect(..., [])`에 핸들러를 묶어 두어, 옵션 변경 시 클로저가 오래될 수 있다. 포트폴리오 예시처럼 **`handlers`를 의존 배열에 넣거나 ref로 최신 핸들러를 참조**하는 편이 안전하다.
- **접근성 / 데스크톱**: 터치 전용이므로 데스크톱에서는 새로고침 버튼 등 대체 수단을 두는 것이 좋다.

---

## 5. 원본 파일 위치

- `src/components/PullToRefresh.jsx`

포트폴리오에는 **이 문서의 3절 예시**를 그대로 또는 약간 수정해 “모바일 웹에서 제스처와 스크롤 충돌을 어떻게 나눴는지”를 설명하면 된다.
