"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function VerifierEmailPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <Mail className="w-9 h-9 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Vérifiez votre adresse email
        </h1>

        <p className="text-slate-500 mt-3">
          Nous avons envoyé un email de vérification à votre adresse.
          Consultez votre boîte de réception et cliquez sur le lien pour
          activer votre compte.
        </p>

        <p className="text-sm text-slate-400 mt-4">
          Pensez également à vérifier votre dossier spam ou courrier
          indésirable.
        </p>

        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Aller à la connexion
        </Link>
      </div>
    </main>
  );
}