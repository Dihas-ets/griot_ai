"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CalendarDays,
  Clock3,
  Edit3,
  Trash2,
  Eye,
  ChevronDown,
  CheckCircle2,
  Clock,
  FileText,
  XCircle,
  LayoutGrid,
  List,
  X,
} from "lucide-react";

import api from "@/lib/axios";

/* =========================================================
   TYPES
========================================================= */

type PublicationStatus =
  | "Publiée"
  | "Programmée"
  | "Brouillon"
  | "Échec";

type Network =
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "TikTok"
  | "Google Business"
  | "X";

type PublicationApi = {
  id: number;
  user_id: number;
  project_id?: number | null;
  title: string;
  content: string;
  network: Network;
  status: PublicationStatus;
  date?: string | null;
  time?: string | null;
  image?: string | null;
  created_at?: string;
  updated_at?: string;

  project?: {
    id: number;
    name: string;
  } | null;

  medias?: unknown[];
};

type Publication = {
  id: number;
  title: string;
  content: string;
  network: Network;
  status: PublicationStatus;
  date: string;
  time: string;
  image?: string | null;
  projectId?: string;
  projectName?: string;
  createdAt?: number;
};

/* =========================================================
   ICÔNES RÉSEAUX
========================================================= */

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path
      d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.5-1.5h1.7V4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V10H8.3v3h2.5v8h2.7Z"
      fill="white"
    />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <defs>
      <linearGradient
        id="instagramGradient"
        x1="3"
        y1="21"
        x2="21"
        y2="3"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDC80" />
        <stop offset="0.25" stopColor="#FCB045" />
        <stop offset="0.5" stopColor="#FD1D1D" />
        <stop offset="0.75" stopColor="#E1306C" />
        <stop offset="1" stopColor="#833AB4" />
      </linearGradient>
    </defs>

    <rect
      x="2.5"
      y="2.5"
      width="19"
      height="19"
      rx="5.5"
      fill="url(#instagramGradient)"
    />

    <rect
      x="7"
      y="7"
      width="10"
      height="10"
      rx="3"
      stroke="white"
      strokeWidth="1.8"
    />

    <circle
      cx="12"
      cy="12"
      r="2.5"
      stroke="white"
      strokeWidth="1.8"
    />

    <circle
      cx="17"
      cy="7"
      r="1"
      fill="white"
    />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <rect
      width="24"
      height="24"
      rx="4"
      fill="#0A66C2"
    />

    <path
      d="M7.2 9.1H4.5V19h2.7V9.1ZM5.85 5A1.6 1.6 0 1 0 5.85 8.2 1.6 1.6 0 0 0 5.85 5ZM19.5 13.3c0-2.98-1.59-4.37-3.71-4.37-1.7 0-2.46.94-2.88 1.6V9.1h-2.7V19h2.7v-4.9c0-1.29.24-2.54 1.84-2.54 1.58 0 1.6 1.48 1.6 2.63V19h2.7l.45-5.7Z"
      fill="white"
    />
  </svg>
);

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <rect width="24" height="24" rx="5" fill="#000" />

    <path
      d="M14.5 5h2.3c.2 1.3 1 2.3 2.2 2.8v2.3c-1-.1-1.9-.4-2.7-.9v5.3c0 3-2.2 5-5.1 5-2.6 0-4.7-1.8-4.7-4.4 0-2.7 2.2-4.5 5-4.5.3 0 .6 0 .9.1V13c-.3-.1-.6-.2-.9-.2-1.2 0-2.2.7-2.2 1.9 0 1 .8 1.7 1.8 1.7 1.1 0 1.8-.7 1.8-2V5h1.6Z"
      fill="white"
    />
  </svg>
);

const GoogleBusinessIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <circle cx="12" cy="12" r="11" fill="white" />

    <path
      d="M12 5.5a6.5 6.5 0 1 0 6.1 8.7h-6.1v-2.4h8.5c.1.5.1 1 .1 1.5A8.6 8.6 0 1 1 12 3.5c2.4 0 4.4 1 5.9 2.5l-1.8 1.8A5.7 5.7 0 0 0 12 5.5Z"
      fill="#4285F4"
    />

    <path
      d="M18.1 8.2h-6.1v2.4h6.9c-.2-.9-.4-1.7-.8-2.4Z"
      fill="#34A853"
    />
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Z"
      fill="#000000"
    />
  </svg>
);

/* =========================================================
   PAGE
========================================================= */

export default function MesPublicationsPage() {
  const router = useRouter();

  const [publications, setPublications] = useState<Publication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Toutes");
  const [networkFilter, setNetworkFilter] = useState("Tous");
  const [view, setView] = useState<"grid" | "list">("grid");

  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  /* =========================================================
     RÉCUPÉRER LES PUBLICATIONS DEPUIS L'API
  ========================================================= */

  const fetchPublications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/publications");

      const data: PublicationApi[] = Array.isArray(response.data)
        ? response.data
        : [];

      const formattedPublications: Publication[] = data.map(
        (publication) => ({
          id: publication.id,

          title: publication.title,

          content: publication.content,

          network: publication.network,

          status: publication.status,

          date: publication.date ?? "",

          time: publication.time
            ? publication.time.substring(0, 5)
            : "",

          image: publication.image ?? null,

          projectId:
            publication.project_id !== null &&
            publication.project_id !== undefined
              ? String(publication.project_id)
              : undefined,

          projectName:
            publication.project?.name ?? undefined,

          createdAt: publication.created_at
            ? new Date(publication.created_at).getTime()
            : undefined,
        })
      );

      setPublications(formattedPublications);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des publications :",
        error
      );

      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  /* =========================================================
     FILTRAGE
  ========================================================= */

  const filteredPublications = useMemo(() => {
    return publications.filter((publication) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        publication.title
          .toLowerCase()
          .includes(searchValue) ||
        publication.content
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "Toutes" ||
        publication.status === statusFilter;

      const matchesNetwork =
        networkFilter === "Tous" ||
        publication.network === networkFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesNetwork
      );
    });
  }, [
    publications,
    search,
    statusFilter,
    networkFilter,
  ]);

  /* =========================================================
     STATISTIQUES
  ========================================================= */

  const totalPublications = publications.length;

  const publishedCount = publications.filter(
    (publication) => publication.status === "Publiée"
  ).length;

  const scheduledCount = publications.filter(
    (publication) => publication.status === "Programmée"
  ).length;

  const draftCount = publications.filter(
    (publication) => publication.status === "Brouillon"
  ).length;

  /* =========================================================
     PROJET
  ========================================================= */

  const projectNames = Array.from(
    new Set(
      publications
        .map((publication) => publication.projectName)
        .filter(Boolean)
    )
  );

  const projectLabel =
    projectNames.length === 1
      ? projectNames[0]
      : projectNames.length > 1
      ? "Tous les projets"
      : "Aucun projet";

  /* =========================================================
     SUPPRIMER VIA API
  ========================================================= */

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette publication ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await api.delete(`/api/publications/${id}`);

      setPublications((currentPublications) =>
        currentPublications.filter(
          (publication) => publication.id !== id
        )
      );

      if (selectedPublication?.id === id) {
        setSelectedPublication(null);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la publication :",
        error
      );

      alert(
        "Impossible de supprimer cette publication. Veuillez réessayer."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     MODIFIER
  ========================================================= */

  const handleEdit = (id: number) => {
    router.push(
      `/dashboard/publication?publication=${id}`
    );
  };

  /* =========================================================
     RENDU
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          <div className="min-w-0 pl-12 md:pl-12 lg:pl-0 xl:pl-0">

            <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
              Gestion de contenu
            </p>

            <h1 className="text-lg font-black sm:text-xl">
              Mes publications
            </h1>

          </div>

          <Link
            href="/dashboard/publication"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
          >
            <Plus size={15} />

            <span className="hidden sm:inline">
              Créer une publication
            </span>

            <span className="sm:hidden">
              Créer
            </span>
          </Link>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1700px] p-4 sm:p-6 lg:p-8">

        {/* INTRODUCTION */}

        <div className="mb-6">

          <h2 className="text-xl font-black sm:text-2xl">
            Toutes vos publications
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Consultez, modifiez et gérez les publications de vos
            différents réseaux sociaux.
          </p>

        </div>

        {/* =====================================================
            STATISTIQUES
        ===================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={<FileText size={17} />}
            label="Total"
            value={String(totalPublications)}
          />

          <StatCard
            icon={<CheckCircle2 size={17} />}
            label="Publiées"
            value={String(publishedCount)}
          />

          <StatCard
            icon={<Clock size={17} />}
            label="Programmées"
            value={String(scheduledCount)}
          />

          <StatCard
            icon={<FileText size={17} />}
            label="Brouillons"
            value={String(draftCount)}
          />

        </div>

        {/* =====================================================
            FILTRES
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

            {/* RECHERCHE */}

            <div className="relative w-full xl:max-w-md">

              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Rechercher une publication..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-medium outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/5"
              />

            </div>

            {/* FILTRES */}

            <div className="flex flex-wrap gap-2">

              {/* STATUT */}

              <div className="relative">

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-[10px] font-bold text-slate-600 outline-none focus:border-red-400"
                >
                  <option>Toutes</option>
                  <option>Publiée</option>
                  <option>Programmée</option>
                  <option>Brouillon</option>
                  <option>Échec</option>
                </select>

                <Filter
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

              {/* RÉSEAU */}

              <div className="relative">

                <select
                  value={networkFilter}
                  onChange={(e) =>
                    setNetworkFilter(e.target.value)
                  }
                  className="appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-[10px] font-bold text-slate-600 outline-none focus:border-red-400"
                >
                  <option>Tous</option>
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                  <option>TikTok</option>
                  <option>Google Business</option>
                  <option>X</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

              {/* VUE */}

              <div className="flex rounded-xl border border-slate-200 bg-white p-1">

                <button
                  onClick={() => setView("grid")}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    view === "grid"
                      ? "bg-red-50 text-red-600"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <LayoutGrid size={15} />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    view === "list"
                      ? "bg-red-50 text-red-600"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <List size={15} />
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            RÉSULTATS
        ===================================================== */}

        <div className="mb-4 flex items-center justify-between">

          <p className="text-xs font-bold text-slate-500">
            {loading
              ? "Chargement..."
              : `${filteredPublications.length} publication${
                  filteredPublications.length > 1
                    ? "s"
                    : ""
                }`}
          </p>

          <p className="text-[10px] text-slate-400">
            Projet :{" "}
            <strong className="text-slate-600">
              {projectLabel}
            </strong>
          </p>

        </div>

        {/* =====================================================
            CHARGEMENT
        ===================================================== */}

        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-40 animate-pulse bg-slate-100" />

                <div className="space-y-3 p-4">

                  <div className="h-5 w-24 animate-pulse rounded bg-slate-100" />

                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />

                  <div className="h-12 w-full animate-pulse rounded bg-slate-100" />

                </div>
              </div>
            ))}

          </div>
        )}

        {/* =====================================================
            GRID
        ===================================================== */}

        {!loading && view === "grid" && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredPublications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                deleting={deletingId === publication.id}
                onView={() =>
                  setSelectedPublication(publication)
                }
                onEdit={() =>
                  handleEdit(publication.id)
                }
                onDelete={() =>
                  handleDelete(publication.id)
                }
              />
            ))}

          </div>
        )}

        {/* =====================================================
            LISTE
        ===================================================== */}

        {!loading && view === "list" && (
          <div className="space-y-3">

            {filteredPublications.map((publication) => (
              <PublicationListItem
                key={publication.id}
                publication={publication}
                deleting={deletingId === publication.id}
                onView={() =>
                  setSelectedPublication(publication)
                }
                onEdit={() =>
                  handleEdit(publication.id)
                }
                onDelete={() =>
                  handleDelete(publication.id)
                }
              />
            ))}

          </div>
        )}

        {/* =====================================================
            AUCUN RÉSULTAT
        ===================================================== */}

        {!loading && filteredPublications.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">

            <FileText
              size={32}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-sm font-black">
              Aucune publication trouvée
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {publications.length === 0
                ? "Créez votre première publication pour la retrouver ici."
                : "Essayez de modifier votre recherche ou vos filtres."}
            </p>

            {publications.length === 0 && (
              <Link
                href="/dashboard/publication"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-red-700"
              >
                <Plus size={14} />
                Créer une publication
              </Link>
            )}

          </div>
        )}

      </main>

      {/* =====================================================
          MODAL VOIR
      ===================================================== */}

      {selectedPublication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER MODAL */}

            <div className="flex items-center justify-between border-b border-slate-200 p-5">

              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Publication
                </p>

                <h3 className="mt-1 text-lg font-black">
                  {selectedPublication.title}
                </h3>

              </div>

              <button
                onClick={() => setSelectedPublication(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>

            </div>

            {/* CONTENU MODAL */}

            <div className="p-5">

              <div className="mb-4 flex flex-wrap items-center gap-2">

                <NetworkBadge
                  network={selectedPublication.network}
                />

                <StatusBadge
                  status={selectedPublication.status}
                />

              </div>

              {selectedPublication.image && (
                <div className="mb-5 overflow-hidden rounded-xl bg-slate-100">

                  <img
                    src={selectedPublication.image}
                    alt={selectedPublication.title}
                    className="max-h-[400px] w-full object-contain"
                  />

                </div>
              )}

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                  {selectedPublication.content}
                </p>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-slate-200 p-3">

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {selectedPublication.date || "—"}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 p-3">

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Heure
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {selectedPublication.time || "—"}
                  </p>

                </div>

              </div>

              {selectedPublication.projectName && (
                <div className="mt-3 rounded-xl border border-slate-200 p-3">

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Projet
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {selectedPublication.projectName}
                  </p>

                </div>
              )}

            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-2 border-t border-slate-200 p-5">

              <button
                onClick={() => setSelectedPublication(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-slate-600 hover:bg-slate-50"
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  const id = selectedPublication.id;

                  setSelectedPublication(null);

                  handleEdit(id);
                }}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white hover:bg-red-700"
              >
                <Edit3 size={14} />
                Modifier
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
          {icon}
        </div>

        <span className="text-xl font-black text-slate-800">
          {value}
        </span>

      </div>

      <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   PUBLICATION CARD
========================================================= */

function PublicationCard({
  publication,
  deleting,
  onView,
  onEdit,
  onDelete,
}: {
  publication: Publication;
  deleting: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      {/* IMAGE */}

      {publication.image ? (
        <div className="h-40 overflow-hidden bg-slate-100">

          <img
            src={publication.image}
            alt={publication.title}
            className="h-full w-full object-cover"
          />

        </div>
      ) : (
        <div className="flex h-40 items-center justify-center bg-slate-50">

          <FileText
            size={30}
            className="text-slate-300"
          />

        </div>
      )}

      {/* CONTENU */}

      <div className="p-4">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <NetworkBadge network={publication.network} />

            <h3 className="mt-3 truncate text-sm font-black text-slate-800">
              {publication.title}
            </h3>

          </div>

          <button
            className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
            onClick={onView}
          >
            <MoreHorizontal size={17} />
          </button>

        </div>

        <p className="mt-2 line-clamp-3 whitespace-pre-line text-[11px] leading-relaxed text-slate-500">
          {publication.content}
        </p>

        {/* DATE */}

        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">

          <div className="flex items-center gap-1.5 text-[9px] text-slate-400">

            <CalendarDays size={13} />

            {publication.date || "—"}

          </div>

          <div className="flex items-center gap-1.5 text-[9px] text-slate-400">

            <Clock3 size={13} />

            {publication.time || "—"}

          </div>

        </div>

        {/* STATUT */}

        <div className="mt-3 flex items-center justify-between">

          <StatusBadge status={publication.status} />

          <div className="flex gap-1">

            <button
              title="Voir"
              onClick={onView}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-800"
            >
              <Eye size={14} />
            </button>

            <button
              title="Modifier"
              onClick={onEdit}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
            >
              <Edit3 size={14} />
            </button>

            <button
              title="Supprimer"
              onClick={onDelete}
              disabled={deleting}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-red-600" />
              ) : (
                <Trash2 size={14} />
              )}
            </button>

          </div>

        </div>

      </div>

    </article>
  );
}

/* =========================================================
   LIST ITEM
========================================================= */

function PublicationListItem({
  publication,
  deleting,
  onView,
  onEdit,
  onDelete,
}: {
  publication: Publication;
  deleting: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">

      {/* IMAGE */}

      <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-32">

        {publication.image ? (
          <img
            src={publication.image}
            alt={publication.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">

            <FileText
              size={24}
              className="text-slate-300"
            />

          </div>
        )}

      </div>

      {/* INFOS */}

      <div className="min-w-0 flex-1">

        <NetworkBadge network={publication.network} />

        <h3 className="mt-2 truncate text-sm font-black">
          {publication.title}
        </h3>

        <p className="mt-1 line-clamp-2 whitespace-pre-line text-[10px] text-slate-400">
          {publication.content}
        </p>

      </div>

      {/* DATE */}

      <div className="shrink-0 text-[10px] text-slate-400">

        <div className="flex items-center gap-1.5">
          <CalendarDays size={13} />
          {publication.date || "—"}
        </div>

        <div className="mt-1 flex items-center gap-1.5">
          <Clock3 size={13} />
          {publication.time || "—"}
        </div>

      </div>

      {/* STATUT */}

      <StatusBadge status={publication.status} />

      {/* ACTIONS */}

      <div className="flex shrink-0 gap-1">

        <button
          onClick={onView}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-800"
        >
          <Eye size={14} />
        </button>

        <button
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
        >
          <Edit3 size={14} />
        </button>

        <button
          onClick={onDelete}
          disabled={deleting}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-red-600" />
          ) : (
            <Trash2 size={14} />
          )}
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   NETWORK BADGE
========================================================= */

function NetworkBadge({
  network,
}: {
  network: Network;
}) {
  const data: Record<
    Network,
    {
      icon: React.ReactNode;
      style: string;
    }
  > = {
    Facebook: {
      icon: <FacebookIcon size={15} />,
      style: "bg-[#1877F2]/10 text-[#1877F2]",
    },

    Instagram: {
      icon: <InstagramIcon size={15} />,
      style: "bg-pink-50 text-[#E1306C]",
    },

    LinkedIn: {
      icon: <LinkedinIcon size={15} />,
      style: "bg-[#0A66C2]/10 text-[#0A66C2]",
    },

    TikTok: {
      icon: <TikTokIcon size={15} />,
      style: "bg-slate-100 text-black",
    },

    "Google Business": {
      icon: <GoogleBusinessIcon size={15} />,
      style: "bg-blue-50 text-blue-600",
    },

    X: {
      icon: <XIcon size={15} />,
      style: "bg-slate-100 text-black",
    },
  };

  const item = data[network];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[9px] font-bold ${item.style}`}
    >
      {item.icon}
      {network}
    </span>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: PublicationStatus;
}) {
  const data: Record<
    PublicationStatus,
    {
      icon: React.ReactNode;
      style: string;
    }
  > = {
    Publiée: {
      icon: <CheckCircle2 size={12} />,
      style: "bg-emerald-50 text-emerald-600",
    },

    Programmée: {
      icon: <Clock size={12} />,
      style: "bg-orange-50 text-orange-600",
    },

    Brouillon: {
      icon: <FileText size={12} />,
      style: "bg-slate-100 text-slate-500",
    },

    Échec: {
      icon: <XCircle size={12} />,
      style: "bg-red-50 text-red-600",
    },
  };

  const item = data[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[9px] font-bold ${item.style}`}
    >
      {item.icon}
      {status}
    </span>
  );
}
