"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Search,
  Plus,
  Image as ImageIcon,
  Video,
  FileText,
  Folder,
  MoreHorizontal,
  Grid3X3,
  List,
  Upload,
  Trash2,
  Download,
  Copy,
  FolderOpen,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type MediaType = "image" | "video" | "document";

type Media = {
  id: number;
  name: string;
  type: MediaType;
  size: string;
  date: string;
  folder: string;
  src?: string;
};

/* =========================================================
   DONNÉES
========================================================= */

const medias: Media[] = [
  {
    id: 1,
    name: "formation-flutter.png",
    type: "image",
    size: "1,8 Mo",
    date: "12 août 2026",
    folder: "Formations",
    src: "/flutter.png",
  },
  {
    id: 2,
    name: "campagne-rentree.jpg",
    type: "image",
    size: "2,4 Mo",
    date: "10 août 2026",
    folder: "Campagnes",
    src: "/flutter.png",
  },
  {
    id: 3,
    name: "presentation-presta.mp4",
    type: "image",
    size: "14,6 Mo",
    date: "8 août 2026",
    folder: "Documents",
    src: "/presta.png",
  },
  {
    id: 4,
    name: "logo-presta.png",
    type: "image",
    size: "420 Ko",
    date: "5 août 2026",
    folder: "Branding",
    src: "/presta.png",
  },
  {
    id: 5,
    name: "brochure-formation.pdf",
    type: "image",
    size: "3,2 Mo",
    date: "2 août 2026",
    folder: "Documents",
    src: "/flutter.png",
  },
  {
    id: 6,
    name: "publication-flutter.jpg",
    type: "image",
    size: "1,2 Mo",
    date: "30 juillet 2026",
    folder: "Publications",
    src: "/flutter.png",
  },
  {
    id: 7,
    name: "temoignage-client.mp4",
    type: "image",
    size: "22,1 Mo",
    date: "28 juillet 2026",
    folder: "Documents",
    src: "/flutter.png",
  },
  {
    id: 8,
    name: "flyer-formation.png",
    type: "image",
    size: "890 Ko",
    date: "25 juillet 2026",
    folder: "Formations",
    src: "/flutter.png",
  },
];

const folders = [
  {
    name: "Tous les médias",
    count: 24,
    icon: FolderOpen,
  },
  {
    name: "Publications",
    count: 8,
    icon: Folder,
  },
  {
    name: "Campagnes",
    count: 5,
    icon: Folder,
  },
  {
    name: "Formations",
    count: 6,
    icon: Folder,
  },
  {
    name: "Branding",
    count: 3,
    icon: Folder,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function MediasPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "image" | "video" | "document"
  >("all");
  const [selectedFolder, setSelectedFolder] = useState("Tous les médias");
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const filteredMedias = useMemo(() => {
    return medias.filter((media) => {
      const matchesSearch = media.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        filter === "all" || media.type === filter;

      const matchesFolder =
        selectedFolder === "Tous les médias" ||
        media.folder === selectedFolder;

      return matchesSearch && matchesType && matchesFolder;
    });
  }, [search, filter, selectedFolder]);

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
              <ArrowLeft size={17} />
            </Link>

            <div className="min-w-0">
              <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
                Bibliothèque
              </p>

              <h1 className="truncate text-sm font-black sm:text-base">
                Médias
              </h1>
            </div>

          </div>

          {/* DROITE */}

          <div className="flex items-center gap-2 sm:gap-3">

            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-slate-900"
              aria-label="Notifications"
            >
              <Bell size={18} />

              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">
              Y
            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1700px] p-4 sm:p-6 lg:p-8">

        {/* ===================================================
            TITRE
        =================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-medium text-slate-400">
              Gérez et organisez tous vos fichiers utilisés dans vos contenus.
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Votre bibliothèque média
            </h2>
          </div>

          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
          >
            <Upload size={15} />
            Importer un média
          </button>

        </div>

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <MediaStat
            icon={<ImageIcon size={17} />}
            label="Images"
            value="16"
          />

          <MediaStat
            icon={<Video size={17} />}
            label="Vidéos"
            value="5"
          />

          <MediaStat
            icon={<FileText size={17} />}
            label="Documents"
            value="3"
          />

          <MediaStat
            icon={<Folder size={17} />}
            label="Dossiers"
            value="5"
          />

        </div>

        {/* ===================================================
            LAYOUT
        =================================================== */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">

          {/* =================================================
              DOSSIERS
          ================================================= */}

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="mb-3 flex items-center justify-between">

              <h3 className="text-xs font-black text-slate-800">
                Dossiers
              </h3>

              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-red-600">
                <Plus size={15} />
              </button>

            </div>

            <div className="space-y-1">

              {folders.map((folder) => {
                const Icon = folder.icon;
                const active = selectedFolder === folder.name;

                return (
                  <button
                    key={folder.name}
                    onClick={() => setSelectedFolder(folder.name)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                      active
                        ? "bg-red-50 text-red-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >

                    <Icon size={16} />

                    <span className="min-w-0 flex-1 truncate text-[11px] font-bold">
                      {folder.name}
                    </span>

                    <span
                      className={`text-[9px] font-bold ${
                        active
                          ? "text-red-500"
                          : "text-slate-400"
                      }`}
                    >
                      {folder.count}
                    </span>

                  </button>
                );
              })}

            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">

              <p className="mb-2 px-2 text-[9px] font-black uppercase tracking-wider text-slate-400">
                Type de fichier
              </p>

              <button
                onClick={() => setFilter("image")}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[10px] font-semibold text-slate-500 hover:bg-slate-50"
              >
                <ImageIcon size={14} />
                Images
              </button>

              <button
                onClick={() => setFilter("video")}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[10px] font-semibold text-slate-500 hover:bg-slate-50"
              >
                <Video size={14} />
                Vidéos
              </button>

              <button
                onClick={() => setFilter("document")}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[10px] font-semibold text-slate-500 hover:bg-slate-50"
              >
                <FileText size={14} />
                Documents
              </button>

              <button
                onClick={() => setFilter("all")}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[10px] font-semibold text-red-600 hover:bg-red-50"
              >
                Tous les types
              </button>

            </div>

          </aside>

          {/* =================================================
              BIBLIOTHÈQUE
          ================================================= */}

          <section className="min-w-0">

            {/* TOOLBAR */}

            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">

              <div className="relative min-w-0 flex-1">

                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un média..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-medium outline-none transition focus:border-red-400 focus:bg-white"
                />

              </div>

              <div className="flex items-center gap-2">

                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50">
                  <span>
                    {filter === "all"
                      ? "Tous les fichiers"
                      : filter === "image"
                      ? "Images"
                      : filter === "video"
                      ? "Vidéos"
                      : "Documents"}
                  </span>
                  <ChevronDown size={13} />
                </button>

                <div className="flex rounded-xl border border-slate-200 p-1">

                  <button
                    onClick={() => setView("grid")}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      view === "grid"
                        ? "bg-red-50 text-red-600"
                        : "text-slate-400"
                    }`}
                  >
                    <Grid3X3 size={15} />
                  </button>

                  <button
                    onClick={() => setView("list")}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      view === "list"
                        ? "bg-red-50 text-red-600"
                        : "text-slate-400"
                    }`}
                  >
                    <List size={15} />
                  </button>

                </div>

              </div>

            </div>

            {/* BARRE INFO */}

            <div className="mb-3 flex items-center justify-between">

              <p className="text-[10px] font-semibold text-slate-400">
                {filteredMedias.length} média
                {filteredMedias.length > 1 ? "s" : ""} trouvé
                {filteredMedias.length > 1 ? "s" : ""}
              </p>

              <button className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-red-600">
                Plus récent
                <ChevronDown size={12} />
              </button>

            </div>

            {/* =================================================
                VUE GRILLE
            ================================================= */}

            {view === "grid" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                {filteredMedias.map((media) => (
                  <MediaCard
                    key={media.id}
                    media={media}
                    selected={selectedMedia === media.id}
                    onSelect={() =>
                      setSelectedMedia(
                        selectedMedia === media.id
                          ? null
                          : media.id
                      )
                    }
                  />
                ))}

              </div>
            )}

            {/* =================================================
                VUE LISTE
            ================================================= */}

            {view === "list" && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="hidden grid-cols-[1fr_120px_110px_100px_40px] gap-4 border-b border-slate-100 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400 sm:grid">

                  <span>Nom</span>
                  <span>Type</span>
                  <span>Taille</span>
                  <span>Date</span>
                  <span />

                </div>

                {filteredMedias.map((media) => (
                  <MediaListItem
                    key={media.id}
                    media={media}
                  />
                ))}

              </div>
            )}

            {/* VIDE */}

            {filteredMedias.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Search size={20} />
                </div>

                <h3 className="mt-4 text-sm font-black text-slate-800">
                  Aucun média trouvé
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Essayez une autre recherche ou modifiez vos filtres.
                </p>

              </div>
            )}

          </section>

        </div>

      </main>

      {/* =====================================================
          MODAL IMPORT
      ===================================================== */}

      {showUpload && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowUpload(false)}
        >

          <div
            className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-base font-black text-slate-900">
                  Importer un média
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Ajoutez une image, une vidéo ou un document.
                </p>
              </div>

              <button
                onClick={() => setShowUpload(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>

            </div>

            <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Upload size={21} />
              </div>

              <h3 className="mt-4 text-sm font-black text-slate-800">
                Déposez vos fichiers ici
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                PNG, JPG, WEBP, MP4 ou PDF
              </p>

              <button className="mt-4 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black text-white hover:bg-red-700">
                Choisir un fichier
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   STATISTIQUE
========================================================= */

function MediaStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
        {icon}
      </div>

      <div>
        <p className="text-lg font-black text-slate-900">
          {value}
        </p>

        <p className="text-[9px] font-semibold text-slate-400">
          {label}
        </p>
      </div>

    </div>
  );
}

/* =========================================================
   MEDIA CARD
========================================================= */

function MediaCard({
  media,
  selected,
  onSelect,
}: {
  media: Media;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        selected
          ? "border-red-500 ring-2 ring-red-500/10"
          : "border-slate-200"
      }`}
    >

      {/* PREVIEW */}

      <div
        onClick={onSelect}
        className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-slate-100"
      >

        {media.type === "image" && media.src ? (
          <img
            src={media.src}
            alt={media.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm">
              {media.type === "video" ? (
                <Video size={25} />
              ) : (
                <FileText size={25} />
              )}
            </div>

          </div>
        )}

        <div className="absolute left-3 top-3 rounded-lg bg-black/50 px-2 py-1 text-[8px] font-bold text-white backdrop-blur">
          {media.type === "image"
            ? "IMAGE"
            : media.type === "video"
            ? "VIDÉO"
            : "DOCUMENT"}
        </div>

        {selected && (
          <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
            <Check size={13} />
          </div>
        )}

      </div>

      {/* INFOS */}

      <div className="p-3">

        <div className="flex items-start gap-2">

          <div className="min-w-0 flex-1">

            <p className="truncate text-[11px] font-black text-slate-800">
              {media.name}
            </p>

            <p className="mt-1 text-[9px] text-slate-400">
              {media.folder} · {media.size}
            </p>

          </div>

          <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-900">
            <MoreHorizontal size={15} />
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   LIST ITEM
========================================================= */

function MediaListItem({
  media,
}: {
  media: Media;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-slate-100 px-4 py-3 last:border-0 sm:grid-cols-[1fr_120px_110px_100px_40px] sm:items-center sm:gap-4">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">

          {media.type === "image" && media.src ? (
            <img
              src={media.src}
              alt={media.name}
              className="h-full w-full object-cover"
            />
          ) : media.type === "video" ? (
            <Video size={17} className="text-red-500" />
          ) : (
            <FileText size={17} className="text-red-500" />
          )}

        </div>

        <div className="min-w-0">

          <p className="truncate text-[11px] font-black text-slate-800">
            {media.name}
          </p>

          <p className="text-[9px] text-slate-400">
            {media.folder}
          </p>

        </div>

      </div>

      <span className="text-[10px] font-semibold text-slate-500">
        {media.type === "image"
          ? "Image"
          : media.type === "video"
          ? "Vidéo"
          : "Document"}
      </span>

      <span className="text-[10px] text-slate-500">
        {media.size}
      </span>

      <span className="text-[10px] text-slate-500">
        {media.date}
      </span>

      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-900">
        <MoreHorizontal size={15} />
      </button>

    </div>
  );
}