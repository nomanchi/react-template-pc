import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/atoms/Typography';
import { Progress } from '@/components/ui/progress';
import { MOCK_TABLE_DATA, MOCK_BREADCRUMBS } from '@/mocks';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';

export const metadata: Metadata = { title: 'DashboardLayout 데모' };

const stats = [
  { label: '전체 사용자', value: `${MOCK_TABLE_DATA.length}명`, badge: 'active', count: MOCK_TABLE_DATA.filter(u => u.status === 'active').length },
  { label: '월간 방문자', value: '24,182', badge: '+8%', count: null },
  { label: '전환율', value: '3.24%', badge: '+0.5%', count: null },
];

export default function DashboardLayoutDemo() {
  return (
    <DashboardLayout>
      <PageHeader
        title="대시보드"
        description="서비스 현황을 한눈에 확인합니다."
        breadcrumbs={MOCK_BREADCRUMBS.slice(0, 2)}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />내보내기
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />추가
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant="h3">{s.value}</Typography>
              <Badge variant="secondary" className="mt-1 text-xs">{s.badge}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mock 사용자 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 사용자 — MOCK_TABLE_DATA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">이름</th>
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">이메일</th>
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">역할</th>
                  <th className="pb-3 font-medium text-muted-foreground">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MOCK_TABLE_DATA.map((row) => (
                  <tr key={row.id}>
                    <td className="py-3 pr-4 font-medium">{row.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.email}</td>
                    <td className="py-3 pr-4">{row.role}</td>
                    <td className="py-3">
                      <Badge
                        variant={
                          row.status === 'active' ? 'secondary'
                          : row.status === 'inactive' ? 'outline'
                          : 'destructive'
                        }
                      >
                        {row.status === 'active' ? '활성' : row.status === 'inactive' ? '비활성' : '대기중'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="mt-4">
        <CardHeader><CardTitle>목표 달성률</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[{ label: '신규 가입', v: 78 }, { label: '구매 전환', v: 54 }, { label: '리텐션', v: 91 }].map((i) => (
            <div key={i.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{i.label}</span>
                <span className="font-medium">{i.v}%</span>
              </div>
              <Progress value={i.v} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
