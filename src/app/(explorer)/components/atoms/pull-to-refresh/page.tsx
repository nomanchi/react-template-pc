import type { Metadata } from 'next';
import { ShowcasePage, StorySection, PropsTable, CodeBlock } from '@/components/showcase';
import { PullToRefreshDemo } from './_demo';

export const metadata: Metadata = { title: 'usePullToRefresh' };

export default function PullToRefreshShowcase() {
  return (
    <ShowcasePage
      title="usePullToRefresh"
      category="Atoms"
      description="스크롤 최상단에서 아래로 당겨 새로고침을 트리거하는 커스텀 훅. 수직/수평 제스처 판별, 저항감(resistance), 제외 영역 지정을 지원합니다."
    >
      <StorySection
        title="인터랙티브 데모"
        description="모바일 기기에서 카드를 아래로 당겨보세요. PC에서는 아래 시뮬레이터 버튼으로 체험할 수 있습니다."
      >
        <PullToRefreshDemo />
      </StorySection>

      <StorySection title="기본 사용법">
        <CodeBlock
          language="tsx"
          code={`import { usePullToRefresh } from '@/components/atoms/PullToRefresh';

function MyList() {
  const { refreshing, pullHeight, handlers } = usePullToRefresh({
    onRefresh: async () => {
      await fetchData(); // 데이터 갱신 로직
    },
  });

  return (
    <div {...handlers} style={{ position: 'relative' }}>
      {/* Pull 인디케이터 */}
      {pullHeight > 0 && (
        <div
          style={{ height: pullHeight }}
          className="flex items-center justify-center overflow-hidden transition-all"
        >
          {refreshing ? <Spinner /> : <ArrowDown />}
        </div>
      )}
      {/* 콘텐츠 */}
      <ul>...</ul>
    </div>
  );
}`}
        />
      </StorySection>

      <StorySection
        title="excludeSelectors 활용"
        description="내부에 스크롤 가능한 영역이 있을 때, 해당 영역에서는 pull-to-refresh가 동작하지 않도록 제외합니다."
      >
        <CodeBlock
          language="tsx"
          code={`const { handlers } = usePullToRefresh({
  onRefresh: fetchData,
  excludeSelectors: ['.scroll-area', '[data-no-pull]'],
});`}
        />
      </StorySection>

      <StorySection title="Options">
        <PropsTable
          props={[
            {
              name: 'onRefresh',
              type: '() => void | Promise<void>',
              description: '새로고침 시 실행할 콜백. async 가능.',
              required: true,
            },
            {
              name: 'threshold',
              type: 'number',
              default: '80',
              description: '이 거리(px) 이상 당기면 새로고침 확정.',
            },
            {
              name: 'maxPull',
              type: 'number',
              default: '120',
              description: '인디케이터가 늘어날 수 있는 최대 높이(px).',
            },
            {
              name: 'resistance',
              type: 'number',
              default: '0.5',
              description: 'maxPull 초과 이후 추가 당김에 대한 완화 지수. 낮을수록 무겁게 느껴짐.',
            },
            {
              name: 'minVerticalRatio',
              type: 'number',
              default: '0.8',
              description: '수직 제스처로 인정할 최소 비율. 수평 스와이프는 무시됨.',
            },
            {
              name: 'excludeSelectors',
              type: 'string[]',
              default: '[]',
              description: 'closest()로 매칭되는 영역에서는 훅이 비활성화됨.',
            },
          ]}
        />
      </StorySection>

      <StorySection title="Return Values">
        <PropsTable
          props={[
            {
              name: 'refreshing',
              type: 'boolean',
              description: 'onRefresh 실행 중 true. 로딩 인디케이터 표시에 사용.',
            },
            {
              name: 'pullHeight',
              type: 'number',
              description: '현재 당긴 거리(px). 인디케이터 높이에 직접 바인딩 가능.',
            },
            {
              name: 'handlers',
              type: 'UsePullToRefreshHandlers',
              description: 'onTouchStart / onTouchMove / onTouchEnd 이벤트 핸들러 묶음. 컨테이너 요소에 스프레드.',
            },
          ]}
        />
      </StorySection>
    </ShowcasePage>
  );
}
