"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Receipt,
  Users,
  LogOut,
  Loader2,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import axios from "@/lib/axios";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Vue d'ensemble",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/dashboard/plans",
    label: "Plans",
    icon: Package,
  },
  {
    href: "/admin/dashboard/souscriptions",
    label: "Souscriptions",
    icon: Receipt,
  },
  {
    href: "/admin/dashboard/users",
    label: "Utilisateurs",
    icon: Users,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("/api/user");

        if (response.data?.role === "admin") {
          setAuthorized(true);
        } else {
          router.replace("/dashboard");
        }
      } catch {
        router.replace("/auth/login");
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, [router]);

  // Fermer le menu mobile lorsqu'on change de page
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <Loader2
          className="animate-spin text-red-light"
          size={28}
        />
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#f8fafc]">
      {/* =====================================================
          BOUTON BURGER MOBILE
      ===================================================== */}

      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={sidebarOpen}
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
            md:hidden
          "
        >
          <Menu size={24} />
        </button>
      )}

      {/* =====================================================
          OVERLAY MOBILE
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            backdrop-blur-[2px]
            md:hidden
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
          h-screen
          w-64
          shrink-0
          flex-col
          overflow-hidden
          bg-[#0f172a]
          text-slate-400
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          md:shadow-none

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-800/60 p-5">
          <Link
            href="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
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

          {/* BOUTON FERMER MOBILE */}

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
            className="
              ml-2
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              md:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* ===================================================
            ESPACE ADMIN
        ===================================================== */}

        <div className="shrink-0 px-4 pt-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
              Espace
            </p>

            <p className="mt-0.5 text-xs font-bold text-white">
              Administration
            </p>
          </div>
        </div>

        {/* ===================================================
            MENU PRINCIPAL
        ===================================================== */}

        <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              /*
               * Le dashboard est actif uniquement sur :
               * /admin/dashboard
               *
               * Les autres pages ont leur propre état actif.
               */

              const active =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" &&
                  pathname.startsWith(item.href + "/"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group
                    relative
                    flex
                    min-w-0
                    items-center
                    gap-3
                    overflow-hidden
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

                  {/* ICONE */}

                  <Icon
                    size={22}
                    strokeWidth={active ? 2.4 : 2}
                    className="shrink-0"
                  />

                  {/* TEXTE */}

                  <span className="min-w-0 truncate text-base font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ===================================================
            DECONNEXION
        ===================================================== */}

        <div className="shrink-0 border-t border-slate-800 px-4 py-3">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/auth/login";
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-xs
              font-bold
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
            "
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* =====================================================
          CONTENU PRINCIPAL
      ===================================================== */}

      <main
        className="
          min-h-screen
          min-w-0
          w-full
          overflow-x-hidden
          md:ml-64
        "
      >
        <div
          className="
            min-h-screen
            min-w-0
            w-full
            overflow-x-hidden
            p-4
            pt-16
            sm:p-6
            sm:pt-16
            md:pt-8
            lg:p-8
            lg:pt-8
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
}
