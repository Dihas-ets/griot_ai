"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  CheckCircle2,
  AlertCircle,
  Settings2,
  MoreHorizontal,
  Users,
  Eye,
  BarChart3,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Link2,
  ChevronRight,
  Search,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type NetworkStatus = "connected" | "attention" | "disconnected";

type SocialNetwork = {
  id: string;
  name: string;
  description: string;
  username: string;
  status: NetworkStatus;
  followers: string;
  posts: number;
  views: string;
  color: string;
  icon: React.ReactNode;
};

/* =========================================================
   ICÔNES SOCIALES
   Pas de dépendance aux icônes lucide pour les réseaux
========================================================= */

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="currentColor"
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.006 10.125 11.927v-8.432H7.078v-3.495h3.047V9.413c0-3.022 1.791-4.693 4.533-4.693 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.956.931-1.956 1.887v2.257h3.328l-.532 3.495h-2.796V24C19.612 23.079 24 18.092 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
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
    className="h-6 w-6"
    fill="currentColor"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 8.99h3.56v11.46H3.56V8.99z" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="currentColor"
  >
    <path d="M16.5 2h3.1c.2 1.5 1 2.8 2.4 3.7v3.2c-1.3-.1-2.5-.5-3.6-1.1v7.1c0 3.6-2.8 6.1-6.3 6.1-3.3 0-5.8-2.5-5.8-5.7 0-3.4 2.8-5.9 6.3-5.9.3 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.6 0-2.9 1.1-2.9 2.7 0 1.4 1.1 2.6 2.5 2.6 1.5 0 2.8-1 2.8-3V2h1.5z" />
  </svg>
);

const GoogleIcon = () => (
  <span className="text-xl font-black">
    G
  </span>
);

/* =========================================================
   DONNÉES
========================================================= */

const networks: SocialNetwork[] = [
  {
    id: "facebook",
    name: "Facebook",
    description: "Publiez sur votre page Facebook",
    username: "Presta Officiel",
    status: "connected",
    followers: "12,8K",
    posts: 48,
    views: "84,2K",
    color: "text-blue-600",
    icon: <FacebookIcon />,
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Partagez vos contenus Instagram",
    username: "@presta_officiel",
    status: "connected",
    followers: "8,4K",
    posts: 36,
    views: "61,7K",
    color: "text-pink-600",
    icon: <InstagramIcon />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Développez votre présence professionnelle",
    username: "Presta SARL",
    status: "connected",
    followers: "3,2K",
    posts: 24,
    views: "29,5K",
    color: "text-blue-700",
    icon: <LinkedinIcon />,
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Publiez vos vidéos courtes",
    username: "@presta_officiel",
    status: "attention",
    followers: "5,7K",
    posts: 19,
    views: "42,8K",
    color: "text-slate-900",
    icon: <TikTokIcon />,
  },
  {
    id: "google",
    name: "Google Business",
    description: "Gérez votre présence Google",
    username: "Presta SARL",
    status: "connected",
    followers: "1,8K",
    posts: 15,
    views: "18,4K",
    color: "text-blue-500",
    icon: <GoogleIcon />,
  },
  {
    id: "x",
    name: "X",
    description: "Partagez vos actualités sur X",
    username: "@presta_officiel",
    status: "disconnected",
    followers: "—",
    posts: 0,
    views: "—",
    color: "text-slate-900",
    icon: <XIcon />,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ReseauxSociauxPage() {
  const [search, setSearch] = useState("");

  const filteredNetworks = networks.filter((network) =>
    network.name.toLowerCase().includes(search.toLowerCase())
  );

  const connectedCount = networks.filter(
    (network) => network.status === "connected"
  ).length;

  const attentionCount = networks.filter(
    (network) => network.status === "attention"
  ).length;

  const totalFollowers = "32,1K";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          <div className="min-w-0 pl-14 md:pl-12 lg:pl-0 xl:pl-0">

            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
              Gestion des comptes
            </p>

            <h1 className="truncate text-base font-black text-slate-900 sm:text-lg">
              Réseaux sociaux
            </h1>

          </div>

          <div className="flex items-center gap-2">

            <Link
              href="/dashboard/publication"
              className="hidden items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 sm:flex"
            >
              <Plus size={15} />
              Créer une publication
            </Link>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">
              Y
            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

        {/* INTRO */}

        <section className="mb-7">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Vos réseaux sociaux
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-500 sm:text-sm">
                Connectez et gérez vos comptes sociaux depuis un seul espace.
                Programmez vos publications et suivez vos performances sans
                quitter Griot AI.
              </p>

            </div>

            <button className="flex w-fit items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700">
              <Plus size={15} />
              Ajouter un réseau
            </button>

          </div>

        </section>

        {/* =====================================================
            STATISTIQUES
        ===================================================== */}

        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon={<Link2 size={18} />}
            label="Réseaux connectés"
            value={`${connectedCount}/6`}
            description="Comptes actifs"
          />

          <StatCard
            icon={<Users size={18} />}
            label="Audience totale"
            value={totalFollowers}
            description="+8,4% ce mois"
          />

          <StatCard
            icon={<Eye size={18} />}
            label="Vues ce mois"
            value="236,6K"
            description="+12,7% ce mois"
          />

          <StatCard
            icon={<AlertCircle size={18} />}
            label="Action requise"
            value={attentionCount.toString()}
            description="Compte à vérifier"
            warning
          />

        </section>

        {/* =====================================================
            BARRE OUTILS
        ===================================================== */}

        <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="text-sm font-black text-slate-900">
              Comptes connectés
            </h3>

            <p className="mt-1 text-[10px] text-slate-400">
              Gérez les comptes utilisés pour vos publications.
            </p>

          </div>

          <div className="relative w-full sm:w-64">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Rechercher un réseau..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs font-medium outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
            />

          </div>

        </section>

        {/* =====================================================
            RÉSEAUX
        ===================================================== */}

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">

          {filteredNetworks.map((network) => (
            <NetworkCard
              key={network.id}
              network={network}
            />
          ))}

        </section>

        {/* =====================================================
            AJOUTER UN RÉSEAU
        ===================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-white">

          <div className="flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
                <Plus size={22} />
              </div>

              <div>

                <h3 className="text-sm font-black text-slate-900 sm:text-base">
                  Connectez un nouveau réseau
                </h3>

                <p className="mt-1 max-w-xl text-[10px] leading-relaxed text-slate-500 sm:text-xs">
                  Ajoutez vos comptes sociaux à Griot AI pour centraliser
                  vos publications, votre calendrier et vos statistiques.
                </p>

              </div>

            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700">
              <Plus size={15} />
              Ajouter un réseau
            </button>

          </div>

        </section>

        {/* =====================================================
            SÉCURITÉ
        ===================================================== */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={21} />
            </div>

            <div className="flex-1">

              <h3 className="text-sm font-black text-slate-900">
                Vos comptes sont protégés
              </h3>

              <p className="mt-1 text-[10px] leading-relaxed text-slate-500 sm:text-xs">
                Griot AI utilise des connexions sécurisées pour accéder à vos
                comptes. Vos identifiants ne sont jamais stockés directement
                dans l'application.
              </p>

            </div>

            <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 transition hover:text-red-600">
              En savoir plus
              <ChevronRight size={14} />
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
  description,
  warning = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            warning
              ? "bg-amber-50 text-amber-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {icon}
        </div>

        {!warning && (
          <ArrowUpRight
            size={15}
            className="text-emerald-500"
          />
        )}

      </div>

      <p className="mt-4 text-[10px] font-bold text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-slate-900">
        {value}
      </p>

      <p
        className={`mt-1 text-[9px] font-semibold ${
          warning
            ? "text-amber-600"
            : "text-emerald-600"
        }`}
      >
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   NETWORK CARD
========================================================= */

function NetworkCard({
  network,
}: {
  network: SocialNetwork;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isConnected = network.status === "connected";
  const needsAttention = network.status === "attention";

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      {/* HEADER */}

      <div className="flex items-start justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 ${network.color}`}
          >
            {network.icon}
          </div>

          <div className="min-w-0">

            <h3 className="truncate text-sm font-black text-slate-900">
              {network.name}
            </h3>

            <p className="mt-0.5 truncate text-[9px] text-slate-400">
              {network.description}
            </p>

          </div>

        </div>

        <div className="relative">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Options"
          >
            <MoreHorizontal size={17} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">

              <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] font-semibold text-slate-600 hover:bg-slate-50">
                <Settings2 size={13} />
                Paramètres
              </button>

              <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] font-semibold text-slate-600 hover:bg-slate-50">
                <RefreshCw size={13} />
                Actualiser
              </button>

            </div>
          )}

        </div>

      </div>

      {/* STATUS */}

      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          {isConnected ? (
            <>
              <CheckCircle2
                size={15}
                className="text-emerald-500"
              />

              <span className="text-[10px] font-bold text-emerald-600">
                Connecté
              </span>
            </>
          ) : needsAttention ? (
            <>
              <AlertCircle
                size={15}
                className="text-amber-500"
              />

              <span className="text-[10px] font-bold text-amber-600">
                Connexion à vérifier
              </span>
            </>
          ) : (
            <>
              <AlertCircle
                size={15}
                className="text-slate-400"
              />

              <span className="text-[10px] font-bold text-slate-500">
                Non connecté
              </span>
            </>
          )}

        </div>

        <span className="max-w-[140px] truncate text-[9px] font-semibold text-slate-500">
          {network.username}
        </span>

      </div>

      {/* STATISTIQUES */}

      <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 py-3">

        <MiniStat
          label="Abonnés"
          value={network.followers}
        />

        <MiniStat
          label="Publications"
          value={network.posts.toString()}
        />

        <MiniStat
          label="Vues"
          value={network.views}
        />

      </div>

      {/* ACTION */}

      <div className="mt-4 flex gap-2">

        {isConnected ? (
          <>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50">
              <Settings2 size={14} />
              Gérer le compte
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
              <RefreshCw size={14} />
            </button>
          </>
        ) : needsAttention ? (
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-[10px] font-black text-white transition hover:bg-amber-600">
            <RefreshCw size={14} />
            Reconnecter le compte
          </button>
        ) : (
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-[10px] font-black text-white shadow-md shadow-red-600/15 transition hover:bg-red-700">
            <Link2 size={14} />
            Connecter ce réseau
          </button>
        )}

      </div>

    </article>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">

      <p className="text-[8px] font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-[11px] font-black text-slate-800">
        {value}
      </p>

    </div>
  );
}