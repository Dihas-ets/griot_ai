"use client";

import { Sparkles, Globe, MessageSquare, Mail, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-16 sm:pt-24 pb-12 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12 mb-16">
          {/* Logo */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <Sparkles size={16} />
              </div>

              <span className="font-bold text-lg sm:text-xl text-white">
                Diha's AI
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-xs mb-6 sm:mb-8 font-medium leading-relaxed">
              La plateforme SaaS tout-en-un pour les créateurs de contenu et les
              marques ambitieuses.
            </p>

            <div className="flex gap-3">
              {[Globe, MessageSquare, Mail, User].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Produit */}
          <div>
            <h6 className="font-black text-xs uppercase tracking-widest mb-4 sm:mb-8 text-white">
              Produit
            </h6>

            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-400 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Génération IA
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Planning
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Analytics
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tarifs
                </a>
              </li>
            </ul>
          </div>

          {/* Société */}
          <div>
            <h6 className="font-black text-xs uppercase tracking-widest mb-4 sm:mb-8 text-white">
              Société
            </h6>

            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-400 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  À propos
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Carrières
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h6 className="font-black text-xs uppercase tracking-widest mb-4 sm:mb-8 text-white">
              Légal
            </h6>

            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-400 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Confidentialité
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Conditions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-medium text-center sm:text-left">
            © 2026 Diha's Content AI. Tous droits réservés.
          </p>

          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
            <Globe size={14} />
            <span>Français (FR)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}