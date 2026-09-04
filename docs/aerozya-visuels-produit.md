# Aerozya — Série de 10 visuels produit (fiche Shopify)

Campagne carrée 2048 × 2048, optimisée mobile, un message marketing par image.
Générée avec Nano Banana Pro (Higgsfield).

**Référence produit : une seule photo réelle, jamais plusieurs.** Les images de la fiche
Shopify (appareil en main, main sur le bouton, colis) sont des scènes, pas des packshots :
en passer plusieurs en entrée fait mélanger les sources au modèle, qui recompose alors un
appareil approximatif. Une photo réelle unique + la règle de fidélité placée **en tête** du
prompt (et non au milieu) supprime cette dérive. Ne jamais revenir à des références multiples.

## 1. Design system (à réutiliser tel quel pour tout nouveau visuel)

### Couleurs — extraites du thème Shopify (config/settings_data.json)
Ne pas estimer ces valeurs à l'œil sur une capture : les relire dans le thème.

| Rôle | Hex |
|---|---|
| Vert profond — fond dominant et texte foncé | `#0B2E2D` |
| Vert quasi noir — vignettage macro | `#061A19` |
| Turquoise — accent, boutons, filets, pictos | `#0F9E9C` |
| Turquoise clair / foncé — dégradés | `#2DBEBC` / `#0B7876` |
| Menthe pâle — surfaces claires | `#EEF7F6` → `#D8EFEE` → `#BEE0DE` |
| Blanc — titres sur fond sombre | `#FFFFFF` |
| Rouge promo (soldes uniquement, hors DA) | `#FF5454` |

Le flux d'air est **turquoise**. La LED de l'appareil reste **bleue** : c'est le matériel
physique, pas un choix graphique.

### Typographie — polices du thème
- Titres : **Fraunces** (serif, graisse 500) — `fraunces_n5`
- Textes et labels : **Harmonia Sans** (400) — `harmonia_sans_n4`
- Boutons : police de titre, bold, capitales

### Mise en page (invariants)
- Wordmark `AEROZYA` : capitales blanches, interlettrage large, **coin haut-gauche**, petit.
- Marges : 8 % sur les 4 côtés.
- Le texte ne chevauche jamais le produit ni un visage.
- Pictos : trait fin blanc dans un cercle turquoise translucide.
- Séparateurs : filets verticaux turquoise 2 px.

### Traitement photo
Photoréaliste cinématographique, noirs profonds, fort contraste, lumière latérale douce,
liseré turquoise sur le produit, grain léger, aucune sursaturation. Jamais de bleu nuit.

### Géométrie réelle du produit — source de vérité
Décrire cette géométrie **en toutes lettres dans chaque prompt**, en plus de la référence
image. Une référence seule ne suffit pas : le modèle a dérivé tant que la forme n'était
pas écrite.

- **Forme : OVALE allongé** (stade / rectangle aux bouts arrondis), nettement plus large
  que profond, profil bas. **Jamais un cercle** — c'était l'erreur des premières séries.
- **Corps en deux parties** : couvercle blanc brillant légèrement bombé, posé sur un socle
  blanc qui se resserre vers le bas.
- **Un seul bouton**, rond, encastré dans le couvercle, **décalé vers une extrémité** et
  non centré. Symbole power, anneau lumineux bleu.
- **Bande de grille** entre couvercle et socle : renfoncement étroit à fines lamelles
  verticales, sur tout le pourtour, éclairé en bleu de l'intérieur.
- **Port USB-C** avec son cache, sur la face avant du socle.
- Blanc brillant, aucun marquage, aucun texte imprimé sur l'objet.

Interdits : rendre l'objet circulaire, centrer le bouton, omettre la bande ou le port,
ajouter un second bouton / écran / molette / logo / gravure, changer la couleur.

### Référence image
Utiliser le **détourage validé** sur fond transparent, et lui seul. Ne jamais repasser
plusieurs images de scène en entrée : le modèle mélange les sources et recompose un
appareil approximatif.

### Règle de sécurité (ozone)
L'appareil fonctionne **pièce vide, sans personne ni animal**. Le flux d'air bleu visible
n'apparaît donc que sur les visuels sans personne (1, 3). Sur toutes les scènes avec la
cliente, l'appareil est posé **au repos**, éteint : la scène se déroule après le cycle.

## 2. Les 10 visuels et leur fonction CRO

| # | Fonction CRO | Headline | Sous-texte |
|---|---|---|---|
| 1 | Comprendre le produit | Un intérieur plus frais. Sans effort. | Aerozya aide à neutraliser les odeurs du quotidien pour retrouver une maison plus agréable. |
| 2 | Identifier son problème | Le repas est terminé. L'odeur, elle, reste. | Cuisine, friture, poisson, épices… certaines odeurs s'installent longtemps après le repas. |
| 3 | Comprendre la solution | Neutralise les odeurs à la source. | Aerozya agit dans votre intérieur pour rendre l'air plus agréable au quotidien. |
| 4 | Se projeter | Respirez enfin chez vous. | Un intérieur plus frais, plus agréable et plus accueillant jour après jour. |
| 5 | Comprendre l'utilisation | Un seul geste. | Posez Aerozya dans la pièce, appuyez sur le bouton, fermez la porte. |
| 6 | Lever l'objection du quotidien | Vous l'oubliez presque. | Compact et discret, Aerozya trouve facilement sa place dans votre quotidien. |
| 7 | Comprendre où l'utiliser | Une place dans chaque pièce. | Cuisine, salon, chambre… déplacez simplement Aerozya là où vous en avez besoin. |
| 8 | Augmenter la valeur perçue | Pensé pour votre intérieur. | Un format compact et un design discret qui s'intègrent naturellement chez vous. |
| 9 | Créer de la confiance | Une maison où l'on se sent bien. | Aerozya accompagne simplement votre quotidien pour rendre votre intérieur plus agréable. |
| 10 | Enlever le risque d'achat | Essayez Aerozya chez vous. | 90 jours pour vous faire votre avis. |
| 11 | Écraser les alternatives | Recouvrir l'odeur, ou la détruire. | Bougies et sprays posent un parfum par-dessus. Aerozya agit sur la molécule elle-même. |

Bandeau du visuel 1 : Neutralise les odeurs · Simple à utiliser · Compact et discret
Bandeau du visuel 10 : Garantie 90 jours · Paiement sécurisé · Livraison offerte

Sur toute scène comportant une personne, l'appareil est **éteint, bande bleue non
allumée** — l'ozone impose une pièce vide. La bande n'est allumée que sur les visuels
sans personne (1, 3, 10, 11, 12).

Visuel 10 : **aucun packaging représenté** tant qu'une photo réelle de la boîte n'est pas
fournie — dessiner un carton reviendrait à inventer son impression. Appareil + câble USB-C.

Visuel 11 — comparatif, 4 lignes, toutes tirées de la fiche produit :
Détruit l'odeur à la source · Sans filtre ni recharge · Sans parfum ajouté · Rien à racheter
« Silencieux » est volontairement exclu : aucune donnée sonore fournie.

## 3. Casting lifestyle
Femme française réelle de 55 à 70 ans selon le visuel : cheveux gris / blond cendré /
châtain clair, maquillage minimal, texture de peau et ridules crédibles, aucune allure
de chirurgie esthétique, expression détendue et sincère. Jamais de mannequin de 20–30 ans.

## 4. Faits produits vérifiés (ne rien inventer au-delà)
- Garantie / essai : **90 jours** (fiche produit). ⚠️ Le tiroir panier du thème affiche
  **30 jours** (`head_message`) — incohérence à trancher côté boutique, c'est un
  engagement contractuel.
- **Un seul bouton**, aucun mode ni niveau de puissance.
- Sans filtre, sans recharge, sans consommable.
- Recharge **USB-C**.
- **Livraison offerte**, expédition sous 24–48 h avec suivi.
- Contenu du colis : purificateur(s), câble USB-C, guide de démarrage en français.
- Aucun chiffre de clients, aucune note, aucun témoignage, aucun décibel : non fournis.
