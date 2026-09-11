"use client";

import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import axios from "@/lib/axios";

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  souscriptions: Array<{ statut: string; plan: { nom: string } }>;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/admin/users${search ? `?recherche=${search}` : ""}`,
        );
        setUsers(response.data.users?.data ?? []);
      } catch (error) {
        console.error("Erreur chargement utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(loadUsers, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-900 mb-1">Utilisateurs</h1>
      <p className="text-sm text-slate-500 mb-6">Liste des comptes inscrits sur la plateforme.</p>

      <div className="relative max-w-sm mb-6">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un utilisateur..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-red-light"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-red-light" size={28} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
          {users.map((u) => {
            const derniere = u.souscriptions?.[0];
            return (
              <div key={u.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">{u.name}</p>
                  <p className="text-slate-400">{u.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-700">{derniere?.plan?.nom ?? "Aucun plan"}</p>
                  {derniere && (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-lg ${
                        derniere.statut === "actif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {derniere.statut}
                    </span>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                    u.role === "admin" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {u.role}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}