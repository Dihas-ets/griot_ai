"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import axios from "@/lib/axios";

type Plan = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  devise: string;
  duree_unite: "jour" | "mois" | "annee";
  trial: boolean;
  trial_duration: number | null;
  features: string[];
  est_gratuit: boolean;
};

const DEVISE = "XOF";
const DUREE_UNITE = "mois";

export default function AbonnementPage() {
  const router = useRouter();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      setLoadingPlans(true);
      try {
        const response = await axios.get(
          `/api/plans?devise=${DEVISE}&duree_unite=${DUREE_UNITE}`,
        );
        setPlans(response.data.plans ?? []);
      } catch (error) {
        console.error("Erreur chargement des plans :", error);
      } finally {
        setLoadingPlans(false);
      }
    };

    loadPlans();
  }, []);

  const goToValidation = (planId: number) => {
    router.push(`/auth/abonnement/valider?plan=${planId}&devise=${DEVISE}&duree_unite=${DUREE_UNITE}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-3">
            Choisissez votre abonnement
          </h1>
          <p className="text-slate-500 font-medium text-sm max-w-xl mx-auto">
            Un abonnement actif est nécessaire pour accéder à votre espace Griot AI.
          </p>
        </div>

        {loadingPlans ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-red-light" size={28} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, index) => {
              const featured = index === 1;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-8 rounded-[2rem] border flex flex-col h-full ${
                    featured
                      ? "bg-white border-red-light shadow-2xl shadow-red-light/15 lg:-translate-y-3 z-10"
                      : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  {featured && (
                    <div className="bg-red-light text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mx-auto -mt-14 mb-6 shadow-md">
                      Plus Populaire
                    </div>
                  )}

                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                    {plan.nom}
                  </span>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black text-slate-900">
                      {plan.est_gratuit ? "0" : plan.prix}
                    </span>
                    <span className="text-slate-500 font-medium text-sm">
                      FCFA / mois
                    </span>
                  </div>

                  {plan.trial && plan.trial_duration && (
                    <p className="text-xs text-red-light font-bold mb-2">
                      Essai gratuit {plan.trial_duration} jours
                    </p>
                  )}

                  <p className="text-sm text-slate-500 mb-8 font-medium italic">
                    {plan.description}
                  </p>

                  <div className="space-y-3 mb-10 flex-grow">
                    {plan.features?.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            featured
                              ? "bg-red-light text-white"
                              : "bg-red-100 text-red-light"
                          }`}
                        >
                          <Check size={12} />
                        </div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => goToValidation(plan.id)}
                    className={`w-full py-4 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
                      featured
                        ? "bg-red-light text-white hover:bg-red-700 shadow-lg shadow-red-light/20"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    Choisir ce plan
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}