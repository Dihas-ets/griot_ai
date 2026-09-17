"use client";

import React, { useEffect, useMemo, useState } from "react";
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

import axios from "@/lib/axios";

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

type AnalyticsResponse = {
  period: {
    days: number;
    start: string;
    end: string;
  };

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

  campaigns: {
    total: number;
    active: number;
  };

  networks: {
    network: string;
    reach: number;
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  }[];

  daily: {
    date: string;
    reach: number;
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  }[];

  publications_by_network: {
    network: string;
    total: number;
  }[];

  top_posts: {
    id: number;
    title: string | null;
    network: string | null;
    status: string | null;
    reach: number;
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  }[];

  engagement_distribution: {
    likes: number;
    comments: number;
    shares: number;
  };

  insight: {
    has_data: boolean;
    message: string;
  };
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
   HELPERS
========================================================= */

const periodToDays = (period: Period): number => {
  switch (period) {
    case "7 jours":
      return 7;
    case "30 jours":
      return 30;
    case "3 mois":
      return 90;
    case "12 mois":
      return 365;
    default:
      return 30;
  }
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("fr-FR").format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
};

const formatDate = (date: string | null) => {
  if (!date) return "Date inconnue";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getNetwork = (name: string | null | undefined) => {
  if (!name) return networks[0];

  const normalized = name.toLowerCase();

  if (normalized === "facebook") return networks[0];
  if (normalized === "instagram") return networks[1];
  if (normalized === "linkedin") return networks[2];
  if (normalized === "x") return networks[3];

  return {
    id: normalized,
    name,
    color: "text-slate-600 bg-slate-100",
    initials: name.substring(0, 2).toLowerCase(),
  };
};

/* =========================================================
   PAGE
========================================================= */

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30 jours");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     CHARGEMENT ANALYTICS
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const days = periodToDays(period);

        const response = await axios.get<AnalyticsResponse>(
          `/api/analytics?period=${days}`,
        );

        if (!cancelled) {
          setAnalytics(response.data);
        }
      } catch (err: any) {
        console.error("Erreur Analytics :", err);

        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              "Impossible de charger les données Analytics.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, [period]);

  /* =======================================================
     DONNÉES PAR DÉFAUT
  ======================================================= */

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

  const networkData = analytics?.networks ?? [];

  /* =======================================================
     PERFORMANCE PAR RÉSEAU
  ======================================================= */

  const networkPerformance = useMemo(() => {
    const totalReach = networkData.reduce(
      (total, network) => total + Number(network.reach || 0),
      0,
    );

    return networks.map((network) => {
      const data = networkData.find(
        (item) => item.network?.toLowerCase() === network.name.toLowerCase(),
      );

      const reach = Number(data?.reach || 0);
      const likes = Number(data?.likes || 0);
      const comments = Number(data?.comments || 0);
      const shares = Number(data?.shares || 0);
      const impressions = Number(data?.impressions || 0);

      const engagements = likes + comments + shares;

      const engagement =
        impressions > 0 ? (engagements / impressions) * 100 : 0;

      const progress =
        totalReach > 0
          ? Math.max(4, Math.round((reach / totalReach) * 100))
          : 0;

      const value =
        totalReach > 0 ? `${((reach / totalReach) * 100).toFixed(1)} %` : "0 %";

      return {
        network,
        value,
        engagement: formatPercentage(engagement),
        progress: Math.min(progress, 100),
      };
    });
  }, [networkData]);

  /* =======================================================
     GRAPHIQUE
  ======================================================= */

  const performanceData = useMemo(() => {
    const daily = analytics?.daily ?? [];

    if (daily.length === 0) {
      return [];
    }

    const maxReach = Math.max(
      ...daily.map((item) => Number(item.reach || 0)),
      1,
    );

    return daily.map((item) => ({
      day: new Date(`${item.date}T00:00:00`).getDate().toString().padStart(2, "0"),
      value: Math.round((Number(item.reach || 0) / maxReach) * 100),
      reach: Number(item.reach || 0),
    }));
  }, [analytics]);

  const chartPoints = useMemo(() => {
    if (performanceData.length === 0) {
      return "";
    }

    const width = 800;
    const height = 240;

    return performanceData
      .map((item, index) => {
        const x =
          performanceData.length === 1
            ? width / 2
            : (index / (performanceData.length - 1)) * width;

        const y = height - (item.value / 100) * height;

        return `${x} ${y}`;
      })
      .join(" L ");
  }, [performanceData]);

  const chartAreaPath = chartPoints
    ? `M ${chartPoints} L 800 240 L 0 240 Z`
    : "";

  const chartLinePath = chartPoints ? `M ${chartPoints}` : "";

  /* =======================================================
     TOP PUBLICATIONS
  ======================================================= */

  const topPosts = analytics?.top_posts ?? [];

  /* =======================================================
     RÉPARTITION ENGAGEMENT
  ======================================================= */

  const likes = Number(analytics?.engagement_distribution?.likes || 0);
  const comments = Number(
    analytics?.engagement_distribution?.comments || 0,
  );
  const shares = Number(analytics?.engagement_distribution?.shares || 0);
  const clicks = Number(metrics.clicks || 0);

  const totalEngagementDistribution =
    likes + comments + shares + clicks;

  const engagementRows = [
    {
      label: "J'aime",
      value: likes,
      percentage:
        totalEngagementDistribution > 0
          ? Math.round((likes / totalEngagementDistribution) * 100)
          : 0,
    },
    {
      label: "Partages",
      value: shares,
      percentage:
        totalEngagementDistribution > 0
          ? Math.round((shares / totalEngagementDistribution) * 100)
          : 0,
    },
    {
      label: "Commentaires",
      value: comments,
      percentage:
        totalEngagementDistribution > 0
          ? Math.round((comments / totalEngagementDistribution) * 100)
          : 0,
    },
    {
      label: "Clics",
      value: clicks,
      percentage:
        totalEngagementDistribution > 0
          ? Math.round((clicks / totalEngagementDistribution) * 100)
          : 0,
    },
  ];

  /* =======================================================
     INSIGHT
  ======================================================= */

  const insightMessage =
    analytics?.insight?.message ||
    "Aucune donnée Analytics disponible pour cette période.";

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

                <span className="hidden sm:block">{period}</span>

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
                  Vue d&apos;ensemble
                </span>
              </div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Analysez vos performances
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
                Suivez l&apos;évolution de vos publications et mesurez
                l&apos;engagement de votre audience sur vos différents réseaux.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-[10px] font-semibold text-slate-500">
                Données mises à jour aujourd&apos;hui
              </span>
            </div>
          </div>
        </div>

        {/* ERREUR */}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* =====================================================
            STATISTIQUES
        ===================================================== */}

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <StatCard
            title="Portée totale"
            value={loading ? "..." : formatNumber(overview.reach)}
            percentage=""
            icon={<Users size={17} />}
            description="personnes atteintes"
          />

          <StatCard
            title="Impressions"
            value={loading ? "..." : formatNumber(overview.impressions)}
            percentage=""
            icon={<Eye size={17} />}
            description="vues générées"
          />

          <StatCard
            title="Engagement"
            value={loading ? "..." : formatPercentage(overview.engagement)}
            percentage=""
            icon={<Heart size={17} />}
            description="taux moyen"
          />

          <StatCard
            title="Clics"
            value={loading ? "..." : formatNumber(overview.clicks)}
            percentage=""
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

                  <TrendingUp size={15} className="text-red-500" />
                </div>

                <p className="mt-1 text-[9px] text-slate-400">
                  Évolution de l&apos;engagement au cours des{" "}
                  {period.toLowerCase()}
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
                  {chartLinePath ? (
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
                        d={chartAreaPath}
                        fill="url(#analyticsGradient)"
                      />

                      <path
                        d={chartLinePath}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] font-semibold text-slate-300">
                      {loading
                        ? "Chargement des données..."
                        : "Aucune donnée disponible pour cette période."}
                    </div>
                  )}
                </div>
              </div>

              {/* DATES */}

              <div className="ml-10 mt-2 flex justify-between">
                {performanceData
                  .filter((_, index) => index % 2 === 0)
                  .map((item, index) => (
                    <span
                      key={`${item.day}-${index}`}
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
              {networkPerformance.map((item) => (
                <NetworkPerformance
                  key={item.network.id}
                  network={item.network}
                  value={item.value}
                  engagement={item.engagement}
                  progress={item.progress}
                />
              ))}
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
            value={loading ? "..." : formatNumber(metrics.shares)}
            evolution=""
          />

          <MiniMetric
            icon={<MessageCircle size={17} />}
            title="Commentaires"
            value={loading ? "..." : formatNumber(metrics.comments)}
            evolution=""
          />

          <MiniMetric
            icon={<Target size={17} />}
            title="Taux de conversion"
            value="—"
            evolution=""
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
                Les contenus qui ont généré le plus d&apos;engagement.
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
                    J&apos;aime
                  </th>
                </tr>
              </thead>

              <tbody>
                {topPosts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-[10px] font-semibold text-slate-300"
                    >
                      {loading
                        ? "Chargement des publications..."
                        : "Aucune publication avec des statistiques pour cette période."}
                    </td>
                  </tr>
                ) : (
                  topPosts.map((post, index) => {
                    const engagement =
                      post.impressions > 0
                        ? ((post.likes +
                            post.comments +
                            post.shares) /
                            post.impressions) *
                          100
                        : 0;

                    return (
                      <tr
                        key={post.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[10px] font-black text-red-600">
                              {index + 1}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[300px] truncate text-[10px] font-bold text-slate-800">
                                {post.title || "Publication sans titre"}
                              </p>

                              <p className="mt-1 text-[8px] text-slate-400">
                                Statut : {post.status || "—"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[9px] font-bold text-slate-600">
                            {post.network || "—"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-[10px] font-bold text-slate-700">
                            {formatNumber(post.reach)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-[10px] font-black text-red-600">
                            {formatPercentage(engagement)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-[10px] font-bold text-slate-700">
                            {formatNumber(post.likes)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
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
              Répartition de l&apos;engagement
            </h2>

            <p className="mt-1 text-[9px] text-slate-400">
              Comment votre audience interagit avec vos contenus.
            </p>

            <div className="mt-6 space-y-4">
              {engagementRows.map((row) => (
                <EngagementRow
                  key={row.label}
                  label={row.label}
                  value={`${row.percentage} %`}
                  progress={row.percentage}
                />
              ))}
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
                {insightMessage}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <TrendingUp size={15} />
                </div>

                <div>
                  <p className="text-[9px] text-red-100">
                    Taux d&apos;engagement
                  </p>

                  <p className="text-sm font-black">
                    {formatPercentage(overview.engagement)}
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

        {percentage && (
          <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[8px] font-black text-green-600">
            <ArrowUpRight size={10} />
            {percentage}
          </span>
        )}
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

          <p className="mt-1 text-lg font-black">{value}</p>
        </div>
      </div>

      {evolution && (
        <span className="rounded-full bg-green-50 px-2 py-1 text-[8px] font-black text-green-600">
          {evolution}
        </span>
      )}
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
