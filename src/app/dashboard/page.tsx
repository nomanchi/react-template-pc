/**
 * @파일 대시보드 페이지
 * @라우트 /dashboard
 * @레이아웃 DashboardLayout
 */

import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/atoms/Typography';
import { Progress } from '@/components/ui/progress';
import { Users, BarChart3, TrendingUp, Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: '대시보드',
};

const stats = [
  { label: '전체 사용자', value: '12,345', change: '+12%', icon: Users, color: 'text-blue-500' },
  { label: '월간 방문자', value: '98,765', change: '+8%', icon: BarChart3, color: 'text-green-500' },
  { label: '전환율', value: '3.24%', change: '+0.5%', icon: TrendingUp, color: 'text-purple-500' },
  { label: '활성 세션', value: '1,234', change: '-3%', icon: Activity, color: 'text-orange-500' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="대시보드"
        description="서비스 현황을 한눈에 확인하세요."
        breadcrumbs={[{ label: '홈', href: '/' }, { label: '대시보드' }]}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <Typography variant="h3">{stat.value}</Typography>
                <Badge variant={isPositive ? 'secondary' : 'destructive'} className="mt-1 text-xs">
                  {stat.change} 전월 대비
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Section */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>목표 달성률</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: '신규 가입', value: 78 },
              { label: '구매 전환', value: 54 },
              { label: '리텐션', value: 91 },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { msg: '새 사용자가 가입했습니다', time: '방금 전' },
                { msg: '결제가 완료되었습니다', time: '5분 전' },
                { msg: '댓글이 등록되었습니다', time: '12분 전' },
                { msg: '시스템 배포가 완료되었습니다', time: '1시간 전' },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span>{item.msg}</span>
                  <Typography variant="caption">{item.time}</Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
