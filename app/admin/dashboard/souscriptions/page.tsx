"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import axios from "@/lib/axios";

type Souscription = {
  id: number;
  statut: "en_attente" | "actif" | "renouvelee" | "expiree" | string;
  montant: number;
  devise: string;
  mode_paiement: string | null;
  reference_paiement: string | null;
  details_paiement: Record<string, string> | null;
  created_at: string;
  date_debut: string | null;
  date_fin: string | null;
  date_validation: string | null;
  user: {
    name: string;
    email: string;
  };
  plan: {
    nom: string;
  };
};

type Filtre = "" | "en_attente" | "actif" | "renouvelee" | "expiree";

const FILTRES: { value: Filtre; label: string }[] = [
  { value: "", label: "Toutes" },
  { value: "en_attente", label: "En attente" },
  { value: "actif", label: "Actives" },
  { value: "renouvelee", label: "Renouvelées" },
  { value: "expiree", label: "Expirées" },
];

export default function AdminSouscriptionsPage() {
  const [souscriptions, setSouscriptions] = useState<Souscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState<Filtre>("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const loadSouscriptions = async () => {
    setLoading(true);

    try {
      const url = filtre
        ? `/api/admin/souscriptions?statut=${encodeURIComponent(filtre)}`
        : "/api/admin/souscriptions";

      const response = await axios.get(url);

      const data = response.data?.souscriptions;

      if (Array.isArray(data)) {
        setSouscriptions(data);
      } else if (Array.isArray(data?.data)) {
        setSouscriptions(data.data);
      } else {
        setSouscriptions([]);
      }
    } catch (error) {
      console.error("Erreur chargement souscriptions :", error);
      setSouscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSouscriptions();
  }, [filtre]);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    if (openMenuId !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuId]);

  const handleValider = async (id: number) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment valider cette souscription ?",
    );

    if (!confirmation) {
      return;
    }

    setProcessingId(id);
    setOpenMenuId(null);

    try {
      const response = await axios.post(
        `/api/admin/souscriptions/${id}/valider`,
      );

      alert(
        response.data?.message ||
          "La souscription a été validée avec succès.",
      );

      await loadSouscriptions();
    } catch (error: any) {
      console.error("Erreur validation :", error);

      alert(
        error.response?.data?.message ||
          "Impossible de valider cette souscription.",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejeter = async (id: number) => {
    const motif = window.prompt(
      "Motif du rejet (facultatif) :",
      "Paiement non confirmé",
    );

    if (motif === null) {
      return;
    }

    setProcessingId(id);
    setOpenMenuId(null);

    try {
      const response = await axios.post(
        `/api/admin/souscriptions/${id}/rejeter`,
        {
          motif: motif.trim() || "Paiement non confirmé",
        },
      );

      alert(
        response.data?.message ||
          "La souscription a été rejetée.",
      );

      await loadSouscriptions();
    } catch (error: any) {
      console.error("Erreur rejet :", error);

      alert(
        error.response?.data?.message ||
          "Impossible de rejeter cette souscription.",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (date: string | null) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMontant = (
    montant: number,
    devise: string,
  ) => {
    return `${Number(montant || 0).toLocaleString("fr-FR")} ${devise}`;
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case "en_attente":
        return "En attente";

      case "actif":
        return "Actif";

      case "renouvelee":
        return "Renouvelée";

      case "expiree":
        return "Expirée";

      default:
        return statut;
    }
  };

  const getStatutClass = (statut: string) => {
    switch (statut) {
      case "en_attente":
        return "bg-amber-50 text-amber-600 border-amber-100";

      case "actif":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";

      case "renouvelee":
        return "bg-blue-50 text-blue-600 border-blue-100";

      case "expiree":
        return "bg-slate-100 text-slate-500 border-slate-200";

      default:
        return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  return (
    <div className="w-full">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 mb-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Souscriptions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gérez les abonnements et validez les paiements.
          </p>
        </div>
      </div>

      {/* =====================================================
          FILTRES
      ===================================================== */}

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTRES.map((item) => {
          const active = filtre === item.value;

          return (
            <button
              key={item.value || "toutes"}
              type="button"
              onClick={() => {
                setFiltre(item.value);
                setOpenMenuId(null);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                active
                  ? "bg-red-light text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-600"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2
              size={28}
              className="animate-spin text-red-light"
            />
          </div>
        ) : souscriptions.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
            <div>
              <p className="text-sm font-bold text-slate-700">
                Aucune souscription
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Aucune souscription ne correspond au filtre sélectionné.
              </p>
            </div>
          </div>
        ) : (
          <table className="min-w-[1250px] w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Utilisateur
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Plan
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Paiement
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Date de début
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Date de fin
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Validation
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Statut
                </th>

                <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {souscriptions.map((souscription) => {
                const isProcessing =
                  processingId === souscription.id;

                const isPending =
                  souscription.statut === "en_attente";

                return (
                  <tr
                    key={souscription.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition"
                  >
                    {/* UTILISATEUR */}

                    <td className="px-5 py-4">
                      <div className="min-w-[190px]">
                        <p className="text-sm font-bold text-slate-800">
                          {souscription.user?.name || "Utilisateur"}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {souscription.user?.email || "—"}
                        </p>
                      </div>
                    </td>

                    {/* PLAN */}

                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {souscription.plan?.nom || "—"}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          ID #{souscription.id}
                        </p>
                      </div>
                    </td>

                    {/* PAIEMENT */}

                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {formatMontant(
                            souscription.montant,
                            souscription.devise,
                          )}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {souscription.mode_paiement ||
                            "Non renseigné"}
                        </p>

                        {souscription.reference_paiement && (
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Réf. {souscription.reference_paiement}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* DATE DEBUT */}

                    <td className="px-5 py-4">
                      <p className="text-xs font-semibold text-slate-700">
                        {formatDate(souscription.date_debut)}
                      </p>
                    </td>

                    {/* DATE FIN */}

                    <td className="px-5 py-4">
                      <p className="text-xs font-semibold text-slate-700">
                        {formatDate(souscription.date_fin)}
                      </p>
                    </td>

                    {/* DATE VALIDATION */}

                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          {formatDate(souscription.date_validation)}
                        </p>

                        {souscription.date_validation && (
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {formatDateTime(
                              souscription.date_validation,
                            ).split(" ")[1] || ""}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* STATUT */}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[10px] font-black ${getStatutClass(
                          souscription.statut,
                        )}`}
                      >
                        {getStatutLabel(souscription.statut)}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={(event) => {
                            event.stopPropagation();

                            if (isProcessing) {
                              return;
                            }

                            setOpenMenuId((current) =>
                              current === souscription.id
                                ? null
                                : souscription.id,
                            );
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Actions"
                        >
                          {isProcessing ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <MoreHorizontal size={17} />
                          )}
                        </button>

                        {openMenuId === souscription.id && (
                          <div
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            className="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                          >
                            {isPending ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleValider(
                                      souscription.id,
                                    )
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-emerald-600 transition hover:bg-emerald-50"
                                >
                                  <CheckCircle2 size={15} />
                                  Valider
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRejeter(
                                      souscription.id,
                                    )
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-red-600 transition hover:bg-red-50"
                                >
                                  <XCircle size={15} />
                                  Rejeter
                                </button>
                              </>
                            ) : (
                              <div className="px-3 py-2.5 text-xs font-medium text-slate-400">
                                Aucune action disponible
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
