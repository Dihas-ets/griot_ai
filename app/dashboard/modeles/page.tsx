"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Plus,
  MoreHorizontal,
  Heart,
  Copy,
  Edit3,
  Trash2,
  Layout,
  Megaphone,
  CalendarDays,
  Image as ImageIcon,
  FileText,
  Sparkles,
  ChevronDown,
  Star,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Template = {
  id: number;
  title: string;
  description: string;
  category: string;
  platform: string;
  image: string;
  color: string;
  icon: React.ReactNode;
  favorite: boolean;
};

/* =========================================================
   MODÈLES
========================================================= */

const initialTemplates: Template[] = [
  {
    id: 1,
    title: "Promotion de formation",
    description:
      "Présentez une nouvelle formation avec une accroche claire et un appel à l'action.",
    category: "Formation",
    platform: "Tous les réseaux",
    image: "/flutter.png",
    color: "bg-red-50 text-red-600",
    icon: <Megaphone size={16} />,
    favorite: true,
  },
  {
    id: 2,
    title: "Annonce produit",
    description:
      "Mettez en avant un nouveau produit ou service auprès de votre audience.",
    category: "Promotion",
    platform: "Instagram",
    image: "/presta.png",
    color: "bg-pink-50 text-pink-600",
    icon: <Sparkles size={16} />,
    favorite: false,
  },
  {
    id: 3,
    title: "Conseil professionnel",
    description:
      "Partagez une astuce utile pour informer et engager votre communauté.",
    category: "Éducatif",
    platform: "LinkedIn",
    image: "/dihas.png",
    color: "bg-blue-50 text-blue-600",
    icon: <FileText size={16} />,
    favorite: true,
  },
  {
    id: 4,
    title: "Publication événement",
    description:
      "Annoncez un événement, une conférence ou une activité à venir.",
    category: "Événement",
    platform: "Facebook",
    image: "/livro.png",
    color: "bg-violet-50 text-violet-600",
    icon: <CalendarDays size={16} />,
    favorite: false,
  },
  {
    id: 5,
    title: "Publication avec visuel",
    description:
      "Créez une publication courte accompagnée d'une image attractive.",
    category: "Visuel",
    platform: "Instagram",
    image: "/aif.png",
    color: "bg-orange-50 text-orange-600",
    icon: <ImageIcon size={16} />,
    favorite: false,
  },
  {
    id: 6,
    title: "Présentation de service",
    description:
      "Expliquez simplement votre service et présentez ses principaux avantages.",
    category: "Service",
    platform: "Tous les réseaux",
    image: "/presta.png",
    color: "bg-emerald-50 text-emerald-600",
    icon: <Layout size={16} />,
    favorite: false,
  },
  {
    id: 7,
    title: "Offre spéciale",
    description:
      "Attirez l'attention avec une offre limitée et un appel à l'action.",
    category: "Promotion",
    platform: "Tous les réseaux",
    image: "/flutter.png",
    color: "bg-red-50 text-red-600",
    icon: <Star size={16} />,
    favorite: true,
  },
  {
    id: 8,
    title: "Actualité entreprise",
    description:
      "Partagez une actualité importante concernant votre entreprise.",
    category: "Entreprise",
    platform: "LinkedIn",
    image: "/dihas.png",
    color: "bg-slate-100 text-slate-700",
    icon: <FileText size={16} />,
    favorite: false,
  },
];

/* =========================================================
   CATÉGORIES
========================================================= */

const categories = [
  "Tous",
  "Promotion",
  "Formation",
  "Éducatif",
  "Événement",
  "Visuel",
  "Service",
  "Entreprise",
];

/* =========================================================
   PAGE
========================================================= */

export default function ModelesPage() {
  const [templates, setTemplates] =
    useState<Template[]>(initialTemplates);

  const [activeCategory, setActiveCategory] =
    useState("Tous");

  const [search, setSearch] = useState("");

  const [showMenu, setShowMenu] =
    useState<number | null>(null);

  /* =======================================================
     FILTRAGE
  ======================================================= */

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      activeCategory === "Tous" ||
      template.category === activeCategory;

    const matchesSearch =
      template.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      template.description
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  /* =======================================================
     FAVORIS
  ======================================================= */

  const toggleFavorite = (id: number) => {
    setTemplates((current) =>
      current.map((template) =>
        template.id === id
          ? {
              ...template,
              favorite: !template.favorite,
            }
          : template
      )
    );
  };

  /* =======================================================
     SUPPRESSION
  ======================================================= */

  const deleteTemplate = (id: number) => {
    setTemplates((current) =>
      current.filter((template) => template.id !== id)
    );

    setShowMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* GAUCHE */}

          <div className="min-w-0 pl-14 md:pl-12 lg:pl-0">

            <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
              Bibliothèque
            </p>

            <h1 className="truncate text-base font-black text-slate-900 sm:text-lg">
              Modèles
            </h1>

          </div>

          {/* DROITE */}

          <div className="flex items-center gap-2">

            <Link
              href="/dashboard/publication"
              className="flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 sm:px-4"
            >
              <Plus size={15} />

              <span className="hidden sm:block">
                Créer une publication
              </span>

              <span className="sm:hidden">
                Créer
              </span>
            </Link>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1700px] p-4 sm:p-6 lg:p-8">

        {/* INTRODUCTION */}

        <div className="mb-6">

          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Gagnez du temps avec vos modèles
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
            Retrouvez vos modèles de contenu et créez rapidement
            des publications adaptées à votre stratégie.
          </p>

        </div>

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={<Layout size={17} />}
            label="Total des modèles"
            value={templates.length}
          />

          <StatCard
            icon={<Heart size={17} />}
            label="Mes favoris"
            value={
              templates.filter(
                (template) => template.favorite
              ).length
            }
          />

          <StatCard
            icon={<Sparkles size={17} />}
            label="Modèles utilisés"
            value="24"
          />

          <StatCard
            icon={<Copy size={17} />}
            label="Créés par vous"
            value="8"
          />

        </div>

        {/* ===================================================
            RECHERCHE + TRI
        =================================================== */}

        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">

            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Rechercher un modèle..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs font-medium outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
            />

          </div>

          <button className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 lg:w-44">

            <span>
              Plus récents
            </span>

            <ChevronDown size={14} />

          </button>

        </div>

        {/* ===================================================
            CATÉGORIES
        =================================================== */}

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setActiveCategory(category)
              }
              className={`shrink-0 rounded-xl px-4 py-2.5 text-[10px] font-bold transition ${
                activeCategory === category
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {/* ===================================================
            EN-TÊTE RÉSULTATS
        =================================================== */}

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h3 className="text-sm font-black text-slate-800">
              {activeCategory === "Tous"
                ? "Tous les modèles"
                : activeCategory}
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-400">
              {filteredTemplates.length} modèle
              {filteredTemplates.length > 1 ? "s" : ""} disponible
              {filteredTemplates.length > 1 ? "s" : ""}
            </p>

          </div>

          <button className="hidden items-center gap-2 text-[10px] font-bold text-slate-500 sm:flex">
            <Heart size={13} />
            Mes favoris
          </button>

        </div>

        {/* ===================================================
            GRILLE
        =================================================== */}

        {filteredTemplates.length > 0 ? (

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            {filteredTemplates.map((template) => (

              <TemplateCard
                key={template.id}
                template={template}
                menuOpen={showMenu === template.id}
                onMenu={() =>
                  setShowMenu(
                    showMenu === template.id
                      ? null
                      : template.id
                  )
                }
                onFavorite={() =>
                  toggleFavorite(template.id)
                }
                onDelete={() =>
                  deleteTemplate(template.id)
                }
              />

            ))}

          </div>

        ) : (

          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Search size={23} />
            </div>

            <h3 className="mt-4 text-sm font-black text-slate-800">
              Aucun modèle trouvé
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-400">
              Aucun modèle ne correspond à votre recherche.
              Essayez un autre mot-clé ou une autre catégorie.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("Tous");
              }}
              className="mt-5 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black text-white"
            >
              Réinitialiser les filtres
            </button>

          </div>

        )}

        {/* ===================================================
            CRÉER SON MODÈLE
        =================================================== */}

        <section className="mt-8 overflow-hidden rounded-2xl bg-slate-900">

          <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-xl">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white">
                <Plus size={18} />
              </div>

              <h3 className="text-lg font-black text-white">
                Créez votre propre modèle
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Enregistrez vos structures de publications préférées
                pour les réutiliser rapidement lors de vos prochaines
                campagnes.
              </p>

            </div>

            <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[10px] font-black uppercase tracking-wide text-slate-900 transition hover:bg-slate-100">

              <Plus size={15} />

              Nouveau modèle

            </button>

          </div>

        </section>

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
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-600">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-[9px] font-semibold text-slate-400 sm:text-[10px]">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   TEMPLATE CARD
========================================================= */

function TemplateCard({
  template,
  menuOpen,
  onMenu,
  onFavorite,
  onDelete,
}: {
  template: Template;
  menuOpen: boolean;
  onMenu: () => void;
  onFavorite: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">

        <Image
          src={template.image}
          alt={template.title}
          fill
          priority={template.id <= 4}
          sizes="
            (max-width: 639px) 100vw,
            (max-width: 1279px) 50vw,
            (max-width: 1535px) 33vw,
            25vw
          "
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

        {/* FAVORI */}

        <button
          onClick={onFavorite}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-400 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-red-500"
          aria-label={
            template.favorite
              ? "Retirer des favoris"
              : "Ajouter aux favoris"
          }
        >
          <Heart
            size={15}
            className={
              template.favorite
                ? "fill-red-500 text-red-500"
                : ""
            }
          />
        </button>

        {/* CATÉGORIE */}

        <span
          className={`absolute bottom-3 left-3 rounded-lg px-2.5 py-1.5 text-[8px] font-black shadow-md ${template.color}`}
        >
          {template.category}
        </span>

      </div>

      {/* =================================================
          CONTENU
      ================================================= */}

      <div className="p-4">

        <div className="flex items-start justify-between gap-3">

          {/* TITRE */}

          <div className="min-w-0 flex-1">

            <h3 className="truncate text-sm font-black text-slate-800">
              {template.title}
            </h3>

            <p className="mt-1 line-clamp-2 min-h-[30px] text-[10px] leading-relaxed text-slate-400">
              {template.description}
            </p>

          </div>

          {/* MENU */}

          <div className="relative shrink-0">

            <button
              onClick={onMenu}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Options du modèle"
            >
              <MoreHorizontal size={16} />
            </button>

            {menuOpen && (

              <div className="absolute right-0 top-8 z-30 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                <button className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50">

                  <Edit3 size={13} />

                  Modifier

                </button>

                <button className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50">

                  <Copy size={13} />

                  Dupliquer

                </button>

                <button
                  onClick={onDelete}
                  className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2.5 text-left text-[10px] font-semibold text-red-600 transition hover:bg-red-50"
                >

                  <Trash2 size={13} />

                  Supprimer

                </button>

              </div>

            )}

          </div>

        </div>

        {/* =================================================
            INFOS
        ================================================= */}

        <div className="mt-4 flex min-h-[28px] items-center justify-between gap-2">

          <span
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-[8px] font-black ${template.color}`}
          >

            {template.icon}

            <span>
              {template.category}
            </span>

          </span>

          <span className="truncate text-[8px] font-semibold text-slate-400">
            {template.platform}
          </span>

        </div>

        {/* =================================================
            ACTION
        ================================================= */}

        <Link
          href="/dashboard/publication"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-[9px] font-black uppercase tracking-wide text-white shadow-sm shadow-red-600/10 transition hover:bg-red-700"
        >

          <Copy size={13} />

          Utiliser ce modèle

        </Link>

      </div>

    </article>
  );
}