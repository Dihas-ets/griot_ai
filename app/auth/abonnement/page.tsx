"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, X, Loader2, CreditCard, Smartphone, Landmark } from "lucide-react";
import axios from "@/lib/axios";

type Plan = {
  id: number;
  nom: string;
  type: string;
  description: string;
  prix: number;
  devise: string;
  duree: number;
  duree_unite: "jour" | "mois" | "annee";
  trial: boolean;
  trial_duration: number | null;
  features: string[];
  est_gratuit: boolean;
};

const DEVISES = [
  { code: "EUR", label: "€ Euro" },
  { code: "USD", label: "$ Dollar" },
  { code: "XOF", label: "FCFA" },
];

const MODES_PAIEMENT = [
  { code: "carte", label: "Carte bancaire", icon: CreditCard },
  { code: "mobile_money", label: "Mobile Money", icon: Smartphone },
  { code: "virement", label: "Virement", icon: Landmark },
];

export default function AbonnementPage() {
  const router = useRouter();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [devise, setDevise] = useState("EUR");
  const [loadingPlans, setLoadingPlans] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [quantite, setQuantite] = useState(1);
  const [modePaiement, setModePaiement] = useState("");
  const [referencePaiement, setReferencePaiement] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadPlans = async () => {
      setLoadingPlans(true);
      try {
        const response = await axios.get(`/api/plans?devise=${devise}`);
        setPlans(response.data.plans ?? []);
      } catch (error) {
        console.error("Erreur chargement des plans :", error);
      } finally {
        setLoadingPlans(false);
      }
    };

    loadPlans();
  }, [devise]);

  const openCheckout = (plan: Plan) => {
    setSelectedPlan(plan);
    setQuantite(1);
    setModePaiement("");
    setReferencePaiement("");
    setErrorMessage("");
  };

  const closeCheckout = () => {
    setSelectedPlan(null);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    if (!selectedPlan.est_gratuit && !modePaiement) {
      setErrorMessage("Veuillez choisir un mode de paiement.");
      return;
    }

    setErrorMessage("");
    setSubmitting(true);

    try {
      await axios.get("/sanctum/csrf-cookie");

      const response = await axios.post("/api/souscriptions", {
        plan_id: selectedPlan.id,
        quantite,
        devise,
        mode_paiement: selectedPlan.est_gratuit ? null : modePaiement,
        reference_paiement: referencePaiement || null,
      });

      setSuccessMessage(response.data.message);
      setSelectedPlan(null);

      window.setTimeout(() => {
        router.push("/dashboard");
      }, 1600);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const flattened = Object.values(error.response.data.errors).flat().join(" ");
        setErrorMessage(flattened);
      } else {
        setErrorMessage(
          error.response?.data?.message || "Une erreur est survenue.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const dureeLabel = (unite: string) =>
    unite === "jour" ? "jour(s)" : unite === "annee" ? "an(s)" : "mois";

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

          {/* SÉLECTEUR DEVISE */}
          <div className="mt-6 inline-flex rounded-xl border border-slate-200 bg-white p-1 gap-1">
            {DEVISES.map((d) => (
              <button
                key={d.code}
                onClick={() => setDevise(d.code)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  devise === d.code
                    ? "bg-red-light text-white"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 max-w-md mx-auto rounded-2xl bg-green-50 border border-green-100 px-4 py-3 text-sm font-medium text-green-600 text-center">
            {successMessage}
          </div>
        )}

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
                      {devise === "XOF" ? "FCFA" : devise === "USD" ? "$" : "€"} /{" "}
                      {plan.duree} {dureeLabel(plan.duree_unite)}
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
                    onClick={() => openCheckout(plan)}
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

      {/* MODAL CHECKOUT */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={closeCheckout}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {selectedPlan.nom}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {selectedPlan.description}
            </p>

            {!selectedPlan.est_gratuit && (
              <>
                {/* QUANTITÉ / DURÉE */}
                <div className="mb-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                    Durée
                  </label>
                  <div className="flex gap-2">
                    {[1, 6, 12].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuantite(q)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition ${
                          quantite === q
                            ? "bg-red-light text-white border-red-light"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {q} {dureeLabel(selectedPlan.duree_unite)}
                        {q > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MODE PAIEMENT */}
                <div className="mb-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                    Mode de paiement
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {MODES_PAIEMENT.map((m) => (
                      <button
                        key={m.code}
                        onClick={() => setModePaiement(m.code)}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-[10px] font-bold border transition ${
                          modePaiement === m.code
                            ? "bg-red-light text-white border-red-light"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <m.icon size={16} />
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RÉFÉRENCE PAIEMENT */}
                <div className="mb-6">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                    Référence de paiement (optionnel)
                  </label>
                  <input
                    type="text"
                    value={referencePaiement}
                    onChange={(e) => setReferencePaiement(e.target.value)}
                    placeholder="Ex : ID transaction Mobile Money"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-red-light"
                  />
                </div>
              </>
            )}

            {errorMessage && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-medium text-red-600">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-between mb-5 px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total
              </span>
              <span className="text-lg font-black text-slate-900">
                {selectedPlan.est_gratuit
                  ? "Gratuit"
                  : `${(selectedPlan.prix * quantite).toFixed(2)} ${devise}`}
              </span>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={submitting}
              className="w-full py-4 bg-red-light text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all disabled:opacity-50"
            >
              {submitting
                ? "Traitement..."
                : selectedPlan.est_gratuit
                ? "Activer mon abonnement"
                : "Confirmer ma souscription"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}