import type { Metadata } from 'next';
import { ShowcasePage, StorySection, StoryPreview, CodeBlock, PropsTable } from '@/components/showcase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USERS } from '@/mocks';

export const metadata: Metadata = { title: 'Avatar' };

export default function AvatarShowcase() {
  return (
    <ShowcasePage
      title="Avatar"
      category="Atoms"
      description="사용자 프로필 이미지 컴포넌트. 이미지 로드 실패 시 이니셜 Fallback을 자동으로 표시합니다."
    >
      <StorySection title="Image & Fallback" description="이미지가 있을 때와 없을 때를 비교합니다.">
        <StoryPreview>
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Felix" />
            <AvatarFallback>FX</AvatarFallback>
          </Avatar>
          {/* 잘못된 URL → Fallback 표시 */}
          <Avatar>
            <AvatarImage src="/broken-url.jpg" alt="Broken" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>김개</AvatarFallback>
          </Avatar>
        </StoryPreview>
        <CodeBlock code={`<Avatar>
  <AvatarImage src="https://..." alt="User" />
  <AvatarFallback>김개</AvatarFallback>
</Avatar>`} />
      </StorySection>

      <StorySection title="Mock 사용자 목록" description="MOCK_USERS 데이터를 활용한 아바타 목록입니다.">
        <StoryPreview>
          <div className="flex items-center gap-3">
            {MOCK_USERS.map((user) => (
              <div key={user.id} className="flex flex-col items-center gap-1">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{user.name}</span>
              </div>
            ))}
          </div>
        </StoryPreview>
        <CodeBlock code={`import { MOCK_USERS } from '@/mocks';

{MOCK_USERS.map((user) => (
  <Avatar key={user.id}>
    <AvatarImage src={user.avatar} alt={user.name} />
    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
  </Avatar>
))}`} />
      </StorySection>

      <StorySection title="Props">
        <PropsTable props={[
          { name: 'src', type: 'string', description: '이미지 URL (AvatarImage)' },
          { name: 'alt', type: 'string', required: true, description: '이미지 대체 텍스트' },
          { name: 'children', type: 'string', required: true, description: '이니셜 텍스트 (AvatarFallback)' },
        ]} />
      </StorySection>
    </ShowcasePage>
  );
}
