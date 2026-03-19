/**
 * @파일 ShowcasePage - 컴포넌트 쇼케이스 페이지 루트 래퍼
 */
import { cn } from '@/lib/utils';

interface ShowcasePageProps {
  title: string;
  description: string;
  category: 'Atoms' | 'Molecules' | 'Organisms' | 'Templates';
  children: React.ReactNode;
}

const categoryColor: Record<ShowcasePageProps['category'], string> = {
  Atoms: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Molecules: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Organisms: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Templates: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

export function ShowcasePage({ title, description, category, children }: ShowcasePageProps) {
  return (
    <div className="max-w-4xl space-y-10">
      {/* 헤더 */}
      <div className="space-y-2">
        <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold', categoryColor[category])}>
          {category}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {/* 스토리들 */}
      <div className="space-y-10">{children}</div>
    </div>
  );
}
