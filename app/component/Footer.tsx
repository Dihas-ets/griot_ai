"use client";

import {
  Globe,
  MessageSquare,
  Mail,
  User,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-900/30 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* FOOTER MAIN CONTENT */}
        <div className="py-16">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-12
              lg:gap-10
              items-start
            "
          >

            {/* LOGO + DESCRIPTION */}
            <div className="flex flex-col items-start">
           

              <p className="mt-5 text-sm leading-6 max-w-sm">
                Créez, planifiez et gérez vos contenus plus facilement
                grâce à l'intelligence artificielle.
              </p>

              {/* Réseaux sociaux */}
              <div className="flex items-center gap-3 mt-6">
                {[Globe, MessageSquare, Mail, User].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={`Réseau social ${i + 1}`}
                    className="
                      w-9 h-9
                      rounded-full
                      border border-slate-200
                      flex items-center justify-center
                      transition-all duration-200
                      hover:bg-red-600
                      hover:text-white
                      hover:border-red-600
                    "
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* PRODUIT */}
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-white mb-6">
                Produit
              </h6>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#features" className="hover:text-red-600 transition-colors">
                    Génération IA
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-red-600 transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-red-600 transition-colors">
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-red-600 transition-colors">
                    Tarifs
                  </a>
                </li>
              </ul>
            </div>

            {/* NAVIGATION */}
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-white mb-6">
                Navigation
              </h6>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#accueil" className="hover:text-red-600 transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-red-600 transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-red-600 transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-red-600 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-red-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* LÉGAL */}
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-white mb-6">
                Légal
              </h6>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* BAS DU FOOTER */}
        <div
          className="
            border-t
            border-slate-200
            py-6
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >
          <p className="text-xs">
            © 2026 Griot AI. Tous droits réservés.
          </p>

          <div className="flex items-center gap-2 text-xs">
            <Globe size={14} />
            <span>Français (FR)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}