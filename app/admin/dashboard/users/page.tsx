"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Loader2,
  Users,
} from "lucide-react";
import axios from "@/lib/axios";

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  souscriptions: Array<{
    statut: string;
    plan: {
      nom: string;
    };
  }>;
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
          `/api/admin/users${
            search ? `?recherche=${search}` : ""
          }`,
        );

        setUsers(response.data.users?.data ?? []);
      } catch (error) {
        console.error(
          "Erreur chargement utilisateurs :",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(loadUsers, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  // Formater la date d'inscription
  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "fr-FR",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  return (
    <div className="w-full min-w-0">
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Users size={17} />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Utilisateurs
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-500">
          Gérez les comptes inscrits sur la plateforme Griot AI.
        </p>
      </div>

      {/* ========================================= */}
      {/* RECHERCHE */}
      {/* ========================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={15}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="
              w-full
              pl-9
              pr-4
              py-2.5
              rounded-xl
              bg-white
              border
              border-slate-200
              text-xs
              text-slate-700
              outline-none
              focus:border-red-light
              focus:ring-2
              focus:ring-red-50
              transition
            "
          />
        </div>

        {/* NOMBRE D'UTILISATEURS */}
        {!loading && (
          <p className="text-xs text-slate-400">
            {users.length} utilisateur
            {users.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* ========================================= */}
      {/* CHARGEMENT */}
      {/* ========================================= */}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            className="animate-spin text-red-light"
            size={28}
          />
        </div>
      ) : users.length === 0 ? (
        /* ======================================= */
        /* AUCUN UTILISATEUR */
        /* ======================================= */

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="py-16 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Users size={18} />
            </div>

            <p className="text-sm font-bold text-slate-600">
              Aucun utilisateur trouvé
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Essayez avec un autre nom ou une autre adresse e-mail.
            </p>
          </div>
        </div>
      ) : (
        /* ======================================= */
        /* TABLEAU */
        /* ======================================= */

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Scroll horizontal uniquement ici */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[850px] text-xs">
              {/* ================================= */}
              {/* EN-TÊTE */}
              {/* ================================= */}

              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {/* UTILISATEUR */}
                  <th
                    className="
                      w-[32%]
                      px-5
                      py-3.5
                      text-left
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Utilisateur
                  </th>

                  {/* RÔLE */}
                  <th
                    className="
                      w-[15%]
                      px-5
                      py-3.5
                      text-left
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Rôle
                  </th>

                  {/* PLAN */}
                  <th
                    className="
                      w-[20%]
                      px-5
                      py-3.5
                      text-left
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Plan actuel
                  </th>

                  {/* ABONNEMENT */}
                  <th
                    className="
                      w-[18%]
                      px-5
                      py-3.5
                      text-left
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Abonnement
                  </th>

                  {/* DATE */}
                  <th
                    className="
                      w-[15%]
                      px-5
                      py-3.5
                      text-right
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Inscrit le
                  </th>
                </tr>
              </thead>

              {/* ================================= */}
              {/* UTILISATEURS */}
              {/* ================================= */}

              <tbody className="divide-y divide-slate-100">
                {users.map((u) => {
                  const derniere =
                    u.souscriptions?.[0];

                  return (
                    <tr
                      key={u.id}
                      className="
                        hover:bg-slate-50/50
                        transition-colors
                      "
                    >
                      {/* =========================== */}
                      {/* UTILISATEUR */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate max-w-[280px]">
                            {u.name}
                          </p>

                          <p className="text-[11px] text-slate-400 mt-1 truncate max-w-[280px]">
                            {u.email}
                          </p>
                        </div>
                      </td>

                      {/* =========================== */}
                      {/* RÔLE */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        <span
                          className={`
                            inline-flex
                            px-2.5
                            py-1
                            rounded-lg
                            text-[9px]
                            font-bold
                            whitespace-nowrap
                            ${
                              u.role === "admin"
                                ? "bg-red-50 text-red-600"
                                : "bg-slate-100 text-slate-500"
                            }
                          `}
                        >
                          {u.role === "admin"
                            ? "Administrateur"
                            : "Utilisateur"}
                        </span>
                      </td>

                      {/* =========================== */}
                      {/* PLAN */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        <p className="font-bold text-slate-700 whitespace-nowrap">
                          {derniere?.plan?.nom ??
                            "Aucun plan"}
                        </p>

                        {!derniere && (
                          <p className="text-[10px] text-slate-400 mt-1">
                            Pas encore abonné
                          </p>
                        )}
                      </td>

                      {/* =========================== */}
                      {/* ABONNEMENT */}
                      {/* =========================== */}

                      <td className="px-5 py-4 align-middle">
                        {derniere ? (
                          <span
                            className={`
                              inline-flex
                              px-2.5
                              py-1
                              rounded-lg
                              text-[9px]
                              font-bold
                              whitespace-nowrap

                              ${
                                derniere.statut ===
                                "actif"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : derniere.statut ===
                                      "en_attente"
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-slate-100 text-slate-500"
                              }
                            `}
                          >
                            {derniere.statut ===
                            "en_attente"
                              ? "En attente"
                              : derniere.statut ===
                                  "actif"
                                ? "Actif"
                                : derniere.statut}
                          </span>
                        ) : (
                          <span className="text-slate-300">
                            —
                          </span>
                        )}
                      </td>

                      {/* =========================== */}
                      {/* DATE D'INSCRIPTION */}
                      {/* =========================== */}

                      <td className="px-5 py-4 text-right align-middle whitespace-nowrap">
                        <p className="font-bold text-slate-600">
                          {formatDate(u.created_at)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}