export type AgentCard = {
  id: string;
  category: "ACCUEIL" | "VENTES" | "COMPTA" | "ADMIN" | "MARKETING" | "PILOTAGE";
  title: string;
  hook: string;
  utility: string;
  statValue: string;
  statLabel: string;
  icon: string; // lucide name
  sig: 1 | 2 | 3 | 4; // signature color stop
};

/**
 * 12 agents généralistes — compréhensibles en une phrase par n'importe quel
 * patron, du plus universel au plus spécialisé. Simple, pas compliqué.
 */
export const AGENTS: AgentCard[] = [
  // 01
  {
    id: "a-01",
    category: "ACCUEIL",
    title: "Accueil téléphonique IA",
    hook: "Un appel manqué n'est plus un client perdu.",
    utility:
      "Quand vous ne pouvez pas répondre, l'IA décroche, comprend la demande, envoie un SMS récapitulatif et propose un créneau de rappel.",
    statValue: "24/7",
    statLabel: "elle répond pendant que vous travaillez",
    icon: "PhoneCall",
    sig: 3,
  },
  // 02
  {
    id: "a-02",
    category: "PILOTAGE",
    title: "Assistant connecté à votre entreprise",
    hook: "Comme ChatGPT, mais il connaît vraiment votre boîte.",
    utility:
      "Branché sur vos mails, devis, plannings et documents : posez-lui n'importe quelle question, il répond comme quelqu'un de la maison.",
    statValue: "−50%",
    statLabel: "de journée sur les tâches répétitives",
    icon: "Brain",
    sig: 1,
  },
  // 03
  {
    id: "a-03",
    category: "ADMIN",
    title: "Boîte mail en pilote automatique",
    hook: "Votre boîte se classe et prépare les réponses toute seule.",
    utility:
      "Chaque mail est trié, les urgents remontent, et une réponse brouillon vous attend : vous relisez, vous envoyez.",
    statValue: "~1 h/jour",
    statLabel: "récupérée sur les mails",
    icon: "Mail",
    sig: 4,
  },
  // 04
  {
    id: "a-04",
    category: "VENTES",
    title: "Machine à avis Google",
    hook: "Chaque client content devient un avis 5 étoiles.",
    utility:
      "La demande d'avis part au bon moment après chaque vente ou chantier, et chaque avis reçoit une réponse rédigée pour vous.",
    statValue: "+1★",
    statLabel: "Google = +5 à +9% CA local (Harvard)",
    icon: "Star",
    sig: 2,
  },
  // 05
  {
    id: "a-05",
    category: "ACCUEIL",
    title: "Prise de RDV automatique",
    hook: "L'agenda se remplit tout seul.",
    utility:
      "Le client choisit son créneau en ligne, reçoit confirmation et rappel SMS. Reports et annulations gérés sans vous.",
    statValue: "0 appel",
    statLabel: "pour caler un rendez-vous",
    icon: "CalendarCheck",
    sig: 1,
  },
  // 06
  {
    id: "a-06",
    category: "ADMIN",
    title: "Documents rédigés en une phrase",
    hook: "Vous dictez une phrase, le document est prêt.",
    utility:
      "Devis, courrier, contrat, attestation : vos modèles, vos prix, votre ton. Vous relisez, c'est parti.",
    statValue: "30 min → 2 min",
    statLabel: "par document",
    icon: "FileText",
    sig: 3,
  },
  // 07
  {
    id: "a-07",
    category: "ADMIN",
    title: "Compte-rendu automatique",
    hook: "Vous parlez, il note, il résume, il liste qui fait quoi.",
    utility:
      "Réunion, appel ou visite : tout est transcrit, résumé clairement, et les décisions comme les tâches sont envoyées à chacun.",
    statValue: "0 note",
    statLabel: "à prendre, plus rien ne se perd",
    icon: "Mic",
    sig: 2,
  },
  // 08
  {
    id: "a-08",
    category: "MARKETING",
    title: "Réseaux sociaux en autopilote",
    hook: "Une photo envoyée, un post prêt sur trois réseaux.",
    utility:
      "Une photo de votre travail = une publication rédigée dans votre ton pour Instagram, Facebook et votre fiche Google, prête à valider.",
    statValue: "3 réseaux",
    statLabel: "alimentés en un envoi",
    icon: "Share2",
    sig: 4,
  },
  // 09
  {
    id: "a-09",
    category: "COMPTA",
    title: "Paperasse lue et classée",
    hook: "Plus jamais de \"qui a payé quoi\".",
    utility:
      "Factures, contrats, attestations : tout est lu, les infos extraites, chaque document classé au bon endroit, prêt pour le comptable.",
    statValue: "2 min",
    statLabel: "économisées par document",
    icon: "ScanLine",
    sig: 1,
  },
  // 10
  {
    id: "a-10",
    category: "PILOTAGE",
    title: "Tableau de bord de l'activité",
    hook: "Toute votre activité sur un écran, récap le lundi matin.",
    utility:
      "Devis en cours, encaissements, avis, réservations : tout au même endroit, avec un récap envoyé chaque semaine.",
    statValue: "30 min",
    statLabel: "économisées par semaine",
    icon: "LayoutDashboard",
    sig: 2,
  },
  // 11
  {
    id: "a-11",
    category: "VENTES",
    title: "Relances clients automatiques",
    hook: "Les devis sans réponse et les factures en retard se relancent seuls.",
    utility:
      "Relances polies et progressives, par mail ou SMS, dans votre ton. Vous gardez la main avant chaque envoi.",
    statValue: "0",
    statLabel: "oubli de relance, jamais",
    icon: "BellRing",
    sig: 4,
  },
  // 12
  {
    id: "a-12",
    category: "MARKETING",
    title: "Rédaction d'articles SEO",
    hook: "Les articles que Google et les humains aiment.",
    utility:
      "Brief → article structuré + méta + maillage interne + variantes. Ton de marque préservé.",
    statValue: "2 h → 15 min",
    statLabel: "par article",
    icon: "PencilLine",
    sig: 3,
  },
];

export const MARQUEE_TAGS = [
  "Génération de contrats",
  "Veille brevets",
  "Suivi de chantier",
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
  "Réponses aux avis Google",
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
