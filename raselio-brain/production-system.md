---
doc: production-system
generated_on: 2026-09-09
source: Dylan Ulry, message « WINNING STATICS — DEUXIÈME SOURCE OBLIGATOIRE », 12 sections
statut: loi de marque, contraignante
---

# Système de production des statiques Raselio

Écrit par Dylan le 2026-09-09. Se charge sur **chaque** sortie de statique, avec `visual-quality-doctrine.md` et `brand-lens.md`. Où une méthode générique diverge, ce document gagne. Où les trois règles dures de `CLAUDE.md` divergent, les règles dures gagnent.

## La règle qui remplace toutes les autres

Jamais : `FRAMEWORK → PROMPT → IMAGE → SUIVANT.`

Toujours : `FRAMEWORK → ANALYSE SOURCE → ANALYSE PRODUIT → ANALYSE MARQUE → BRIEF → GÉNÉRER A/B/C → COMPARER → REJETER → ITÉRER → FINAL.`

## Le système à sept sources

Chaque excellente créative se construit avec :

| Source | Ce qu'elle apporte | État réel |
|---|---|---|
| **Parker** | architecture, référence de winner | `competitors/_bibliotheque-architectures.md`, 17 familles, ~31 000 annonces |
| **Winning Statics** | framework, méthode de remix, discipline de variation | 10 frameworks connus ; **les images du fichier ne sont pas lisibles depuis cette session** |
| **Pinterest** | art direction, photographie, typographie | **aucun outil Pinterest dans cette installation** — substituts nommés dans la doctrine |
| **Grooming leaders** | niveau de finition attendu dans la catégorie | Manscaped ingéré ; Philips, Braun, Gillette, Panasonic, Wahl, Meridian, Freebird à ingérer |
| **Références produit Raselio** | fidélité produit | **construite le 2026-09-09, voir ci-dessous** |
| **Winners Raselio** | insight prouvé | `winners/WINNERS_MASTER_RASELIO.md` |
| **Brand DNA Raselio** | cohérence visuelle | `brand-lens.md` |
| **Higgsfield** | exécution | `nano_banana_pro`, 4:5, 2k |

## Product reference library — construite le 2026-09-09

Les vraies photos produit Raselio, importées dans Higgsfield depuis le CDN Shopify et disponibles comme `image_references` sur chaque génération. **Higgsfield ne doit jamais réinventer le produit.**

| media_id | Ce que la photo montre | Source Shopify |
|---|---|---|
| `a54650c1-4c5d-4323-aba8-c16ee3812caf` | Le produit sur son socle de charge — le packshot héros | image 1 sur 11 |
| `f8c271a8-f967-466a-bfac-0951762f7eee` | Macro de la tête arrondie et des lames céramique | image 3 sur 11 |
| `5da943de-0f90-484f-b0fd-7a883cbd502e` | L'éclairage LED intégré en fonctionnement | image 5 sur 11 |
| `67f99e4d-832e-4c48-af43-7182066c2b08` | Le contenu de la boîte : tondeuse, sabot, socle, câble USB, brosse, huile | image 9 sur 11 |
| `8f86e875-a8fa-4024-aec2-cedfb22fc165` | Le packshot fournisseur RUILANG 810 importé de la fiche 1688 | référence historique de l'équipe |

**Règle d'attelage.** Au minimum le packshot héros sur chaque génération montrant le produit. Ajouter le macro tête dès que la tête est visible de près, le LED dès que la lumière est un argument, le contenu de boîte pour toute créative accessoires. Trois références valent mieux qu'une : elles verrouillent la forme sous plusieurs angles.

**Pourquoi ça marche malgré le proxy.** `media_import_url` fait chercher l'image par les serveurs Higgsfield, pas par cette session. Le CDN Shopify est inaccessible en direct d'ici mais parfaitement accessible pour eux. Route vérifiée le 2026-09-09 sur les quatre imports.

## Product fidelity gate

Après chaque génération, comparer le produit généré aux références et vérifier huit points : **forme, lames, bouton, logo, couleur, matière, proportions, accessoires.** Un produit incorrect vaut REJECT, cause `BAD_PRODUCT` dans `winners/REJECTION_LOG.md`.

Rappel de la règle dure n° 3 : le produit ne porte **aucune inscription** — la marque n'a pas de logo dessiné et aucun fichier de logo n'existe dans aucune source. Un logo inventé sur le boîtier vaut REJECT.

## Un concept = un brief unique

Un concept possède **1 framework, 1 angle, 1 hook, 1 idée visuelle**. Les variantes ne changent **qu'une seule variable principale** — angle de caméra, formulation du headline, position du produit, persona, ou registre d'exécution. Jamais tout à la fois : sinon on ne sait pas ce qui a fait la performance.

Trois variantes ne sont pas trois prompts différents. Ce sont trois fois le même prompt, moins une variable.

## Le brief de production — 19 champs, avant toute génération

```
CONCEPT ID
SOURCE REFERENCE      (Parker ou Winning Statics, avec la preuve chiffrée)
FRAMEWORK
PARENT WINNER         (l'insight du compte qui le justifie)
HOOK
ANGLE
PERSONA
HEADLINE
SUPPORT COPY
SCENE DESCRIPTION
PRODUCT REFERENCE     (les media_id attelés)
PRODUCT POSITION
CAMERA ANGLE
LIGHTING
BACKGROUND
BRAND COLORS
TYPOGRAPHY DIRECTION
TEXT OVERLAY          (texte exact, entre guillemets)
VARIATION AXIS        (la seule variable qui change entre A, B et C)
HYPOTHESIS            (le signal précis qui tranchera)
```

## Copy et offre exactes

Prix, remise, bundle, garantie, quantité, cadeau, livraison : **toujours repris de Shopify ou de la landing**, jamais inventés. N'inventer jamais un prix, une réduction, une garantie, un avis, un nombre de clients, un résultat, une certification.

Ce que Raselio peut écrire aujourd'hui, verified : **34,99 €**, prix unique · garantie 2 ans · satisfait ou remboursé 30 jours · colis neutre · les sept specs publiées. Rien d'autre.

Ce que Raselio ne peut pas écrire : aucune note, aucun nombre d'avis, aucun compteur de clients, aucun témoignage signé. 11 commandes, 0 avis, 2 commentaires. Règle dure n° 1.

## Les frameworks Winning Statics, et leur correspondance Parker

US VS THEM → A4 · BOLD CLAIM → A1 · IPHONE NOTES → **A17, famille créée le 2026-09-09** · FEATURES & BENEFITS → A11 · BEFORE & AFTER → A3 · OFFER → A5 · TESTIMONIAL → A7 · QUESTION → A13 · REASONS WHY → A11 variante listicle · STICKY NOTES → A2.

Ne pas s'y limiter : les combiner avec les 17 familles de la bibliothèque Parker.

## Les deux limites à dire, pas à cacher

**Les images du fichier Winning Statics ne sont pas lisibles.** Le document fait 11,8 Mo et ses statiques sont des images intégrées ; `docs.google.com` et `lh7-rt.googleusercontent.com` sont refusés par le proxy de sortie (code 000, testé le 2026-09-09) et le doc en base64 représenterait ~16 Mo. Le teardown en treize points du §3 de Dylan — composition, densité de texte, position produit, contraste, typographie — **ne peut donc pas être fait sur ces images**. Il est fait sur les architectures et leur preuve chiffrée, ce qui n'est pas la même chose et ne doit pas être présenté comme tel.

**La route qui fonctionne, vérifiée le 2026-09-09.** Le connecteur Google Drive lit les fichiers `image/png` et `image/jpeg` un par un et renvoie l'intégralité du texte présent sur la créative plus une liste d'étiquettes de sujet. Donc : **des statiques déposées en fichiers image séparés dans un dossier Drive sont exploitables. Des images collées dans un document ne le sont pas.** Et des images collées directement dans la conversation sont vues pleinement, ce qui est la seule route permettant la notation /10 du §3 de la doctrine.

## Coût réel de génération — mesuré le 2026-09-09, et il corrige un chiffre faux

**Higgsfield, modèle `nano_banana_pro`** (le service le résout en interne en `nano_banana_2`), ratio 4:5, résolution 2k, sortie 1856 × 2304, avec les vraies photos produit attelées en `image_references`.

**Mesure directe.** Solde avant le premier lot : **1 946,81 crédits**. Solde après 19 images : **1 588,81**. Soit **358 crédits pour 19 images, ≈ 19 crédits par image.**

**Le chiffre de 2 crédits par image écrit précédemment dans la doctrine est faux pour ces réglages.** Il venait d'une mesure faite sur un lot de test à réglages plus légers et il a été généralisé à tort. Ce qui suit remplace cette ligne partout où elle apparaît.

**Ce que ça change concrètement pour la routine quotidienne.** À 19 crédits l'image, le pipeline en trois passes de `visual-quality-doctrine.md` — environ 65 générations pour 30 finales — coûte **~1 235 crédits par jour**. Le solde de 1 588 crédits représente donc **un peu plus d'une journée**, pas quinze.

**La correction de méthode qui en découle.** La résolution 2k ne se justifie que sur les images livrées. Les passes 1 et 2, qui servent à trier des idées et des compositions, se génèrent en résolution basse ; seules les finalistes retenues après le gate sont régénérées en 2k. C'est le même travail pour une fraction du coût, et ça rend la routine des 30 par jour tenable. Réglage à appliquer dans `.claude/skills/daily-creative-run/`.
