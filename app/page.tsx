"use client";

import { useState } from "react";

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
  "/dihas.jpg",
  "/fofana.png",
];


// --- TYPES & DATA ---

interface Feature {
  icon: any;
  title: string;
  desc: string;
  color: string;
}

const features: Feature[] = [
  { icon: Wand2, title: "Génération de Scripts IA", desc: "Transformez une simple idée ou une photo en un script captivant, optimisé pour la viralité sur chaque réseau.", color: "purple" },
  { icon: Share2, title: "Sélection Multi-comptes", desc: "Connectez vos profils et choisissez dynamiquement sur quels comptes publier vos contenus en un clic.", color: "blue" },
  { icon: Rocket, title: "Auto-publication Directe", desc: "Détendez-vous pendant que Griot AI publie vos posts automatiquement aux heures de forte audience.", color: "fuchsia" },
  { icon: Calendar, title: "Planning Intelligent", desc: "Organisez vos publications avec un calendrier visuel fluide et suivez votre stratégie de contenu globale.", color: "orange" },
  { icon: BarChart3, title: "Analyses & Performance", desc: "Suivez l'impact de vos scripts générés par IA et ajustez votre stratégie grâce à des rapports détaillés.", color: "emerald" },
  { icon: Users, title: "Espaces Collaboratifs", desc: "Gérez plusieurs marques ou clients, attribuez des rôles et validez vos scripts avant la mise en ligne.", color: "pink" },
];

const steps = [
  { n: "01", title: "Le Briefing", desc: "Saisissez votre idée ou importez une image source pour inspirer l'IA." },
  { n: "02", title: "Analyse Visuelle", desc: "L'IA analyse votre image ou votre texte pour en extraire le meilleur contexte." },
  { n: "03", title: "Génération Script", desc: "Recevez instantanément un script structuré et prêt à être publié." },
  { n: "04", title: "Choix des Comptes", desc: "Sélectionnez les réseaux et les comptes spécifiques pour la diffusion." },
  { n: "05", title: "Ajustements", desc: "Personnalisez le rendu final pour qu'il colle parfaitement à votre vision." },
  { n: "06", title: "Post Automatique", desc: "L'IA s'occupe de la publication au moment le plus impactant." },
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

const showcaseCards = [
  {
    image: "/visuel-marketing.jpg",
    title: "Direction Artistique IA",
    category: "Visuel Marketing",
  },
  {
    image: "/reseaux-sociaux.jpeg",
    title: "Post Immobilier Moderne",
    category: "Réseaux Sociaux",
  },
  {
    image: "/branding.jpeg",
    title: "Campagne Corporate",
    category: "Branding",
  },
  {
    image: "/engagement.jpg",
    title: "Story Interactive",
    category: "Engagement",
  },
];


// --- HELPER COMPONENTS ---

const Badge = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-dark text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6"
  >
    <Sparkles size={14} className="animate-pulse" /> {children}
  </motion.div>
);

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

const FeatureCard = ({ feature, index }: { feature: Feature, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className="p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.5rem] bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all group"
  >
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 bg-red-100 text-red-light group-hover:scale-110 transition-transform`}>
      <feature.icon size={26} />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{feature.title}</h3>
    <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">{feature.desc}</p>
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
        Griot AI transforme vos briefs ou vos images en scripts parfaits. Choisissez vos comptes cibles et laissez l'IA publier pour vous au meilleur moment.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
        <button className="w-full sm:w-auto px-8 py-4 bg-red-light text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
          Essayer Gratuitement →
        </button>
        <button className="w-full sm:w-auto px-18 py-4 border border-red-light text-red-light rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
          <Play size={20} fill="currentColor" /> Voir l'IA
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
          className="max-h-full max-w-full object-contain transition-all duration-300 grayscale-0"
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
            desc="Dites adieu au jonglage entre dix applications. Griot AI rassemble l'ensemble de votre chaîne de production de contenus."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* --- WORKFLOW --- */}
      <section id="features" className="py-20 sm:py-32 bg-white border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
           <SectionHeader 
            badge="Méthodologie"
            title="De l'idée à la publication en 6 étapes"
            desc="Passez de l'idée initiale ou d'une photo à la diffusion multi-canal en un temps record."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 ">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 hover:scale-105 transition-transform duration-500 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:border-red-light transition-all shadow-sm"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-light text-white rounded-full flex items-center justify-center font-black text-base sm:text-xl mb-4 sm:mb-6 shadow-md shadow-red-light/20">
                  {step.n}
                </div>
                <h4 className="text-slate-900 font-bold text-sm sm:text-base mb-2">{step.title}</h4>
                <p className="text-slate-500 text-[10px] sm:text-xs font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCT SHOWCASE 1 --- */}
      <section className="py-20 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-red-light font-bold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-widest">
              <Sparkles size={16} /> Création Augmentée
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight text-slate-900">L'Intelligence Artificielle qui comprend vos images</h2>
            <div className="space-y-4 mb-8">
              {[
                'Analyse de vos photos pour générer des scripts contextuels',
                'Adaptation du ton selon les comptes sociaux sélectionnés',
                'Génération de scripts percutants basés sur de simples briefs',
                'Publication automatique programmée sur tous vos réseaux'
              ].map((f, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-red-light" />
                  </div>
                  <p className="text-xs sm:text-base text-slate-700 font-semibold">{f}</p>
                </div>
              ))}
            </div>
            <button className="text-red-light font-black text-sm sm:text-base flex items-center gap-2 hover:gap-4 transition-all group">
              Exploration des capacités de l'IA <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <div className="relative">
             <div className="absolute -inset-6 sm:-inset-10 bg-red-200/50 rounded-full blur-[80px] -z-10 pointer-events-none" />
             <div className="grid grid-cols-2 gap-3 sm:gap-4">
               {showcaseCards.map((card, i) => (
                 <motion.div 
                   key={i} 
                   whileHover={{ y: -6 }}
                   className="bg-white border border-slate-200 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                 >
                   <div className="aspect-square rounded-xl sm:rounded-2xl mb-3 overflow-hidden bg-slate-100">
                     <img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                   </div>
                   <p className="text-[10px] sm:text-xs font-bold text-red-light uppercase tracking-wider">{card.category}</p>
                   <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{card.title}</p>
                 </motion.div>
               ))}
             </div>
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
              name: "Solo",
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
              name: "Professional",
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
              name: "Agency",
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
                  <p className="text-sm sm:text-base text-slate-600 font-medium">contact@diha.ai</p>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">support@diha.ai</p>
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
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        /* Anti-scroll horizontal global */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}