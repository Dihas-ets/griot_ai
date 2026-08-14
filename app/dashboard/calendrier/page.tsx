"use client";

import React, { useMemo, useState } from "react";
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
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ViewMode = "month" | "week";

type Publication = {
  id: number;
  title: string;
  date: string;
  time: string;
  network: "Facebook" | "Instagram" | "LinkedIn";
  status: "scheduled" | "published" | "draft";
  color: string;
};

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

/* =========================================================
   DONNÉES
========================================================= */

const publications: Publication[] = [
  {
    id: 1,
    title: "Nouvelle formation Flutter",
    date: "2026-08-04",
    time: "10:00",
    network: "Facebook",
    status: "published",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Conseils pour développer son activité",
    date: "2026-08-06",
    time: "14:30",
    network: "Instagram",
    status: "published",
    color: "bg-pink-500",
  },
  {
    id: 3,
    title: "Les outils indispensables du développeur",
    date: "2026-08-13",
    time: "09:00",
    network: "LinkedIn",
    status: "scheduled",
    color: "bg-sky-600",
  },
  {
    id: 4,
    title: "Formation Flutter : inscriptions ouvertes",
    date: "2026-08-15",
    time: "11:00",
    network: "Instagram",
    status: "scheduled",
    color: "bg-pink-500",
  },
  {
    id: 5,
    title: "Pourquoi utiliser Flutter en 2026 ?",
    date: "2026-08-18",
    time: "16:00",
    network: "LinkedIn",
    status: "scheduled",
    color: "bg-sky-600",
  },
  {
    id: 6,
    title: "Découvrez nos nouvelles formations",
    date: "2026-08-21",
    time: "10:30",
    network: "Facebook",
    status: "scheduled",
    color: "bg-blue-500",
  },
  {
    id: 7,
    title: "Retour sur notre dernière formation",
    date: "2026-08-24",
    time: "13:00",
    network: "Instagram",
    status: "scheduled",
    color: "bg-pink-500",
  },
  {
    id: 8,
    title: "Les compétences digitales à développer",
    date: "2026-08-27",
    time: "09:30",
    network: "LinkedIn",
    status: "draft",
    color: "bg-slate-400",
  },
];

/* =========================================================
   ICONES RÉSEAUX
========================================================= */

function NetworkIcon({
  network,
  size = 14,
}: {
  network: Publication["network"];
  size?: number;
}) {
  if (network === "Facebook") {
    return <FacebookIcon size={size} />;
  }

  if (network === "Instagram") {
    return <InstagramIcon size={size} />;
  }

  return <LinkedinIcon size={size} />;
}

/* =========================================================
   PAGE
========================================================= */

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 7, 13)
  );

  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const [showProjectMenu, setShowProjectMenu] = useState(false);

  const monthName = currentDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const formattedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);

  /* =======================================================
     NAVIGATION
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
    setCurrentDate(new Date(2026, 7, 13));
  };

  /* =======================================================
     CALENDRIER
  ======================================================= */

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDay = firstDay.getDay();

    // Lundi = premier jour
    startDay = startDay === 0 ? 6 : startDay - 1;

    const totalDays = lastDay.getDate();

    const days = [];

    // Jours du mois précédent
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);

      days.push({
        date,
        currentMonth: false,
      });
    }

    // Jours du mois actuel
    for (let day = 1; day <= totalDays; day++) {
      days.push({
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    // Compléter la dernière semaine
    let nextDay = 1;

    while (days.length % 7 !== 0) {
      days.push({
        date: new Date(year, month + 1, nextDay),
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  }, [currentDate]);

  /* =======================================================
     PUBLICATIONS D'UN JOUR
  ======================================================= */

  const getPublicationsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];

    return publications.filter(
      (publication) => publication.date === dateString
    );
  };

  const isToday = (date: Date) => {
    return (
      date.getFullYear() === 2026 &&
      date.getMonth() === 7 &&
      date.getDate() === 13
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
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

          {/* PROJET */}

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
        {/* ===================================================
            INTRO
        =================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Planifiez, organisez et suivez toutes vos
              publications au même endroit.
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Votre calendrier éditorial
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
            STATISTIQUES
        =================================================== */}

        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <CalendarStat
            icon={<CalendarDays size={17} />}
            label="Publications prévues"
            value="8"
            description="Ce mois-ci"
          />

          <CalendarStat
            icon={<Send size={17} />}
            label="Programmées"
            value="5"
            description="À venir"
          />

          <CalendarStat
            icon={<CheckCircle2 size={17} />}
            label="Publiées"
            value="3"
            description="Ce mois-ci"
          />

          <CalendarStat
            icon={<FileText size={17} />}
            label="Brouillons"
            value="1"
            description="À finaliser"
          />
        </div>

        {/* ===================================================
            OUTILS CALENDRIER
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            {/* MOIS */}

            <div className="flex items-center gap-3">
              <button
                onClick={previousMonth}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Mois précédent"
              >
                <ChevronLeft size={17} />
              </button>

              <h2 className="min-w-[160px] text-center text-sm font-black sm:text-base">
                {formattedMonth}
              </h2>

              <button
                onClick={nextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Mois suivant"
              >
                <ChevronRight size={17} />
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
                onClick={() => setViewMode("month")}
                className={`rounded-lg px-4 py-2 text-[10px] font-bold transition ${
                  viewMode === "month"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Mois
              </button>

              <button
                onClick={() => setViewMode("week")}
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
              CALENDRIER
          ================================================= */}

          {viewMode === "month" ? (
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
                    ({ date, currentMonth }, index) => {
                      const dayPublications =
                        getPublicationsForDate(date);

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
                                isToday(date)
                                  ? "bg-red-600 text-white"
                                  : currentMonth
                                  ? "text-slate-700"
                                  : "text-slate-300"
                              }`}
                            >
                              {date.getDate()}
                            </span>

                            {dayPublications.length > 0 && (
                              <span className="text-[8px] font-bold text-slate-400">
                                {dayPublications.length}
                              </span>
                            )}
                          </div>

                          {/* PUBLICATIONS */}

                          <div className="space-y-1.5">
                            {dayPublications.map(
                              (publication) => (
                                <button
                                  key={publication.id}
                                  className="group w-full rounded-lg border border-slate-100 bg-slate-50 p-2 text-left transition hover:border-red-200 hover:bg-red-50"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${publication.color}`}
                                    />

                                    <span className="text-[8px] font-black text-slate-400">
                                      {publication.time}
                                    </span>

                                    <NetworkIcon
                                      network={
                                        publication.network
                                      }
                                      size={11}
                                    />
                                  </div>

                                  <p className="mt-1 line-clamp-2 text-[9px] font-bold leading-tight text-slate-700">
                                    {publication.title}
                                  </p>

                                  <div className="mt-1 flex items-center gap-1">
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
                                  </div>
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          ) : (
            <WeekView />
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
                  Les contenus prévus dans les prochains jours.
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
              {publications
                .filter(
                  (publication) =>
                    publication.status === "scheduled"
                )
                .slice(0, 5)
                .map((publication) => (
                  <div
                    key={publication.id}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                      <NetworkIcon
                        network={publication.network}
                        size={17}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {publication.title}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">
                        <CalendarDays size={11} />

                        {formatDate(publication.date)}

                        <span>•</span>

                        <Clock3 size={11} />

                        {publication.time}
                      </p>
                    </div>

                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* CONSEIL */}

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-5 text-white shadow-lg">
            <Sparkles className="absolute -right-4 -top-4 h-24 w-24 rotate-12 text-white/10" />

            <div className="relative z-10">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Sparkles size={18} />
              </div>

              <h3 className="mt-4 text-sm font-black">
                Gardez une longueur d'avance
              </h3>

              <p className="mt-2 text-[10px] leading-relaxed text-red-100">
                Planifiez vos contenus à l'avance pour maintenir
                une présence régulière sur vos réseaux sociaux.
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
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatDate(date: string) {
  const formatted = new Date(
    `${date}T12:00:00`
  ).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  return formatted;
}

/* =========================================================
   VUE SEMAINE
========================================================= */

function WeekView() {
  const weekDays = [
    {
      day: "Lun",
      date: "10",
    },
    {
      day: "Mar",
      date: "11",
    },
    {
      day: "Mer",
      date: "12",
    },
    {
      day: "Jeu",
      date: "13",
    },
    {
      day: "Ven",
      date: "14",
    },
    {
      day: "Sam",
      date: "15",
    },
    {
      day: "Dim",
      date: "16",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[850px]">
        <div className="grid grid-cols-7 border-b border-slate-100">
          {weekDays.map((day) => (
            <div
              key={day.date}
              className="border-r border-slate-100 p-3 text-center"
            >
              <p className="text-[9px] font-black uppercase text-slate-400">
                {day.day}
              </p>

              <p
                className={`mx-auto mt-1 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${
                  day.date === "13"
                    ? "bg-red-600 text-white"
                    : "text-slate-700"
                }`}
              >
                {day.date}
              </p>
            </div>
          ))}
        </div>

        <div className="grid min-h-[420px] grid-cols-7">
          {weekDays.map((day) => (
            <div
              key={day.date}
              className="border-r border-slate-100 p-2"
            >
              {day.date === "13" && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3">
                  <div className="flex items-center gap-1.5">
                    <LinkedinIcon/>

                    <span className="text-[8px] font-black text-slate-400">
                      09:00
                    </span>
                  </div>

                  <p className="mt-2 text-[9px] font-bold leading-tight text-slate-700">
                    Les outils indispensables du développeur
                  </p>

                  <span className="mt-2 inline-flex rounded-md bg-red-100 px-2 py-1 text-[7px] font-bold text-red-600">
                    Programmée
                  </span>
                </div>
              )}

              {day.date === "15" && (
                <div className="rounded-xl border border-pink-100 bg-pink-50 p-3">
                  <div className="flex items-center gap-1.5">
                    <InstagramIcon/>

                    <span className="text-[8px] font-black text-slate-400">
                      11:00
                    </span>
                  </div>

                  <p className="mt-2 text-[9px] font-bold leading-tight text-slate-700">
                    Formation Flutter : inscriptions ouvertes
                  </p>

                  <span className="mt-2 inline-flex rounded-md bg-red-100 px-2 py-1 text-[7px] font-bold text-red-600">
                    Programmée
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}