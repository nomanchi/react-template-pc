/**
 * @파일 StorySection - 단일 스토리 블록
 * @설명 제목, 설명, 미리보기, 코드스니펫을 하나의 섹션으로 묶습니다.
 */

interface StorySectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function StorySection({ title, description, children }: StorySectionProps) {
  return (
    <section className="space-y-4 border-t pt-8 first:border-t-0 first:pt-0">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
