"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  Loader2,
  Save,
  FileText,
  CircleAlert,
} from "lucide-react";

import api from "@/lib/axios";

type Campaign = {
  id: number;
  name: string;
  description: string | null;
  status: "active" | "scheduled" | "completed" | "paused";
  start_date: string | null;
  end_date: string | null;
  project: {
    id: number;
    name: string;
  } | null;
  project_id: number | null;
};

type Project = {
  id: number;
  name: string;
};

export default function ModifierCampagnePage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState<
    "active" | "scheduled" | "completed" | "paused"
  >("scheduled");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [campaignResponse, projectsResponse] = await Promise.all([
          api.get(`/api/campaigns/${id}`),
          api.get("/api/projects"),
        ]);

        const campaignData: Campaign = campaignResponse.data;

        const projectsData = Array.isArray(projectsResponse.data)
          ? projectsResponse.data
          : projectsResponse.data?.projects ?? [];

        setCampaign(campaignData);
        setProjects(projectsData);

        setName(campaignData.name ?? "");
        setDescription(campaignData.description ?? "");
        setProjectId(
          campaignData.project_id
            ? String(campaignData.project_id)
            : ""
        );
        setStatus(campaignData.status ?? "scheduled");
        setStartDate(campaignData.start_date ?? "");
        setEndDate(campaignData.end_date ?? "");
      } catch (err: any) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            "Impossible de charger la campagne."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Le nom de la campagne est obligatoire.");
      return;
    }

    if (startDate && endDate && endDate < startDate) {
      setError(
        "La date de fin doit être supérieure ou égale à la date de début."
      );
      return;
    }

    try {
      setSaving(true);

      await api.put(`/api/campaigns/${id}`, {
        name: name.trim(),
        description: description.trim() || null,
        project_id: projectId ? Number(projectId) : null,
        status,
        start_date: startDate || null,
        end_date: endDate || null,
      });

      setSuccess("Campagne modifiée avec succès.");

      setTimeout(() => {
        router.push(`/dashboard/campagnes/${id}`);
      }, 700);
    } catch (err: any) {
      console.error(err);

      const backendErrors = err?.response?.data?.errors;

      if (backendErrors) {
        const firstError = Object.values(backendErrors)
          .flat()
          .find(Boolean);

        setError(
          typeof firstError === "string"
            ? firstError
            : "Une erreur est survenue lors de la modification."
        );
      } else {
        setError(
          err?.response?.data?.message ||
            "Impossible de modifier la campagne."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <Loader2 className="h-7 w-7 animate-spin text-red-600" />
            <p className="text-sm">Chargement de la campagne...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!campaign) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard/campagnes"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-600"
          >
            <ArrowLeft size={16} />
            Retour aux campagnes
          </Link>

          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <CircleAlert className="mx-auto mb-3 h-8 w-8 text-red-500" />

            <h1 className="text-lg font-bold text-slate-900">
              Campagne introuvable
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Cette campagne n'existe pas ou vous n'avez pas accès à celle-ci.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Retour */}
        <Link
          href={`/dashboard/campagnes/${id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-600"
        >
          <ArrowLeft size={16} />
          Retour à la campagne
        </Link>

        {/* En-tête */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-600">
            <CalendarDays size={17} />
            Campagnes
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Modifier la campagne
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Modifiez les informations de votre campagne.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />

            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Informations de la campagne
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Modifiez les informations générales de cette campagne.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              {/* Nom */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Nom de la campagne{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ex. Lancement Griot AI"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <FileText size={16} />
                  Description
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Décrivez l'objectif de cette campagne..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Projet */}
              <div>
                <label
                  htmlFor="project"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <FolderKanban size={16} />
                  Projet associé
                </label>

                <select
                  id="project"
                  value={projectId}
                  onChange={(event) =>
                    setProjectId(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Aucun projet</option>

                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Statut */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Statut
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as
                        | "active"
                        | "scheduled"
                        | "completed"
                        | "paused"
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="scheduled">Programmée</option>
                  <option value="active">Active</option>
                  <option value="paused">En pause</option>
                  <option value="completed">Terminée</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="startDate"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Date de début
                  </label>

                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                      setStartDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Date de fin
                  </label>

                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    min={startDate || undefined}
                    onChange={(event) =>
                      setEndDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
              <Link
                href={`/dashboard/campagnes/${id}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Annuler
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}