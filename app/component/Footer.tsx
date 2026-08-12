"use client";

import {
  Globe,
  MessageSquare,
  Mail,
  User,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-600 border-t border-slate-200">
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

              <p className="mt-5 text-white text-sm leading-6 max-w-sm">
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
                      hover:bg-red-dark
                      hover:text-white
                      hover:border-red-light
                      text-white 
                    "
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* PRODUIT */}
            <div>
              <h6 className="text-xs text-white underline font-bold uppercase tracking-widest mb-6">
                Produit
              </h6>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#features" className="text-white  hover:text-black transition-colors">
                    Génération IA
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-white  hover:text-black transition-colors">
                    Fonctionnalités
                  </a>
                </li>
               
                <li>
                  <a href="#pricing" className="text-white  hover:text-black transition-colors">
                    Tarifs
                  </a>
                </li>
              </ul>
            </div>

            {/* NAVIGATION */}
            <div>
              <h6 className="text-xs text-white underline font-bold uppercase tracking-widest mb-6">
                Navigation
              </h6>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#accueil" className="text-white  hover:text-black transition-colors">
                    Accueil
                  </a>
                </li>
                 <li>
                  <a href="#how" className="text-white  hover:text-black transition-colors">
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-white  hover:text-black transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-white  hover:text-black  transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white  hover:text-black transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white hover:text-black transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* LÉGAL */}
            <div>
              <h6 className="text-xs text-white underline font-bold uppercase tracking-widest mb-6">
                Légal
              </h6>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="text-white  hover:text-black transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white  hover:text-black transition-colors">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white  hover:text-black transition-colors">
                    Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white  hover:text-black transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}