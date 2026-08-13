"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  MoreHorizontal,
  FolderOpen,
  CalendarDays,
  FileText,
  Image as ImageIcon,
  Users,
  Edit3,
  Trash2,
  Eye,
  ChevronDown,
  CheckCircle2,
  Clock3,
  Archive,
  LayoutGrid,
  List,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ProjectStatus = "Actif" | "En pause" | "Archivé";

type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  publications: number;
  scheduled: number;
  media: number;
  members: number;
  createdAt: string;
  image: string;
};

/* =========================================================
   DONNÉES DES PROJETS
========================================================= */

const projects: Project[] = [
  {
    id: 1,
    name: "Presta",
    description:
      "Communication et création de contenu pour la plateforme Presta.",
    status: "Actif",
    publications: 24,
    scheduled: 6,
    media: 38,
    members: 4,
    createdAt: "10 juin 2026",
    image: "/presta.png",
  },
  {
    id: 2,
    name: "Diha's Agency",
    description:
      "Contenus marketing et communication digitale de l'agence.",
    status: "Actif",
    publications: 18,
    scheduled: 4,
    media: 26,
    members: 3,
    createdAt: "18 juin 2026",
    image: "/dihas.jpg",
  },
  {
    id: 3,
    name: "Fofana Voyage",
    description:
      "Publications et campagnes dédiées aux services de voyage.",
    status: "Actif",
    publications: 12,
    scheduled: 3,
    media: 21,
    members: 2,
    createdAt: "25 juin 2026",
    image: "/fofana.png",
  },
  {
    id: 4,
    name: "islam pilier",
    description:
      "Communication digitale et contenus informatifs de Clinico.",
    status: "En pause",
    publications: 8,
    scheduled: 1,
    media: 15,
    members: 2,
    createdAt: "02 juillet 2026",
    image: "/islam_pilier.png",
  },
  {
    id: 5,
    name: "Livro",
    description:
      "Contenus promotionnels pour la plateforme de livraison Livro.",
    status: "Actif",
    publications: 15,
    scheduled: 5,
    media: 29,
    members: 3,
    createdAt: "08 juillet 2026",
    image: "/livro.png",
  },
  {
    id: 6,
    name: "Ancien projet",
    description:
      "Projet archivé contenant les anciennes publications.",
    status: "Archivé",
    publications: 31,
    scheduled: 0,
    media: 44,
    members: 1,
    createdAt: "12 mai 2026",
    image: "/aif.png",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ProjetsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        project.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "Tous" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* GAUCHE */}

          <div className="min-w-0 pl-14 md:pl-12 lg:pl-0 xl:pl-0">

            <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
              Organisation
            </p>

            <h1 className="text-lg font-black sm:text-xl">
              Projets
            </h1>

          </div>

          {/* DROITE */}

          <button
            className="
              flex shrink-0 items-center gap-2
              rounded-xl bg-red-600 px-4 py-2.5
              text-[10px] font-black uppercase tracking-wide
              text-white shadow-lg shadow-red-600/20
              transition hover:bg-red-700
            "
          >
            <Plus size={15} />

            <span className="hidden sm:inline">
              Nouveau projet
            </span>

            <span className="sm:hidden">
              Nouveau
            </span>
          </button>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1700px] p-4 sm:p-6 lg:p-8">

        {/* ===================================================
            INTRODUCTION
        =================================================== */}

        <div className="mb-6">

          <h2 className="text-xl font-black sm:text-2xl">
            Mes projets
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
            Organisez vos contenus, publications, médias et réseaux
            sociaux par projet pour garder une communication claire
            et bien structurée.
          </p>

        </div>

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={<FolderOpen size={17} />}
            label="Projets"
            value="6"
          />

          <StatCard
            icon={<CheckCircle2 size={17} />}
            label="Projets actifs"
            value="4"
          />

          <StatCard
            icon={<FileText size={17} />}
            label="Publications"
            value="108"
          />

          <StatCard
            icon={<ImageIcon size={17} />}
            label="Médias"
            value="173"
          />

        </div>

        {/* ===================================================
            BARRE DE RECHERCHE + FILTRES
        =================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

            {/* RECHERCHE */}

            <div className="relative w-full xl:max-w-md">

              <Search
                size={16}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2 text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un projet..."
                className="
                  w-full rounded-xl
                  border border-slate-200
                  bg-slate-50
                  py-2.5 pl-9 pr-3
                  text-xs font-medium
                  outline-none transition
                  focus:border-red-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-red-500/5
                "
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
                  className="
                    appearance-none
                    rounded-xl
                    border border-slate-200
                    bg-white
                    px-3 py-2.5 pr-8
                    text-[10px] font-bold
                    text-slate-600
                    outline-none
                    focus:border-red-400
                  "
                >
                  <option>Tous</option>
                  <option>Actif</option>
                  <option>En pause</option>
                  <option>Archivé</option>
                </select>

                <ChevronDown
                  size={13}
                  className="
                    pointer-events-none
                    absolute right-2
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

              </div>

              {/* VUE */}

              <div className="flex rounded-xl border border-slate-200 bg-white p-1">

                <button
                  onClick={() => setView("grid")}
                  className={`
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    ${
                      view === "grid"
                        ? "bg-red-50 text-red-600"
                        : "text-slate-400 hover:bg-slate-50"
                    }
                  `}
                >
                  <LayoutGrid size={15} />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    ${
                      view === "list"
                        ? "bg-red-50 text-red-600"
                        : "text-slate-400 hover:bg-slate-50"
                    }
                  `}
                >
                  <List size={15} />
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            TITRE RÉSULTATS
        =================================================== */}

        <div className="mb-4 flex items-center justify-between">

          <p className="text-xs font-bold text-slate-500">
            {filteredProjects.length} projet
            {filteredProjects.length > 1 ? "s" : ""}
          </p>

          <p className="text-[10px] text-slate-400">
            Dernière mise à jour : aujourd'hui
          </p>

        </div>

        {/* ===================================================
            AFFICHAGE GRID
        =================================================== */}

        {view === "grid" && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}

          </div>
        )}

        {/* ===================================================
            AFFICHAGE LISTE
        =================================================== */}

        {view === "list" && (
          <div className="space-y-3">

            {filteredProjects.map((project) => (
              <ProjectListItem
                key={project.id}
                project={project}
              />
            ))}

          </div>
        )}

        {/* ===================================================
            AUCUN PROJET
        =================================================== */}

        {filteredProjects.length === 0 && (
          <div className="
            rounded-2xl
            border border-dashed border-slate-300
            bg-white
            px-5 py-16
            text-center
          ">

            <div className="
              mx-auto flex h-12 w-12
              items-center justify-center
              rounded-2xl bg-slate-100
            ">
              <FolderOpen
                size={24}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-4 text-sm font-black">
              Aucun projet trouvé
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs text-slate-400">
              Aucun projet ne correspond à votre recherche ou
              aux filtres sélectionnés.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("Tous");
              }}
              className="
                mt-5 rounded-xl
                border border-slate-200
                px-4 py-2.5
                text-[10px] font-bold
                text-slate-600
                hover:bg-slate-50
              "
            >
              Réinitialiser les filtres
            </button>

          </div>
        )}

        {/* ===================================================
            CONSEIL
        =================================================== */}

        <div className="
          mt-6 flex flex-col gap-4
          rounded-2xl border border-red-100
          bg-red-50 p-5
          sm:flex-row sm:items-center
          sm:justify-between
        ">

          <div className="flex items-start gap-3">

            <div className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl bg-white
              text-red-600
            ">
              <FolderOpen size={17} />
            </div>

            <div>

              <h3 className="text-xs font-black text-slate-800">
                Gardez vos contenus bien organisés
              </h3>

              <p className="
                mt-1 max-w-xl
                text-[10px] leading-relaxed
                text-slate-500
              ">
                Créez un projet pour chaque activité, marque ou
                client afin de gérer facilement vos publications,
                médias et campagnes.
              </p>

            </div>

          </div>

          <button className="
            shrink-0 rounded-xl
            bg-red-600 px-4 py-2.5
            text-[10px] font-black
            text-white
            transition hover:bg-red-700
          ">
            Créer un projet
          </button>

        </div>

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
    <div className="
      rounded-2xl
      border border-slate-200
      bg-white p-4
      shadow-sm
    ">

      <div className="flex items-center justify-between">

        <div className="
          flex h-9 w-9
          items-center justify-center
          rounded-xl bg-red-50
          text-red-600
        ">
          {icon}
        </div>

        <span className="text-xl font-black text-slate-800">
          {value}
        </span>

      </div>

      <p className="
        mt-3
        text-[10px] font-bold
        uppercase tracking-wider
        text-slate-400
      ">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* =====================================================
          COUVERTURE IMAGE
      ===================================================== */}

      <div className="relative h-40 overflow-hidden">
        <Image
          src={project.image}
          alt={`Image du projet ${project.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 hover:scale-105"
        />

        {/* Overlay */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/45
            via-black/10
            to-transparent
          "
        />

        {/* Menu */}

        <button
          type="button"
          aria-label={`Options du projet ${project.name}`}
          className="
            absolute right-4 top-4
            flex h-8 w-8
            items-center justify-center
            rounded-lg
            bg-white/90
            text-slate-700
            shadow-sm
            backdrop-blur-sm
            transition
            hover:bg-white
          "
        >
          <MoreHorizontal size={17} />
        </button>

        {/* Nom du projet */}

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="truncate text-base font-black text-white">
            {project.name}
          </h3>
        </div>

        {/* Statut */}

        <div className="absolute bottom-4 right-4">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <div className="p-5">
        <p
          className="
            min-h-[32px]
            line-clamp-2
            text-[10px]
            leading-relaxed
            text-slate-400
          "
        >
          {project.description}
        </p>

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <div
          className="
            mt-5
            grid grid-cols-3
            divide-x
            divide-slate-100
            rounded-xl
            bg-slate-50
            py-3
          "
        >
          <ProjectStat
            value={project.publications}
            label="Posts"
          />

          <ProjectStat
            value={project.scheduled}
            label="Programmés"
          />

          <ProjectStat
            value={project.media}
            label="Médias"
          />
        </div>

        {/* ===================================================
            INFOS
        =================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            text-[9px]
            text-slate-400
          "
        >
          <span className="flex items-center gap-1.5">
            <CalendarDays size={12} />
            Créé le {project.createdAt}
          </span>

          <span className="flex items-center gap-1.5">
            <Users size={12} />
            {project.members}
          </span>
        </div>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div
          className="
            mt-4
            flex
            gap-2
            border-t
            border-slate-100
            pt-4
          "
        >
          <Link
            href="/dashboard/publications"
            className="
              flex flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-slate-50
              py-2.5
              text-[10px]
              font-bold
              text-slate-600
              transition
              hover:bg-slate-100
            "
          >
            <Eye size={13} />
            Voir
          </Link>

          <button
            type="button"
            aria-label={`Modifier ${project.name}`}
            className="
              flex h-9 w-9
              items-center
              justify-center
              rounded-xl
              border border-slate-200
              text-slate-400
              transition
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <Edit3 size={14} />
          </button>

          <button
            type="button"
            aria-label={`Supprimer ${project.name}`}
            className="
              flex h-9 w-9
              items-center
              justify-center
              rounded-xl
              border border-slate-200
              text-slate-400
              transition
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PROJECT LIST ITEM
========================================================= */

function ProjectListItem({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="
      flex flex-col gap-4
      rounded-2xl
      border border-slate-200
      bg-white p-4
      shadow-sm
      lg:flex-row
      lg:items-center
    ">

      {/* IDENTITÉ */}

      <div className="flex min-w-0 flex-1 items-center gap-3">

      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
  <Image
    src={project.image}
    alt={`Image du projet ${project.name}`}
    fill
    sizes="48px"
    className="object-cover"
  />
</div>

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <h3 className="truncate text-sm font-black">
              {project.name}
            </h3>

            <StatusBadge status={project.status} />

          </div>

          <p className="
            mt-1
            truncate
            text-[10px]
            text-slate-400
          ">
            {project.description}
          </p>

        </div>

      </div>

      {/* POSTS */}

      <div className="
        flex items-center
        gap-2
        text-[10px]
        text-slate-500
      ">

        <FileText size={14} />

        <span>
          <strong className="text-slate-700">
            {project.publications}
          </strong>{" "}
          publications
        </span>

      </div>

      {/* MÉDIAS */}

      <div className="
        flex items-center
        gap-2
        text-[10px]
        text-slate-500
      ">

        <ImageIcon size={14} />

        <span>
          <strong className="text-slate-700">
            {project.media}
          </strong>{" "}
          médias
        </span>

      </div>

      {/* MEMBRES */}

      <div className="
        flex items-center
        gap-2
        text-[10px]
        text-slate-500
      ">

        <Users size={14} />

        <span>
          {project.members} membre
          {project.members > 1 ? "s" : ""}
        </span>

      </div>

      {/* ACTIONS */}

      <div className="flex gap-1">

        <button className="
          flex h-8 w-8
          items-center justify-center
          rounded-lg
          text-slate-400
          hover:bg-slate-50
          hover:text-slate-800
        ">
          <Eye size={14} />
        </button>

        <button className="
          flex h-8 w-8
          items-center justify-center
          rounded-lg
          text-slate-400
          hover:bg-red-50
          hover:text-red-600
        ">
          <Edit3 size={14} />
        </button>

        <button className="
          flex h-8 w-8
          items-center justify-center
          rounded-lg
          text-slate-400
          hover:bg-red-50
          hover:text-red-600
        ">
          <Trash2 size={14} />
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   PROJECT STAT
========================================================= */

function ProjectStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="text-center">

      <p className="text-sm font-black text-slate-800">
        {value}
      </p>

      <p className="mt-0.5 text-[8px] font-medium text-slate-400">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: ProjectStatus;
}) {
  const config = {
    Actif: {
      icon: <CheckCircle2 size={11} />,
      className: "bg-emerald-50 text-emerald-600",
    },
    "En pause": {
      icon: <Clock3 size={11} />,
      className: "bg-orange-50 text-orange-600",
    },
    Archivé: {
      icon: <Archive size={11} />,
      className: "bg-slate-100 text-slate-500",
    },
  };

  const item = config[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-lg
        px-2
        py-1
        text-[9px]
        font-bold
        ${item.className}
      `}
    >
      {item.icon}
      {status}
    </span>
  );
}

/* =========================================================
   INITIALS
========================================================= */

function getProjectInitials(name: string) {
  const words = name
    .trim()
    .split(" ")
    .filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (
    words[0][0] + words[1][0]
  ).toUpperCase();
}