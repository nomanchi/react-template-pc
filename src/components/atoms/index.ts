/**
 * @파일 Atoms Barrel Export
 * @설명 모든 atom 컴포넌트를 re-export합니다.
 * @example import { Typography, Spinner } from '@/components/atoms';
 */

export * from './Typography';
export * from './Spinner';
// shadcn/ui atoms (re-export for convenience)
export { Button } from '@/components/ui/button';
export { Input } from '@/components/ui/input';
export { Badge } from '@/components/ui/badge';
export { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export { Skeleton } from '@/components/ui/skeleton';
export { Separator } from '@/components/ui/separator';
export { Progress } from '@/components/ui/progress';
