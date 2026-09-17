"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Megaphone,
  PlayCircle,
  PauseCircle,
  XCircle,
} from "lucide-react";

import api from "@/lib/axios";

/* =========================================================
   TYPES
========================================================= */

type Project = {
  id: number;
  name: string;
};

/* =========================================================
   PAGE
========================================================= */

export default function NouvelleCampagnePage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("scheduled");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loadingProjects, setLoadingProjects] =
    useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /* =======================================================
     CHARGER LES PROJETS
  ======================================================= */

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoadingProjects(true);

        const response = await api.get(
          "/api/projects"
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.projects || [];

        setProjects(data);
      } catch (err: any) {
        console.error(
          "Erreur chargement projets :",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Impossible de charger les projets."
        );
      } finally {
        setLoadingProjects(false);
      }
    };

    loadProjects();
  }, []);

  /* =======================================================
     CRÉER LA CAMPAGNE
  ======================================================= */

  const createCampaign = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);

    if (!name.trim()) {
      setError(
        "Le nom de la campagne est obligatoire."
      );
      return;
    }

    if (
      startDate &&
      endDate &&
      endDate < startDate
    ) {
      setError(
        "La date de fin doit être supérieure ou égale à la date de début."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: name.trim(),
        description: description.trim() || null,
        project_id: projectId
          ? Number(projectId)
          : null,
        status,
        start_date: startDate || null,
        end_date: endDate || null,
      };

      await api.post(
        "/api/campaigns",
        payload
      );

      router.push(
        "/dashboard/campagnes"
      );
    } catch (err: any) {
      console.error(
        "Erreur création campagne :",
        err
      );

      const validationErrors =
        err?.response?.data?.errors;

      if (validationErrors) {
        const firstError =
          Object.values(
            validationErrors
          )[0];

        if (Array.isArray(firstError)) {
          setError(
            String(firstError[0])
          );
        } else {
          setError(
            String(firstError)
          );
        }
      } else {
        setError(
          err?.response?.data?.message ||
            "Impossible de créer la campagne."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

        <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">

          <Link
            href="/dashboard/campagnes"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Retour aux campagnes"
          >
            <ArrowLeft size={17} />
          </Link>

          <div className="min-w-0 pl-0">

            <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
              Marketing
            </p>

            <h1 className="truncate text-base font-black sm:text-lg">
              Nouvelle campagne
            </h1>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">

        {/* INTRO */}

        <div className="mb-7">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Megaphone size={22} />
            </div>

            <div>

              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                Créer une campagne
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                Créez une campagne pour organiser vos
                publications et suivre vos actions marketing.
              </p>

            </div>

          </div>

        </div>

        {/* ===================================================
            FORMULAIRE
        =================================================== */}

        <form
          onSubmit={createCampaign}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* INFORMATIONS */}

          <div className="border-b border-slate-100 p-5 sm:p-7">

            <div className="mb-6">

              <h3 className="text-sm font-black text-slate-900">
                Informations de la campagne
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Définissez les informations principales de votre campagne.
              </p>

            </div>

            <div className="space-y-5">

              {/* NOM */}

              <div>

                <label
                  htmlFor="campaign-name"
                  className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-600"
                >
                  Nom de la campagne
                  <span className="ml-1 text-red-600">
                    *
                  </span>
                </label>

                <input
                  id="campaign-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Ex. Lancement formation Flutter"
                  maxLength={255}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium outline-none transition placeholder:text-slate-300 focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="campaign-description"
                  className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-600"
                >
                  Description
                </label>

                <textarea
                  id="campaign-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Décrivez l'objectif de cette campagne..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium outline-none transition placeholder:text-slate-300 focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
                />

              </div>

              {/* PROJET */}

              <div>

                <label
                  htmlFor="campaign-project"
                  className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-600"
                >
                  Projet associé
                </label>

                <select
                  id="campaign-project"
                  value={projectId}
                  onChange={(event) =>
                    setProjectId(
                      event.target.value
                    )
                  }
                  disabled={loadingProjects}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/5 disabled:cursor-not-allowed disabled:bg-slate-50"
                >

                  <option value="">
                    {loadingProjects
                      ? "Chargement des projets..."
                      : "Aucun projet"}
                  </option>

                  {projects.map(
                    (project) => (
                      <option
                        key={project.id}
                        value={project.id}
                      >
                        {project.name}
                      </option>
                    )
                  )}

                </select>

                <p className="mt-1.5 text-[9px] text-slate-400">
                  Vous pouvez associer cette campagne à l'un de vos projets.
                </p>

              </div>

            </div>

          </div>

          {/* PLANIFICATION */}

          <div className="border-b border-slate-100 p-5 sm:p-7">

            <div className="mb-6">

              <h3 className="text-sm font-black text-slate-900">
                Planification
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Définissez le statut et la période de votre campagne.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              {/* STATUT */}

              <div>

                <label
                  htmlFor="campaign-status"
                  className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-600"
                >
                  Statut
                </label>

                <select
                  id="campaign-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
                >

                  <option value="scheduled">
                    Programmée
                  </option>

                  <option value="active">
                    Active
                  </option>

                  <option value="paused">
                    En pause
                  </option>

                  <option value="completed">
                    Terminée
                  </option>

                </select>

              </div>

              {/* DATE DÉBUT */}

              <div>

                <label
                  htmlFor="campaign-start"
                  className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-600"
                >
                  Date de début
                </label>

                <div className="relative">

                  <CalendarDays
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="campaign-start"
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                      setStartDate(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-xs font-medium outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
                  />

                </div>

              </div>

              {/* DATE FIN */}

              <div>

                <label
                  htmlFor="campaign-end"
                  className="mb-2 block text-[10px] font-black uppercase tracking-wide text-slate-600"
                >
                  Date de fin
                </label>

                <div className="relative">

                  <CalendarDays
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="campaign-end"
                    type="date"
                    min={startDate || undefined}
                    value={endDate}
                    onChange={(event) =>
                      setEndDate(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-xs font-medium outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ERREUR */}

          {error && (

            <div className="mx-5 mt-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:mx-7">

              <XCircle
                size={17}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>

                <p className="text-[10px] font-black text-red-700">
                  Impossible de créer la campagne
                </p>

                <p className="mt-1 text-[10px] leading-relaxed text-red-600">
                  {error}
                </p>

              </div>

            </div>

          )}

          {/* ACTIONS */}

          <div className="flex flex-col-reverse gap-3 p-5 sm:flex-row sm:items-center sm:justify-end sm:p-7">

            <Link
              href="/dashboard/campagnes"
              className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-wide text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            >
              Annuler
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-[10px] font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Création...
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} />
                  Créer la campagne
                </>
              )}

            </button>

          </div>

        </form>

        {/* ===================================================
            INFORMATION
        =================================================== */}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
              <FileText size={16} />
            </div>

            <div>

              <h3 className="text-[11px] font-black text-slate-700">
                Après la création
              </h3>

              <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                Vous pourrez ensuite associer vos publications
                à cette campagne depuis votre espace de publication.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
