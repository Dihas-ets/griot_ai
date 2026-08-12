"use client";
import register from "../auth/register/page";
import { useState } from "react";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-red-light backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div>
            <img
              src="/logo_blanc.png"
              width={150}
              height={130}
              alt="Logo"
            />
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">

          <a
            href="#Accueil"
            className="text-white hover:text-red-300 transition"
          >
            Accueil
          </a>

          <a
            href="#how"
            className="text-white hover:text-red-300 transition"
          >
            Comment ça marche
          </a>

          <a
            href="#features"
            className="text-white hover:text-red-300 transition"
          >
            Fonctionnalités
          </a>

          <a
            href="#pricing"
            className="text-white hover:text-red-300 transition"
          >
            Tarifs
          </a>

          <a
            href="#faq"
            className="text-white hover:text-red-300 transition"
          >
            FAQ
          </a>

          <a
            href="#contact"
            className="text-white hover:text-red-300 transition"
          >
            Contact
          </a>

        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
<a href="../auth/register">
          <button className="px-5 py-2.5 rounded-full font-medium text-white hover:text-red-300 transition">
            Connexion
          </button>
</a>
          <button className="px-6 py-3 rounded-full bg-slate-100 text-red-600 hover:bg-red-300 hover:text-white font-semibold shadow-lg transition flex items-center gap-2">
            Commencer
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative z-[60] p-2 text-white"
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-red-900/0 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full z-50 bg-white shadow-xl border-t border-slate-100">

          <div className="px-6 py-7 flex flex-col gap-1">

            <a
              href="#Accueil"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50 hover:text-red-600 transition"
            >
              Accueil
            </a>

            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50 hover:text-red-600 transition"
            >
              Fonctionnalités
            </a>

            <a
              href="#how"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50 hover:text-red-600 transition"
            >
              Comment ça marche
            </a>

            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50 hover:text-red-600 transition"
            >
              Tarifs
            </a>

            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50 hover:text-red-600 transition"
            >
              FAQ
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50 hover:text-red-600 transition"
            >
              Contact
            </a>

            <div className="my-4 border-t border-slate-200" />
<a href="../auth/register">
            <button className="w-full py-3 rounded-xl border border-slate-300 text-slate-800 font-medium hover:bg-slate-50 transition">
              Connexion
            </button>
</a>
            <button className="w-full py-3 rounded-xl bg-red-light hover:bg-red-dark text-white font-semibold transition mt-2">
              Commencer gratuitement
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}