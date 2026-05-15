/**
 * Configuration des blocs d'affichage du dashboard, calquée sur la structure exacte des formulaires.
 * Chaque bloc a un titre et une liste ordonnée de champs (clé API, libellé affiché).
 */

export type FormType = 'estimation' | 'estimation_investisseur' | 'estimation_paris' | 'estimation_juridique' | 'recherche_locataire_essentielle' | 'recherche_locataire_paris'

export interface BlocConfig {
  title: string
  fields: { key: string; label: string }[]
}

// Structure Estimation Essentielle (formulaire estimation/formulaire/etape-2)
const ESTIMATION_BLOCS: BlocConfig[] = [
  {
    title: 'Coordonnées',
    fields: [
      { key: 'civilite', label: 'Civilité' },
      { key: 'prenom', label: 'Prénom' },
      { key: 'nom', label: 'Nom' },
      { key: 'telephone', label: 'Téléphone' },
      { key: 'email', label: 'Email' },
    ],
  },
  {
    title: 'Projet de vente',
    fields: [
      { key: 'contexte_vente', label: 'Contexte (plusieurs réponses possibles)' },
      { key: 'nom_succession', label: 'Nom de la succession' },
    ],
  },
  {
    title: 'Identification du bien',
    fields: [
      { key: 'localisation', label: 'Adresse exacte du bien' },
      { key: 'ville', label: 'Ville' },
      { key: 'code_postal', label: 'Code postal' },
      { key: 'type_bien', label: 'Type de bien' },
      { key: 'surface', label: 'Surface (m²)' },
      { key: 'surface_carrez', label: 'Surface Loi Carrez (m²)' },
      { key: 'surface_terrain', label: 'Surface du terrain (m²)' },
      { key: 'annee_construction', label: "Année de construction" },
      { key: 'residence_type', label: 'Le bien est actuellement' },
      { key: 'residence_type_autre', label: 'Précisez la situation' },
    ],
  },
  {
    title: 'Photos du bien',
    fields: [
      { key: 'photos_urls', label: 'Photos extérieur' },
      { key: 'photos_interieur_urls', label: 'Photos intérieur' },
    ],
  },
  {
    title: 'Confort & Environnement',
    fields: [
      { key: 'exposition', label: 'Exposition' },
      { key: 'vis_a_vis', label: 'Vis-à-vis' },
      { key: 'distance_vis_a_vis', label: 'Distance du voisin le plus proche' },
    ],
  },
  {
    title: 'Caractéristiques',
    fields: [
      { key: 'nombre_pieces', label: 'Nombre de pièces' },
      { key: 'nombre_chambres', label: 'Nombre de chambres' },
      { key: 'nombre_salles_de_bain', label: 'Salles de bain' },
      { key: 'nombre_salles_d_eau', label: "Salles d'eau" },
      { key: 'nombre_wc', label: 'Nombre de WC' },
      { key: 'wc_separes', label: 'WC séparés' },
      { key: 'nombre_niveaux', label: 'Nombre de niveaux' },
      { key: 'etage', label: 'Étage' },
      { key: 'nombre_etages_immeuble', label: "Nombre d'étages de l'immeuble" },
      { key: 'dernier_etage', label: 'Dernier étage' },
      { key: 'ascenseur', label: 'Ascenseur' },
      { key: 'rooftop_ou_non', label: 'Rooftop' },
      { key: 'rdc_ou_non', label: 'Rez-de-chaussée' },
      { key: 'exterieurs', label: 'Extérieurs' },
      { key: 'surface_exterieur', label: 'Surface extérieure totale (m²)' },
      { key: 'balcon_m2', label: 'Balcon (m²)' },
      { key: 'terrasse_m2', label: 'Terrasse (m²)' },
      { key: 'loggia_m2', label: 'Loggia (m²)' },
      { key: 'rez_de_jardin_m2', label: 'Rez-de-jardin (m²)' },
      { key: 'cave_m2', label: 'Cave (m²)' },
      { key: 'stationnement', label: 'Stationnement' },
      { key: 'stationnement_emplacement', label: 'Emplacement stationnement' },
      { key: 'stationnement_ext_prive_libre', label: 'Stationnement extérieur' },
      { key: 'has_box', label: 'Box' },
      { key: 'stationnement_couvert', label: 'Couvert' },
      { key: 'stationnement_ferme', label: 'Fermé' },
      { key: 'surface_stationnement', label: 'Superficie stationnement (m²)' },
      { key: 'maison_stationnement_lieu', label: 'Stationnement maison — emplacement' },
      { key: 'maison_garage_independant', label: 'Garage indépendant' },
      { key: 'maison_garage_independant_format', label: 'Garage indépendant — simple/double' },
      { key: 'maison_garage_sous_sol', label: 'Garage sous-sol' },
      { key: 'maison_auvent', label: 'Auvent' },
      { key: 'maison_aire_non_couverte', label: 'Aire non couverte' },
      { key: 'maison_aire_non_couverte_sol', label: 'Aire non couverte — revêtement' },
      { key: 'maison_stationnement_exterieur', label: 'Stationnement extérieur' },
      { key: 'maison_terrain_clos', label: 'Terrain clos' },
      { key: 'maison_type_cloture', label: 'Type de clôture' },
      { key: 'maison_portail', label: 'Portail' },
      { key: 'maison_type_portail', label: 'Type de portail' },
      { key: 'maison_systeme_acces', label: "Système d'accès (portail)" },
      { key: 'maison_alarme_exterieur', label: 'Alarme (extérieur / périmètre)' },
      { key: 'maison_cameras_exterieur', label: 'Caméras' },
      { key: 'maison_eclairage_exterieur', label: 'Éclairage extérieur' },
      { key: 'maison_eclairage_exterieur_preciser', label: 'Éclairage extérieur — précision' },
      { key: 'maison_perimetre_autre', label: 'Périmètre / sécurité — autre' },
      { key: 'mitoyennete', label: 'Mitoyenneté' },
      { key: 'maison_type', label: 'Type de maison' },
      { key: 'maison_ensemble_organise', label: 'Maison en ensemble organisé' },
      { key: 'procedure_en_cours_maison', label: 'Procédure en cours (maison)' },
      { key: 'sous_sol_total_m2', label: 'Sous-sol total (m²)' },
      { key: 'sous_sol_amenage_m2', label: 'Sous-sol aménagé (m²)' },
      { key: 'piscine', label: 'Piscine' },
      { key: 'piscine_annee', label: 'Piscine — année' },
      { key: 'piscine_implantation', label: 'Piscine — type' },
      { key: 'piscine_chauffee', label: 'Piscine — chauffée' },
      { key: 'piscine_equipements', label: 'Piscine — équipements' },
      { key: 'combles_m2', label: 'Combles (m²)' },
      { key: 'combles_amenagees_m2', label: 'Combles aménagés (m²)' },
      { key: 'studio_dependances_m2', label: 'Studio / dépendances (m²)' },
      { key: 'forage_puits', label: 'Forage / puits' },
      { key: 'etat_exterieur_terrain', label: 'État extérieur du terrain' },
      { key: 'prestations_exterieures_maison', label: 'Prestations extérieures (maison)' },
      { key: 'prestations_exterieures_maison_autres', label: 'Prestations extérieures — autre' },
      { key: 'vue', label: 'Vue' },
    ],
  },
  {
    title: 'État & Prestations',
    fields: [
      { key: 'etat_bien', label: 'État général du bien' },
      { key: 'travaux_recents', label: 'Travaux récents' },
      { key: 'nature_travaux', label: 'Nature des travaux' },
      { key: 'annee_travaux', label: 'Année des travaux' },
      { key: 'montant_travaux', label: 'Montant des travaux (€)' },
      { key: 'travaux_prevus', label: 'Travaux prévus' },
      { key: 'nature_travaux_prevus', label: 'Nature des travaux prévus' },
      { key: 'budget_travaux_prevus', label: 'Budget travaux prévus (€)' },
      { key: 'date_travaux_prevus', label: 'Date des travaux prévus' },
      { key: 'prestations', label: 'Prestations' },
      { key: 'autres_prestations', label: 'Autres prestations' },
      { key: 'travaux_autorisations', label: 'Autorisations de travaux' },
      { key: 'travaux_prevus_autorisations', label: 'Autorisations travaux prévus' },
      { key: 'travaux_urbanisme', label: 'Urbanisme' },
      { key: 'travaux_urbanisme_detail', label: 'Détail urbanisme' },
      { key: 'etat_murs', label: 'État des murs' },
      { key: 'etat_sols', label: 'État des sols' },
      { key: 'etat_plafonds', label: 'État des plafonds' },
      { key: 'etat_menuiserie', label: 'État de la menuiserie' },
      { key: 'standing', label: 'Niveau global du bien' },
      { key: 'materiaux', label: 'Matériaux' },
      { key: 'cuisine_electromenager', label: 'Électroménager cuisine' },
      { key: 'marques_cuisine', label: 'Marques cuisine' },
      { key: 'type_vente_vide_meuble', label: 'Vente vide ou meublé' },
      { key: 'equipements_premium', label: 'Équipements premium' },
      { key: 'atout_principal', label: "Atout principal" },
      { key: 'element_negatif_valorisation', label: "Élément négatif à la valorisation" },
      { key: 'prestations_interieures_maison', label: 'Prestations intérieures' },
      { key: 'prestations_interieures_maison_autres', label: 'Autres prestations intérieures' },
      { key: 'maison_annexes_interieures', label: 'Annexes intérieures' },
      { key: 'maison_annexes_interieures_autre', label: 'Annexes intérieures — autre' },
      { key: 'maison_potentiel_particulier', label: 'Potentiel particulier (urbanisme)' },
      { key: 'etat_toiture', label: 'État toiture' },
      { key: 'etat_facade', label: 'État façade' },
      { key: 'etat_terrain_ext', label: 'État terrain' },
      { key: 'etat_murs_exterieurs', label: 'État murs extérieurs' },
      { key: 'securite_confort', label: 'Sécurité & confort' },
      { key: 'standing_residence', label: 'Standing de la résidence' },
      { key: 'gardien_concierge', label: 'Gardien / concierge' },
      { key: 'residence_fermee_type', label: 'Accès résidence fermée' },
      { key: 'travaux_copro_recents', label: 'Travaux de copropriété récents' },
      { key: 'travaux_copro_recents_detail', label: 'Détail travaux copro récents' },
      { key: 'travaux_copro_recents_montant', label: 'Montant travaux copro (€)' },
      { key: 'travaux_copro_recents_annee', label: 'Année travaux copro' },
      { key: 'travaux_copro_votes_nature', label: 'Travaux copro votés (nature)' },
      { key: 'travaux_copro_votes_cout', label: 'Travaux copro votés (coût)' },
      { key: 'travaux_copro_prevus_nature', label: 'Travaux copro prévus (nature)' },
      { key: 'travaux_copro_prevus_cout', label: 'Travaux copro prévus (coût)' },
      { key: 'travaux_copro_prevus_date', label: 'Date travaux copro prévus' },
      { key: 'travaux_copro_prevus_non_votes', label: 'Travaux copro prévus non votés' },
      { key: 'travaux_votes_non_realises', label: 'Travaux votés non réalisés' },
      { key: 'travaux_votes_non_realises_detail', label: 'Détail travaux votés non réalisés' },
      { key: 'travaux_votes_non_realises_delai', label: 'Délai travaux votés non réalisés' },
      { key: 'type_syndic', label: 'Type de syndic' },
      { key: 'statut_copro', label: 'Statut de la copropriété' },
      { key: 'lotissement_asl', label: 'Lotissement avec ASL' },
      { key: 'charges_asl', label: 'Charges ASL' },
      { key: 'charges_asl_contenu', label: 'Contenu charges ASL' },
      { key: 'travaux_asl_recents', label: 'Travaux ASL récents' },
      { key: 'travaux_asl_recents_detail', label: 'Détail travaux ASL' },
      { key: 'travaux_asl_recents_montant', label: 'Montant travaux ASL (€)' },
      { key: 'travaux_asl_votes_non_realises', label: 'Travaux ASL votés non réalisés' },
      { key: 'travaux_asl_votes_detail', label: 'Détail travaux ASL votés' },
      { key: 'travaux_asl_votes_delai', label: 'Délai travaux ASL votés' },
      { key: 'travaux_asl_prevus_non_votes', label: 'Travaux ASL prévus non votés' },
      { key: 'procedure_en_cours_asl', label: 'Procédure en cours ASL' },
      { key: 'nombre_lots_copro_horizontale', label: 'Nombre de lots copro horizontale' },
      { key: 'charges_copro_horizontale', label: 'Charges copro horizontale' },
      { key: 'charges_copro_horizontale_contenu', label: 'Contenu charges copro horizontale' },
      { key: 'travaux_copro_horizontale_recents', label: 'Travaux copro horizontale récents' },
      { key: 'travaux_copro_horizontale_recents_detail', label: 'Détail travaux copro horizontale' },
      { key: 'travaux_copro_horizontale_recents_montant', label: 'Montant travaux copro horizontale' },
      { key: 'travaux_copro_horizontale_votes_non_realises', label: 'Travaux copro horiz. votés non réalisés' },
      { key: 'travaux_copro_horizontale_votes_detail', label: 'Détail travaux copro horiz. votés' },
      { key: 'travaux_copro_horizontale_votes_delai', label: 'Délai travaux copro horiz. votés' },
      { key: 'travaux_copro_horizontale_prevus_non_votes', label: 'Travaux copro horiz. prévus non votés' },
      { key: 'procedure_en_cours_copro_horizontale', label: 'Procédure en cours copro horizontale' },
    ],
  },
  {
    title: 'Production Chauffage & Eau Chaude',
    fields: [
      { key: 'chauffage_type', label: 'Type de chauffage' },
      { key: 'chauffage_production', label: 'Production de chauffage' },
      { key: 'eau_chaude_type', label: "Type d'eau chaude" },
      { key: 'eau_chaude_production', label: "Production d'eau chaude" },
      { key: 'anciennete_installation', label: "Année d'installation" },
      { key: 'dpe_valide', label: 'DPE valide' },
      { key: 'dpe', label: 'Classe DPE' },
      { key: 'classe_ges', label: 'Classe GES' },
      { key: 'taxe_fonciere', label: 'Taxe foncière (€/an)' },
      { key: 'charges_copro', label: 'Charges de copropriété' },
      { key: 'charges_copro_trimestriel', label: 'Charges trimestrielles (€)' },
      { key: 'charges_copro_contenu', label: 'Contenu des charges' },
    ],
  },
  {
    title: 'Assainissement',
    fields: [
      { key: 'assainissement_type', label: "Type d'assainissement" },
      { key: 'spanc_validite', label: 'Validité diagnostic SPANC' },
      { key: 'raccordabilite', label: 'Raccordabilité' },
    ],
  },
  {
    title: 'Situation Juridique & Technique',
    fields: [
      { key: 'situation_juridique_technique', label: 'Juridique' },
      { key: 'situation_technique_urbanistique', label: 'Technique et urbanistique' },
      { key: 'situation_copro_lotissement', label: 'Copropriété / Lotissement / ASL' },
    ],
  },
  {
    title: 'Projet de vente (suite)',
    fields: [
      { key: 'delai_vente', label: 'Délai de vente souhaité' },
      { key: 'situation_actuelle', label: 'Situation actuelle' },
      { key: 'type_bail_loue', label: 'Type de bail (si loué)' },
      { key: 'fin_bail', label: 'Date de fin de bail' },
      { key: 'age_locataire', label: "Âge du locataire" },
      { key: 'loyer_hors_charges', label: 'Loyer hors charges (€)' },
      { key: 'charges_mensuelles', label: 'Charges mensuelles (€)' },
      { key: 'prix_envisage', label: 'Prix envisagé (€)' },
      { key: 'ajustement_prix_echelle', label: 'Ajustement prix (1-10)' },
    ],
  },
  {
    title: 'Message libre',
    fields: [{ key: 'message_libre', label: 'Informations complémentaires' }],
  },
]

// Structure Location Essentielle (identique à estimation pour les blocs communs, avec différences spécifiques)
const LOCATION_BLOCS: BlocConfig[] = [
  {
    title: 'Coordonnées',
    fields: [
      { key: 'civilite', label: 'Civilité' },
      { key: 'prenom', label: 'Prénom' },
      { key: 'nom', label: 'Nom' },
      { key: 'telephone', label: 'Téléphone' },
      { key: 'email', label: 'Email' },
    ],
  },
  {
    title: 'Projet de location',
    fields: [
      { key: 'contexte_vente', label: 'Contexte' },
      { key: 'nom_succession', label: 'Nom de la succession' },
    ],
  },
  {
    title: 'Identification du bien',
    fields: [
      { key: 'localisation', label: 'Adresse exacte du bien' },
      { key: 'ville', label: 'Ville' },
      { key: 'code_postal', label: 'Code postal' },
      { key: 'type_bien', label: 'Type de bien' },
      { key: 'surface', label: 'Surface habitable (m²)' },
      { key: 'surface_terrain', label: 'Surface du terrain (m²)' },
      { key: 'annee_construction', label: "Année de construction" },
      { key: 'residence_type', label: 'Le bien est actuellement' },
    ],
  },
  {
    title: 'Photos du bien',
    fields: [{ key: 'photos_urls', label: 'Photos' }],
  },
  {
    title: 'Caractéristiques',
    fields: [
      { key: 'nombre_pieces', label: 'Nombre de pièces' },
      { key: 'nombre_chambres', label: 'Nombre de chambres' },
      { key: 'nombre_salles_de_bain', label: 'Salles de bain' },
      { key: 'nombre_salles_d_eau', label: "Salles d'eau" },
      { key: 'nombre_wc', label: 'Nombre de WC' },
      { key: 'wc_separes', label: 'WC séparés' },
      { key: 'nombre_niveaux', label: 'Nombre de niveaux' },
      { key: 'etage', label: 'Étage' },
      { key: 'nombre_etages_immeuble', label: "Nombre d'étages de l'immeuble" },
      { key: 'dernier_etage', label: 'Dernier étage' },
      { key: 'ascenseur', label: 'Ascenseur' },
      { key: 'mitoyennete', label: 'Mitoyenneté' },
      { key: 'exterieurs', label: 'Extérieurs' },
      { key: 'surface_exterieur', label: 'Surface extérieure (m²)' },
      { key: 'stationnement', label: 'Stationnement' },
      { key: 'stationnement_emplacement', label: 'Emplacement' },
      { key: 'stationnement_couvert', label: 'Couvert' },
      { key: 'stationnement_ferme', label: 'Fermé' },
      { key: 'surface_stationnement', label: 'Superficie (m²)' },
    ],
  },
  {
    title: 'État & Prestations',
    fields: [
      { key: 'etat_bien', label: 'État général' },
      { key: 'travaux_recents', label: 'Travaux récents' },
      { key: 'nature_travaux', label: 'Nature des travaux' },
      { key: 'annee_travaux', label: 'Année' },
      { key: 'montant_travaux', label: 'Montant (€)' },
      { key: 'travaux_prevus', label: 'Travaux prévus' },
      { key: 'nature_travaux_prevus', label: 'Nature travaux prévus' },
      { key: 'budget_travaux_prevus', label: 'Budget (€)' },
      { key: 'date_travaux_prevus', label: 'Date prévue' },
      { key: 'prestations', label: 'Prestations' },
      { key: 'autres_prestations', label: 'Autres prestations' },
    ],
  },
  {
    title: 'État détaillé',
    fields: [
      { key: 'etat_murs', label: 'Murs' },
      { key: 'etat_sols', label: 'Sols' },
      { key: 'etat_plafonds', label: 'Plafonds' },
      { key: 'etat_menuiserie', label: 'Menuiserie' },
      { key: 'standing', label: 'Niveau global' },
      { key: 'etat_toiture', label: 'Toiture' },
      { key: 'etat_facade', label: 'Façade' },
      { key: 'etat_terrain_ext', label: 'Terrain' },
      { key: 'etat_murs_exterieurs', label: 'Murs extérieurs' },
      { key: 'securite_confort', label: 'Sécurité & confort' },
      { key: 'prestations_interieures_maison', label: 'Prestations intérieures' },
      { key: 'prestations_interieures_maison_autres', label: 'Autres prestations' },
      { key: 'maison_annexes_interieures', label: 'Annexes intérieures' },
      { key: 'maison_annexes_interieures_autre', label: 'Annexes intérieures — autre' },
      { key: 'maison_potentiel_particulier', label: 'Potentiel particulier' },
    ],
  },
  {
    title: 'Production Chauffage & Eau Chaude',
    fields: [
      { key: 'chauffage_type', label: 'Type de chauffage' },
      { key: 'chauffage_production', label: 'Production chauffage' },
      { key: 'eau_chaude_type', label: "Type d'eau chaude" },
      { key: 'eau_chaude_production', label: "Production eau chaude" },
      { key: 'anciennete_installation', label: "Année d'installation" },
    ],
  },
  {
    title: 'Assainissement',
    fields: [
      { key: 'assainissement_type', label: "Type d'assainissement" },
      { key: 'spanc_validite', label: 'Validité SPANC' },
      { key: 'raccordabilite', label: 'Raccordabilité' },
    ],
  },
  {
    title: 'Situation Juridique & Technique',
    fields: [
      { key: 'situation_juridique_technique', label: 'Juridique' },
      { key: 'situation_technique_urbanistique', label: 'Technique et urbanistique' },
      { key: 'situation_copro_lotissement', label: 'Copropriété / Lotissement / ASL' },
    ],
  },
  {
    title: 'Confort & Environnement',
    fields: [
      { key: 'exposition', label: 'Exposition' },
      { key: 'vis_a_vis', label: 'Vis-à-vis' },
      { key: 'distance_vis_a_vis', label: 'Distance voisin' },
    ],
  },
  {
    title: 'Charges',
    fields: [
      { key: 'taxe_fonciere', label: 'Taxe foncière (€/an)' },
      { key: 'charges_copro_trimestriel', label: 'Charges trimestrielles (€)' },
      { key: 'charges_copro_contenu', label: 'Contenu des charges' },
      { key: 'dpe_valide', label: 'DPE valide' },
      { key: 'dpe', label: 'Classe DPE' },
      { key: 'classe_ges', label: 'Classe GES' },
    ],
  },
  {
    title: 'Projet de location (suite)',
    fields: [
      { key: 'loyer_mensuel', label: 'Loyer mensuel envisagé (€)' },
      { key: 'delai_vente', label: 'Délai de mise en location' },
      { key: 'situation_actuelle', label: 'Situation actuelle' },
      { key: 'type_bail_loue', label: 'Type de bail' },
      { key: 'fin_bail', label: 'Fin de bail' },
    ],
  },
  {
    title: 'Message libre',
    fields: [{ key: 'message_libre', label: 'Informations complémentaires' }],
  },
]

// Structure Estimation Urbain / Paris (formulaire estimation/paris/formulaire/etape-2)
const PARIS_URBAIN_BLOCS: BlocConfig[] = [
  {
    title: 'Coordonnées',
    fields: [
      { key: 'civilite', label: 'Civilité' },
      { key: 'prenom', label: 'Prénom' },
      { key: 'nom', label: 'Nom' },
      { key: 'telephone', label: 'Téléphone' },
      { key: 'email', label: 'Email' },
    ],
  },
  {
    title: 'Identification du bien',
    fields: [
      { key: 'adresse_complete', label: 'Adresse complète' },
      { key: 'code_postal', label: 'Code postal' },
      { key: 'type_bien', label: 'Type de bien' },
      { key: 'type_bien_autre', label: 'Type de bien (précision)' },
      { key: 'surface_habitable', label: 'Surface habitable (m²)' },
      { key: 'surface_sol_totale', label: 'Surface au sol totale (m²)' },
      { key: 'surface_terrain', label: 'Surface du terrain (m²)' },
      { key: 'annee_construction', label: "Année de construction" },
    ],
  },
  {
    title: 'Statut actuel du bien',
    fields: [
      { key: 'statut_actuel', label: 'Statut actuel' },
      { key: 'statut_actuel_autre', label: 'Précisez' },
      { key: 'type_bail', label: 'Type de bail' },
      { key: 'loyer_mensuel_hors_charges', label: 'Loyer mensuel hors charges' },
      { key: 'date_debut_bail', label: 'Date début bail' },
      { key: 'date_fin_bail', label: 'Date fin bail' },
    ],
  },
  {
    title: 'Uniquement si appartement',
    fields: [
      { key: 'surface_carrez', label: 'Surface Loi Carrez (m²)' },
      { key: 'etage_bien', label: 'Étage du bien' },
      { key: 'etage_sur', label: 'Sur (nombre d\'étages)' },
      { key: 'dernier_etage', label: 'Dernier étage' },
      { key: 'ascenseur', label: 'Ascenseur' },
      { key: 'type_immeuble', label: "Type d'immeuble" },
      { key: 'standing_immeuble', label: "Standing de l'immeuble" },
    ],
  },
  {
    title: 'Éléments de copropriété',
    fields: [
      { key: 'nb_lots', label: "Nombre de lots dans l'immeuble" },
      { key: 'charges_annuelles', label: 'Montant charges annuelles' },
      { key: 'commerces_rdc', label: 'Commerces au RDC' },
      { key: 'commerces_nature', label: 'Nature des commerces' },
      { key: 'travaux_prevus', label: 'Travaux votés ou prévus' },
      { key: 'travaux_prevus_nature', label: 'Nature des travaux prévus' },
      { key: 'ravalement_facade', label: 'Ravalement façade' },
      { key: 'ravalement_toiture', label: 'Ravalement toiture' },
      { key: 'procedure_en_cours', label: 'Procédure en cours' },
      { key: 'etat_parties_communes', label: 'État des parties communes' },
      { key: 'gardien', label: 'Présence d\'un gardien' },
      { key: 'servitudes', label: 'Servitudes ou contraintes' },
    ],
  },
  {
    title: 'Caractéristiques générales du bien',
    fields: [
      { key: 'nombre_pieces', label: 'Nombre de pièces' },
      { key: 'nombre_chambres', label: 'Nombre de chambres' },
      { key: 'nombre_salles_d_eau', label: "Nombre de salles d'eau" },
      { key: 'nombre_salles_de_bain', label: 'Nombre de salles de bain' },
      { key: 'wc_separes', label: 'WC séparés' },
    ],
  },
  {
    title: 'Luminosité',
    fields: [{ key: 'luminosite', label: 'Luminosité (1-10)' }],
  },
  {
    title: 'État du bien',
    fields: [
      { key: 'etat_general', label: 'État général du bien' },
      { key: 'travaux_effectues', label: 'Travaux effectués' },
      { key: 'travaux_prevus_detail', label: 'Travaux prévus' },
      { key: 'autorisation_urbanisme', label: "Autorisation d'urbanisme" },
      { key: 'etat_murs', label: 'État des murs' },
      { key: 'etat_sols', label: 'État des sols' },
      { key: 'etat_plafonds', label: 'État des plafonds' },
      { key: 'etat_menuiserie', label: 'État de la menuiserie' },
    ],
  },
  {
    title: 'Prestations du bien',
    fields: [
      { key: 'niveau_bien', label: 'Niveau du bien' },
      { key: 'materiaux_finitions', label: 'Matériaux et finitions' },
      { key: 'cuisine', label: 'Cuisine' },
      { key: 'electromenager', label: 'Électroménager' },
      { key: 'equipements_interieur', label: 'Équipements intérieur' },
      { key: 'hauteur_plafond', label: 'Hauteur sous plafond' },
      { key: 'distribution_logement', label: 'Distribution du logement' },
      { key: 'maison_veranda_present', label: 'Véranda — présence' },
      { key: 'maison_veranda_superficie', label: 'Véranda — superficie' },
      { key: 'maison_veranda_chauffee', label: 'Véranda — chauffée' },
      { key: 'maison_veranda_nature', label: 'Véranda — nature' },
      { key: 'maison_veranda_usage', label: 'Véranda — usage' },
      { key: 'maison_veranda_urb_obtenue', label: 'Véranda — autorisation urbanisme obtenue' },
      { key: 'maison_veranda_urb_type', label: 'Véranda — type autorisation' },
      { key: 'maison_veranda_urb_type_autre', label: 'Véranda — type autorisation (autre)' },
      { key: 'maison_veranda_urb_travaux_conformes', label: 'Véranda — travaux conformes' },
      { key: 'maison_veranda_urb_regularisee', label: 'Véranda — régularisation' },
      { key: 'maison_extension_present', label: 'Extension — présence' },
      { key: 'maison_extension_superficie', label: 'Extension — superficie' },
      { key: 'maison_extension_chauffee', label: 'Extension — chauffée' },
      { key: 'maison_extension_nature', label: 'Extension — nature' },
      { key: 'maison_extension_usage', label: 'Extension — usage' },
      { key: 'maison_extension_urb_obtenue', label: 'Extension — autorisation urbanisme obtenue' },
      { key: 'maison_extension_urb_type', label: 'Extension — type autorisation' },
      { key: 'maison_extension_urb_type_autre', label: 'Extension — type autorisation (autre)' },
      { key: 'maison_extension_urb_travaux_conformes', label: 'Extension — travaux conformes' },
      { key: 'maison_extension_urb_regularisee', label: 'Extension — régularisation' },
      { key: 'maison_dependance_present', label: 'Dépendance(s) — présence' },
      { key: 'maison_dependance_nombre', label: 'Dépendance(s) — nombre' },
      { key: 'maison_dependance_superficie', label: 'Dépendance(s) — superficie' },
      { key: 'maison_dependance_nature', label: 'Dépendance(s) — nature' },
      { key: 'maison_dependance_usage', label: 'Dépendance(s) — usage' },
      { key: 'maison_dependance_autorisation_urb', label: 'Dépendance(s) — autorisation urbanisme' },
    ],
  },
  {
    title: 'Photos du bien',
    fields: [{ key: 'photos_urls', label: 'Photos' }],
  },
  {
    title: 'Confort et environnement',
    fields: [
      { key: 'exposition', label: 'Exposition' },
      { key: 'exposition_traversant', label: 'Traversant' },
      { key: 'vis_a_vis', label: 'Vis-à-vis' },
      { key: 'vue', label: 'Vue' },
      { key: 'exterieurs', label: 'Extérieurs' },
      { key: 'annexes', label: 'Annexes' },
    ],
  },
  {
    title: 'Réglementations',
    fields: [
      { key: 'encadrement_loyers', label: 'Encadrement des loyers applicable' },
      { key: 'location_touristique', label: 'Location touristique autorisée' },
      { key: 'changement_usage', label: 'Changement d\'usage effectué' },
      { key: 'residence_secondaire', label: 'Résidence secondaire' },
      { key: 'protection_immeuble', label: "Protection de l'immeuble" },
    ],
  },
  {
    title: 'Données financières',
    fields: [
      { key: 'prix_acquisition', label: "Prix d'acquisition" },
      { key: 'date_acquisition', label: "Date d'acquisition" },
      { key: 'taxe_fonciere', label: 'Taxe foncière' },
    ],
  },
  {
    title: 'Objectif de la demande',
    fields: [
      { key: 'objectif_demande', label: 'Objectif' },
      { key: 'objectif_demande_autre', label: 'Précisez' },
    ],
  },
  {
    title: 'Documents disponibles',
    fields: [{ key: 'documents_disponibles', label: 'Documents' }],
  },
  {
    title: 'Perception du bien',
    fields: [
      { key: 'atout_principal', label: "Atout principal du bien" },
      { key: 'element_negatif', label: 'Élément négatif à la valorisation' },
    ],
  },
  {
    title: 'Délai de vente',
    fields: [{ key: 'delai_vente', label: 'Délai de vente souhaité' }],
  },
  {
    title: 'Prix envisagé',
    fields: [{ key: 'prix_envisage', label: 'Prix envisagé (€)' }],
  },
  {
    title: 'Fourchette de négociation',
    fields: [{ key: 'fourchette_negociation', label: 'Fourchette (1-10)' }],
  },
  {
    title: 'Informations complémentaires',
    fields: [{ key: 'informations_complementaires', label: 'Message' }],
  },
]

// Structure Estimation Investisseur (formulaire estimation/investisseur/formulaire/etape-2)
const ESTIMATION_INVESTISSEUR_BLOCS: BlocConfig[] = [
  {
    title: 'Coordonnées',
    fields: [
      { key: 'personne_morale', label: 'Nom de la personne morale' },
      { key: 'siret', label: 'SIRET' },
      { key: 'prenom', label: 'Prénom' },
      { key: 'nom', label: 'Nom' },
      { key: 'telephone', label: 'Téléphone' },
      { key: 'email', label: 'Email' },
    ],
  },
  {
    title: 'Type de structure',
    fields: [
      { key: 'type_structure', label: 'Type de structure' },
      { key: 'type_structure_autre', label: 'Précisez' },
    ],
  },
  {
    title: 'Contexte',
    fields: [
      { key: 'contexte', label: 'Contexte' },
      { key: 'contexte_autre', label: 'Précisez' },
    ],
  },
  {
    title: 'Objectif',
    fields: [{ key: 'objectifs', label: 'Objectifs' }],
  },
  {
    title: 'Stratégie société',
    fields: [
      { key: 'nb_biens_societe', label: 'Nombre de biens de la société' },
      { key: 'pct_actif_immobilier', label: '% actif immobilier' },
      { key: 'besoin_redistribution_tresorerie', label: 'Besoin de redistribution de trésorerie' },
      { key: 'projet_acquisition_futur', label: "Projet d'acquisition futur" },
      { key: 'projet_acquisition_detail', label: 'Détail du projet' },
      { key: 'refinancement_envisage', label: 'Refinancement envisagé' },
      { key: 'objectif_refinancement', label: 'Objectif du refinancement' },
      { key: 'objectif_refinancement_autre', label: 'Précisez' },
      { key: 'extraire_tresorerie_montant', label: 'Montant à extraire (€)' },
      { key: 'ameliorer_cashflow', label: 'Améliorer le cash-flow' },
      { key: 'optimiser_taux_dette', label: 'Optimiser taux/dette' },
      { key: 'financer_nouveau_projet', label: 'Financer nouveau projet' },
    ],
  },
  {
    title: 'Identification du bien',
    fields: [
      { key: 'adresse_complete', label: 'Adresse complète' },
      { key: 'code_postal', label: 'Code postal' },
      { key: 'ville', label: 'Ville' },
      { key: 'type_bien', label: 'Type de bien' },
      { key: 'type_bien_autre', label: 'Type de bien (précision)' },
      { key: 'surface_carrez', label: 'Surface Loi Carrez (m²)' },
      { key: 'surface_sol_totale', label: 'Surface au sol totale (m²)' },
      { key: 'etage', label: 'Étage' },
      { key: 'dernier_etage', label: 'Dernier étage' },
      { key: 'rdc', label: 'RDC' },
      { key: 'annee_construction', label: "Année de construction" },
    ],
  },
  {
    title: 'Destination actuelle',
    fields: [
      { key: 'destination_actuelle', label: 'Destination actuelle' },
      { key: 'destination_multiples_detail', label: 'Détail si destinations multiples' },
      { key: 'destination_autre', label: 'Précisez' },
    ],
  },
  {
    title: 'Usage actuel',
    fields: [
      { key: 'usage_actuel', label: 'Usage actuel' },
      { key: 'usage_autre', label: 'Précisez' },
    ],
  },
  {
    title: 'Photos du bien',
    fields: [{ key: 'photos_urls', label: 'Photos' }],
  },
  {
    title: 'État général',
    fields: [
      { key: 'etat_global', label: 'État global du bien' },
      { key: 'travaux_estimatifs_court_terme', label: 'Travaux estimatifs à court terme' },
      { key: 'budget_estimatif', label: 'Budget estimatif (€)' },
    ],
  },
  {
    title: 'Extérieurs & annexes',
    fields: [{ key: 'exterieurs_annexes', label: 'Extérieurs et annexes' }],
  },
  {
    title: 'Chauffage / eau chaude',
    fields: [
      { key: 'chauffage_individuel_collectif', label: 'Chauffage individuel ou collectif' },
      { key: 'systeme_chauffage', label: 'Système de chauffage' },
      { key: 'travaux_energetiques', label: 'Travaux énergétiques' },
      { key: 'travaux_energetiques_detail', label: 'Détail travaux énergétiques' },
    ],
  },
  {
    title: 'DPE',
    fields: [
      { key: 'classe_dpe', label: 'Classe DPE' },
      { key: 'classe_ges', label: 'Classe GES' },
      { key: 'annee_dpe', label: 'Année du DPE' },
    ],
  },
  {
    title: 'Taxe foncière',
    fields: [
      { key: 'taxe_fonciere_totale', label: 'Montant total (€)' },
      { key: 'taxe_fonciere_recuperable', label: 'Part récupérable (€)' },
      { key: 'taxe_fonciere_supportee', label: 'Part supportée (€)' },
    ],
  },
  {
    title: 'Données locatives',
    fields: [
      { key: 'bien_loue', label: 'Bien loué' },
      { key: 'loyer_annuel_hors_charges', label: 'Loyer annuel hors charges (€)' },
      { key: 'date_debut_bail', label: 'Date début bail' },
      { key: 'date_fin_bail', label: 'Date fin bail' },
      { key: 'derniere_revision', label: 'Dernière révision' },
      { key: 'irl', label: 'IRL' },
      { key: 'encadrement', label: 'Encadrement' },
      { key: 'potentiel_augmentation', label: 'Potentiel augmentation' },
      { key: 'loyer_envisage', label: 'Loyer envisagé (€)' },
      { key: 'charges_copro_annuelles', label: 'Charges copro annuelles (€)' },
      { key: 'charges_non_recuperables', label: 'Charges non récupérables (€)' },
      { key: 'frais_gestion_locative', label: 'Frais gestion locative' },
      { key: 'assurance_pno', label: 'Assurance PNO (€)' },
      { key: 'vacance_locative', label: 'Vacance locative' },
      { key: 'historique_impayes', label: 'Historique impayés' },
    ],
  },
  {
    title: 'Financement',
    fields: [
      { key: 'date_acquisition', label: "Date d'acquisition" },
      { key: 'prix_acquisition', label: "Prix d'acquisition (€)" },
      { key: 'credit_en_cours', label: 'Crédit en cours' },
      { key: 'montant_initial_emprunte', label: 'Montant initial emprunté (€)' },
      { key: 'montant_restant_du', label: 'Montant restant dû (€)' },
      { key: 'mensualite_actuelle', label: 'Mensualité actuelle (€)' },
      { key: 'taux_credit', label: 'Taux du crédit (%)' },
      { key: 'duree_restante', label: 'Durée restante' },
      { key: 'garantie', label: 'Garantie' },
    ],
  },
  {
    title: 'Travaux et valorisation',
    fields: [
      { key: 'travaux_realises', label: 'Travaux réalisés' },
      { key: 'travaux_realises_detail', label: 'Détail travaux réalisés' },
      { key: 'travaux_necessaires', label: 'Travaux nécessaires' },
      { key: 'travaux_necessaires_detail', label: 'Détail travaux nécessaires' },
      { key: 'travaux_autre', label: 'Autres travaux' },
    ],
  },
  {
    title: 'Copropriété',
    fields: [
      { key: 'nb_lots', label: "Nombre de lots" },
      { key: 'etat_parties_communes', label: 'État parties communes' },
      { key: 'travaux_votes_prevus', label: 'Travaux votés ou prévus' },
      { key: 'travaux_votes_prevus_nature_montant', label: 'Nature / montant travaux prévus' },
      { key: 'charges_annuelles', label: 'Charges annuelles (€)' },
      { key: 'procedure_en_cours', label: 'Procédure en cours' },
      { key: 'procedure_en_cours_nature', label: 'Nature procédure' },
    ],
  },
  {
    title: "Potentiel d'optimisation",
    fields: [
      { key: 'potentiel_optimisation', label: 'Potentiel' },
      { key: 'potentiel_optimisation_autre', label: 'Précisez' },
    ],
  },
  {
    title: "Hypothèse de projection",
    fields: [{ key: 'horizon_investissement', label: "Horizon d'investissement" }],
  },
  {
    title: 'Plus-value',
    fields: [
      { key: 'prix_acquisition_acte_inclus', label: 'Prix acquisition acte inclus (€)' },
      { key: 'frais_acquisition_initiaux', label: 'Frais acquisition initiaux (€)' },
      { key: 'travaux_immobilises', label: 'Travaux immobilisés (€)' },
      { key: 'prix_vente_envisage', label: 'Prix de vente envisagé (€)' },
      { key: 'objectif_prix_minimum', label: "Objectif prix minimum (€)" },
      { key: 'date_exacte_acquisition', label: "Date exacte d'acquisition" },
    ],
  },
  {
    title: 'Délai de vente',
    fields: [{ key: 'delai_vente', label: 'Délai de vente' }],
  },
  {
    title: 'Fourchette de négociation',
    fields: [{ key: 'fourchette_negociation', label: 'Fourchette (1-10)' }],
  },
  {
    title: 'Enjeu particulier',
    fields: [{ key: 'enjeu_particulier', label: 'Enjeu particulier' }],
  },
  {
    title: 'Autres actifs immobiliers',
    fields: [
      { key: 'autres_actifs', label: 'Autres actifs' },
      { key: 'autres_actifs_detail', label: 'Détail' },
    ],
  },
]

// Structure Estimation Professionnels du droit et du chiffre (formulaire estimation/juridique/formulaire/etape-2)
const ESTIMATION_JURIDIQUE_BLOCS: BlocConfig[] = [
  {
    title: 'Coordonnées',
    fields: [
      { key: 'profession_juridique', label: 'Profession' },
      { key: 'profession_juridique_autre', label: 'Profession (précision)' },
      { key: 'nom_structure', label: 'Nom de la structure' },
      { key: 'prenom', label: 'Prénom' },
      { key: 'nom', label: 'Nom' },
      { key: 'telephone', label: 'Téléphone' },
      { key: 'email', label: 'Email' },
    ],
  },
  {
    title: 'Contexte',
    fields: [
      { key: 'contexte_juridique', label: 'Contexte juridique' },
      { key: 'contexte_juridique_autre', label: 'Précisez' },
      { key: 'precisions_contexte', label: 'Précisions' },
    ],
  },
  {
    title: "Date de référence souhaitée pour l'évaluation",
    fields: [
      { key: 'date_reference', label: 'Date de référence' },
      { key: 'date_specifique', label: 'Date spécifique' },
    ],
  },
  {
    title: 'Référence de valeur éventuelle',
    fields: [
      { key: 'reference_valeur', label: 'Référence de valeur' },
      { key: 'nature_reference', label: 'Nature de la référence' },
      { key: 'nature_reference_autre', label: 'Précisez' },
      { key: 'montant_reference', label: 'Montant indicatif (€)' },
    ],
  },
  {
    title: 'Horizon envisagé',
    fields: [{ key: 'horizon_actif', label: "Horizon envisagé" }],
  },
  {
    title: "Objectif principal de l'analyse",
    fields: [
      { key: 'objectif_analyse', label: 'Objectif' },
      { key: 'objectif_analyse_autre', label: 'Précisez' },
    ],
  },
  {
    title: 'Situation juridique du bien',
    fields: [
      { key: 'situation_juridique', label: 'Situation juridique' },
      { key: 'situation_juridique_autre', label: 'Précisez' },
      { key: 'demembrement_nature', label: 'Nature du démembrement' },
      { key: 'age_usufruitier', label: "Âge de l'usufruitier" },
      { key: 'duree_usufruit', label: "Durée restante de l'usufruit" },
    ],
  },
  {
    title: 'Identification du bien',
    fields: [
      { key: 'adresse_complete', label: 'Adresse complète' },
      { key: 'code_postal', label: 'Code postal' },
      { key: 'ville', label: 'Ville' },
      { key: 'type_bien', label: 'Type de bien' },
      { key: 'type_bien_autre', label: 'Type de bien (précision)' },
    ],
  },
  {
    title: 'Destination actuelle',
    fields: [
      { key: 'destination_actuelle', label: 'Destination actuelle' },
      { key: 'destination_autre', label: 'Précisez' },
    ],
  },
  {
    title: 'Usage actuel',
    fields: [
      { key: 'usage_actuel', label: 'Usage actuel' },
      { key: 'usage_autre', label: 'Précisez' },
    ],
  },
  {
    title: 'Caractéristiques principales',
    fields: [
      { key: 'surface_principale', label: 'Surface principale (m²)' },
      { key: 'surface_sol_totale', label: 'Surface au sol totale (m²)' },
      { key: 'surface_terrain', label: 'Surface du terrain (m²)' },
      { key: 'nombre_niveaux', label: 'Nombre de niveaux' },
      { key: 'etage', label: 'Étage' },
      { key: 'annee_construction', label: "Année de construction" },
      { key: 'elements_annexes', label: 'Éléments annexes' },
    ],
  },
  {
    title: 'Photos du bien',
    fields: [{ key: 'photos_urls', label: 'Photos' }],
  },
  {
    title: 'État général du bien',
    fields: [
      { key: 'etat_global', label: 'État global' },
      { key: 'travaux_recents', label: 'Travaux récents' },
      { key: 'travaux_a_prevoir', label: 'Travaux à prévoir' },
    ],
  },
  {
    title: 'Situation locative',
    fields: [
      { key: 'bien_loue', label: 'Bien loué' },
      { key: 'loyer_annuel_hors_charges', label: 'Loyer annuel hors charges' },
      { key: 'date_debut_bail', label: 'Date début bail' },
      { key: 'date_fin_bail', label: 'Date fin bail' },
      { key: 'type_bail', label: 'Type de bail' },
      { key: 'derniere_revision', label: 'Dernière révision' },
      { key: 'encadrement_loyers', label: 'Encadrement des loyers' },
      { key: 'vacance_locative', label: 'Vacance locative' },
      { key: 'historique_impayes', label: 'Historique impayés' },
    ],
  },
  {
    title: 'Chauffage / eau chaude',
    fields: [{ key: 'chauffage_individuel_collectif', label: 'Chauffage individuel ou collectif' }],
  },
  {
    title: 'DPE et travaux énergétiques',
    fields: [
      { key: 'classe_dpe', label: 'Classe DPE' },
      { key: 'classe_ges', label: 'Classe GES' },
      { key: 'annee_dpe', label: 'Année du diagnostic' },
      { key: 'travaux_energetiques', label: 'Travaux énergétiques' },
      { key: 'travaux_energetiques_detail', label: 'Détail travaux énergétiques' },
    ],
  },
  {
    title: 'Données financières',
    fields: [
      { key: 'date_acquisition', label: "Date d'acquisition" },
      { key: 'prix_acquisition', label: "Prix d'acquisition" },
      { key: 'travaux_significatifs', label: 'Travaux significatifs' },
      { key: 'montant_travaux_total', label: 'Montant total travaux' },
      { key: 'mode_acquisition', label: "Mode d'acquisition" },
      { key: 'taxe_fonciere', label: 'Taxe foncière' },
    ],
  },
  {
    title: 'Servitude / contrainte juridique',
    fields: [
      { key: 'servitudes', label: 'Servitudes' },
      { key: 'servitudes_precisions', label: 'Précisions' },
    ],
  },
  {
    title: 'Copropriété',
    fields: [
      { key: 'nb_lots', label: "Nombre de lots" },
      { key: 'charges_annuelles_copro', label: 'Charges annuelles (€)' },
      { key: 'travaux_votes_prevus', label: 'Travaux votés ou prévus' },
      { key: 'procedure_en_cours_copro', label: 'Procédure en cours' },
    ],
  },
  {
    title: 'Documents éventuellement disponibles',
    fields: [{ key: 'documents_disponibles', label: 'Documents' }],
  },
  {
    title: 'Informations complémentaires',
    fields: [{ key: 'informations_complementaires', label: 'Informations' }],
  },
  {
    title: 'Problématique spécifique',
    fields: [{ key: 'problematique_specifique', label: 'Problématique' }],
  },
]

// Config par type de demande (alignée sur chaque `type_demande` en base + étapes 1 partielles)
export function getFormBlocs(typeDemande: string | undefined): BlocConfig[] {
  const t = typeDemande ?? ''
  // Estimation essentielle : complète ou partielle (étape 1)
  if (
    t === 'estimation' ||
    t === 'estimation_partielle' ||
    t === 'estimation_partielle_essentielle'
  ) {
    return ESTIMATION_BLOCS
  }
  // Investisseur
  if (t === 'estimation_investisseur' || t === 'estimation_partielle_investisseur') {
    return ESTIMATION_INVESTISSEUR_BLOCS
  }
  // Paris / urbain
  if (t === 'estimation_paris' || t === 'estimation_partielle_paris') {
    return PARIS_URBAIN_BLOCS
  }
  // Juridique
  if (t === 'estimation_juridique' || t === 'estimation_partielle_juridique') {
    return ESTIMATION_JURIDIQUE_BLOCS
  }
  // Location
  if (t === 'recherche_locataire_essentielle' || t === 'recherche_locataire_paris') {
    return LOCATION_BLOCS
  }
  // Fallback (anciens enregistrements ou types hors grille)
  return ESTIMATION_BLOCS
}
