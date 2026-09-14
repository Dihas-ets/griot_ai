"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Archive,
  ArchiveRestore,
  Trash2,
  Heart,
  Image as ImageIcon,
  X,
  Upload,
  FileText,
  Music2,
  Globe2,
  CheckCircle2,
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
  image: string | null;
  color: string;
  favorite: boolean;
  archived: boolean;
  content: string;
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
   CONSTANTES
========================================================= */

const STORAGE_KEY = "griot_templates";

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

const platforms = [
  "Tous les réseaux",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "TikTok",
  "X",
];

/* =========================================================
   MODÈLES PAR DÉFAUT
========================================================= */

const defaultTemplates: Template[] = [
  {
    id: 1,
    title: "Promotion de formation",
    description:
      "Un modèle idéal pour promouvoir une formation, un atelier ou une session d'apprentissage.",
    category: "Formation",
    platform: "Tous les réseaux",
    image: "/flutter.png",
    color: "bg-red-dark",
    favorite: true,
    archived: false,
    content: `🚀 Nouvelle formation !

Vous souhaitez développer de nouvelles compétences ?

Découvrez notre formation [NOM_FORMATION].

📅 Début : [DATE]
📍 Lieu : [LIEU]

👉 Inscrivez-vous dès maintenant !

#Formation #Apprentissage #Compétences`,
  },

  {
    id: 2,
    title: "Annonce produit",
    description:
      "Présentez un nouveau produit avec un texte simple et orienté conversion.",
    category: "Promotion",
    platform: "Instagram",
    image: "/presta.png",
    color: "bg-pink-600",
    favorite: false,
    archived: false,
    content: `✨ Découvrez notre nouveauté !

Nous sommes heureux de vous présenter [NOM_PRODUIT].

🔥 Profitez de cette offre exceptionnelle :
[PRIX]

👉 Commandez maintenant :
[LIEN]

#Nouveauté #Produit #Offre`,
  },

  {
    id: 3,
    title: "Conseil professionnel",
    description:
      "Partagez un conseil utile avec votre communauté et développez votre expertise.",
    category: "Éducatif",
    platform: "LinkedIn",
    image: "/dihas.png",
    color: "bg-blue-600",
    favorite: true,
    archived: false,
    content: `💡 Conseil professionnel

Vous cherchez à améliorer vos résultats ?

Voici un conseil simple :

[CONSEIL]

N'hésitez pas à partager votre expérience dans les commentaires.

#Conseil #Professionnel #Business`,
  },

  {
    id: 4,
    title: "Publication événement",
    description:
      "Annoncez un événement, une conférence, un atelier ou une rencontre.",
    category: "Événement",
    platform: "Facebook",
    image: "/livro.png",
    color: "bg-indigo-600",
    favorite: false,
    archived: false,
    content: `📅 Rendez-vous à ne pas manquer !

Nous vous donnons rendez-vous pour [NOM_EVENEMENT].

📅 Date : [DATE]
⏰ Heure : [HEURE]
📍 Lieu : [LIEU]

👉 Réservez votre place dès maintenant !

#Événement #RendezVous #Communauté`,
  },

  {
    id: 5,
    title: "Publication avec visuel",
    description:
      "Un modèle conçu pour accompagner une belle image avec un message court.",
    category: "Visuel",
    platform: "Instagram",
    image: "/aif.png",
    color: "bg-purple-600",
    favorite: false,
    archived: false,
    content: `✨ Une nouvelle étape commence !

Découvrez notre actualité et partagez-la avec votre communauté.

👉 Plus d'informations :
[LIEN]

#Actualité #Inspiration #Communauté`,
  },

  {
    id: 6,
    title: "Présentation de service",
    description:
      "Présentez clairement un service et expliquez sa valeur pour vos clients.",
    category: "Service",
    platform: "Tous les réseaux",
    image: "/presta.png",
    color: "bg-emerald-600",
    favorite: false,
    archived: false,
    content: `🚀 Découvrez notre service !

Vous recherchez une solution adaptée à vos besoins ?

Nous vous accompagnons avec [NOM_SERVICE].

✅ [AVANTAGE_1]
✅ [AVANTAGE_2]
✅ [AVANTAGE_3]

📞 Contact : [TELEPHONE]

#Service #Entreprise #Solution`,
  },

  {
    id: 7,
    title: "Offre spéciale",
    description:
      "Mettez en avant une réduction, une promotion ou une offre limitée.",
    category: "Promotion",
    platform: "Tous les réseaux",
    image: "/flutter.png",
    color: "bg-orange-500",
    favorite: false,
    archived: false,
    content: `🔥 Offre spéciale !

Profitez de notre offre exceptionnelle.

🎁 Offre : [OFFRE]
💰 Prix : [PRIX]
⏳ Valable jusqu'au : [DATE]

👉 Profitez-en maintenant !

#Promotion #Offre #BonPlan`,
  },

  {
    id: 8,
    title: "Actualité entreprise",
    description:
      "Partagez une actualité importante de votre entreprise.",
    category: "Entreprise",
    platform: "LinkedIn",
    image: "/dihas.png",
    color: "bg-slate-700",
    favorite: false,
    archived: false,
    content: `📢 Actualité de notre entreprise

Nous sommes heureux de partager avec vous cette nouvelle :

[ACTUALITE]

Merci à notre communauté pour sa confiance.

#Entreprise #Actualité #Business`,
  },
];

/* =========================================================
   ICÔNE PLATEFORME
========================================================= */
function PlatformIcon({
  platform,
  size = 15,
}: {
  platform: string;
  size?: number;
}) {
  switch (platform) {
    case "Instagram":
      return <InstagramIcon size={size} />;

    case "Facebook":
      return <FacebookIcon size={size} />;

    case "LinkedIn":
      return <LinkedinIcon size={size} />;

    case "TikTok":
      return <Music2 size={size} />;

    case "X":
      return <XIcon size={size} />;

    default:
      return <Globe2 size={size} />;
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function ModelesPage() {
  const [templates, setTemplates] =
    useState<Template[]>(defaultTemplates);

  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("Tous");

  const [platform, setPlatform] =
    useState("Tous les réseaux");

  const [showArchived, setShowArchived] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  const [formTitle, setFormTitle] =
    useState("");

  const [formDescription, setFormDescription] =
    useState("");

  const [formCategory, setFormCategory] =
    useState("Promotion");

  const [formPlatform, setFormPlatform] =
    useState("Tous les réseaux");

  const [formImage, setFormImage] =
    useState<string | null>(null);

  const [formContent, setFormContent] =
    useState("");

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  /* =======================================================
     CHARGER LES MODÈLES
  ======================================================= */

  useEffect(() => {
    try {
      const saved =
        window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setTemplates(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Impossible de charger les modèles :",
        error
      );
    }

    setLoaded(true);
  }, []);

  /* =======================================================
     SAUVEGARDER LES MODÈLES
  ======================================================= */

  useEffect(() => {
    if (!loaded) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(templates)
      );
    } catch (error) {
      console.error(
        "Impossible de sauvegarder les modèles :",
        error
      );
    }
  }, [templates, loaded]);

  /* =======================================================
     FILTRAGE
  ======================================================= */

  const filteredTemplates =
    templates.filter((template) => {
      const matchesSearch =
        template.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        template.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        template.content
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "Tous" ||
        template.category === category;

      const matchesPlatform =
        platform === "Tous les réseaux" ||
        template.platform === platform;

      const matchesArchive =
        showArchived
          ? template.archived
          : !template.archived;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPlatform &&
        matchesArchive
      );
    });

  /* =======================================================
     STATS
  ======================================================= */

  const activeTemplates =
    templates.filter(
      (template) => !template.archived
    );

  const archivedTemplates =
    templates.filter(
      (template) => template.archived
    );

  const favoriteTemplates =
    activeTemplates.filter(
      (template) => template.favorite
    );

  /* =======================================================
     OUVRIR CRÉATION
  ======================================================= */

  const openCreateModal = () => {
    setEditingId(null);
    setFormTitle("");
    setFormDescription("");
    setFormCategory("Promotion");
    setFormPlatform("Tous les réseaux");
    setFormImage(null);
    setFormContent("");
    setShowModal(true);
  };

  /* =======================================================
     OUVRIR MODIFICATION
  ======================================================= */

  const openEditModal = (
    template: Template
  ) => {
    setEditingId(template.id);
    setFormTitle(template.title);
    setFormDescription(template.description);
    setFormCategory(template.category);
    setFormPlatform(template.platform);
    setFormImage(template.image);
    setFormContent(template.content);
    setShowModal(true);
    setOpenMenuId(null);
  };

  /* =======================================================
     IMAGE
  ======================================================= */

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "L'image ne doit pas dépasser 5 Mo."
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setFormImage(
        reader.result as string
      );
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  /* =======================================================
     SAUVEGARDER
  ======================================================= */

  const saveTemplate = () => {
    if (!formTitle.trim()) {
      alert(
        "Veuillez renseigner le nom du modèle."
      );
      return;
    }

    if (!formContent.trim()) {
      alert(
        "Veuillez renseigner le contenu du modèle."
      );
      return;
    }

    if (editingId !== null) {
      setTemplates((current) =>
        current.map((template) =>
          template.id === editingId
            ? {
                ...template,
                title:
                  formTitle.trim(),
                description:
                  formDescription.trim(),
                category:
                  formCategory,
                platform:
                  formPlatform,
                image:
                  formImage,
                content:
                  formContent,
              }
            : template
        )
      );
    } else {
      const newTemplate: Template = {
        id: Date.now(),
        title: formTitle.trim(),
        description:
          formDescription.trim(),
        category: formCategory,
        platform: formPlatform,
        image: formImage,
        color: "bg-red-dark",
        favorite: false,
        archived: false,
        content: formContent,
      };

      setTemplates((current) => [
        newTemplate,
        ...current,
      ]);
    }

    setShowModal(false);
  };

  /* =======================================================
     FAVORI
  ======================================================= */

  const toggleFavorite = (
    id: number
  ) => {
    setTemplates((current) =>
      current.map((template) =>
        template.id === id
          ? {
              ...template,
              favorite:
                !template.favorite,
            }
          : template
      )
    );
  };

  /* =======================================================
     ARCHIVER
  ======================================================= */

  const archiveTemplate = (
    id: number
  ) => {
    const template =
      templates.find(
        (item) => item.id === id
      );

    if (!template) return;

    const confirmed =
      window.confirm(
        `Voulez-vous archiver le modèle "${template.title}" ?`
      );

    if (!confirmed) return;

    setTemplates((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              archived: true,
            }
          : item
      )
    );

    setOpenMenuId(null);
  };

  /* =======================================================
     RESTAURER
  ======================================================= */

  const restoreTemplate = (
    id: number
  ) => {
    setTemplates((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              archived: false,
            }
          : item
      )
    );

    setOpenMenuId(null);
  };

  /* =======================================================
     SUPPRIMER
  ======================================================= */

  const deleteTemplate = (
    id: number
  ) => {
    const template =
      templates.find(
        (item) => item.id === id
      );

    if (!template) return;

    const confirmed =
      window.confirm(
        `Supprimer définitivement "${template.title}" ?`
      );

    if (!confirmed) return;

    setTemplates((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">

        <div className="mx-auto flex min-h-[72px] w-full max-w-[1800px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          <div className="min-w-0 pl-12 lg:pl-0">

            <p className="mb-1 hidden text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 md:block">
              Bibliothèque
            </p>

            <h1 className="truncate text-[16px] font-extrabold tracking-tight text-slate-900 sm:text-[19px]">
              Modèles
            </h1>

          </div>

          <button
            onClick={openCreateModal}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-red-dark px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-red-dark/90"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">
              Nouveau modèle
            </span>
          </button>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ===================================================
            INTRO
        =================================================== */}

        <div className="mb-6">

          <p className="max-w-2xl text-[11px] leading-relaxed text-slate-400 sm:text-xs">
            Créez, organisez et réutilisez vos modèles de
            publications pour gagner du temps lors de la
            création de contenu.
          </p>

        </div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">

            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Modèles actifs
            </p>

            <p className="mt-2 text-2xl font-black text-slate-800">
              {activeTemplates.length}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">

            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Favoris
            </p>

            <p className="mt-2 text-2xl font-black text-slate-800">
              {favoriteTemplates.length}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">

            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Utilisations
            </p>

            <p className="mt-2 text-2xl font-black text-slate-800">
              24
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">

            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Archives
            </p>

            <p className="mt-2 text-2xl font-black text-slate-800">
              {archivedTemplates.length}
            </p>

          </div>

        </div>

        {/* ===================================================
            FILTRES
        =================================================== */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

            <div className="relative w-full xl:max-w-[360px]">

              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Rechercher un modèle..."
                className="w-full rounded-xl border border-slate-200 bg-[#fafbfc] py-2.5 pl-9 pr-3 text-[10px] font-medium outline-none transition focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-dark/10"
              />

            </div>

            <div className="flex flex-wrap gap-2">

              {categories.map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setCategory(item)
                    }
                    className={`rounded-lg px-3 py-2 text-[9px] font-bold transition ${
                      category === item
                        ? "bg-red-dark text-white"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>

          <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex flex-wrap gap-2">

              {platforms.map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setPlatform(item)
                    }
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[9px] font-bold transition ${
                      platform === item
                        ? "bg-slate-800 text-white"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <PlatformIcon
                      platform={item}
                      size={13}
                    />
                    {item}
                  </button>
                )
              )}

            </div>

            <button
              onClick={() =>
                setShowArchived(
                  (current) => !current
                )
              }
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-[9px] font-bold transition ${
                showArchived
                  ? "bg-red-50 text-red-dark"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {showArchived ? (
                <ArchiveRestore size={13} />
              ) : (
                <Archive size={13} />
              )}

              {showArchived
                ? "Voir les actifs"
                : "Voir les archives"}
            </button>

          </div>

        </div>

        {/* ===================================================
            LISTE
        =================================================== */}

        {filteredTemplates.length === 0 ? (

          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FileText size={24} />
            </div>

            <h2 className="mt-4 text-sm font-black text-slate-700">
              Aucun modèle trouvé
            </h2>

            <p className="mt-1 max-w-md text-[10px] leading-relaxed text-slate-400">
              Aucun modèle ne correspond à vos filtres
              actuels.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            {filteredTemplates.map(
              (template) => (

                <article
                  key={template.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:shadow-lg"
                >

                  {/* IMAGE */}

                  <div className="relative h-[180px] overflow-hidden bg-slate-100">

                    {template.image ? (

                      <img
                        src={template.image}
                        alt={template.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />

                    ) : (

                      <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
                        <ImageIcon size={36} />
                      </div>

                    )}

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">

                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[8px] font-black text-slate-600 shadow-sm backdrop-blur">
                        {template.category}
                      </span>

                      <button
                        onClick={() =>
                          toggleFavorite(
                            template.id
                          )
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition ${
                          template.favorite
                            ? "text-red-500"
                            : "text-slate-400 hover:text-red-500"
                        }`}
                        aria-label="Favori"
                      >
                        <Heart
                          size={15}
                          fill={
                            template.favorite
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                    </div>

                    <div className="absolute bottom-3 left-3">

                      <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[8px] font-bold text-slate-600 shadow-sm">
                        <PlatformIcon
                          platform={
                            template.platform
                          }
                          size={12}
                        />
                        {template.platform}
                      </span>

                    </div>

                  </div>

                  {/* CONTENU */}

                  <div className="p-4">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <h2 className="truncate text-[13px] font-black text-slate-800">
                          {template.title}
                        </h2>

                        <p className="mt-1 line-clamp-2 text-[9px] leading-relaxed text-slate-400">
                          {template.description}
                        </p>

                      </div>

                      <div className="relative shrink-0">

                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId ===
                                template.id
                                ? null
                                : template.id
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreHorizontal
                            size={16}
                          />
                        </button>

                        {openMenuId ===
                          template.id && (

                          <div className="absolute right-0 top-8 z-40 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-2xl">

                            <button
                              onClick={() =>
                                openEditModal(
                                  template
                                )
                              }
                              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[9px] font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <Pencil
                                size={13}
                              />
                              Modifier
                            </button>

                            {template.archived ? (

                              <button
                                onClick={() =>
                                  restoreTemplate(
                                    template.id
                                  )
                                }
                                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[9px] font-semibold text-emerald-600 transition hover:bg-emerald-50"
                              >
                                <ArchiveRestore
                                  size={13}
                                />
                                Restaurer
                              </button>

                            ) : (

                              <button
                                onClick={() =>
                                  archiveTemplate(
                                    template.id
                                  )
                                }
                                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[9px] font-semibold text-orange-600 transition hover:bg-orange-50"
                              >
                                <Archive
                                  size={13}
                                />
                                Archiver
                              </button>

                            )}

                            <button
                              onClick={() =>
                                deleteTemplate(
                                  template.id
                                )
                              }
                              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[9px] font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2
                                size={13}
                              />
                              Supprimer
                            </button>

                          </div>

                        )}

                      </div>

                    </div>

                    {/* APERÇU CONTENU */}

                    <div className="mt-4 rounded-xl bg-slate-50 p-3">

                      <p className="line-clamp-4 whitespace-pre-line text-[9px] leading-[1.6] text-slate-500">
                        {template.content}
                      </p>

                    </div>

                    {/* ACTION */}

                    <Link
                      href={`/dashboard/publication?template=${template.id}`}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-dark py-2.5 text-[9px] font-black uppercase tracking-wide text-white transition hover:bg-red-dark/90"
                    >
                      Utiliser ce modèle
                    </Link>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </main>

      {/* =====================================================
          MODAL CRÉATION / MODIFICATION
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">

          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">

              <div>

                <h2 className="text-sm font-black text-slate-800">
                  {editingId !== null
                    ? "Modifier le modèle"
                    : "Créer un modèle"}
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  Créez un modèle réutilisable pour vos
                  publications.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>

            </div>

            {/* FORMULAIRE */}

            <div className="space-y-5 p-5">

              {/* NOM */}

              <div>

                <label className="mb-2 block text-[9px] font-black uppercase tracking-wider text-slate-500">
                  Nom du modèle *
                </label>

                <input
                  value={formTitle}
                  onChange={(e) =>
                    setFormTitle(
                      e.target.value
                    )
                  }
                  placeholder="Ex : Promotion de formation"
                  className="w-full rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[10px] font-medium outline-none focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-dark/10"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-[9px] font-black uppercase tracking-wider text-slate-500">
                  Description
                </label>

                <textarea
                  value={formDescription}
                  onChange={(e) =>
                    setFormDescription(
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Décrivez l'utilisation de ce modèle..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[10px] leading-relaxed outline-none focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-dark/10"
                />

              </div>

              {/* CATEGORIE / RESEAU */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-[9px] font-black uppercase tracking-wider text-slate-500">
                    Catégorie
                  </label>

                  <select
                    value={formCategory}
                    onChange={(e) =>
                      setFormCategory(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[10px] font-semibold outline-none focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-dark/10"
                  >
                    {categories
                      .filter(
                        (item) =>
                          item !== "Tous"
                      )
                      .map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-[9px] font-black uppercase tracking-wider text-slate-500">
                    Réseau conseillé
                  </label>

                  <select
                    value={formPlatform}
                    onChange={(e) =>
                      setFormPlatform(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[10px] font-semibold outline-none focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-dark/10"
                  >
                    {platforms.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </div>

              {/* IMAGE */}

              <div>

                <label className="mb-2 block text-[9px] font-black uppercase tracking-wider text-slate-500">
                  Image du modèle
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={
                    handleImageChange
                  }
                />

                {formImage ? (

                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                    <img
                      src={formImage}
                      alt="Aperçu du modèle"
                      className="h-48 w-full object-cover"
                    />

                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">

                      <button
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-[9px] font-black text-slate-700 shadow-lg"
                      >
                        <Upload size={13} />
                        Remplacer
                      </button>

                      <button
                        onClick={() =>
                          setFormImage(null)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-red-600 shadow-lg"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </div>

                ) : (

                  <button
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center transition hover:border-red-dark hover:bg-red-50/30"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                      <Upload size={19} />
                    </div>

                    <p className="mt-3 text-[10px] font-black text-slate-700">
                      Ajouter une image
                    </p>

                    <p className="mt-1 text-[8px] text-slate-400">
                      PNG, JPG ou WEBP · 5 Mo maximum
                    </p>

                  </button>

                )}

              </div>

              {/* CONTENU */}

              <div>

                <label className="mb-2 block text-[9px] font-black uppercase tracking-wider text-slate-500">
                  Contenu du modèle *
                </label>

                <textarea
                  value={formContent}
                  onChange={(e) =>
                    setFormContent(
                      e.target.value
                    )
                  }
                  rows={10}
                  placeholder="Écrivez le contenu de votre modèle..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[10px] leading-[1.7] outline-none focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-dark/10"
                />

                <p className="mt-2 text-[8px] leading-relaxed text-slate-400">
                  Vous pouvez utiliser des variables comme
                  {" "}
                  <strong>
                    [DATE]
                  </strong>
                  ,{" "}
                  <strong>
                    [LIEU]
                  </strong>
                  ,{" "}
                  <strong>
                    [PRIX]
                  </strong>
                  ,{" "}
                  <strong>
                    [LIEN]
                  </strong>
                  {" "}ou{" "}
                  <strong>
                    [TELEPHONE]
                  </strong>
                  .
                </p>

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:justify-end">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[9px] font-bold text-slate-600 hover:bg-slate-50"
              >
                Annuler
              </button>

              <button
                onClick={saveTemplate}
                className="rounded-xl bg-red-dark px-5 py-2.5 text-[9px] font-black text-white hover:bg-red-dark/90"
              >
                {editingId !== null
                  ? "Enregistrer les modifications"
                  : "Créer le modèle"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}