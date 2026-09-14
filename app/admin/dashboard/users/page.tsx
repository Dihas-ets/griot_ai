"use client";

import { useEffect, useState } from "react";
import {
Search,
Loader2,
Users,
Pencil,
Trash2,
X,
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
  const [deletingId, setDeletingId] = useState<number | null>(null);
const [users, setUsers] = useState<UserRow[]>([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

// Utilisateur actuellement sélectionné pour modification
const [editingUser, setEditingUser] =
useState<UserRow | null>(null);

// Champs de la modale
const [editName, setEditName] = useState("");
const [editEmail, setEditEmail] = useState("");
const [editRole, setEditRole] = useState("user");

// État d'enregistrement
const [saving, setSaving] = useState(false);

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

// Ouvrir la modale de modification
const handleEdit = (user: UserRow) => {
setEditingUser(user);
setEditName(user.name);
setEditEmail(user.email);
setEditRole(user.role);
};

// Fermer la modale
const handleCloseEdit = () => {
if (saving) return;

setEditingUser(null);
setEditName("");
setEditEmail("");
setEditRole("user");


};

// Enregistrer les modifications
const handleSaveEdit = async () => {
if (!editingUser) return;

if (!editName.trim()) {
  alert("Le nom est obligatoire.");
  return;
}

if (!editEmail.trim()) {
  alert("L'adresse e-mail est obligatoire.");
  return;
}

setSaving(true);

try {
  const response = await axios.put(
    `/api/admin/users/${editingUser.id}`,
    {
      name: editName.trim(),
      email: editEmail.trim(),
      role: editRole,
    },
  );

  const updatedUser = response.data.user;

  setUsers((currentUsers) =>
    currentUsers.map((user) =>
      user.id === editingUser.id
        ? {
            ...user,
            ...updatedUser,
          }
        : user,
    ),
  );

  setEditingUser(null);
  setEditName("");
  setEditEmail("");
  setEditRole("user");
} catch (error: any) {
  console.error(
    "Erreur modification utilisateur :",
    error,
  );

  if (error.response?.status === 422) {
    const errors = error.response.data?.errors;

    if (errors?.email?.[0]) {
      alert(errors.email[0]);
    } else if (errors?.name?.[0]) {
      alert(errors.name[0]);
    } else {
      alert(
        "Les informations saisies sont invalides.",
      );
    }
  } else if (error.response?.status === 403) {
    alert(
      "Vous n'avez pas l'autorisation de modifier cet utilisateur.",
    );
  } else {
    alert(
      "Une erreur est survenue lors de la modification.",
    );
  }
} finally {
  setSaving(false);
}

};

const handleDelete = async (user: UserRow) => {
  const confirmation = window.confirm(
    `Voulez-vous vraiment supprimer l'utilisateur "${user.name}" ?\n\nCette action supprimera également ses projets, comptes sociaux et souscriptions.`,
  );

  if (!confirmation) {
    return;
  }

  setDeletingId(user.id);

  try {
    await axios.delete(`/api/admin/users/${user.id}`);

    setUsers((currentUsers) =>
      currentUsers.filter((currentUser) => currentUser.id !== user.id),
    );
  } catch (error: any) {
    console.error(
      "Erreur suppression utilisateur :",
      error,
    );

    if (error.response?.status === 403) {
      alert(
        "Vous n'avez pas l'autorisation de supprimer cet utilisateur.",
      );
    } else if (error.response?.status === 404) {
      alert("Utilisateur introuvable.");
    } else {
      alert(
        "Une erreur est survenue lors de la suppression.",
      );
    }
  } finally {
    setDeletingId(null);
  }
};
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

return ( <div className="w-full min-w-0">
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[950px] text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th
                className="
                  w-[28%]
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

              <th
                className="
                  w-[14%]
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
                Plan actuel
              </th>

              <th
                className="
                  w-[16%]
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

              <th
                className="
                  w-[14%]
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

              <th
                className="
                  w-[10%]
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
                Actions
              </th>
            </tr>
          </thead>

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

                  <td className="px-5 py-4 text-right align-middle whitespace-nowrap">
                    <p className="font-bold text-slate-600">
                      {formatDate(u.created_at)}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-right align-middle">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        title="Modifier"
                        onClick={() =>
                          handleEdit(u)
                        }
                        className="
                          w-8
                          h-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          text-slate-400
                          hover:text-blue-600
                          hover:bg-blue-50
                          transition
                        "
                      >
                        <Pencil size={14} />
                      </button>

                      <button
  type="button"
  onClick={() => handleDelete(u)}
  disabled={deletingId === u.id}
  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
  title="Supprimer"
>
  {deletingId === u.id ? (
    <Loader2
      size={16}
      className="animate-spin"
    />
  ) : (
    <Trash2 size={16} />
  )}
</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )}

  {/* ========================================= */}
  {/* MODALE MODIFICATION */}
  {/* ========================================= */}

  {editingUser && (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-slate-900/40
          backdrop-blur-sm
        "
        onClick={handleCloseEdit}
      />

      <div
        className="
          relative
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-2xl
          border
          border-slate-200
          overflow-hidden
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            px-5
            py-4
            border-b
            border-slate-100
          "
        >
          <div>
            <h2 className="text-base font-black text-slate-900">
              Modifier l'utilisateur
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Modifiez les informations du compte.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCloseEdit}
            disabled={saving}
            className="
              w-8
              h-8
              rounded-lg
              flex
              items-center
              justify-center
              text-slate-400
              hover:text-slate-700
              hover:bg-slate-100
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label
              htmlFor="edit-name"
              className="
                block
                text-[11px]
                font-bold
                text-slate-600
                mb-1.5
              "
            >
              Nom
            </label>

            <input
              id="edit-name"
              type="text"
              value={editName}
              onChange={(e) =>
                setEditName(e.target.value)
              }
              disabled={saving}
              className="
                w-full
                px-3
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
                disabled:bg-slate-50
                disabled:cursor-not-allowed
              "
            />
          </div>

          <div>
            <label
              htmlFor="edit-email"
              className="
                block
                text-[11px]
                font-bold
                text-slate-600
                mb-1.5
              "
            >
              Adresse e-mail
            </label>

            <input
              id="edit-email"
              type="email"
              value={editEmail}
              onChange={(e) =>
                setEditEmail(e.target.value)
              }
              disabled={saving}
              className="
                w-full
                px-3
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
                disabled:bg-slate-50
                disabled:cursor-not-allowed
              "
            />
          </div>

          <div>
            <label
              htmlFor="edit-role"
              className="
                block
                text-[11px]
                font-bold
                text-slate-600
                mb-1.5
              "
            >
              Rôle
            </label>

            <select
              id="edit-role"
              value={editRole}
              onChange={(e) =>
                setEditRole(e.target.value)
              }
              disabled={saving}
              className="
                w-full
                px-3
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
                disabled:bg-slate-50
                disabled:cursor-not-allowed
              "
            >
              <option value="user">
                Utilisateur
              </option>

              <option value="admin">
                Administrateur
              </option>
            </select>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            justify-end
            gap-2
            px-5
            py-4
            border-t
            border-slate-100
            bg-slate-50/50
          "
        >
          <button
            type="button"
            onClick={handleCloseEdit}
            disabled={saving}
            className="
              px-4
              py-2.5
              rounded-xl
              text-xs
              font-bold
              text-slate-500
              hover:text-slate-700
              hover:bg-slate-100
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={handleSaveEdit}
            disabled={saving}
            className="
              px-4
              py-2.5
              rounded-xl
              bg-red-light
              text-white
              text-xs
              font-bold
              hover:bg-red-dark
              transition
              shadow-sm
              disabled:opacity-60
              disabled:cursor-not-allowed
              flex
              items-center
              gap-2
            "
          >
            {saving && (
              <Loader2
                size={14}
                className="animate-spin"
              />
            )}

            {saving
              ? "Enregistrement..."
              : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>

);
}
