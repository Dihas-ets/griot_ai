"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
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
  user: { name: string; email: string };
  plan: { nom: string };
};

const FILTRES = [
  { code: "", label: "Toutes" },
  { code: "en_attente", label: "En attente" },
  { code: "actif", label: "Actives" },
  { code: "expiree", label: "Rejetées / expirées" },
];

export default function AdminSouscriptionsPage() {
  const [souscriptions, setSouscriptions] = useState<Souscription[]>([]);
  const [filtre, setFiltre] = useState("en_attente");
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const loadSouscriptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/admin/souscriptions${filtre ? `?statut=${filtre}` : ""}`,
      );
      setSouscriptions(response.data.souscriptions?.data ?? []);
    } catch (error) {
      console.error("Erreur chargement souscriptions :", error);
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
      await axios.post(`/api/admin/souscriptions/${id}/valider`);
      loadSouscriptions();
    } catch (error) {
      console.error("Erreur validation :", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejeter = async (id: number) => {
    const motif = prompt("Motif du rejet (optionnel) :") ?? "";
    setProcessingId(id);
    try {
      await axios.post(`/api/admin/souscriptions/${id}/rejeter`, { motif });
      loadSouscriptions();
    } catch (error) {
      console.error("Erreur rejet :", error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-900 mb-1">Souscriptions</h1>
      <p className="text-sm text-slate-500 mb-6">Validez ou rejetez les paiements en attente.</p>

      <div className="flex gap-2 mb-6">
        {FILTRES.map((f) => (
          <button
            key={f.code}
            onClick={() => setFiltre(f.code)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filtre === f.code
                ? "bg-red-light text-white"
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-red-light" size={28} />
        </div>
      ) : souscriptions.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-16">Aucune souscription trouvée.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
          {souscriptions.map((s) => (
            <div key={s.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-800">{s.user?.name}</p>
                <p className="text-xs text-slate-400">{s.user?.email}</p>
              </div>

              <div className="min-w-[120px]">
                <p className="text-xs font-bold text-slate-700">{s.plan?.nom}</p>
                <p className="text-xs text-slate-400">{s.montant} {s.devise}</p>
              </div>

              <div className="min-w-[140px]">
                <p className="text-xs font-bold text-slate-700 capitalize">
                  {s.mode_paiement?.replace("_", " ") || "—"}
                </p>
                {s.reference_paiement && (
                  <p className="text-[10px] text-slate-400">Réf: {s.reference_paiement}</p>
                )}
                {s.details_paiement?.telephone && (
                  <p className="text-[10px] text-slate-400">{s.details_paiement.telephone}</p>
                )}
              </div>

              <span
                className={`px-2 py-1 rounded-lg text-[9px] font-bold w-fit ${
                  s.statut === "actif"
                    ? "bg-emerald-50 text-emerald-600"
                    : s.statut === "en_attente"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {s.statut}
              </span>

              {s.statut === "en_attente" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleValider(s.id)}
                    disabled={processingId === s.id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold hover:bg-emerald-100 transition disabled:opacity-50"
                  >
                    <CheckCircle2 size={14} /> Valider
                  </button>
                  <button
                    onClick={() => handleRejeter(s.id)}
                    disabled={processingId === s.id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition disabled:opacity-50"
                  >
                    <XCircle size={14} /> Rejeter
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}