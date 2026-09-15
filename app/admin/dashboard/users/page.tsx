"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Loader2,
  Users,
  Pencil,
  Trash2,
  X,
  Eye,
  Mail,
  ShieldCheck,
  CalendarDays,
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
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);

  // Utilisateur actuellement sélectionné pour consultation
  const [viewingUser, setViewingUser] = useState<UserRow | null>(null);

  // Champs de la modale de modification
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("user");

  // État d'enregistrement
  const [saving, setSaving] = useState(false);

  /* =========================================================
     CHARGEMENT DES UTILISATEURS
  ========================================================= */

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `/api/admin/users${
            search
              ? `?recherche=${encodeURIComponent(search)}`
              : ""
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

  /* =========================================================
     OUVRIR LA MODALE DE CONSULTATION
  ========================================================= */

  const handleView = (user: UserRow) => {
    setViewingUser(user);
  };

  /* =========================================================
     FERMER LA MODALE DE CONSULTATION
  ========================================================= */

  const handleCloseView = () => {
    setViewingUser(null);
  };

  /* =========================================================
     OUVRIR LA MODALE DE MODIFICATION
  ========================================================= */

  const handleEdit = (user: UserRow) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
  };

  /* =========================================================
     FERMER LA MODALE DE MODIFICATION
  ========================================================= */

  const handleCloseEdit = () => {
    if (saving) return;

    setEditingUser(null);
    setEditName("");
    setEditEmail("");
    setEditRole("user");
  };

  /* =========================================================
     ENREGISTRER LES MODIFICATIONS
  ========================================================= */

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

  /* =========================================================
     SUPPRIMER UN UTILISATEUR
  ========================================================= */

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
        currentUsers.filter(
          (currentUser) => currentUser.id !== user.id,
        ),
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

  /* =========================================================
     FORMATER LA DATE
  ========================================================= */

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

  /* =========================================================
     INITIAL / AVATAR
  ========================================================= */

  const getInitials = (name: string) => {
    if (!name) return "U";

    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (
      parts[0][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  };

  /* =========================================================
     RENDER
  ========================================================= */

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

        /* ========================================= */
        /* TABLE */
        /* ========================================= */

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[850px] text-xs">

              <thead>

                <tr className="bg-slate-50 border-b border-slate-100">

                  {/* UTILISATEUR */}

                  <th
                    className="
                      w-[36%]
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

                  {/* ROLE */}

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
                    Rôle
                  </th>

                  {/* INSCRIPTION */}

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
                    Inscrit le
                  </th>

                  {/* ACTIONS */}

                  <th
                    className="
                      w-[24%]
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

                {users.map((u) => (

                  <tr
                    key={u.id}
                    className="
                      hover:bg-slate-50/50
                      transition-colors
                    "
                  >

                    {/* ========================================= */}
                    {/* UTILISATEUR */}
                    {/* ========================================= */}

                    <td className="px-5 py-4 align-middle">

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-9 h-9 shrink-0 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-[10px] font-black">
                          {getInitials(u.name)}
                        </div>

                        <div className="min-w-0">

                          <p className="font-bold text-slate-800 truncate max-w-[280px]">
                            {u.name}
                          </p>

                          <p className="text-[11px] text-slate-400 mt-1 truncate max-w-[280px]">
                            {u.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ========================================= */}
                    {/* ROLE */}
                    {/* ========================================= */}

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

                    {/* ========================================= */}
                    {/* DATE */}
                    {/* ========================================= */}

                    <td className="px-5 py-4 align-middle whitespace-nowrap">

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={14}
                          className="text-slate-300"
                        />

                        <p className="font-bold text-slate-600">
                          {formatDate(u.created_at)}
                        </p>

                      </div>

                    </td>

                    {/* ========================================= */}
                    {/* ACTIONS */}
                    {/* ========================================= */}

                    <td className="px-5 py-4 text-right align-middle">

                      <div className="flex items-center justify-end gap-2">

                        {/* VOIR */}

                        <button
                          type="button"
                          title="Voir le profil"
                          onClick={() => handleView(u)}
                          className="
                            w-8
                            h-8
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            hover:text-emerald-600
                            hover:bg-emerald-50
                            transition
                          "
                        >
                          <Eye size={14} />
                        </button>

                        {/* MODIFIER */}

                        <button
                          type="button"
                          title="Modifier"
                          onClick={() => handleEdit(u)}
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

                        {/* SUPPRIMER */}

                        <button
                          type="button"
                          onClick={() => handleDelete(u)}
                          disabled={deletingId === u.id}
                          className="
                            w-8
                            h-8
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            hover:bg-red-50
                            hover:text-red-600
                            transition
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                          title="Supprimer"
                        >
                          {deletingId === u.id ? (
                            <Loader2
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* =======================================================
          MODALE PROFIL
      ======================================================= */}

      {viewingUser && (

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

          {/* OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-slate-900/40
              backdrop-blur-sm
            "
            onClick={handleCloseView}
          />

          {/* MODALE */}

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

            {/* HEADER */}

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
                  Profil utilisateur
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Informations du compte.
                </p>

              </div>

              <button
                type="button"
                onClick={handleCloseView}
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
                "
              >
                <X size={16} />
              </button>

            </div>

            {/* CONTENU */}

            <div className="p-5">

              {/* AVATAR + NOM */}

              <div className="flex flex-col items-center text-center mb-6">

                <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-lg font-black mb-3">
                  {getInitials(viewingUser.name)}
                </div>

                <h3 className="text-base font-black text-slate-900">
                  {viewingUser.name}
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  {viewingUser.email}
                </p>

              </div>

              {/* INFORMATIONS */}

              <div className="space-y-3">

                {/* EMAIL */}

                <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">

                  <div className="flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-white text-slate-400 flex items-center justify-center">
                      <Mail size={14} />
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        E-mail
                      </p>

                      <p className="text-xs font-bold text-slate-700 mt-0.5 break-all">
                        {viewingUser.email}
                      </p>

                    </div>

                  </div>

                </div>

                {/* ROLE */}

                <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">

                  <div className="flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-white text-slate-400 flex items-center justify-center">
                      <ShieldCheck size={14} />
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Rôle
                      </p>

                      <p className="text-xs font-bold text-slate-700 mt-0.5">
                        {viewingUser.role === "admin"
                          ? "Administrateur"
                          : "Utilisateur"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* DATE */}

                <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">

                  <div className="flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-white text-slate-400 flex items-center justify-center">
                      <CalendarDays size={14} />
                    </div>

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Inscription
                      </p>

                      <p className="text-xs font-bold text-slate-700 mt-0.5">
                        {formatDate(viewingUser.created_at)}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* FOOTER */}

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
                onClick={handleCloseView}
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
                "
              >
                Fermer
              </button>

              <button
                type="button"
                onClick={() => {
                  handleCloseView();
                  handleEdit(viewingUser);
                }}
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
                  flex
                  items-center
                  gap-2
                "
              >
                <Pencil size={13} />
                Modifier
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =======================================================
          MODALE MODIFICATION
      ======================================================= */}

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

          {/* OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-slate-900/40
              backdrop-blur-sm
            "
            onClick={handleCloseEdit}
          />

          {/* MODALE */}

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

            {/* HEADER */}

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

            {/* FORMULAIRE */}

            <div className="p-5 space-y-4">

              {/* NOM */}

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

              {/* EMAIL */}

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

              {/* ROLE */}

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

            {/* FOOTER */}

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
