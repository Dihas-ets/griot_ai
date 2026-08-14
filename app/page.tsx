"use client";

import { useState, useEffect  } from "react";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Orbit from "./component/Orbit";
import Connection from "./component/Connection";

import { motion, AnimatePresence } from "framer-motion";

import {
  Sparkles,
  Share2,
  Calendar,
  BarChart3,
  Users,
  Check,
  ArrowRight,
  Play,
  Star,
  Mail,
  Zap,
  Wand2,
  ChevronDown,
  Rocket,
  MessageSquare ,
  CheckCircle2 ,
  Image as ImageIcon,
  Send,
  CalendarDays,
  Clock3 ,
} from "lucide-react";

// --- HELPER COMPONENTS ---
const faqData = [
  {
    question: "Comment Griot AI transforme-t-il une idée ou une image en script ?",
    answer: "Notre IA analyse votre brief textuel ou les éléments visuels de votre image pour comprendre le contexte. Elle génère ensuite un script structuré avec une accroche percutante et un appel à l'action, adapté aux codes spécifiques de chaque réseau social."
  },
  {
    question: "Puis-je choisir sur quels comptes publier un même contenu ?",
    answer: "Absolument. Une fois votre script généré, Griot AI vous permet de sélectionner précisément les comptes (Instagram, LinkedIn, TikTok, etc.) sur lesquels vous souhaitez diffuser. Vous gardez un contrôle total sur votre multi-diffusion."
  },
  {
    question: "L'IA peut-elle vraiment capter mon ton de voix ?",
    answer: "Oui ! En analysant vos publications précédentes ou en suivant vos instructions de briefing, l'IA apprend votre style. Plus vous l'utilisez, plus elle devient précise dans la rédaction de vos scripts personnalisés."
  },
 { question: "Quels sont les réseaux sociaux supportés pour la publication ?",
    answer: "Nous supportons actuellement la publication automatique sur Instagram (Posts, Reels, Stories), LinkedIn, TikTok, X (Twitter), Facebook et Pinterest. Nous centralisons tous vos accès sécurisés au même endroit."
  },
  {
    question: "Mes données et accès sociaux sont-ils sécurisés ?",
    answer: "La sécurité est notre priorité. Nous utilisons les connexions officielles (OAuth) de chaque plateforme. Nous ne stockons jamais vos mots de passe et vos contenus restent votre propriété exclusive."
  }
];
const FAQItem = ({ question, answer, isOpen, onClick }: any) => (
  <div className="border-b border-slate-200 overflow-hidden">
    <button 
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group hover:text-red-light transition-colors"
    >
      <span className="text-base sm:text-lg font-bold text-slate-900">{question}</span>
      <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDown size={20} className={isOpen ? 'text-red-light' : 'text-slate-400'} />
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="pb-6 text-sm sm:text-base text-slate-600 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- logos marques ---
const logos = [
  "/presta.png",
  "/islam_pilier.png",
  "/spacesboost.jpg",
  "/tranoo.png",
  "/livro.png",
  "/aif.png",
  "/dihas.png",
  "/fofana.png",
];


// --- TYPES & DATA ---

type Feature = {
  icon: React.ElementType;
  title: string;
  desc: string;
  visual:
    | "ai"
    | "accounts"
    | "publish"
    | "calendar"
    | "analytics"
    | "control";
};

const features: Feature[] = [
  {
    icon: Wand2,
    title: "Génération de contenu par IA",
    desc: "Transformez une simple idée, un brief ou un prompt en script captivant, structuré et adapté à vos réseaux sociaux.",
    visual: "ai",
  },
  {
    icon: Share2,
    title: "Sélection multi-comptes",
    desc: "Connectez vos réseaux sociaux et choisissez précisément les comptes sur lesquels vous souhaitez diffuser votre contenu.",
    visual: "accounts",
  },
  {
    icon: Rocket,
    title: "Publication & planification",
    desc: "Publiez immédiatement ou programmez vos contenus à la date et à l'heure que vous choisissez.",
    visual: "publish",
  },
  {
    icon: Calendar,
    title: "Calendrier éditorial",
    desc: "Visualisez, organisez et planifiez l'ensemble de vos contenus depuis un calendrier éditorial simple et intuitif.",
    visual: "calendar",
  },
  {
    icon: BarChart3,
    title: "Analyses & performances",
    desc: "Suivez vos performances, comprenez ce qui fonctionne et ajustez votre stratégie grâce à des données claires.",
    visual: "analytics",
  },
  {
    icon: Users,
    title: "Gardez le contrôle",
    desc: "L'IA vous accompagne dans la création, mais vous gardez toujours la main avant chaque publication.",
    visual: "control",
  },
];

const FeatureVisual = ({
  type,
}: {
  type: Feature["visual"];
}) => {
  /* =====================================================
     1 — IA / GÉNÉRATION DE SCRIPT
  ===================================================== */

  const prompt =
    "Lancement de notre nouvelle collection été 2026 ✨";

  const generatedScript =
    "Découvrez notre nouvelle collection ✨ Des pièces pensées pour vous, avec des styles modernes et élégants. Explorez dès maintenant notre nouvelle sélection.";

  const [displayedScript, setDisplayedScript] = useState("");

  useEffect(() => {
    if (type !== "ai") return;

    let index = 0;

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedScript(generatedScript.slice(0, index));

        index++;

        if (index > generatedScript.length) {
          clearInterval(interval);
        }
      }, 35);

      return () => clearInterval(interval);
    }, 700);

    return () => clearTimeout(startDelay);
  }, [type]);

  /* =====================================================
     2 — COMPTES
  ===================================================== */

  const accounts = [
    ["Instagram", "IG"],
    ["Facebook", "FB"],
    ["LinkedIn", "in"],
    ["TikTok", "TK"],
  ];

  const [selectedAccounts, setSelectedAccounts] = useState(0);

  useEffect(() => {
    if (type !== "accounts") return;

    let current = 0;

    const interval = setInterval(() => {
      current++;

      if (current > accounts.length) {
        current = 0;
      }

      setSelectedAccounts(current);
    }, 1200);

    return () => clearInterval(interval);
  }, [type]);

  /* =====================================================
     3 — PUBLICATION
  ===================================================== */

  const [publishMode, setPublishMode] = useState<
    "ready" | "publish" | "schedule"
  >("ready");

  useEffect(() => {
    if (type !== "publish") return;

    const sequence = [
      setTimeout(() => setPublishMode("publish"), 900),
      setTimeout(() => setPublishMode("schedule"), 2200),
      setTimeout(() => setPublishMode("ready"), 4000),
    ];

    return () => sequence.forEach(clearTimeout);
  }, [type]);

  /* =====================================================
     4 — CALENDRIER
  ===================================================== */

  const [calendarPosts, setCalendarPosts] = useState<number[]>([]);

  useEffect(() => {
    if (type !== "calendar") return;

    const dates = [3, 7, 11, 15, 19, 24];

    let current = 0;

    const interval = setInterval(() => {
      current++;

      if (current > dates.length) {
        current = 0;
      }

      setCalendarPosts(dates.slice(0, current));
    }, 800);

    return () => clearInterval(interval);
  }, [type]);

  /* =====================================================
     5 — ANALYTICS
  ===================================================== */

  const [reach, setReach] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [posts, setPosts] = useState(0);

  useEffect(() => {
    if (type !== "analytics") return;

    let r = 0;
    let e = 0;
    let p = 0;

    const interval = setInterval(() => {
      r += 1.2;
      e += 0.4;
      p += 4;

      setReach(Math.min(r, 24.8));
      setEngagement(Math.min(e, 8.4));
      setPosts(Math.min(Math.floor(p), 128));

      if (r >= 24.8 && e >= 8.4 && p >= 128) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [type]);

  /* =====================================================
     6 — CONTRÔLE HUMAIN
  ===================================================== */

  const [controlStep, setControlStep] = useState(0);

  useEffect(() => {
    if (type !== "control") return;

    const interval = setInterval(() => {
      setControlStep((prev) => (prev + 1) % 3);
    }, 1800);

    return () => clearInterval(interval);
  }, [type]);

  switch (type) {
    /* =====================================================
       1 — IA
    ===================================================== */

    case "ai":
      return (
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5">
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-lg"
          >
            {/* HEADER */}

            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <Wand2 size={15} />
              </div>

              <div>
                <p className="text-[9px] font-black text-slate-800">
                  Griot AI
                </p>

                <p className="text-[7px] text-slate-400">
                  Génération de script
                </p>
              </div>

              <motion.span
                animate={{
                  opacity: [1, 0.35, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
                className="ml-auto rounded-full bg-red-50 px-2 py-1 text-[7px] font-bold text-red-600"
              >
                ✨ IA
              </motion.span>
            </div>

            {/* PROMPT */}

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[8px] font-semibold text-slate-400">
                  Votre prompt
                </p>

                <span className="text-[7px] font-bold text-slate-400">
                  {prompt.length} caractères
                </span>
              </div>

              <p className="text-[10px] font-bold leading-relaxed text-slate-700">
                {prompt}
              </p>
            </div>

            {/* TRANSFORMATION */}

            <div className="flex justify-center py-2">
              <motion.div
                animate={{
                  y: [0, 3, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600"
              >
                ↓
              </motion.div>
            </div>

            {/* SCRIPT */}

            <div className="rounded-xl border border-red-100 bg-red-50/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[8px] font-semibold text-red-500">
                  Script généré
                </p>

                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="text-[7px] font-bold text-red-500"
                >
                  Génération...
                </motion.span>
              </div>

              <p className="min-h-[48px] text-[10px] font-semibold leading-relaxed text-slate-700">
                {displayedScript}

                <motion.span
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                  }}
                  className="ml-0.5 text-red-500"
                >
                  |
                </motion.span>
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-red-100 pt-2">
                <span className="text-[7px] font-semibold text-slate-400">
                  Texte généré
                </span>

                <motion.span
                  key={displayedScript.length}
                  initial={{
                    scale: 1.2,
                    opacity: 0.5,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className="text-[8px] font-black text-red-600"
                >
                  {displayedScript.length} caractères
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      );

    /* =====================================================
       2 — COMPTES
    ===================================================== */

    case "accounts":
      return (
        <div className="flex h-full items-center justify-center p-4 sm:p-5">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-800">
                  Choisir vos comptes
                </p>

                <p className="mt-0.5 text-[7px] text-slate-400">
                  Où souhaitez-vous publier ?
                </p>
              </div>

              <Share2
                size={16}
                className="text-red-500"
              />
            </div>

            <div className="space-y-2">
              {accounts.map(([name, short], i) => {
                const selected = i < selectedAccounts;

                return (
                  <motion.div
                    key={name}
                    animate={{
                      x: selected ? 0 : -4,
                      opacity: selected ? 1 : 0.55,
                    }}
                    className={`flex items-center gap-3 rounded-xl border p-2 transition-colors ${
                      selected
                        ? "border-red-100 bg-red-50"
                        : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[8px] font-black text-slate-700 shadow-sm">
                      {short}
                    </div>

                    <span className="flex-1 text-[9px] font-bold text-slate-700">
                      {name}
                    </span>

                    <motion.div
                      animate={{
                        scale: selected
                          ? [1, 1.15, 1]
                          : 1,
                      }}
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-black ${
                        selected
                          ? "bg-red-600 text-white"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {selected ? "✓" : ""}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              key={selectedAccounts}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mt-3 rounded-lg bg-red-600 py-2 text-center text-[8px] font-black text-white"
            >
              {selectedAccounts} compte
              {selectedAccounts > 1 ? "s" : ""} sélectionné
              {selectedAccounts > 1 ? "s" : ""}
            </motion.div>
          </div>
        </div>
      );

    /* =====================================================
       3 — PUBLICATION
    ===================================================== */

    case "publish":
      return (
        <div className="flex h-full items-center justify-center p-4 sm:p-5">
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-lg"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <Rocket size={15} />
              </div>

              <div>
                <p className="text-[9px] font-black text-slate-800">
                  Votre publication
                </p>

                <p className="text-[7px] text-slate-400">
                  Prête à être diffusée
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[8px] font-semibold text-slate-400">
                Script
              </p>

              <p className="mt-1 text-[9px] font-bold leading-relaxed text-slate-700">
                Découvrez notre nouvelle collection ✨
                Des pièces pensées pour vous...
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <motion.div
                animate={{
                  scale:
                    publishMode === "publish"
                      ? [1, 0.96, 1]
                      : 1,
                }}
                className={`rounded-xl border py-2 text-center text-[8px] font-bold ${
                  publishMode === "publish"
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                Publier maintenant
              </motion.div>

              <motion.div
                animate={{
                  scale:
                    publishMode === "schedule"
                      ? [1, 1.04, 1]
                      : 1,
                }}
                className={`rounded-xl py-2 text-center text-[8px] font-bold ${
                  publishMode === "schedule"
                    ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Planifier
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={publishMode}
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                className="mt-3 flex items-center justify-center gap-1.5 text-[7px] font-bold text-emerald-600"
              >
                {publishMode === "schedule" ? (
                  <>
                    <Clock3 size={10} />
                    Publication programmée
                  </>
                ) : publishMode === "publish" ? (
                  <>
                    <CheckCircle2 size={10} />
                    Publication envoyée
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={10} />
                    Contenu prêt
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      );

    /* =====================================================
       4 — CALENDRIER
    ===================================================== */

    case "calendar":
      return (
        <div className="flex h-full items-center justify-center p-4 sm:p-5">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-800">
                  Calendrier éditorial
                </p>

                <p className="text-[7px] text-slate-400">
                  Août 2026
                </p>
              </div>

              <Calendar
                size={16}
                className="text-red-500"
              />
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["L", "M", "M", "J", "V", "S", "D"].map(
                (day, i) => (
                  <span
                    key={`${day}-${i}`}
                    className="pb-1 text-[7px] font-bold text-slate-400"
                  >
                    {day}
                  </span>
                )
              )}

              {Array.from({ length: 28 }, (_, i) => {
                const date = i + 1;
                const hasPost = calendarPosts.includes(date);

                return (
                  <motion.div
                    key={date}
                    animate={{
                      scale: hasPost
                        ? [1, 1.12, 1]
                        : 1,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className={`relative flex h-7 items-center justify-center rounded-lg text-[7px] font-bold ${
                      hasPost
                        ? "bg-red-600 text-white"
                        : "bg-slate-50 text-slate-500"
                    }`}
                  >
                    {date}

                    {hasPost && (
                      <motion.span
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-600" />

                <span className="text-[7px] font-semibold text-slate-500">
                  Publications planifiées
                </span>
              </div>

              <motion.span
                key={calendarPosts.length}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="text-[8px] font-black text-red-600"
              >
                {calendarPosts.length}
              </motion.span>
            </div>
          </div>
        </div>
      );

    /* =====================================================
       5 — ANALYTICS
    ===================================================== */

    case "analytics":
      return (
        <div className="flex h-full items-center justify-center p-4 sm:p-5">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-800">
                  Performances
                </p>

                <p className="text-[7px] text-slate-400">
                  Vue globale
                </p>
              </div>

              <BarChart3
                size={17}
                className="text-red-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                [
                  "Portée",
                  `${reach.toFixed(1)}K`,
                ],
                [
                  "Engagement",
                  `${engagement.toFixed(1)}%`,
                ],
                ["Posts", posts],
              ].map(([label, value], i) => (
                <motion.div
                  key={label}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="rounded-xl bg-slate-50 p-2"
                >
                  <p className="text-[6px] font-bold text-slate-400">
                    {label}
                  </p>

                  <motion.p
                    key={String(value)}
                    initial={{
                      scale: 1.15,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    className="mt-1 text-[11px] font-black text-slate-800"
                  >
                    {value}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex h-20 items-end gap-1">
              {[30, 42, 35, 55, 48, 65, 58, 78, 70, 90].map(
                (height, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      height: 0,
                    }}
                    whileInView={{
                      height: `${height}%`,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.08,
                    }}
                    className="flex-1 rounded-t-md bg-red-500/80"
                  />
                )
              )}
            </div>

            <div className="mt-2 flex items-center gap-1 text-[7px] font-bold text-emerald-600">
              ↗ +24.8% cette semaine
            </div>
          </div>
        </div>
      );

    /* =====================================================
       6 — CONTRÔLE HUMAIN
    ===================================================== */

    case "control":
      return (
        <div className="flex h-full items-center justify-center p-4 sm:p-5">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Users size={17} />
              </div>

              <div>
                <p className="text-[10px] font-black text-slate-800">
                  Votre contenu est prêt
                </p>

                <p className="text-[7px] text-slate-400">
                  Vous gardez toujours le contrôle
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[8px] font-semibold text-slate-400">
                Script généré par Griot AI
              </p>

              <div className="mt-2 space-y-2">
                <div className="h-2 w-4/5 rounded-full bg-slate-200" />
                <div className="h-2 w-full rounded-full bg-slate-100" />
                <div className="h-2 w-3/5 rounded-full bg-slate-100" />
              </div>
            </div>

            <p className="mt-4 text-center text-[8px] font-bold text-slate-500">
              {controlStep === 0
                ? "Analyse terminée"
                : controlStep === 1
                ? "À vous de décider"
                : "Action confirmée"}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <motion.button
                animate={{
                  scale:
                    controlStep === 1
                      ? [1, 1.03, 1]
                      : 1,
                }}
                className={`rounded-xl border py-2 text-[8px] font-bold ${
                  controlStep === 1
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                Publier
              </motion.button>

              <motion.button
                animate={{
                  boxShadow:
                    controlStep === 2
                      ? [
                          "0 0 0 rgba(239,68,68,0)",
                          "0 0 18px rgba(239,68,68,0.2)",
                          "0 0 0 rgba(239,68,68,0)",
                        ]
                      : "0 0 0 rgba(239,68,68,0)",
                }}
                transition={{
                  duration: 2,
                  repeat:
                    controlStep === 2
                      ? Infinity
                      : 0,
                }}
                className="rounded-xl bg-red-600 py-2 text-[8px] font-bold text-white"
              >
                Planifier
              </motion.button>
            </div>

            <motion.div
              key={controlStep}
              initial={{
                opacity: 0,
                y: 4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-3 flex items-center justify-center gap-1.5 text-[7px] font-bold text-emerald-600"
            >
              <CheckCircle2 size={10} />

              {controlStep === 0
                ? "IA prête"
                : controlStep === 1
                ? "Vous décidez du moment"
                : "Action enregistrée"}
            </motion.div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

const steps = [
  { n: "01", title: "Le Briefing", desc: "Saisissez votre idée pour inspirer l'IA." },
  { n: "02", title: "Analyse Visuelle", desc: "L'IA analyse votre texte pour en extraire le meilleur contexte." },
  { n: "03", title: "Génération Script", desc: "Recevez instantanément un script structuré et prêt à être publié." },
  { n: "04", title: "Choix des Comptes", desc: "Sélectionnez les réseaux et les comptes spécifiques pour la diffusion." },
  { n: "05", title: "Ajustements", desc: "Personnalisez le rendu final pour qu'il colle parfaitement à votre vision." },
  { n: "06", title: "Publier ou planifier", desc: "Choisissez quand diffuser votre contenu : publiez-le immédiatement ou planifiez sa publication à la date et à l’heure de votre choix." },
];

const previews = [
  {
    label: "Votre idée",
    title: "Créer une publication pour le lancement de notre nouvelle collection.",
  },
  {
    label: "Analyse IA",
    title: "Une campagne orientée mode, nouveauté et engagement communautaire.",
  },
  {
    label: "Script généré",
    title: "Découvrez notre nouvelle collection ✨\nPensée pour celles et ceux qui veulent...",
  },
  {
    label: "Comptes sélectionnés",
    title: "Instagram · Facebook · LinkedIn",
  },
  {
    label: "Personnalisation",
    title: "Ton professionnel · 3 hashtags · CTA activé",
  },
  {
    label: "Publication",
    title: "Votre contenu est prêt à être diffusé.",
  },
];


const testimonials = [
  { 
    name: "Sophie Marchand", 
    role: "Social Media Manager", 
    text: "Griot AI a transformé ma production. Passer d'une photo à un script complet sur 5 comptes différents est un gain de temps incroyable.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  { 
    name: "Thomas Rousseau", 
    role: "Fondateur Agence", 
    text: "La finesse de génération de l'IA est remarquable. Mes clients voient une hausse immédiate de leur engagement sur tous leurs réseaux.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  { 
    name: "Aïcha Koné", 
    role: "Content Strategist", 
    text: "Une interface élégante. La sélection multi-comptes me permet de gérer 10 clients sans jamais me tromper lors de la publication.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
];


// --- HELPER COMPONENTS ---

const SectionHeader = ({ badge, title, desc }: any) => (
  <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20 px-4">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-dark border border-red-200 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-6"
    >
      <Zap size={14} /> {badge}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-4 sm:mb-6 leading-tight text-slate-900"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-600"
    >
      {desc}
    </motion.p>
  </div>
);

const FeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 30,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
    }}
    transition={{
      delay: index * 0.1,
    }}
    whileHover={{
      y: -8,
    }}
    className="group overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all"
  >
    {/* VISUEL ANIMÉ */}
    <div className="relative h-[240px] sm:h-[270px] bg-slate-50 overflow-hidden border-b border-slate-100">
      <FeatureVisual type={feature.visual} />
    </div>

    {/* CONTENU */}
    <div className="p-6 sm:p-8 md:p-10">
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-5 bg-red-100 text-red-light group-hover:scale-110 transition-transform">
        <feature.icon size={22} />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
        {feature.title}
      </h3>

      <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
        {feature.desc}
      </p>
    </div>
  </motion.div>
);

const PricingCard = ({ plan, featured = false }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[3rem] border transition-all flex flex-col h-full ${
      featured 
      ? 'bg-white border-red-light shadow-2xl shadow-red-light/15 lg:-translate-y-4 z-10' 
      : 'bg-white border-slate-200 shadow-sm'
    }`}
  >
    {featured && (
      <div className="bg-red-light text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mx-auto -mt-10 sm:-mt-14 mb-6 sm:mb-8 shadow-md">
        Plus Populaire
      </div>
    )}
    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 sm:mb-6">{plan.name}</span>
    <div className="flex items-baseline gap-1 mb-2">
      <span className="text-4xl sm:text-5xl font-black text-slate-900">{plan.price}€</span>
      <span className="text-slate-500 font-medium text-xs sm:text-sm">/mois</span>
    </div>
    <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-medium italic">{plan.tagline}</p>
    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 flex-grow">
      {plan.features.map((f: string, i: number) => (
        <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 ${featured ? 'bg-red-light text-white' : 'bg-red-100 text-red-light'}`}>
            <Check size={12} />
          </div>
          <span>{f}</span>
        </div>
      ))}
    </div>
    <button className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
      featured 
      ? 'bg-red-light text-white hover:bg-red-light shadow-lg shadow-red-light/20' 
      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
    }`}>
      Choisir ce plan
    </button>
  </motion.div>
);



// --- PAGE PRINCIPALE ---

export default function DeepLandingPage() {
const nodes = [
  { src: "/facebook.png", x: 0, y: -270 },
  { src: "/instagram.png", x: 190, y: -180 },
  { src: "/linkedin.png", x: 250, y: 80 },
  { src: "/tiktok.png", x: 150, y: 220 },
  { src: "/twitter.png", x: -170, y: 210 },
  { src: "/google.png", x: -220, y: -150 },
];
 const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);


const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  return (
    <div id="Accueil" className="relative min-h-screen w-full max-w-full text-slate-900 selection:bg-red-light/20 overflow-x-hidden bg-slate-50">
      <Navbar /> 

   {/* --- HERO SECTION --- */}
<section className="relative pt-24 sm:pt-48 pb-20 px-6 overflow-hidden bg-white">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
    
    {/* TEXTES (Gauche) */}
    <div className="flex-1 text-center lg:text-left z-10">
      <motion.h1 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl sm:text-6xl lg:text-7xl xl:text-7xl font-black tracking-tighter leading-tight mb-6"
      >
      <span className="text-red-light">  Crée</span> plus. <span className="text-red-light"> Publie</span> plus. <span className="text-red-light"> Domine</span> les réseaux.
      </motion.h1>
      <p className="text-slate-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
Griot AI transforme vos briefs ou vos prompts en scripts parfaits. Choisissez vos comptes cibles et laissez l’IA adapter le script à vos différents réseaux.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <a href="../auth/register">
        <button className="w-full sm:w-auto px-8 py-4 bg-red-light text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
          Essayer Gratuitement →
        </button>
        </a>
        <button className="w-full sm:w-auto px-18 py-4 border border-red-light text-red-light rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
          <Play size={20} fill="currentColor" /> Voir Démo
        </button>
      </div>
    </div>

    {/* GRAPHIQUE RÉSEAU (Droite) */}
    {/* On ajoute 'scale-[0.5]' sur mobile et 'sm:scale-100' sur tablette/desktop */}
    <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center scale-[0.6] sm:scale-90 lg:scale-100 transition-transform duration-500">
      
      {/* Halos et Cercles de fond */}
      <div className="absolute w-[60%] h-[60%] bg-red-light/10 blur-[100px] rounded-full" />
      <div className="absolute w-[80%] h-[80%] border border-slate-200/60 rounded-full" />
      <div className="absolute w-[50%] h-[50%] border border-slate-200/40 rounded-full" />

      {/* Connexions & Icônes (Nodes) */}
      {nodes.map((node, index) => (
        <div key={index}>
          <Connection x={node.x} y={node.y} />
          <Orbit src={node.src} x={node.x} y={node.y} size={50} />
        </div>
      ))}

      {/* Logo Central */}
      <div className="absolute z-30 p-4 bg-white rounded-3xl border border-red-100 shadow-2xl">
        <img src="/logo_rouge.png" alt="Logo" className="w-20 h-20 sm:w-16 sm:h-16 object-contain" />
      </div>
    </div>

  </div>
</section>

      {/* --- LOGO MARQUEE --- */}
     <section className="relative py-10 sm:py-20 overflow-hidden bg-white">
  <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
    <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em]">
      Ils propulsent leur croissance avec Griot AI
    </p>
  </div>

  <div className="flex gap-16 items-center whitespace-nowrap animate-marquee">
    {[...logos, ...logos].map((logo, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-24 sm:w-32 h-12 sm:h-16 flex items-center justify-center"
      >
        <img
          src={logo}
          alt={`Logo ${index}`}
          className="max-h-full max-w-full object-contain transition-all duration-300 sm:duration-700 grayscale-0"
        />
      </div>
    ))}
  </div>
</section>

      {/* --- FEATURES GRID --- */}
      <section id="how" className="py-20 sm:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeader 
            badge="Plateforme All-in-One"
            title="Votre univers au même endroit"
desc="Dites adieu au jonglage entre vos plateformes de réseaux sociaux. Griot AI centralise la création, la publication et la planification de vos contenus au même endroit."          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
          </div>
        </div>
      </section>

     {/* --- WORKFLOW --- */}
 <section
      id="features"
      className="py-20 sm:py-32 bg-white border-y border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        <SectionHeader
          badge="Méthodologie"
          title="De l'idée à la publication en 6 étapes"
          desc="Passez de l'idée initiale à la diffusion multi-canal en un temps record."
        />

        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16 items-center">

          {/* =========================
              ÉTAPES
          ========================= */}
          <div className="space-y-2">

            {steps.map((step, i) => {
              const active = activeStep === i;

              return (
                <button
                  key={step.n}
                  onClick={() => setActiveStep(i)}
                  className="w-full text-left group"
                >
                  <div
                    className={`
                      relative flex items-start gap-4 sm:gap-5
                      p-4 sm:p-5 rounded-2xl
                      transition-all duration-300
                      ${
                        active
                          ? "bg-red-light/[0.06]"
                          : "hover:bg-slate-50"
                      }
                    `}
                  >

                    {/* Ligne rouge */}
                    {active && (
                      <motion.div
                        layoutId="activeStep"
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-red-light"
                      />
                    )}

                    {/* Numéro */}
                    <div
                      className={`
                        shrink-0 w-11 h-11 rounded-xl
                        flex items-center justify-center
                        font-black text-sm
                        transition-all duration-300
                        ${
                          active
                            ? "bg-red-light text-white shadow-lg shadow-red-light/20"
                            : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                        }
                      `}
                    >
                      {step.n}
                    </div>

                    {/* Texte */}
                    <div className="pt-0.5">

                      <h3
                        className={`
                          font-bold text-sm sm:text-base transition-colors
                          ${
                            active
                              ? "text-slate-900"
                              : "text-slate-500 group-hover:text-slate-800"
                          }
                        `}
                      >
                        {step.title}
                      </h3>

                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1.5 max-w-md"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>

                    </div>
                  </div>
                </button>
              );
            })}

          </div>


          {/* =========================
              FAUSSE INTERFACE
          ========================= */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute -inset-10 bg-red-light/10 blur-3xl rounded-full pointer-events-none" />

            <motion.div
              layout
              className="relative bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-900/10 overflow-hidden"
            >

              {/* Header application */}
              <div className="h-14 sm:h-16 border-b border-slate-100 flex items-center justify-between px-4 sm:px-6">

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-light flex items-center justify-center">
                    <Sparkles
                      size={16}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      Griot AI
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-400">
                      Création de contenu
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  IA active
                </div>

              </div>


              {/* Contenu */}
              <div className="p-5 sm:p-8">

                <AnimatePresence mode="wait">

                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >

                    {/* Titre */}
                    <div className="mb-6">

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-light">
                          Étape {steps[activeStep].n}
                        </span>

                        <span className="h-px flex-1 bg-slate-100" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                        {steps[activeStep].title}
                      </h3>

                    </div>


                    {/* Zone principale */}
                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-6 min-h-[230px]">

                      {activeStep === 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={15} className="text-red-light" />
                            <span className="text-xs font-bold text-slate-700">
                              Décrivez votre idée
                            </span>
                          </div>

                          <div className="bg-white rounded-xl border border-slate-200 p-4 text-sm text-slate-600 leading-relaxed">
                            {previews[0].title}
                          </div>

                          <button className="mt-4 w-full bg-red-light text-white rounded-xl py-3 text-xs font-bold flex items-center justify-center gap-2">
                            Générer avec l'IA
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      )}


                      {activeStep === 1 && (
                        <div>
                          <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-red-light/10 flex items-center justify-center">
                              <Sparkles
                                size={18}
                                className="text-red-light"
                              />
                            </div>

                            <div>
                              <p className="text-xs font-bold text-slate-800">
                                Analyse en cours...
                              </p>
                              <p className="text-[10px] text-slate-400">
                                Griot AI comprend votre contenu
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {[70, 90, 55].map((width, i) => (
                              <motion.div
                                key={i}
                                initial={{ width: 0 }}
                                animate={{ width: `${width}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-2 bg-red-light/20 rounded-full"
                              />
                            ))}
                          </div>

                          <p className="text-xs text-slate-500 mt-5">
                            {previews[1].title}
                          </p>
                        </div>
                      )}


                      {activeStep === 2 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={15} className="text-red-light" />
                            <span className="text-xs font-bold text-slate-700">
                              Script généré
                            </span>
                          </div>

                          <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                              {previews[2].title}
                            </p>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <span className="px-3 py-1.5 bg-red-light/10 text-red-light rounded-lg text-[10px] font-bold">
                              Instagram
                            </span>
                            <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold">
                              Facebook
                            </span>
                          </div>
                        </div>
                      )}


                      {activeStep === 3 && (
                        <div>
                          <div className="flex items-center gap-2 mb-5">
                            <Check size={15} className="text-red-light" />
                            <span className="text-xs font-bold text-slate-700">
                              Réseaux sélectionnés
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            {["Instagram", "Facebook", "LinkedIn"].map(
                              (network) => (
                                <div
                                  key={network}
                                  className="bg-white border border-red-light/30 rounded-xl p-4 text-center"
                                >
                                  <div className="w-8 h-8 mx-auto rounded-lg bg-red-light/10 flex items-center justify-center mb-2">
                                    <Check
                                      size={15}
                                      className="text-red-light"
                                    />
                                  </div>

                                  <p className="text-[10px] font-bold text-slate-600">
                                    {network}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}


                      {activeStep === 4 && (
                        <div>
                          <div className="flex items-center gap-2 mb-5">
                            <Sparkles size={15} className="text-red-light" />
                            <span className="text-xs font-bold text-slate-700">
                              Personnalisez votre publication
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between bg-white rounded-xl border border-slate-200 p-3">
                              <span className="text-xs text-slate-500">
                                Ton
                              </span>
                              <span className="text-xs font-bold text-slate-800">
                                Professionnel
                              </span>
                            </div>

                            <div className="flex justify-between bg-white rounded-xl border border-slate-200 p-3">
                              <span className="text-xs text-slate-500">
                                Hashtags
                              </span>
                              <span className="text-xs font-bold text-slate-800">
                                3 hashtags
                              </span>
                            </div>

                            <div className="flex justify-between bg-white rounded-xl border border-slate-200 p-3">
                              <span className="text-xs text-slate-500">
                                CTA
                              </span>
                              <span className="text-xs font-bold text-red-light">
                                Activé
                              </span>
                            </div>
                          </div>
                        </div>
                      )}


                      {activeStep === 5 && (
                        <div className="flex flex-col items-center justify-center text-center h-[220px]">

                          <div className="w-16 h-16 rounded-full bg-red-light/10 flex items-center justify-center mb-5">
                            <Check
                              size={30}
                              className="text-red-light"
                            />
                          </div>

                          <h4 className="text-base font-black text-slate-900 mb-2">
                            Votre contenu est prêt !
                          </h4>

                          <p className="text-xs text-slate-500 max-w-xs">
                            Choisissez de publier maintenant ou programmez
                            votre publication.
                          </p>

                          <div className="flex gap-2 mt-5">
                            <button className="px-4 py-2.5 bg-red-light text-white rounded-lg text-[10px] font-bold flex items-center gap-2">
                              <Send size={12} />
                              Publier
                            </button>

                            <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold flex items-center gap-2">
                              <CalendarDays size={12} />
                              Planifier
                            </button>
                          </div>

                        </div>
                      )}

                    </div>


                    {/* Progression */}
                    <div className="mt-6">

                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-medium text-slate-400">
                          Progression
                        </span>

                        <span className="text-[10px] font-bold text-red-light">
                          {Math.round(
                            ((activeStep + 1) / steps.length) * 100
                          )}
                          %
                        </span>
                      </div>

                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          animate={{
                            width: `${((activeStep + 1) / steps.length) * 100}%`,
                          }}
                          transition={{ duration: 0.4 }}
                          className="h-full bg-red-light rounded-full"
                        />
                      </div>

                    </div>

                  </motion.div>

                </AnimatePresence>

              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>

     {/* =========================================================
   CTA — CRÉEZ, PLANIFIEZ, PUBLIEZ
========================================================= */}
<section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 bg-white">
  <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-red-light">

    {/* Effets lumineux */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/10 blur-[80px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-white/10 blur-[100px]"
      />

      {/* cercles abstraits */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-32 -top-32 w-80 h-80 rounded-full border border-white/10"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-32 -bottom-40 w-96 h-96 rounded-full border border-white/10"
      />

      {/* icônes flottantes */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-12 left-8 sm:left-16 w-10 h-10 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60"
      >
        <Sparkles size={18} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-12 right-8 sm:right-16 w-12 h-12 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/60"
      >
        <Share2 size={20} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        className="absolute top-1/2 right-10 sm:right-24 w-9 h-9 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white/50"
      >
        <BarChart3 size={16} />
      </motion.div>

    </div>

    {/* Contenu */}
    <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-20 md:px-20 text-center">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-sm"
      >
        <Sparkles size={14} />
        Passez à l'action
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] text-white"
      >
        Transformez vos idées en{" "}
        <span className="text-red-dark">
          publications qui comptent.
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto mt-6 text-sm sm:text-lg text-white/70 leading-relaxed"
      >
        Créez votre contenu avec l'IA, adaptez-le à chaque réseau,
        choisissez vos comptes, puis publiez ou planifiez quand vous le souhaitez.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-9"
      >
<a href="../auth/register">
        <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-red-light text-sm sm:text-base font-black shadow-xl hover:scale-[1.03] transition-all">
          Commencer gratuitement
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
</a>
        <button className="w-full sm:w-auto inline-flex items-center justify-center px-24 py-4 rounded-2xl bg-white/10 border border-white/20 text-white text-sm sm:text-base font-bold backdrop-blur-sm hover:bg-white/15 hover:scale-[1.03] transition-all">
         Voir Démo
        </button>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] sm:text-xs font-semibold text-white/60"
      >
        <span className="flex items-center gap-1.5">
          <Check size={13} />
          Création assistée par IA
        </span>

        <span className="hidden sm:block text-white/20">•</span>

        <span className="flex items-center gap-1.5">
          <Check size={13} />
          Publication multi-réseaux
        </span>

        <span className="hidden sm:block text-white/20">•</span>

        <span className="flex items-center gap-1.5">
          <Check size={13} />
          Calendrier intégré
        </span>
      </motion.div>

    </div>
  </div>
</section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-20 sm:py-32 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader 
            badge="Plans & Tarifs"
            title="Des offres adaptées à chaque étape de votre croissance"
            desc="Commencez gratuitement et faites évoluer vos accès selon vos besoins."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
            <PricingCard plan={{
              name: "particulier",
              price: "29",
              tagline: "Idéal pour les créateurs et freelances",
              features: [
                "1 espace de travail dédié",
                "Jusqu'à 5 comptes sociaux",
                "Briefing texte & image par IA",
                "Sélection multi-comptes",
                "Publication automatique"
              ]
            }} />
            <PricingCard featured={true} plan={{
              name: "Professionel",
              price: "59",
              tagline: "Le choix incontournable pour les marques",
              features: [
                "Espaces de travail illimités",
                "Comptes sociaux illimités",
                "IA Prioritaire pour vos scripts",
                "Module d'analytics avancé",
                "Support prioritaire 7j/7"
              ]
            }} />
            <PricingCard plan={{
              name: "Agence",
              price: "149",
              tagline: "Conçu pour les équipes et agences marketing",
              features: [
                "Toutes les options Pro incluses",
                "Accès équipe (10 collaborateurs)",
                "Workflow de validation client",
                "Gestion fine des comptes",
                "Accompagnement dédié"
              ]
            }} />
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-20 sm:py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader 
            badge="Témoignages"
            title="Fait confiance par des milliers de créateurs"
            desc="Découvrez comment Griot AI automatise la présence sociale à travers le monde."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex gap-1 mb-4 sm:mb-6 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-xs sm:text-base text-slate-600 font-medium italic mb-6 sm:mb-8 leading-relaxed">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-purple-200">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900">{t.name}</h5>
                    <p className="text-[10px] sm:text-xs text-red-light font-bold uppercase">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 sm:py-32 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader 
            badge="FAQ" 
            title="Des questions ? Nous avons les réponses" 
            desc="Tout ce que vous devez savoir sur Griot AI." 
          />
          <div className="bg-slate-50 rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-slate-200">
            {faqData.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
                isOpen={openFAQ === index} 
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 sm:py-32 bg-slate-50 text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            badge="Contact" 
            title="Une question ? On est là pour vous." 
            desc="Besoin d'aide pour lier vos comptes ou configurer vos scripts ? Notre équipe vous répond rapidement." 
          />

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 mt-12 items-start">
            
            {/* Infos de contact (Gauche) */}
            <div className="space-y-8 sm:space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 border border-red-200 rounded-2xl flex items-center justify-center text-red-light shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black mb-2 tracking-tight text-slate-900">Envoyez-nous un message</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">contact@griot.ai</p>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">support@griot.ai</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 border border-red-200 rounded-2xl flex items-center justify-center text-red-light shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black mb-2 tracking-tight text-slate-900">Support Live</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">Disponible pour vous accompagner</p>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">dans votre automatisation.</p>
                </div>
              </div>

              <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                <p className="text-slate-700 font-bold mb-4 italic">"Le support est d'une réactivité incroyable. On sent que l'équipe derrière Griot AI est passionnée."</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-light" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marc-Antoine, Agence Bloom</p>
                </div>
              </div>
            </div>

            {/* Formulaire (Droite) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm"
            >
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nom complet</label>
                    <input type="text" placeholder="Jean Dupont" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/5 transition-all outline-none text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                    <input type="email" placeholder="jean@exemple.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/5 transition-all outline-none text-sm font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Sujet</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-purple-600 transition-all outline-none text-sm font-medium appearance-none">
                    <option className="bg-white text-slate-900">Demande de démo</option>
                    <option className="bg-white text-slate-900">Question sur l'IA</option>
                    <option className="bg-white text-slate-900">Liaison de comptes</option>
                    <option className="bg-white text-slate-900">Autre</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
                  <textarea rows={4} placeholder="Comment l'IA de Griot AI peut vous aider ?" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-purple-600 transition-all outline-none text-sm font-medium resize-none" />
                </div>

                <button className="w-full py-5 bg-red-light text-white rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/20 transition-all active:scale-[0.98]">
                  Envoyer le message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

      <style jsx global>{`
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-50%);
    }
  }

  /* Mobile : 5 secondes */
  .animate-marquee {
    animation: marquee 5s linear infinite;
  }

  /* Tablette + grands écrans : 30 secondes */
  @media (min-width: 640px) {
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
  }

  /* Anti-scroll horizontal global */
  body {
    overflow-x: hidden;
  }
`}</style>
    </div>
  );
}