"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  Edit3,
  FileText,
  Megaphone,
  PauseCircle,
  PlayCircle,
  Trash2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import api from "@/lib/axios";

/* =========================================================
   TYPES
========================================================= */

type CampaignStatus =
  | "active"
  | "scheduled"
  | "completed"
  | "paused";

type Campaign = {
  id: number;
  name: string;
  description: string | null;
  status: CampaignStatus;
  start_date: string | null;
  end_date: string | null;
  project_id: number | null;
  project: {
    id: number;
    name: string;
  } | null;
  publications: {
    total: number;
    published: number;
    scheduled: number;
    draft: number;
    failed: number;
  };
  progress: number;
  networks: string[];
  reach: number | string;
  engagement: number | string;
  created_at: string | null;
  updated_at: string | null;
};

/* =========================================================
   STATUTS
========================================================= */

const statusConfig = {
  active: {
    label: "Active",
    icon: PlayCircle,
    className: "bg-emerald-50 text-emerald-600",
  },
  scheduled: {
    label: "Programmée",
    icon: Clock3,
    className: "bg-blue-50 text-blue-600",
  },
  completed: {
    label: "Terminée",
    icon: CheckCircle2,
    className: "bg-slate-100 text-slate-600",
  },
  paused: {
    label: "En pause",
    icon: PauseCircle,
    className: "bg-orange-50 text-orange-600",
  },
};

/* =========================================================
   FORMATAGE
========================================================= */

function formatDate(date: string | null): string {
  if (!date) {
    return "Non définie";
  }

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date: string | null): string {
  if (!date) {
    return "Non disponible";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatNumber(value: number | string): string {
  const number = Number(value);

  if (Number.isNaN(number) || number === 0) {
    return "—";
  }

  if (number >= 1000) {
    return `${(number / 1000).toLocaleString("fr-FR", {
      maximumFractionDigits: 1,
    })}K`;
  }

  return number.toLocaleString("fr-FR");
}

function formatEngagement(
  value: number | string
): string {
  const number = Number(value);

  if (Number.isNaN(number) || number === 0) {
    return "—";
  }

  return `${number.toLocaleString("fr-FR")} %`;
}

function getNetworkShortName(
  network: string
): string {
  const normalized = network.toLowerCase();

  if (normalized.includes("facebook")) {
    return "F";
  }

  if (normalized.includes("instagram")) {
    return "I";
  }

  if (normalized.includes("linkedin")) {
    return "L";
  }

  if (normalized.includes("tiktok")) {
    return "T";
  }

  if (
    normalized === "x" ||
    normalized.includes("twitter")
  ) {
    return "X";
  }

  if (normalized.includes("google")) {
    return "G";
  }

  return network.charAt(0).toUpperCase();
}

/* =========================================================
   PAGE
========================================================= */

export default function CampagneDetailPage() {
  const params = useParams();
  const router = useRouter();

  const campaignId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [campaign, setCampaign] =
    useState<Campaign | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [actionLoading, setActionLoading] =
    useState(false);

  /* =======================================================
     CHARGER LA CAMPAGNE
  ======================================================= */

  const loadCampaign = async () => {
    if (!campaignId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.get(
        `/api/campaigns/${campaignId}`
      );

      setCampaign(response.data);
    } catch (err: any) {
      console.error(
        "Erreur chargement campagne :",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Impossible de charger cette campagne."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaign();
  }, [campaignId]);

  /* =======================================================
     SUPPRIMER
  ======================================================= */

  const deleteCampaign = async () => {
    if (!campaign) {
      return;
    }

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette campagne ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);

      await api.delete(
        `/api/campaigns/${campaign.id}`
      );

      router.push("/dashboard/campagnes");
    } catch (err: any) {
      console.error(
        "Erreur suppression campagne :",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Impossible de supprimer la campagne."
      );
    } finally {
      setActionLoading(false);
    }
  };

  /* =======================================================
     DUPLIQUER
  ======================================================= */

  const duplicateCampaign = async () => {
    if (!campaign) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.post(
        `/api/campaigns/${campaign.id}/duplicate`
      );

      const newCampaign =
        response.data?.campaign;

      if (newCampaign?.id) {
        router.push(
          `/dashboard/campagnes/${newCampaign.id}`
        );

        return;
      }

      await loadCampaign();
    } catch (err: any) {
      console.error(
        "Erreur duplication campagne :",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Impossible de dupliquer la campagne."
      );
    } finally {
      setActionLoading(false);
    }
  };

  /* =======================================================
     PAUSE
  ======================================================= */

  const pauseCampaign = async () => {
    if (!campaign) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.post(
        `/api/campaigns/${campaign.id}/pause`
      );

      if (response.data?.campaign) {
        setCampaign(
          response.data.campaign
        );
      } else {
        await loadCampaign();
      }
    } catch (err: any) {
      console.error(
        "Erreur pause campagne :",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Impossible de mettre la campagne en pause."
      );
    } finally {
      setActionLoading(false);
    }
  };

  /* =======================================================
     REPRENDRE
  ======================================================= */

  const resumeCampaign = async () => {
    if (!campaign) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.post(
        `/api/campaigns/${campaign.id}/resume`
      );

      if (response.data?.campaign) {
        setCampaign(
          response.data.campaign
        );
      } else {
        await loadCampaign();
      }
    } catch (err: any) {
      console.error(
        "Erreur reprise campagne :",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Impossible de reprendre la campagne."
      );
    } finally {
      setActionLoading(false);
    }
  };

  /* =======================================================
     DONNÉES CALCULÉES
  ======================================================= */

  const progress = useMemo(() => {
    if (!campaign) {
      return 0;
    }

    return Number(campaign.progress || 0);
  }, [campaign]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900">

        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

          <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">

            <Link
              href="/dashboard/campagnes"
              className="flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-red-600"
            >
              <ArrowLeft size={16} />
              Campagnes
            </Link>

          </div>

        </header>

        <main className="mx-auto flex min-h-[70vh] max-w-[1700px] items-center justify-center p-6">

          <div className="text-center">

            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />

            <p className="mt-4 text-xs font-semibold text-slate-400">
              Chargement de la campagne...
            </p>

          </div>

        </main>

      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900">

        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

          <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">

            <Link
              href="/dashboard/campagnes"
              className="flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-red-600"
            >
              <ArrowLeft size={16} />
              Retour aux campagnes
            </Link>

          </div>

        </header>

        <main className="mx-auto flex min-h-[70vh] max-w-[1700px] items-center justify-center p-6">

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <XCircle size={28} />
            </div>

            <h1 className="mt-5 text-lg font-black">
              Campagne introuvable
            </h1>

            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-400">
              {error ||
                "Cette campagne n'existe pas ou vous n'avez pas accès à cette campagne."}
            </p>

            <Link
              href="/dashboard/campagnes"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
            >
              <ArrowLeft size={14} />
              Retour aux campagnes
            </Link>

          </div>

        </main>

      </div>
    );
  }

  const status =
    statusConfig[campaign.status];

  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

        <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            <Link
              href="/dashboard/campagnes"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-red-600"
              aria-label="Retour"
            >
              <ArrowLeft size={16} />
            </Link>

            <div className="min-w-0">

              <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
                Marketing
              </p>

              <h1 className="truncate text-base font-black sm:text-lg">
                {campaign.name}
              </h1>

            </div>

          </div>

          <div className="flex shrink-0 items-center gap-2">

            <button
              onClick={duplicateCampaign}
              disabled={actionLoading}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 sm:flex"
            >
              <Copy size={14} />
              Dupliquer
            </button>

            {campaign.status === "paused" ? (
              <button
                onClick={resumeCampaign}
                disabled={actionLoading}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                <PlayCircle size={14} />
                <span className="hidden sm:inline">
                  Reprendre
                </span>
              </button>
            ) : (
              <button
                onClick={pauseCampaign}
                disabled={actionLoading}
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2.5 text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:opacity-50"
              >
                <PauseCircle size={14} />
                <span className="hidden sm:inline">
                  Mettre en pause
                </span>
              </button>
            )}

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex min-w-0 items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Megaphone size={22} />
              </div>

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                    {campaign.name}
                  </h2>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[9px] font-black ${status.className}`}
                  >
                    <StatusIcon size={12} />
                    {status.label}
                  </span>

                </div>

                <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {campaign.description ||
                    "Aucune description pour cette campagne."}
                </p>

                {campaign.project && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-600">
                    <FileText size={13} />
                    Projet : {campaign.project.name}
                  </div>
                )}

              </div>

            </div>

            <div className="flex shrink-0 gap-2">

              <button
                onClick={deleteCampaign}
                disabled={actionLoading}
                className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-red-600 transition hover:bg-red-100 disabled:opacity-50"
              >
                <Trash2 size={14} />
                Supprimer
              </button>

            </div>

          </div>

        </section>

        {/* ===================================================
            INFORMATIONS PRINCIPALES
        =================================================== */}

        <div className="grid gap-4 lg:grid-cols-3">

          {/* PÉRIODE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarDays size={18} />
              </div>

              <div>

                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Période
                </p>

                <p className="mt-1 text-xs font-black text-slate-800">
                  {formatDate(
                    campaign.start_date
                  )}
                </p>

                <p className="text-[10px] text-slate-400">
                  au{" "}
                  {formatDate(
                    campaign.end_date
                  )}
                </p>

              </div>

            </div>

          </div>

          {/* PROGRESSION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <BarChart3 size={18} />
                </div>

                <div>

                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Progression
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-800">
                    {progress}%
                  </p>

                </div>

              </div>

              <span className="text-[10px] font-bold text-slate-400">
                {campaign.publications.published}/
                {campaign.publications.total}
              </span>

            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-red-600 transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, progress)
                  )}%`,
                }}
              />

            </div>

          </div>

          {/* PROJET */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Users size={18} />
              </div>

              <div>

                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Projet associé
                </p>

                <p className="mt-1 text-xs font-black text-slate-800">
                  {campaign.project?.name ||
                    "Aucun projet"}
                </p>

                <p className="text-[10px] text-slate-400">
                  {campaign.project
                    ? `Projet #${campaign.project.id}`
                    : "Campagne indépendante"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            STATISTIQUES PUBLICATIONS
        =================================================== */}

        <section className="mt-6">

          <div className="mb-4">

            <h3 className="text-sm font-black sm:text-base">
              Publications
            </h3>

            <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
              État des publications associées à cette campagne.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">

            <PublicationStat
              label="Total"
              value={
                campaign.publications.total
              }
              icon={<FileText size={16} />}
            />

            <PublicationStat
              label="Publiées"
              value={
                campaign.publications.published
              }
              icon={<CheckCircle2 size={16} />}
              positive
            />

            <PublicationStat
              label="Programmées"
              value={
                campaign.publications.scheduled
              }
              icon={<Clock3 size={16} />}
              blue
            />

            <PublicationStat
              label="Brouillons"
              value={
                campaign.publications.draft
              }
              icon={<Edit3 size={16} />}
            />

            <PublicationStat
              label="Échecs"
              value={
                campaign.publications.failed
              }
              icon={<XCircle size={16} />}
              danger
            />

          </div>

        </section>

        {/* ===================================================
            RÉSEAUX
        =================================================== */}

        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Megaphone size={18} />
              </div>

              <div>

                <h3 className="text-sm font-black">
                  Réseaux sociaux
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Réseaux utilisés dans cette campagne.
                </p>

              </div>

            </div>

            {campaign.networks.length > 0 ? (

              <div className="mt-5 flex flex-wrap gap-2">

                {campaign.networks.map(
                  (network, index) => (
                    <NetworkBadge
                      key={`${network}-${index}`}
                      value={getNetworkShortName(
                        network
                      )}
                    />
                  )
                )}

              </div>

            ) : (

              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-center">

                <p className="text-[10px] font-semibold text-slate-400">
                  Aucun réseau associé pour le moment.
                </p>

              </div>

            )}

          </div>

          {/* PERFORMANCES */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={18} />
              </div>

              <div>

                <h3 className="text-sm font-black">
                  Performances
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Données issues des réseaux sociaux.
                </p>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-[9px] font-bold text-slate-400">
                  Portée
                </p>

                <p className="mt-1 text-lg font-black text-slate-800">
                  {formatNumber(
                    campaign.reach
                  )}
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-[9px] font-bold text-slate-400">
                  Engagement
                </p>

                <p className="mt-1 text-lg font-black text-slate-800">
                  {formatEngagement(
                    campaign.engagement
                  )}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            INFORMATIONS TECHNIQUES
        =================================================== */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">

            <h3 className="text-sm font-black">
              Informations de la campagne
            </h3>

            <p className="mt-1 text-[10px] text-slate-400">
              Informations générales et dates de création.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <DetailInfo
              label="Identifiant"
              value={`#${campaign.id}`}
            />

            <DetailInfo
              label="Statut"
              value={status.label}
            />

            <DetailInfo
              label="Créée le"
              value={formatDateTime(
                campaign.created_at
              )}
            />

            <DetailInfo
              label="Dernière modification"
              value={formatDateTime(
                campaign.updated_at
              )}
            />

          </div>

        </section>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl bg-slate-900">

          <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h3 className="text-sm font-black text-white sm:text-base">
                Gérez cette campagne
              </h3>

              <p className="mt-1 max-w-xl text-[10px] leading-relaxed text-slate-400 sm:text-xs">
                Vous pouvez dupliquer la campagne, modifier son
                statut ou revenir à la liste de vos campagnes.
              </p>

            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <button
                onClick={duplicateCampaign}
                disabled={actionLoading}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[10px] font-black uppercase tracking-wide text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
              >
                <Copy size={14} />
                Dupliquer
              </button>

              <Link
                href="/dashboard/campagnes"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                <ArrowLeft size={14} />
                Toutes les campagnes
              </Link>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

/* =========================================================
   PUBLICATION STAT
========================================================= */

function PublicationStat({
  label,
  value,
  icon,
  positive,
  blue,
  danger,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  positive?: boolean;
  blue?: boolean;
  danger?: boolean;
}) {
  let iconClass =
    "bg-slate-50 text-slate-500";

  if (positive) {
    iconClass =
      "bg-emerald-50 text-emerald-600";
  }

  if (blue) {
    iconClass =
      "bg-blue-50 text-blue-600";
  }

  if (danger) {
    iconClass =
      "bg-red-50 text-red-600";
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] font-bold text-slate-500">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   DETAIL INFO
========================================================= */

function DetailInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-black text-slate-700">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   NETWORK BADGE
========================================================= */

function NetworkBadge({
  value,
}: {
  value: string;
}) {
  const config: Record<string, string> = {
    F: "bg-blue-50 text-blue-600",
    I: "bg-pink-50 text-pink-600",
    L: "bg-sky-50 text-sky-600",
    T: "bg-slate-100 text-slate-700",
    X: "bg-slate-100 text-slate-700",
    G: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-xl text-[10px] font-black ${
        config[value] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {value}
    </span>
  );
}