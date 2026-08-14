"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FolderPlus,
  Upload,
  Image as ImageIcon,
  X,
  Check,
  Users,
  FileText,
  CalendarDays,
  Sparkles,
} from "lucide-react";

/* =========================================================
   PAGE CRÉATION PROJET
========================================================= */

export default function NouveauProjetPage() {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("Actif");

  const [image, setImage] =
    useState<string | null>(null);

  const [members, setMembers] =
    useState("1");

  const [success, setSuccess] =
    useState(false);

  /* =======================================================
     IMAGE
  ======================================================= */

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Veuillez renseigner le nom du projet.");
      return;
    }

    setSuccess(true);
  };

  /* =======================================================
     RENDU
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div
          className="
            mx-auto flex min-h-16
            max-w-[1400px]
            items-center
            gap-4
            px-4 sm:px-6 lg:px-8
          "
        >
          <Link
            href="/dashboard/projets"
            className="
              flex h-9 w-9
              shrink-0
              items-center justify-center
              rounded-xl
              border border-slate-200
              text-slate-500
              transition
              hover:bg-slate-50
              hover:text-slate-800
            "
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
              Organisation
            </p>

            <h1 className="text-lg font-black">
              Nouveau projet
            </h1>
          </div>
        </div>
      </header>

      {/* ===================================================
          CONTENU
      =================================================== */}

      <main className="mx-auto max-w-[1100px] p-4 sm:p-6 lg:p-8">
        {/* INTRO */}

        <div className="mb-8">
          <div
            className="
              mb-4 flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-red-50
              text-red-600
            "
          >
            <FolderPlus size={24} />
          </div>

          <h2 className="text-2xl font-black">
            Créer un nouveau projet
          </h2>

          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-400">
            Créez un espace dédié à une marque, une
            activité ou un client pour organiser vos
            publications, médias, campagnes et réseaux
            sociaux.
          </p>
        </div>

        {/* =================================================
            FORMULAIRE
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[1fr_360px]
          "
        >
          {/* =================================================
              COLONNE PRINCIPALE
          ================================================= */}

          <div className="space-y-6">
            {/* INFORMATIONS */}

            <section
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              "
            >
              <div className="mb-5">
                <h3 className="text-sm font-black">
                  Informations du projet
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Définissez les informations principales
                  de votre projet.
                </p>
              </div>

              {/* NOM */}

              <div className="mb-5">
                <label
                  htmlFor="project-name"
                  className="
                    mb-2 block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Nom du projet
                </label>

                <input
                  id="project-name"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Ex : Presta, Livro, Fofana Voyage..."
                  className="
                    w-full
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-4 py-3
                    text-xs font-medium
                    outline-none
                    transition
                    placeholder:text-slate-300
                    focus:border-red-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-red-500/5
                  "
                />
              </div>

              {/* DESCRIPTION */}

              <div className="mb-5">
                <label
                  htmlFor="project-description"
                  className="
                    mb-2 block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Description
                </label>

                <textarea
                  id="project-description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Décrivez brièvement l'objectif de ce projet..."
                  rows={5}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-4 py-3
                    text-xs font-medium
                    leading-relaxed
                    outline-none
                    transition
                    placeholder:text-slate-300
                    focus:border-red-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-red-500/5
                  "
                />
              </div>

              {/* STATUT + MEMBRES */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* STATUT */}

                <div>
                  <label
                    htmlFor="project-status"
                    className="
                      mb-2 block
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wide
                      text-slate-500
                    "
                  >
                    Statut
                  </label>

                  <select
                    id="project-status"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-4 py-3
                      text-xs font-bold
                      outline-none
                      focus:border-red-400
                      focus:bg-white
                    "
                  >
                    <option>Actif</option>
                    <option>En pause</option>
                    <option>Archivé</option>
                  </select>
                </div>

                {/* MEMBRES */}

                <div>
                  <label
                    htmlFor="project-members"
                    className="
                      mb-2 block
                      text-[10px]
                      font-black
                      uppercase
                      tracking-wide
                      text-slate-500
                    "
                  >
                    Membres
                  </label>

                  <input
                    id="project-members"
                    type="number"
                    min="1"
                    value={members}
                    onChange={(e) =>
                      setMembers(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-4 py-3
                      text-xs font-medium
                      outline-none
                      focus:border-red-400
                      focus:bg-white
                    "
                  />
                </div>
              </div>
            </section>

            {/* RÉSEAUX */}

            <section
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              "
            >
              <div className="mb-5">
                <h3 className="text-sm font-black">
                  Organisation du projet
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Les contenus associés pourront être
                  organisés dans cet espace.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoBox
                  icon={<FileText size={16} />}
                  title="Publications"
                  description="Créer et gérer les publications."
                />

                <InfoBox
                  icon={<ImageIcon size={16} />}
                  title="Médias"
                  description="Centraliser vos images et vidéos."
                />

                <InfoBox
                  icon={<CalendarDays size={16} />}
                  title="Calendrier"
                  description="Planifier vos contenus."
                />

                <InfoBox
                  icon={<Users size={16} />}
                  title="Équipe"
                  description="Collaborer avec vos membres."
                />
              </div>
            </section>
          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <div className="space-y-6">
            {/* IMAGE */}

            <section
              className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-sm
              "
            >
              <div className="mb-4">
                <h3 className="text-sm font-black">
                  Image du projet
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Ajoutez une image ou un logo.
                </p>
              </div>

              {image ? (
                <div
                  className="
                    relative
                    h-52
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200
                    bg-slate-100
                  "
                >
                  <img
                    src={image}
                    alt="Aperçu du projet"
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="
                      absolute
                      right-3 top-3
                      flex h-8 w-8
                      items-center justify-center
                      rounded-xl
                      bg-white
                      text-slate-600
                      shadow-md
                      hover:text-red-600
                    "
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <label
                  className="
                    flex h-52
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border-2
                    border-dashed
                    border-slate-200
                    bg-slate-50
                    text-center
                    transition
                    hover:border-red-300
                    hover:bg-red-50/40
                  "
                >
                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-2xl
                      bg-white
                      text-red-600
                      shadow-sm
                    "
                  >
                    <Upload size={20} />
                  </div>

                  <p className="mt-3 text-xs font-black">
                    Ajouter une image
                  </p>

                  <p className="mt-1 text-[9px] text-slate-400">
                    PNG, JPG, WEBP jusqu'à 5 MB
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </section>

            {/* APERÇU */}

            <section
              className="
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-sm
              "
            >
              <div className="border-b border-slate-100 p-5">
                <h3 className="text-sm font-black">
                  Aperçu
                </h3>
              </div>

              <div className="p-4">
                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border border-slate-200
                    bg-white
                  "
                >
                  {/* IMAGE APERÇU */}

                  <div
                    className="
                      relative
                      h-32
                      overflow-hidden
                      bg-slate-100
                    "
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Aperçu"
                        className="
                          h-full
                          w-full
                          object-contain
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex h-full
                          items-center
                          justify-center
                          text-slate-300
                        "
                      >
                        <ImageIcon size={30} />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="truncate text-sm font-black">
                        {name || "Nom du projet"}
                      </h4>

                      <span
                        className="
                          shrink-0
                          rounded-lg
                          bg-emerald-50
                          px-2 py-1
                          text-[8px]
                          font-bold
                          text-emerald-600
                        "
                      >
                        {status}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-[9px] leading-relaxed text-slate-400">
                      {description ||
                        "La description de votre projet apparaîtra ici."}
                    </p>

                    <div className="mt-4 grid grid-cols-3 rounded-xl bg-slate-50 py-2.5">
                      <PreviewStat
                        value="0"
                        label="Posts"
                      />

                      <PreviewStat
                        value="0"
                        label="Programmés"
                      />

                      <PreviewStat
                        value="0"
                        label="Médias"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ACTIONS */}

            <div
              className="
                rounded-2xl
                border border-red-100
                bg-red-50
                p-4
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex h-9 w-9
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-white
                    text-red-600
                  "
                >
                  <Sparkles size={16} />
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-800">
                    Astuce
                  </p>

                  <p className="mt-1 text-[9px] leading-relaxed text-slate-500">
                    Utilisez un nom clair afin de retrouver
                    facilement votre projet.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href="/dashboard/projets"
                className="
                  flex flex-1
                  items-center justify-center
                  rounded-xl
                  border border-slate-200
                  bg-white
                  px-4 py-3
                  text-[10px]
                  font-black
                  text-slate-600
                  transition
                  hover:bg-slate-50
                "
              >
                Annuler
              </Link>

              <button
                type="submit"
                className="
                  flex flex-1
                  items-center justify-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-4 py-3
                  text-[10px]
                  font-black
                  text-white
                  shadow-lg
                  shadow-red-600/20
                  transition
                  hover:bg-red-700
                "
              >
                <Check size={15} />
                Créer le projet
              </button>
            </div>
          </div>
        </form>

        {/* =================================================
            SUCCÈS
        ================================================= */}

        {success && (
          <div
            className="
              fixed inset-0
              z-50
              flex items-center
              justify-center
              bg-slate-950/40
              p-4
              backdrop-blur-sm
            "
          >
            <div
              className="
                w-full max-w-md
                rounded-3xl
                bg-white
                p-6
                text-center
                shadow-2xl
              "
            >
              <div
                className="
                  mx-auto flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-emerald-50
                  text-emerald-600
                "
              >
                <Check size={25} />
              </div>

              <h3 className="mt-4 text-lg font-black">
                Projet créé !
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Le projet{" "}
                <strong className="text-slate-700">
                  {name}
                </strong>{" "}
                a été créé avec succès.
              </p>

              <Link
                href="/dashboard/projets"
                className="
                  mt-6
                  flex w-full
                  items-center justify-center
                  rounded-xl
                  bg-red-600
                  px-4 py-3
                  text-[10px]
                  font-black
                  text-white
                  hover:bg-red-700
                "
              >
                Voir mes projets
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        flex items-start gap-3
        rounded-xl
        border border-slate-100
        bg-slate-50
        p-4
      "
    >
      <div
        className="
          flex h-9 w-9
          shrink-0
          items-center justify-center
          rounded-xl
          bg-white
          text-red-600
          shadow-sm
        "
      >
        {icon}
      </div>

      <div>
        <h4 className="text-[10px] font-black">
          {title}
        </h4>

        <p className="mt-1 text-[9px] leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PREVIEW STAT
========================================================= */

function PreviewStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs font-black text-slate-800">
        {value}
      </p>

      <p className="mt-0.5 text-[7px] text-slate-400">
        {label}
      </p>
    </div>
  );
}