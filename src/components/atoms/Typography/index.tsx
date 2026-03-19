/**
 * @파일 Atom - Typography
 * @설명 시맨틱 타이포그래피 컴포넌트.
 *        h1~h4, body, caption, label 등 텍스트 스타일을 일관되게 사용합니다.
 * @example
 *   <Typography as="h1" variant="h1">제목</Typography>
 *   <Typography variant="body">본문 텍스트</Typography>
 */

import { cn } from '@/lib/utils';
import type { BaseProps } from '@/types';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption' | 'label' | 'overline';
type TypographyAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'div';

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'scroll-m-20 text-lg font-medium',
  h6: 'scroll-m-20 text-base font-medium',
  body: 'text-base leading-7',
  'body-sm': 'text-sm leading-6',
  caption: 'text-xs text-muted-foreground',
  label: 'text-sm font-medium leading-none',
  overline: 'text-xs font-semibold uppercase tracking-widest text-muted-foreground',
};

const defaultTagMap: Record<TypographyVariant, TypographyAs> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  body: 'p', 'body-sm': 'p', caption: 'span', label: 'span', overline: 'span',
};

interface TypographyProps extends BaseProps {
  variant?: TypographyVariant;
  as?: TypographyAs;
  children: React.ReactNode;
}

export function Typography({
  variant = 'body',
  as,
  className,
  children,
}: TypographyProps) {
  const Tag = as ?? defaultTagMap[variant];
  return (
    <Tag className={cn(variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
