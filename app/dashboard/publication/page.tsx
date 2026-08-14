"use client";

import React, { useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  CalendarDays,
  Clock3,
  Sparkles,
  Image as ImageIcon,
  Check,
  Send,
  Save,
  Settings2,
  MoreHorizontal,
  HelpCircle,
  X,
  Pencil,
  Trash2,
  Upload,
  Heart,
  MessageCircle,
  Share2,
  Repeat2,
  Bookmark,
  ThumbsUp,
  MapPin,
  Play,
  Eye,
  CheckCircle2
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type SocialNetwork = {
  id: string;
  name: string;
  username: string;
  icon: React.ReactNode;
};

type PostContent = {
  text: string;
  image: string | null;
};

/* =========================================================
   ICÔNES RÉSEAUX SOCIAUX
   COULEURS OFFICIELLES
========================================================= */

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill="#1877F2"
      d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.006 10.125 11.927v-8.432H7.078v-3.495h3.047V9.413c0-3.022 1.791-4.693 4.533-4.693 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.956.931-1.956 1.887v2.257h3.328l-.532 3.495h-2.796V24C19.612 23.079 24 18.092 24 12.073z"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="instagramGradient"
        x1="0%"
        y1="100%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="25%" stopColor="#FCAF45" />
        <stop offset="50%" stopColor="#F77737" />
        <stop offset="75%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#833AB4" />
      </linearGradient>
    </defs>

    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      fill="none"
      stroke="url(#instagramGradient)"
      strokeWidth="2"
    />

    <circle
      cx="12"
      cy="12"
      r="4"
      fill="none"
      stroke="url(#instagramGradient)"
      strokeWidth="2"
    />

    <circle
      cx="17.5"
      cy="6.5"
      r="1.2"
      fill="#E1306C"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill="#0A66C2"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 8.99h3.56v11.46H3.56V8.99z"
    />
  </svg>
);

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill="#000000"
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.33V2h-3.63v13.67a2.91 2.91 0 1 1-2-2.76V9.23a6.53 6.53 0 1 0 5.63 6.44V8.41a8.43 8.43 0 0 0 4.93 1.58V6.36a4.84 4.84 0 0 1-1.16-.17z"
    />
  </svg>
);

const GoogleBusinessIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.39z"
    />

    <path
      fill="#34A853"
      d="M12 21.99c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.5A9.75 9.75 0 0 0 12 21.99z"
    />

    <path
      fill="#FBBC05"
      d="M6.54 14.09A5.86 5.86 0 0 1 6.23 12c0-.72.12-1.42.31-2.09V7.41H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.59l3.24-2.5z"
    />

    <path
      fill="#EA4335"
      d="M12 5.88c1.43 0 2.72.49 3.73 1.46l2.79-2.79C16.84 2.98 14.63 2.01 12 2.01a9.75 9.75 0 0 0-8.7 5.4l3.24 2.5C7.31 7.6 9.46 5.88 12 5.88z"
    />
  </svg>
);

/* =========================================================
   RÉSEAUX
========================================================= */

const networks: SocialNetwork[] = [
  {
    id: "facebook",
    name: "Facebook Page",
    username: "Presta Officiel",
    icon: <FacebookIcon />,
  },
  {
    id: "instagram",
    name: "Instagram",
    username: "@presta_officiel",
    icon: <InstagramIcon />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    username: "Presta SARL",
    icon: <LinkedinIcon />,
  },
  {
    id: "tiktok",
    name: "TikTok",
    username: "@presta_officiel",
    icon: <TikTokIcon />,
  },
  {
    id: "google",
    name: "Google Business Profile",
    username: "Presta",
    icon: <GoogleBusinessIcon />,
  },
];

/* =========================================================
   CONTENU PAR DÉFAUT
========================================================= */

const defaultPostText = `🚀 Nouvelle formation Flutter !

Vous êtes débutant et vous voulez créer des applications mobiles modernes ?

Rejoignez notre formation Flutter 100% pratique avec des projets concrets.

📅 Début : 15 juillet 2026

👉 Inscrivez-vous dès maintenant et lancez votre carrière dans le développement mobile !

#Flutter #Formation #Developpement
#Mobile #Presta`;

/* =========================================================
   PAGE
========================================================= */

export default function CreatePublicationPage() {
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([
    "facebook",
    "instagram",
    "linkedin",
    "tiktok",
    "google",
  ]);

  const [showProjectMenu, setShowProjectMenu] = useState(false);

  const [publishMode, setPublishMode] = useState<
    "now" | "schedule" | "draft"
  >("now");

  const [idea, setIdea] = useState(
    "Promouvoir notre nouvelle formation Flutter destinée aux débutants. La formation commence le 15 juillet 2026, 100% pratique avec projets."
  );

  /* =======================================================
     CONTENU INDIVIDUEL DE CHAQUE RÉSEAU
  ======================================================= */

  const [posts, setPosts] = useState<Record<string, PostContent>>({
    facebook: {
      text: defaultPostText,
      image: "/flutter.png",
    },

    instagram: {
      text: defaultPostText,
      image: "/flutter.png",
    },

    linkedin: {
      text: defaultPostText,
      image: "/flutter.png",
    },

    tiktok: {
      text: defaultPostText,
      image: "/flutter.png",
    },

    google: {
      text: defaultPostText,
      image: "/flutter.png",
    },
  });

  const toggleNetwork = (id: string) => {
    setSelectedNetworks((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const updatePostText = (networkId: string, text: string) => {
    setPosts((current) => ({
      ...current,
      [networkId]: {
        ...current[networkId],
        text,
      },
    }));
  };

  const updatePostImage = (networkId: string, image: string | null) => {
    setPosts((current) => ({
      ...current,
      [networkId]: {
        ...current[networkId],
        image,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">

        <div className="mx-auto flex min-h-[72px] w-full max-w-[1800px] items-center px-3 sm:px-5 lg:px-8">

          {/* GAUCHE */}

          <div className="min-w-0 flex-1">

            <div className="min-w-0 pl-14 md:pl-12 lg:pl-0">

              <p className="mb-0.5 hidden text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 md:block">
                Création de contenu
              </p>

              <h1 className="truncate text-[14px] font-extrabold tracking-tight text-slate-900 sm:text-[16px] lg:text-[19px]">
                Créer une publication
              </h1>

            </div>

          </div>

          {/* CENTRE */}

          <div className="flex flex-none items-center justify-center md:flex-1">

            <div className="relative">

            
               <div className="relative">
            <button
              onClick={() => setShowProjectMenu(!showProjectMenu)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold shadow-sm transition hover:bg-slate-50"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-50 text-red-600">
                ✦
              </div>

              <span className="hidden sm:block">
                Presta
              </span>

              <ChevronDown size={14} />
            </button>

            {showProjectMenu && (
              <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Mes projets
                  </p>
                </div>

                {[
                  "Presta",
                  "Diha's Agency",
                  "Fofana Voyage",
                  "Clinico",
                ].map((project, index) => (
                  <button
                    key={project}
                    onClick={() => setShowProjectMenu(false)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-semibold transition hover:bg-slate-50"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100">
                      {index === 0 ? "✦" : "👤"}
                    </span>

                    <span className="flex-1">
                      {project}
                    </span>

                    {index === 0 && (
                      <CheckCircle2
                        size={15}
                        className="text-red-600"
                      />
                    )}
                  </button>
                ))}

                <button className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-3 text-xs font-bold text-red-600 transition hover:bg-red-50">
                  <Plus size={15} />
                  Créer un projet
                </button>
              </div>
            )}
          </div>
  

            </div>

          </div>

          {/* DROITE */}

          <div className="hidden flex-1 items-center justify-end gap-2 md:flex lg:gap-3">

            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700">
              <HelpCircle size={18} />
            </button>

            <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700">

              <Bell size={18} />

              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-black text-white">
                3
              </span>

            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-dark text-xs font-black text-white">
              Y
            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1800px] px-3 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-7">

        <div className="mb-5">

          <p className="text-[11px] font-medium text-slate-400 sm:text-xs">
            Générez, personnalisez et publiez sur vos réseaux sociaux
          </p>

        </div>

        {/* ===================================================
            GRILLE
        =================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)]">

          {/* =================================================
              CONFIGURATION
          ================================================= */}

          <div className="space-y-5">

            {/* CONFIGURATION */}

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)] sm:p-5">

              <SectionTitle
                number="1"
                title="Configurer votre publication"
              />

              {/* IDÉE */}

              <div className="mt-5">

                <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                  Idée / Sujet de votre publication
                  <span className="text-red-500"> *</span>
                </label>

                <div className="relative">

                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    maxLength={10000}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-[#fafbfc] p-3.5 pb-7 text-[11px] font-medium leading-[1.6] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-dark/10"
                  />

                  <span className="absolute bottom-2.5 right-3 text-[9px] font-medium text-slate-500">
                    {idea.length}/10000
                  </span>

                </div>

              </div>

              {/* TON */}

              <div className="mt-4">

                <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                  Ton souhaité
                </label>

                <div className="relative">

                  <select className="w-full appearance-none rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[11px] font-semibold text-slate-700 outline-none transition focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-light/20">

                    <option>Professionnel & motivant</option>
                    <option>Décontracté</option>
                    <option>Inspirant</option>
                    <option>Commercial</option>
                    <option>Éducatif</option>

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

              </div>

              {/* LANGUE */}

              <div className="mt-4">

                <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                  Langue
                </label>

                <div className="relative">

                  <select className="w-full appearance-none rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[11px] font-semibold text-slate-700 outline-none transition focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-light/20">

                    <option>Français</option>
                    <option>English</option>

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

              </div>

            </section>

            {/* =================================================
                RÉSEAUX
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)] sm:p-5">

              <SectionTitle
                number="2"
                title="Choisir les réseaux"
              />

              <p className="mt-1.5 text-[10px] leading-[1.6] text-slate-400">
                Sélectionnez les réseaux sur lesquels vous souhaitez publier
                pour ce projet.
              </p>

              <div className="mt-3 divide-y divide-slate-100">

                {networks.map((network) => {

                  const selected = selectedNetworks.includes(network.id);

                  return (
                    <button
                      key={network.id}
                      onClick={() => toggleNetwork(network.id)}
                      aria-pressed={selected}
                      className="group flex w-full items-center gap-3 py-2.5 text-left transition"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-slate-100">
                        {network.icon}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-[11px] font-bold text-slate-800">
                          {network.name}
                        </p>

                        <p className="truncate text-[9px] text-slate-400">
                          {network.username}
                        </p>

                      </div>

                      <div
                        className={`flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[5px] border transition ${
                          selected
                            ? "border-red-dark bg-red-dark text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >

                        {selected && (
                          <Check size={12} strokeWidth={3} />
                        )}

                      </div>

                    </button>
                  );

                })}

              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-dark py-3 text-[10px] font-black uppercase tracking-[0.06em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-red-dark/90 active:scale-[0.99]">

                <Sparkles size={14} />

                Générer le contenu

              </button>

            </section>

          </div>

          {/* =================================================
              PRÉVISUALISATION
          ================================================= */}

          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]">

            {/* HEADER */}

            <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">

              <div className="flex items-center gap-3">

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-light/10 text-red-dark">

                  <span className="text-[11px] font-black">
                    {selectedNetworks.length}
                  </span>

                </span>

                <div className="min-w-0">

                  <h2 className="truncate text-[13px] font-black text-slate-800 sm:text-sm">
                    Prévisualisation des publications
                  </h2>

                  <p className="mt-0.5 text-[9px] text-slate-400">
                    Aperçu adapté à chaque réseau
                  </p>

                </div>

              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 sm:w-auto">
                Voir tous les aperçus
                <ChevronRight size={13} />
              </button>

            </div>

            {/* TABS */}

            {selectedNetworks.length > 0 && (

              <div className="flex overflow-x-auto border-b border-slate-100 scrollbar-none">

                {selectedNetworks.map((networkId) => {

                  const network = networks.find(
                    (item) => item.id === networkId
                  );

                  if (!network) return null;

                  return (
                    <button
                      key={network.id}
                      className="flex shrink-0 items-center gap-2 border-b-2 border-red-dark px-4 py-3 text-[10px] font-bold text-red-dark sm:px-5"
                    >

                      {network.icon}

                      {network.name.split(" ")[0]}

                    </button>
                  );

                })}

              </div>

            )}

            {/* POSTS */}

            <div className="bg-[#fafbfc] p-3 sm:p-4 lg:p-5">

              {selectedNetworks.length === 0 ? (

                <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 text-center">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <Share2 size={22} />
                  </div>

                  <h3 className="mt-4 text-sm font-black text-slate-700">
                    Aucun réseau sélectionné
                  </h3>

                  <p className="mt-1 max-w-sm text-[10px] leading-relaxed text-slate-400">
                    Sélectionnez au moins un réseau social pour afficher
                    l'aperçu de votre publication.
                  </p>

                </div>

              ) : (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">

                  {selectedNetworks.map((networkId) => {

                    const network = networks.find(
                      (item) => item.id === networkId
                    );

                    if (!network) return null;

                    const post = posts[networkId];

                    return (
                      <NetworkPreview
                        key={networkId}
                        network={network}
                        post={post}
                        onTextChange={(text) =>
                          updatePostText(networkId, text)
                        }
                        onImageChange={(image) =>
                          updatePostImage(networkId, image)
                        }
                      />
                    );

                  })}

                </div>

              )}

            </div>

          </section>

        </div>

        {/* ===================================================
            PLANIFICATION
        =================================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)] sm:p-5">

          <SectionTitle
            number="4"
            title="Planification et publication"
          />

          <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">

              <PublishOption
                active={publishMode === "now"}
                onClick={() => setPublishMode("now")}
                label="Publier maintenant"
              />

              <PublishOption
                active={publishMode === "schedule"}
                onClick={() => setPublishMode("schedule")}
                label="Programmer pour plus tard"
              />

              <PublishOption
                active={publishMode === "draft"}
                onClick={() => setPublishMode("draft")}
                label="Enregistrer comme brouillon"
              />

            </div>

            <div className="flex flex-wrap gap-2">

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50">
                <CalendarDays size={14} />
                17/07/2026
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50">
                <Clock3 size={14} />
                18:00
              </button>

              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50">
                GMT +1
              </button>

            </div>

          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 xl:flex-row xl:items-center xl:justify-between">

            <div className="flex flex-wrap gap-2">

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50">
                <Settings2 size={14} />
                Personnaliser par réseau
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50">
                <Save size={14} />
                Brouillon
              </button>

            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-red-dark px-6 py-3 text-[10px] font-black uppercase tracking-[0.05em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-red-dark/90">

              <Send size={14} />

              {publishMode === "schedule"
                ? "Programmer"
                : publishMode === "draft"
                ? "Enregistrer"
                : "Publier maintenant"}

              <ChevronDown size={13} />

            </button>

          </div>

        </section>

        {/* ===================================================
            RÉSUMÉ
        =================================================== */}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[10px] text-slate-400">

          <span>
            <strong className="text-slate-700">
              {selectedNetworks.length}
            </strong>{" "}
            réseaux sélectionnés
          </span>

          <span className="hidden h-3 w-px bg-slate-200 sm:block" />

          <span className="flex items-center gap-1">
            <ImageIcon size={12} />
            Images personnalisables
          </span>

          <span className="hidden h-3 w-px bg-slate-200 sm:block" />

          <span>
            Ton :{" "}
            <strong className="text-slate-600">
              Professionnel & motivant
            </strong>
          </span>

          <span className="hidden h-3 w-px bg-slate-200 sm:block" />

          <span>
            Langue :{" "}
            <strong className="text-slate-600">
              Français
            </strong>
          </span>

        </div>

        {/* ===================================================
            ASTUCE IA
        =================================================== */}

        <div className="mt-3 flex items-start gap-3 rounded-xl border border-[#eee7c8] bg-[#fffdf3] px-4 py-3">

          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff4c7] text-[#b98a00]">
            ✦
          </div>

          <div className="min-w-0 flex-1">

            <p className="text-[10px] font-black text-slate-700">
              Astuce IA
            </p>

            <p className="mt-0.5 text-[9px] leading-relaxed text-slate-500">
              Les publications avec image génèrent généralement davantage
              d'engagement sur les réseaux sociaux.
            </p>

          </div>

          <button
            aria-label="Fermer"
            className="text-slate-400 transition hover:text-slate-600"
          >
            <X size={14} />
          </button>

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   TITRE SECTION
========================================================= */

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-dark text-[10px] font-black text-white shadow-sm">
        {number}
      </div>

      <h2 className="text-[12px] font-black text-slate-800 sm:text-[13px]">
        {title}
      </h2>

    </div>
  );
}

/* =========================================================
   APERÇU RÉSEAU
========================================================= */

function NetworkPreview({
  network,
  post,
  onTextChange,
  onImageChange,
}: {
  network: SocialNetwork;
  post: PostContent;
  onTextChange: (text: string) => void;
  onImageChange: (image: string | null) => void;
}) {
  switch (network.id) {
    case "facebook":
      return (
        <FacebookPreview
          network={network}
          post={post}
          onTextChange={onTextChange}
          onImageChange={onImageChange}
        />
      );

    case "instagram":
      return (
        <InstagramPreview
          network={network}
          post={post}
          onTextChange={onTextChange}
          onImageChange={onImageChange}
        />
      );

    case "linkedin":
      return (
        <LinkedinPreview
          network={network}
          post={post}
          onTextChange={onTextChange}
          onImageChange={onImageChange}
        />
      );

    case "tiktok":
      return (
        <TikTokPreview
          network={network}
          post={post}
          onTextChange={onTextChange}
          onImageChange={onImageChange}
        />
      );

    case "google":
      return (
        <GooglePreview
          network={network}
          post={post}
          onTextChange={onTextChange}
          onImageChange={onImageChange}
        />
      );

    default:
      return null;
  }
}

/* =========================================================
   TOOLBAR D'ÉDITION
========================================================= */

function PostEditorToolbar({
  networkId,
  text,
  image,
  onTextChange,
  onImageChange,
}: {
  networkId: string;
  text: string;
  image: string | null;
  onTextChange: (text: string) => void;
  onImageChange: (image: string | null) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    onImageChange(imageUrl);

    setMenuOpen(false);

    event.target.value = "";
  };

  const removeImage = () => {
    onImageChange(null);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="absolute right-3 top-3 z-30">

        <button
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white/95 text-slate-500 shadow-sm backdrop-blur transition hover:bg-slate-50 hover:text-slate-800"
          aria-label="Modifier la publication"
        >
          <MoreHorizontal size={16} />
        </button>

        {menuOpen && (

          <div className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-2xl">

            <button
              onClick={() => {
                setEditing(true);
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[10px] font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={14} />
              Modifier le texte
            </button>

            <button
              onClick={() => {
                fileInputRef.current?.click();
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[10px] font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Upload size={14} />
              Modifier l'image
            </button>

            {image && (
              <button
                onClick={removeImage}
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[10px] font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={14} />
                Supprimer l'image
              </button>
            )}

          </div>

        )}

      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {editing && (

        <div className="absolute inset-x-3 top-14 z-40 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">

          <div className="mb-2 flex items-center justify-between">

            <p className="text-[10px] font-black text-slate-800">
              Modifier le texte
            </p>

            <button
              onClick={() => setEditing(false)}
              className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
            >
              <X size={13} />
            </button>

          </div>

          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            rows={7}
            className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[10px] leading-relaxed text-slate-700 outline-none focus:border-red-dark focus:bg-white focus:ring-4 focus:ring-red-light/20"
          />

          <div className="mt-2 flex justify-end">

            <button
              onClick={() => setEditing(false)}
              className="rounded-lg bg-red-dark px-3 py-2 text-[9px] font-black text-white transition hover:bg-red-dark/90"
            >
              Terminer
            </button>

          </div>

        </div>

      )}
    </>
  );
}

/* =========================================================
   FACEBOOK
========================================================= */

function FacebookPreview({
  network,
  post,
  onTextChange,
  onImageChange,
}: {
  network: SocialNetwork;
  post: PostContent;
  onTextChange: (text: string) => void;
  onImageChange: (image: string | null) => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

      <PostEditorToolbar
        networkId={network.id}
        text={post.text}
        image={post.image}
        onTextChange={onTextChange}
        onImageChange={onImageChange}
      />

      <PreviewHeader
        icon={<FacebookIcon />}
        platform="Facebook"
      />

      <div className="flex items-center gap-2 px-3.5 py-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[9px] font-black">
          P
        </div>

        <div className="min-w-0">

          <p className="text-[9px] font-black text-slate-800">
            {network.username}
          </p>

          <p className="text-[8px] text-slate-400">
            À l'instant · 🌎
          </p>

        </div>

      </div>

      <div className="px-3.5 pb-3">

        <p className="whitespace-pre-line text-[9px] leading-[1.65] text-slate-600">
          {post.text}
        </p>

      </div>

      <PreviewImage
        image={post.image}
        alt="Publication Facebook"
        aspect="aspect-[1.91/1]"
        onChange={onImageChange}
      />

      <div className="px-3.5 py-2.5">

        <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-[8px] text-slate-400">

          <span className="flex items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
              <ThumbsUp size={8} />
            </span>
            128
          </span>

          <span>
            12 commentaires · 8 partages
          </span>

        </div>

        <div className="grid grid-cols-3 pt-2 text-[8px] font-semibold text-slate-500">

          <span className="flex items-center justify-center gap-1">
            <ThumbsUp size={11} />
            J'aime
          </span>

          <span className="flex items-center justify-center gap-1">
            <MessageCircle size={11} />
            Commenter
          </span>

          <span className="flex items-center justify-center gap-1">
            <Share2 size={11} />
            Partager
          </span>

        </div>

      </div>

    </article>
  );
}

/* =========================================================
   INSTAGRAM
========================================================= */

function InstagramPreview({
  network,
  post,
  onTextChange,
  onImageChange,
}: {
  network: SocialNetwork;
  post: PostContent;
  onTextChange: (text: string) => void;
  onImageChange: (image: string | null) => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

      <PostEditorToolbar
        networkId={network.id}
        text={post.text}
        image={post.image}
        onTextChange={onTextChange}
        onImageChange={onImageChange}
      />

      <PreviewHeader
        icon={<InstagramIcon />}
        platform="Instagram"
      />

      <div className="flex items-center gap-2 px-3.5 py-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 via-pink-500 to-purple-600 p-[2px]">

          <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[8px] font-black">
            P
          </div>

        </div>

        <div className="min-w-0 flex-1">

          <p className="text-[9px] font-black text-slate-800">
            {network.username}
          </p>

        </div>

        <MoreHorizontal
          size={15}
          className="text-slate-400"
        />

      </div>

      <PreviewImage
        image={post.image}
        alt="Publication Instagram"
        aspect="aspect-square"
        onChange={onImageChange}
      />

      <div className="px-3.5 pt-3">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Heart size={16} />

            <MessageCircle size={16} />

            <Share2 size={16} />

          </div>

          <Bookmark size={16} />

        </div>

        <p className="mt-2 text-[9px] font-black text-slate-800">
          128 J'aime
        </p>

      </div>

      <div className="px-3.5 pb-4 pt-2">

        <p className="line-clamp-7 whitespace-pre-line text-[9px] leading-[1.6] text-slate-600">
          <strong className="font-black text-slate-800">
            {network.username}
          </strong>{" "}
          {post.text}
        </p>

        <p className="mt-2 text-[8px] text-slate-400">
          Voir les 12 commentaires
        </p>

      </div>

    </article>
  );
}

/* =========================================================
   LINKEDIN
========================================================= */

function LinkedinPreview({
  network,
  post,
  onTextChange,
  onImageChange,
}: {
  network: SocialNetwork;
  post: PostContent;
  onTextChange: (text: string) => void;
  onImageChange: (image: string | null) => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

      <PostEditorToolbar
        networkId={network.id}
        text={post.text}
        image={post.image}
        onTextChange={onTextChange}
        onImageChange={onImageChange}
      />

      <PreviewHeader
        icon={<LinkedinIcon />}
        platform="LinkedIn"
      />

      <div className="flex items-start gap-2 px-3.5 py-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[9px] font-black">
          P
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-[9px] font-black text-slate-800">
            {network.username}
          </p>

          <p className="text-[8px] text-slate-400">
            Développement & Formation · 1 h
          </p>

        </div>

        <button className="text-[9px] font-bold text-blue-600">
          + Suivre
        </button>

      </div>

      <div className="px-3.5 pb-3">

        <p className="whitespace-pre-line text-[9px] leading-[1.65] text-slate-600">
          {post.text}
        </p>

      </div>

      <PreviewImage
        image={post.image}
        alt="Publication LinkedIn"
        aspect="aspect-[1.91/1]"
        onChange={onImageChange}
      />

      <div className="px-3.5 py-3">

        <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-[8px] text-slate-400">

          <span className="flex items-center gap-1">
            👍 ❤️ 💡
            <span>128</span>
          </span>

          <span>
            14 commentaires · 5 reposts
          </span>

        </div>

        <div className="grid grid-cols-3 pt-2 text-[8px] font-semibold text-slate-500">

          <span className="flex items-center justify-center gap-1">
            <ThumbsUp size={11} />
            J'aime
          </span>

          <span className="flex items-center justify-center gap-1">
            <MessageCircle size={11} />
            Commenter
          </span>

          <span className="flex items-center justify-center gap-1">
            <Repeat2 size={11} />
            Republier
          </span>

        </div>

      </div>

    </article>
  );
}

/* =========================================================
   TIKTOK
========================================================= */

function TikTokPreview({
  network,
  post,
  onTextChange,
  onImageChange,
}: {
  network: SocialNetwork;
  post: PostContent;
  onTextChange: (text: string) => void;
  onImageChange: (image: string | null) => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-slate-200 bg-black shadow-[0_2px_8px_rgba(15,23,42,0.08)]">

      <PostEditorToolbar
        networkId={network.id}
        text={post.text}
        image={post.image}
        onTextChange={onTextChange}
        onImageChange={onImageChange}
      />

      {/* HEADER TIKTOK */}

      <div className="absolute left-3 right-12 top-3 z-20 flex items-center gap-2">

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[8px] font-black">
          P
        </div>

        <div className="min-w-0">

          <p className="text-[9px] font-black text-white">
            {network.username}
          </p>

          <p className="text-[7px] text-white/70">
            Original sound
          </p>

        </div>

      </div>

      {/* IMAGE / VIDÉO */}

      <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-900">

        {post.image ? (

          <img
            src={post.image}
            alt="Publication TikTok"
            className="h-full w-full object-cover"
          />

        ) : (

          <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 text-white">

            <Play size={28} />

            <p className="mt-2 text-[9px] font-bold">
              Ajoutez une vidéo ou une image
            </p>

          </div>

        )}

        {/* DÉGRADÉ */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* ACTIONS À DROITE */}

        <div className="absolute bottom-24 right-3 z-20 flex flex-col items-center gap-4 text-white">

          <div className="flex flex-col items-center gap-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur">
              <Heart size={19} fill="white" />
            </div>
            <span className="text-[8px] font-bold">
              128
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <MessageCircle size={20} />
            <span className="text-[8px] font-bold">
              12
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Bookmark size={19} />
            <span className="text-[8px] font-bold">
              24
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Share2 size={19} />
            <span className="text-[8px] font-bold">
              Partager
            </span>
          </div>

        </div>

        {/* TEXTE */}

        <div className="absolute bottom-4 left-3 right-14 z-20">

          <p className="whitespace-pre-line text-[9px] font-medium leading-[1.55] text-white">
            {post.text}
          </p>

        </div>

      </div>

    </article>
  );
}

/* =========================================================
   GOOGLE BUSINESS
========================================================= */

function GooglePreview({
  network,
  post,
  onTextChange,
  onImageChange,
}: {
  network: SocialNetwork;
  post: PostContent;
  onTextChange: (text: string) => void;
  onImageChange: (image: string | null) => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

      <PostEditorToolbar
        networkId={network.id}
        text={post.text}
        image={post.image}
        onTextChange={onTextChange}
        onImageChange={onImageChange}
      />

      <PreviewHeader
        icon={<GoogleBusinessIcon />}
        platform="Google Business"
      />

      <div className="px-3.5 py-3">

        <div className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[9px] font-black">
            P
          </div>

          <div className="min-w-0">

            <p className="text-[9px] font-black text-slate-800">
              {network.username}
            </p>

            <div className="flex items-center gap-1 text-[8px] text-slate-400">
              <span>Google</span>
              <span>·</span>
              <span>Il y a 1 h</span>
            </div>

          </div>

        </div>

      </div>

      <div className="px-3.5 pb-3">

        <p className="whitespace-pre-line text-[9px] leading-[1.65] text-slate-600">
          {post.text}
        </p>

      </div>

      <PreviewImage
        image={post.image}
        alt="Publication Google Business"
        aspect="aspect-[1.91/1]"
        onChange={onImageChange}
      />

      <div className="p-3.5">

        <div className="flex items-center gap-1 text-[8px] text-slate-500">

          <MapPin size={11} />

          <span>
            Cotonou · Ouvert
          </span>

        </div>

        <div className="mt-3 flex gap-2">

          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-[8px] font-bold text-slate-600">
            <Eye size={11} />
            Voir
          </button>

          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-[8px] font-bold text-white">
            En savoir plus
          </button>

        </div>

      </div>

    </article>
  );
}

/* =========================================================
   HEADER APERÇU
========================================================= */

function PreviewHeader({
  icon,
  platform,
}: {
  icon: React.ReactNode;
  platform: string;
}) {
  return (
    <div className="border-b border-slate-100 px-3.5 py-3">

      <div className="flex items-center gap-2">

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
          {icon}
        </div>

        <div>

          <p className="text-[10px] font-black text-slate-800">
            {platform}
          </p>

          <p className="text-[8px] text-slate-400">
            Aperçu de la publication
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   IMAGE AVEC MODIFICATION / SUPPRESSION
========================================================= */

function PreviewImage({
  image,
  alt,
  aspect,
  onChange,
}: {
  image: string | null;
  alt: string;
  aspect: string;
  onChange: (image: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);

    onChange(imageUrl);

    event.target.value = "";
  };

  if (!image) {
    return (
      <div className="relative mx-3.5 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">

        <div className="flex aspect-[1.5/1] flex-col items-center justify-center px-5 text-center">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
            <ImageIcon size={19} />
          </div>

          <p className="mt-2 text-[9px] font-bold text-slate-600">
            Aucune image
          </p>

          <button
            onClick={() => inputRef.current?.click()}
            className="mt-2 flex items-center gap-1.5 rounded-lg bg-red-dark px-3 py-2 text-[8px] font-black text-white"
          >
            <Upload size={11} />
            Ajouter une image
          </button>

        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />

      </div>
    );
  }

  return (
    <div className="group/image relative mx-3.5 overflow-hidden rounded-xl bg-slate-100">

      <img
        src={image}
        alt={alt}
        className={`${aspect} w-full object-cover transition duration-500 group-hover/image:scale-[1.01]`}
      />

      {/* OVERLAY IMAGE */}

      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover/image:bg-black/30 group-hover/image:opacity-100">

        <div className="flex items-center gap-2">

          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[8px] font-black text-slate-700 shadow-lg transition hover:bg-slate-50"
          >
            <Upload size={12} />
            Modifier
          </button>

          <button
            onClick={() => onChange(null)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-600 shadow-lg transition hover:bg-red-50"
            aria-label="Supprimer l'image"
          >
            <Trash2 size={13} />
          </button>

        </div>

      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

    </div>
  );
}

/* =========================================================
   PUBLISH OPTION
========================================================= */

function PublishOption({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 transition hover:text-slate-900"
    >

      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border transition ${
          active
            ? "border-red-dark"
            : "border-slate-300"
        }`}
      >

        {active && (
          <span className="h-2 w-2 rounded-full bg-red-light" />
        )}

      </span>

      {label}

    </button>
  );
}