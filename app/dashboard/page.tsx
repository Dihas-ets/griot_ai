"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  CalendarDays,
  FileText,
  Clock3,
  Users,
  Heart,
  MessageCircle,
  Share2,
  BarChart3,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  CircleAlert,
  Image as ImageIcon,
  Eye,
  PenTool,
  Globe2,
  XCircle,
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
} from "recharts";

import axios from "@/lib/axios";

/* =========================================================
   TYPES
========================================================= */

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
};

type SocialIconProps = {
  className?: string;
};

type BackendPublication = {
  id: number;
  title: string;
  content: string;
  network: string;
  status: "Publiée" | "Programmée" | "Brouillon" | "Échec";
  date: string | null;
  time: string | null;
  created_at?: string;
};

type AnalyticsResponse = {
  overview: {
    reach: number;
    impressions: number;
    engagement: number;
    clicks: number;
  };
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
    engagements: number;
  };
  publications: {
    total: number;
    published: number;
    scheduled: number;
    draft: number;
    failed: number;
  };
  daily: {
    date: string;
    reach: number;
    likes: number;
    comments: number;
    shares: number;
  }[];
  publications_by_network: {
    network: string;
    total: number;
  }[];
};

/* =========================================================
   ICONES SOCIALES
========================================================= */

const FacebookIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.006 10.125 11.927v-8.432H7.078v-3.495h3.047V9.413c0-3.022 1.791-4.693 4.533-4.693 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.956.931-1.956 1.887v2.257h3.328l-.532 3.495h-2.796V24C19.612 23.079 24 18.092 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const LinkedinIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 8.99h3.56v11.46H3.56V8.99z" />
  </svg>
);

const TikTokIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <span className={`font-black ${className}`}>♪</span>
);

const XIcon = ({ className = "h-4 w-4" }: SocialIconProps) => (
  <span className={`font-black ${className}`}>𝕏</span>
);

function getNetworkIcon(network: string | null | undefined) {
  switch (network) {
    case "Facebook":
      return <FacebookIcon />;
    case "Instagram":
      return <InstagramIcon />;
    case "LinkedIn":
      return <LinkedinIcon />;
    case "TikTok":
      return <TikTokIcon />;
    case "X":
      return <XIcon />;
    default:
      return <Globe2 size={16} />;
  }
}

/* =========================================================
   FORMATAGE
========================================================= */

function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".", ",")}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(".", ",")}K`;
  }

  return new Intl.NumberFormat("fr-FR").format(value);
}

function formatPercentage(value: number): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;
}

function formatPublicationDate(date: string | null): string {
  if (!date) return "Date non définie";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}

function formatPublicationTime(time: string | null): string {
  if (!time) return "";

  return time.slice(0, 5);
}

function formatDayLabel(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  });
}

/* =========================================================
   PAGE DASHBOARD
========================================================= */

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [publications, setPublications] = useState<BackendPublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     CHARGEMENT
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [analyticsResponse, publicationsResponse] = await Promise.all([
          axios.get<AnalyticsResponse>("/api/analytics?period=30"),
          axios.get("/api/publications"),
        ]);

        if (cancelled) return;

        setAnalytics(analyticsResponse.data);

        const rawPublications = Array.isArray(publicationsResponse.data)
          ? publicationsResponse.data
          : publicationsResponse.data?.publications ?? [];

        setPublications(rawPublications);
      } catch (err) {
        console.error("Erreur lors du chargement du dashboard :", err);

        if (!cancelled) {
          setError("Impossible de charger les données du tableau de bord.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     GRAPHIQUE ENGAGEMENT (par jour)
  ======================================================= */

  const engagementData = useMemo(() => {
    const daily = analytics?.daily ?? [];

    return daily.map((item) => ({
      day: formatDayLabel(item.date),
      engagement: item.likes + item.comments + item.shares,
    }));
  }, [analytics]);

  /* =======================================================
     PUBLICATIONS PAR RÉSEAU
  ======================================================= */

  const publicationData = useMemo(() => {
    return (analytics?.publications_by_network ?? []).map((item) => ({
      network: item.network,
      publications: item.total,
    }));
  }, [analytics]);

  /* =======================================================
     PUBLICATIONS RÉCENTES / PROGRAMMÉES
  ======================================================= */

  const recentPublications = useMemo(() => {
    return publications.slice(0, 4);
  }, [publications]);

  const upcomingPublications = useMemo(() => {
    return publications
      .filter((publication) => publication.status === "Programmée")
      .filter((publication) => publication.date)
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time ?? "00:00"}`).getTime();
        const dateB = new Date(`${b.date}T${b.time ?? "00:00"}`).getTime();

        return dateA - dateB;
      })
      .slice(0, 3);
  }, [publications]);

  const overview = analytics?.overview ?? {
    reach: 0,
    impressions: 0,
    engagement: 0,
    clicks: 0,
  };

  const metrics = analytics?.metrics ?? {
    likes: 0,
    comments: 0,
    shares: 0,
    clicks: 0,
    engagements: 0,
  };

  const publicationTotals = analytics?.publications ?? {
    total: publications.length,
    published: 0,
    scheduled: 0,
    draft: 0,
    failed: 0,
  };

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
        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* ===================================================
            ACTIONS RAPIDES
        =================================================== */}

        {/* <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
*/}
        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Publications"
            value={loading ? "..." : String(publicationTotals.total)}
            description="au total"
            icon={<FileText size={19} />}
          />

          <StatCard
            title="Publications programmées"
            value={loading ? "..." : String(publicationTotals.scheduled)}
            description="à venir"
            icon={<Clock3 size={19} />}
          />

          <StatCard
            title="Engagement"
            value={loading ? "..." : formatPercentage(overview.engagement)}
            description="30 derniers jours"
            icon={<Heart size={19} />}
          />

          <StatCard
            title="Portée totale"
            value={loading ? "..." : formatCompactNumber(overview.reach)}
            description="personnes atteintes"
            icon={<Users size={19} />}
          />
        </section>

        {/* ===================================================
            GRAPHIQUE ENGAGEMENT
        =================================================== */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-black">
                Évolution de l'engagement
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Interactions générées par vos publications (30 derniers jours)
              </p>
            </div>
          </div>

          <div className="mt-6 h-[280px] w-full">
            {engagementData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#dc2626" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                  />

                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />

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
            ) : (
              <div className="flex h-full items-center justify-center text-[11px] font-semibold text-slate-300">
                {loading
                  ? "Chargement des données..."
                  : "Aucune donnée d'engagement pour cette période."}
              </div>
            )}
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
            {publicationData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={publicationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />

                  <XAxis
                    dataKey="network"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                  />

                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />

                  <Tooltip />

                  <Bar dataKey="publications" fill="#dc2626" radius={[6, 6, 0, 0]} barSize={38} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-[11px] font-semibold text-slate-300">
                {loading
                  ? "Chargement des données..."
                  : "Aucune publication sur cette période."}
              </div>
            )}
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

            {loading ? (
              <div className="p-5 text-[11px] font-semibold text-slate-400">
                Chargement...
              </div>
            ) : recentPublications.length === 0 ? (
              <div className="p-5 text-[11px] font-semibold text-slate-400">
                Aucune publication pour le moment.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentPublications.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-3 p-4 sm:p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      {getNetworkIcon(post.network)}
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
                          {formatPublicationDate(post.date)}
                          {post.time ? ` · ${formatPublicationTime(post.time)}` : ""}
                        </span>
                      </div>
                    </div>

                    <div className="hidden text-right sm:block">
                      <StatusBadge status={post.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
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

            {loading ? (
              <div className="p-4 text-[11px] font-semibold text-slate-400">
                Chargement...
              </div>
            ) : upcomingPublications.length === 0 ? (
              <div className="p-4 text-[11px] font-semibold text-slate-400">
                Aucune publication programmée.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {upcomingPublications.map((post) => (
                  <div key={post.id} className="p-4">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                        {getNetworkIcon(post.network)}
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
                            {formatPublicationDate(post.date)}
                          </span>

                          <span className="text-[9px] text-slate-300">•</span>

                          <span className="text-[9px] text-slate-500">
                            {formatPublicationTime(post.time)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
            PERFORMANCE GLOBALE
        =================================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-sm font-black">
              Performance globale
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Résumé de vos résultats sur les 30 derniers jours
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <PerformanceItem
              icon={<Eye size={15} />}
              value={loading ? "..." : formatCompactNumber(overview.impressions)}
              label="Vues"
            />

            <PerformanceItem
              icon={<Heart size={15} />}
              value={loading ? "..." : formatCompactNumber(metrics.likes)}
              label="J'aime"
            />

            <PerformanceItem
              icon={<MessageCircle size={15} />}
              value={loading ? "..." : formatCompactNumber(metrics.comments)}
              label="Commentaires"
            />

            <PerformanceItem
              icon={<Share2 size={15} />}
              value={loading ? "..." : formatCompactNumber(metrics.shares)}
              label="Partages"
            />
          </div>
        </section>

        {/* ===================================================
            CTA
        =================================================== */}

        {/* <section className="relative mt-6 overflow-hidden rounded-2xl bg-red-600 p-6 text-white shadow-xl shadow-red-600/10 sm:p-8">
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
        </section>*/}
      </main>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <p className="text-2xl font-black tracking-tight">{value}</p>

        <p className="mb-1 text-[9px] text-slate-400">{description}</p>
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
        <p className="text-[11px] font-black text-slate-800">{title}</p>

        <p className="mt-0.5 text-[9px] text-slate-400">{description}</p>
      </div>
    </Link>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}: {
  status: "Publiée" | "Programmée" | "Brouillon" | "Échec";
}) {
  const config = {
    Publiée: {
      icon: <CheckCircle2 size={9} />,
      className: "bg-emerald-50 text-emerald-600",
    },
    Programmée: {
      icon: <Clock3 size={9} />,
      className: "bg-orange-50 text-orange-600",
    },
    Brouillon: {
      icon: <CircleAlert size={9} />,
      className: "bg-slate-100 text-slate-500",
    },
    Échec: {
      icon: <XCircle size={9} />,
      className: "bg-red-50 text-red-600",
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[8px] font-bold ${item.className}`}
    >
      {item.icon}
      {status}
    </span>
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

      <p className="mt-2 text-sm font-black text-slate-800">{value}</p>
    </div>
  );
}