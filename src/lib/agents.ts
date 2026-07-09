export type AgentCard = {
  id: string;
  category: "RH" | "COMPTA" | "COMMERCIAL" | "MARKETING" | "OPS" | "STRATÉGIE";
  title: string;
  hook: string;
  utility: string;
  statValue: string;
  statLabel: string;
  icon: string; // lucide name
  sig: 1 | 2 | 3 | 4; // signature color stop
};

/**
 * 12 agents — les plus pertinents et révolutionnaires en premier.
 * Le signature en n°1, puis les leviers à fort ROI / forte visibilité.
 */
export const AGENTS: AgentCard[] = [
  // 01 — Signature
  {
    id: "strat-1",
    category: "STRATÉGIE",
    title: "Assistant IA connecté à votre SI",
    hook: "Comme ChatGPT, mais il connaît vraiment votre boîte.",
    utility:
      "Chat connecté à Microsoft 365 ou Google Workspace, 15+ outils métier, mémoire long-terme, agents verticaux.",
    statValue: "−50%",
    statLabel: "de journée sur les tâches éligibles",
    icon: "Brain",
    sig: 3,
  },
  // 02
  {
    id: "ops-4",
    category: "OPS",
    title: "Dashboard de pilotage",
    hook: "Tout sur un écran. Récap lundi 9h.",
    utility:
      "Multi-sources (CRM, compta, ventes, satisfaction), alertes seuils, récap IA hebdomadaire automatique.",
    statValue: "30 min",
    statLabel: "économisées par semaine",
    icon: "LayoutDashboard",
    sig: 4,
  },
  // 03
  {
    id: "compta-1",
    category: "COMPTA",
    title: "Lecture & tri des factures",
    hook: "Plus jamais de « qui a payé quoi ».",
    utility:
      "OCR multi-format, extraction structurée, routage automatique vers la bonne BAL et le bon dossier.",
    statValue: "2 min",
    statLabel: "économisées par facture",
    icon: "ScanLine",
    sig: 1,
  },
  // 04
  {
    id: "com-3",
    category: "COMMERCIAL",
    title: "Chatbot service client 24/7",
    hook: "Dans ton ton, sur tes données, en continu.",
    utility:
      "FAQ contextuelle, recherche dans vos docs, escalade humaine fluide quand c'est nécessaire.",
    statValue: "60%",
    statLabel: "des tickets résolus sans humain",
    icon: "MessageSquare",
    sig: 2,
  },
  // 05
  {
    id: "ops-1",
    category: "OPS",
    title: "Tri & réponse de mails",
    hook: "Ta boîte se classe toute seule.",
    utility:
      "Tri par projet, réponses brouillon, classification urgents, alertes contextuelles.",
    statValue: "~1 h/jour",
    statLabel: "récupérée par poste",
    icon: "Mail",
    sig: 3,
  },
  // 06
  {
    id: "com-4",
    category: "COMMERCIAL",
    title: "Génération d'avis Google",
    hook: "L'avis 5★ devient un cadeau gagné.",
    utility:
      "Mécanique gamifiée multilingue + back-office terrain. Code QR, tirage pondéré, anti-fraude.",
    statValue: "+1★",
    statLabel: "Google = +5 à +9% CA local (Harvard)",
    icon: "Sparkles",
    sig: 4,
  },
  // 07
  {
    id: "com-1",
    category: "COMMERCIAL",
    title: "Prospection multi-canal",
    hook: "Mail, LinkedIn, téléphone — un seul cerveau.",
    utility:
      "Séquences personnalisées par persona, A/B test natif, suivi unifié des interactions.",
    statValue: "×3",
    statLabel: "taux de réponse vs cold mail générique",
    icon: "Send",
    sig: 1,
  },
  // 08
  {
    id: "ops-3",
    category: "OPS",
    title: "Génération de documents",
    hook: "Word, Excel, PDF — à la voix.",
    utility:
      "Templates métier branchés sur vos données. Vous dictez le brief, le doc est dans le bon dossier.",
    statValue: "30 min → 1 min",
    statLabel: "par document",
    icon: "FileText",
    sig: 2,
  },
  // 09
  {
    id: "mkt-2",
    category: "MARKETING",
    title: "Veille concurrence automatique",
    hook: "Tu sais ce qu'ils font avant qu'ils l'annoncent.",
    utility:
      "Scraping multi-sources (prix, posts, offres, recrutements), récap IA hebdomadaire.",
    statValue: "0 min",
    statLabel: "de check manuel",
    icon: "Eye",
    sig: 3,
  },
  // 10
  {
    id: "rh-2",
    category: "RH",
    title: "Sélection auto de CV",
    hook: "Le bon profil ne passe plus à travers.",
    utility:
      "Scoring multi-critères sur vos vrais besoins. Shortlist auto, justification claire par candidat.",
    statValue: "5 sec",
    statLabel: "par CV vs 5 min à la main",
    icon: "FileSearch",
    sig: 4,
  },
  // 11
  {
    id: "com-2",
    category: "COMMERCIAL",
    title: "Suivi commercial automatique",
    hook: "Tu ne perds plus un deal par oubli.",
    utility:
      "Relances intelligentes, alertes blocage, récap hebdo. Le pipe travaille même la nuit.",
    statValue: "+25%",
    statLabel: "de taux de closing",
    icon: "TrendingUp",
    sig: 1,
  },
  // 12
  {
    id: "mkt-3",
    category: "MARKETING",
    title: "Rédaction d'articles SEO",
    hook: "Les articles que Google et les humains aiment.",
    utility:
      "Brief → article structuré + méta + maillage interne + variantes. Ton de marque préservé.",
    statValue: "2 h → 15 min",
    statLabel: "par article",
    icon: "PencilLine",
    sig: 2,
  },
];

export const MARQUEE_TAGS = [
  "Génération de contrats",
  "Veille brevets",
  "Tri CV",
  "Devis fournisseurs",
  "Compta auto",
  "Relances clients",
  "Onboarding salarié",
  "Bilan social",
  "Auto-publication LinkedIn",
  "Auto-publication Instagram",
  "Suivi prix concurrence",
  "Suivi positions SEO",
  "Récap de réunion",
  "Compte-rendu visite",
  "Notes de frais",
  "Bons de livraison",
  "Inventaire intelligent",
  "Planning équipes",
  "Pré-qualification candidat",
  "Coaching commercial",
  "Récap call commercial",
  "Assistant juridique",
  "Recherche jurisprudence",
  "Pige immobilière",
  "Veille presse",
  "Alertes mentions",
  "Génération newsletter",
  "Réponses Trustpilot",
  "Tri tickets support",
  "FAQ dynamique",
  "KYC client",
  "Validation pièce d'identité",
  "Détection fraude",
  "Reporting investisseurs",
  "Suivi budget projet",
  "Alertes seuils",
  "Audit conformité",
  "Brief créatif IA",
  "Génération visuels",
  "Sous-titrage vidéo",
  "Transcription réunion",
  "Diagramme à partir d'un brief",
  "Génération maquette",
  "Fiches produit",
  "Réponses appels d'offres",
  "Veille subventions",
  "Rapports financiers",
  "Préqualif locataire",
  "Conciergerie virtuelle",
  "QR-commande in-room",
];
