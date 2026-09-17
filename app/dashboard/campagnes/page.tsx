"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreHorizontal,
  CalendarDays,
  BarChart3,
  FileText,
  Clock3,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Edit3,
  Copy,
  Trash2,
  Eye,
  Megaphone,
  TrendingUp,
  XCircle,
  Pencil,
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
  description: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  posts: number;
  published: number;
  reach: string;
  engagement: string;
  networks: string[];
  color: string;
};

/* =========================================================
   TYPES API
========================================================= */

type ApiCampaign = {
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

function formatEngagement(value: number | string): string {
  const number = Number(value);

  if (Number.isNaN(number) || number === 0) {
    return "—";
  }

  return `${number.toLocaleString("fr-FR")} %`;
}

function getCampaignColor(index: number): string {
  const colors = [
    "red",
    "orange",
    "blue",
    "emerald",
    "violet",
  ];

  return colors[index % colors.length];
}

function getNetworkShortName(network: string): string {
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

function mapCampaign(
  campaign: ApiCampaign,
  index: number
): Campaign {
  return {
    id: campaign.id,
    name: campaign.name,
    description: campaign.description || "",
    status: campaign.status,
    startDate: formatDate(campaign.start_date),
    endDate: formatDate(campaign.end_date),
    posts: campaign.publications?.total || 0,
    published: campaign.publications?.published || 0,
    reach: formatNumber(campaign.reach),
    engagement: formatEngagement(
      campaign.engagement
    ),
    networks: (campaign.networks || []).map(
      getNetworkShortName
    ),
    color: getCampaignColor(index),
  };
}

/* =========================================================
   PAGE
========================================================= */

export default function CampagnesPage() {
  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("Tous");

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [actionLoading, setActionLoading] =
    useState<number | null>(null);

  /* =======================================================
     CHARGER LES CAMPAGNES
  ======================================================= */

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(
        "/api/campaigns"
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.campaigns || [];

      setCampaigns(
        data.map(
          (campaign: ApiCampaign, index: number) =>
            mapCampaign(campaign, index)
        )
      );
    } catch (err: any) {
      console.error(
        "Erreur chargement campagnes :",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Impossible de charger les campagnes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  /* =======================================================
     FILTRAGE
  ======================================================= */

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        campaign.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "Tous" ||
        campaign.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    campaigns,
    search,
    statusFilter,
  ]);

  /* =======================================================
     STATISTIQUES
  ======================================================= */

  const totalPublished = campaigns.reduce(
    (total, campaign) =>
      total + campaign.published,
    0
  );

  /* =======================================================
     SUPPRIMER
  ======================================================= */

  const deleteCampaign = async (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette campagne ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(id);

      await api.delete(
        `/api/campaigns/${id}`
      );

      setCampaigns((current) =>
        current.filter(
          (campaign) =>
            campaign.id !== id
        )
      );

      setOpenMenu(null);
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
      setActionLoading(null);
    }
  };

  /* =======================================================
     DUPLIQUER
  ======================================================= */

  const duplicateCampaign = async (
    id: number
  ) => {
    try {
      setActionLoading(id);

      await api.post(
        `/api/campaigns/${id}/duplicate`
      );

      setOpenMenu(null);

      await loadCampaigns();
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
      setActionLoading(null);
    }
  };

  /* =======================================================
     PAUSE
  ======================================================= */

  const pauseCampaign = async (
    id: number
  ) => {
    try {
      setActionLoading(id);

      await api.post(
        `/api/campaigns/${id}/pause`
      );

      setOpenMenu(null);

      await loadCampaigns();
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
      setActionLoading(null);
    }
  };

  /* =======================================================
     REPRENDRE
  ======================================================= */

  const resumeCampaign = async (
    id: number
  ) => {
    try {
      setActionLoading(id);

      await api.post(
        `/api/campaigns/${id}/resume`
      );

      setOpenMenu(null);

      await loadCampaigns();
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
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          <div className="min-w-0 pl-14 md:pl-12 lg:pl-0 xl:pl-0">

            <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
              Marketing
            </p>

            <h1 className="truncate text-base font-black sm:text-lg">
              Campagnes
            </h1>

          </div>

          <Link
            href="/dashboard/campagnes/nouvelle"
            className="flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 sm:px-4"
          >
            <Plus size={15} />

            <span className="hidden sm:block">
              Nouvelle campagne
            </span>

            <span className="sm:hidden">
              Nouvelle
            </span>
          </Link>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1700px] p-4 sm:p-6 lg:p-8">

        <div className="mb-7">

          <h2 className="text-xl font-black tracking-tight sm:text-2xl">
            Gérez vos campagnes marketing
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
            Organisez vos publications, planifiez vos actions
            marketing et suivez les performances de vos campagnes.
          </p>

        </div>

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <CampaignStat
            icon={<Megaphone size={17} />}
            label="Campagnes"
            value={campaigns.length.toString()}
            description="au total"
          />

          <CampaignStat
            icon={<PlayCircle size={17} />}
            label="Campagnes actives"
            value={campaigns
              .filter(
                (campaign) =>
                  campaign.status === "active"
              )
              .length.toString()}
            description="en cours"
          />

          <CampaignStat
            icon={<FileText size={17} />}
            label="Publications"
            value={totalPublished.toString()}
            description="publiées"
          />

          <CampaignStat
            icon={<TrendingUp size={17} />}
            label="Portée totale"
            value="—"
            description="données sociales à venir"
          />

        </div>

        {/* ===================================================
            BARRE DE RECHERCHE
        =================================================== */}

        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">

            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Rechercher une campagne..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs font-medium outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
            />

          </div>

          <div className="flex gap-2 overflow-x-auto">

            {[
              ["Tous", "Tous"],
              ["active", "Actives"],
              ["scheduled", "Programmées"],
              ["completed", "Terminées"],
              ["paused", "En pause"],
            ].map(([value, label]) => (

              <button
                key={value}
                onClick={() =>
                  setStatusFilter(value)
                }
                className={`shrink-0 rounded-xl px-4 py-2.5 text-[10px] font-bold transition ${
                  statusFilter === value
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>

            ))}

          </div>

        </div>

        {/* ===================================================
            LISTE
        =================================================== */}

      <div className="relative overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="hidden grid-cols-[minmax(240px,2fr)_130px_180px_130px_130px_100px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400 xl:grid">

            <span>Campagne</span>
            <span>Statut</span>
            <span>Période</span>
            <span>Publications</span>
            <span>Performances</span>
            <span>Action</span>

          </div>

          {/* LOADING */}

          {loading && (

            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />

              <p className="mt-4 text-xs font-semibold text-slate-400">
                Chargement des campagnes...
              </p>

            </div>

          )}

          {/* ERROR */}

          {!loading && error && (

            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <XCircle size={23} />
              </div>

              <h3 className="mt-4 text-sm font-black">
                Impossible de charger les campagnes
              </h3>

              <p className="mt-1 max-w-sm text-xs text-slate-400">
                {error}
              </p>

              <button
                onClick={loadCampaigns}
                className="mt-4 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white hover:bg-red-700"
              >
                Réessayer
              </button>

            </div>

          )}

          {/* CAMPAGNES */}

          {!loading && !error && (

            <div className="divide-y divide-slate-100">

              {filteredCampaigns.map(
                (campaign) => {

                  const progress =
                    campaign.posts > 0
                      ? Math.round(
                          (campaign.published /
                            campaign.posts) *
                            100
                        )
                      : 0;

                  const isActionLoading =
                    actionLoading ===
                    campaign.id;

                  return (
                    <div
                      key={campaign.id}
                      className="p-4 transition hover:bg-slate-50/70 sm:p-5"
                    >

                      {/* DESKTOP */}

                      <div className="hidden xl:grid xl:grid-cols-[minmax(240px,2fr)_130px_180px_130px_130px_100px] xl:items-center xl:gap-4">

                        <div className="flex min-w-0 items-center gap-3">

                          <CampaignIcon
                            color={campaign.color}
                          />

                          <div className="min-w-0">

                            <h3 className="truncate text-xs font-black text-slate-800">
                              {campaign.name}
                            </h3>

                            <p className="mt-1 line-clamp-1 text-[9px] text-slate-400">
                              {campaign.description}
                            </p>

                            <div className="mt-2 flex items-center gap-1.5">

                              {campaign.networks.map(
                                (network, index) => (
                                  <NetworkBadge
                                    key={`${network}-${index}`}
                                    value={network}
                                  />
                                )
                              )}

                            </div>

                          </div>

                        </div>

                        <StatusBadge
                          status={campaign.status}
                        />

                        <div>

                          <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600">

                            <CalendarDays size={13} />

                            <span>
                              {campaign.startDate}
                            </span>

                          </div>

                          <p className="mt-1 pl-5 text-[9px] text-slate-400">
                            au {campaign.endDate}
                          </p>

                        </div>

                        <div>

                          <div className="flex items-center justify-between text-[9px] font-bold">

                            <span className="text-slate-700">
                              {campaign.published}/
                              {campaign.posts}
                            </span>

                            <span className="text-slate-400">
                              {progress}%
                            </span>

                          </div>

                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className="h-full rounded-full bg-red-600 transition-all"
                              style={{
                                width: `${progress}%`,
                              }}
                            />

                          </div>

                        </div>

                        <div>

                          <p className="text-xs font-black text-slate-800">
                            {campaign.reach}
                          </p>

                          <p className="mt-0.5 text-[9px] text-slate-400">
                            {campaign.engagement} engagement
                          </p>

                        </div>

                        <CampaignMenu
                          campaignId={campaign.id}
                          open={
                            openMenu ===
                            campaign.id
                          }
                          loading={
                            isActionLoading
                          }
                          status={
                            campaign.status
                          }
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                campaign.id
                                ? null
                                : campaign.id
                            )
                          }
                          onDelete={() =>
                            deleteCampaign(
                              campaign.id
                            )
                          }
                          onDuplicate={() =>
                            duplicateCampaign(
                              campaign.id
                            )
                          }
                          onPause={() =>
                            pauseCampaign(
                              campaign.id
                            )
                          }
                          onResume={() =>
                            resumeCampaign(
                              campaign.id
                            )
                          }
                        />

                      </div>

                      {/* MOBILE / TABLET */}

                      <div className="xl:hidden">

                        <div className="flex items-start justify-between gap-3">

                          <div className="flex min-w-0 items-start gap-3">

                            <CampaignIcon
                              color={
                                campaign.color
                              }
                            />

                            <div className="min-w-0">

                              <h3 className="truncate text-sm font-black text-slate-800">
                                {campaign.name}
                              </h3>

                              <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-slate-400">
                                {campaign.description}
                              </p>

                            </div>

                          </div>

                          <CampaignMenu
                            campaignId={campaign.id}
                            open={
                              openMenu ===
                              campaign.id
                            }
                            loading={
                              isActionLoading
                            }
                            status={
                              campaign.status
                            }
                            onClick={() =>
                              setOpenMenu(
                                openMenu ===
                                  campaign.id
                                  ? null
                                  : campaign.id
                              )
                            }
                            onDelete={() =>
                              deleteCampaign(
                                campaign.id
                              )
                            }
                            onDuplicate={() =>
                              duplicateCampaign(
                                campaign.id
                              )
                            }
                            onPause={() =>
                              pauseCampaign(
                                campaign.id
                              )
                            }
                            onResume={() =>
                              resumeCampaign(
                                campaign.id
                              )
                            }
                          />

                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">

                          <StatusBadge
                            status={
                              campaign.status
                            }
                          />

                          {campaign.networks.map(
                            (
                              network,
                              index
                            ) => (
                              <NetworkBadge
                                key={`${network}-${index}`}
                                value={network}
                              />
                            )
                          )}

                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                          <InfoItem
                            icon={
                              <CalendarDays
                                size={13}
                              />
                            }
                            label="Période"
                            value={`${campaign.startDate} - ${campaign.endDate}`}
                          />

                          <InfoItem
                            icon={
                              <FileText
                                size={13}
                              />
                            }
                            label="Publications"
                            value={`${campaign.published}/${campaign.posts}`}
                          />

                          <InfoItem
                            icon={
                              <TrendingUp
                                size={13}
                              />
                            }
                            label="Portée"
                            value={
                              campaign.reach
                            }
                          />

                          <InfoItem
                            icon={
                              <BarChart3
                                size={13}
                              />
                            }
                            label="Engagement"
                            value={
                              campaign.engagement
                            }
                          />

                        </div>

                        <div className="mt-4">

                          <div className="mb-1.5 flex justify-between text-[9px] font-bold">

                            <span className="text-slate-500">
                              Progression
                            </span>

                            <span className="text-red-600">
                              {progress}%
                            </span>

                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className="h-full rounded-full bg-red-600"
                              style={{
                                width: `${progress}%`,
                              }}
                            />

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredCampaigns.length === 0 && (

              <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Megaphone size={23} />
                </div>

                <h3 className="mt-4 text-sm font-black">
                  Aucune campagne trouvée
                </h3>

                <p className="mt-1 max-w-sm text-xs text-slate-400">
                  Essayez une autre recherche ou modifiez
                  le filtre sélectionné.
                </p>

              </div>

            )}

        </div>

        {/* ===================================================
            BLOC CONSEIL
        =================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl bg-slate-900">

          <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                <BarChart3 size={20} />
              </div>

              <div>

                <h3 className="text-sm font-black text-white sm:text-base">
                  Suivez vos résultats
                </h3>

                <p className="mt-1 max-w-xl text-[10px] leading-relaxed text-slate-400 sm:text-xs">
                  Analysez les performances de vos campagnes,
                  identifiez les contenus qui fonctionnent le mieux
                  et améliorez votre stratégie de publication.
                </p>

              </div>

            </div>

            <Link
              href="/dashboard/analytics"
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[10px] font-black uppercase tracking-wide text-slate-900 transition hover:bg-slate-100"
            >
              <BarChart3 size={14} />
              Voir les analytics
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function CampaignStat({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-600">
        {icon}
      </div>

      <p className="mt-4 text-xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] font-bold text-slate-700">
        {label}
      </p>

      <p className="mt-0.5 text-[9px] text-slate-400">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   CAMPAIGN ICON
========================================================= */

function CampaignIcon({
  color,
}: {
  color: string;
}) {
  const colors: Record<string, string> = {
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
  };

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
        colors[color] || colors.red
      }`}
    >
      <Megaphone size={18} />
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: CampaignStatus;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[9px] font-black ${config.className}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
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
      className={`flex h-6 w-6 items-center justify-center rounded-md text-[8px] font-black ${
        config[value] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {value}
    </span>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
        {icon}
        {label}
      </div>

      <p className="mt-1 text-[10px] font-black text-slate-700">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   MENU CAMPAGNE
========================================================= */

function CampaignMenu({
  campaignId,
  open,
  loading,
  status,
  onClick,
  onDelete,
  onDuplicate,
  onPause,
  onResume,
}: {
  campaignId: number;
  open: boolean;
  loading: boolean;
  status: CampaignStatus;
  onClick: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onPause: () => void;
  onResume: () => void;
}) {
  return (
    <div className="relative">

      <button
        onClick={onClick}
        disabled={loading}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Actions"
      >
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-red-600" />
        ) : (
          <MoreHorizontal size={17} />
        )}
      </button>

      {open && !loading && (

        <div className="absolute right-0 top-9 z-30 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

          {/* VOIR */}

          <Link
            href={`/dashboard/campagnes/${campaignId}`}
            onClick={onClick}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            <Eye size={13} />
            Voir la campagne
          </Link>

          {/* MODIFIER */}

       <Link
  href={`/dashboard/campagnes/${campaignId}/modifier`}
  onClick={onClick}
  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:bg-slate-50"
>
  <Pencil size={13} />
  Modifier
</Link>

          {/* DUPLIQUER */}

          <button
            onClick={onDuplicate}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            <Copy size={13} />
            Dupliquer
          </button>

          {/* PAUSE / REPRISE */}

          {status === "paused" ? (
            <button
              onClick={onResume}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10px] font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              <PlayCircle size={13} />
              Reprendre
            </button>
          ) : (
            <button
              onClick={onPause}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10px] font-semibold text-orange-600 hover:bg-orange-50"
            >
              <PauseCircle size={13} />
              Mettre en pause
            </button>
          )}

          {/* SUPPRIMER */}

          <button
            onClick={onDelete}
            className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2.5 text-left text-[10px] font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash2 size={13} />
            Supprimer
          </button>

        </div>

      )}

    </div>
  );
}