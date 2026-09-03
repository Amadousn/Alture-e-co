# Raselio — Analyse de compte & correction de l'ICP
_Données extraites le 2026-09-03. Sources : Meta Ads (compte `1573950771030463` « raselio »), Shopify `raselio.com`, Meta Ad Library._

---

## 1. Périmètre réel

Le compte Meta mélange **plusieurs produits** (Raselio, Trael, une gamme « LP- / V3- / Spécial Aînés » qui n'est pas la tondeuse).
Toute lecture démographique au niveau *compte* est donc contaminée. L'analyse ci-dessous est **scopée sur les 4 campagnes Raselio uniquement**.

| Campagne | Statut | Dépense | Impr. | Clics | CTR | CPC | CPM | Achats | ROAS |
|---|---|---|---|---|---|---|---|---|---|
| FR / STATIQUE / CBO 30 / V2 | ACTIVE | 430,85 € | 24 030 | 728 | 3,03 % | 0,59 € | 17,93 € | 5 | 0,41 |
| FR / STATIQUE POSTIT / V3 | PAUSED | 48,26 € | 2 663 | 66 | 2,48 % | 0,73 € | 18,12 € | 0 | — |
| FR / STATIQUE POSTIT / V4 | PAUSED | 15,53 € | 809 | 17 | 2,10 % | 0,91 € | 19,20 € | 0 | — |
| RAZELIO / TEST CREATIVES / FR+CA | PAUSED | 56,09 € | 8 770 | 132 | 1,51 % | 0,42 € | 6,40 € | 0 | — |
| **Total Raselio** | | **550,73 €** | **36 272** | **943** | | | | **5** | **≈0,41** |

> Volume faible. Tout ce qui suit est un **faisceau d'indices directionnel**, pas une vérité statistique. Aucune créative n'a plus de 1 achat.

---

## 2. Le vrai goulot d'étranglement n'est PAS la créative

### Funnel Meta (campagne V2)
```
24 030 impressions
  → 728 clics          CTR 3,03 %   ✅ très au-dessus du benchmark DTC (~1,2 %)
  → 336 vues de page   −54 %        🔴 ANOMALIE MAJEURE
  →  17 ajouts panier  5 % des LPV  🟠 faible (attendu 8-12 %)
  →   3 checkouts
  →   5 achats         CPA 86,17 €  🔴 pour un produit à 34,99 €
```

### Funnel Shopify (365 j)
| Métrique | Valeur |
|---|---|
| Sessions | 2 064 |
| Sessions avec ajout panier | 33 (1,6 %) |
| Sessions arrivées au checkout | 14 |
| Sessions ayant payé | 3 |
| **Taux de conversion** | **0,145 %** |
| Commandes (365 j) | 9 |
| Panier moyen | 34,15 € |
| CA total | 319,82 € |

### Diagnostic
1. **Le CTR est excellent (3,03 %).** Les créatives arrêtent déjà le scroll. Ce n'est pas le problème.
2. **54 % des clics n'arrivent jamais sur la page.** Vitesse de chargement mobile, redirection, ou tracking. C'est le premier chantier, et il ne se règle pas avec des visuels.
3. **Le site convertit à 0,145 %, soit ~10× sous la norme** (1,5-2,5 % attendu en DTC).
4. **Rentabilité :** à 34,99 € de panier, il faut un CPA sous ~20 € pour être à l'équilibre. On est à 86 €. **Il faut diviser le CPA par 4,3** — impossible par la créative seule.

**Conséquence stratégique retenue :** les 30 nouvelles créatives ne doivent pas seulement faire cliquer. Elles doivent **pré-vendre et pré-qualifier** — prix, garantie, discrétion et mécanisme produit affichés *sur l'image*, pour que le clic arrive déjà convaincu et que la page ait moins de travail à faire.

---

## 3. Correction de l'ICP — l'hypothèse « 30-40 ans » est fausse

Vérification demandée. Résultat, sur la campagne V2 (la seule avec des achats), hommes :

| Tranche | Dépense | Impr. | CTR | ATC | Achats | ROAS | Lecture |
|---|---|---|---|---|---|---|---|
| 18-24 | 9,15 € | 803 | 2,12 % | 0 | 0 | — | négligeable |
| 25-34 | 25,84 € | 1 470 | 1,36 % | 0 | **0** | — | ❌ ne convertit pas |
| 35-44 | 31,88 € | 2 034 | 1,38 % | 0 | **0** | — | ❌ ne convertit pas |
| 45-54 | 70,05 € | 4 079 | 1,52 % | 2 | 1 | 0,50 | 🟠 tiède |
| **55-64** | **150,86 €** | **7 226** | **3,40 %** | **11** | **3** | **0,70** | ✅ **poche de conversion** |
| 65+ | 121,27 € | 7 262 | 4,12 % | 4 | 1 | 0,29 | ⚠️ piège à clics |

**Femmes :** 14,6 € dépensés, 0 achat — mais CTR **6,29 %** (45-54) et **10,11 %** (65+). Intérêt réel, jamais converti.

### Réponses aux 10 questions posées

1. **Qui clique ?** Les 65+ (CTR 4,12 %) et les 55-64 (3,40 %). Les 25-44 cliquent peu (~1,4 %).
2. **Qui ajoute au panier ?** 55-64 très majoritairement (11 ATC sur 17).
3. **Qui achète ?** 4 achats sur 5 viennent des **55 ans et plus**. Zéro achat chez les 25-44.
4. **Meilleure tranche ?** **55-64 ans** — meilleur ROAS (0,70), meilleur ratio ATC, volume suffisant.
5. **Angles qui attirent les clics ?** Émotion / gêne sociale, humour post-it, et tout ce qui est servi aux 65+.
6. **Angles qui génèrent les achats ?** **IMPECCABLE** (annotation corps + preuve sociale) : 3 des 5 achats.
7. **Meilleurs visuels ?** IMPECCABLE CROP TAILLE (ROAS 5,0), IMPECCABLE SERVIETTE (ROAS 3,59), STATIQUE S9 (1,30), IMPECCABLE POSTIT SMILEY (1,28), STATIQUE S2 (1,07).
8. **Hooks qui fonctionnent ?** « Soyez impeccable partout. » + accroche de preuve « Approuvée par plus de 35 000 hommes ». Les hooks purement émotionnels génèrent des clics mais **zéro achat** (EMOTION 1-5 : 5 ATC, 2 IC, 0 achat).
9. **Objections bloquantes ?** (déduites du funnel LPV→ATC à 5 % et du vocabulaire marché)
   - peur de se couper sur cette zone
   - irritation / poils incarnés à la repousse
   - « ma tondeuse à barbe suffit »
   - prix / crédibilité d'une marque inconnue à 34,99 €
   - gêne à la commande et à la livraison
10. **Persona le plus rentable aujourd'hui ?** ⬇️

### Buyer persona corrigé

> **« Michel », 55-64 ans, France, mobile, Facebook Feed.**
> En couple. Utilise encore sa tondeuse à barbe ou un rasoir jetable sous la ceinture. S'est déjà coupé au moins une fois. N'en parle à personne.
> Sa motivation n'est **pas** esthétique ni « gym-bro » : c'est **confort, hygiène, sécurité et dignité**.
> Il achète du fiable, avec garantie, et redoute le colis low-cost. Il a besoin d'être rassuré avant de cliquer, pas séduit.

**Persona secondaire à activer :** la conjointe 45-64 ans (CTR 6-10 %), angle cadeau / « elle l'achète pour lui ». Jamais testé sérieusement.

**Décisions de ciblage recommandées :**
- Concentrer sur **hommes 45-65 FR**.
- **Exclure ou plafonner les 65+** : ils consomment 121 € de budget pour 1 achat et un ROAS de 0,29.
- **Ne plus servir les 25-44** tant qu'un angle spécifique n'a pas été validé (57 € dépensés, 0 achat).

---

## 4. Ce qui marche / ce qui ne marche pas, par créative

**Ont généré un achat**
| Créative | Dépense | CTR | ROAS |
|---|---|---|---|
| IMPECCABLE / CROP TAILLE | 6,99 € | 2,85 % | 5,01 |
| IMPECCABLE / SERVIETTE | 9,74 € | 2,52 % | 3,59 |
| STATIQUE S9 / V1 | 26,98 € | 2,92 % | 1,30 |
| IMPECCABLE / POSTIT SMILEY | 27,40 € | 2,60 % | 1,28 |
| STATIQUE S2 / V1 | 32,74 € | 3,69 % | 1,07 |

**Fort CTR, zéro achat** — à ne pas confondre avec un winner
| Créative | Impr. | CTR | Achats |
|---|---|---|---|
| STATIQUE S5 / V1 | 1 208 | 4,97 % | 0 |
| STATIQUE S4 / V1 | 986 | 4,67 % | 0 |
| EMOTION 1 « Elle remarquera tout » | 1 424 | 3,65 % | 0 |
| EMOTION 3 « Barbe soignée et tes boules » | 867 | 3,58 % | 0 |

**À abandonner**
| Créative | CTR | CPC |
|---|---|---|
| POSTIT / OOH | 1,80 % | 1,44 € |
| ARRET DE BUS | — | 0,83 € |
| CREATIVE 03 / DEMONSTRATION | 0,96 % | 1,38 € |
| CREATIVE 08 / OFFRE | 0,49 % | 4,00 € |

**Mécanisme gagnant isolé :**
`corps réel annoté (flèches + pastilles vertes) + accroche de preuve sociale en surtitre + produit net à droite + fond crème + accent vert citron`

---

## 5. Concurrence — mécanismes durables observés

Source : Meta Ad Library (FR, BE, CA, US).

**Constat marché FR : quasi-vide.** Sur « tondeuse corps homme parties intimes » en France, la recherche remonte 7 annonces actives — dont **4 sont celles de Raselio**. Les seuls autres acteurs : Bluromi, Meraveil, et Gillette France. L'auction est peu disputée : c'est un avantage, mais cela signifie aussi qu'il n'y a **pas de winner FR à copier** — les mécanismes à importer viennent des US.

### Freebird — la promesse unique, déclinée 12×
Un seul titre répété sur une douzaine d'annonces actives : **« A faster, easier, and safer way to shave your entire body »**.
→ Mécanisme scalé : **la sécurité**. C'est le pivot du marché, pas l'esthétique.

### « Jake's Grooming Journey » — advertorial en faux organique
Deux hooks longue durée, chacun décliné 4× :
- « My husband switched from Manscaped® to this and **I noticed the difference before he said a word**. » → **POV partenaire + comparaison concurrent + preuve indirecte**
- « My wife got me the Manscaped® Lawn Mower® 5.0. **I switched anyway. Here's why.** » → **confession + curiosity gap**

### MANSCAPED — la réassurance en titre
Titres utilisés tels quels : **« 2-Year Warranty »** (répété 5× dans une même annonce), « Free Shipping Over $49 », « 15% Off First Order ». Plus la signature humoristique **« Trim The Fluff »**.
→ Mécanisme : **empilement de garanties + euphémisme drôle pour désamorcer la gêne**.

### Gillette France — le vocabulaire FR de l'objection
« Barre anti-irritation et anti-poils incarnés », « technologie SkinFirst », « sabot peau sensible », « étanche ».
→ C'est **le lexique français de la peur de l'irritation**. À reprendre tel quel : il est déjà installé dans la tête du marché par un budget Gillette.

### Ce qu'on en retient pour Raselio
| Mécanisme concurrent | Pourquoi ça marche | Adaptation Raselio |
|---|---|---|
| Freebird « safer » | Traite la peur n°1 sans la nommer frontalement | « Rasez-vous là sans jamais vous couper » |
| Jake's POV partenaire | Preuve sociale par un tiers crédible, non vendeur | Activation du persona conjointe (CTR 6-10 % déjà constaté) |
| Jake's « Here's why » | Curiosity gap + confession = clic qualifié | « 30 ans de rasoir jetable. Voilà pourquoi j'ai arrêté. » |
| Manscaped garanties en titre | Risk reversal avant même le clic | « Garantie 2 ans. Remboursé 30 jours. Colis discret. » |
| Manscaped humour | Désamorce la gêne, rend mémorable | Ton post-it déjà présent chez Raselio — à garder |
| Gillette lexique | Emprunte l'autorité d'un leader | « anti-irritation », « peau sensible », « lames céramique » |

---

## 6. Points à trancher (nécessitent une validation)

1. **Cohérence produit.** Le compte contient au moins **deux tondeuses visuellement différentes** :
   - créatives « IMPECCABLE » (les winners) : corps droit, texture losange, socle cylindrique marqué RASELIO
   - créatives « RS · » (photo réelle) : corps conique, texture picots, socle tronconique sans marquage
   Il faut figer **un seul packshot officiel** avant toute production.
2. **Allégations chiffrées.** « Approuvée par plus de 35 000 hommes » et « Les 7 raisons que 17 000 hommes connaissent déjà » coexistent dans le compte. Deux chiffres contradictoires, et aucun n'est sourcé. À harmoniser et à justifier (règles Meta sur les allégations).
3. **Stock.** Le produit Shopify est à `inventoryQuantity: -9`. Vérifier avant de remettre du budget.
