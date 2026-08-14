"use client";

import React from "react";
import Link from "next/link";
import {
  Plus,
  CalendarDays,
  FileText,
  Send,
  Clock3,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  Share2,
  BarChart3,
  ArrowUpRight,
  ChevronRight,
  MoreHorizontal,
  Sparkles,
  CheckCircle2,
  CircleAlert,
  Image as ImageIcon,
  Eye,
  PenTool,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =========================================================
   TYPES
========================================================= */

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: React.ReactNode;
  description: string;
};

type SocialIconProps = {
  className?: string;
};

/* =========================================================
   ICONES SOCIALES
   On évite Facebook / Instagram / Linkedin de lucide-react
========================================================= */

const FacebookIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.006 10.125 11.927v-8.432H7.078v-3.495h3.047V9.413c0-3.022 1.791-4.693 4.533-4.693 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.956.931-1.956 1.887v2.257h3.328l-.532 3.495h-2.796V24C19.612 23.079 24 18.092 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
    />
  </svg>
);

const LinkedinIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 8.99h3.56v11.46H3.56V8.99z" />
  </svg>
);

const TikTokIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <span className={`font-black ${className}`}>♪</span>
);

/* =========================================================
   DONNEES
========================================================= */

const engagementData = [
  { day: "Lun", engagement: 320 },
  { day: "Mar", engagement: 460 },
  { day: "Mer", engagement: 390 },
  { day: "Jeu", engagement: 610 },
  { day: "Ven", engagement: 540 },
  { day: "Sam", engagement: 720 },
  { day: "Dim", engagement: 680 },
];

const publicationData = [
  { network: "Facebook", publications: 18 },
  { network: "Instagram", publications: 24 },
  { network: "LinkedIn", publications: 12 },
  { network: "TikTok", publications: 9 },
];

const contentDistribution = [
  {
    name: "Publications",
    value: 42,
  },
  {
    name: "Images",
    value: 28,
  },
  {
    name: "Vidéos",
    value: 18,
  },
  {
    name: "Carrousels",
    value: 12,
  },
];

const recentPosts = [
  {
    title: "Nouvelle formation Flutter",
    network: "Facebook",
    date: "Aujourd'hui, 09:30",
    status: "Publié",
    statusType: "success",
    engagement: "8,4%",
  },
  {
    title: "5 conseils pour réussir son projet digital",
    network: "Instagram",
    date: "Hier, 18:00",
    status: "Publié",
    statusType: "success",
    engagement: "6,8%",
  },
  {
    title: "Découvrez nos nouveaux services",
    network: "LinkedIn",
    date: "12 août, 14:30",
    status: "Publié",
    statusType: "success",
    engagement: "5,2%",
  },
  {
    title: "Présentation de notre équipe",
    network: "Instagram",
    date: "11 août, 10:00",
    status: "Brouillon",
    statusType: "draft",
    engagement: "-",
  },
];

const scheduledPosts = [
  {
    title: "Les tendances digitales de 2026",
    network: "Instagram",
    date: "14 août 2026",
    time: "10:00",
  },
  {
    title: "Conseils pour développer sa communauté",
    network: "Facebook",
    date: "15 août 2026",
    time: "14:30",
  },
  {
    title: "Nouveaux services Presta",
    network: "LinkedIn",
    date: "16 août 2026",
    time: "09:00",
  },
];

/* =========================================================
   PAGE DASHBOARD
========================================================= */

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="pl-14 md:pl-12 lg:pl-0 xl:pl-0">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
              Tableau de bord
            </p>

            <h1 className="mt-1 text-lg font-black tracking-tight sm:text-xl">
              Bonjour
            </h1>

            <p className="mt-1 text-[11px] text-slate-400">
              Voici un aperçu de votre activité sur Griot AI.
            </p>
          </div>

          <Link
            href="/dashboard/publication"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
          >
            <Plus size={15} />
            Nouvelle publication
          </Link>
        </div>
      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1700px] p-4 sm:p-6 lg:p-8">
        {/* ===================================================
            ACTIONS RAPIDES
        =================================================== */}

        <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction
            href="/dashboard/publication"
            icon={<PenTool size={17} />}
            title="Créer"
            description="Publication"
          />

          <QuickAction
            href="/dashboard/calendrier"
            icon={<CalendarDays size={17} />}
            title="Planifier"
            description="Calendrier"
          />

          <QuickAction
            href="/dashboard/medias"
            icon={<ImageIcon size={17} />}
            title="Médias"
            description="Bibliothèque"
          />

          <QuickAction
            href="/dashboard/analytics"
            icon={<BarChart3 size={17} />}
            title="Analytics"
            description="Performance"
          />
        </section>

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Publications"
            value="63"
            change="+12,5%"
            positive
            description="ce mois-ci"
            icon={<FileText size={19} />}
          />

          <StatCard
            title="Publications programmées"
            value="18"
            change="+8,2%"
            positive
            description="à venir"
            icon={<Clock3 size={19} />}
          />

          <StatCard
            title="Engagement"
            value="7,8%"
            change="+1,4%"
            positive
            description="vs mois dernier"
            icon={<Heart size={19} />}
          />

          <StatCard
            title="Audience totale"
            value="12,8K"
            change="+6,7%"
            positive
            description="abonnés"
            icon={<Users size={19} />}
          />
        </section>

        {/* ===================================================
            GRAPHIQUES
        =================================================== */}

        <section className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
          {/* ENGAGEMENT */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-black">
                  Évolution de l'engagement
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Interactions générées par vos publications cette semaine
                </p>
              </div>

              <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-500">
                7 derniers jours
                <ChevronRight size={12} />
              </button>
            </div>

            <div className="mt-6 h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient
                      id="engagementGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#dc2626"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor="#dc2626"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 10,
                      fill: "#94a3b8",
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 10,
                      fill: "#94a3b8",
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "11px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="#dc2626"
                    strokeWidth={3}
                    fill="url(#engagementGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DISTRIBUTION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-sm font-black">
                Répartition des contenus
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Types de contenus publiés
              </p>
            </div>

            <div className="mt-4 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {contentDistribution.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          [
                            "#dc2626",
                            "#f97316",
                            "#64748b",
                            "#94a3b8",
                          ][index]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {contentDistribution.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: [
                          "#dc2626",
                          "#f97316",
                          "#64748b",
                          "#94a3b8",
                        ][index],
                      }}
                    />

                    <span className="text-[10px] font-medium text-slate-500">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-[10px] font-black text-slate-700">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            PUBLICATIONS PAR RÉSEAU
        =================================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black">
                Publications par réseau
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Nombre de contenus publiés sur chaque plateforme
              </p>
            </div>

            <Link
              href="/dashboard/reseaux_sociaux"
              className="text-[10px] font-bold text-red-600 hover:text-red-700"
            >
              Gérer les réseaux
            </Link>
          </div>

          <div className="mt-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={publicationData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="network"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#64748b",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#94a3b8",
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="publications"
                  fill="#dc2626"
                  radius={[6, 6, 0, 0]}
                  barSize={38}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ===================================================
            DEUX COLONNES
        =================================================== */}

        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(330px,0.8fr)]">
          {/* PUBLICATIONS RECENTES */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-sm font-black">
                  Publications récentes
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Les derniers contenus de votre espace
                </p>
              </div>

              <Link
                href="/dashboard/mes_publications"
                className="flex items-center gap-1 text-[10px] font-bold text-red-600"
              >
                Voir tout
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentPosts.map((post) => (
                <div
                  key={post.title}
                  className="flex items-center gap-3 p-4 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <FileText size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-800">
                      {post.title}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-[9px] text-slate-400">
                        {post.network}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-slate-300" />

                      <span className="text-[9px] text-slate-400">
                        {post.date}
                      </span>
                    </div>
                  </div>

                  <div className="hidden text-right sm:block">
                    <StatusBadge type={post.statusType}>
                      {post.status}
                    </StatusBadge>

                    {post.engagement !== "-" && (
                      <p className="mt-1 text-[9px] font-bold text-slate-500">
                        {post.engagement} engagement
                      </p>
                    )}
                  </div>

                  <button className="text-slate-400 hover:text-slate-700">
                    <MoreHorizontal size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PROGRAMMATION */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-sm font-black">
                  Prochaines publications
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Votre planning à venir
                </p>
              </div>

              <Link
                href="/dashboard/calendrier"
                className="flex items-center gap-1 text-[10px] font-bold text-red-600"
              >
                Calendrier
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {scheduledPosts.map((post) => (
                <div key={post.title} className="p-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                      <CalendarDays size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-slate-800">
                        {post.title}
                      </p>

                      <p className="mt-1 text-[9px] text-slate-400">
                        {post.network}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] font-bold text-red-600">
                          {post.date}
                        </span>

                        <span className="text-[9px] text-slate-300">
                          •
                        </span>

                        <span className="text-[9px] text-slate-500">
                          {post.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <Link
                href="/dashboard/calendrier"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <CalendarDays size={14} />
                Voir le calendrier
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================
            RÉSEAUX + PERFORMANCE
        =================================================== */}

        <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* RESEAUX */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black">
                  Réseaux sociaux
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  État de vos comptes connectés
                </p>
              </div>

              <Link
                href="/dashboard/reseaux_sociaux"
                className="text-[10px] font-bold text-red-600"
              >
                Gérer
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <SocialAccount
                icon={<FacebookIcon />}
                name="Facebook"
                account="Presta Officiel"
                connected
              />

              <SocialAccount
                icon={<InstagramIcon />}
                name="Instagram"
                account="@presta_officiel"
                connected
              />

              <SocialAccount
                icon={<LinkedinIcon />}
                name="LinkedIn"
                account="Presta SARL"
                connected
              />

              <SocialAccount
                icon={<TikTokIcon />}
                name="TikTok"
                account="@presta_officiel"
                connected={false}
              />
            </div>
          </div>

          {/* PERFORMANCE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-sm font-black">
                Performance globale
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Résumé de vos résultats ce mois-ci
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <PerformanceItem
                icon={<Eye size={15} />}
                value="48,6K"
                label="Vues"
              />

              <PerformanceItem
                icon={<Heart size={15} />}
                value="6,2K"
                label="J'aime"
              />

              <PerformanceItem
                icon={<MessageCircle size={15} />}
                value="824"
                label="Commentaires"
              />

              <PerformanceItem
                icon={<Share2 size={15} />}
                value="1,4K"
                label="Partages"
              />
            </div>

            <div className="mt-5 rounded-xl bg-red-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white">
                  <TrendingUp size={17} />
                </div>

                <div>
                  <p className="text-[11px] font-black text-red-700">
                    Votre engagement progresse
                  </p>

                  <p className="mt-1 text-[9px] text-red-600/70">
                    +14,8% par rapport au mois dernier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ACTIVITÉ RÉCENTE
        =================================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-sm font-black">
              Activité récente
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Les dernières actions effectuées dans votre espace
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <ActivityItem
              icon={<CheckCircle2 size={16} />}
              title="Publication publiée"
              description="Nouvelle formation Flutter"
              time="Il y a 25 min"
              success
            />

            <ActivityItem
              icon={<CalendarDays size={16} />}
              title="Publication programmée"
              description="Tendances digitales de 2026"
              time="Il y a 1 h"
            />

            <ActivityItem
              icon={<Sparkles size={16} />}
              title="Contenu généré avec l'IA"
              description="5 propositions de publications"
              time="Il y a 2 h"
            />
          </div>
        </section>

        {/* ===================================================
            CTA
        =================================================== */}

        <section className="relative mt-6 overflow-hidden rounded-2xl bg-red-600 p-6 text-white shadow-xl shadow-red-600/10 sm:p-8">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Sparkles size={19} />
            </div>

            <h2 className="text-xl font-black sm:text-2xl">
              Créez votre prochaine publication avec l'IA
            </h2>

            <p className="mt-2 max-w-xl text-xs leading-relaxed text-red-100">
              Générez du contenu adapté à votre audience, personnalisez-le
              pour chaque réseau et programmez sa publication en quelques
              clics.
            </p>

            <Link
              href="/dashboard/publication"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[10px] font-black uppercase tracking-wide text-red-600 transition hover:bg-red-50"
            >
              <Plus size={15} />
              Créer une publication
            </Link>
          </div>

          <Sparkles className="absolute -right-10 -top-10 h-56 w-56 rotate-12 text-white/10" />
        </section>
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
  change,
  positive,
  icon,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[9px] font-bold ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {positive ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}

          {change}
        </div>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <p className="text-2xl font-black tracking-tight">
          {value}
        </p>

        <p className="mb-1 text-[9px] text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-black text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] text-slate-400">
          {description}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  type,
  children,
}: {
  type: string;
  children: React.ReactNode;
}) {
  const styles =
    type === "success"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-slate-100 text-slate-500";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[8px] font-bold ${styles}`}
    >
      {type === "success" ? (
        <CheckCircle2 size={9} />
      ) : (
        <CircleAlert size={9} />
      )}

      {children}
    </span>
  );
}

/* =========================================================
   SOCIAL ACCOUNT
========================================================= */

function SocialAccount({
  icon,
  name,
  account,
  connected,
}: {
  icon: React.ReactNode;
  name: string;
  account: string;
  connected: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-700">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black">
            {name}
          </p>

          <p className="truncate text-[8px] text-slate-400">
            {account}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            connected ? "bg-emerald-500" : "bg-slate-300"
          }`}
        />

        <span className="text-[8px] font-semibold text-slate-400">
          {connected ? "Connecté" : "Non connecté"}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   PERFORMANCE ITEM
========================================================= */

function PerformanceItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-[8px] font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({
  icon,
  title,
  description,
  time,
  success,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  success?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          success
            ? "bg-emerald-50 text-emerald-600"
            : "bg-red-50 text-red-600"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black text-slate-800">
          {title}
        </p>

        <p className="mt-1 truncate text-[9px] text-slate-400">
          {description}
        </p>

        <p className="mt-2 text-[8px] text-slate-400">
          {time}
        </p>
      </div>
    </div>
  );
}