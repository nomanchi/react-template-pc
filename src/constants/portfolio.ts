// ─── 개인 소개 데이터
export const INTRODUCE = {
  /** 이름 */
  name: '정의성',
  /** 직함 */
  role: 'Frontend Developer',
  /** 총 경력 요약 */
  careerSummary: '경력 8년 10개월',
  /** 현재 재직 중인 회사 */
  currentCompany: '(주)아파트아이',
  /** 3줄 소개 */
  taglines: [
    '어떤 환경에도 잘 적응하고',
    '원활한 커뮤니케이션은 기본! 사교성도 좋으며',
    '번뜩이는 아이디어를 제시하는 개발자입니다.',
  ],
  /** 연락처 */
  email: 'pinale1@naver.com',
  phone: '010-2216-0151',
  phoneTel: '+821022160151',
  /** 링크 */
  github: 'https://github.com/nomanchi?tab=repositories',
  /** 학력 */
  education: '한서대학교 항공소프트웨어공학과 졸업 · 2017',
} as const;

export const SKILLS = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'TailwindCSS', category: 'Styling' },
  { name: 'HTML5', category: 'Styling' },
  { name: 'shadcn/ui', category: 'UI Library' },
  { name: 'Zustand', category: 'State' },
  { name: 'TanStack Query', category: 'Data Fetching' },
  { name: 'React Hook Form', category: 'Forms' },
  { name: 'Zod', category: 'Validation' },
  { name: 'Axios', category: 'HTTP' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'Canvas API', category: 'Graphics' },
  { name: 'WebSocket', category: 'Realtime' },
  { name: 'Docker', category: 'Infra' },
  { name: 'GCP', category: 'Infra' },
  { name: 'Azure', category: 'Infra' },
  { name: 'Jenkins', category: 'Infra' },
  { name: 'Sentry', category: 'Tool' },
  { name: 'GitLab', category: 'Tool' },
  { name: 'Git', category: 'Tool' },
  { name: 'Jira / Confluence', category: 'Tool' },
];

export const EXPERIENCE = [
  {
    company: '(주)아파트아이',
    role: 'Frontend Developer',
    period: '2023.08 – 현재',
    duration: '2년 8개월',
    type: '정규직',
    color: 'border-indigo-500',
    dotColor: 'bg-indigo-500',
    highlights: [
      'Next.js 기반 WebApp 프론트엔드 개발 및 UI/UX 개선',
      'TanStack Query 기반 무한스크롤 커뮤니티 게시판 구현 + 낙관적 업데이트(HOC)',
      'TNK Factory·애드팝콘·시크릿케이 등 제휴 SDK App-Web 연동',
      'Sentry Self-hosted 도입 — GCP VM 기반 모니터링 시스템 구축 및 운영',
      'FormData 기반 이미지 처리 개선으로 서버 부하 감소 및 응답 속도 향상',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'React Query', 'Zustand', 'Azure', 'GCP', 'Docker', 'Sentry'],
  },
  {
    company: '주식회사 텔레웍스',
    role: 'Frontend Developer',
    period: '2022.08 – 2023.08',
    duration: '1년 1개월',
    type: '정규직',
    color: 'border-violet-500',
    dotColor: 'bg-violet-500',
    highlights: [
      'LG CLOi 로봇 설치 간소화 툴 — Canvas 기반 라이다 시각화 및 인터랙션 구현 (Android WebView)',
      '택배/주문결제 관리자 대시보드 — React + Firebase 실시간 데이터 연동',
      'Chart.js 기반 매출 통계 시각화 (일/주/월), NoSQL 실시간 상태 반영',
      '컴포넌트 재사용률 80% 이상 확보로 유지보수 효율 향상',
    ],
    stack: ['React', 'Vue (Nuxt)', 'Firebase', 'Firestore', 'WebSocket', 'Canvas API', 'Chart.js'],
  },
  {
    company: '오픈오브젝트',
    role: 'Frontend Developer',
    period: '2016.04 – 2020.11',
    duration: '4년 8개월',
    type: '정규직',
    color: 'border-emerald-500',
    dotColor: 'bg-emerald-500',
    highlights: [
      'SK B tv Linux STB UI 개발 — 음성인식(Nugu), 편성표, VOD, 광고 등 핵심 기능 신규 개발 및 고도화',
      'ICS→VCS 클라우드 전환 프로젝트 인터페이스 정합 작업 수행',
      'React 기반 UI를 Vue로 리팩토링 — 결제 파트 중심, 성능 및 유지보수성 개선',
      '해군 IoT 스마트워치 프로젝트 — 전자정부프레임워크 기반 실시간 모니터링 웹 구축',
    ],
    stack: ['JavaScript', 'Lua Script', 'C++', 'React', 'Vue', 'Linux', 'Java', 'JSP'],
  },
];

export const PROJECTS = [
  {
    title: 'portfolio-react',
    description:
      'Next.js 15 기반 PC 브라우저 프론트엔드 일관성 템플릿. Atomic Design Pattern과 현대적인 스택(shadcn/ui, TanStack Query, Zustand, Zod)을 통합한 보일러플레이트.',
    tags: ['Next.js 15', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'Zustand'],
    github: 'https://github.com/nomanchi?tab=repositories',
    live: '/explorer',
  },
  {
    title: '아파트아이 커뮤니티 게시판',
    description:
      'useInfiniteQuery 기반 무한스크롤 게시판. 낙관적 업데이트, HOC 패턴으로 인증·닉네임 검증 처리. react-query 캐싱 구조 최적화 및 Zustand 상태 관리 적용.',
    tags: ['React', 'TanStack Query', 'Zustand', 'HOC', 'Next.js'],
    github: 'https://github.com/nomanchi?tab=repositories',
    live: '#',
  },
  {
    title: 'LG CLOi 로봇 설치 간소화 툴',
    description:
      'Vue 기반 Android WebView 설치 툴. Canvas로 라이다·맵 이미지를 직접 드로잉하고 줌/이동/편집 인터랙션 구현. 로봇 센서 데이터 기반 실시간 상태 반영.',
    tags: ['Vue', 'Canvas API', 'WebSocket', 'Android WebView'],
    github: 'https://github.com/nomanchi?tab=repositories',
    live: '#',
  },
  {
    title: 'Sentry Self-hosted 모니터링',
    description:
      'GCP VM(Linux) 위에 Sentry를 직접 구축·운영. Web Vital 기반 성능 모니터링 체계화, 개발/운영 환경 구분 에러 로깅 전략 수립으로 이슈 대응 속도 향상.',
    tags: ['Sentry', 'GCP', 'Linux', 'Docker', 'Web Vitals'],
    github: 'https://github.com/nomanchi?tab=repositories',
    live: '#',
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Frontend:      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Language:      'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Styling:       'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'UI Library':  'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
  State:         'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Data Fetching':'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Forms:         'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  Validation:    'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  HTTP:          'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  Backend:       'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Graphics:      'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Realtime:      'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Infra:         'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Tool:          'bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-300',
};