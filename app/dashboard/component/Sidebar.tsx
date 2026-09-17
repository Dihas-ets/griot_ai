"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  PenTool,
  Calendar,
  FileText,
  FolderOpen,
  Share2,
  Layout,
  Megaphone,
  Image as ImageIcon,
  BarChart3,
  Settings,
  ChevronRight,
  Crown,
} from "lucide-react";

import axios from "@/lib/axios";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Tableau de bord",
    href: "/dashboard",
  },
  {
    icon: PenTool,
    label: "Créer une publication",
    href: "/dashboard/publication",
  },
  {
    icon: Calendar,
    label: "Calendrier",
    href: "/dashboard/calendrier",
  },
  {
    icon: FileText,
    label: "Publications",
    href: "/dashboard/mes_publications",
  },
  {
    icon: FolderOpen,
    label: "Projets",
    href: "/dashboard/projets",
  },
  {
    icon: Share2,
    label: "Réseaux sociaux",
    href: "/dashboard/reseaux_sociaux",
  },
  {
    icon: Layout,
    label: "Modèles",
    href: "/dashboard/modeles",
  },
  {
    icon: Megaphone,
    label: "Campagnes",
    href: "/dashboard/campagnes",
  },
  {
    icon: ImageIcon,
    label: "Médias",
    href: "/dashboard/medias",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    icon: Settings,
    label: "Paramètres",
    href: "/dashboard/parametres",
  },
];

type Subscription = {
  planName: string;
  status: string;
  daysRemaining: number | null;
};

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [subscription, setSubscription] =
    useState<Subscription | null>(null);

  const [loadingSubscription, setLoadingSubscription] =
    useState(true);

  const closeMenu = () => {
    setOpen(false);
  };

  /*
   * ==========================================================
   * RÉCUPÉRATION DE L'ABONNEMENT
   * ==========================================================
   */
  useEffect(() => {
    let mounted = true;

    const loadSubscription = async () => {
      try {
        setLoadingSubscription(true);

        const response = await axios.get(
          "/api/souscriptions/current",
        );

        if (!mounted) {
          return;
        }

        const responseData = response.data;

        /*
         * Le backend peut retourner directement la souscription
         * ou l'encapsuler dans data / souscription / subscription.
         */
        const data =
          responseData?.souscription ??
          responseData?.subscription ??
          responseData?.data ??
          responseData;

        /*
         * Aucun abonnement
         */
        if (!data || data === null || data === false) {
          setSubscription(null);
          return;
        }

        /*
         * ======================================================
         * PLAN
         * ======================================================
         */
        const plan =
          data?.plan ??
          data?.subscription_plan ??
          data?.offre ??
          null;

        const planName =
          plan?.nom ??
          plan?.name ??
          plan?.titre ??
          data?.plan_nom ??
          data?.plan_name ??
          data?.nom_plan ??
          "Aucun abonnement";

        /*
         * ======================================================
         * STATUT
         * ======================================================
         */
        const status =
          data?.statut ??
          data?.status ??
          "inconnu";

        /*
         * ======================================================
         * JOURS RESTANTS
         * ======================================================
         */
        let daysRemaining: number | null = null;

        const backendDays =
          data?.jours_restants ??
          data?.days_remaining ??
          data?.remaining_days;

        if (
          backendDays !== undefined &&
          backendDays !== null &&
          backendDays !== ""
        ) {
          const parsedDays = Number(backendDays);

          if (!Number.isNaN(parsedDays)) {
            daysRemaining = Math.max(
              0,
              Math.ceil(parsedDays),
            );
          }
        }

        /*
         * Si le backend ne fournit pas directement
         * les jours restants, on les calcule avec date_fin.
         */
        if (
          daysRemaining === null &&
          (data?.date_fin || data?.end_date)
        ) {
          const endDate = new Date(
            data?.date_fin ?? data?.end_date,
          );

          if (!Number.isNaN(endDate.getTime())) {
            const now = new Date();

            const difference =
              endDate.getTime() - now.getTime();

            daysRemaining = Math.max(
              0,
              Math.ceil(
                difference /
                  (1000 * 60 * 60 * 24),
              ),
            );
          }
        }

        setSubscription({
          planName,
          status,
          daysRemaining,
        });
      } catch (error) {
        console.error(
          "Erreur lors du chargement de l'abonnement :",
          error,
        );

        if (mounted) {
          setSubscription(null);
        }
      } finally {
        if (mounted) {
          setLoadingSubscription(false);
        }
      }
    };

    loadSubscription();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * ==========================================================
   * DÉTECTION DU PLAN GRATUIT
   * ==========================================================
   */
  const isFreePlan = () => {
    if (!subscription) {
      return false;
    }

    return subscription.planName
      ?.toString()
      .trim()
      .toLowerCase()
      .includes("gratuit");
  };

  /*
   * ==========================================================
   * TEXTE DU STATUT / JOURS RESTANTS
   * ==========================================================
   */
  const getSubscriptionText = () => {
    if (loadingSubscription) {
      return "Chargement...";
    }

    if (!subscription) {
      return "Aucun abonnement actif";
    }

    /*
     * PLAN GRATUIT
     *
     * Aucun jour restant et aucune notion
     * de date d'expiration.
     */
    if (isFreePlan()) {
      return "Accès gratuit";
    }

    const normalizedStatus =
      subscription.status
        ?.toString()
        .toLowerCase();

    /*
     * Abonnement expiré
     */
    if (
      normalizedStatus === "expiree" ||
      normalizedStatus === "expirée" ||
      normalizedStatus === "expire" ||
      normalizedStatus === "expired"
    ) {
      return "Abonnement expiré";
    }

    /*
     * Abonnement en attente
     */
    if (
      normalizedStatus === "en_attente" ||
      normalizedStatus === "pending" ||
      normalizedStatus === "attente"
    ) {
      return "En attente";
    }

    /*
     * Nombre de jours disponibles
     */
    if (subscription.daysRemaining !== null) {
      if (subscription.daysRemaining === 0) {
        return "Expire aujourd'hui";
      }

      if (subscription.daysRemaining === 1) {
        return "1 jour restant";
      }

      return `${subscription.daysRemaining} jours restants`;
    }

    /*
     * Si le backend ne fournit pas de date
     */
    if (
      normalizedStatus === "actif" ||
      normalizedStatus === "active"
    ) {
      return "Abonnement actif";
    }

    return subscription.status || "Abonnement actif";
  };

  return (
    <>
      {/* =====================================================
          BOUTON BURGER
          Visible uniquement sur mobile/tablette
          ET uniquement quand le Sidebar est fermé
      ===================================================== */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          className="
            fixed
            left-4
            top-4
            z-[60]
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[#0f172a]
            text-white
            shadow-lg
            shadow-slate-900/20
            transition
            hover:bg-slate-800
            lg:hidden
          "
        >
          <Menu size={24} />
        </button>
      )}

      {/* =====================================================
          OVERLAY
          Visible uniquement quand le Sidebar est ouvert
      ===================================================== */}
      {open && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={closeMenu}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-64
          flex-col
          bg-[#0f172a]
          text-slate-400
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          lg:shadow-none

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* ===================================================
            HEADER DU SIDEBAR
        =================================================== */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-800/60 p-5">
          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3"
          >
            {/* LOGO */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600">
              <img
                src="/logo_blanc.png"
                alt="Griot AI"
                className="h-7 w-7 object-contain"
              />
            </div>

            {/* NOM */}
            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-none text-white">
                Griot AI
              </h1>

              <p className="mt-1 truncate text-[9px] text-slate-500">
                Plateforme de création intelligente
              </p>
            </div>
          </Link>

          {/* BOUTON FERMER */}
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fermer le menu"
            className="
              ml-2
              shrink-0
              text-slate-400
              transition
              hover:text-white
              lg:hidden
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* ===================================================
            MENU PRINCIPAL
        =================================================== */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(
                    item.href + "/",
                  ));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    transition-all
                    duration-200

                    ${
                      active
                        ? "bg-red-600/10 text-red-500"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  {/* INDICATEUR ACTIF */}
                  {active && (
                    <span className="absolute left-0 h-7 w-1 rounded-r-full bg-red-600" />
                  )}

                  {/* ICÔNE */}
                  <Icon
                    size={22}
                    strokeWidth={
                      active ? 2.4 : 2
                    }
                    className="shrink-0"
                  />

                  {/* TEXTE */}
                  <span className="truncate text-base font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ===================================================
            ABONNEMENT
        =================================================== */}
        <div className="shrink-0 p-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-4">
            <Crown
              className="
                absolute
                -right-2
                -top-2
                h-16
                w-16
                rotate-12
                text-white/10
              "
            />

            {/* NOM DU PLAN */}
            <p className="relative z-10 text-sm font-bold text-white">
              {loadingSubscription
                ? "Chargement..."
                : subscription?.planName ??
                  "Aucun abonnement"}
            </p>

            {/* STATUT / ACCÈS GRATUIT / JOURS */}
            <p className="relative z-10 mb-3 text-[10px] text-red-100">
              {getSubscriptionText()}
            </p>

            {/* BOUTON */}
            <Link
              href="/auth/abonnement/voir_mon_abonnement"
              onClick={closeMenu}
              className="
                relative
                z-10
                block
                w-full
                rounded-lg
                bg-white
                py-2
                text-center
                text-[10px]
                font-bold
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              Voir mon abonnement
            </Link>
          </div>
        </div>

        {/* ===================================================
            PROFIL
        =================================================== */}
        <div className="shrink-0 border-t border-slate-800 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 text-left"
          >
            {/* AVATAR */}
            <img
              src="https://ui-avatars.com/api/?name=YEKINI+K&background=ef4444&color=fff"
              alt="Utilisateur"
              className="h-9 w-9 shrink-0 rounded-full"
            />

            {/* INFORMATIONS */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">
                Yekini k.
              </p>

              <p className="truncate text-[10px] text-slate-500">
                Administrateur
              </p>
            </div>

            <ChevronRight
              size={14}
              className="shrink-0 text-slate-500"
            />
          </button>
        </div>
      </aside>
    </>
  );
}