"use client";

import Link from "next/link";
import { Clock3, LogOut } from "lucide-react";

export default function AbonnementAttentePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5">
          <Clock3 size={26} />
        </div>

        <h1 className="text-xl font-black text-slate-900 mb-2">
          Paiement en cours de validation
        </h1>

        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Votre souscription a bien été enregistrée. Votre accès au tableau de
          bord sera activé dès que votre paiement aura été vérifié. Cela peut
          prendre quelques instants.
        </p>

        <Link
          href="/auth/abonnement"
          className="block w-full py-3.5 rounded-xl bg-red-light text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition mb-3"
        >
          Choisir un autre plan
        </Link>

        <button
          onClick={() => {
            window.location.href = "/auth/login";
          }}
          className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition flex items-center justify-center gap-2"
        >
          <LogOut size={14} />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}