"use client";

import { useEffect, useState } from "react";
import { Users, Package, CheckCircle2, Clock3, Wallet, Loader2 } from "lucide-react";
import axios from "@/lib/axios";

type Stats = {
  utilisateurs_total: number;
  utilisateurs_ce_mois: number;
  plans_total: number;
  souscriptions_actives: number;
  souscriptions_en_attente: number;
  revenu_total: number;
  dernieres_souscriptions: Array<{
    id: number;
    statut: string;
    montant: number;
    devise: string;
    created_at: string;
    user: { name: string; email: string };
    plan: { nom: string };
  }>;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Erreur chargement stats :", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-red-light" size={28} />
      </div>
    );
  }

  if (!stats) return <p className="text-sm text-slate-500">Impossible de charger les statistiques.</p>;

  const cards = [
    { label: "Utilisateurs", value: stats.utilisateurs_total, sub: `+${stats.utilisateurs_ce_mois} ce mois`, icon: Users },
    { label: "Plans actifs", value: stats.plans_total, icon: Package },
    { label: "Abonnements actifs", value: stats.souscriptions_actives, icon: CheckCircle2 },
    { label: "En attente de validation", value: stats.souscriptions_en_attente, icon: Clock3, alert: stats.souscriptions_en_attente > 0 },
    { label: "Revenu total (XOF)", value: stats.revenu_total.toLocaleString("fr-FR"), icon: Wallet },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-900 mb-1">Vue d'ensemble</h1>
      <p className="text-sm text-slate-500 mb-8">Aperçu global de la plateforme Griot AI.</p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-2xl border p-5 shadow-sm ${
              card.alert ? "border-amber-300" : "border-slate-200"
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
              card.alert ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
            }`}>
              <card.icon size={16} />
            </div>
            <p className="text-xl font-black text-slate-900">{card.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
              {card.label}
            </p>
            {card.sub && <p className="text-[10px] text-slate-400 mt-0.5">{card.sub}</p>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900">Dernières souscriptions</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {stats.dernieres_souscriptions.map((s) => (
            <div key={s.id} className="p-4 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">{s.user?.name}</p>
                <p className="text-slate-400">{s.user?.email}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-700">{s.plan?.nom}</p>
                <p className="text-slate-400">{s.montant} {s.devise}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                  s.statut === "actif"
                    ? "bg-emerald-50 text-emerald-600"
                    : s.statut === "en_attente"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {s.statut}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}