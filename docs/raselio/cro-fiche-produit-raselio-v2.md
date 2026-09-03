# Raselio, refonte CRO de la fiche produit

Livrable Head of CRO, 3 septembre 2026. Périmètre : fiche `/products/raselio-tondeuse-parties-intimes` (thème « Raselio — avis corrigés 1 734 »), trafic Meta Ads, ICP et Buyer Persona existants, concurrents Balls, Meridian, Manscaped, Philips, Grümwise.

Sources exploitées : thème Shopify (templates `product.json`, `settings_data.json`), pages `7-raisons` et `pourquoi-pas-votre-tondeuse-a-barbe`, Shopify Analytics 30 jours, parcours client des 8 commandes, compte Meta Ads `raselio` (répartition âge et sexe, 60 publicités, 40 créatives), documents Drive (ICP « Kevin, 27 ans », 9 ads statiques, reproduction Grümwise, dossier « raselio statique 1 »).

Limite à connaître : le réseau de cette session bloque l'affichage direct de raselio.com, du CDN Shopify, de balls.co et d'Amazon. Les verdicts sur les images actuelles reposent sur leurs textes alternatifs, leurs noms de fichier et leur place dans le thème, pas sur un rendu visuel. Tout le reste (textes, structure, données) est lu à la source.

---

## 0. Ce qui change tout : les chiffres avant les opinions

| Indicateur (30 derniers jours) | Valeur | Lecture |
|---|---|---|
| Sessions | 1 519 | 58 % mobile, 39 % desktop |
| Ajouts panier | 28 (1,8 %) | Faible, mais le vrai problème est en amont |
| Checkouts atteints | 12 | 43 % des paniers vont au checkout : correct |
| Commandes attribuées | 3 (8 réelles depuis le 26/08) | Conversion mobile 0,34 %, desktop 0,00 % |
| Sessions arrivant sur la page d'accueil | 694 (46 %) | 2 paniers, 0 vente |
| Sessions arrivant sur la fiche produit | 343 | 15 paniers, 3 ventes (0,9 %) |
| Sessions arrivant sur l'advertorial « 7 raisons / tondeuse à barbe » | 135 | 6 paniers ; 3 des 8 acheteurs y ont commencé leur parcours |
| Sessions sur `/products/cutlab-essentials-bundle` | 95 | Redirigé vers un handle qui n'existe plus : page 404 |
| Sessions sur `/password` | 45 | Boutique fermée à un moment ou lien mort |
| Sessions sur les pages `/en/...` | ~105 | Version anglaise auto-traduite, 0 panier |
| Dépense Meta cumulée | ~704 € | Soit ~88 € par commande pour un produit à 34,99 € |

Répartition de la dépense Meta par audience (toute période) :

| Segment | Dépense | CTR |
|---|---|---|
| Hommes 55-64 | 183,61 € | 1,98 % |
| Hommes 65+ | 153,40 € | 2,19 % |
| Hommes 45-54 | 108,05 € | 1,04 % |
| Hommes 35-44 | 58,18 € | 1,04 % |
| Hommes 25-34 | 43,51 € | 0,98 % |
| Hommes 18-24 | 15,52 € | 1,67 % |
| Femmes (tous âges) | ~131 € | 0,36 à 0,60 % |

Les 8 acheteurs (prénoms, adresses e-mail de type `orange.fr`, `live.fr`, `veve1966`, villes de province) sont des hommes de 45 à 65 ans. Aucun n'a le profil « Kevin, 27 ans ».

Conclusion de diagnostic : la fiche est écrite pour un homme de 27 ans qui se tutoie et parle de « couilles », alors que l'argent, les clics et les achats viennent d'hommes de 50 à 65 ans qui se vouvoient, se méfient du dropshipping et lisent les mentions de garantie. Le persona documenté reste la base des douleurs (peur de se couper, zone invisible, repousse qui pique, « ma tondeuse à barbe suffit »). Ces douleurs sont universelles et confirmées par les hooks qui ont vendu (« Impeccable », « Post-it gagnante », « Elle remarquera tout »). Mais le registre, les visages et la preuve doivent parler à l'homme qui achète réellement.

Décision Head of CRO : persona opérationnel principal = « Marc, 54 ans », en couple, soigné, qui a déjà utilisé sa tondeuse à barbe en bas et en a assez de l'appréhension et des rougeurs. Persona secondaire = Kevin, 27 ans. La page passe au « vous », abandonne les mots crus, garde l'angle peur → contrôle → sérénité.

---

## 1. Diagnostic CRO global

La fiche ne manque ni d'arguments ni de sections. Elle manque de crédibilité, de clarté immédiate et d'ordre. Sept freins, par ordre d'impact :

1. **La moitié du trafic n'arrive jamais sur la fiche.** 694 sessions atterrissent sur l'accueil et produisent 0 vente. Origine probable : URL « raselio.com » écrite dans les textes d'annonce, lien bio Instagram, et trafic « direct » du navigateur in-app Meta. Tout lien payant et le lien bio doivent pointer vers la fiche ou l'advertorial.
2. **La preuve sociale est inventée et se voit.** « 4,7/5 sur 1 734 avis », « + de 17 000 hommes », « 758 clients », 26 avis rédigés à la main avec dates fictives et drapeaux canadiens, badge « Achat vérifié », carrousel imitant Trustpilot, badge « Offre limitée » sur des vidéos IA. La boutique a 8 commandes depuis le 26 août. Un acheteur de 55 ans repère ces incohérences, et le Code de la consommation (pratique commerciale trompeuse, art. L121-2) expose la boutique à une sanction. Le nombre « 1 734 avis » est le même que sur Trael. C'est le frein n°1 côté confiance.
3. **Le registre ne correspond pas à l'acheteur.** « Tu la rases en retenant ton souffle », « Les couilles, enfin tranquille », mélange tu/vous entre fiche, FAQ et advertorial. L'acheteur réel lit « vous ».
4. **Le prix barré n'est pas crédible.** 75,00 € barré, -53 %, sans historique de vente à ce prix. Un prix de référence doit correspondre à un prix réellement pratiqué (réglementation omnibus 2022). Un prix barré exagéré fait baisser la valeur perçue au lieu de la monter.
5. **La zone d'achat est encombrée.** Sous le bouton : icônes de paiement, carrousel de 8 avis, 3 vidéos stories (dont 2 fichiers identiques), timeline de livraison, 4 accordéons, bloc « Fréquemment achetés ensemble » vide. Le bouton ne respire pas.
6. **Les visuels sont des rendus ChatGPT sans humain.** Six images produit sans visage, sans main, sans salle de bain crédible. Le client ne se projette pas. Une image sans texte alternatif ni fonction (n°5) traîne dans la galerie.
7. **Des bugs qui coûtent des ventes.** Redirection `/products/cutlab-essentials-bundle` vers un handle mort (95 sessions perdues), CTA du comparatif affichant « 39,90 € » alors que le prix est 34,99 €, section « DANS LE CARTON » suivie d'un bloc vide, boutons « Découvrir » sans lien, versions `/en/` servies à des Français, conversion desktop nulle sur 591 sessions (à vérifier visuellement sur grand écran).

## 2. Pourquoi la fiche ne convertit pas (résumé en une phrase par cause)

- Le visiteur payant arrive au mauvais endroit une fois sur deux.
- Quand il arrive au bon endroit, il ne voit pas en 2 secondes ce que fait l'objet ni pour qui.
- La page lui demande de croire des chiffres impossibles avant de lui avoir montré le produit en main.
- Elle lui parle comme à un jeune de 25 ans alors qu'il a 55 ans.
- Elle empile des badges là où il attend un seul engagement clair : « 30 jours pour essayer, colis neutre ».
- Elle n'offre aucun choix d'offre, donc aucun mécanisme de valeur perçue ni de panier moyen.

## 3. Lecture de l'ICP et du Buyer Persona à la lumière des données

| Élément | Persona documenté (Kevin, 27) | Acheteur observé (Marc, 54) | Décision pour la fiche |
|---|---|---|---|
| Douleur n°1 | Peur de se couper | Identique, plus « je n'y vois rien » | Angle central conservé |
| Douleur n°2 | Repousse qui pique | Rougeurs, irritations le lendemain | Traiter les deux dans la section problème |
| Objection n°1 | « Ma tondeuse à barbe suffit » | Identique, plus « c'est encore un site chinois ? » | Comparatif conservé, preuve honnête ajoutée |
| Désir | Contrôle, ne plus serrer les dents | Être propre et présentable, discrétion, routine simple | Visuels « routine 5 minutes », colis neutre |
| Registre | Tutoiement, humour cru | Vouvoiement, direct, sans vulgarité | « Vous » partout, « parties intimes », « sous la ceinture » |
| Preuve attendue | UGC, humour | Garantie, marque française, SAV joignable, avis réels | Bloc garantie renforcé, mention légale d'éditeur français visible |
| Émotion recherchée | Soulagement | Sérénité, dignité | Homme détendu après la douche, jamais ridicule |

Recommandation média (hors fiche mais indispensable) : exclure les femmes des ensembles de publicités (18 % de la dépense, CTR deux fois inférieur, 0 vente identifiée), garder 35-65+ hommes, et pointer 100 % des annonces vers la fiche ou l'advertorial avec UTM.

---

## 4. Les 3 bullet points sous le titre

Remplacent le paragraphe de cinq phrases actuel.

**BULLET 1**
Tête arrondie et lames céramique : la peau glisse, elle n'est pas pincée.

**BULLET 2**
LED intégrée : vous voyez enfin la zone que vous tondez, même dans les plis.

**BULLET 3**
100 % étanche : 5 minutes sous la douche, rincée en 10 secondes.

Pourquoi ces trois : le premier neutralise la peur de se couper (douleur n°1) par le mécanisme, pas par une promesse. Le deuxième est le seul avantage que personne dans la catégorie française ne met en avant à ce prix, et il répond à « je travaille à l'aveugle ». Le troisième vend la simplicité et la routine, ce qui fait passer de « j'en ai besoin » à « je le ferai vraiment ». La garantie et la livraison ne sont pas dans les bullets : elles vont à côté du bouton, là où le risque se décide. Le sabot 3 hauteurs et la repousse sont traités dans la galerie et la section problème.

Format : trois lignes, icône coche terracotta `#C15D2F`, Inter 15 px, une ligne chacune sur mobile, sans point d'exclamation.

---

## 5. Nouvelle structure de l'above the fold (mobile)

Élément par élément, avec le verdict.

| # | Élément actuel | Verdict | Décision |
|---|---|---|---|
| 1 | Barre d'annonce | MODIFIER | Une seule ligne : « Livraison Colissimo offerte · 30 jours satisfait ou remboursé ». Pas de défilement. |
| 2 | Galerie 6 images, vignettes affichées sous l'image | REMPLACER | 8 médias, ratio 4:5, points de navigation au lieu des vignettes (gain d'environ 80 px). Première image : homme + produit en main, LED allumée. Ordre complet en section 10. |
| 3 | « EXCELLENT 4.7/5 \| 1 734 Avis » | SUPPRIMER | Remplacé par une ligne honnête : « Marque française · Garantie 2 ans · Essai 30 jours ». Dès 10 avis réels collectés : « ★★★★★ 4,8/5 · 12 avis vérifiés » avec l'application d'avis. |
| 4 | Titre « Tondeuse Intime Homme Raselio™ » | GARDER | Clair, SEO, dit « c'est quoi » et « pour qui ». Aligné à gauche, Fraunces. |
| 5 | Paragraphe 5 phrases au tutoiement | REMPLACER | Les 3 bullets de la section 4. |
| 6 | Prix 34,99 € / 75,00 € barré / -53 % | MODIFIER | « 34,99 € » en gras, à côté « Prix de lancement » et le prix barré uniquement s'il est le vrai prix qui sera appliqué après le lancement (recommandé : 49,90 €, appliqué réellement à une date fixée). Supprimer le -53 %. |
| 7 | Sélecteur d'offre | CRÉER | Trois cartes : Tondeuse seule 34,99 € / Pack Sérénité (tondeuse + tête céramique de rechange + trousse) 44,99 € « le plus choisi » / Duo 59,99 €. À valider avec le fournisseur HQ Dropshipping. Tant que le pack n'existe pas : une seule offre, sans sélecteur. |
| 8 | Bouton « Ajouter au panier » | MODIFIER | Pleine largeur, libellé « Ajouter au panier · 34,99 € », terracotta `#C15D2F`, texte crème. Bouton sticky conservé. |
| 9 | Icônes de paiement | GARDER (déplacer) | Une ligne fine en gris, directement sous la ligne de réassurance. L'acheteur de 55 ans cherche Visa, Mastercard, PayPal. |
| 10 | Livraison | MODIFIER | Une ligne sous le bouton : « Commandé avant 14 h, expédié aujourd'hui · chez vous le {date} ». Remplace la timeline à deux lignes. |
| 11 | Garantie | MODIFIER | Une ligne, trois items avec icônes : « Garantie 2 ans · 30 jours satisfait ou remboursé · Colis neutre ». |
| 12 | Badges, carrousel d'avis, vidéos stories, cross-sells | SUPPRIMER | Voir section 6. |

Séquence finale au-dessus de la ligne de flottaison sur un iPhone standard : barre d'annonce, image 1 (homme + produit), ligne de confiance honnête, titre, 3 bullets, prix, bouton. Le sélecteur d'offre et la réassurance apparaissent au premier défilement.

---

## 6. Sous « Ajouter au panier » : ce qu'on supprime

| Élément | Verdict | Raison |
|---|---|---|
| Carrousel d'avis façon Trustpilot (8 citations, photos IA) | SUPPRIMER | Faux, reconnaissable, doublon de la section avis. |
| Bloc « video-story » (3 vidéos, 2 identiques) | SUPPRIMER | Vidéos IA sans démonstration, poids de page, distraction avant l'achat. |
| Timeline « Commande avant / Chez toi le » | REMPLACER | Fusionnée dans la ligne livraison. |
| Accordéon « Description » (long texte au tutoiement) | SUPPRIMER | Son contenu devient la section problème, mieux placé. |
| Bloc « Fréquemment achetés ensemble » | SUPPRIMER | Métachamp `custom.cross_sells` vide : titre sans produit. |
| Icônes de paiement | GARDER | Une seule ligne discrète. |

## 7. Ce qu'on conserve

- Bouton principal et bouton sticky.
- Icônes de paiement (une ligne).
- Accordéon « Ce que contient le pack », renommé « Dans la boîte ».
- Accordéon « Livraison & Retour », renommé « Livraison, garantie, retours » et fusionné avec « Entretien & Garantie ».

## 8. Ce qu'on déplace

- La garantie 30 jours et la garantie 2 ans montent d'un accordéon vers la ligne sous le bouton.
- La FAQ « J'ai peur de me couper à cet endroit » descend dans la FAQ courte mais son idée monte en bullet 1 et en image 3.
- Le comparatif « tondeuse à barbe » remonte juste après la section problème (avant les étapes), car c'est l'objection n°1.
- Le visuel « Dans la boîte » entre dans la galerie (image 7) et l'accordéon.

Structure finale sous le bouton, dans l'ordre :

1. Ligne réassurance (Garantie 2 ans · 30 jours · Colis neutre).
2. Ligne livraison avec date.
3. Ligne paiement (icônes gris).
4. Trois accordéons fermés : Dans la boîte · Caractéristiques · Livraison, garantie, retours.

Accordéon « Caractéristiques » (nouveau, factuel, attendu par un acheteur de 55 ans) : lames céramique, tête arrondie amovible, LED intégrée, sabot 3 hauteurs (préciser les millimètres), 100 % étanche (préciser l'indice IPX), autonomie environ 90 min, charge environ 1 h 30 sur socle USB, garantie 2 ans, SAV en français. Toute valeur non confirmée par le fournisseur reste absente plutôt qu'inventée.

---

## 9. Analyse de la galerie actuelle

Six médias, tous générés par ChatGPT le 21 août, aucun humain.

**IMAGE 1** (`ChatGPT_Image_21_aout_2026_20_25_27`, « Raselio, tondeuse intime homme pour parties intimes et zones sensibles »)
Verdict : DÉPLACER en position 2.
Fonction actuelle : packshot produit sur socle.
Problème : ne dit ni pour qui ni pour quoi en 2 secondes ; objet seul, échelle inconnue.
Impact persona : « c'est une tondeuse », rien de plus.
Nouvelle fonction : montrer le produit proprement après que l'image 1 a montré l'usage.
Nouvelle version : garder si le rendu est net et fidèle au produit ; sinon régénérer selon brief B2.

**IMAGE 2** (`...01_31_06`, « avec éclairage LED »)
Verdict : REMPLACER.
Fonction actuelle : montrer la LED.
Problème : une LED sur un objet posé ne démontre rien ; le bénéfice est « je vois la zone ».
Nouvelle version : démo « sans LED / avec LED » sur une surface neutre (brief B4), position 4.

**IMAGE 3** (`...01_31_16`, « tête arrondie et lames céramique »)
Verdict : MODIFIER.
Fonction actuelle : macro technique.
Problème : pas de légende, pas de mécanisme nommé, pas de lien avec la peur de se couper.
Nouvelle version : macro avec trois annotations et le nom de la technologie (brief B3), position 3.

**IMAGE 4** (`...01_31_21`, « 100 % étanche, utilisable sous la douche », réutilisée zoomée comme « prise en main » sur la page 7 raisons)
Verdict : REMPLACER.
Fonction actuelle : étanchéité.
Problème : image objet sous l'eau, sans contexte de douche réel ni geste de rinçage.
Nouvelle version : scène douche avec homme, puis rinçage de la tête (brief B6), position 6.

**IMAGE 5** (`ChatGPT_Image_21_aout_2026_19_56_50`, sans texte alternatif)
Verdict : SUPPRIMER, aucune fonction CRO suffisamment forte.

**IMAGE 6** (`raselio-raison7-A`, « satisfait ou remboursé 30 jours, version A »)
Verdict : DÉPLACER en dernière position et MODIFIER.
Fonction actuelle : réassurance.
Problème : visuel de garantie en position 6 sur 6, texte à vérifier, pas de colis neutre.
Nouvelle version : brief B8, avec sceau 30 jours, 2 ans, colis neutre.

## 10. Nouvel ordre complet de la galerie (8 médias)

| Pos. | Média | Question du visiteur | Fonction CRO |
|---|---|---|---|
| 1 | Homme 45-55 ans, torse nu serviette à la taille, Raselio en main LED allumée, salle de bain lumière du matin | « C'est quoi, pour qui ? » | Compréhension immédiate, projection |
| 2 | Packshot produit sur socle, fond crème Raselio | « Ça ressemble à quoi de près ? » | Qualité perçue |
| 3 | Macro technologie annotée « Tête SafeCurve™ » | « Pourquoi ça ne coupe pas ? » | Mécanisme, différenciation |
| 4 | Démo LED sans/avec sur pli de serviette | « Comment je fais si je ne vois rien ? » | Preuve fonctionnelle |
| 5 | Comparatif illustré tondeuse à barbe vs Raselio (lame droite qui pince / tête ronde qui glisse) | « Pourquoi pas ma tondeuse à barbe ? » | Objection n°1 |
| 6 | Sous la douche puis rinçage 10 secondes | « C'est compliqué à entretenir ? » | Simplicité, routine |
| 7 | Homme détendu après la douche, miroir, sourire retenu, produit posé sur son socle | « Qu'est-ce que j'y gagne ? » | Résultat émotionnel : propre, tranquille |
| 8 | Dans la boîte + garantie (kit complet, colis neutre, sceau 30 jours / 2 ans) | « Qu'est-ce que je reçois, quel risque ? » | Valeur perçue, risque zéro |

Option P2 : une vidéo de 12 secondes en position 3 (démonstration sur matière proxy type pâte ou mousse, sabot en place) en lecture automatique muette. C'est le média qui vend le plus sur Amazon dans la catégorie.

## 11 à 15. Récapitulatif par action

- **Images à garder** : image 1 actuelle (devient position 2), sous réserve de qualité.
- **Images à modifier** : image 3 (macro annotée), image 6 (garantie).
- **Images à supprimer** : image 5.
- **Images à déplacer** : image 1 → position 2 ; image 6 → position 8.
- **Images à remplacer** : image 2 (LED), image 4 (étanche).

## 16 à 18. Nouveaux visuels à créer, rôle psychologique, texte exact

| Réf. | Visuel | Rôle psychologique | Texte intégré (exact) |
|---|---|---|---|
| B1 | Hero humain en main | « Un homme comme moi l'utilise, sans gêne » | Aucun texte. Le titre fait le travail. |
| B3 | Macro annotée | « Il y a une vraie raison technique de ne pas se couper » | « TÊTE SAFECURVE™ » / « Tête arrondie · Lames céramique · Sabot 3 hauteurs » |
| B4 | Démo LED | « Je verrai ce que je fais » | « SANS LED » / « AVEC LED » / « Vous voyez ce que vous tondez. » |
| B5 | Comparatif illustré | « Ma tondeuse à barbe n'est pas faite pour ça » | « TONDEUSE À BARBE » / « RASELIO » / « Lame droite qui pince. Tête ronde qui glisse. » |
| B6 | Douche + rinçage | « Ça prend 5 minutes et ça ne salit rien » | « 100 % ÉTANCHE » / « Rincée en 10 secondes » |
| B7 | Après la douche | « Je me sens propre, entretenu, tranquille » | « 5 minutes. Propre. Tranquille. » |
| B8 | Dans la boîte + garantie | « Je reçois tout, je ne risque rien » | « TOUT EST DANS LA BOÎTE » / « 30 jours satisfait ou remboursé · Garantie 2 ans · Colis neutre » |
| S1 | Section problème : trois vignettes (main crispée sur tondeuse à barbe / zone dans l'ombre / rougeurs discrètes suggérées par un geste) | Reconnaissance : « c'est exactement ça » | « Vous retenez votre souffle. » / « Vous ne voyez pas ce que vous faites. » / « Ça pique trois jours après. » |
| S2 | Étapes 1-2-3 (fichiers `raselio-etape1-sabot`, `etape2-passage`, `etape3-rincage` déjà en ligne le 3/09) | Simplicité | « 1. Clipsez le sabot » / « 2. Passez sans appuyer » / « 3. Rincez, c'est fini » |

Nom de technologie : « Tête SafeCurve™ » désigne l'ensemble tête arrondie + lames céramique + sabot. C'est une appellation marketing, pas une allégation technique nouvelle. Balls a « SackSafe™ », Manscaped « SkinSafe™ ». Un mécanisme nommé se retient et se compare. À déposer ou à remplacer par un équivalent si le nom est déjà pris.

---

## 19. Analyse des sections situées plus bas

**BLOC A. Accordéon Description (texte long, « tu »)**
Objectif actuel : argumentaire complet. Utile ? Oui, mais mal placé et mal écrit pour l'acheteur. Verdict : REMPLACER par la section problème (section 20, bloc 2), au « vous ».

**BLOC B. « Comment ça marche, CINQ MINUTES SOUS LA DOUCHE » (3 étapes, image étape 2 = photo WhatsApp)**
Objectif : simplicité. Utile ? Oui. Verdict : MODIFIER. Utiliser les trois images cohérentes déjà uploadées le 3/09, textes raccourcis (voir S2), supprimer la mention « tu ».

**BLOC C. Grille 2 images texte blanc (« Elle suit la peau… », « Elle vit dans ta douche », boutons « Découvrir » sans lien)**
Objectif : bénéfices. Utile ? Partiellement. Verdict : SUPPRIMER. Les deux idées sont couvertes par les images 3 et 6 de la galerie et par la section technologie. Les boutons morts nuisent.

**BLOC D. Slider avant/après « Tondeuse classique vs RASELIO Pro » (images peau irritée / peau nette)**
Objectif : résultat. Utile ? Non. Verdict : SUPPRIMER. Gros plans de peau générés par IA, registre médical, incohérence de nom (« Pro »). Un homme de 55 ans ne veut pas voir de peau irritée en gros plan sur une fiche premium. Le résultat se vend par l'image 7 et par les avis.

**BLOC E. Tableau comparatif « Ta tondeuse à barbe n'est pas faite pour cette zone » (8 lignes, CTA « 39,90 € »)**
Objectif : objection n°1. Utile ? Oui, fortement. Verdict : MODIFIER et REMONTER juste après la section problème. Six lignes au lieu de huit (supprimer « Prise en main pensée pour les angles difficiles » et « Garantie 2 ans » qui ne sont pas des différences d'outil), titre au « vous », bouton corrigé « Je passe à Raselio · 34,99 € ».

**BLOC F. « DANS LE CARTON, Votre [RASELIO] et ses accessoires » + bloc packshot vide**
Objectif : valeur perçue. Utile ? Oui, mais cassé : titre sans contenu. Verdict : SUPPRIMER la section ; le contenu vit dans l'image 8 et l'accordéon « Dans la boîte ».

**BLOC G. Section « 4 raisons » (désactivée)**
Verdict : SUPPRIMER définitivement du template.

**BLOC H. Vidéos avec CTA (désactivée, liens YouTube factices)**
Verdict : SUPPRIMER du template.

**BLOC I. « Ils ont adopté Raselio » (4 vidéos IA, badge « Offre limitée »)**
Objectif : preuve sociale. Utile ? Non en l'état. Verdict : SUPPRIMER. Visages générés et fausse urgence ; c'est ce qui déclenche « c'est du dropshipping » chez l'acheteur. À réintroduire uniquement avec de vraies vidéos clients ou une vraie démo produit.

**BLOC J. FAQ (17 questions)**
Objectif : objections. Utile ? Oui, trop long, doublons (utilisation ×2, garantie ×3, retours ×2). Verdict : MODIFIER, 7 questions (section 23).

**BLOC K. Section avis « Ce que disent nos clients, 4,7 basé sur 1 734 avis » (18 avis rédigés, drapeaux CA)**
Objectif : preuve. Utile ? Contre-productif. Verdict : REMPLACER par l'application d'avis avec avis réels (Judge.me ou Loox, gratuit au départ), demande automatique par Klaviyo 12 jours après livraison, photo optionnelle, coupon de 5 € sur la tête de rechange. Tant qu'il y a moins de 5 avis : section « Vos premières questions, nos réponses » à la place, pas de faux nombre.

**BLOC L. « Découvrez la gamme Raselio » (produits associés)**
Objectif : cross-sell. Utile ? Non, un seul produit actif. Verdict : SUPPRIMER jusqu'à l'existence d'accessoires.

**BLOC M. Section apps (Amose Bundle)**
Verdict : GARDER seulement si elle porte le futur sélecteur d'offre ; sinon SUPPRIMER.

## 20. Nouvel ordre complet de la fiche produit

1. Barre d'annonce (1 ligne).
2. Zone d'achat : galerie 8 médias · ligne confiance honnête · titre · 3 bullets · prix · sélecteur d'offre (P2) · bouton · réassurance · livraison · paiement · 3 accordéons.
3. **Section problème** « Cette zone mérite son propre outil » : trois vignettes S1, trois phrases courtes, une phrase de transition : « Ce n'est pas votre geste. C'est l'outil. »
4. **Comparatif** tondeuse à barbe vs Raselio (6 lignes) + bouton.
5. **Technologie** « Tête SafeCurve™ » : macro B3 + 4 blocs Feature → Bénéfice → Résultat (section 13 ci-dessous).
6. **Comment ça marche** : 3 étapes S2 (« 5 minutes, sous la douche »).
7. **Résultat** : image B7 pleine largeur avec la phrase « 5 minutes. Propre. Tranquille. » et une ligne : « La routine redevient une routine, pas une épreuve. »
8. **Avis réels** (application d'avis) ou, avant 5 avis, rien.
9. **Garantie** : trois cartes (30 jours satisfait ou remboursé · Garantie 2 ans · Colis neutre, expédié de France) + mention « Raselio est éditée par un entrepreneur français, SAV en français sous 24 h ».
10. **FAQ** 7 questions.
11. Bouton final « Essayer Raselio 30 jours · 34,99 € ».
12. Bouton sticky sur tout le défilement.

Page raccourcie d'environ 40 % en hauteur mobile par rapport à l'actuelle.

## 13. Produit → Bénéfice → Résultat (à appliquer partout)

| Feature | Bénéfice | Résultat pour lui |
|---|---|---|
| Tête arrondie + lames céramique | La lame glisse sur une peau fine et mobile au lieu de la pincer | Il ne retient plus son souffle à chaque passage |
| LED intégrée près de la lame | Il voit les plis et les angles qu'il devinait | Un seul passage au lieu de trois, aucun geste au jugé |
| Sabot 3 hauteurs | Il tond court sans raser à blanc | Pas de repousse qui pique ni de boutons trois jours après |
| 100 % étanche, rinçage sous l'eau | La routine entière se fait sous la douche | 5 minutes, aucune trace sur le lavabo, il le fait vraiment |
| Lame dédiée à cette zone | La lame de l'entrejambe ne repasse jamais sur le visage | Hygiène évidente, argument imparable face à la tondeuse à barbe |
| Sans fil, socle de charge, ~90 min | Toujours prête dans la salle de bain | Aucune excuse logistique |
| Colis neutre | Personne ne sait ce qu'il a commandé | Il commande sans hésiter |
| 30 jours satisfait ou remboursé, garantie 2 ans | Il essaie chez lui | Le doute « site chinois » tombe |

## 14. Wording des visuels et de la page : corrections

| Texte actuel | Problème | Texte final |
|---|---|---|
| « Cette zone, tu la rases en retenant ton souffle. » | Tutoiement, phrase d'accroche à la place des bénéfices | Supprimé sous le titre ; devient le titre de la vignette S1 : « Vous retenez votre souffle. » |
| « Lames céramique pensées pour les testicules, pas pour une barbe. » | Cru pour l'acheteur, mais l'idée est la bonne | « Une lame dédiée à cette zone. Jamais celle de votre visage. » |
| « Elle vit dans ta douche » | Familier, bouton sans lien | Supprimé (image 6 : « 100 % étanche · Rincée en 10 secondes ») |
| « Ta tondeuse à barbe n'est pas faite pour cette zone » | Tutoiement | « Votre tondeuse à barbe n'a rien à faire sous la ceinture » (même titre que l'advertorial : cohérence pub → page) |
| « Je prends Raselio — 39,90 € » | Prix faux | « Je passe à Raselio · 34,99 € » |
| « Les couilles, enfin tranquille » (avis) | Vulgaire, faux avis | Supprimé |
| « Plus de 17 000 hommes », « 1 734 avis », « 758 clients » | Invérifiables | Supprimés partout, y compris advertorial, page 7 raisons, annonces Meta |
| « Offre limitée » (badge vidéos) | Fausse urgence | Supprimé |
| « RASELIO Pro » | Nom incohérent avec « Raselio™ MS-810 » | « Raselio™ » partout, « MS-810 » dans les caractéristiques |
| « CINQ MINUTES, SOUS LA DOUCHE » | Bon | Conservé : « 5 minutes, sous la douche » |
| FAQ « J'ai peur de me couper à cet endroit » (réponse) | Excellente réponse, au tutoiement | Conservée au « vous » ; c'est la meilleure phrase de la page : « Vous ne tondez plus en espérant. Vous voyez, et vous contrôlez. » |

---

## 21. Objections manquantes ou mal traitées

| Objection | Où elle est aujourd'hui | Où elle doit être |
|---|---|---|
| « C'est un site de dropshipping, je ne recevrai rien » | Nulle part | Bloc garantie : éditeur français identifié, SAV en français, Colissimo suivi, délai réel 24-48 h + transit. Numéro de commande suivi (CWILL). |
| « Ça fait du bruit ? » | Un faux avis dit « un peu bruyante » | Caractéristiques : niveau sonore si connu, sinon rien. |
| « Combien de temps tient la lame, et je la remplace où ? » | Nulle part | Accordéon Caractéristiques + Pack Sérénité avec tête de rechange. |
| « Est-ce que ça coupe vraiment à zéro ? » | FAQ hauteur | FAQ : « Le sabot tond court ; sans sabot, la tête arrondie permet une finition au plus près. » |
| « Les hauteurs, c'est combien de millimètres ? » | Absent | Caractéristiques (à confirmer fournisseur). |
| « Et pour le reste du corps ? » | FAQ | Garder une ligne dans la FAQ. |
| « Pourquoi pas la Philips Bodygroom à 50 € ? » | Absent | Comparatif : Raselio est spécialisée zone intime (tête arrondie, LED, format court), Philips est un outil corps généraliste. Sans citer la marque sur la page. |

## 22. Preuves manquantes

- Avis clients réels (avec prénom, ville, date réelle).
- Photos ou vidéo de l'objet réel, pas seulement des rendus : une vraie photo « en main » et une vraie vidéo de rinçage lèvent le doute « rendu 3D ».
- Identité de la marque : « Conçue en France, expédiée de [ville] » si vrai, nom de l'entrepreneur dans les mentions légales déjà en ligne.
- Preuve de garantie : procédure de retour en 3 lignes, adresse e-mail support visible (raseliosupport@gmail.com ou mieux, une adresse @raselio.com).
- Spécifications chiffrées confirmées par le fournisseur.

Types de témoignages à collecter et mettre en avant, dans cet ordre :

1. **Objection peur** : « J'appréhendais de passer une lame là. La tête arrondie et la lumière changent tout, je me suis détendu dès la première fois. »
2. **Comparaison tondeuse à barbe** : « J'utilisais ma tondeuse à barbe : ça tirait. Là, rien à voir. »
3. **Résultat le lendemain** : « Pas de rougeur ni de démangeaison le jour d'après. »
4. **Routine** : « Sous la douche, 5 minutes, rincée, rangée. »
5. **Sérieux de la boutique** : « Reçue en 3 jours, colis neutre, tondeuse conforme. »

Les trois premiers vont sous la section technologie ; les deux derniers près de la garantie.

## 23. Optimisations de l'offre

- **Prix** : 34,99 € conservé (marge brute ~22 € avant pub). Ancrage honnête : « Prix de lancement 34,99 €, 49,90 € à partir du [date] », appliqué réellement.
- **Sélecteur d'offre** (P2, dépend du fournisseur) : Tondeuse seule 34,99 € · Pack Sérénité 44,99 € (tête céramique de rechange + trousse de rangement, « le plus choisi ») · Duo 59,99 € (« pour lui et pour son ado » ou pour deux salles de bain). Objectif : panier moyen 42 € au lieu de 35 €, ce qui change l'équation Meta.
- **Post-achat** : proposition de tête de rechange à -20 % sur la page de remerciement.
- **Livraison** : « offerte » déjà acquis ; ajouter la date estimée.
- **Raison d'agir maintenant, sans fausse urgence** : le prix de lancement daté, l'essai 30 jours (« vous ne décidez pas aujourd'hui, vous décidez dans 30 jours ») et l'expédition le jour même avant 14 h.

## 24. Optimisations de la preuve sociale

1. Installer une application d'avis, importer zéro avis fictif.
2. Flux Klaviyo : e-mail J+12 après livraison, relance J+20, incitation 5 € sur la tête de rechange.
3. Demander aux 8 premiers clients un avis par e-mail personnel signé Dylan, aujourd'hui.
4. Afficher la note réelle sous le titre dès 10 avis.
5. Ajouter une photo réelle du produit reçu (un client ou vous-même) dans la galerie ou les avis.
6. Retirer « 17 000 », « 1 734 », « 758 » des annonces Meta, de l'advertorial et de la page 7 raisons.

## 25. Optimisations de confiance

- Corriger la redirection `/products/cutlab-essentials-bundle` vers `/products/raselio-tondeuse-parties-intimes` (95 sessions perdues en 30 jours).
- Désactiver la publication de la locale `/en` ou la restreindre au marché hors France ; un Français qui arrive sur `/en/products/...` ne convertit pas.
- Vérifier la page desktop (591 sessions, 0 vente) : afficher la fiche sur un écran 1440 px et corriger tout ce qui casse (galerie, sticky, feuille `raselio-desktop.css`).
- Une seule identité : Raselio™ MS-810. Supprimer « Pro », « Cutlab » (SKU `CUTLAB-TRIM-SOLO` visible dans les e-mails de commande), « Ma boutique » (vendor du produit brouillon).
- Adresse support de marque et délai de réponse annoncé.
- Politique de retour lisible en 3 lignes dans l'accordéon.

---

## 26. Analyse Balls (balls.co)

Ce que Balls fait mieux, d'après la structure de leur fiche « BALLS Trimmer V3, The Archibald » et leurs pages d'aide (données confirmées : SackSafe™ guard certifié, 7 000 tr/min, lames céramique, LED, 3 hauteurs 3 / 4,5 / 6 mm, 100 % étanche, jusqu'à 120 min, USB-C, garantie « SackSafe » 30 jours, prix 69 $ / 69 £, bundles « Smooth AF » 67 $ et « Double Trouble » 125 $) :

| Mécanique Balls | Effet sur la décision | Adaptation Raselio |
|---|---|---|
| Sous le titre : 3 à 4 bénéfices courts avec icônes, mécanisme nommé en premier | On comprend en 3 secondes | Les 3 bullets, « Tête SafeCurve™ » |
| Note et nombre d'avis réels via une app, juste sous le titre | Confiance immédiate | Même place, avis réels uniquement |
| Sélecteur d'offre avec « most popular » et économie affichée | Valeur perçue, panier moyen | Pack Sérénité |
| Galerie : produit en main, sous la douche, sabot en gros plan, contenu de la boîte, schéma « how to », hommes en serviette souriants | Projection, démonstration | Ordre galerie section 10 |
| Garantie nommée (« SackSafe Guarantee ») répétée près du CTA | Risque perçu nul | « Garantie Sérénité 30 jours » comme libellé de la ligne de réassurance |
| Humour assumé et cohérent | Désamorce la gêne | Non copié : notre acheteur préfère la franchise sobre. Une seule touche d'humour max, dans la FAQ colis discret. |
| « How it works » en 3 étapes illustrées | Simplicité | Section étapes S2 |
| Comparatif rasoir / tondeuse classique / Balls | Objection | Comparatif 6 lignes |
| Peu de texte, beaucoup d'images légendées | Lecture mobile | Page raccourcie de 40 % |
| FAQ courte (6-8 questions) | Pas de fatigue | FAQ 7 questions |

Ce que Balls fait et qu'on ne copie pas : le ton potache, le prix élevé justifié par la marque, les produits dérivés (savon, huile) en bundle, la cible mixte homme/femme.

Note : le second site Balls identifié précédemment (variante régionale de la même marque) applique la même structure ; l'analyse ci-dessus vaut pour les deux. Je n'ai pas pu recharger les pages dans cette session (réseau bloqué), l'analyse repose sur les données de fiche produit et pages d'aide recoupées par recherche.

## 27. Analyse Amazon (Meridian, Manscaped Lawn Mower 5.0, Philips Bodygroom 5000, Balls Archibald)

Patterns incontournables des galeries les mieux notées :

1. Image 1 : produit seul sur fond uni, face avant, LED ou tête visible.
2. Image 2 : produit en main, échelle réelle, texture de grip.
3. Image 3 : macro lame avec 2-3 annotations (« lames céramique », « protection anti-coupure »).
4. Image 4 : carte des zones du corps avec icônes (aine, torse, aisselles, dos).
5. Image 5 : sous la douche + rinçage sous le robinet, mention étanche.
6. Image 6 : contenu de la boîte avec hauteurs de sabot en millimètres.
7. Image 7 : tableau comparatif (vs rasoir, vs modèle précédent ou vs concurrent).
8. Image 8 : homme en situation (serviette, salle de bain), rarement un visage souriant en gros plan.
9. Souvent une vidéo de démonstration sur matière proxy.

Textes sur image : 2 à 6 mots, un bénéfice par image, chiffres (mm, minutes, IPX). Titres longs avec mots-clés (« tondeuse intime homme », « zones sensibles », « étanche », « sans coupure »).

Objections récurrentes dans les avis de la catégorie : « on peut quand même se couper » (Manscaped précise que SkinSafe ne garantit pas l'absence de coupure : Raselio doit garder sa réponse honnête en FAQ), bruit, autonomie, lames qui s'émoussent, prix des recharges. Philips domine en France sur le rapport confiance/prix (BG5020, 3 sabots 3/5/7 mm, 60 min, environ 45-55 €) : Raselio doit se positionner comme l'outil spécialisé zone intime (tête arrondie, LED, format court), pas comme une tondeuse corps généraliste moins chère.

Retenu pour Raselio : images 1, 2, 3, 5, 6, 7, 8 et la vidéo démo. Non retenu : la carte des zones du corps (Raselio revendique la spécialisation, une carte « tout le corps » brouillerait le message ; une ligne FAQ suffit).

## 28. Benchmark Raselio vs concurrence

| Critère | Raselio | Balls Archibald | Meridian Original | Manscaped LM 5.0 | Philips BG5020 |
|---|---|---|---|---|---|
| Prix | 34,99 € | ~69 € | ~60-70 € | ~100-110 € | ~45-55 € |
| Mécanisme nommé | À créer (SafeCurve™) | SackSafe™ | Lames céramique | SkinSafe™ | Triple protection |
| Tête arrondie / garde | Oui | Oui | Oui | Oui | Oui |
| LED | Oui | Oui | Non | Oui (5.0) | Non |
| Étanche | Oui | Oui | IPX4 | Oui | 100 % |
| Autonomie | ~90 min (à confirmer) | 120 min | 90 min | 90 min | 60 min |
| Hauteurs | 3 (mm à confirmer) | 3 (3/4,5/6) | 2 | 2 + tête grille | 3 (3/5/7) |
| Avis affichés | Faux (à retirer) | Réels, milliers | Réels, milliers | Réels, dizaines de milliers | Réels, milliers |
| Garantie | 2 ans + 30 j | 30 j | 30 j | 1 an | 2 ans |
| Offre / bundle | Aucune | 3 bundles | Kits | Kits | Aucun |
| Humain dans la galerie | Non | Oui | Oui | Oui | Oui |

Position gagnante : « la spécialiste zone intime au prix d'une tondeuse généraliste, avec la garantie la plus longue du marché ». C'est vrai, prouvable et différenciant.

---

## 29. Liste complète des priorités CRO

### PRIORITÉ 1, CRITIQUE (cette semaine)

| Modification | Raison | Impact attendu | Effort | KPI |
|---|---|---|---|---|
| Rediriger tous les liens payants et le lien bio vers la fiche ou l'advertorial ; réparer la redirection `cutlab-essentials-bundle` | 46 % du trafic n'atteint pas la fiche, 95 sessions en 404 | +30 à +50 % de sessions sur la fiche à budget égal | 1 h | % sessions atterrissant sur la fiche |
| Retirer toute preuve sociale inventée (chiffres, avis rédigés, carrousel, badge « Offre limitée », drapeaux CA) sur fiche, advertorial, 7 raisons, annonces | Crédibilité et conformité | Moins de rebond des 45+, zéro risque de sanction | 2 h | Taux d'ajout panier |
| Passer toute la fiche au « vous », supprimer les mots crus, unifier « Raselio™ MS-810 » | Acheteur réel 45-65 ans | Lecture fluide, cohérence pub → page | 2 h | Temps sur page, ATC |
| Remplacer le paragraphe sous le titre par les 3 bullets | Compréhension en 3 secondes | ATC | 20 min | ATC |
| Nettoyer sous le bouton (supprimer carrousel, vidéos stories, cross-sells, accordéon description ; réorganiser réassurance, livraison, paiement, 3 accordéons) | CTA qui respire | ATC | 1 h | ATC, checkout |
| Corriger le prix du comparatif (34,99 €), supprimer le bloc « Dans le carton » vide, les boutons « Découvrir » morts, le slider avant/après | Bugs et fausses notes | Confiance | 1 h | Rebond |
| Ancrage prix honnête (prix de lancement daté, retirer -53 %) | Conformité et crédibilité | Valeur perçue | 30 min | CVR |
| Vérifier la fiche desktop et la locale `/en` | 591 sessions desktop à 0 vente, ~105 sessions `/en` à 0 panier | CVR desktop > 0 | 1 h | CVR desktop |
| Nouvelle image 1 humaine (brief B1) | Projection immédiate | ATC | 1 jour | ATC |

### PRIORITÉ 2, IMPORTANT (semaines 2-3)

| Modification | Raison | Impact attendu | Effort | KPI |
|---|---|---|---|---|
| Galerie complète 8 médias (briefs B2 à B8) | Séquence de persuasion visuelle | ATC +30 % | 2-3 jours | ATC, engagement galerie |
| Sections réordonnées : problème → comparatif → technologie → étapes → résultat → garantie → FAQ 7 | Progression « c'est quoi » → « je commande » | CVR | 1 jour | Profondeur de scroll, CVR |
| Application d'avis + flux Klaviyo + e-mail aux 8 premiers clients | Preuve réelle | CVR après 10 avis | 2 h + attente | Nb avis, CVR |
| Accordéon Caractéristiques avec spécifications confirmées | Objections rationnelles des 45+ | CVR | 1 h + fournisseur | CVR |
| Vidéo démo 12 s en galerie | Média le plus performant de la catégorie | ATC | 1 jour | ATC |
| Exclure les femmes des audiences Meta, concentrer 35-65+ hommes | 18 % de dépense à CTR ×0,5 | CPA -15 % | 15 min | CPA |
| Pack Sérénité et Duo (si fournisseur) | Panier moyen | AOV +20 % | 1 semaine | AOV, marge par commande |

### PRIORITÉ 3, TESTS CRO (après stabilisation, une variable à la fois, minimum 7 jours ou 500 sessions fiche)

| Test | Hypothèse | KPI |
|---|---|---|
| Image 1 : homme en main vs packshot | L'humain augmente l'ATC de 15 % | ATC |
| Bullet 1 : « Tête arrondie et lames céramique » vs « Conçue pour ne pas pincer la peau » | Le mécanisme rassure plus que la promesse | ATC |
| Ancrage : 34,99 € seul vs 34,99 € / 49,90 € daté | Le prix barré crédible augmente la CVR sans baisser la confiance | CVR |
| Sélecteur d'offre 3 cartes vs offre unique | Le pack augmente l'AOV sans baisser la CVR | AOV × CVR |
| Page courte (sections 2-5-9-10) vs page complète | Le 45+ lit ; la page complète convertit mieux | CVR |
| Libellé bouton : « Ajouter au panier » vs « Essayer 30 jours » | Le risque zéro dans le bouton augmente le clic | ATC, checkout |
| Advertorial vs fiche comme page d'atterrissage, à audience égale | L'advertorial pré-vend mieux le 45+ | CVR par landing |

## 30. Roadmap de tests (8 semaines)

- Semaine 1 : P1 en production, mesure de référence (ATC, CVR mobile/desktop, % sessions sur la fiche).
- Semaines 2-3 : galerie et sections P2, lancement collecte d'avis, audiences Meta corrigées.
- Semaine 4 : test image 1.
- Semaine 5 : test bullets.
- Semaine 6 : test ancrage prix.
- Semaine 7 : sélecteur d'offre (si packs disponibles).
- Semaine 8 : advertorial vs fiche ; décision sur la page d'atterrissage par défaut.

Le plan Shopify Basic n'a pas d'A/B natif : tests séquentiels, même budget média, même audience, une seule variable. Avec 300-500 sessions par semaine sur la fiche, seuls des effets supérieurs à 30 % relatifs seront lisibles ; c'est pourquoi les changements structurels P1 et P2 passent avant les tests fins.

Objectif chiffré : passer de 0,9 % (fiche) à 2,5 % de conversion sur la fiche en 8 semaines, avec 90 % du trafic payant qui y arrive, et un panier moyen à 40 €. À 30 € de dépense par jour et un CPC de 0,60 €, cela donne environ 50 sessions par jour, 1,25 commande par jour, CPA de 24 €, marge nette positive par commande.

---

## 31. Briefs et prompts Higgsfield

Règles communes à tous les visuels :

- Format 4:5 (1080 × 1350) pour la galerie et les sections ; 1:1 accepté pour B2 et B8.
- DA Raselio : crème `#F7F3EC`, encre `#211C17`, terracotta `#C15D2F`, sable `#EFE6D8`. Titres Fraunces (serif), textes Inter. Textes sur image en Inter, majuscules espacées pour les labels, terracotta réservé à un seul élément par image.
- Personnes : hommes de 42 à 55 ans pour B1 et B7 (poivre et sel léger, physique normal, entretenu), 30-40 ans acceptable pour B6. Peau naturelle avec texture, pas de peau lissée, pas de muscles exagérés, pas de rendu plastique. Jamais de nudité, jamais de main sur la zone, serviette ou boxer opaque toujours présent.
- Salle de bain réaliste française : carrelage mat, bois clair ou terrazzo, miroir simple, lumière de fenêtre le matin. Pas de spa hollywoodien, pas de néons.
- Réalisme photographique, grain léger, profondeur de champ crédible, aucun rendu IA évident (doigts corrects, reflets cohérents, texte net).
- Fidélité produit : coller le bloc « FIDÉLITÉ PRODUIT » du document 9 ads statiques à la fin de chaque prompt, avec la photo de référence en image d'entrée : corps vertical noir mat d'environ 15 cm, silhouette galbée, bande de grip texturée en losanges sur la face avant, bouton power circulaire avec anneau lumineux vert, petite LED blanche sous la tête, tête amovible arrondie à dents métalliques argentées, finition mate. Aucun logo sur le produit.
- Les prompts ci-dessous sont en anglais (meilleure obéissance des modèles image), les textes à afficher sont en français entre guillemets et doivent être reproduits à la lettre. Pour les images avec texte, générer d'abord sans texte puis ajouter le texte en post-production si le modèle déforme les caractères.

### B1. Hero humain « en main » (galerie, position 1)

- Objectif CRO : comprendre en 1 seconde « une tondeuse intime, pour un homme comme moi », déclencher la projection.
- Emplacement : image 1 de la galerie, aussi visuel principal des annonces.
- Scène : homme de 48 ans, torse nu, serviette gris anthracite nouée à la taille, debout devant la vasque, tient Raselio verticalement à hauteur de poitrine, LED allumée, comme s'il venait de la prendre sur son socle.
- Expression : calme, regard vers le produit ou légèrement hors champ, pas de sourire forcé.
- Posture : épaules détendues, coude près du corps, poignet naturel.
- Environnement : salle de bain claire, carrelage blanc mat, plan en bois clair, miroir flou en arrière-plan, buée légère sur un coin du miroir.
- Caméra : 50 mm, hauteur poitrine, légère contre-plongée de 5°, cadrage du menton à la ceinture (visage coupé au-dessus de la bouche ou visible de trois quarts : privilégier le visage coupé pour l'universalité).
- Éclairage : fenêtre latérale gauche, lumière du matin, ombres douces.
- Position de Raselio : centre-droit, occupe 35 % de la hauteur, tête vers le haut, LED et anneau vert visibles.
- Texte : aucun.
- Éléments graphiques : aucun.
- À éviter : gel dans les cheveux façon pub, dents blanches, tatouages, salle de bain de luxe, mains supplémentaires, produit flou.

Prompt :

```
Editorial lifestyle photograph, 4:5 vertical. A 48-year-old French man, salt-and-pepper short hair, normal fit build, natural skin texture, standing at a bathroom sink, bare torso, charcoal grey towel tied at the waist. He holds a matte black intimate trimmer upright at chest height, its small white LED under the head switched on and a thin green ring around the power button glowing, as if just lifted from its charging dock. Calm, relaxed expression, eyes looking down at the trimmer. Framing from chin to waistband, face partly cropped above the mouth. Real French bathroom: matte white tiles, light oak counter, simple mirror softly out of focus, faint steam on the mirror corner. Soft morning window light from the left, gentle shadows, shallow depth of field, 50mm lens, slight film grain, photorealistic, no retouching look. No text, no logo. [FIDÉLITÉ PRODUIT block]
```

### B2. Packshot sur socle (galerie, position 2)

- Objectif : qualité perçue, lecture du design.
- Scène : Raselio debout sur son socle noir, fond dégradé crème `#F7F3EC` vers sable `#EFE6D8`, ombre douce courte.
- Caméra : trois quarts face, hauteur du produit, 85 mm.
- Éclairage : studio deux sources, rasante gauche pour la texture du grip, liseré froid à droite.
- Position : centré, 70 % de la hauteur.
- Texte : aucun.
- À éviter : reflets miroir, fond noir (réservé aux annonces), logos.

Prompt :

```
Premium product packshot, 4:5. A matte black intimate trimmer standing upright in its cylindrical black charging dock, three-quarter front view at product height, 85mm lens. Background: smooth gradient from warm cream #F7F3EC at top to soft sand #EFE6D8 at bottom, seamless studio sweep, short soft contact shadow. Two-light studio setup: raking key light from the left revealing the diamond-textured grip, cool thin rim light on the right edge. White LED under the head and green power ring switched on. Ultra sharp on the metal comb teeth. No text, no logo, no reflections. [FIDÉLITÉ PRODUIT block]
```

### B3. Macro technologie « Tête SafeCurve™ » (galerie, position 3, aussi section technologie)

- Objectif : donner une raison mécanique de ne pas se couper ; nommer la différence.
- Scène : macro de la tête, sabot clipsé, vue de trois quarts, fond encre `#211C17` dégradé.
- Annotations : trois fines lignes de repère blanches vers la tête arrondie, les dents céramique, le bord du sabot.
- Texte : en haut « TÊTE SAFECURVE™ » (Inter bold, majuscules espacées, crème) ; sous chaque repère « Tête arrondie », « Lames céramique », « Sabot 3 hauteurs » (Inter medium, crème) ; en bas, petit, terracotta : « Glisse sur la peau, ne la pince pas. »
- Hiérarchie : nom > trois labels > phrase bénéfice.
- Caméra : macro 100 mm, netteté maximale sur les dents.
- Éclairage : rasant froid pour la céramique, chaud doux sur le corps.
- À éviter : peau dans le cadre, rendu 3D brillant, plus de trois annotations.

Prompt :

```
Technical macro product photograph, 4:5. Extreme close-up of the rounded head of a matte black intimate trimmer with its guard comb clipped on, three-quarter angle, occupying the lower two thirds of the frame. Background deep ink #211C17 with a subtle radial gradient. Lighting: cool raking light skimming the silver metal comb teeth and ceramic edge, warm soft fill on the matte body, the small white LED under the head glowing. 100mm macro lens, razor sharp on the teeth, shallow depth of field elsewhere, photorealistic. Three thin white annotation lines with small dots pointing to the rounded head edge, the blade teeth and the guard comb edge, minimalist technical style. Leave clean empty space at the top for a title. No text rendered by the model. [FIDÉLITÉ PRODUIT block]
```

Texte ajouté en post-production : « TÊTE SAFECURVE™ » / « Tête arrondie » / « Lames céramique » / « Sabot 3 hauteurs » / « Glisse sur la peau, ne la pince pas. »

### B4. Démo LED « sans / avec » (galerie, position 4)

- Objectif : prouver la fonction LED sans montrer d'anatomie.
- Scène : image coupée horizontalement en deux. En haut : main masculine tenant une tondeuse à barbe générique au-dessus d'un pli de serviette anthracite dans la pénombre, on distingue mal. En bas : même cadrage, main tenant Raselio, LED projetant un cône net sur le pli de serviette, tout est lisible.
- Texte : « SANS LED » (haut gauche, gris), « AVEC LED » (bas gauche, crème), bandeau central : « Vous voyez ce que vous tondez. »
- Caméra : plongée 30°, 50 mm.
- Éclairage : haut quasi noir bleuté, bas éclairé uniquement par la LED.
- À éviter : peau, boxer, sous-entendu ; la serviette est le proxy.

Prompt :

```
Split-frame demonstration photograph, 4:5, two horizontal bands separated by a thin cream line. TOP BAND: dim bluish bathroom light at night, a man's hand holding a generic flat-headed beard trimmer above a fold of a charcoal towel; details are barely visible, everything murky. BOTTOM BAND: identical framing and hand position, now holding a matte black intimate trimmer whose small white LED under the head casts a clean bright cone of light onto the towel fold, every fibre visible and sharp. 30-degree top-down angle, 50mm lens, photorealistic, realistic hand anatomy, no skin other than the hand and forearm. Leave the centre line area clear for a caption. No text rendered by the model. [FIDÉLITÉ PRODUIT block]
```

Texte en post-production : « SANS LED » / « AVEC LED » / « Vous voyez ce que vous tondez. »

### B5. Comparatif illustré tondeuse à barbe vs Raselio (galerie, position 5)

- Objectif : détruire l'objection « ma tondeuse à barbe suffit » sans image choquante.
- Style : illustration éditoriale vectorielle épurée, aplats, cohérente avec la DA (encre, crème, terracotta). Reprend le concept AD 1.1 du document 9 ads, adapté à la fiche.
- Composition : split vertical. Gauche fond sable : coupe schématique d'une tondeuse à barbe, tête plate, lame droite, sur une ligne de peau beige ondulée qui se plisse et se pince entre les dents, point terracotta au pincement. Droite fond crème : Raselio, tête arrondie, même ligne de peau lisse, halo LED.
- Texte : « TONDEUSE À BARBE » / « RASELIO » sous chaque moitié ; en haut : « Lame droite qui pince. Tête ronde qui glisse. »
- À éviter : corps identifiable, réalisme photo, rouge sang.

Prompt :

```
Clean editorial vector illustration, 4:5, flat colours, no photorealism, no human body. Vertical split by a thin ink line. LEFT half, sand background #EFE6D8: schematic cross-section of a generic beard trimmer with a flat head and straight blade pressed onto a soft wavy beige skin line; the skin visibly folds and pinches between the teeth, one small terracotta #C15D2F dot marks the pinch point; cold, tense mood. RIGHT half, cream background #F7F3EC: schematic of a matte black intimate trimmer with a rounded head gliding over the same beige skin line which stays smooth and relaxed, a soft white halo suggesting an LED under the head; calm mood. Identical drawing style on both sides, ink #211C17 outlines, generous margins, space at the top for a headline and under each half for a label. No text rendered by the model.
```

Texte en post-production : « Lame droite qui pince. Tête ronde qui glisse. » / « TONDEUSE À BARBE » / « RASELIO »

### B6. Sous la douche + rinçage (galerie, position 6)

- Objectif : simplicité, routine, étanchéité prouvée par le geste.
- Scène : deux images en une (split vertical 60/40) ou une seule : homme de 35-45 ans sous la douche, cadré des épaules au nombril, eau qui coule, tient Raselio à hauteur de torse ; encart en bas à droite : main rinçant la tête sous le jet, poils suggérés par des gouttes seulement.
- Texte : « 100 % ÉTANCHE » (haut gauche, crème sur bandeau encre), « Rincée en 10 secondes » (sous l'encart).
- Caméra : 35 mm, hauteur poitrine, gouttes nettes au premier plan.
- Éclairage : lumière de douche naturelle, vapeur légère.
- À éviter : cadrage sous le nombril, main vers la zone, salle de bain de luxe.

Prompt :

```
Photorealistic lifestyle photograph, 4:5. A 40-year-old man in a real, simple French shower with matte grey tiles, framed from shoulders to navel, water running over his shoulders, light steam. He holds a matte black intimate trimmer at chest height under the water, LED under the head glowing, showing it is waterproof. Natural skin with texture, relaxed posture, face out of frame. In the lower right third, a clean inset panel: close-up of a hand rinsing the rounded trimmer head under a running shower jet, water droplets sharp in the foreground. 35mm lens, natural shower light, slight grain, no retouching look. Leave the upper left clear for a label. No text rendered by the model. [FIDÉLITÉ PRODUIT block]
```

Texte en post-production : « 100 % ÉTANCHE » / « Rincée en 10 secondes »

### B7. Résultat « 5 minutes. Propre. Tranquille. » (galerie, position 7, aussi section résultat)

- Objectif : vendre l'état final : propre, entretenu, serein. Projection émotionnelle sans montrer de résultat corporel.
- Scène : homme de 50 ans, cheveux courts poivre et sel, serviette blanche sur les épaules, boxer noir opaque, assis sur le rebord de la baignoire ou debout face au miroir, il passe une main dans ses cheveux mouillés, léger sourire retenu. Raselio posée sur son socle sur la vasque au second plan, LED éteinte.
- Expression : satisfaction tranquille, pas d'euphorie.
- Caméra : 50 mm, hauteur des yeux, cadrage buste.
- Éclairage : matin, fenêtre, chaud.
- Texte : bas de l'image, Fraunces italic crème sur léger dégradé encre : « 5 minutes. Propre. Tranquille. »
- À éviter : regard caméra séducteur, muscles saillants, main vers le bas du corps.

Prompt :

```
Editorial lifestyle photograph, 4:5. A 50-year-old French man with short salt-and-pepper hair, normal build, natural skin texture, white towel over his shoulders, opaque black boxer briefs, standing in front of a simple bathroom mirror after a shower, running one hand through his damp hair, a quiet, contained smile, eyes toward the mirror. In the background on the light oak counter, a matte black intimate trimmer resting upright in its black charging dock, slightly out of focus. Warm morning window light, 50mm lens, bust framing from mid-thigh up, photorealistic, slight grain, no glamour retouching. Leave the bottom fifth calm for a caption. No text rendered by the model. [FIDÉLITÉ PRODUIT block]
```

Texte en post-production : « 5 minutes. Propre. Tranquille. »

### B8. Dans la boîte + garantie (galerie, position 8)

- Objectif : valeur perçue et risque zéro dans une seule image.
- Scène : flat-lay sur fond sable, vue du dessus : boîte neutre brune ouverte, tondeuse, socle, sabot, câble USB, brosse, flacon d'huile alignés avec 2 cm d'écart, étiquette discrète sur la boîte sans mention du produit.
- Texte : haut « TOUT EST DANS LA BOÎTE » ; bas, sceau circulaire terracotta trait fin : « 30 JOURS » au centre, « SATISFAIT OU REMBOURSÉ » dessous ; ligne : « Garantie 2 ans · Colis neutre ».
- Caméra : 90° plongée, 50 mm.
- Éclairage : lumière douce diffuse, ombres courtes.
- À éviter : accessoires inventés (tête rasoir, coupe-ongles : ils appartiennent à l'ancien kit), logos.

Prompt :

```
Top-down flat-lay product photograph, 4:5, on a warm sand #EFE6D8 seamless background. Neatly arranged with even 2 cm spacing: an opened plain kraft shipping box with no product markings, a matte black intimate trimmer, its cylindrical black charging dock, a black guard comb, a short black USB cable, a small cleaning brush, a small bottle of maintenance oil. Soft diffused daylight, short natural shadows, 50mm lens at 90 degrees, photorealistic, sharp. Leave the top 15% and bottom 20% free for typography. No text rendered by the model. [FIDÉLITÉ PRODUIT block]
```

Texte en post-production : « TOUT EST DANS LA BOÎTE » / sceau « 30 JOURS · SATISFAIT OU REMBOURSÉ » / « Garantie 2 ans · Colis neutre »

### S1. Trois vignettes de la section problème

- Objectif : reconnaissance immédiate des trois douleurs, sans anatomie ni dégoût.
- Format : trois carrés 1:1 affichés en ligne sur desktop, empilés sur mobile.
- Vignette 1 « Vous retenez votre souffle. » : gros plan d'une main masculine crispée sur une tondeuse à barbe générique, jointures serrées, fond salle de bain flou, lumière froide.
- Vignette 2 « Vous ne voyez pas ce que vous faites. » : homme de dos face au miroir, tête baissée, la zone hors champ, ombre portée sur le bas du cadre.
- Vignette 3 « Ça pique trois jours après. » : main qui se gratte discrètement à travers un jean, assis dans un canapé, expression agacée hors champ.
- À éviter : rougeurs en gros plan, boxer, nudité.

Prompt (vignette 1, adapter pour 2 et 3) :

```
Photorealistic close-up, 1:1. A man's hand gripping a generic black beard trimmer too tightly, knuckles tense, wrist slightly stiff, held in front of a blurred cool-lit bathroom background at night. Shallow depth of field, 85mm lens, slight grain, muted cold tones, no face, no body below the chest. Leave the bottom 25% calm for a caption. No text rendered by the model.
```

### S2. Étapes 1-2-3

Les fichiers `raselio-etape1-sabot.png`, `raselio-etape2-passage.png`, `raselio-etape3-rincage.png` (2048 × 2048, uploadés le 3 septembre) remplacent les visuels actuels de la section « Comment ça marche », dont la photo WhatsApp de l'étape 2. Vérifier la fidélité produit et l'absence de tutoiement dans le texte incrusté, puis les recadrer en 4:5 si nécessaire. Textes : « 1. Clipsez le sabot » / « 2. Passez sans appuyer » / « 3. Rincez, c'est fini ».

### V1 (P2). Vidéo démo 12 secondes

- Objectif : preuve de coupe nette sans accroc, format qui vend le plus dans la catégorie.
- Scène : main tenant Raselio, sabot clipsé, passe lentement sur une mousse à raser étalée sur une surface courbe (ballon de baudruche beige ou galet), la mousse est retirée nette, la surface reste intacte ; plan 2 : rinçage sous l'eau ; plan 3 : produit reposé sur le socle.
- Texte à l'écran : « Passez sans appuyer » puis « Rincez » puis « 5 minutes, sous la douche ».
- Format : 4:5, muet, boucle, lecture automatique.

---

## 32. Exécution dans Shopify (ordre des opérations)

1. Thème : dupliquer le thème actuel avant toute modification.
2. `templates/product.json` : désactiver puis supprimer les blocs `custom_liquid_review_stars`, `custom_liquid_reviews_carousel`, `video_story_4GcBxd`, `collapsible_tab_description`, `lumin_cross_sells_PdKwRH`, `order_timeline_9VkjVk` ; supprimer les sections `lumin_grids_EAtzYR`, `custom_liquid_slider_ba`, `custom_liquid_4raisons`, `rich_text_included`, `custom_liquid_packshot`, `videoctaa_3nVa3W`, `shoppable_videos_npAUN8`, `lumin_review_kL78Mn`, `related-products`.
3. Remplacer `custom_liquid_benefits` par les 3 bullets ; ajouter un bloc custom liquid « réassurance + livraison » sous `buy_buttons` ; passer `mobile_thumbnails` à `dots`.
4. Réordonner : `main` → nouvelle section problème (multicolumn 3 colonnes) → `comparison_table_pAMhAV` (6 lignes, bouton corrigé) → nouvelle section technologie (image + texte) → `lumin_hero_3etapes` (images étape 1-3) → section résultat (image bannière) → application d'avis → garantie (multicolumn 3 cartes) → `collapsible_content_kdacf9` (7 questions).
5. Produit : prix comparé 75 € → 49,90 € daté ou vide ; SKU `CUTLAB-TRIM-SOLO` → `RASELIO-MS810` ; vendor du brouillon « Ma boutique » → « Raselio » ou suppression du brouillon.
6. Navigation : redirection `/products/cutlab-essentials-bundle` → `/products/raselio-tondeuse-parties-intimes` ; lien bio et URL des annonces → fiche ou advertorial avec UTM.
7. Langues : dépublier la locale anglaise tant que le marché est la France.
8. Contenu : mettre à jour l'advertorial et la page 7 raisons (retrait des chiffres inventés, « vous », prix 34,99 €, garantie).
9. Applications : installer l'app d'avis, brancher le flux Klaviyo post-livraison.
10. Mesure : noter la référence (sessions fiche, ATC, CVR mobile et desktop, AOV) le jour de la mise en ligne, puis relever chaque lundi.
