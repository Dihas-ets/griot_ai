"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function EmailVerifiePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Email vérifié !
        </h1>

        <p className="text-slate-500 mt-3">
          Votre adresse email a été vérifiée avec succès.
        </p>

        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Se connecter
        </Link>
      </div>
    </main>
  );
}