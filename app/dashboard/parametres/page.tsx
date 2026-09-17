"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  User,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Lock,
  Save,
  Camera,
  ChevronRight,
  LogOut,
  Image as ImageIcon,
  X,
} from "lucide-react";
import axios from "@/lib/axios";

/* =========================================================
   TYPES
========================================================= */

type Profile = {
  id: number;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  avatar: string | null;
  role: string | null;
};

type Notifications = {
  publications: boolean;
  reminders: boolean;
  analytics: boolean;
  marketing: boolean;
};

type Subscription = {
  plan?: {
    nom?: string;
    name?: string;
    titre?: string;
    prix?: number | string;
  } | null;
  statut?: string | null;
  date_debut?: string | null;
  date_fin?: string | null;
  montant?: number | string | null;
  [key: string]: unknown;
};

/* =========================================================
   PAGE PARAMÈTRES
========================================================= */

export default function SettingsPage() {
  const router = useRouter();

  const [activeSection, setActiveSection] =
    useState("profil");

  /* =======================================================
     ÉTAT GÉNÉRAL
  ======================================================= */

  const [loading, setLoading] = useState(true);

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [savingNotifications, setSavingNotifications] =
    useState(false);

  const [savingPreferences, setSavingPreferences] =
    useState(false);

  const [savingPassword, setSavingPassword] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* =======================================================
     PROFIL
  ======================================================= */

  const [profile, setProfile] = useState<Profile>({
    id: 0,
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    avatar: null,
    role: "",
  });

  /* =======================================================
     FORMULAIRE PROFIL
  ======================================================= */

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [company, setCompany] =
    useState("");

  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  const [notifications, setNotifications] =
    useState<Notifications>({
      publications: true,
      reminders: true,
      analytics: false,
      marketing: false,
    });

  /* =======================================================
     PRÉFÉRENCES
  ======================================================= */

  const [language, setLanguage] =
    useState("Français");

  const [timezone, setTimezone] =
    useState("GMT +1");

  /* =======================================================
     MOT DE PASSE
  ======================================================= */

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  /* =======================================================
     PHOTO DE PROFIL
  ======================================================= */

  const [profileImage, setProfileImage] =
    useState<string | null>(null);

    const [profileImageFile, setProfileImageFile] =
  useState<File | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /* =======================================================
     ABONNEMENT
  ======================================================= */

  const [subscription, setSubscription] =
    useState<Subscription | null>(null);

  const [loadingSubscription, setLoadingSubscription] =
    useState(false);

  /* =======================================================
     MENU
  ======================================================= */

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

  /* =======================================================
     CHARGEMENT INITIAL
  ======================================================= */

  useEffect(() => {
    loadSettings();
  }, []);

  /* =======================================================
     CHARGER LES PARAMÈTRES
  ======================================================= */

  const loadSettings = async () => {
    setLoading(true);
    setError("");

    try {
      const [
        profileResponse,
        notificationsResponse,
        preferencesResponse,
      ] = await Promise.all([
        axios.get("/api/settings/profile"),
        axios.get("/api/settings/notifications"),
        axios.get("/api/settings/preferences"),
      ]);

      /* =====================================================
         PROFIL
      ===================================================== */

      const loadedProfile =
        profileResponse.data?.user;

      if (loadedProfile) {
        setProfile(loadedProfile);

        setFirstName(
          loadedProfile.first_name ?? ""
        );

        setLastName(
          loadedProfile.last_name ?? ""
        );

        setEmail(
          loadedProfile.email ?? ""
        );

        setPhone(
          loadedProfile.phone ?? ""
        );

        setCompany(
          loadedProfile.company ?? ""
        );

       if (loadedProfile.avatar) {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:8000";

  let avatarUrl =
    loadedProfile.avatar;

  if (
    !avatarUrl.startsWith("http://") &&
    !avatarUrl.startsWith("https://")
  ) {
    avatarUrl =
      `${backendUrl}${avatarUrl.startsWith("/") ? "" : "/"}${avatarUrl}`;
  }

  setProfileImage(
    avatarUrl
  );
} else {
  setProfileImage(null);
}

setProfileImageFile(null);
      }

      /* =====================================================
         NOTIFICATIONS
      ===================================================== */

      const loadedNotifications =
        notificationsResponse.data?.notifications;

      if (loadedNotifications) {
        setNotifications({
          publications:
            Boolean(
              loadedNotifications.publications
            ),
          reminders:
            Boolean(
              loadedNotifications.reminders
            ),
          analytics:
            Boolean(
              loadedNotifications.analytics
            ),
          marketing:
            Boolean(
              loadedNotifications.marketing
            ),
        });
      }

      /* =====================================================
         PRÉFÉRENCES
      ===================================================== */

      const loadedPreferences =
        preferencesResponse.data?.preferences;

      if (loadedPreferences) {
        setLanguage(
          loadedPreferences.language ??
            "Français"
        );

        setTimezone(
          loadedPreferences.timezone ??
            "GMT +1"
        );
      }
    } catch (err: any) {
      console.error(
        "Erreur chargement paramètres :",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Impossible de charger vos paramètres."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     CHARGER ABONNEMENT
  ======================================================= */

  const loadSubscription = async () => {
    setLoadingSubscription(true);

    try {
      const response = await axios.get(
        "/api/souscriptions/current"
      );

      setSubscription(
        response.data?.souscription ??
          response.data?.subscription ??
          response.data ??
          null
      );
    } catch (err) {
      console.error(
        "Erreur chargement abonnement :",
        err
      );

      setSubscription(null);
    } finally {
      setLoadingSubscription(false);
    }
  };

  /* =======================================================
     CHARGER ABONNEMENT QUAND SECTION OUVERTE
  ======================================================= */

  useEffect(() => {
    if (activeSection === "abonnement") {
      loadSubscription();
    }
  }, [activeSection]);

  /* =======================================================
     MESSAGE
  ======================================================= */

  const clearMessages = () => {
    setMessage("");
    setError("");
  };

  /* =======================================================
     MODIFIER PHOTO
  ======================================================= */

const handleImageChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  clearMessages();

  if (!file.type.startsWith("image/")) {
    setError(
      "Veuillez sélectionner une image."
    );

    event.target.value = "";
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    setError(
      "L'image ne doit pas dépasser 2 Mo."
    );

    event.target.value = "";
    return;
  }

  /*
  |--------------------------------------------------------------------------
  | Conserver réellement le fichier
  |--------------------------------------------------------------------------
  */

  setProfileImageFile(file);

  /*
  |--------------------------------------------------------------------------
  | Prévisualisation
  |--------------------------------------------------------------------------
  */

  const imageUrl =
    URL.createObjectURL(file);

  setProfileImage(imageUrl);

  setMessage(
    "Photo sélectionnée. Cliquez sur « Enregistrer les modifications » pour la sauvegarder."
  );
};

  /* =======================================================
     OUVRIR SÉLECTEUR IMAGE
  ======================================================= */

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  /* =======================================================
     SUPPRIMER PHOTO
  ======================================================= */

 const removeProfileImage = () => {
  setProfileImage(null);

  setProfileImageFile(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  clearMessages();

  setMessage(
    "La photo sera supprimée lorsque vous enregistrerez les modifications."
  );
};

  /* =======================================================
     ENREGISTRER PROFIL
  ======================================================= */

 const handleSaveProfile = async () => {
  clearMessages();

  setSavingProfile(true);

  try {
    /*
    |--------------------------------------------------------------------------
    | FormData
    |--------------------------------------------------------------------------
    */

    const formData = new FormData();

    formData.append(
      "first_name",
      firstName.trim()
    );

    formData.append(
      "last_name",
      lastName.trim()
    );

    formData.append(
      "email",
      email.trim()
    );

    formData.append(
      "phone",
      phone.trim()
    );

    formData.append(
      "company",
      company.trim()
    );

    /*
    |--------------------------------------------------------------------------
    | Ajouter la nouvelle photo uniquement si elle existe
    |--------------------------------------------------------------------------
    */

    if (profileImageFile) {
      formData.append(
        "avatar",
        profileImageFile
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Si l'utilisateur a supprimé la photo
    |--------------------------------------------------------------------------
    */

    if (
      !profileImage &&
      !profileImageFile &&
      profile.avatar
    ) {
      formData.append(
        "remove_avatar",
        "1"
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Laravel + PUT + FormData
    |--------------------------------------------------------------------------
    |
    | On utilise POST avec _method=PUT.
    | Cela permet à Laravel de recevoir correctement le fichier.
    |
    */

    formData.append(
      "_method",
      "PUT"
    );

    const response = await axios.post(
      "/api/settings/profile",
      formData
    );

    /*
    |--------------------------------------------------------------------------
    | Utilisateur retourné par Laravel
    |--------------------------------------------------------------------------
    */

    const updatedUser =
      response.data?.user;

    if (updatedUser) {

      setProfile(updatedUser);

      setFirstName(
        updatedUser.first_name ?? ""
      );

      setLastName(
        updatedUser.last_name ?? ""
      );

      setEmail(
        updatedUser.email ?? ""
      );

      setPhone(
        updatedUser.phone ?? ""
      );

      setCompany(
        updatedUser.company ?? ""
      );

      /*
      |--------------------------------------------------------------------------
      | PHOTO
      |--------------------------------------------------------------------------
      */

      if (updatedUser.avatar) {

        const backendUrl =
          process.env
            .NEXT_PUBLIC_BACKEND_URL ||
          "http://localhost:8000";

        let avatarUrl =
          updatedUser.avatar;

        if (
          !avatarUrl.startsWith("http://") &&
          !avatarUrl.startsWith("https://")
        ) {
          avatarUrl =
            `${backendUrl}${avatarUrl.startsWith("/") ? "" : "/"}${avatarUrl}`;
        }

        /*
        | Petit cache-busting pour être certain
        | que le navigateur affiche la nouvelle image.
        */
        setProfileImage(
          `${avatarUrl}?v=${Date.now()}`
        );

      } else {

        setProfileImage(null);
      }

      /*
      |--------------------------------------------------------------------------
      | Le fichier temporaire n'est plus nécessaire
      |--------------------------------------------------------------------------
      */

      setProfileImageFile(null);
    }

    setMessage(
      "Votre profil et votre photo ont été mis à jour avec succès."
    );

  } catch (err: any) {

    console.error(
      "Erreur mise à jour profil :",
      err
    );

    const validationErrors =
      err?.response?.data?.errors;

    if (validationErrors) {

      const firstError =
        Object.values(
          validationErrors
        )?.[0];

      if (
        Array.isArray(firstError) &&
        firstError.length > 0
      ) {

        setError(
          firstError[0]
        );

      } else {

        setError(
          "Les informations saisies sont invalides."
        );
      }

    } else {

      setError(
        err?.response?.data?.message ||
        "Impossible de mettre à jour le profil."
      );
    }

  } finally {

    setSavingProfile(false);
  }
};

  /* =======================================================
     ENREGISTRER NOTIFICATIONS
  ======================================================= */

  const handleSaveNotifications =
    async () => {
      clearMessages();

      setSavingNotifications(true);

      try {
        const response = await axios.put(
          "/api/settings/notifications",
          notifications
        );

        const updated =
          response.data?.notifications;

        if (updated) {
          setNotifications({
            publications:
              Boolean(
                updated.publications
              ),
            reminders:
              Boolean(
                updated.reminders
              ),
            analytics:
              Boolean(
                updated.analytics
              ),
            marketing:
              Boolean(
                updated.marketing
              ),
          });
        }

        setMessage(
          "Vos préférences de notifications ont été enregistrées."
        );
      } catch (err: any) {
        console.error(
          "Erreur notifications :",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Impossible d'enregistrer les notifications."
        );
      } finally {
        setSavingNotifications(false);
      }
    };

  /* =======================================================
     ENREGISTRER PRÉFÉRENCES
  ======================================================= */

  const handleSavePreferences =
    async () => {
      clearMessages();

      setSavingPreferences(true);

      try {
        const response = await axios.put(
          "/api/settings/preferences",
          {
            language,
            timezone,
          }
        );

        const updated =
          response.data?.preferences;

        if (updated) {
          setLanguage(
            updated.language ??
              "Français"
          );

          setTimezone(
            updated.timezone ??
              "GMT +1"
          );
        }

        setMessage(
          "Vos préférences ont été enregistrées avec succès."
        );
      } catch (err: any) {
        console.error(
          "Erreur préférences :",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Impossible d'enregistrer vos préférences."
        );
      } finally {
        setSavingPreferences(false);
      }
    };

  /* =======================================================
     MODIFIER MOT DE PASSE
  ======================================================= */

  const handleSavePassword =
    async () => {
      clearMessages();

      if (!currentPassword) {
        setError(
          "Veuillez saisir votre mot de passe actuel."
        );
        return;
      }

      if (!newPassword) {
        setError(
          "Veuillez saisir un nouveau mot de passe."
        );
        return;
      }

      if (newPassword.length < 8) {
        setError(
          "Le nouveau mot de passe doit contenir au moins 8 caractères."
        );
        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        setError(
          "Les deux nouveaux mots de passe ne correspondent pas."
        );
        return;
      }

      setSavingPassword(true);

      try {
        await axios.put(
          "/api/settings/password",
          {
            current_password:
              currentPassword,

            password:
              newPassword,

            password_confirmation:
              confirmPassword,
          }
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setMessage(
          "Votre mot de passe a été modifié avec succès."
        );
      } catch (err: any) {
        console.error(
          "Erreur mot de passe :",
          err
        );

        const validationErrors =
          err?.response?.data?.errors;

        if (validationErrors) {
          const firstError =
            Object.values(
              validationErrors
            )?.[0];

          if (
            Array.isArray(firstError) &&
            firstError.length > 0
          ) {
            setError(firstError[0]);
          } else {
            setError(
              "Impossible de modifier le mot de passe."
            );
          }
        } else {
          setError(
            err?.response?.data?.message ||
              "Impossible de modifier le mot de passe."
          );
        }
      } finally {
        setSavingPassword(false);
      }
    };

  /* =======================================================
     DÉCONNEXION
  ======================================================= */

  const handleLogout = async () => {
    clearMessages();

    setLoggingOut(true);

    try {
      await axios.post("/api/logout");
    } catch (err) {
      console.error(
        "Erreur déconnexion :",
        err
      );
    } finally {
      router.push("/auth/login");
    }
  };

  /* =======================================================
     NOM AFFICHÉ
  ======================================================= */

  const displayName =
    `${firstName} ${lastName}`.trim() ||
    profile.name ||
    "Utilisateur";

  const displayShortName =
    `${firstName} ${lastName}`
      .trim()
      .split(" ")
      .map((part) =>
        part.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  /* =======================================================
     ABONNEMENT
  ======================================================= */

  const subscriptionPlan =
    subscription?.plan?.nom ??
    subscription?.plan?.name ??
    subscription?.plan?.titre ??
    "Aucun abonnement";

  const subscriptionStatus =
    subscription?.statut ??
    "—";

  const subscriptionEnd =
    formatDate(
      subscription?.date_fin
    );

  const remainingDays =
    getRemainingDays(
      subscription?.date_fin
    );

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
                {displayName}
              </p>

              <p className="text-[9px] text-slate-400">
                {profile.role === "admin"
                  ? "Administrateur"
                  : "Utilisateur"}
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-red-600 text-xs font-black text-white">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Photo de profil"
                  className="h-full w-full object-cover"
                />
              ) : (
                displayShortName
              )}

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
            MESSAGE GLOBAL
        ===================================================== */}

        {message && (
          <div className="mb-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            {error}
          </div>
        )}

        {/* =====================================================
            CHARGEMENT
        ===================================================== */}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-red-600" />

            <p className="mt-4 text-xs font-bold text-slate-500">
              Chargement de vos paramètres...
            </p>

          </div>
        ) : (

          /* ===================================================
             GRILLE
          =================================================== */

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">

            {/* =================================================
                MENU PARAMÈTRES
            ================================================= */}

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

              <div className="space-y-1">

                {menuSections.map(
                  (section) => {

                    const Icon =
                      section.icon;

                    const active =
                      activeSection ===
                      section.id;

                    return (
                      <button
                        key={section.id}
                        onClick={() => {
                          clearMessages();
                          setActiveSection(
                            section.id
                          );
                        }}
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
                  }
                )}

              </div>

              {/* =================================================
                  DÉCONNEXION
              ================================================= */}

              <div className="mt-2 border-t border-slate-100 pt-2">

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">

                    {loggingOut ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-red-600" />
                    ) : (
                      <LogOut size={17} />
                    )}

                  </div>

                  <span className="text-xs font-bold">
                    {loggingOut
                      ? "Déconnexion..."
                      : "Se déconnecter"}
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

              {activeSection ===
                "profil" && (

                <SettingsCard
                  title="Informations du profil"
                  description="Modifiez les informations associées à votre compte."
                >

                  {/* =================================================
                      PHOTO
                  ================================================= */}

                  <div className="border-b border-slate-100 pb-6">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                      {/* PHOTO */}

                      <div className="relative shrink-0">

                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-red-600 text-xl font-black text-white">

                          {profileImage ? (

                            <img
                              src={profileImage}
                              alt="Photo de profil"
                              className="h-full w-full object-cover"
                            />

                          ) : (

                            displayShortName
                          )}

                        </div>

                        {/* CAMÉRA */}

                        <button
                          type="button"
                          onClick={
                            openImagePicker
                          }
                          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white transition hover:bg-red-600"
                          aria-label="Modifier la photo"
                        >
                          <Camera
                            size={13}
                          />
                        </button>

                      </div>

                      {/* DESCRIPTION */}

                      <div className="min-w-0">

                        <h3 className="text-sm font-black text-slate-800">
                          Photo de profil
                        </h3>

                        <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                          JPG, PNG ou WEBP. Taille maximale 2 Mo.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">

                          <button
                            type="button"
                            onClick={
                              openImagePicker
                            }
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
                          >

                            <ImageIcon
                              size={13}
                            />

                            {profileImage
                              ? "Modifier la photo"
                              : "Ajouter une photo"}

                          </button>

                          {profileImage && (

                            <button
                              type="button"
                              onClick={
                                removeProfileImage
                              }
                              className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-[10px] font-bold text-red-600 transition hover:bg-red-50"
                            >

                              <X size={13} />

                              Supprimer

                            </button>

                          )}

                        </div>

                      </div>

                    </div>

                    {/* INPUT IMAGE CACHÉ */}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={
                        handleImageChange
                      }
                      className="hidden"
                    />

                  </div>

                  {/* =================================================
                      FORMULAIRE
                  ================================================= */}

                  <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2">

                    <InputField
                      label="Prénom"
                      value={firstName}
                      onChange={
                        setFirstName
                      }
                    />

                    <InputField
                      label="Nom"
                      value={lastName}
                      onChange={
                        setLastName
                      }
                    />

                    <InputField
                      label="Adresse e-mail"
                      value={email}
                      type="email"
                      onChange={
                        setEmail
                      }
                    />

                    <InputField
                      label="Téléphone"
                      value={phone}
                      onChange={
                        setPhone
                      }
                    />

                    <div className="sm:col-span-2">

                      <InputField
                        label="Nom de l'entreprise"
                        value={company}
                        onChange={
                          setCompany
                        }
                      />

                    </div>

                  </div>

                  <SaveButton
                    onClick={
                      handleSaveProfile
                    }
                    loading={
                      savingProfile
                    }
                  />

                </SettingsCard>
              )}

              {/* =================================================
                  NOTIFICATIONS
              ================================================= */}

              {activeSection ===
                "notifications" && (

                <SettingsCard
                  title="Notifications"
                  description="Choisissez les notifications que vous souhaitez recevoir."
                >

                  <div className="space-y-2">

                    <NotificationToggle
                      title="Publications"
                      description="Recevoir une notification lorsqu'une publication est publiée."
                      checked={
                        notifications.publications
                      }
                      onChange={() =>
                        setNotifications({
                          ...notifications,
                          publications:
                            !notifications.publications,
                        })
                      }
                    />

                    <NotificationToggle
                      title="Rappels de publication"
                      description="Recevoir un rappel avant une publication programmée."
                      checked={
                        notifications.reminders
                      }
                      onChange={() =>
                        setNotifications({
                          ...notifications,
                          reminders:
                            !notifications.reminders,
                        })
                      }
                    />

                    <NotificationToggle
                      title="Rapports Analytics"
                      description="Recevoir les rapports périodiques sur vos performances."
                      checked={
                        notifications.analytics
                      }
                      onChange={() =>
                        setNotifications({
                          ...notifications,
                          analytics:
                            !notifications.analytics,
                        })
                      }
                    />

                    <NotificationToggle
                      title="Actualités et conseils"
                      description="Recevoir des conseils et nouveautés de Griot AI."
                      checked={
                        notifications.marketing
                      }
                      onChange={() =>
                        setNotifications({
                          ...notifications,
                          marketing:
                            !notifications.marketing,
                        })
                      }
                    />

                  </div>

                  <SaveButton
                    onClick={
                      handleSaveNotifications
                    }
                    loading={
                      savingNotifications
                    }
                  />

                </SettingsCard>
              )}

              {/* =================================================
                  SÉCURITÉ
              ================================================= */}

              {activeSection ===
                "securite" && (

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
                      value={
                        currentPassword
                      }
                      type="password"
                      placeholder="••••••••"
                      onChange={
                        setCurrentPassword
                      }
                    />

                    <InputField
                      label="Nouveau mot de passe"
                      value={
                        newPassword
                      }
                      type="password"
                      placeholder="••••••••"
                      onChange={
                        setNewPassword
                      }
                    />

                    <InputField
                      label="Confirmer le nouveau mot de passe"
                      value={
                        confirmPassword
                      }
                      type="password"
                      placeholder="••••••••"
                      onChange={
                        setConfirmPassword
                      }
                    />

                  </div>

                  <SaveButton
                    label="Modifier le mot de passe"
                    onClick={
                      handleSavePassword
                    }
                    loading={
                      savingPassword
                    }
                  />

                </SettingsCard>
              )}

              {/* =================================================
                  PRÉFÉRENCES
              ================================================= */}

              {activeSection ===
                "preferences" && (

                <SettingsCard
                  title="Préférences générales"
                  description="Configurez la langue et les paramètres régionaux de votre espace."
                >

                  <div className="space-y-5">

                    <SelectField
                      label="Langue"
                      value={language}
                      onChange={
                        setLanguage
                      }
                      options={[
                        "Français",
                        "English",
                      ]}
                    />

                    <SelectField
                      label="Fuseau horaire"
                      value={timezone}
                      onChange={
                        setTimezone
                      }
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

                  <SaveButton
                    onClick={
                      handleSavePreferences
                    }
                    loading={
                      savingPreferences
                    }
                  />

                </SettingsCard>
              )}

              {/* =================================================
                  ABONNEMENT
              ================================================= */}

              {activeSection ===
                "abonnement" && (

                <SettingsCard
                  title="Mon abonnement"
                  description="Consultez votre formule et gérez votre abonnement Griot AI."
                >

                  {loadingSubscription ? (

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">

                      <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-red-600" />

                      <p className="mt-3 text-xs font-bold text-slate-500">
                        Chargement de votre abonnement...
                      </p>

                    </div>

                  ) : (

                    <>
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-6 text-white">

                        <div className="relative z-10">

                          <p className="text-[10px] font-black uppercase tracking-widest text-red-100">
                            Formule actuelle
                          </p>

                          <h3 className="mt-2 text-2xl font-black">
                            {subscriptionPlan}
                          </h3>

                          <p className="mt-2 max-w-md text-xs leading-relaxed text-red-100">
                            Consultez votre formule actuelle et
                            gérez votre abonnement Griot AI.
                          </p>

                          <div className="mt-5 flex flex-wrap gap-2">

                            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold">
                              ✓ Publications
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
                          value={
                            formatSubscriptionStatus(
                              subscriptionStatus
                            )
                          }
                        />

                        <SubscriptionStat
                          label="Jours restants"
                          value={
                            remainingDays !== null
                              ? `${remainingDays} jours`
                              : "—"
                          }
                        />

                        <SubscriptionStat
                          label="Fin de l'abonnement"
                          value={
                            subscriptionEnd
                          }
                        />

                      </div>

                      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">

                        <Link
                          href="/auth/abonnement"
                          className="rounded-xl bg-red-600 px-5 py-3 text-center text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
                        >
                          Gérer mon abonnement
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setMessage(
                              "La gestion des factures sera disponible lorsque le module de facturation sera connecté."
                            );
                          }}
                          className="rounded-xl border border-slate-200 px-5 py-3 text-[10px] font-bold text-slate-600 hover:bg-slate-50"
                        >
                          Voir les factures
                        </button>

                      </div>
                    </>
                  )}

                </SettingsCard>
              )}

            </div>

          </div>
        )}

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
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
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
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-semibold outline-none focus:border-red-400 focus:bg-white"
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
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
      type="button"
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked
          ? "bg-red-600"
          : "bg-slate-200"
      }`}
      aria-label="Activer ou désactiver"
    >

      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          checked
            ? "left-6"
            : "left-1"
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
  onClick,
  loading = false,
}: {
  label?: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">

      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >

        {loading ? (
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <Save size={14} />
        )}

        {loading
          ? "Enregistrement..."
          : label}

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

/* =========================================================
   DATE
========================================================= */

function formatDate(
  date?: string | null
) {
  if (!date) {
    return "—";
  }

  const parsedDate =
    new Date(date);

  if (Number.isNaN(
    parsedDate.getTime()
  )) {
    return "—";
  }

  return parsedDate.toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

/* =========================================================
   JOURS RESTANTS
========================================================= */

function getRemainingDays(
  date?: string | null
) {
  if (!date) {
    return null;
  }

  const endDate =
    new Date(date);

  if (
    Number.isNaN(
      endDate.getTime()
    )
  ) {
    return null;
  }

  const now = new Date();

  const difference =
    endDate.getTime() -
    now.getTime();

  return Math.max(
    0,
    Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    )
  );
}

/* =========================================================
   STATUT ABONNEMENT
========================================================= */

function formatSubscriptionStatus(
  status?: string | null
) {
  if (!status) {
    return "—";
  }

  switch (status.toLowerCase()) {
    case "actif":
      return "Actif";

    case "en_attente":
      return "En attente";

    case "expiree":
      return "Expiré";

    case "expiré":
      return "Expiré";

    default:
      return status;
  }
}