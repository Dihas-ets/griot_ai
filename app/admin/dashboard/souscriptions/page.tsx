"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import axios from "@/lib/axios";

type Souscription = {
  id: number;
  statut: string;
  montant: number;
  devise: string;
  mode_paiement: string | null;
  reference_paiement: string | null;
  details_paiement: Record<string, string>;
  created_at: string;
  user: {
    name: string;
    email: string;
  };
  plan: {
    nom: string;
  };
};

const FILTRES = [
  { code: "", label: "Toutes" },
  { code: "en_attente", label: "En attente" },
  { code: "actif", label: "Actives" },
  { code: "expiree", label: "Rejetées / expirées" },
];

export default function AdminSouscriptionsPage() {
  const [souscriptions, setSouscriptions] = useState<Souscription[]>(
    [],
  );

  const [filtre, setFiltre] = useState("en_attente");
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(
    null,
  );

  const loadSouscriptions = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/api/admin/souscriptions${
          filtre ? `?statut=${filtre}` : ""
        }`,
      );

      setSouscriptions(
        response.data.souscriptions?.data ?? [],
      );
    } catch (error) {
      console.error(
        "Erreur chargement souscriptions :",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSouscriptions();
  }, [filtre]);

  const handleValider = async (id: number) => {
    setProcessingId(id);

    try {
      await axios.post(
        `/api/admin/souscriptions/${id}/valider`,
      );

      setSouscriptions((current) => {
        if (filtre === "en_attente") {
          return current.filter((s) => s.id !== id);
        }

        return current.map((s) =>
          s.id === id
            ? {
                ...s,
                statut: "actif",
              }
            : s,
        );
      });
    } catch (error) {
      console.error("Erreur validation :", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejeter = async (id: number) => {
    const motif =
      prompt("Motif du rejet (optionnel) :") ?? "";

    setProcessingId(id);

    try {
      await axios.post(
        `/api/admin/souscriptions/${id}/rejeter`,
        { motif },
      );

      setSouscriptions((current) => {
        if (filtre === "en_attente") {
          return current.filter((s) => s.id !== id);
        }

        return current.map((s) =>
          s.id === id
            ? {
                ...s,
                statut: "expiree",
              }
            : s,
        );
      });
    } catch (error) {
      console.error("Erreur rejet :", error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="mb-6 sm:mb-8">
        <h1 className="mb-1 text-xl font-black text-slate-900 sm:text-2xl">
          Souscriptions
        </h1>

        <p className="text-xs text-slate-500 sm:text-sm">
          Validez ou rejetez les paiements en attente.
        </p>
      </div>

      {/* ========================================= */}
      {/* FILTRES */}
      {/* ========================================= */}

      <div className="mb-6 w-full">
        <div className="flex flex-wrap gap-2 pb-1">
          {FILTRES.map((f) => (
            <button
              key={f.code}
              type="button"
              onClick={() => setFiltre(f.code)}
              className={`
                shrink-0
                rounded-xl
                px-4
                py-2
                text-xs
                font-bold
                whitespace-nowrap
                transition

                ${
                  filtre === f.code
                    ? "bg-red-light text-white"
                    : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* CHARGEMENT */}
      {/* ========================================= */}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            className="animate-spin text-red-light"
            size={28}
          />
        </div>
      ) : souscriptions.length === 0 ? (
        /* ======================================= */
        /* AUCUNE SOUSCRIPTION */
        /* ======================================= */

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <p className="py-16 text-center text-sm text-slate-400">
            Aucune souscription trouvée.
          </p>
        </div>
      ) : (
        /* ======================================= */
        /* TABLEAU */
        /* ======================================= */

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1050px] text-xs">
              {/* ================================= */}
              {/* EN-TÊTE */}
              {/* ================================= */}

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th
                    className="
                      w-[25%]
                      px-5
                      py-3.5
                      text-left
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Utilisateur
                  </th>

                  <th
                    className="
                      w-[17%]
                      px-5
                      py-3.5
                      text-left
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Plan
                  </th>

                  <th
                    className="
                      w-[17%]
                      px-5
                      py-3.5
                      text-left
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Paiement
                  </th>

                  <th
                    className="
                      w-[14%]
                      px-5
                      py-3.5
                      text-left
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Statut
                  </th>

                  <th
                    className="
                      w-[27%]
                      px-5
                      py-3.5
                      text-right
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              {/* ================================= */}
              {/* LIGNES */}
              {/* ================================= */}

              <tbody className="divide-y divide-slate-100">
                {souscriptions.map((s) => {
                  const isProcessing =
                    processingId === s.id;

                  return (
                    <tr
                      key={String(s.id)}
                      className="transition-colors hover:bg-slate-50/50"
                    >
                      {/* =========================== */}
                      {/* UTILISATEUR */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        <div className="min-w-0">
                          <p className="max-w-[260px] truncate font-bold text-slate-800">
                            {s.user?.name ||
                              "Utilisateur inconnu"}
                          </p>

                          <p className="mt-1 max-w-[260px] truncate text-[11px] text-slate-400">
                            {s.user?.email || "-"}
                          </p>
                        </div>
                      </td>

                      {/* =========================== */}
                      {/* PLAN */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        <div className="whitespace-nowrap">
                          <p className="font-bold text-slate-700">
                            {s.plan?.nom || "-"}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {s.montant.toLocaleString(
                              "fr-FR",
                            )}{" "}
                            {s.devise}
                          </p>
                        </div>
                      </td>

                      {/* =========================== */}
                      {/* PAIEMENT */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        <div className="min-w-0">
                          <p className="whitespace-nowrap font-bold capitalize text-slate-700">
                            {s.mode_paiement
                              ?.replace("_", " ") ||
                              "—"}
                          </p>

                          {s.reference_paiement && (
                            <p className="mt-1 max-w-[180px] truncate text-[10px] text-slate-400">
                              Réf :{" "}
                              {s.reference_paiement}
                            </p>
                          )}

                          {s.details_paiement
                            ?.telephone && (
                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {
                                s.details_paiement
                                  .telephone
                              }
                            </p>
                          )}
                        </div>
                      </td>

                      {/* =========================== */}
                      {/* STATUT */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        <span
                          className={`
                            inline-flex
                            rounded-lg
                            px-2.5
                            py-1
                            text-[9px]
                            font-bold
                            whitespace-nowrap

                            ${
                              s.statut === "actif"
                                ? "bg-emerald-50 text-emerald-600"
                                : s.statut ===
                                    "en_attente"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-slate-100 text-slate-500"
                            }
                          `}
                        >
                          {s.statut}
                        </span>
                      </td>

                      {/* =========================== */}
                      {/* ACTIONS */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        {s.statut === "en_attente" ? (
                          <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                            {/* ======================= */}
                            {/* VALIDER */}
                            {/* ======================= */}

                            <button
                              type="button"
                              onClick={() =>
                                handleValider(s.id)
                              }
                              disabled={isProcessing}
                              className="
                                flex
                                items-center
                                justify-center
                                gap-1.5
                                rounded-xl
                                bg-emerald-50
                                px-3
                                py-2
                                text-xs
                                font-bold
                                text-emerald-600
                                transition
                                hover:bg-emerald-100
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                            >
                              {/* Les deux icônes restent
                                  dans le DOM */}
                              <span
                                className={
                                  isProcessing
                                    ? "hidden"
                                    : "flex"
                                }
                              >
                                <CheckCircle2
                                  size={14}
                                />
                              </span>

                              <span
                                className={
                                  isProcessing
                                    ? "flex"
                                    : "hidden"
                                }
                              >
                                <Loader2
                                  size={14}
                                  className="animate-spin"
                                />
                              </span>

                              Valider
                            </button>

                            {/* ======================= */}
                            {/* REJETER */}
                            {/* ======================= */}

                            <button
                              type="button"
                              onClick={() =>
                                handleRejeter(s.id)
                              }
                              disabled={isProcessing}
                              className="
                                flex
                                items-center
                                justify-center
                                gap-1.5
                                rounded-xl
                                bg-red-50
                                px-3
                                py-2
                                text-xs
                                font-bold
                                text-red-600
                                transition
                                hover:bg-red-100
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                            >
                              <XCircle size={14} />
                              Rejeter
                            </button>
                          </div>
                        ) : (
                          <div className="text-right text-[10px] text-slate-300">
                            —
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}