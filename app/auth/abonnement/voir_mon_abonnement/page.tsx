"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Crown,
  CalendarDays,
  Clock3,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import axios from "@/lib/axios";

type Subscription = {
  id?: number | string;

  status?: string;
  statut?: string;

  date_debut?: string | null;
  date_fin?: string | null;

  start_date?: string | null;
  end_date?: string | null;

  jours_restants?: number | string | null;
  days_remaining?: number | string | null;

  montant?: number | string | null;
  amount?: number | string | null;

  devise?: string | null;
  currency?: string | null;

  plan?: {
    id?: number | string;

    nom?: string;
    name?: string;
    titre?: string;

    description?: string;

    prix?: number | string;
    price?: number | string;

    devise?: string;
    currency?: string;

    duree?: number | string;
    duree_unite?: string;

    features?: string[];
  } | null;

  plan_nom?: string | null;
  plan_name?: string | null;
};

export default function VoirAbonnementPage() {
  const [subscription, setSubscription] =
    useState<Subscription | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
   * ==========================================================
   * CHARGEMENT DE L'ABONNEMENT
   * ==========================================================
   */
  useEffect(() => {
    const loadSubscription = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "/api/souscriptions/current",
        );

        const responseData = response.data;

        /*
         * Le backend peut retourner :
         *
         * { souscription: {...} }
         * { subscription: {...} }
         * { data: {...} }
         * ou directement {...}
         */
        const data =
          responseData?.souscription ??
          responseData?.subscription ??
          responseData?.data ??
          responseData;

        if (!data || data === false) {
          setSubscription(null);
          return;
        }

        setSubscription(data);
      } catch (err) {
        console.error(
          "Erreur lors du chargement de l'abonnement :",
          err,
        );

        setError(
          "Impossible de récupérer votre abonnement.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, []);

  /*
   * ==========================================================
   * NOM DU PLAN
   * ==========================================================
   */
  const getPlanName = () => {
    if (!subscription) {
      return "Aucun abonnement";
    }

    return (
      subscription.plan?.nom ??
      subscription.plan?.name ??
      subscription.plan?.titre ??
      subscription.plan_nom ??
      subscription.plan_name ??
      "Plan"
    );
  };

  /*
   * ==========================================================
   * PLAN GRATUIT
   * ==========================================================
   */
  const isFreePlan = () => {
    const planName = getPlanName();

    return (
      planName
        .toString()
        .trim()
        .toLowerCase()
        .includes("gratuit")
    );
  };

  /*
   * ==========================================================
   * STATUT
   * ==========================================================
   */
  const getStatus = () => {
    if (!subscription) {
      return "Aucun";
    }

    return (
      subscription.statut ??
      subscription.status ??
      "Inconnu"
    );
  };

  /*
   * ==========================================================
   * STATUT NORMALISÉ
   * ==========================================================
   */
  const normalizedStatus = getStatus()
    .toString()
    .toLowerCase();

  const isActive =
    normalizedStatus === "actif" ||
    normalizedStatus === "active";

  const isPending =
    normalizedStatus === "en_attente" ||
    normalizedStatus === "pending" ||
    normalizedStatus === "attente";

  const isExpired =
    normalizedStatus === "expiree" ||
    normalizedStatus === "expirée" ||
    normalizedStatus === "expire" ||
    normalizedStatus === "expired";

  /*
   * ==========================================================
   * JOURS RESTANTS
   * ==========================================================
   */
  const getDaysRemaining = () => {
    /*
     * IMPORTANT :
     * Le plan gratuit n'a pas de durée.
     */
    if (!subscription || isFreePlan()) {
      return null;
    }

    const backendDays =
      subscription.jours_restants ??
      subscription.days_remaining;

    if (
      backendDays !== undefined &&
      backendDays !== null &&
      backendDays !== ""
    ) {
      const days = Number(backendDays);

      if (!Number.isNaN(days)) {
        return Math.max(
          0,
          Math.ceil(days),
        );
      }
    }

    const endDate =
      subscription.date_fin ??
      subscription.end_date;

    if (!endDate) {
      return null;
    }

    const end = new Date(endDate);

    if (Number.isNaN(end.getTime())) {
      return null;
    }

    const now = new Date();

    const difference =
      end.getTime() - now.getTime();

    return Math.max(
      0,
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24),
      ),
    );
  };

  const daysRemaining =
    getDaysRemaining();

  /*
   * ==========================================================
   * FORMATAGE DATE
   * ==========================================================
   */
  const formatDate = (
    date: string | null | undefined,
  ) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat(
      "fr-FR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      },
    ).format(parsedDate);
  };

  /*
   * ==========================================================
   * MONTANT
   * ==========================================================
   */
  const getAmount = () => {
    if (!subscription) {
      return null;
    }

    const amount =
      subscription.montant ??
      subscription.amount ??
      subscription.plan?.prix ??
      subscription.plan?.price;

    if (
      amount === undefined ||
      amount === null ||
      amount === ""
    ) {
      return null;
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount)) {
      return null;
    }

    return new Intl.NumberFormat(
      "fr-FR",
      {
        maximumFractionDigits: 0,
      },
    ).format(numericAmount);
  };

  const amount = getAmount();

  /*
   * ==========================================================
   * DEVISE
   * ==========================================================
   */
  const currency =
    subscription?.devise ??
    subscription?.currency ??
    subscription?.plan?.devise ??
    subscription?.plan?.currency ??
    "FCFA";

  /*
   * ==========================================================
   * FONCTIONNALITÉS
   * ==========================================================
   */
  const features =
    subscription?.plan?.features ?? [];

  /*
   * ==========================================================
   * CHARGEMENT
   * ==========================================================
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 h-9 w-64 animate-pulse rounded bg-slate-200" />

            <div className="mt-2 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-80 animate-pulse rounded-3xl bg-white shadow-sm" />

            <div className="h-80 animate-pulse rounded-3xl bg-white shadow-sm lg:col-span-2" />
          </div>
        </div>
      </main>
    );
  }

  /*
   * ==========================================================
   * ERREUR
   * ==========================================================
   */
  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/dashboard"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
          >
            <ArrowLeft size={18} />

            Retour au tableau de bord
          </Link>

          <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <CreditCard size={26} />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              Impossible de charger votre abonnement
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <RefreshCw size={17} />

              Réessayer
            </button>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ==========================================================
   * AUCUN ABONNEMENT
   * ==========================================================
   */
  if (!subscription) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
          >
            <ArrowLeft size={18} />

            Retour au tableau de bord
          </Link>

          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Crown size={30} />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Aucun abonnement actif
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              Vous utilisez actuellement Griot AI
              sans abonnement actif. Découvrez les
              plans disponibles et choisissez celui
              qui correspond à vos besoins.
            </p>

            <Link
              href="/auth/abonnement"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <Sparkles size={17} />

              Voir les plans
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ==================================================
            EN-TÊTE
        ================================================== */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
          >
            <ArrowLeft size={18} />

            Retour au tableau de bord
          </Link>

          <div className="mt-5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Mon abonnement
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Consultez votre formule et les informations
              liées à votre abonnement.
            </p>
          </div>
        </div>

        {/* ==================================================
            CONTENU
        ================================================== */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* ==================================================
              CARTE PLAN
          ================================================== */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm lg:col-span-1">

            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-800 p-6 text-white">

              <Crown className="absolute -right-5 -top-5 h-28 w-28 rotate-12 text-white/10" />

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Crown size={24} />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-red-100">
                  Votre formule
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {getPlanName()}
                </h2>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">

                  <span
                    className={`h-2 w-2 rounded-full ${
                      isActive
                        ? "bg-green-300"
                        : isPending
                          ? "bg-yellow-300"
                          : isExpired
                            ? "bg-red-200"
                            : "bg-white"
                    }`}
                  />

                  {getStatus()}

                </div>
              </div>
            </div>

            <div className="p-6">

              {/* ==================================================
                  TEMPS RESTANT
                  UNIQUEMENT POUR LES PLANS PAYANTS
              ================================================== */}
              {!isFreePlan() &&
                daysRemaining !== null &&
                !isExpired && (
                  <div className="rounded-2xl bg-red-50 p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                        <Clock3 size={20} />
                      </div>

                      <div>

                        <p className="text-xs font-medium text-slate-500">
                          Temps restant
                        </p>

                        <p className="text-lg font-bold text-slate-900">
                          {daysRemaining === 1
                            ? "1 jour"
                            : `${daysRemaining} jours`}
                        </p>

                      </div>
                    </div>
                  </div>
                )}

              {/* ==================================================
                  MESSAGE PLAN GRATUIT
              ================================================== */}
              {isFreePlan() && (
                <div className="rounded-2xl bg-slate-50 p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <Sparkles size={20} />
                    </div>

                    <div>

                      <p className="text-xs font-medium text-slate-500">
                        Votre accès
                      </p>

                      <p className="text-sm font-bold text-slate-900">
                        Accès gratuit
                      </p>

                    </div>
                  </div>
                </div>
              )}

              {/* ==================================================
                  RENOUVELLEMENT
              ================================================== */}
              <Link
                href="/auth/abonnement"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={17} />

                {isFreePlan()
                  ? "Choisir un plan"
                  : "Renouveler mon abonnement"}
              </Link>

            </div>
          </div>

          {/* ==================================================
              DÉTAILS
          ================================================== */}
          <div className="space-y-6 lg:col-span-2">

            {/* ==================================================
                PÉRIODE
                UNIQUEMENT POUR LES PLANS PAYANTS
            ================================================== */}
            {!isFreePlan() && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <CalendarDays size={20} />
                  </div>

                  <div>

                    <h2 className="text-base font-bold text-slate-900">
                      Période d'abonnement
                    </h2>

                    <p className="text-xs text-slate-500">
                      Informations sur votre période actuelle
                    </p>

                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl border border-slate-100 p-4">

                    <p className="text-xs font-medium text-slate-400">
                      Date de début
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(
                        subscription.date_debut ??
                          subscription.start_date,
                      )}
                    </p>

                  </div>

                  <div className="rounded-2xl border border-slate-100 p-4">

                    <p className="text-xs font-medium text-slate-400">
                      Date de fin
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(
                        subscription.date_fin ??
                          subscription.end_date,
                      )}
                    </p>

                  </div>

                </div>
              </div>
            )}

            {/* ==================================================
                INFORMATIONS DU PLAN
            ================================================== */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <CreditCard size={20} />
                </div>

                <div>

                  <h2 className="text-base font-bold text-slate-900">
                    Informations du plan
                  </h2>

                  <p className="text-xs text-slate-500">
                    Détails de votre formule actuelle
                  </p>

                </div>

              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-100 p-4">

                  <p className="text-xs font-medium text-slate-400">
                    Plan
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {getPlanName()}
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-100 p-4">

                  <p className="text-xs font-medium text-slate-400">
                    Montant
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {amount !== null
                      ? `${amount} ${currency}`
                      : "—"}
                  </p>

                </div>

              </div>
            </div>

            {/* ==================================================
                FONCTIONNALITÉS
            ================================================== */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <ShieldCheck size={20} />
                </div>

                <div>

                  <h2 className="text-base font-bold text-slate-900">
                    Fonctionnalités incluses
                  </h2>

                  <p className="text-xs text-slate-500">
                    Ce qui est inclus dans votre formule
                  </p>

                </div>

              </div>

              {features.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  {features.map(
                    (feature, index) => (
                      <div
                        key={`${feature}-${index}`}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                      >

                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <Check size={14} />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {feature}
                        </span>

                      </div>
                    ),
                  )}

                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">

                  <p className="text-sm text-slate-500">
                    Les fonctionnalités détaillées
                    de votre plan seront affichées ici.
                  </p>

                </div>
              )}
            </div>

            {/* ==================================================
                RENOUVELLEMENT
            ================================================== */}
            <div className="rounded-3xl border border-red-100 bg-red-50 p-6">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="text-base font-bold text-slate-900">
                    {isFreePlan()
                      ? "Passez à un plan supérieur"
                      : "Vous souhaitez continuer avec Griot AI ?"}
                  </h2>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                    {isFreePlan()
                      ? "Découvrez les plans disponibles et choisissez la formule qui correspond à vos besoins."
                      : "Vous pouvez renouveler votre abonnement même avant sa date d'expiration. Votre période actuelle ne sera pas interrompue."}
                  </p>

                </div>

                <Link
                  href="/auth/abonnement"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  {isFreePlan() ? (
                    <Sparkles size={17} />
                  ) : (
                    <RefreshCw size={17} />
                  )}

                  {isFreePlan()
                    ? "Voir les plans"
                    : "Renouveler"}
                </Link>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}