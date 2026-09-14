"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import axios from "@/lib/axios";

type Plan = {
  id: number;
  nom: string;
  type: string;
  description: string;
  prix: number;
  devise: string;
  duree: number;
  duree_unite: string;
  position: number;
  statut: string;
  trial: boolean;
  trial_duration: number | null;
  features: string[];
};

const EMPTY_FORM = {
  nom: "",
  type: "particulier",
  description: "",
  prix: 0,
  devise: "XOF",
  duree: 1,
  duree_unite: "mois",
  position: 1,
  statut: "actif",
  trial: false,
  trial_duration: 0,
  features: "",
};

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadPlans = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/admin/plans");

      setPlans(response.data.plans ?? []);
    } catch (error) {
      console.error("Erreur chargement plans :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setErrorMessage("");
    setShowForm(true);
  };

  const openEdit = (plan: Plan) => {
    setEditing(plan);

    setForm({
      nom: plan.nom,
      type: plan.type,
      description: plan.description ?? "",
      prix: plan.prix,
      devise: plan.devise,
      duree: plan.duree,
      duree_unite: plan.duree_unite,
      position: plan.position,
      statut: plan.statut,
      trial: plan.trial,
      trial_duration: plan.trial_duration ?? 0,
      features: (plan.features ?? []).join("\n"),
    });

    setErrorMessage("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.nom.trim()) {
      setErrorMessage("Le nom du plan est obligatoire.");
      return;
    }

    if (Number(form.prix) < 0) {
      setErrorMessage("Le prix ne peut pas être négatif.");
      return;
    }

    if (Number(form.duree) < 1) {
      setErrorMessage("La durée doit être supérieure ou égale à 1.");
      return;
    }

    if (form.trial && Number(form.trial_duration) < 1) {
      setErrorMessage(
        "La durée de l'essai gratuit doit être supérieure ou égale à 1 jour.",
      );
      return;
    }

    setSaving(true);
    setErrorMessage("");

    const payload = {
      nom: form.nom.trim(),
      type: form.type,
      description: form.description.trim(),
      prix: Number(form.prix),
      devise: form.devise,
      duree: Number(form.duree),
      duree_unite: form.duree_unite,
      position: Number(form.position),
      statut: form.statut,
      trial: form.trial,
      trial_duration: form.trial
        ? Number(form.trial_duration)
        : null,
      features: form.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean),
    };

    try {
      if (editing) {
        await axios.put(
          `/api/admin/plans/${editing.id}`,
          payload,
        );
      } else {
        await axios.post("/api/admin/plans", payload);
      }

      setShowForm(false);
      setEditing(null);
      setForm(EMPTY_FORM);

      await loadPlans();
    } catch (error: any) {
      console.error(
        "Erreur enregistrement plan :",
        error,
      );

      const validationErrors =
        error.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(
          validationErrors,
        )[0] as string[] | undefined;

        setErrorMessage(
          firstError?.[0] ||
            "Veuillez vérifier les informations saisies.",
        );
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            "Erreur lors de l'enregistrement.",
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (plan: Plan) => {
    const confirmation = window.confirm(
      `Supprimer le plan "${plan.nom}" ?`,
    );

    if (!confirmation) {
      return;
    }

    setDeletingId(plan.id);
    setErrorMessage("");

    try {
      await axios.delete(
        `/api/admin/plans/${plan.id}`,
      );

      setPlans((currentPlans) =>
        currentPlans.filter(
          (currentPlan) => currentPlan.id !== plan.id,
        ),
      );
    } catch (error: any) {
      console.error(
        "Erreur suppression :",
        error,
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Impossible de supprimer ce plan.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Plans
          </h1>

          <p className="text-sm text-slate-500">
            Gérez les offres d'abonnement.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-red-light text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-red-700 transition"
        >
          <Plus size={15} />
          Nouveau plan
        </button>
      </div>

      {errorMessage && !showForm && (
        <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-medium text-red-600">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            className="animate-spin text-red-light"
            size={28}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-black text-slate-900">
                  {plan.nom}
                </h3>

                <span
                  className={`text-[9px] font-bold px-2 py-1 rounded-lg ${
                    plan.statut === "actif"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {plan.statut}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-3">
                {plan.description}
              </p>

              <p className="text-lg font-black text-slate-900 mb-4">
                {plan.prix} {plan.devise} / {plan.duree}{" "}
                {plan.duree_unite}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(plan)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition"
                >
                  <Pencil size={13} />
                  Modifier
                </button>

                <button
                  onClick={() => handleDelete(plan)}
                  disabled={deletingId === plan.id}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition disabled:cursor-not-allowed disabled:opacity-50"
                  title="Supprimer"
                >
                  {deletingId === plan.id ? (
                    <Loader2
                      size={13}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={13} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-5">
              {editing
                ? "Modifier le plan"
                : "Nouveau plan"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                value={form.nom}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nom: e.target.value,
                  })
                }
                placeholder="Nom du plan"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light"
              />

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light resize-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="0"
                  value={form.prix}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      prix: Number(e.target.value),
                    })
                  }
                  placeholder="Prix"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light"
                />

                <select
                  value={form.devise}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      devise: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light"
                >
                  <option value="XOF">XOF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="1"
                  value={form.duree}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duree: Number(e.target.value),
                    })
                  }
                  placeholder="Durée"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light"
                />

                <select
                  value={form.duree_unite}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duree_unite: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light"
                >
                  <option value="jour">Jour(s)</option>
                  <option value="mois">Mois</option>
                  <option value="annee">Année(s)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light"
                >
                  <option value="particulier">
                    Particulier
                  </option>
                  <option value="entreprise">
                    Entreprise
                  </option>
                  <option value="agence">
                    Agence
                  </option>
                </select>

                <select
                  value={form.statut}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      statut: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">
                    Inactif
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.trial}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      trial: e.target.checked,
                    })
                  }
                  id="trial"
                  className="w-4 h-4"
                />

                <label
                  htmlFor="trial"
                  className="text-xs font-bold text-slate-600"
                >
                  Essai gratuit
                </label>

                {form.trial && (
                  <input
                    type="number"
                    min="1"
                    value={form.trial_duration}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        trial_duration: Number(
                          e.target.value,
                        ),
                      })
                    }
                    placeholder="Jours"
                    className="ml-auto w-24 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs outline-none"
                  />
                )}
              </div>

              <textarea
                value={form.features}
                onChange={(e) =>
                  setForm({
                    ...form,
                    features: e.target.value,
                  })
                }
                placeholder="Fonctionnalités (une par ligne)"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light resize-none"
              />
            </div>

            {errorMessage && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-medium text-red-600">
                {errorMessage}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full mt-5 py-3.5 bg-red-light text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition disabled:opacity-50"
            >
              {saving
                ? "Enregistrement..."
                : editing
                  ? "Mettre à jour"
                  : "Créer le plan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}