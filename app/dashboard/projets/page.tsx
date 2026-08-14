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
  ArchiveRestore,
  ExternalLink,
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
   DONNÉES
========================================================= */

const initialProjects: Project[] = [
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
    image: "/dihas.png",
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
    name: "Islam Pilier",
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
  const [projects, setProjects] =
    useState<Project[]>(initialProjects);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [view, setView] = useState<"grid" | "list">("grid");

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  /* =======================================================
     FILTRAGE
  ======================================================= */

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        project.name.toLowerCase().includes(searchValue) ||
        project.description
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "Tous" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  /* =======================================================
     STATISTIQUES
  ======================================================= */

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "Actif"
  ).length;

  const totalPublications = projects.reduce(
    (total, project) => total + project.publications,
    0
  );

  const totalMedia = projects.reduce(
    (total, project) => total + project.media,
    0
  );

  /* =======================================================
     SUPPRIMER
  ======================================================= */

  const deleteProject = (id: number) => {
    const project = projects.find(
      (item) => item.id === id
    );

    if (!project) return;

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le projet "${project.name}" ?`
    );

    if (!confirmed) return;

    setProjects((current) =>
      current.filter((item) => item.id !== id)
    );

    setOpenMenu(null);
  };

  /* =======================================================
     ARCHIVER
  ======================================================= */

  const toggleArchive = (id: number) => {
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== id) return project;

        return {
          ...project,
          status:
            project.status === "Archivé"
              ? "Actif"
              : "Archivé",
        };
      })
    );

    setOpenMenu(null);
  };

  /* =======================================================
     RENDU
  ======================================================= */

  return (
    <div
      className="min-h-screen bg-[#f8fafc] text-slate-900"
      onClick={() => setOpenMenu(null)}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div
          className="
            flex min-h-16
            items-center justify-between
            gap-4
            px-4 sm:px-6 lg:px-8
          "
        >
          {/* GAUCHE */}

          <div className="min-w-0 pl-14 md:pl-12 lg:pl-0">
            <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
              Organisation
            </p>

            <h1 className="text-lg font-black sm:text-xl">
              Projets
            </h1>
          </div>

          {/* DROITE */}

          <Link
            href="/dashboard/projets/nouveau_projet"
            onClick={(e) => e.stopPropagation()}
            className="
              flex shrink-0 items-center gap-2
              rounded-xl bg-red-600
              px-4 py-2.5
              text-[10px] font-black uppercase tracking-wide
              text-white
              shadow-lg shadow-red-600/20
              transition
              hover:bg-red-700
            "
          >
            <Plus size={15} />

            <span className="hidden sm:inline">
              Nouveau projet
            </span>

            <span className="sm:hidden">
              Nouveau
            </span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1700px] p-4 sm:p-6 lg:p-8">
        {/* INTRO */}

        <div className="mb-6">
          <h2 className="text-xl font-black sm:text-2xl">
            Mes projets
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
            Organisez vos contenus, publications, médias et
            réseaux sociaux par projet pour garder une
            communication claire et bien structurée.
          </p>
        </div>

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={<FolderOpen size={17} />}
            label="Projets"
            value={totalProjects.toString()}
          />

          <StatCard
            icon={<CheckCircle2 size={17} />}
            label="Projets actifs"
            value={activeProjects.toString()}
          />

          <StatCard
            icon={<FileText size={17} />}
            label="Publications"
            value={totalPublications.toString()}
          />

          <StatCard
            icon={<ImageIcon size={17} />}
            label="Médias"
            value={totalMedia.toString()}
          />
        </div>

        {/* ===================================================
            RECHERCHE + FILTRES
        =================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            {/* RECHERCHE */}

            <div className="relative w-full xl:max-w-md">
              <Search
                size={16}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
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
              {/* STATUS */}

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
                  type="button"
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
                  type="button"
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
            RÉSULTATS
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
            GRID
        =================================================== */}

        {view === "grid" && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                onDelete={deleteProject}
                onArchive={toggleArchive}
              />
            ))}
          </div>
        )}

        {/* ===================================================
            LISTE
        =================================================== */}

        {view === "list" && (
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <ProjectListItem
                key={project.id}
                project={project}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                onDelete={deleteProject}
                onArchive={toggleArchive}
              />
            ))}
          </div>
        )}

        {/* ===================================================
            AUCUN PROJET
        =================================================== */}

        {filteredProjects.length === 0 && (
          <div
            className="
              rounded-2xl
              border border-dashed border-slate-300
              bg-white
              px-5 py-16
              text-center
            "
          >
            <div
              className="
                mx-auto flex h-12 w-12
                items-center justify-center
                rounded-2xl bg-slate-100
              "
            >
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
              type="button"
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

        <div
          className="
            mt-6 flex flex-col gap-4
            rounded-2xl
            border border-red-100
            bg-red-50 p-5
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-xl bg-white
                text-red-600
              "
            >
              <FolderOpen size={17} />
            </div>

            <div>
              <h3 className="text-xs font-black text-slate-800">
                Gardez vos contenus bien organisés
              </h3>

              <p className="mt-1 max-w-xl text-[10px] leading-relaxed text-slate-500">
                Créez un projet pour chaque activité, marque
                ou client afin de gérer facilement vos
                publications, médias et campagnes.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/projets/nouveau"
            className="
              shrink-0 rounded-xl
              bg-red-600 px-4 py-2.5
              text-center text-[10px]
              font-black text-white
              transition
              hover:bg-red-700
            "
          >
            Créer un projet
          </Link>
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
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white p-4
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-xl bg-red-50
            text-red-600
          "
        >
          {icon}
        </div>

        <span className="text-xl font-black text-slate-800">
          {value}
        </span>
      </div>

      <p
        className="
          mt-3
          text-[10px] font-bold
          uppercase tracking-wider
          text-slate-400
        "
      >
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
  openMenu,
  setOpenMenu,
  onDelete,
  onArchive,
}: {
  project: Project;
  openMenu: number | null;
  setOpenMenu: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}) {
  const isMenuOpen = openMenu === project.id;

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
      onClick={(e) => e.stopPropagation()}
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className="
          relative
          h-40
          w-full
          overflow-hidden
          bg-slate-100
        "
      >
        <Image
          src={project.image}
          alt={`Image du projet ${project.name}`}
          fill
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1280px) 50vw,
            33vw
          "
          className="
            object-contain
            object-center
            p-0
            transition
            duration-500
            hover:scale-[1.03]
          "
        />

        {/* Dégradé léger en bas */}

        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-20
            bg-gradient-to-t
            from-black/50
            to-transparent
          "
        />

        {/* ===================================================
            BOUTON ACTIONS
        =================================================== */}

        <div className="absolute right-3 top-3">
          <button
            type="button"
            aria-label={`Actions du projet ${project.name}`}
            onClick={() =>
              setOpenMenu(
                isMenuOpen ? null : project.id
              )
            }
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              bg-white
              text-slate-700
              shadow-md
              transition
              hover:bg-slate-50
            "
          >
            <MoreHorizontal size={18} />
          </button>

          {/* MENU */}

          {isMenuOpen && (
            <div
              className="
                absolute right-0 top-11
                z-50 w-44
                overflow-hidden
                rounded-xl
                border border-slate-200
                bg-white
                p-1.5
                shadow-xl
              "
            >
              <Link
                href="/dashboard/publications"
                onClick={() => setOpenMenu(null)}
                className="
                  flex items-center gap-2
                  rounded-lg px-3 py-2.5
                  text-[10px] font-bold
                  text-slate-600
                  hover:bg-slate-50
                "
              >
                <Eye size={14} />
                Voir le projet
              </Link>

              <button
                type="button"
                onClick={() => {
                  setOpenMenu(null);
                  alert(
                    `Modification du projet "${project.name}"`
                  );
                }}
                className="
                  flex w-full items-center gap-2
                  rounded-lg px-3 py-2.5
                  text-[10px] font-bold
                  text-slate-600
                  hover:bg-slate-50
                "
              >
                <Edit3 size={14} />
                Modifier
              </button>

              <button
                type="button"
                onClick={() => onArchive(project.id)}
                className="
                  flex w-full items-center gap-2
                  rounded-lg px-3 py-2.5
                  text-[10px] font-bold
                  text-slate-600
                  hover:bg-slate-50
                "
              >
                {project.status === "Archivé" ? (
                  <>
                    <ArchiveRestore size={14} />
                    Restaurer
                  </>
                ) : (
                  <>
                    <Archive size={14} />
                    Archiver
                  </>
                )}
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={() => onDelete(project.id)}
                className="
                  flex w-full items-center gap-2
                  rounded-lg px-3 py-2.5
                  text-[10px] font-bold
                  text-red-600
                  hover:bg-red-50
                "
              >
                <Trash2 size={14} />
                Supprimer
              </button>
            </div>
          )}
        </div>

        {/* NOM */}

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="truncate text-base font-black text-white">
            {project.name}
          </h3>
        </div>

        {/* STATUT */}

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

        {/* STATS */}

        <div
          className="
            mt-5
            grid grid-cols-3
            divide-x divide-slate-100
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

        {/* INFOS */}

        <div
          className="
            mt-4 flex items-center
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

        {/* ACTIONS BAS */}

        <div
          className="
            mt-4 flex gap-2
            border-t border-slate-100
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
            onClick={() =>
              alert(
                `Modification du projet "${project.name}"`
              )
            }
            className="
              flex h-9 w-9
              items-center justify-center
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
            onClick={() => onDelete(project.id)}
            className="
              flex h-9 w-9
              items-center justify-center
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
   PROJECT LIST
========================================================= */

function ProjectListItem({
  project,
  openMenu,
  setOpenMenu,
  onDelete,
  onArchive,
}: {
  project: Project;
  openMenu: number | null;
  setOpenMenu: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}) {
  const isMenuOpen = openMenu === project.id;

  return (
    <div
      className="
        flex flex-col gap-4
        rounded-2xl
        border border-slate-200
        bg-white p-4
        shadow-sm
        lg:flex-row
        lg:items-center
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* IDENTITÉ */}

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className="
            relative
            h-14 w-14
            shrink-0
            overflow-hidden
            rounded-xl
            bg-slate-100
          "
        >
          <Image
            src={project.image}
            alt={`Image du projet ${project.name}`}
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-black">
              {project.name}
            </h3>

            <StatusBadge status={project.status} />
          </div>

          <p className="mt-1 truncate text-[10px] text-slate-400">
            {project.description}
          </p>
        </div>
      </div>

      {/* POSTS */}

      <div className="flex items-center gap-2 text-[10px] text-slate-500">
        <FileText size={14} />

        <span>
          <strong className="text-slate-700">
            {project.publications}
          </strong>{" "}
          publications
        </span>
      </div>

      {/* MEDIA */}

      <div className="flex items-center gap-2 text-[10px] text-slate-500">
        <ImageIcon size={14} />

        <span>
          <strong className="text-slate-700">
            {project.media}
          </strong>{" "}
          médias
        </span>
      </div>

      {/* MEMBRES */}

      <div className="flex items-center gap-2 text-[10px] text-slate-500">
        <Users size={14} />

        <span>
          {project.members} membre
          {project.members > 1 ? "s" : ""}
        </span>
      </div>

      {/* ACTIONS */}

      <div className="relative flex gap-1">
        <button
          type="button"
          onClick={() =>
            setOpenMenu(
              isMenuOpen ? null : project.id
            )
          }
          className="
            flex h-8 w-8
            items-center justify-center
            rounded-lg
            text-slate-400
            hover:bg-slate-50
            hover:text-slate-800
          "
        >
          <MoreHorizontal size={17} />
        </button>

        {isMenuOpen && (
          <div
            className="
              absolute right-0 top-10
              z-50 w-40
              overflow-hidden
              rounded-xl
              border border-slate-200
              bg-white p-1.5
              shadow-xl
            "
          >
            <Link
              href="/dashboard/publications"
              onClick={() => setOpenMenu(null)}
              className="
                flex items-center gap-2
                rounded-lg px-3 py-2
                text-[10px] font-bold
                text-slate-600
                hover:bg-slate-50
              "
            >
              <Eye size={13} />
              Voir
            </Link>

            <button
              type="button"
              onClick={() => {
                setOpenMenu(null);
                alert(
                  `Modification du projet "${project.name}"`
                );
              }}
              className="
                flex w-full items-center gap-2
                rounded-lg px-3 py-2
                text-[10px] font-bold
                text-slate-600
                hover:bg-slate-50
              "
            >
              <Edit3 size={13} />
              Modifier
            </button>

            <button
              type="button"
              onClick={() => onArchive(project.id)}
              className="
                flex w-full items-center gap-2
                rounded-lg px-3 py-2
                text-[10px] font-bold
                text-slate-600
                hover:bg-slate-50
              "
            >
              <Archive size={13} />
              Archiver
            </button>

            <button
              type="button"
              onClick={() => onDelete(project.id)}
              className="
                flex w-full items-center gap-2
                rounded-lg px-3 py-2
                text-[10px] font-bold
                text-red-600
                hover:bg-red-50
              "
            >
              <Trash2 size={13} />
              Supprimer
            </button>
          </div>
        )}
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
      className:
        "bg-emerald-50 text-emerald-600",
    },

    "En pause": {
      icon: <Clock3 size={11} />,
      className:
        "bg-orange-50 text-orange-600",
    },

    Archivé: {
      icon: <Archive size={11} />,
      className:
        "bg-slate-100 text-slate-500",
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