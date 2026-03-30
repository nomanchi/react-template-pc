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
import { INTRODUCE, SKILLS, EXPERIENCE, PROJECTS, CATEGORY_COLORS } from '@/constants';



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
          <span>{INTRODUCE.name}</span>
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
        {INTRODUCE.careerSummary} · 현재 {INTRODUCE.currentCompany} 재직중
      </div>

      <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
        안녕하세요,{' '}
        <br />
        <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
          {`"${INTRODUCE.name}"`}
        </span>
        입니다
      </h1>

      <p className="mb-3 text-xl font-medium text-slate-600 dark:text-slate-300 sm:text-2xl">
        {INTRODUCE.role}
      </p>

      {/* 3줄 소개 */}
      <div className="mb-10 flex flex-col items-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
        {INTRODUCE.taglines.map((line, i) => (
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
          href={INTRODUCE.github}
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
            href={`mailto:${INTRODUCE.email}`}
            className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:-translate-y-0.5"
          >
            <Mail className="h-5 w-5" />
            {INTRODUCE.email}
          </a>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${INTRODUCE.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Phone className="h-4 w-4" />
              {INTRODUCE.phone}
            </a>
            <a
              href={INTRODUCE.github}
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
            {INTRODUCE.education}
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
        {INTRODUCE.name} · {INTRODUCE.role} ·{' '}
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
