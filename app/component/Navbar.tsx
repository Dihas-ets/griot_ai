"use client";

import { useState } from "react";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-purple-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="font-bold text-xl text-white">
              Diha's AI
            </h1>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <a
            href="#Accueil"
            className="text-white hover:text-indigo-600 transition"
          >
           Accueil
          </a>

           <a
            href="#how"
            className="text-white hover:text-indigo-600 transition"
          >
            Comment ça marche
          </a>

          <a
            href="#features"
            className="text-white hover:text-indigo-600 transition"
          >
            Fonctionnalités
          </a>

          <a
            href="#pricing"
            className="text-white hover:text-indigo-600 transition"
          >
            Tarifs
          </a>

          <a
            href="#faq"
            className="text-white hover:text-indigo-600 transition"
          >
            FAQ
          </a>

          <a
            href="#contact"
            className="text-white hover:text-indigo-600 transition"
          >
            Contact
          </a>

        </div>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex items-center gap-3">

          <button className="px-5 py-2.5 rounded-full font-medium text-white hover:text-purple-600 hover:bg-slate-100 transition">
            Connexion
          </button>

          <button className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition flex items-center gap-2">
            Commencer
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 text-purple-500">

          <div className="px-6 py-6 flex flex-col gap-5">
            <a href="#Accueil">Accueil</a>

            <a href="#features">Fonctionnalités</a>

            <a href="#how">Comment ça marche</a>

            <a href="#pricing">Tarifs</a>

            <a href="#faq">FAQ</a>

            <a href="#contact">Contact</a>

            <hr />

            <button className="w-full py-3 rounded-xl border border-slate-300">
              Connexion
            </button>

            <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold">
              Commencer gratuitement
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}