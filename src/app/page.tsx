'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Github,
  Mail,
  ExternalLink,
  Moon,
  Sun,
  Layers,
  ArrowDown,
  Code2,
  Briefcase,
  MessageCircle,
  Phone,
  MapPin,
} from 'lucide-react';

// ─── 데이터

const SKILLS = [
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

const EXPERIENCE = [
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

const PROJECTS = [
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

const CATEGORY_COLORS: Record<string, string> = {
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

// ─── 컴포넌트

function DarkModeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved === 'dark' || (!saved && prefersDark);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label="테마 변경"
      className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {dark
        ? <Sun className="h-5 w-5 text-amber-400" />
        : <Moon className="h-5 w-5 text-slate-600" />
      }
    </button>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm dark:bg-slate-900/90'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Layers className="h-5 w-5 text-indigo-500" />
          <span>정의성</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 sm:flex">
          {(['skills', 'experience', 'projects', 'contact'] as const).map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="capitalize transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {id === 'skills' ? 'Skills' : id === 'experience' ? 'Experience' : id === 'projects' ? 'Projects' : 'Contact'}
            </a>
          ))}
          <Link
            href="/explorer"
            className="flex items-center gap-1.5 rounded-full border border-indigo-200 px-3 py-1 text-indigo-600 transition-colors hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-950"
          >
            <Code2 className="h-3.5 w-3.5" />
            Explorer
          </Link>
        </nav>

        <DarkModeToggle />
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-200/60 blur-3xl dark:bg-indigo-900/30" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-200/60 blur-3xl dark:bg-violet-900/30" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/20" />
      </div>

      {/* 경력 뱃지 */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
        </span>
        경력 8년 10개월 · 현재 (주)아파트아이 재직중
      </div>

      <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
        안녕하세요,{' '}
        <br />
        <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
          정의성
        </span>
        입니다
      </h1>

      <p className="mb-3 text-xl font-medium text-slate-600 dark:text-slate-300 sm:text-2xl">
        Frontend Developer
      </p>

      {/* 3줄 소개 */}
      <div className="mb-10 flex flex-col items-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
        {[
          '어떤 환경에도 잘 적응하고',
          '원활한 커뮤니케이션은 기본! 사교성도 좋으며',
          '번뜩이는 아이디어를 제시하는 개발자입니다',
        ].map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400">{i + 1}.</span>
            <span>{line}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:-translate-y-0.5"
        >
          <Briefcase className="h-4 w-4" />
          Projects
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <MessageCircle className="h-4 w-4" />
          Contact
        </a>
        <a
          href="https://github.com/nomanchi?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>

      <a
        href="#skills"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 transition-colors hover:text-indigo-500 dark:text-slate-500"
        aria-label="아래로 스크롤"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-500">
            What I work with
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Tech Stack
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill.name}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-transform hover:scale-105 ${
                CATEGORY_COLORS[skill.category] ??
                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-500">
            Work History
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Experience
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-8">
          {/* 세로 라인 */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-400 via-violet-400 to-emerald-400 opacity-30" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="relative">
                {/* 타임라인 도트 */}
                <span className={`absolute -left-[1.65rem] top-1.5 sm:-left-[2.15rem] h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${exp.dotColor}`} />

                <div className={`rounded-2xl border-l-4 ${exp.color} bg-white dark:bg-slate-800/60 p-6 shadow-sm`}>
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {exp.company}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                      {exp.duration} · {exp.type}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {exp.role}
                  </p>
                  <p className="mb-4 text-xs text-slate-400 dark:text-slate-500">{exp.period}</p>

                  <ul className="mb-4 space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-slate-700/50 dark:bg-slate-800/50">
      <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {project.description}
      </p>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <Github className="h-4 w-4" />
          Code
        </a>
        {project.live !== '#' && (
          <a
            href={project.live}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-500">
            What I&apos;ve built
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Projects
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="px-6 py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-500">
          Let&apos;s connect
        </p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Contact
        </h2>
        <p className="mb-10 text-slate-500 dark:text-slate-400">
          새로운 기회, 협업, 또는 궁금한 점이 있으시면 편하게 연락해 주세요.
        </p>

        <div className="flex flex-col items-center gap-3">
          <a
            href="mailto:pinale1@naver.com"
            className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:-translate-y-0.5"
          >
            <Mail className="h-5 w-5" />
            pinale1@naver.com
          </a>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+821022160151"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Phone className="h-4 w-4" />
              010-2216-0151
            </a>
            <a
              href="https://github.com/nomanchi?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
            <MapPin className="h-4 w-4" />
            한서대학교 항공소프트웨어공학과 졸업 · 2017
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 px-6 py-8 text-center text-sm text-slate-400 dark:border-slate-800 dark:text-slate-500">
      <p>
        정의성 · Frontend Developer ·{' '}
        <Link href="/explorer" className="text-indigo-500 hover:underline">
          portfolio-react
        </Link>{' '}
        · {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// ─── 메인 페이지

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <NavBar />
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
