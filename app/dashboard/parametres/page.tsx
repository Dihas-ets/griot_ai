"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Lock,
  Save,
  Camera,
  Check,
  ChevronRight,
  LogOut,
} from "lucide-react";

/* =========================================================
   PAGE PARAMÈTRES
========================================================= */

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profil");

  const [notifications, setNotifications] = useState({
    publications: true,
    reminders: true,
    analytics: false,
    marketing: false,
  });

  const [language, setLanguage] = useState("Français");
  const [timezone, setTimezone] = useState("GMT +1");
  const [theme, setTheme] = useState("Clair");

  const menuSections = [
    {
      id: "profil",
      label: "Profil",
      description: "Informations personnelles",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Gérer vos alertes",
      icon: Bell,
    },
    {
      id: "securite",
      label: "Sécurité",
      description: "Mot de passe et accès",
      icon: Shield,
    },
    {
      id: "apparence",
      label: "Apparence",
      description: "Personnaliser l'interface",
      icon: Palette,
    },
    {
      id: "preferences",
      label: "Préférences",
      description: "Langue et région",
      icon: Globe,
    },
    {
      id: "abonnement",
      label: "Abonnement",
      description: "Votre formule Griot AI",
      icon: CreditCard,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* GAUCHE */}

          <div className="flex min-w-0 items-center gap-3">

            <Link
              href="/dashboard"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ChevronLeft size={18} />
            </Link>

            <div className="min-w-0">
              <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
                Configuration
              </p>

              <h1 className="truncate text-sm font-black sm:text-base">
                Paramètres
              </h1>
            </div>

          </div>

          {/* DROITE */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold text-slate-800">
                YEKINI K.
              </p>

              <p className="text-[9px] text-slate-400">
                Administrateur
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">
              Y
            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ===================================================== */}

      <main className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">

        {/* TITRE */}

        <div className="mb-6">

          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Paramètres
          </h2>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Gérez votre profil, vos préférences et les paramètres de votre espace Griot AI.
          </p>

        </div>

        {/* =====================================================
            GRILLE
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">

          {/* =================================================
              MENU PARAMÈTRES
          ================================================= */}

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

            <div className="space-y-1">

              {menuSections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      active
                        ? "bg-red-50 text-red-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-red-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p
                        className={`text-xs font-bold ${
                          active
                            ? "text-red-600"
                            : "text-slate-700"
                        }`}
                      >
                        {section.label}
                      </p>

                      <p className="truncate text-[9px] text-slate-400">
                        {section.description}
                      </p>

                    </div>

                    {active && (
                      <ChevronRight
                        size={14}
                        className="shrink-0 text-red-500"
                      />
                    )}

                  </button>
                );
              })}

            </div>

            {/* DÉCONNEXION */}

            <div className="mt-2 border-t border-slate-100 pt-2">

              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-500 transition hover:bg-red-50 hover:text-red-600">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  <LogOut size={17} />
                </div>

                <span className="text-xs font-bold">
                  Se déconnecter
                </span>

              </button>

            </div>

          </aside>

          {/* =================================================
              CONTENU PARAMÈTRE
          ================================================= */}

          <div className="min-w-0">

            {/* =================================================
                PROFIL
            ================================================= */}

            {activeSection === "profil" && (
              <SettingsCard
                title="Informations du profil"
                description="Modifiez les informations associées à votre compte."
              >

                {/* PHOTO */}

                <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">

                  <div className="relative">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-xl font-black text-white">
                      IM
                    </div>

                    <button
                      className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white"
                      aria-label="Modifier la photo"
                    >
                      <Camera size={13} />
                    </button>

                  </div>

                  <div>

                    <h3 className="text-sm font-black text-slate-800">
                      Photo de profil
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-400">
                      JPG, PNG ou WEBP. Taille maximale 2 Mo.
                    </p>

                    <button className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50">
                      Modifier la photo
                    </button>

                  </div>

                </div>

                {/* FORMULAIRE */}

                <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2">

                  <InputField
                    label="Prénom"
                    value="Idrissou"
                  />

                  <InputField
                    label="Nom"
                    value="M."
                  />

                  <InputField
                    label="Adresse e-mail"
                    value="idrissou@example.com"
                    type="email"
                  />

                  <InputField
                    label="Téléphone"
                    value="+229 00 00 00 00"
                  />

                  <div className="sm:col-span-2">
                    <InputField
                      label="Nom de l'entreprise"
                      value="Presta SARL"
                    />
                  </div>

                </div>

                <SaveButton />

              </SettingsCard>
            )}

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            {activeSection === "notifications" && (
              <SettingsCard
                title="Notifications"
                description="Choisissez les notifications que vous souhaitez recevoir."
              >

                <div className="space-y-2">

                  <NotificationToggle
                    title="Publications"
                    description="Recevoir une notification lorsqu'une publication est publiée."
                    checked={notifications.publications}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        publications: !notifications.publications,
                      })
                    }
                  />

                  <NotificationToggle
                    title="Rappels de publication"
                    description="Recevoir un rappel avant une publication programmée."
                    checked={notifications.reminders}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        reminders: !notifications.reminders,
                      })
                    }
                  />

                  <NotificationToggle
                    title="Rapports Analytics"
                    description="Recevoir les rapports périodiques sur vos performances."
                    checked={notifications.analytics}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        analytics: !notifications.analytics,
                      })
                    }
                  />

                  <NotificationToggle
                    title="Actualités et conseils"
                    description="Recevoir des conseils et nouveautés de Griot AI."
                    checked={notifications.marketing}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        marketing: !notifications.marketing,
                      })
                    }
                  />

                </div>

                <SaveButton />

              </SettingsCard>
            )}

            {/* =================================================
                SÉCURITÉ
            ================================================= */}

            {activeSection === "securite" && (
              <SettingsCard
                title="Sécurité du compte"
                description="Protégez votre compte et gérez vos informations de connexion."
              >

                <div className="rounded-xl border border-red-100 bg-red-50 p-4">

                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                      <Lock size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-black text-red-700">
                        Votre compte est sécurisé
                      </p>

                      <p className="mt-1 text-[10px] leading-relaxed text-red-600">
                        Votre mot de passe est actuellement actif.
                        Pensez à le modifier régulièrement.
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-6 space-y-5">

                  <InputField
                    label="Mot de passe actuel"
                    value=""
                    type="password"
                    placeholder="••••••••"
                  />

                  <InputField
                    label="Nouveau mot de passe"
                    value=""
                    type="password"
                    placeholder="••••••••"
                  />

                  <InputField
                    label="Confirmer le nouveau mot de passe"
                    value=""
                    type="password"
                    placeholder="••••••••"
                  />

                </div>

                <SaveButton label="Modifier le mot de passe" />

              </SettingsCard>
            )}

            {/* =================================================
                APPARENCE
            ================================================= */}

            {activeSection === "apparence" && (
              <SettingsCard
                title="Apparence"
                description="Personnalisez l'apparence de votre espace de travail."
              >

                <div>

                  <label className="mb-3 block text-xs font-black text-slate-700">
                    Thème
                  </label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                    {["Clair", "Sombre", "Système"].map((item) => {

                      const active = theme === item;

                      return (
                        <button
                          key={item}
                          onClick={() => setTheme(item)}
                          className={`rounded-xl border p-4 text-left transition ${
                            active
                              ? "border-red-500 bg-red-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >

                          <div
                            className={`mb-3 h-16 rounded-lg border ${
                              item === "Sombre"
                                ? "border-slate-700 bg-slate-900"
                                : "border-slate-200 bg-white"
                            }`}
                          />

                          <div className="flex items-center justify-between">

                            <span className="text-xs font-bold text-slate-700">
                              {item}
                            </span>

                            {active && (
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white">
                                <Check size={12} />
                              </span>
                            )}

                          </div>

                        </button>
                      );
                    })}

                  </div>

                </div>

                <div className="mt-6 rounded-xl border border-slate-200 p-4">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        Interface compacte
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Réduire les espacements pour afficher davantage de contenu.
                      </p>
                    </div>

                    <Toggle checked={false} />

                  </div>

                </div>

                <SaveButton />

              </SettingsCard>
            )}

            {/* =================================================
                PRÉFÉRENCES
            ================================================= */}

            {activeSection === "preferences" && (
              <SettingsCard
                title="Préférences générales"
                description="Configurez la langue et les paramètres régionaux de votre espace."
              >

                <div className="space-y-5">

                  <SelectField
                    label="Langue"
                    value={language}
                    onChange={setLanguage}
                    options={[
                      "Français",
                      "English",
                    ]}
                  />

                  <SelectField
                    label="Fuseau horaire"
                    value={timezone}
                    onChange={setTimezone}
                    options={[
                      "GMT +1",
                      "GMT +0",
                      "GMT +2",
                    ]}
                  />

                </div>

                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <div className="flex items-start gap-3">

                    <Globe
                      size={17}
                      className="mt-0.5 text-red-600"
                    />

                    <div>

                      <p className="text-xs font-bold text-slate-700">
                        Heure des publications
                      </p>

                      <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                        Les publications programmées utiliseront le fuseau
                        horaire sélectionné ci-dessus.
                      </p>

                    </div>

                  </div>

                </div>

                <SaveButton />

              </SettingsCard>
            )}

            {/* =================================================
                ABONNEMENT
            ================================================= */}

            {activeSection === "abonnement" && (
              <SettingsCard
                title="Mon abonnement"
                description="Consultez votre formule et gérez votre abonnement Griot AI."
              >

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-6 text-white">

                  <div className="relative z-10">

                    <p className="text-[10px] font-black uppercase tracking-widest text-red-100">
                      Formule actuelle
                    </p>

                    <h3 className="mt-2 text-2xl font-black">
                      Plan Premium
                    </h3>

                    <p className="mt-2 max-w-md text-xs leading-relaxed text-red-100">
                      Profitez de toutes les fonctionnalités de Griot AI
                      pour créer, planifier et analyser vos contenus.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">

                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold">
                        ✓ Publications illimitées
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold">
                        ✓ IA avancée
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold">
                        ✓ Analytics
                      </span>

                    </div>

                  </div>

                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                  <div className="absolute -bottom-16 -right-4 h-40 w-40 rounded-full bg-white/5" />

                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <SubscriptionStat
                    label="Statut"
                    value="Actif"
                  />

                  <SubscriptionStat
                    label="Jours restants"
                    value="12 jours"
                  />

                  <SubscriptionStat
                    label="Renouvellement"
                    value="25 août 2026"
                  />

                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">

                  <button className="rounded-xl bg-red-600 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/20 hover:bg-red-700">
                    Gérer mon abonnement
                  </button>

                  <button className="rounded-xl border border-slate-200 px-5 py-3 text-[10px] font-bold text-slate-600 hover:bg-slate-50">
                    Voir les factures
                  </button>

                </div>

              </SettingsCard>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="border-b border-slate-100 pb-5">

        <h2 className="text-sm font-black text-slate-800 sm:text-base">
          {title}
        </h2>

        <p className="mt-1 text-[10px] leading-relaxed text-slate-400 sm:text-xs">
          {description}
        </p>

      </div>

      <div className="pt-5">
        {children}
      </div>

    </section>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  value,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-medium outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/5"
      />

    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-semibold outline-none focus:border-red-400 focus:bg-white"
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

/* =========================================================
   NOTIFICATION
========================================================= */

function NotificationToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">

      <div className="min-w-0 flex-1">

        <p className="text-xs font-bold text-slate-700">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
          {description}
        </p>

      </div>

      <Toggle
        checked={checked}
        onChange={onChange}
      />

    </div>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-red-600" : "bg-slate-200"
      }`}
      aria-label="Activer ou désactiver"
    >

      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          checked ? "left-6" : "left-1"
        }`}
      />

    </button>
  );
}

/* =========================================================
   SAVE BUTTON
========================================================= */

function SaveButton({
  label = "Enregistrer les modifications",
}: {
  label?: string;
}) {
  return (
    <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">

      <button className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700">

        <Save size={14} />

        {label}

      </button>

    </div>
  );
}

/* =========================================================
   SUBSCRIPTION STAT
========================================================= */

function SubscriptionStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-black text-slate-800">
        {value}
      </p>

    </div>
  );
}