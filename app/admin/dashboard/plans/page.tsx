"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Check,
  Crown,
  Building2,
  Users,
  User,
  Sparkles,
} from "lucide-react";
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

function getTypeLabel(type: string) {
  switch (type) {
    case "particulier":
      return "Particulier";

    case "entreprise":
      return "Entreprise";

    case "agence":
      return "Agence";

    default:
      return type;
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "particulier":
      return User;

    case "entreprise":
      return Building2;

    case "agence":
      return Users;

    default:
      return Sparkles;
  }
}

function getDurationLabel(
  duree: number,
  unite: string,
) {
  if (unite === "jour") {
    return duree > 1 ? "jours" : "jour";
  }

  if (unite === "annee") {
    return duree > 1 ? "ans" : "an";
  }

  return duree > 1 ? "mois" : "mois";
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] =
    useState<Plan | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] =
    useState(EMPTY_FORM);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  const loadPlans = async () => {
    setLoading(true);

    try {
      const response =
        await axios.get("/api/admin/plans");

      setPlans(response.data.plans ?? []);
    } catch (error) {
      console.error(
        "Erreur chargement plans :",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const openCreate = () => {
    setEditing(null);

    setForm({
      ...EMPTY_FORM,
      position: plans.length + 1,
    });

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
      trial_duration:
        plan.trial_duration ?? 0,
      features:
        (plan.features ?? []).join("\n"),
    });

    setErrorMessage("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setErrorMessage("");
  };

  const handleSave = async () => {
    if (!form.nom.trim()) {
      setErrorMessage(
        "Le nom du plan est obligatoire.",
      );
      return;
    }

    if (Number(form.prix) < 0) {
      setErrorMessage(
        "Le prix ne peut pas être négatif.",
      );
      return;
    }

    if (Number(form.duree) < 1) {
      setErrorMessage(
        "La durée doit être supérieure ou égale à 1.",
      );
      return;
    }

    if (
      form.trial &&
      Number(form.trial_duration) < 1
    ) {
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
        .map((feature) =>
          feature.trim(),
        )
        .filter(Boolean),
    };

    try {
      if (editing) {
        await axios.put(
          `/api/admin/plans/${editing.id}`,
          payload,
        );
      } else {
        await axios.post(
          "/api/admin/plans",
          payload,
        );
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
        const firstError =
          Object.values(
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

  const handleDelete = async (
    plan: Plan,
  ) => {
    const confirmation =
      window.confirm(
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
          (currentPlan) =>
            currentPlan.id !== plan.id,
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
    <div className="min-h-full pb-10">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-8">

        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <Crown
                size={18}
                className="text-red-light"
              />
            </div>

            <h1 className="text-2xl font-black text-slate-900">
              Plans & Tarifs
            </h1>
          </div>

          <p className="text-sm text-slate-500">
            Gérez les offres disponibles pour
            vos utilisateurs.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 bg-red-light text-white px-5 py-3 rounded-xl text-xs font-black shadow-lg shadow-red-light/20 hover:bg-red-700 transition active:scale-95"
        >
          <Plus size={16} />
          Nouveau plan
        </button>
      </div>

      {/* =====================================================
          ERROR GLOBAL
      ===================================================== */}

      {errorMessage && !showForm && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-semibold text-red-600">
          {errorMessage}
        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2
            className="animate-spin text-red-light"
            size={30}
          />
        </div>
      ) : plans.length === 0 ? (

        /* ===================================================
           EMPTY
        =================================================== */

        <div className="bg-white border border-slate-200 rounded-3xl py-20 px-6 text-center shadow-sm">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-50 flex items-center justify-center">
            <Crown
              size={28}
              className="text-red-light"
            />
          </div>

          <h2 className="text-lg font-black text-slate-900 mb-2">
            Aucun plan disponible
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Commencez par créer votre premier
            plan d'abonnement.
          </p>

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-red-light text-white px-5 py-3 rounded-xl text-xs font-black hover:bg-red-700 transition"
          >
            <Plus size={15} />
            Créer un plan
          </button>
        </div>

      ) : (

        /* ===================================================
           PLANS
        =================================================== */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {plans.map((plan, index) => {
            const TypeIcon =
              getTypeIcon(plan.type);

            const isFeatured =
              index === 1 &&
              plans.length >= 3;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl border p-6 shadow-sm flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${
                  isFeatured
                    ? "border-red-light shadow-red-light/10"
                    : "border-slate-200"
                }`}
              >

                {/* =========================================
                    BADGE TOP
                ========================================= */}

                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-red-light text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-light/20">
                      <Sparkles size={11} />
                      Populaire
                    </span>
                  </div>
                )}

                {/* =========================================
                    HEADER CARD
                ========================================= */}

                <div className="flex items-start justify-between gap-4 mb-5">

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                        isFeatured
                          ? "bg-red-light text-white"
                          : "bg-red-50 text-red-light"
                      }`}
                    >
                      <TypeIcon size={20} />
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-slate-900">
                        {plan.nom}
                      </h2>

                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {getTypeLabel(
                          plan.type,
                        )}
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`shrink-0 text-[9px] font-black uppercase px-2.5 py-1.5 rounded-lg ${
                      plan.statut === "actif"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {plan.statut}
                  </span>
                </div>

                {/* =========================================
                    DESCRIPTION
                ========================================= */}

                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 min-h-[48px] mb-5">
                  {plan.description ||
                    "Aucune description disponible."}
                </p>

                {/* =========================================
                    PRICE
                ========================================= */}

                <div className="mb-6">

                  {plan.prix === 0 ? (
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-slate-900">
                        Gratuit
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-2 flex-wrap">

                      <span className="text-4xl font-black text-slate-900">
                        {Number(
                          plan.prix,
                        ).toLocaleString(
                          "fr-FR",
                        )}
                      </span>

                      <span className="text-sm font-bold text-slate-500 mb-1">
                        {plan.devise}
                      </span>

                    </div>
                  )}

                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {plan.prix === 0
                      ? "Aucun paiement requis"
                      : `par ${getDurationLabel(
                          plan.duree,
                          plan.duree_unite,
                        )}`}
                  </p>
                </div>

                {/* =========================================
                    TRIAL
                ========================================= */}

                {plan.trial && (
                  <div className="mb-5 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">

                    <p className="text-[11px] font-bold text-emerald-700">
                      🎁 Essai gratuit de{" "}
                      {plan.trial_duration}{" "}
                      jour
                      {plan.trial_duration &&
                      plan.trial_duration > 1
                        ? "s"
                        : ""}
                    </p>
                  </div>
                )}

                {/* =========================================
                    SEPARATOR
                ========================================= */}

                <div className="h-px bg-slate-100 mb-5" />

                {/* =========================================
                    FEATURES
                ========================================= */}

                <div className="flex-1">

                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                    Ce qui est inclus
                  </p>

                  {plan.features &&
                  plan.features.length > 0 ? (
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">

                      {plan.features.map(
                        (feature, featureIndex) => (
                          <div
                            key={
                              featureIndex
                            }
                            className="flex items-start gap-3"
                          >
                            <div
                              className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${
                                isFeatured
                                  ? "bg-red-light text-white"
                                  : "bg-red-50 text-red-light"
                              }`}
                            >
                              <Check
                                size={12}
                                strokeWidth={3}
                              />
                            </div>

                            <span className="text-xs sm:text-sm font-semibold leading-5 text-slate-700">
                              {feature}
                            </span>
                          </div>
                        ),
                      )}

                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      Aucune fonctionnalité
                      renseignée.
                    </p>
                  )}
                </div>


                {/* =========================================
                    ADMIN ACTIONS
                ========================================= */}

                <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">

                  <button
                    onClick={() =>
                      openEdit(plan)
                    }
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition active:scale-[0.98]"
                  >
                    <Pencil size={14} />
                    Modifier
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(plan)
                    }
                    disabled={
                      deletingId ===
                      plan.id
                    }
                    className="w-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition disabled:cursor-not-allowed disabled:opacity-50"
                    title="Supprimer"
                  >
                    {deletingId ===
                    plan.id ? (
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2
                        size={15}
                      />
                    )}
                  </button>

                </div>
              </div>
            );
          })}

          {/* ===============================================
              ADD CARD
          =============================================== */}

          <button
            onClick={openCreate}
            className="min-h-[420px] rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center p-6 hover:border-red-light hover:bg-red-50/30 transition group"
          >

            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover:border-red-light group-hover:bg-red-50 transition">
              <Plus
                size={24}
                className="text-slate-400 group-hover:text-red-light transition"
              />
            </div>

            <h3 className="text-sm font-black text-slate-700 group-hover:text-red-light transition">
              Ajouter un plan
            </h3>

            <p className="text-xs text-slate-400 mt-2 max-w-[220px]">
              Créez une nouvelle offre
              d'abonnement pour vos utilisateurs.
            </p>

          </button>

        </div>
      )}

      {/* =====================================================
          FORM MODAL
      ===================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm overflow-y-auto">

          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl relative my-8 overflow-hidden">

            {/* ===============================================
                MODAL HEADER
            =============================================== */}

            <div className="px-6 sm:px-8 py-6 border-b border-slate-100 flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2 mb-1">

                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <Crown
                      size={15}
                      className="text-red-light"
                    />
                  </div>

                  <h3 className="text-lg font-black text-slate-900">
                    {editing
                      ? "Modifier le plan"
                      : "Nouveau plan"}
                  </h3>

                </div>

                <p className="text-xs text-slate-400">
                  Configurez les informations
                  de votre offre.
                </p>

              </div>

              <button
                onClick={closeForm}
                className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>

            </div>

            {/* ===============================================
                FORM
            =============================================== */}

            <div className="p-6 sm:p-8">

              <div className="space-y-4">

                {/* NAME */}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                    Nom du plan
                  </label>

                  <input
                    type="text"
                    value={form.nom}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nom: e.target.value,
                      })
                    }
                    placeholder="Ex : Particulier"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10"
                  />
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description:
                          e.target.value,
                      })
                    }
                    placeholder="Une courte phrase pour présenter le plan"
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10 resize-none"
                  />
                </div>

                {/* PRICE / CURRENCY */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                      Prix
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={form.prix}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          prix: Number(
                            e.target.value,
                          ),
                        })
                      }
                      placeholder="Prix"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                      Devise
                    </label>

                    <select
                      value={form.devise}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          devise:
                            e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10"
                    >
                      <option value="XOF">
                        XOF
                      </option>

                      <option value="EUR">
                        EUR
                      </option>

                      <option value="USD">
                        USD
                      </option>
                    </select>
                  </div>
                </div>

                {/* DURATION */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                      Durée
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={form.duree}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          duree: Number(
                            e.target.value,
                          ),
                        })
                      }
                      placeholder="Durée"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                      Unité
                    </label>

                    <select
                      value={
                        form.duree_unite
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          duree_unite:
                            e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10"
                    >
                      <option value="jour">
                        Jour(s)
                      </option>

                      <option value="mois">
                        Mois
                      </option>

                      <option value="annee">
                        Année(s)
                      </option>
                    </select>
                  </div>
                </div>

                {/* TYPE / STATUS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                      Type de plan
                    </label>

                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10"
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
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                      Statut
                    </label>

                    <select
                      value={form.statut}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          statut:
                            e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10"
                    >
                      <option value="actif">
                        Actif
                      </option>

                      <option value="inactif">
                        Inactif
                      </option>
                    </select>
                  </div>
                </div>

              

                {/* TRIAL */}

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={form.trial}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          trial:
                            e.target.checked,
                        })
                      }
                      id="trial"
                      className="w-4 h-4 accent-red-600"
                    />

                    <div>
                      <label
                        htmlFor="trial"
                        className="text-xs font-black text-slate-700 cursor-pointer"
                      >
                        Essai gratuit
                      </label>

                      <p className="text-[10px] text-slate-400">
                        Permettre aux utilisateurs
                        d'essayer ce plan gratuitement.
                      </p>
                    </div>

                    {form.trial && (
                      <input
                        type="number"
                        min="1"
                        value={
                          form.trial_duration
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,
                            trial_duration:
                              Number(
                                e.target.value,
                              ),
                          })
                        }
                        placeholder="Jours"
                        className="ml-auto w-24 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs outline-none focus:border-red-light"
                      />
                    )}

                  </div>
                </div>

                {/* FEATURES */}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
                    Fonctionnalités
                  </label>

                  <textarea
                    value={form.features}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        features:
                          e.target.value,
                      })
                    }
                    placeholder={`1 projet
5 réseaux sociaux
30 générations IA par mois
Calendrier éditorial
Analytics de base`}
                    rows={7}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light focus:ring-2 focus:ring-red-light/10 resize-none"
                  />

                  <p className="text-[10px] text-slate-400 mt-1.5">
                    Une fonctionnalité par ligne.
                  </p>
                </div>

              </div>

              {/* ERROR */}

              {errorMessage && (
                <div className="mt-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-semibold text-red-600">
                  {errorMessage}
                </div>
              )}

              {/* ACTIONS */}

              <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">

                <button
                  onClick={closeForm}
                  disabled={saving}
                  className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-black hover:bg-slate-50 transition disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3.5 bg-red-light text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Enregistrement..."
                    : editing
                      ? "Mettre à jour"
                      : "Créer le plan"}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}