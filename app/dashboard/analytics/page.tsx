"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  Eye,
  Heart,
  MessageCircle,
  MousePointerClick,
  Share2,
  TrendingUp,
  Users,
  MoreHorizontal,
  Download,
  Target,
  Sparkles,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Period = "7 jours" | "30 jours" | "3 mois" | "12 mois";

type SocialNetwork = {
  id: string;
  name: string;
  color: string;
  initials: string;
};

/* =========================================================
   RÉSEAUX
========================================================= */

const networks: SocialNetwork[] = [
  {
    id: "facebook",
    name: "Facebook",
    color: "text-blue-600 bg-blue-50",
    initials: "f",
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "text-pink-600 bg-pink-50",
    initials: "◎",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "text-sky-700 bg-sky-50",
    initials: "in",
  },
  {
    id: "x",
    name: "X",
    color: "text-slate-800 bg-slate-100",
    initials: "𝕏",
  },
];

/* =========================================================
   DONNÉES
========================================================= */

const performanceData = [
  { day: "01", value: 42 },
  { day: "03", value: 55 },
  { day: "05", value: 48 },
  { day: "07", value: 68 },
  { day: "09", value: 61 },
  { day: "11", value: 76 },
  { day: "13", value: 72 },
  { day: "15", value: 88 },
  { day: "17", value: 79 },
  { day: "19", value: 94 },
  { day: "21", value: 83 },
  { day: "23", value: 97 },
  { day: "25", value: 91 },
  { day: "27", value: 108 },
  { day: "29", value: 102 },
  { day: "31", value: 118 },
];

const topPosts = [
  {
    title: "Nouvelle formation Flutter pour débutants",
    network: "Instagram",
    date: "15 juillet 2026",
    reach: "12 480",
    engagement: "8,7 %",
    likes: "846",
  },
  {
    title: "5 conseils pour réussir votre projet mobile",
    network: "Facebook",
    date: "12 juillet 2026",
    reach: "9 820",
    engagement: "7,9 %",
    likes: "612",
  },
  {
    title: "Pourquoi apprendre Flutter en 2026 ?",
    network: "LinkedIn",
    date: "10 juillet 2026",
    reach: "7 450",
    engagement: "6,8 %",
    likes: "438",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30 jours");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* GAUCHE */}

          <div className="flex min-w-0 items-center gap-3">

            <Link
              href="/dashboard"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ChevronLeft size={18} />
            </Link>

            <div className="min-w-0">

              <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
                Analyse et performances
              </p>

              <h1 className="truncate text-sm font-black sm:text-base">
                Analytics
              </h1>

            </div>

          </div>

          {/* DROITE */}

          <div className="flex items-center gap-2">

            {/* PÉRIODE */}

            <div className="relative">

              <button
                onClick={() => setShowPeriodMenu(!showPeriodMenu)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                <CalendarDays size={14} />

                <span className="hidden sm:block">
                  {period}
                </span>

                <ChevronDown size={13} />

              </button>

              {showPeriodMenu && (
                <div className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">

                  {(
                    [
                      "7 jours",
                      "30 jours",
                      "3 mois",
                      "12 mois",
                    ] as Period[]
                  ).map((item) => (

                    <button
                      key={item}
                      onClick={() => {
                        setPeriod(item);
                        setShowPeriodMenu(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-[10px] font-semibold transition ${
                        period === item
                          ? "bg-red-50 text-red-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>

                  ))}

                </div>
              )}

            </div>

            {/* EXPORT */}

            <button
              className="
                hidden items-center gap-2
                rounded-xl border border-slate-200
                px-3 py-2
                text-[10px] font-bold text-slate-600
                transition hover:bg-slate-50
                sm:flex
              "
            >
              <Download size={14} />
              Exporter
            </button>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1700px] p-4 sm:p-6 lg:p-8">

        {/* INTRO */}

        <div className="mb-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <BarChart3 size={17} />
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
                  Vue d'ensemble
                </span>

              </div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Analysez vos performances
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
                Suivez l'évolution de vos publications et mesurez
                l'engagement de votre audience sur vos différents réseaux.
              </p>

            </div>

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-[10px] font-semibold text-slate-500">
                Données mises à jour aujourd'hui
              </span>

            </div>

          </div>

        </div>

        {/* =====================================================
            STATISTIQUES
        ===================================================== */}

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

          <StatCard
            title="Portée totale"
            value="42 850"
            percentage="+18,4 %"
            icon={<Users size={17} />}
            description="personnes atteintes"
          />

          <StatCard
            title="Impressions"
            value="68 420"
            percentage="+24,7 %"
            icon={<Eye size={17} />}
            description="vues générées"
          />

          <StatCard
            title="Engagement"
            value="7,8 %"
            percentage="+1,6 %"
            icon={<Heart size={17} />}
            description="taux moyen"
          />

          <StatCard
            title="Clics"
            value="3 284"
            percentage="+12,9 %"
            icon={<MousePointerClick size={17} />}
            description="clics sur vos contenus"
          />

        </div>

        {/* =====================================================
            GRAPHIQUE + RÉSEAUX
        ===================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">

          {/* GRAPHIQUE */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-sm font-black">
                    Évolution des performances
                  </h2>

                  <TrendingUp
                    size={15}
                    className="text-red-500"
                  />

                </div>

                <p className="mt-1 text-[9px] text-slate-400">
                  Évolution de l'engagement au cours des {period.toLowerCase()}
                </p>

              </div>

              <div className="flex items-center gap-3 text-[9px] font-semibold text-slate-400">

                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Engagement
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-200" />
                  Moyenne
                </span>

              </div>

            </div>

            {/* GRAPH */}

            <div className="mt-6">

              <div className="relative h-64">

                {/* LIGNES */}

                <div className="absolute inset-0 flex flex-col justify-between">

                  {[100, 75, 50, 25, 0].map((value) => (

                    <div
                      key={value}
                      className="flex items-center gap-3"
                    >

                      <span className="w-7 text-right text-[8px] text-slate-300">
                        {value}
                      </span>

                      <div className="h-px flex-1 bg-slate-100" />

                    </div>

                  ))}

                </div>

                {/* COURBE */}

                <div className="absolute bottom-0 left-10 right-0 top-0">

                  <svg
                    viewBox="0 0 800 240"
                    preserveAspectRatio="none"
                    className="h-full w-full overflow-visible"
                  >

                    <defs>

                      <linearGradient
                        id="analyticsGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#ef4444"
                          stopOpacity="0.18"
                        />

                        <stop
                          offset="100%"
                          stopColor="#ef4444"
                          stopOpacity="0"
                        />

                      </linearGradient>

                    </defs>

                    <path
                      d="
                        M 0 160
                        L 53 140
                        L 106 150
                        L 160 112
                        L 213 128
                        L 266 92
                        L 320 105
                        L 373 62
                        L 426 85
                        L 480 48
                        L 533 70
                        L 586 35
                        L 640 52
                        L 693 20
                        L 746 38
                        L 800 5
                        L 800 240
                        L 0 240
                        Z
                      "
                      fill="url(#analyticsGradient)"
                    />

                    <path
                      d="
                        M 0 160
                        L 53 140
                        L 106 150
                        L 160 112
                        L 213 128
                        L 266 92
                        L 320 105
                        L 373 62
                        L 426 85
                        L 480 48
                        L 533 70
                        L 586 35
                        L 640 52
                        L 693 20
                        L 746 38
                        L 800 5
                      "
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </div>

              </div>

              {/* DATES */}

              <div className="ml-10 mt-2 flex justify-between">

                {performanceData
                  .filter((_, index) => index % 2 === 0)
                  .map((item) => (

                    <span
                      key={item.day}
                      className="text-[8px] text-slate-300"
                    >
                      {item.day}
                    </span>

                  ))}

              </div>

            </div>

          </section>

          {/* RÉSEAUX */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-sm font-black">
                  Performance par réseau
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  Comparaison de vos réseaux sociaux
                </p>

              </div>

              <button className="text-slate-400 hover:text-slate-700">
                <MoreHorizontal size={17} />
              </button>

            </div>

            <div className="mt-6 space-y-5">

              <NetworkPerformance
                network={networks[0]}
                value="38,2 %"
                engagement="8,4 %"
                progress={84}
              />

              <NetworkPerformance
                network={networks[1]}
                value="31,7 %"
                engagement="9,1 %"
                progress={76}
              />

              <NetworkPerformance
                network={networks[2]}
                value="20,4 %"
                engagement="6,7 %"
                progress={58}
              />

              <NetworkPerformance
                network={networks[3]}
                value="9,7 %"
                engagement="4,2 %"
                progress={35}
              />

            </div>

          </section>

        </div>

        {/* =====================================================
            INDICATEURS DÉTAILLÉS
        ===================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">

          <MiniMetric
            icon={<Share2 size={17} />}
            title="Partages"
            value="1 248"
            evolution="+15,2 %"
          />

          <MiniMetric
            icon={<MessageCircle size={17} />}
            title="Commentaires"
            value="684"
            evolution="+9,8 %"
          />

          <MiniMetric
            icon={<Target size={17} />}
            title="Taux de conversion"
            value="4,6 %"
            evolution="+0,8 %"
          />

        </div>

        {/* =====================================================
            MEILLEURES PUBLICATIONS
        ===================================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Sparkles size={15} />
                </div>

                <h2 className="text-sm font-black">
                  Meilleures publications
                </h2>

              </div>

              <p className="mt-1 text-[9px] text-slate-400">
                Les contenus qui ont généré le plus d'engagement.
              </p>

            </div>

            <Link
              href="/dashboard/publications"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50"
            >
              Voir toutes les publications
              <ArrowUpRight size={13} />
            </Link>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>

                <tr className="border-b border-slate-100 text-left">

                  <th className="px-5 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Publication
                  </th>

                  <th className="px-5 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Réseau
                  </th>

                  <th className="px-5 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Portée
                  </th>

                  <th className="px-5 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Engagement
                  </th>

                  <th className="px-5 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    J'aime
                  </th>

                </tr>

              </thead>

              <tbody>

                {topPosts.map((post, index) => (

                  <tr
                    key={post.title}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[10px] font-black text-red-600">
                          {index + 1}
                        </div>

                        <div className="min-w-0">

                          <p className="max-w-[300px] truncate text-[10px] font-bold text-slate-800">
                            {post.title}
                          </p>

                          <p className="mt-1 text-[8px] text-slate-400">
                            {post.date}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[9px] font-bold text-slate-600">
                        {post.network}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span className="text-[10px] font-bold text-slate-700">
                        {post.reach}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span className="font-black text-red-600 text-[10px]">
                        {post.engagement}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span className="text-[10px] font-bold text-slate-700">
                        {post.likes}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =====================================================
            RÉSUMÉ BAS DE PAGE
        ===================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* RÉPARTITION */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h2 className="text-sm font-black">
              Répartition de l'engagement
            </h2>

            <p className="mt-1 text-[9px] text-slate-400">
              Comment votre audience interagit avec vos contenus.
            </p>

            <div className="mt-6 space-y-4">

              <EngagementRow
                label="J'aime"
                value="64 %"
                progress={64}
              />

              <EngagementRow
                label="Partages"
                value="18 %"
                progress={18}
              />

              <EngagementRow
                label="Commentaires"
                value="11 %"
                progress={11}
              />

              <EngagementRow
                label="Clics"
                value="7 %"
                progress={7}
              />

            </div>

          </section>

          {/* INSIGHT */}

          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-6 text-white shadow-lg shadow-red-600/10">

            <Sparkles className="absolute -right-5 -top-5 h-28 w-28 rotate-12 text-white/10" />

            <div className="relative z-10">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Sparkles size={17} />
              </div>

              <h2 className="mt-5 text-lg font-black">
                Votre meilleur résultat
              </h2>

              <p className="mt-2 max-w-md text-xs leading-relaxed text-red-100">
                Les publications éducatives et les contenus liés aux
                formations génèrent actuellement le meilleur engagement
                auprès de votre audience.
              </p>

              <div className="mt-5 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <TrendingUp size={15} />
                </div>

                <div>

                  <p className="text-[9px] text-red-100">
                    Progression moyenne
                  </p>

                  <p className="text-sm font-black">
                    +18,4 %
                  </p>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  percentage,
  icon,
  description,
}: {
  title: string;
  value: string;
  percentage: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="flex items-start justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
          {icon}
        </div>

        <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[8px] font-black text-green-600">
          <ArrowUpRight size={10} />
          {percentage}
        </span>

      </div>

      <div className="mt-4">

        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>

        <p className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
          {value}
        </p>

        <p className="mt-1 text-[9px] text-slate-400">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   NETWORK PERFORMANCE
========================================================= */

function NetworkPerformance({
  network,
  value,
  engagement,
  progress,
}: {
  network: SocialNetwork;
  value: string;
  engagement: string;
  progress: number;
}) {
  return (
    <div>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-black ${network.color}`}
          >
            {network.initials}
          </div>

          <div>

            <p className="text-[10px] font-bold text-slate-800">
              {network.name}
            </p>

            <p className="text-[8px] text-slate-400">
              Engagement : {engagement}
            </p>

          </div>

        </div>

        <span className="text-[10px] font-black text-slate-700">
          {value}
        </span>

      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-red-500 transition-all"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({
  icon,
  title,
  value,
  evolution,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  evolution: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
          {icon}
        </div>

        <div>

          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-lg font-black">
            {value}
          </p>

        </div>

      </div>

      <span className="rounded-full bg-green-50 px-2 py-1 text-[8px] font-black text-green-600">
        {evolution}
      </span>

    </div>
  );
}

/* =========================================================
   ENGAGEMENT ROW
========================================================= */

function EngagementRow({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-[10px] font-semibold text-slate-600">
          {label}
        </span>

        <span className="text-[9px] font-black text-slate-700">
          {value}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-red-500"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>
  );
}