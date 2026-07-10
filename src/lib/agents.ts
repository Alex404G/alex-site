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
 * 12 agents — pensés pour la cible réelle (artisans, commerces, TPE),
 * du plus universel au plus malin. Vocabulaire client, pas jargon.
 */
export const AGENTS: AgentCard[] = [
  // 01 — La douleur n°1 de l'artisan : l'appel manqué
  {
    id: "acc-1",
    category: "ACCUEIL",
    title: "Accueil téléphonique IA",
    hook: "Un appel manqué n'est plus un client perdu.",
    utility:
      "Sur un toit, en service, en rendez-vous : l'IA répond, comprend la demande, envoie un SMS récapitulatif et propose un créneau de rappel.",
    statValue: "24/7",
    statLabel: "elle répond pendant que vous travaillez",
    icon: "PhoneCall",
    sig: 3,
  },
  // 02
  {
    id: "ven-1",
    category: "VENTES",
    title: "Pré-diagnostic par photos",
    hook: "Vous arrivez en connaissant déjà le chantier.",
    utility:
      "Le client envoie ses photos, l'IA qualifie la demande : ampleur, accès, matériaux, urgence. La visite est préparée, les demandes pas sérieuses sont écartées.",
    statValue: "5 min",
    statLabel: "pour qualifier une demande",
    icon: "Camera",
    sig: 1,
  },
  // 03
  {
    id: "pil-1",
    category: "PILOTAGE",
    title: "Assistant connecté à votre entreprise",
    hook: "Comme ChatGPT, mais il connaît vraiment votre boîte.",
    utility:
      "Branché sur vos mails, devis, plannings et documents : il répond comme quelqu'un de la maison, sources à l'appui.",
    statValue: "−50%",
    statLabel: "de journée sur les tâches répétitives",
    icon: "Brain",
    sig: 4,
  },
  // 04
  {
    id: "ven-2",
    category: "VENTES",
    title: "Avis Google en pilote auto",
    hook: "Collecter, répondre, alerter : vos étoiles bossent sans vous.",
    utility:
      "Collecte après chaque chantier (SMS + QR code), réponse personnalisée à chaque avis, alerte immédiate si un avis négatif tombe.",
    statValue: "+1★",
    statLabel: "Google = +5 à +9% CA local (Harvard)",
    icon: "Star",
    sig: 2,
  },
  // 05
  {
    id: "adm-1",
    category: "ADMIN",
    title: "Tri & réponse de mails",
    hook: "Votre boîte se classe toute seule.",
    utility:
      "Tri par projet, réponses brouillon, classification urgents, alertes contextuelles.",
    statValue: "~1 h/jour",
    statLabel: "récupérée par poste",
    icon: "Mail",
    sig: 3,
  },
  // 06
  {
    id: "pil-2",
    category: "PILOTAGE",
    title: "Tableau de bord de pilotage",
    hook: "Toute votre activité sur un écran, récap le lundi matin.",
    utility:
      "Devis en cours, encaissements, avis, réservations : tout au même endroit, avec un récap envoyé chaque semaine.",
    statValue: "30 min",
    statLabel: "économisées par semaine",
    icon: "LayoutDashboard",
    sig: 1,
  },
  // 07
  {
    id: "mkt-1",
    category: "MARKETING",
    title: "Site à jour par message",
    hook: "Vous envoyez un message, votre site est à jour.",
    utility:
      "Nouveaux horaires, promo du moment, photo d'une réalisation : un simple message WhatsApp et la modification est en ligne, sans toucher au site.",
    statValue: "30 s",
    statLabel: "pour mettre le site à jour",
    icon: "Smartphone",
    sig: 4,
  },
  // 08
  {
    id: "acc-2",
    category: "ACCUEIL",
    title: "Prise de RDV & rappels SMS",
    hook: "L'agenda se remplit seul, les lapins se font rares.",
    utility:
      "Le client choisit son créneau en ligne, reçoit confirmation et rappel SMS. Reports et annulations gérés sans vous.",
    statValue: "0 appel",
    statLabel: "pour caler un rendez-vous",
    icon: "CalendarCheck",
    sig: 2,
  },
  // 09
  {
    id: "mkt-2",
    category: "MARKETING",
    title: "Posts réseaux automatiques",
    hook: "Vos photos de chantier deviennent des publications.",
    utility:
      "Une photo envoyée = un post rédigé dans votre ton pour Instagram, Facebook et votre fiche Google, prêt à valider.",
    statValue: "3 réseaux",
    statLabel: "alimentés en un envoi",
    icon: "Share2",
    sig: 3,
  },
  // 10
  {
    id: "cpt-1",
    category: "COMPTA",
    title: "Lecture & tri des factures",
    hook: "Plus jamais de \"qui a payé quoi\".",
    utility:
      "OCR multi-format, extraction structurée, classement automatique dans le bon dossier, prêt pour le comptable.",
    statValue: "2 min",
    statLabel: "économisées par facture",
    icon: "ScanLine",
    sig: 1,
  },
  // 11
  {
    id: "ven-3",
    category: "VENTES",
    title: "Relances devis & impayés",
    hook: "Les devis sans réponse et les factures en retard se relancent seuls.",
    utility:
      "Relances polies et progressives (J+3, J+10, J+30), par mail ou SMS, dans votre ton. Vous gardez la main avant chaque envoi.",
    statValue: "0",
    statLabel: "oubli de relance, jamais",
    icon: "BellRing",
    sig: 2,
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
    sig: 4,
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
