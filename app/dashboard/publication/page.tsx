"use client";

import React, { useState } from "react";
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

/* =========================================================
   ICÔNES RÉSEAUX SOCIAUX
========================================================= */

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.006 10.125 11.927v-8.432H7.078v-3.495h3.047V9.413c0-3.022 1.791-4.693 4.533-4.693 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.956.931-1.956 1.887v2.257h3.328l-.532 3.495h-2.796V24C19.612 23.079 24 18.092 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
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
    className="h-5 w-5"
    fill="currentColor"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 8.99h3.56v11.46H3.56V8.99z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

/* =========================================================
   RÉSEAUX SOCIAUX
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
    id: "twitter",
    name: "X (Twitter)",
    username: "@presta_officiel",
    icon: <TwitterIcon />,
  },
  {
    id: "tiktok",
    name: "TikTok",
    username: "@presta_officiel",
    icon: (
      <span className="text-sm font-black">
        ♪
      </span>
    ),
  },
  {
    id: "google",
    name: "Google Business Profile",
    username: "Presta",
    icon: (
      <span className="text-sm font-black text-blue-500">
        G
      </span>
    ),
  },
];

/* =========================================================
   CONTENU
========================================================= */

const postText = `🚀 Nouvelle formation Flutter !

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
  const [selectedNetworks, setSelectedNetworks] = useState([
    "facebook",
    "instagram",
    "linkedin",
    "twitter",
  ]);

  const [showProjectMenu, setShowProjectMenu] = useState(false);

  const [publishMode, setPublishMode] = useState<
    "now" | "schedule" | "draft"
  >("now");

  const [idea, setIdea] = useState(
    "Promouvoir notre nouvelle formation Flutter destinée aux débutants. La formation commence le 15 juillet 2026, 100% pratique avec projets."
  );

  const toggleNetwork = (id: string) => {
    setSelectedNetworks((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* GAUCHE */}

          <div className="flex min-w-0 items-center">

            <div className="min-w-0">

              <p className="mb-1 hidden text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">
                Création de contenu
              </p>

              <h1 className="truncate text-[17px] font-extrabold tracking-tight text-slate-900 sm:text-[19px]">
                Créer une publication
              </h1>

            </div>

          </div>

          {/* PROJET */}

          <div className="relative">

            <button
              onClick={() => setShowProjectMenu(!showProjectMenu)}
              className="flex min-w-[150px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:min-w-[210px]"
            >

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-light text-red-light">
                ✦
              </div>

              <div className="hidden min-w-0 flex-1 text-left sm:block">

                <p className="text-[8px] font-semibold text-slate-400">
                  Projet actif
                </p>

                <p className="truncate text-xs font-bold text-slate-800">
                  Presta
                </p>

              </div>

              <ChevronDown
                size={15}
                className={`shrink-0 text-slate-400 transition ${
                  showProjectMenu ? "rotate-180" : ""
                }`}
              />

            </button>

            {showProjectMenu && (
              <div className="absolute right-0 top-[52px] z-[100] w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)]">

                <div className="border-b border-slate-100 px-4 py-3">

                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
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
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${
                      index === 0 ? "bg-red-light/10" : ""
                    }`}
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm">
                      {index === 0 ? "✦" : "👤"}
                    </span>

                    <span className="flex-1 text-xs font-semibold text-slate-700">
                      {project}
                    </span>

                    {index === 0 && (
                      <Check
                        size={15}
                        className="text-red-dark"
                      />
                    )}

                  </button>

                ))}

                <button className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-3 text-xs font-bold text-red-dark transition hover:bg-red-light/10">
                  <Plus size={15} />
                  Créer un projet
                </button>

              </div>
            )}

          </div>

          {/* DROITE */}

          <div className="flex items-center gap-2 sm:gap-3">

            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700"
              aria-label="Aide"
            >
              <HelpCircle size={18} />
            </button>

            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700"
              aria-label="Notifications"
            >

              <Bell size={18} />

              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-black text-white">
                3
              </span>

            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white shadow-sm">
              Y
            </div>

          </div>

        </div>
      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1800px] px-3 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-7">

        {/* TITRE */}

        <div className="mb-5">

          <p className="text-[11px] font-medium text-slate-400 sm:text-xs">
            Générez, personnalisez et publiez sur vos réseaux sociaux
          </p>

        </div>

        {/* ===================================================
            GRILLE PRINCIPALE
        =================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)]">

          {/* =================================================
              COLONNE CONFIGURATION
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
                    maxLength={500}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-[#fafbfc] p-3.5 pb-7 text-[11px] font-medium leading-[1.6] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-dark
focus:bg-white
focus:ring-4
focus:ring-red-dark/10"
                  />

                  <span className="absolute bottom-2.5 right-3 text-[9px] font-medium text-slate-400">
                    {idea.length}/500
                  </span>

                </div>

              </div>

              {/* TON */}

              <div className="mt-4">

                <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                  Ton souhaité
                </label>

                <div className="relative">

                  <select className="w-full appearance-none rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[11px] font-semibold text-slate-700 outline-none transition focus:border-[#8b75e8] focus:bg-white focus:ring-4 focus:ring-red-light/5">
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

                  <select className="w-full appearance-none rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-3 text-[11px] font-semibold text-slate-700 outline-none transition focus:border-[#8b75e8] focus:bg-white focus:ring-4 focus:ring-red-light/5">
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

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-700 transition group-hover:bg-red-light/10
group-hover:text-red-dark">
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
                        {selected && <Check size={12} strokeWidth={3} />}
                      </div>

                    </button>
                  );
                })}

              </div>

              <button
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-dark py-3 text-[10px] font-black uppercase tracking-[0.06em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-red-dark/90 active:scale-[0.99]"
              >
                <Sparkles size={14} />
                Générer le contenu
              </button>

            </section>

          </div>

          {/* =================================================
              PRÉVISUALISATION
          ================================================= */}

          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]">

            {/* HEADER PREVIEW */}

            <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">

              <div className="flex items-center gap-3">

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-light/10 text-red-dark">
                  <span className="text-[11px] font-black">
                    3
                  </span>
                </span>

                <div className="min-w-0">

                  <h2 className="truncate text-[13px] font-black text-slate-800 sm:text-sm">
                    Prévisualisation des publications
                  </h2>

                  <p className="mt-0.5 text-[9px] text-slate-400">
                    Aperçu de votre contenu sur chaque réseau
                  </p>

                </div>

              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 sm:w-auto">
                Voir tous les aperçus
                <ChevronRight size={13} />
              </button>

            </div>

            {/* TABS */}

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

            {/* POSTS */}

            <div className="bg-[#fafbfc] p-3 sm:p-4 lg:p-5">

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">

                <SocialPost
                  platform="Facebook"
                  platformIcon={<FacebookIcon />}
                  account="Presta Officiel"
                  post={postText}
                  image="/flutter.png"
                />

                <SocialPost
                  platform="Instagram"
                  platformIcon={<InstagramIcon />}
                  account="presta_officiel"
                  post={postText}
                  image="/flutter.png"
                />

                <SocialPost
                  platform="LinkedIn"
                  platformIcon={<LinkedinIcon />}
                  account="Presta SARL"
                  post={postText}
                  image="/flutter.png"
                />

                <SocialPost
                  platform="X (Twitter)"
                  platformIcon={<TwitterIcon />}
                  account="@presta_officiel"
                  post={postText}
                  image="/flutter.png"
                />

              </div>

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

          {/* MODES */}

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

          {/* ACTIONS */}

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
            1 image
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
              Les publications avec image génèrent 42% plus d'engagement sur Instagram.
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
   SECTION TITLE
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
   SOCIAL POST
========================================================= */

function SocialPost({
  platform,
  platformIcon,
  account,
  post,
  image,
}: {
  platform: string;
  platformIcon: React.ReactNode;
  account: string;
  post: string;
  image: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:shadow-md">

      {/* PLATFORM */}

      <div className="border-b border-slate-100 px-3.5 py-3">

        <div className="flex items-center gap-2">

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
            {platformIcon}
          </div>

          <div>

            <p className="text-[10px] font-black text-slate-800">
              {platform}
            </p>

            <p className="text-[8px] text-slate-400">
              Aperçu du post
            </p>

          </div>

        </div>

      </div>

      {/* ACCOUNT */}

      <div className="flex items-center gap-2 px-3.5 py-3">

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-[9px] font-black text-slate-700">
          P
        </div>

        <div className="min-w-0 flex-1">

          <p className="truncate text-[9px] font-black text-slate-800">
            {account}
          </p>

          <p className="text-[8px] text-slate-400">
            À l'instant
          </p>

        </div>

        <MoreHorizontal
          size={14}
          className="shrink-0 text-slate-400"
        />

      </div>

      {/* TEXT */}

      <div className="px-3.5 pb-3">

        <p className="whitespace-pre-line text-[9px] leading-[1.65] text-slate-600">
          {post}
        </p>

      </div>

      {/* IMAGE */}

      <div className="mx-3.5 overflow-hidden rounded-xl bg-slate-100">

        <img
          src="/flutter.png"
          alt={`Publication ${platform}`}
          className="aspect-square w-full object-cover transition duration-500 hover:scale-[1.01]"
        />

      </div>

      {/* ACTIONS */}

      <div className="flex items-center justify-between px-3.5 py-3 text-slate-400">

        <div className="flex items-center gap-3">

          <span className="text-[12px]">
            ♡
          </span>

          <span className="text-[11px]">
            ○
          </span>

          <span className="text-[11px]">
            ↗
          </span>

        </div>

        <span className="text-[8px]">
          128 J'aime
        </span>

      </div>

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