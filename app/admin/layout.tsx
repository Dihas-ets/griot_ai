"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Receipt, Users, LogOut, Loader2 } from "lucide-react";
import axios from "@/lib/axios";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/dashboard/plans", label: "Plans", icon: Package },
  { href: "/admin/dashboard/souscriptions", label: "Souscriptions", icon: Receipt },
  { href: "/admin/dashboard/users", label: "Utilisateurs", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

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

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="animate-spin text-red-light" size={28} />
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <aside className="w-64 shrink-0 bg-white border-r border-slate-200 p-5 flex flex-col">
        <div className="mb-8">
          <h1 className="text-lg font-black text-slate-900">Griot AI</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Administration
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  active
                    ? "bg-red-50 text-red-600"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => {
            window.location.href = "/auth/login";
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}