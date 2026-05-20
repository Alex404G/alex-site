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

export const AGENTS: AgentCard[] = [
  // RH ×3
  {
    id: "rh-1",
    category: "RH",
    title: "Assistant d'entretien live",
    hook: "Tu écoutes mieux quand tu ne prends pas de notes.",
    utility:
      "Transcription temps réel, relances suggérées au bon moment, récap structuré /20 envoyé à la fin.",
    statValue: "20 min",
    statLabel: "gagnées par entretien",
    icon: "Mic",
    sig: 1,
  },
  {
    id: "rh-2",
    category: "RH",
    title: "Sélection auto de CV",
    hook: "Le bon profil ne passe plus à travers.",
    utility:
      "Scoring multi-critères sur tes vrais besoins. Shortlist auto, justification claire candidat par candidat.",
    statValue: "5 sec",
    statLabel: "par CV vs 5 min à la main",
    icon: "FileSearch",
    sig: 2,
  },
  {
    id: "rh-3",
    category: "RH",
    title: "Onboarding automatisé",
    hook: "Le nouveau démarre vraiment lundi.",
    utility:
      "Parcours auto, ressources contextuelles, check-ins J+7 / J+30. Plus jamais oublié dans un coin.",
    statValue: "−40%",
    statLabel: "de churn premier mois",
    icon: "UserPlus",
    sig: 3,
  },

  // COMPTA ×3
  {
    id: "compta-1",
    category: "COMPTA",
    title: "Lecture & tri des factures",
    hook: "Plus jamais de « qui a payé quoi ».",
    utility:
      "OCR multi-format + extraction structurée + routage automatique vers la bonne BAL et le bon dossier.",
    statValue: "2 min",
    statLabel: "économisées par facture",
    icon: "ScanLine",
    sig: 4,
  },
  {
    id: "compta-2",
    category: "COMPTA",
    title: "Relances de paiements auto",
    hook: "Tes encaissements n'attendent plus.",
    utility:
      "Détection des retards, brouillons mail personnalisés selon l'historique client, escalade graduée.",
    statValue: "−30%",
    statLabel: "sur le délai moyen de paiement",
    icon: "BellRing",
    sig: 1,
  },
  {
    id: "compta-3",
    category: "COMPTA",
    title: "Devis & contrats automatiques",
    hook: "Le devis est déjà parti pendant qu'ils réfléchissent.",
    utility:
      "Templates dynamiques branchés sur ton CRM, ta grille tarifaire, tes conditions. Tu valides, ça part.",
    statValue: "< 2 min",
    statLabel: "par devis",
    icon: "FileSignature",
    sig: 2,
  },

  // COMMERCIAL ×4
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
    sig: 3,
  },
  {
    id: "com-2",
    category: "COMMERCIAL",
    title: "Suivi commercial automatique",
    hook: "Tu ne perds plus un deal par oubli.",
    utility:
      "Relances intelligentes, alertes blocage, récap hebdo automatique. Le pipe travaille même la nuit.",
    statValue: "+25%",
    statLabel: "de taux de closing",
    icon: "TrendingUp",
    sig: 4,
  },
  {
    id: "com-3",
    category: "COMMERCIAL",
    title: "Chatbot service client 24/7",
    hook: "Dans ton ton, sur tes données, en continu.",
    utility:
      "FAQ contextuelle, recherche dans tes docs, escalade humaine fluide quand c'est nécessaire.",
    statValue: "60%",
    statLabel: "des tickets résolus sans humain",
    icon: "MessageSquare",
    sig: 1,
  },
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
    sig: 2,
  },

  // MARKETING ×3
  {
    id: "mkt-1",
    category: "MARKETING",
    title: "Publication auto multi-réseaux",
    hook: "Tu postes une fois, chaque canal s'occupe du reste.",
    utility:
      "Adaptation par plateforme, images générées dans ton univers, planification programmée.",
    statValue: "−80%",
    statLabel: "de temps éditorial",
    icon: "Share2",
    sig: 3,
  },
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
    sig: 4,
  },
  {
    id: "mkt-3",
    category: "MARKETING",
    title: "Rédaction d'articles SEO",
    hook: "Les articles que Google et les humains aiment.",
    utility:
      "Brief → article structuré + méta + maillage interne + variantes. Ton de la marque préservé.",
    statValue: "2 h → 15 min",
    statLabel: "par article",
    icon: "PencilLine",
    sig: 1,
  },

  // OPS ×4
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
    sig: 2,
  },
  {
    id: "ops-2",
    category: "OPS",
    title: "Classement & recherche Drive",
    hook: "Tu cherches, il trouve. Et il range avant.",
    utility:
      "Classement automatique des PJ et exports, recherche sémantique sur tous tes fichiers.",
    statValue: "10 s",
    statLabel: "vs 2 min pour retrouver un doc",
    icon: "FolderTree",
    sig: 3,
  },
  {
    id: "ops-3",
    category: "OPS",
    title: "Génération de documents",
    hook: "Word, Excel, PDF — à la voix.",
    utility:
      "Templates métier branchés sur tes données. Tu dictes le brief, le doc est dans le bon dossier.",
    statValue: "30 min → 1 min",
    statLabel: "par document",
    icon: "FileText",
    sig: 4,
  },
  {
    id: "ops-4",
    category: "OPS",
    title: "Dashboard de pilotage",
    hook: "Tout sur un écran. Le récap arrive lundi 9h.",
    utility:
      "Multi-sources (CRM, compta, ventes, satisfaction), alertes seuils, récap IA hebdomadaire.",
    statValue: "30 min",
    statLabel: "économisées par semaine",
    icon: "LayoutDashboard",
    sig: 1,
  },

  // STRATÉGIE ×1 — produit signature
  {
    id: "strat-1",
    category: "STRATÉGIE",
    title: "Assistant IA connecté à ton SI",
    hook: "Comme ChatGPT, mais il connaît vraiment ta boîte.",
    utility:
      "Chat connecté à Microsoft 365 ou Google Workspace, 15+ outils, mémoire long-terme, agents verticaux.",
    statValue: "−50%",
    statLabel: "de journée sur les tâches éligibles",
    icon: "Brain",
    sig: 3,
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
