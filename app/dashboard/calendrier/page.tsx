"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  Clock3,
  Send,
  MoreHorizontal,
  CheckCircle2,
  FileText,
  Sparkles,
  BriefcaseBusiness,
  Globe2,
  Check,
  AlertCircle,
} from "lucide-react";

import api from "@/lib/axios";

/* =========================================================
   TYPES
========================================================= */

type ViewMode = "month" | "week";

type NetworkId =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "tiktok"
  | "google"
  | "x";

type BackendNetwork =
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "TikTok"
  | "Google Business"
  | "X";

type PublicationStatus =
  | "scheduled"
  | "published"
  | "draft"
  | "failed";

type BackendPublicationStatus =
  | "Publiée"
  | "Programmée"
  | "Brouillon"
  | "Échec";

type Project = {
  id: number;
  name: string;
  initials: string;
  sector: string;
  color: string;
  networks: NetworkId[];
};

type BackendProject = {
  id: number;
  name: string;
  description?: string | null;
  status?: string;
  members?: number;
  image?: string | null;
};

type BackendPublication = {
  id: number;
  user_id: number;
  project_id: number | null;
  title: string;
  content: string;
  network: BackendNetwork;
  status: BackendPublicationStatus;
  date: string | null;
  time: string | null;
  image: string | null;
  created_at?: string;
  updated_at?: string;
  project?: BackendProject | null;
  medias?: unknown[];
};

type Publication = {
  id: number;
  title: string;
  date: string;
  time: string;
  network: BackendNetwork;
  status: PublicationStatus;
  color: string;
};

/* =========================================================
   ICONES RÉSEAUX
========================================================= */

const FacebookIcon = ({
  size = 16,
}: {
  size?: number;
}) => (
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

const InstagramIcon = ({
  size = 16,
}: {
  size?: number;
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <defs>
      <linearGradient
        id="instagramGradientCalendar"
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
      fill="url(#instagramGradientCalendar)"
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

const LinkedinIcon = ({
  size = 16,
}: {
  size?: number;
}) => (
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

const TikTokIcon = ({
  size = 16,
}: {
  size?: number;
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <rect
      width="24"
      height="24"
      rx="5"
      fill="#111827"
    />

    <path
      d="M15.2 5.2c.4 1.7 1.4 2.7 3.1 3.1v2.7c-1.2-.1-2.2-.5-3.1-1.1v5.3c0 3-2.1 4.8-4.8 4.8-2.5 0-4.4-1.8-4.4-4.2 0-2.6 2.1-4.5 4.8-4.5.4 0 .7 0 1 .1v2.6c-.3-.1-.6-.2-1-.2-1.1 0-2 .7-2 1.8 0 1 .8 1.7 1.8 1.7 1.2 0 2-1 2-2.4V5.2h2.6Z"
      fill="white"
    />

    <path
      d="M15.2 5.2c.2.8.5 1.4 1 1.9"
      stroke="#25F4EE"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const GoogleIcon = ({
  size = 16,
}: {
  size?: number;
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="white"
      stroke="#E5E7EB"
    />

    <path
      d="M19.6 12.2c0-.6-.1-1.1-.2-1.6H12v3h4.3c-.2 1-.8 1.8-1.7 2.4v2h2.7c1.5-1.4 2.3-3.4 2.3-5.8Z"
      fill="#4285F4"
    />

    <path
      d="M12 20c2.2 0 4-.7 5.3-1.9l-2.7-2c-.7.5-1.5.8-2.6.8-2 0-3.7-1.4-4.3-3.3H5v2.1C6.3 18.3 8.9 20 12 20Z"
      fill="#34A853"
    />

    <path
      d="M7.7 13.6c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6V8.3H5c-.6 1.1-.9 2.4-.9 3.7s.3 2.6.9 3.7l2.7-2.1Z"
      fill="#FBBC05"
    />

    <path
      d="M12 7.1c1.2 0 2.2.4 3 1.2l2.3-2.3C16 4.7 14.2 4 12 4 8.9 4 6.3 5.7 5 8.3l2.7 2.1c.6-1.9 2.3-3.3 4.3-3.3Z"
      fill="#EA4335"
    />
  </svg>
);

const XIcon = ({
  size = 16,
}: {
  size?: number;
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <rect
      width="24"
      height="24"
      rx="5"
      fill="#111827"
    />

    <path
      d="M6.2 5.5h3.1l3.5 4.7 3.9-4.7h1.8l-4.8 5.8 5.1 7.2h-3.1l-3.7-5.1-4.2 5.1H6l5.1-6.2-4.9-6.8Zm2.1 1.4 6.7 10.1h1.4L9.7 6.9H8.3Z"
      fill="white"
    />
  </svg>
);

function NetworkIcon({
  network,
  size = 14,
}: {
  network: BackendNetwork;
  size?: number;
}) {
  if (network === "Facebook") {
    return <FacebookIcon size={size} />;
  }

  if (network === "Instagram") {
    return <InstagramIcon size={size} />;
  }

  if (network === "LinkedIn") {
    return <LinkedinIcon size={size} />;
  }

  if (network === "TikTok") {
    return <TikTokIcon size={size} />;
  }

  if (network === "Google Business") {
    return <GoogleIcon size={size} />;
  }

  return <XIcon size={size} />;
}

/* =========================================================
   OUTILS DONNÉES
========================================================= */

const networkToId: Record<
  BackendNetwork,
  NetworkId
> = {
  Facebook: "facebook",
  Instagram: "instagram",
  LinkedIn: "linkedin",
  TikTok: "tiktok",
  "Google Business": "google",
  X: "x",
};

function getPublicationColor(
  network: BackendNetwork,
  status: PublicationStatus
) {
  if (status === "published") {
    return "bg-emerald-500";
  }

  if (status === "draft") {
    return "bg-slate-400";
  }

  if (status === "failed") {
    return "bg-red-600";
  }

  switch (network) {
    case "Facebook":
      return "bg-blue-500";

    case "Instagram":
      return "bg-pink-500";

    case "LinkedIn":
      return "bg-sky-600";

    case "TikTok":
      return "bg-slate-900";

    case "Google Business":
      return "bg-amber-500";

    case "X":
      return "bg-slate-800";

    default:
      return "bg-red-500";
  }
}

function mapStatus(
  status: BackendPublicationStatus
): PublicationStatus {
  switch (status) {
    case "Publiée":
      return "published";

    case "Programmée":
      return "scheduled";

    case "Échec":
      return "failed";

    case "Brouillon":
    default:
      return "draft";
  }
}

function mapProject(
  project: BackendProject,
  index: number
): Project {
  const palette = [
    "bg-red-600",
    "bg-slate-800",
    "bg-emerald-600",
    "bg-blue-600",
    "bg-purple-600",
    "bg-orange-600",
  ];

  const name = project.name || "Projet";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return {
    id: project.id,
    name,
    initials: initials || "P",
    sector:
      project.description?.trim() ||
      "Projet",
    color:
      palette[index % palette.length],
    networks: [
      "facebook",
      "instagram",
      "linkedin",
      "tiktok",
      "google",
      "x",
    ],
  };
}

function mapPublication(
  publication: BackendPublication
): Publication | null {
  if (!publication.date) {
    return null;
  }

  const status = mapStatus(
    publication.status
  );

  return {
    id: publication.id,
    title: publication.title,
    date: publication.date.slice(0, 10),
    time: publication.time
      ? publication.time.slice(0, 5)
      : "--:--",
    network: publication.network,
    status,
    color: getPublicationColor(
      publication.network,
      status
    ),
  };
}

/* =========================================================
   PAGE
========================================================= */

export default function CalendarPage() {
  /* =======================================================
     PROJETS
  ======================================================= */

  const [projects, setProjects] = useState<
    Project[]
  >([]);

  const [activeProjectId, setActiveProjectId] =
    useState<number | null>(null);

  const [showProjectMenu, setShowProjectMenu] =
    useState(false);

  const [loadingProjects, setLoadingProjects] =
    useState(true);

  /* =======================================================
     PUBLICATIONS
  ======================================================= */

  const [publications, setPublications] =
    useState<Publication[]>([]);

  const [
    loadingPublications,
    setLoadingPublications,
  ] = useState(false);

  const [
    publicationError,
    setPublicationError,
  ] = useState("");

  /* =======================================================
     PROJET ACTUEL
  ======================================================= */

  const activeProject = useMemo(() => {
    if (projects.length === 0) {
      return null;
    }

    return (
      projects.find(
        (project) =>
          project.id === activeProjectId
      ) ?? projects[0]
    );
  }, [projects, activeProjectId]);

  /* =======================================================
     RÉSEAUX DU PROJET
  ======================================================= */

  const [
    selectedNetworks,
    setSelectedNetworks,
  ] = useState<NetworkId[]>([
    "facebook",
    "instagram",
    "linkedin",
    "tiktok",
    "google",
    "x",
  ]);

  /* =======================================================
     DATE
  ======================================================= */

  const [currentDate, setCurrentDate] =
    useState(new Date());

  /* =======================================================
     VUE
  ======================================================= */

  const [viewMode, setViewMode] =
    useState<ViewMode>("month");

  /* =======================================================
     CHARGER LES PROJETS
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      try {
        setLoadingProjects(true);

        const response = await api.get(
          "/api/projects"
        );

        const backendProjects: BackendProject[] =
          Array.isArray(response.data)
            ? response.data
            : response.data?.projects ?? [];

        if (cancelled) {
          return;
        }

        const mappedProjects =
          backendProjects.map(
            mapProject
          );

        setProjects(mappedProjects);

        if (mappedProjects.length > 0) {
          setActiveProjectId(
            (currentId) =>
              currentId ??
              mappedProjects[0].id
          );

          setSelectedNetworks(
            mappedProjects[0].networks
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des projets :",
          error
        );
      } finally {
        if (!cancelled) {
          setLoadingProjects(false);
        }
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     CHARGER LES PUBLICATIONS
  ======================================================= */

  useEffect(() => {
    if (!activeProjectId) {
      setPublications([]);
      return;
    }

    let cancelled = false;

    const loadPublications = async () => {
      try {
        setLoadingPublications(true);
        setPublicationError("");

        const response = await api.get(
          "/api/publications",
          {
            params: {
              project_id:
                activeProjectId,
            },
          }
        );

        const backendPublications: BackendPublication[] =
          Array.isArray(response.data)
            ? response.data
            : response.data?.publications ??
              [];

        const mappedPublications =
          backendPublications
            .map(mapPublication)
            .filter(
              (
                publication
              ): publication is Publication =>
                publication !== null
            );

        if (!cancelled) {
          setPublications(
            mappedPublications
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des publications :",
          error
        );

        if (!cancelled) {
          setPublications([]);
          setPublicationError(
            "Impossible de charger les publications."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingPublications(false);
        }
      }
    };

    loadPublications();

    return () => {
      cancelled = true;
    };
  }, [activeProjectId]);

  /* =======================================================
     MOIS
  ======================================================= */

  const monthName =
    currentDate.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });

  const formattedMonth =
    monthName.charAt(0).toUpperCase() +
    monthName.slice(1);

  /* =======================================================
     CHANGEMENT DE PROJET
  ======================================================= */

  const handleProjectChange = (
    project: Project
  ) => {
    setActiveProjectId(project.id);

    setSelectedNetworks(
      project.networks
    );

    setShowProjectMenu(false);
  };

  /* =======================================================
     NAVIGATION MOIS
  ======================================================= */

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  /* =======================================================
     CALENDRIER
  ======================================================= */

  const calendarDays = useMemo(() => {
    const year =
      currentDate.getFullYear();

    const month =
      currentDate.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    );

    const lastDay = new Date(
      year,
      month + 1,
      0
    );

    let startDay =
      firstDay.getDay();

    // Lundi = premier jour
    startDay =
      startDay === 0
        ? 6
        : startDay - 1;

    const totalDays =
      lastDay.getDate();

    const days: {
      date: Date;
      currentMonth: boolean;
    }[] = [];

    // Jours du mois précédent
    for (
      let i = startDay - 1;
      i >= 0;
      i--
    ) {
      const date = new Date(
        year,
        month,
        -i
      );

      days.push({
        date,
        currentMonth: false,
      });
    }

    // Jours du mois actuel
    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {
      days.push({
        date: new Date(
          year,
          month,
          day
        ),
        currentMonth: true,
      });
    }

    // Jours du mois suivant
    let nextDay = 1;

    while (days.length % 7 !== 0) {
      days.push({
        date: new Date(
          year,
          month + 1,
          nextDay
        ),
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  }, [currentDate]);

  /* =======================================================
     PUBLICATIONS D'UNE DATE
  ======================================================= */

  const getPublicationsForDate = (
    date: Date
  ) => {
    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const dateString =
      `${year}-${month}-${day}`;

    return publications.filter(
      (publication) => {
        const networkId =
          networkToId[
            publication.network
          ];

        return (
          publication.date ===
            dateString &&
          selectedNetworks.includes(
            networkId
          )
        );
      }
    );
  };

  /* =======================================================
     AUJOURD'HUI
  ======================================================= */

  const isToday = (date: Date) => {
    const today = new Date();

    return (
      date.getFullYear() ===
        today.getFullYear() &&
      date.getMonth() ===
        today.getMonth() &&
      date.getDate() ===
        today.getDate()
    );
  };

  /* =======================================================
     RÉSEAUX SÉLECTIONNÉS
  ======================================================= */

  const filteredPublications =
    publications.filter(
      (publication) => {
        const networkId =
          networkToId[
            publication.network
          ];

        return selectedNetworks.includes(
          networkId
        );
      }
    );

  /* =======================================================
     STATISTIQUES
  ======================================================= */

  const monthPublications =
    filteredPublications.filter(
      (publication) => {
        const publicationDate =
          new Date(
            `${publication.date}T12:00:00`
          );

        return (
          publicationDate.getFullYear() ===
            currentDate.getFullYear() &&
          publicationDate.getMonth() ===
            currentDate.getMonth()
        );
      }
    );

  const plannedCount =
    monthPublications.length;

  const scheduledCount =
    monthPublications.filter(
      (publication) =>
        publication.status ===
        "scheduled"
    ).length;

  const publishedCount =
    monthPublications.filter(
      (publication) =>
        publication.status ===
        "published"
    ).length;

  const draftCount =
    monthPublications.filter(
      (publication) =>
        publication.status ===
        "draft"
    ).length;

  /* =======================================================
     PROCHAINES PUBLICATIONS
  ======================================================= */

  const upcomingPublications =
    useMemo(() => {
      const now = new Date();

      return filteredPublications
        .filter(
          (publication) =>
            publication.status ===
            "scheduled"
        )
        .filter((publication) => {
          const date = new Date(
            `${publication.date}T${
              publication.time || "00:00"
            }:00`
          );

          return date >= now;
        })
        .sort((a, b) => {
          const dateA = new Date(
            `${a.date}T${
              a.time || "00:00"
            }:00`
          ).getTime();

          const dateB = new Date(
            `${b.date}T${
              b.time || "00:00"
            }:00`
          ).getTime();

          return dateA - dateB;
        })
        .slice(0, 5);
    }, [filteredPublications]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* GAUCHE */}

          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ChevronLeft size={18} />
            </Link>

            <div className="min-w-0">
              <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
                Organisation du contenu
              </p>

              <h1 className="truncate text-sm font-black sm:text-base">
                Calendrier
              </h1>
            </div>
          </div>

          {/* =================================================
              PROJET
          ================================================= */}

          <div className="flex flex-none items-center justify-center md:flex-1">
            <div className="relative">
              <button
                onClick={() =>
                  setShowProjectMenu(
                    (current) =>
                      !current
                  )
                }
                aria-expanded={
                  showProjectMenu
                }
                disabled={
                  loadingProjects ||
                  !activeProject
                }
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {activeProject ? (
                  <>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-lg text-[9px] font-black text-white ${activeProject.color}`}
                    >
                      {
                        activeProject.initials
                      }
                    </div>

                    <span className="hidden max-w-[120px] truncate sm:block">
                      {
                        activeProject.name
                      }
                    </span>
                  </>
                ) : (
                  <span className="text-slate-400">
                    Chargement...
                  </span>
                )}

                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    showProjectMenu
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* =================================================
                  MENU PROJETS
              ================================================= */}

              {showProjectMenu &&
                activeProject && (
                  <div className="absolute right-0 top-12 z-50 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    {/* HEADER */}

                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Mes projets
                      </p>

                      <p className="mt-1 text-[10px] text-slate-500">
                        Sélectionnez le
                        projet sur lequel
                        vous travaillez.
                      </p>
                    </div>

                    {/* LISTE */}

                    <div className="max-h-[360px] overflow-y-auto">
                      {projects.map(
                        (project) => {
                          const isActive =
                            activeProjectId ===
                            project.id;

                          return (
                            <button
                              key={
                                project.id
                              }
                              onClick={() =>
                                handleProjectChange(
                                  project
                                )
                              }
                              className={`group flex w-full items-start gap-3 border-b border-slate-50 px-4 py-3 text-left transition ${
                                isActive
                                  ? "bg-red-50/70"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              {/* LOGO */}

                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[9px] font-black text-white shadow-sm ${project.color}`}
                              >
                                {
                                  project.initials
                                }
                              </div>

                              {/* INFOS */}

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p
                                    className={`truncate text-[11px] font-black ${
                                      isActive
                                        ? "text-red-dark"
                                        : "text-slate-800"
                                    }`}
                                  >
                                    {
                                      project.name
                                    }
                                  </p>

                                  {isActive && (
                                    <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[7px] font-black uppercase text-red-dark">
                                      Actif
                                    </span>
                                  )}
                                </div>

                                <div className="mt-2 flex items-center gap-3">
                                  <span className="flex items-center gap-1 text-[8px] font-semibold text-slate-400">
                                    <BriefcaseBusiness
                                      size={
                                        10
                                      }
                                    />

                                    {
                                      project.sector
                                    }
                                  </span>

                                  <span className="flex items-center gap-1 text-[8px] font-semibold text-slate-400">
                                    <Globe2
                                      size={
                                        10
                                      }
                                    />

                                    {
                                      project
                                        .networks
                                        .length
                                    }{" "}
                                    réseaux
                                  </span>
                                </div>
                              </div>

                              {/* CHECK */}

                              <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                                {isActive ? (
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-dark text-white">
                                    <Check
                                      size={
                                        12
                                      }
                                      strokeWidth={
                                        3
                                      }
                                    />
                                  </span>
                                ) : (
                                  <span className="h-5 w-5 rounded-full border border-slate-200 opacity-0 transition group-hover:opacity-100" />
                                )}
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>

                    {/* PROJET ACTUEL */}

                    <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-red-dark shadow-sm">
                          <CheckCircle2
                            size={15}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                            Vous travaillez
                            actuellement
                            sur
                          </p>

                          <p className="truncate text-[10px] font-black text-slate-800">
                            {
                              activeProject.name
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CRÉER UN PROJET */}

                    <Link
                      href="/dashboard/projets"
                      onClick={() =>
                        setShowProjectMenu(
                          false
                        )
                      }
                      className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-3 text-xs font-bold text-red-600 transition hover:bg-red-50"
                    >
                      <Plus size={15} />
                      Créer un projet
                    </Link>
                  </div>
                )}
            </div>
          </div>

          {/* DROITE */}

          <div className="hidden items-center gap-3 sm:flex">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
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
        {/* INTRO */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Planifiez, organisez et
              suivez toutes vos
              publications au même
              endroit.
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Votre calendrier
              éditorial
            </h2>
          </div>

          <Link
            href="/dashboard/publication"
            className="flex w-fit items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
          >
            <Plus size={15} />
            Nouvelle publication
          </Link>
        </div>

        {/* ===================================================
            ERREUR
        =================================================== */}

        {publicationError && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[10px] font-semibold text-red-600">
            <AlertCircle size={15} />

            {publicationError}
          </div>
        )}

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <CalendarStat
            icon={
              <CalendarDays size={17} />
            }
            label="Publications prévues"
            value={String(
              plannedCount
            )}
            description="Ce mois-ci"
          />

          <CalendarStat
            icon={<Send size={17} />}
            label="Programmées"
            value={String(
              scheduledCount
            )}
            description="À venir"
          />

          <CalendarStat
            icon={
              <CheckCircle2 size={17} />
            }
            label="Publiées"
            value={String(
              publishedCount
            )}
            description="Ce mois-ci"
          />

          <CalendarStat
            icon={
              <FileText size={17} />
            }
            label="Brouillons"
            value={String(
              draftCount
            )}
            description="À finaliser"
          />
        </div>

        {/* ===================================================
            CALENDRIER
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* OUTILS */}

          <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            {/* MOIS */}

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={
                  previousMonth
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Mois précédent"
              >
                <ChevronLeft
                  size={17}
                />
              </button>

              <h2 className="min-w-[130px] text-center text-sm font-black sm:min-w-[160px] sm:text-base">
                {formattedMonth}
              </h2>

              <button
                onClick={nextMonth}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Mois suivant"
              >
                <ChevronRight
                  size={17}
                />
              </button>

              <button
                onClick={goToday}
                className="ml-1 rounded-xl border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Aujourd'hui
              </button>
            </div>

            {/* VUES */}

            <div className="flex w-fit rounded-xl bg-slate-100 p-1">
              <button
                onClick={() =>
                  setViewMode("month")
                }
                className={`rounded-lg px-4 py-2 text-[10px] font-bold transition ${
                  viewMode === "month"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Mois
              </button>

              <button
                onClick={() =>
                  setViewMode("week")
                }
                className={`rounded-lg px-4 py-2 text-[10px] font-bold transition ${
                  viewMode === "week"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Semaine
              </button>
            </div>
          </div>

          {/* =================================================
              CHARGEMENT
          ================================================= */}

          {loadingPublications ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-red-600" />

                <p className="text-[10px] font-semibold text-slate-400">
                  Chargement des
                  publications...
                </p>
              </div>
            </div>
          ) : viewMode === "month" ? (
            /* =================================================
               VUE MOIS
            ================================================= */

            <div className="overflow-x-auto">
              <div className="min-w-[850px]">
                {/* JOURS */}

                <div className="grid grid-cols-7 border-b border-slate-100">
                  {[
                    "Lun",
                    "Mar",
                    "Mer",
                    "Jeu",
                    "Ven",
                    "Sam",
                    "Dim",
                  ].map((day) => (
                    <div
                      key={day}
                      className="px-3 py-3 text-center text-[9px] font-black uppercase tracking-wider text-slate-400"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* CASES */}

                <div className="grid grid-cols-7">
                  {calendarDays.map(
                    ({
                      date,
                      currentMonth,
                    },
                    index
                  ) => {
                    const dayPublications =
                      getPublicationsForDate(
                        date
                      );

                    return (
                      <div
                        key={`${date.toISOString()}-${index}`}
                        className={`min-h-[145px] border-b border-r border-slate-100 p-2 ${
                          !currentMonth
                            ? "bg-slate-50/60"
                            : "bg-white"
                        }`}
                      >
                        {/* NUMÉRO */}

                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                              isToday(
                                date
                              )
                                ? "bg-red-600 text-white"
                                : currentMonth
                                ? "text-slate-700"
                                : "text-slate-300"
                            }`}
                          >
                            {date.getDate()}
                          </span>

                          {dayPublications.length >
                            0 && (
                            <span className="text-[8px] font-bold text-slate-400">
                              {
                                dayPublications.length
                              }
                            </span>
                          )}
                        </div>

                        {/* PUBLICATIONS */}

                        <div className="space-y-1.5">
                          {dayPublications.map(
                            (
                              publication
                            ) => (
                              <button
                                key={
                                  publication.id
                                }
                                className="group w-full rounded-lg border border-slate-100 bg-slate-50 p-2 text-left transition hover:border-red-200 hover:bg-red-50"
                              >
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${publication.color}`}
                                  />

                                  <span className="text-[8px] font-black text-slate-400">
                                    {
                                      publication.time
                                    }
                                  </span>

                                  <NetworkIcon
                                    network={
                                      publication.network
                                    }
                                    size={
                                      11
                                    }
                                  />
                                </div>

                                <p className="mt-1 line-clamp-2 text-[9px] font-bold leading-tight text-slate-700">
                                  {
                                    publication.title
                                  }
                                </p>

                                <div className="mt-1">
                                  {publication.status ===
                                    "published" && (
                                    <span className="text-[7px] font-bold text-emerald-600">
                                      Publiée
                                    </span>
                                  )}

                                  {publication.status ===
                                    "scheduled" && (
                                    <span className="text-[7px] font-bold text-red-500">
                                      Programmée
                                    </span>
                                  )}

                                  {publication.status ===
                                    "draft" && (
                                    <span className="text-[7px] font-bold text-slate-400">
                                      Brouillon
                                    </span>
                                  )}

                                  {publication.status ===
                                    "failed" && (
                                    <span className="text-[7px] font-bold text-red-600">
                                      Échec
                                    </span>
                                  )}
                                </div>
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <WeekView
              currentDate={
                currentDate
              }
              publications={
                filteredPublications
              }
            />
          )}
        </section>

        {/* ===================================================
            LÉGENDE
        =================================================== */}

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
          <Legend
            color="bg-red-500"
            label="Publication programmée"
          />

          <Legend
            color="bg-emerald-500"
            label="Publication publiée"
          />

          <Legend
            color="bg-slate-400"
            label="Brouillon"
          />

          <Legend
            color="bg-red-600"
            label="Échec"
          />
        </div>

        {/* ===================================================
            PROCHAINES PUBLICATIONS
        =================================================== */}

        <section className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* LISTE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-900">
                  Prochaines publications
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Les contenus prévus
                  dans les prochains
                  jours.
                </p>
              </div>

              <Link
                href="/dashboard/publication"
                className="text-[10px] font-bold text-red-600 hover:text-red-700"
              >
                Voir toutes
              </Link>
            </div>

            <div className="mt-5 divide-y divide-slate-100">
              {upcomingPublications.length >
              0 ? (
                upcomingPublications.map(
                  (publication) => (
                    <div
                      key={
                        publication.id
                      }
                      className="flex items-center gap-3 py-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                        <NetworkIcon
                          network={
                            publication.network
                          }
                          size={17}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-slate-800">
                          {
                            publication.title
                          }
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">
                          <CalendarDays
                            size={11}
                          />

                          {formatDate(
                            publication.date
                          )}

                          <span>
                            •
                          </span>

                          <Clock3
                            size={11}
                          />

                          {
                            publication.time
                          }
                        </p>
                      </div>

                      <button
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-900"
                        aria-label="Options"
                      >
                        <MoreHorizontal
                          size={16}
                        />
                      </button>
                    </div>
                  )
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
                    <CalendarDays
                      size={18}
                    />
                  </div>

                  <p className="mt-3 text-xs font-bold text-slate-500">
                    Aucune publication
                    programmée
                  </p>

                  <p className="mt-1 max-w-[260px] text-[9px] leading-relaxed text-slate-400">
                    Les publications
                    programmées de ce
                    projet apparaîtront
                    ici.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CONSEIL */}

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-5 text-white shadow-lg">
            <Sparkles className="absolute -right-4 -top-4 h-24 w-24 rotate-12 text-white/10" />

            <div className="relative z-10">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Sparkles
                  size={18}
                />
              </div>

              <h3 className="mt-4 text-sm font-black">
                Gardez une longueur
                d'avance
              </h3>

              <p className="mt-2 text-[10px] leading-relaxed text-red-100">
                Planifiez vos contenus
                à l'avance pour maintenir
                une présence régulière
                sur vos réseaux sociaux.
              </p>

              <Link
                href="/dashboard/publication"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[10px] font-black text-red-600 transition hover:bg-red-50"
              >
                <Plus size={14} />
                Créer une publication
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   STATISTIQUE
========================================================= */

function CalendarStat({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <span className="text-xl font-black text-slate-900">
          {value}
        </span>

        <span className="mb-1 text-[8px] font-medium text-slate-400">
          {description}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   LÉGENDE
========================================================= */

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[9px] font-medium text-slate-500">
      <span
        className={`h-2 w-2 rounded-full ${color}`}
      />

      {label}
    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatDate(date: string) {
  return new Date(
    `${date}T12:00:00`
  ).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}

/* =========================================================
   VUE SEMAINE
========================================================= */

function WeekView({
  currentDate,
  publications,
}: {
  currentDate: Date;
  publications: Publication[];
}) {
  /* =======================================================
     CALCUL DU LUNDI DE LA SEMAINE
  ======================================================= */

  const weekDays = useMemo(() => {
    const date = new Date(
      currentDate
    );

    const day =
      date.getDay();

    const difference =
      day === 0
        ? -6
        : 1 - day;

    const monday = new Date(
      date
    );

    monday.setDate(
      date.getDate() +
        difference
    );

    return Array.from(
      { length: 7 },
      (_, index) => {
        const weekDate =
          new Date(monday);

        weekDate.setDate(
          monday.getDate() +
            index
        );

        return weekDate;
      }
    );
  }, [currentDate]);

  /* =======================================================
     PUBLICATIONS D'UNE DATE
  ======================================================= */

  const getPublicationsForDate = (
    date: Date
  ) => {
    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const dateString =
      `${year}-${month}-${day}`;

    return publications
      .filter(
        (publication) =>
          publication.date ===
          dateString
      )
      .sort((a, b) =>
        a.time.localeCompare(
          b.time
        )
      );
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[850px]">
        {/* JOURS */}

        <div className="grid grid-cols-7 border-b border-slate-100">
          {weekDays.map(
            (date) => {
              const dayName =
                date.toLocaleDateString(
                  "fr-FR",
                  {
                    weekday:
                      "short",
                  }
                );

              return (
                <div
                  key={date.toISOString()}
                  className="border-r border-slate-100 p-3 text-center"
                >
                  <p className="text-[9px] font-black uppercase text-slate-400">
                    {dayName}
                  </p>

                  <p
                    className={`mx-auto mt-1 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${
                      isSameDay(
                        date,
                        new Date()
                      )
                        ? "bg-red-600 text-white"
                        : "text-slate-700"
                    }`}
                  >
                    {date.getDate()}
                  </p>
                </div>
              );
            }
          )}
        </div>

        {/* CONTENU */}

        <div className="grid min-h-[420px] grid-cols-7">
          {weekDays.map(
            (date) => {
              const dayPublications =
                getPublicationsForDate(
                  date
                );

              return (
                <div
                  key={date.toISOString()}
                  className="border-r border-slate-100 p-2"
                >
                  {dayPublications.length >
                  0 ? (
                    <div className="space-y-2">
                      {dayPublications.map(
                        (
                          publication
                        ) => (
                          <div
                            key={
                              publication.id
                            }
                            className="rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-red-200 hover:bg-red-50"
                          >
                            <div className="flex items-center gap-1.5">
                              <NetworkIcon
                                network={
                                  publication.network
                                }
                                size={
                                  14
                                }
                              />

                              <span className="text-[8px] font-black text-slate-400">
                                {
                                  publication.time
                                }
                              </span>
                            </div>

                            <p className="mt-2 text-[9px] font-bold leading-tight text-slate-700">
                              {
                                publication.title
                              }
                            </p>

                            {publication.status ===
                              "published" && (
                              <span className="mt-2 inline-flex rounded-md bg-emerald-100 px-2 py-1 text-[7px] font-bold text-emerald-600">
                                Publiée
                              </span>
                            )}

                            {publication.status ===
                              "scheduled" && (
                              <span className="mt-2 inline-flex rounded-md bg-red-100 px-2 py-1 text-[7px] font-bold text-red-600">
                                Programmée
                              </span>
                            )}

                            {publication.status ===
                              "draft" && (
                              <span className="mt-2 inline-flex rounded-md bg-slate-200 px-2 py-1 text-[7px] font-bold text-slate-500">
                                Brouillon
                              </span>
                            )}

                            {publication.status ===
                              "failed" && (
                              <span className="mt-2 inline-flex rounded-md bg-red-100 px-2 py-1 text-[7px] font-bold text-red-600">
                                Échec
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="min-h-[100px]" />
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPARAISON DE DATES
========================================================= */

function isSameDay(
  first: Date,
  second: Date
) {
  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
}