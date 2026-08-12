"use client";

import {
  Bell,
  Search,
  Sparkles,
  FileText,
  CalendarDays,
  Clock3,
  BarChart3,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="pl-12 lg:pl-0">
          <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
            Tableau de bord
          </p>

          <h1 className="text-base font-black text-slate-900 sm:text-lg">
            Bonjour 👋
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden text-slate-400 hover:text-slate-900 sm:block">
            <Search size={19} />
          </button>

          <button className="relative text-slate-400 hover:text-slate-900">
            <Bell size={19} />

            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[7px] text-white">
              3
            </span>
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">
            Y
          </div>
        </div>
      </header>

      <div className="w-full p-4 sm:p-6 lg:p-8">
        <section className="relative mb-6 overflow-hidden rounded-2xl bg-[#0f172a] p-5 sm:rounded-3xl sm:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/20 blur-[100px]" />

          <div className="relative z-10">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-red-500" />

              <span className="text-[9px] font-black uppercase tracking-widest text-red-500">
                Griot AI
              </span>
            </div>

            <h2 className="max-w-2xl text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Que voulez-vous créer aujourd'hui ?
            </h2>

            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm">
              Créez du contenu professionnel pour vos réseaux sociaux avec
              l'aide de votre assistant IA.
            </p>

            <button className="mt-5 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-red-700 sm:text-xs">
              <Sparkles size={15} />
              Créer une publication
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          <Stat
            icon={<FileText size={18} />}
            title="Contenus créés"
            value="128"
            change="+18%"
          />

          <Stat
            icon={<CalendarDays size={18} />}
            title="Publications"
            value="86"
            change="+12%"
          />

          <Stat
            icon={<Clock3 size={18} />}
            title="Temps économisé"
            value="24h"
            change="+26%"
          />

          <Stat
            icon={<BarChart3 size={18} />}
            title="Engagement"
            value="8,4%"
            change="+9%"
          />
        </section>
      </div>
    </div>
  );
}

function Stat({
  icon,
  title,
  value,
  change,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 sm:h-10 sm:w-10">
          {icon}
        </div>

        <span className="text-[10px] font-bold text-emerald-600 sm:text-xs">
          {change}
        </span>
      </div>

      <p className="truncate text-[10px] font-medium text-slate-400 sm:text-xs">
        {title}
      </p>

      <p className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
        {value}
      </p>
    </div>
  );
}