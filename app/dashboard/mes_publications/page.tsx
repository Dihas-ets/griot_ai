"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CalendarDays,
  Clock3,
  Edit3,
  Trash2,
  Send,
  Eye,
  ChevronDown,
  CheckCircle2,
  Clock,
  FileText,
  XCircle,
  LayoutGrid,
  List,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type PublicationStatus =
  | "Publiée"
  | "Programmée"
  | "Brouillon"
  | "Échec";

type Network = "Facebook" | "Instagram" | "LinkedIn" | "X";

type Publication = {
  id: number;
  title: string;
  content: string;
  network: Network;
  status: PublicationStatus;
  date: string;
  time: string;
  image?: string;
};

/* =========================================================
   ICÔNES RÉSEAUX
========================================================= */

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.006 10.125 11.927v-8.432H7.078v-3.495h3.047V9.413c0-3.022 1.791-4.693 4.533-4.693 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.956.931-1.956 1.887v2.257h3.328l-.532 3.495h-2.796V24C19.612 23.079 24 18.092 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
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

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 8.99h3.56v11.46H3.56V8.99z" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231z" />
  </svg>
);

/* =========================================================
   DONNÉES
========================================================= */

const publications: Publication[] = [
  {
    id: 1,
    title: "Nouvelle formation Flutter",
    content:
      "🚀 Nouvelle formation Flutter ! Vous êtes débutant et vous souhaitez créer des applications mobiles modernes ? Rejoignez notre formation 100% pratique avec des projets concrets.",
    network: "Facebook",
    status: "Publiée",
    date: "15 juillet 2026",
    time: "10:30",
    image: "/flutter.png",
  },
  {
    id: 2,
    title: "Formation Flutter pour débutants",
    content:
      "Apprenez à développer des applications mobiles modernes avec Flutter grâce à une formation pratique et accessible aux débutants.",
    network: "Instagram",
    status: "Publiée",
    date: "15 juillet 2026",
    time: "11:00",
    image: "/flutter.png",
  },
  {
    id: 3,
    title: "Conseils pour réussir son projet",
    content:
      "💡 Quelques conseils essentiels pour bien démarrer un projet de développement mobile et construire une application performante.",
    network: "LinkedIn",
    status: "Programmée",
    date: "17 juillet 2026",
    time: "18:00",
    image: "/flutter.png",
  },
  {
    id: 4,
    title: "Les avantages de Flutter",
    content:
      "Pourquoi choisir Flutter pour développer vos applications mobiles ? Découvrez les principaux avantages de cette technologie.",
    network: "X",
    status: "Brouillon",
    date: "—",
    time: "—",
    image: "/flutter.png",
  },
  {
    id: 5,
    title: "Découvrez nos services",
    content:
      "🚀 Découvrez nos services et nos solutions pour accompagner votre entreprise dans sa transformation digitale.",
    network: "Facebook",
    status: "Programmée",
    date: "20 juillet 2026",
    time: "09:00",
    image: "/flutter.png",
  },
  {
    id: 6,
    title: "Développement mobile moderne",
    content:
      "Le développement mobile évolue rapidement. Découvrez les outils et technologies à suivre cette année.",
    network: "LinkedIn",
    status: "Échec",
    date: "12 juillet 2026",
    time: "14:30",
    image: "/flutter.png",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function MesPublicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Toutes");
  const [networkFilter, setNetworkFilter] = useState("Tous");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredPublications = useMemo(() => {
    return publications.filter((publication) => {
      const matchesSearch =
        publication.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        publication.content
          .toLowerCase()
          .includes(search.toLowerCase());

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
  }, [search, statusFilter, networkFilter]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* GAUCHE */}

          <div className="min-w-0 pl-12 md:pl-12 lg:pl-0 xl:pl-0">

            <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
              Gestion de contenu
            </p>

            <h1 className="text-lg font-black sm:text-xl">
              Mes publications
            </h1>

          </div>

          {/* DROITE */}

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
            value="24"
          />

          <StatCard
            icon={<CheckCircle2 size={17} />}
            label="Publiées"
            value="15"
          />

          <StatCard
            icon={<Clock size={17} />}
            label="Programmées"
            value="6"
          />

          <StatCard
            icon={<FileText size={17} />}
            label="Brouillons"
            value="3"
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
                  <option>X</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

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
            {filteredPublications.length} publication
            {filteredPublications.length > 1 ? "s" : ""}
          </p>

          <p className="text-[10px] text-slate-400">
            Projet : <strong className="text-slate-600">Presta</strong>
          </p>

        </div>

        {/* =====================================================
            GRID
        ===================================================== */}

        {view === "grid" && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredPublications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
              />
            ))}

          </div>
        )}

        {/* =====================================================
            LISTE
        ===================================================== */}

        {view === "list" && (
          <div className="space-y-3">

            {filteredPublications.map((publication) => (
              <PublicationListItem
                key={publication.id}
                publication={publication}
              />
            ))}

          </div>
        )}

        {/* =====================================================
            AUCUN RÉSULTAT
        ===================================================== */}

        {filteredPublications.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">

            <FileText
              size={32}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-sm font-black">
              Aucune publication trouvée
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Essayez de modifier votre recherche ou vos filtres.
            </p>

          </div>
        )}

      </main>

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
}: {
  publication: Publication;
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

          <button className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
            <MoreHorizontal size={17} />
          </button>

        </div>

        <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-slate-500">
          {publication.content}
        </p>

        {/* DATE */}

        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">

          <div className="flex items-center gap-1.5 text-[9px] text-slate-400">

            <CalendarDays size={13} />

            {publication.date}

          </div>

          <div className="flex items-center gap-1.5 text-[9px] text-slate-400">

            <Clock3 size={13} />

            {publication.time}

          </div>

        </div>

        {/* STATUT */}

        <div className="mt-3 flex items-center justify-between">

          <StatusBadge status={publication.status} />

          <div className="flex gap-1">

            <button
              title="Voir"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-800"
            >
              <Eye size={14} />
            </button>

            <button
              title="Modifier"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
            >
              <Edit3 size={14} />
            </button>

            <button
              title="Supprimer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={14} />
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
}: {
  publication: Publication;
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

        <p className="mt-1 line-clamp-2 text-[10px] text-slate-400">
          {publication.content}
        </p>

      </div>

      {/* DATE */}

      <div className="shrink-0 text-[10px] text-slate-400">

        <div className="flex items-center gap-1.5">
          <CalendarDays size={13} />
          {publication.date}
        </div>

        <div className="mt-1 flex items-center gap-1.5">
          <Clock3 size={13} />
          {publication.time}
        </div>

      </div>

      {/* STATUT */}

      <StatusBadge status={publication.status} />

      {/* ACTIONS */}

      <div className="flex shrink-0 gap-1">

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-800">
          <Eye size={14} />
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600">
          <Edit3 size={14} />
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600">
          <Trash2 size={14} />
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
  const data = {
    Facebook: {
      icon: <FacebookIcon />,
      style: "bg-blue-50 text-blue-600",
    },
    Instagram: {
      icon: <InstagramIcon />,
      style: "bg-pink-50 text-pink-600",
    },
    LinkedIn: {
      icon: <LinkedinIcon />,
      style: "bg-sky-50 text-sky-600",
    },
    X: {
      icon: <XIcon />,
      style: "bg-slate-100 text-slate-700",
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
  const data = {
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