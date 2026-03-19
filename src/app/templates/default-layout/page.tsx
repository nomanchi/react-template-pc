import type { Metadata } from 'next';
import { DefaultLayout } from '@/components/templates/DefaultLayout';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = { title: 'DefaultLayout 데모' };

export default function DefaultLayoutDemo() {
  return (
    <DefaultLayout logoText="My Service">
      <div className="space-y-8">
        <div className="space-y-2">
          <Badge variant="secondary">DefaultLayout 데모</Badge>
          <Typography variant="h2">일반 페이지 레이아웃</Typography>
          <Typography variant="body" className="text-muted-foreground max-w-2xl">
            이 페이지는 <code className="rounded bg-muted px-1">DefaultLayout</code>을 사용합니다.
            상단 Header와 하단 Footer가 포함된 일반적인 정보성 페이지용 레이아웃입니다.
          </Typography>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {['특징 1', '특징 2', '특징 3'].map((title) => (
            <Card key={title}>
              <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
              <CardContent>
                <Typography variant="body-sm" className="text-muted-foreground">
                  DefaultLayout children prop으로 전달된 콘텐츠입니다.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-3">
          <Button>시작하기</Button>
          <Button variant="outline">자세히 보기</Button>
        </div>
      </div>
    </DefaultLayout>
  );
}
