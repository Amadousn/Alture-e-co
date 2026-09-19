---
doc: bibliotheque-architectures
generated_on: 2026-09-09
generated_by: Parker, sur instruction Dylan Ulry « PARKER MASTER SWIPE FILE — SOURCE OBLIGATOIRE »
source: Parker MCP — corpus global d'annonces Meta (search_competitor_facebook_ads, mode discover)
statut: verified pour les chiffres, inferred pour les transpositions Raselio
due: 2026-10-09
---

# Bibliothèque d'architectures — statiques e-commerce

**À quoi sert ce document.** Dylan a posé une règle absolue le 2026-09-09 : « NE GÉNÈRE PLUS UNE CRÉATIVE À PARTIR D'UNE SIMPLE IDÉE TEXTE. » Chaque grosse créative doit s'appuyer sur 1 performance insight + 1 architecture + 1 référence d'art direction + le brand DNA Raselio + 1 hypothèse. Ce fichier est la **couche architecture**. Il se lit avec `visual-quality-doctrine.md` (la loi visuelle), `winners/WINNERS_MASTER_RASELIO.md` (le performance insight) et `_mecanismes-a-decliner.md` (les mécanismes concurrents déjà décodés).

Il ne remplace pas `brand-lens.md`. **Parker donne l'architecture. Raselio donne l'identité.** Architecture variable, brand DNA stable.

---

## 0. Ce qui était atteignable, et ce qui ne l'était pas

**Le board `YT_Statics_All` partagé par Alex Cooper n'est pas lisible depuis cette session.** Trois routes essayées, trois fois bloqué, vérifié deux fois le 2026-09-09 :

1. **Parker MCP `search_swipe_file`, mode `list_boards`** — l'org de Dylan (`0209adf6-626f-4484-ab41-19857e6b43df`) contient 8 boards, **tous à `ideaCount: 0`**, et aucun ne s'appelle `YT_Statics_All`. Le board partagé appartient à l'org d'Alex Cooper (`user=37c190cd-3090-483b-ad5c-b48834ce3086` dans le lien), pas à celle de Dylan. Un board partagé en lecture ne descend pas dans le MCP de l'org invitée.
2. **`WebFetch` sur le lien de partage** — `{"error_type":"EGRESS_BLOCKED","domain":"app.heyparker.ai"}`.
3. **`curl`** — code retour `000`, le proxy de sortie refuse le CONNECT.

**Le substitut, et pourquoi il est meilleur que le board.** Les 8 marques nommées par Dylan existent toutes dans le corpus **global** de Parker, hors board. Sept sur huit sont exploitables, et l'ensemble pèse **~31 000 annonces scrapées**, très au-dessus de ce que contient un board. C'est donc une base plus large, pas un repli au rabais.

| Marque | ID externe | Annonces scrapées | Annonces analysées par l'IA | Exploitable |
|---|---|---|---|---|
| Happy Mammoth | `b4c72e0e-6dd2-47b9-af7a-98985562b8e4` | 6 998 | 3 191 | oui |
| Jones Road Beauty | `f9f02e63-91e5-4e13-bdbe-3c05598faec9` | 6 090 | 1 692 | oui |
| Hollow Alpaca Socks | `711ed062-882a-4d92-be6c-71dfd8d8ae84` | 5 471 | 1 464 | oui |
| PetLab Co. | `60882b4a-e130-48c4-8a0a-32a14b478e5e` | 5 373 | 788 | oui |
| Mars Men | `be799fca-2222-4b99-972e-4527e26629b6` | 4 423 | 1 784 | oui |
| O Positiv | `5dc4c4a3-4d21-460f-a919-e3e28761c933` | 2 690 | 1 629 | oui |
| Wild Roman | `4359f6ee-ebaf-4d99-abe9-ada379ac1211` | 232 | 177 | oui |
| **Grüns** | `e3ede6d6-e090-4b9b-b1ea-ee8109154fd3` | **0** | **0** | **non — fiche vide dans Parker** |

**Grüns ne peut pas être analysée.** La marque existe dans Parker mais aucune annonce n'a jamais été scrapée. Ce n'est pas un blocage d'accès, c'est un vide. Aucun chiffre Grüns ne figure donc dans ce document, et aucun n'y figurera tant que la fiche reste vide.

**La limite honnête, qui est aussi celle déjà inscrite dans la doctrine.** Le CDN qui héberge les images (`auth.heyparker.ai`) est bloqué par le proxy de sortie, exactement comme celui de Higgsfield. **Je n'ai vu aucune de ces images.** Ce que je livre ici est réel et vérifié : architecture, mix de formats, niveau de conscience, émotion, longévité, copy, headline, angle. Ce que je ne peux pas livrer est la moitié art direction du §2 de Dylan (crop, contraste, texture, niveau de polish, style photo) et la notation /10 du §3. **Ce scoring visuel reste le sien**, comme le dit déjà `visual-quality-doctrine.md`.

---

## 1. Les six lectures transversales du corpus

Avant les familles. Ce que les 31 000 annonces disent quand on les regarde ensemble.

**1. La typographie domine la photographie.** « Headline Only » est le format numéro 1 chez **5 marques sur 6** : O Positiv 50,3 % (819 de 1 629), Jones Road 40,9 % (692 de 1 692), Wild Roman 40,7 % (72 de 177), Happy Mammoth 38,4 % (1 224 de 3 191), Hollow 22,5 % (330 de 1 464). Seule Mars Men le rétrograde en 3ᵉ position (14,6 %) derrière Offer Based. *Donc :* la famille W-C « typo monumentale » de Raselio n'est pas un pari, c'est le format central de la catégorie. Elle mérite plus de dérivées, pas moins.

**2. Le post-it est un format reconnu, pas une bizarrerie Raselio.** O Positiv le fait tourner comme format nommé à **3,2 % (52 annonces de 1 629)**, et l'un des deux plus longs runners statiques de Mars Men est un post-it quiz — « Can't lose the Dad Bod? » — **132 jours à l'antenne**. *Donc :* W-B (post-it) est validé par l'extérieur. Et chez Raselio il fait double travail, parce que le post-it est aussi le cache-sexe imposé par la règle dure n° 2. C'est la seule famille du corpus qui résout un problème de conformité en même temps qu'un problème de scroll-stop.

**3. Le niveau de conscience sépare le corpus en deux camps, et Raselio doit choisir le bon.** Camp *problem aware* : Happy Mammoth 63,5 %, Mars Men 55,0 %, Hollow 40,6 %. Camp *solution aware* : Wild Roman 81,9 %, Jones Road 65,5 %, O Positiv 56,8 %, PetLab 54,4 %. Pour mémoire, Manscaped tourne à **4,9 % de problem aware** (`_mecanismes-a-decliner.md`). L'acheteur réel de Raselio — homme de 45 à 65 ans, arrivé par un symptôme, pas par une envie de lifestyle — est problem aware. *Donc :* le modèle de Raselio est Mars Men et Happy Mammoth, pas Manscaped. Copier le mix de Manscaped serait parler à quelqu'un qui n'achète pas.

**4. L'émotion secondaire est le vrai marqueur de catégorie.** L'espoir domine partout (39 % à 71,5 %) et ne distingue donc rien. C'est la deuxième émotion qui trahit la catégorie : frustration 22,3 % et dégoût 17,1 % chez Hollow, **honte 15,9 % chez Mars Men** et 10,2 % chez O Positiv, regret 11,2 % chez PetLab. *Donc :* Raselio est dans une catégorie à honte, et Mars Men est le modèle le plus proche. Attention à la façon dont ils s'en servent : la honte à 15,9 % tourne **à côté** de l'espoir à 58,1 %, jamais seule. La honte ouvre, l'espoir vend. Une créative Raselio qui n'apporte que la gêne est mal construite.

**5. Les gagnants tournent des années, pas des semaines.** Les plus longs runners du corpus : O Positiv **910 jours**, Happy Mammoth **640** et deux à **632**, PetLab **421** et **385**, Wild Roman **124**, Hollow **138**. La plus vieille annonce de Raselio a environ 30 jours. *Donc :* ce corpus valide directement la répartition de la doctrine (21 dérivées / 9 explorations). Ces marques ne cherchent pas un nouveau gagnant chaque matin, elles exploitent celui qu'elles ont jusqu'à l'os. Le travail quotidien de Raselio, c'est décliner, pas réinventer.

**6. Deux modèles promo cohabitent, et il faut en choisir un.** Agressif : Hollow 46,6 % d'annonces promo, Mars Men 46,2 %, PetLab 22,5 % (dont les deux plus longs runners qui n'ont pour tout headline que « 50 % OFF »). Sobre : Happy Mammoth 7,3 %, Jones Road 7,9 %, O Positiv 15,9 %. Rien entre les deux. Et l'evergreen écrase le saisonnier partout (78 % à 97 %). *Donc :* Raselio à 34,99 € prix unique est aujourd'hui dans le camp sobre par défaut, pas par décision. C'est une question de fond pour la roadmap, pas une question de créative.

---

## 2. La bibliothèque — 16 familles

Chaque famille porte : d'où elle vient et avec quelle preuve, ce qui se verrouille (§6 de Dylan), ce qui s'adapte, et l'état chez Raselio. **Une créative = une architecture principale.** Mélanger quinze références dans un prompt et laisser le générateur produire une moyenne est l'erreur interdite du §5.

---

### A1 — HEADLINE DOMINANT / TYPOGRAPHY-LED
**Preuve.** Format n° 1 chez 5 marques sur 6 (chiffres en §1.1). O Positiv 50,3 %, Jones Road 40,9 %, Wild Roman 40,7 %, Happy Mammoth 38,4 %.
**Structure.** Le texte est le sujet, pas la légende. Le headline occupe la majorité de la surface. Le produit est petit, en bas ou en coin, parfois absent. Aucune photo qui concurrence le mot.
**Pourquoi ça arrête le pouce.** Dans un fil de photos, un bloc de texte plein cadre est le pattern interrupt le moins cher qui existe. Il se lit à 250 px sans effort.
**Ce qui se verrouille.** La proportion texte/image, la hiérarchie à un seul niveau (un message, pas trois), le vide autour du bloc, l'échelle du produit réduite à un rappel.
**Ce qui s'adapte.** Les mots, la palette Raselio, le proxy si le visuel en demande un.
**État Raselio.** **Déjà en TIER 1** — famille W-C « typo monumentale ». À décliner en priorité.

---

### A2 — POST-IT / OBJET-NOTE
**Preuve.** O Positiv : format nommé, 52 annonces sur 1 629 (3,2 %). Mars Men : un post-it quiz à **132 jours** de diffusion, « Can't lose the Dad Bod? ».
**Structure.** Un objet du quotidien — note adhésive, mot écrit à la main — porte le message, posé sur ou devant le produit. Écriture manuscrite. Rien de graphique.
**Pourquoi ça arrête le pouce.** Ça ne ressemble pas à une publicité. C'est le natif le plus facile à produire, et le seul qui autorise une phrase gênante sans avoir l'air d'un slogan.
**Ce qui se verrouille.** L'objet réel qui porte le texte, l'écriture manuscrite, le cadrage serré, le fond banal et non stylisé.
**Ce qui s'adapte.** Le texte, la couleur du post-it, ce sur quoi il est collé.
**État Raselio.** **Déjà en TIER 1** — famille W-B. Double emploi : mécanisme créatif **et** cache imposé par la règle dure n° 2. C'est la famille la plus rentable du portefeuille et elle est sous-exploitée.

---

### A3 — BEFORE & AFTER, VARIANTE HORODATÉE
**Preuve.** Mars Men 22,7 % (2ᵉ format), Hollow 13,0 %, Happy Mammoth 7,7 % — dont « DAY 1 / DAY 14 », **632 jours**. Variante Hollow : « 6:00 am / 3:00 pm », deux heures de la même journée au lieu de deux dates.
**Structure.** Deux images côte à côte, cadrage et lumière identiques, une seule variable change. Le label est minuscule et factuel. Aucun texte de vente entre les deux.
**Pourquoi ça arrête le pouce.** Le cerveau compare avant de lire. C'est la seule architecture qui vend sans argument.
**Ce qui se verrouille.** La symétrie stricte, l'identité de cadrage et de lumière, le label minuscule, la variable unique.
**Ce qui s'adapte.** Ce qui est comparé.
**État Raselio.** **Famille absente — c'est le plus gros trou du portefeuille.** Attention : la règle dure n° 2 interdit de montrer la zone. Le before/after doit donc porter sur un **proxy** (les deux kiwis, le boxer, la serviette) ou sur une **horloge** à la manière de Hollow — « 20 minutes / 4 minutes » — jamais sur un corps. La variante horodatée est celle qui contourne le mieux la contrainte.

---

### A4 — US VS THEM / COMPARAISON
**Preuve.** Hollow 20,2 % (295 de 1 464, leur 3ᵉ format), Mars Men 9,0 %, PetLab 4,3 %.
**Structure.** Colonne gauche « eux », colonne droite « nous ». Croix contre coches. Le concurrent n'est jamais nommé ni montré.
**Pourquoi ça arrête le pouce.** Ça donne au lecteur une grille de décision toute faite, et ça positionne la marque comme la réponse à un problème qu'il a déjà eu avec un autre produit.
**Ce qui se verrouille.** Les deux colonnes, la parité de longueur des lignes, la neutralité visuelle du côté « eux ».
**Ce qui s'adapte.** Les critères comparés.
**État Raselio.** **Absente.** Faisable immédiatement — les critères existent (tête arrondie, LED intégrée, 100 % étanche, sabot 3 hauteurs, colis neutre, garantie 2 ans). **Interdiction absolue** : ne jamais afficher le nom, le logo, le packaging ou une photo de Thomyle, Grümwise ou Manscaped. Le côté « eux » reste générique. Rappel — trois annonces montrant une boîte Grümwise sont encore actives et doivent être coupées.

---

### A5 — OFFER BASED
**Preuve.** Mars Men 28,6 % (leur format n° 1), Hollow 20,4 %, PetLab 15,9 % — dont les deux plus longs runners, **421 et 385 jours**, dont le headline entier est « 50 % OFF ».
**Structure.** L'offre est le visuel. Chiffre énorme, produit en dessous, une ligne de réassurance.
**Pourquoi ça arrête le pouce.** Aucun travail cognitif. Le chiffre fait tout.
**Ce qui se verrouille.** L'échelle démesurée du chiffre, la subordination du produit, la ligne de réassurance unique.
**Ce qui s'adapte.** L'offre.
**État Raselio.** **Bloquée en amont.** Raselio n'a pas d'offre : un SKU, 34,99 €, prix unique. Cette famille ne peut pas exister avant une décision commerciale. Elle n'est pas un sujet créatif, elle est un point de roadmap. Note connexe : le coût produit n'est toujours pas renseigné dans Shopify (`inventoryItem.unitCost` à `null`), donc aucune remise ne peut être calculée proprement aujourd'hui.

---

### A6 — EDUCATIONAL / SCHÉMA DE MÉCANISME
**Preuve.** Le meilleur statique de Hollow : « BLOOD POOLS BELOW YOUR KNEES AFTER 90 MINUTES OF SITTING. HOLLOW SOCKS MOVES IT BACK UP. » — Educational, problem aware, 57 jours. Le champion absolu du corpus, **640 jours**, est le « ANATOMIE DU MEILLEUR COMPLÉMENT » de Happy Mammoth : une vue éclatée du produit avec appels de légende. Hollow 9,2 %, Mars Men 6,3 %.
**Structure.** Le produit ou le corps en vue éclatée, quatre à six appels de légende, un fait chiffré en headline.
**Pourquoi ça arrête le pouce.** Ça promet un savoir, pas un achat. C'est l'architecture qui tient le plus longtemps du corpus entier — deux des trois plus vieux runners sont de cette famille.
**Ce qui se verrouille.** La vue éclatée, la ligne de légende fine qui relie le mot à la pièce, le nombre d'appels entre 4 et 6, le fond neutre.
**Ce qui s'adapte.** Les pièces et les légendes.
**État Raselio.** **Absente, et c'est l'occasion la plus nette du corpus.** Le MS-810 se prête exactement à ça : tête arrondie, lames céramique, LED intégrée, sabot 3 hauteurs, 100 % étanche, sans fil sur socle, ~90 min d'autonomie. **Règle dure n° 3 :** seules ces specs publiées passent. Les RPM et l'autonomie exacte sont marqués « à confirmer » par l'équipe elle-même — ils restent « à confirmer », on n'invente pas le chiffre manquant pour remplir une légende.

---

### A7 — REVIEW-AS-HEADLINE / SOCIAL INTERFACE
**Preuve.** Wild Roman fait tourner un avis client comme headline pendant 103 jours : « This was supposed to be for my husband and I of course had to try it and WOW! ». Hollow : « FROM 5K TO 10K STEPS. ALPACA COMPRESSION SOCKS MADE THE DIFFERENCE. », 138 jours. Social Interface : Wild Roman 19,2 %, Jones Road 10,3 %, O Positiv 7,9 %.
**Structure.** La phrase du client, telle quelle, en gros. Le produit en dessous. Parfois l'habillage d'une interface de commentaire.
**Pourquoi ça arrête le pouce.** Une phrase mal écrite par un vrai humain a une texture qu'aucun copywriter n'imite.
**État Raselio.** **INTERDITE AUJOURD'HUI.** Règle dure n° 1. Raselio a **11 commandes Shopify, 0 avis, 2 commentaires publicitaires** sur tout le compte, et fait déjà tourner « 4,7/5 », « 1 734 avis », « +17 000 hommes » et cinq témoignages signés que l'équipe a elle-même documentés comme inventés. Ajouter une architecture d'avis par-dessus ce socle-là aggraverait une exposition qui relève de la pratique commerciale trompeuse. **Ce qui débloque cette famille est concret et coûte un email** : écrire aux 11 acheteurs, dont 8 sont livrés. La première vraie phrase client ouvre A7 et A14 d'un coup.

---

### A8 — CALLOUT / ADRESSE DIRECTE À LA PERSONA
**Preuve.** Hollow, 128 jours : « If you can feel this in your leg, you need compression. » Jones Road 6,9 %, Happy Mammoth 6,1 %, O Positiv 4,4 %.
**Structure.** Une phrase en « si vous… alors… » qui trie le lecteur. Le visuel montre le symptôme, pas le produit.
**Pourquoi ça arrête le pouce.** Le lecteur se reconnaît avant d'avoir compris que c'est une pub. Le tri fait le ciblage à la place de l'algorithme.
**Ce qui se verrouille.** La construction conditionnelle, le symptôme visualisé plutôt que le produit, la brièveté.
**Ce qui s'adapte.** Le symptôme.
**État Raselio.** **Absente, disponible immédiatement, aucun blocage.** C'est la famille la plus rapide à ouvrir : elle ne demande ni offre, ni avis, ni chiffre. Elle parle directement à Michel, 61 ans — l'acheteur réel, celui que le ciblage 18-44 a raté à 93 € pour 0 achat.

---

### A9 — REGRET / TEMPS PERDU
**Preuve.** Wild Roman, 124 jours : « Most men wait too long to start taking care of their skin. » PetLab : regret à 11,2 % des émotions.
**Structure.** Le headline nomme le retard, pas le produit. Registre calme, jamais moqueur.
**Pourquoi ça arrête le pouce.** Chez un acheteur de 45 à 65 ans, le regret est plus mobilisateur que le désir.
**Ce qui se verrouille.** Le constat à la troisième personne (« la plupart des hommes »), qui laisse au lecteur la porte de sortie.
**Ce qui s'adapte.** L'objet du retard.
**État Raselio.** **Partiellement présente, mais adossée à une fausse preuve.** La copy actuelle dit « Plus de 17 000 personnes ont déjà fait le changement. La seule chose qu'elles regrettent, c'est de ne pas l'avoir fait plus tôt. » L'architecture est bonne, le chiffre est inventé. **Garder la structure, supprimer le nombre.** Wild Roman fait tourner cette famille 124 jours sans citer un seul chiffre de clients.

---

### A10 — PRODUCT HERO / NATURE MORTE
**Preuve.** Le plus long runner du corpus entier, **910 jours** : le product hero URO d'O Positiv. Wild Roman Product Collection 35,0 %, Jones Road 28,8 %.
**Structure.** Le produit seul, lumière étudiée, fond travaillé, très peu de texte. Une nature morte, pas un packshot.
**Pourquoi ça arrête le pouce.** La qualité de la lumière signale le niveau de prix avant tout argument.
**Ce qui se verrouille.** La direction lumière, le rapport produit/vide, la texture du fond, l'absence de texte de vente.
**Ce qui s'adapte.** Le produit.
**État Raselio.** **Présente mais faible — et c'est exactement le « problème numéro un » de la doctrine.** Raselio étant mono-SKU, la version « collection » devient le mécanisme M4 déjà décodé (« what's in the box » : appareil + socle + sabot + colis neutre). **Contrainte de fidélité produit :** on n'invente ni lame, ni bouton, ni forme, ni couleur, ni accessoire. Une hallucination importante sur le produit vaut REJECT.

---

### A11 — HEADLINE + BENEFITS / CHECKLIST
**Preuve.** Happy Mammoth 18,1 %, PetLab 16,0 %, Jones Road 14,5 %, Hollow 12,7 %, Mars Men 11,8 %. Exemple Mars Men à 69 jours : « The Hormone Suppressing Your T », qui recadre l'âge en problème de cortisol.
**Structure.** Un headline qui recadre le problème, puis 4 à 6 bénéfices cochés. Le produit tient un quart de l'image.
**Pourquoi ça arrête le pouce.** Le recadrage déplace la faute : ce n'est pas vous, c'est un mécanisme. Puis la liste rassure.
**Ce qui se verrouille.** Le recadrage en une ligne, le nombre de coches entre 4 et 6, la parité de longueur des lignes.
**Ce qui s'adapte.** Le mécanisme et les bénéfices.
**État Raselio.** Le mécanisme M3 (checklist à cinq coches) est déjà décodé dans `_mecanismes-a-decliner.md` mais n'a jamais été produit. Le recadrage à écrire pour Raselio est du même type que celui de Mars Men : « ce n'est pas votre maladresse, c'est la forme de la tête ».

---

### A12 — CADEAU / OCCASION
**Preuve.** Wild Roman : Fête des Pères à 10,7 % (19 de 177), et **deux de leurs cinq meilleurs statiques** en sont. Le meilleur : « He Takes Care of Everything / This Takes Care of His Skin », 121 jours.
**Structure.** Le headline s'adresse à l'acheteur, pas à l'utilisateur. Coffret, packaging soigné, registre chaleureux.
**Pourquoi ça arrête le pouce.** Ça change l'acheteur. Wild Roman ne vend pas à l'homme, il vend à sa femme et à sa fille.
**Ce qui se verrouille.** L'adresse à la deuxième personne vers un tiers, la mise en scène du coffret, le désir « prendre soin d'un proche » — 14,7 % des désirs chez Wild Roman.
**Ce qui s'adapte.** L'occasion.
**État Raselio.** **Absente — et c'est une trouvaille stratégique, pas seulement une architecture.** Toutes les créatives Raselio parlent à l'homme qui se rase. Personne ne parle à celle qui achète. Noël est à trois mois, le colis est déjà neutre (un argument cadeau tout fait), et le produit à 34,99 € est exactement dans le ticket cadeau. À porter dans la roadmap.

---

### A13 — QUESTION-BASED HEADLINE
**Preuve.** Le post-it quiz de Mars Men à **132 jours** — « Can't lose the Dad Bod? » Hollow 7,2 %, Jones Road 6,6 %, Happy Mammoth 5,8 %, O Positiv 5,1 %.
**Structure.** Une question fermée qui appelle un oui silencieux. Se combine presque toujours avec A2 (post-it) ou A1 (typo).
**Pourquoi ça arrête le pouce.** Une question ouvre une boucle que le cerveau veut refermer.
**Ce qui se verrouille.** La question fermée, jamais rhétorique, jamais culpabilisante.
**Ce qui s'adapte.** Le symptôme interrogé.
**État Raselio.** Absente en tant que telle. C'est le meilleur **modificateur** de W-B : le post-it Raselio existe déjà, le passer en question est une dérivée à coût nul.

---

### A14 — PRESS / PUBLICATION
**Preuve.** PetLab 2,5 % (20 de 788), « Endorsed by major media outlets » listé comme argument.
**Structure.** Logos de médias en bandeau, ou mise en page d'article.
**État Raselio.** **INTERDITE.** Raselio n'a aucune retombée presse. Afficher un bandeau de logos serait la même faute que d'inventer un avis — règle dure n° 1. La variante *advertorial* (mise en page éditoriale sans logo de média réel) reste ouverte, à condition qu'aucun titre de presse existant ne soit évoqué.

---

### A15 — FOUNDER AD *(nouvelle catégorie — absente de la liste du §4)*
**Preuve.** Jones Road : format nommé « Founder Ads », 55 annonces sur 1 692 (3,3 %). La marque est portée par Bobbi Brown, fondatrice réelle et visible.
**Structure.** Le fondateur, à visage découvert, tient le produit ou parle en direct. Photo simple, pas de studio. Le texte est à la première personne.
**Pourquoi ça arrête le pouce.** C'est la seule preuve sociale qui ne demande ni client, ni avis, ni chiffre — seulement une personne réelle qui assume.
**Ce qui se verrouille.** La première personne, le cadrage simple, l'absence de mise en scène publicitaire.
**Ce qui s'adapte.** Tout le reste.
**État Raselio.** **Absente, et c'est la seule famille de preuve sociale ouverte aujourd'hui.** Dylan est un fondateur réel, français, entrepreneur individuel. Une créative signée par lui ne viole aucune des trois règles dures, ne demande aucune donnée que la marque n'a pas, et remplace fonctionnellement les cinq faux témoignages qui tournent en ce moment. **Elle demande une chose que je ne peux pas fabriquer : une vraie photo de Dylan.** Un visage généré par IA à sa place serait exactement le faux témoignage que la règle dure n° 1 interdit.

---

### A16 — WAREHOUSE
**Preuve.** Hollow 4,4 %, Happy Mammoth 3,4 %.
**État Raselio.** **REJETÉE.** Ces marques montrent leur entrepôt parce qu'elles en ont un. Raselio s'approvisionne sur 1688 et n'a pas de stock propre. Mettre en scène un entrepôt inexistant est une fabrication, au même titre qu'un faux avis.

---

## 3. Comment on s'en sert — la procédure, pas la théorie

**Une créative, une architecture.** Le §5 de Dylan est une interdiction, pas un conseil : on ne verse pas quinze références dans un prompt pour laisser le générateur en tirer une moyenne. Chaque brief nomme **une** famille principale.

**Le bloc de verrouillage, à écrire dans chaque brief avant génération :**

```
REFERENCE SOURCE      : Parker corpus global (marque, ID, nombre d'annonces analysées)
REFERENCE BRAND       : la marque d'où vient l'architecture
REFERENCE CREATIVE    : le headline exact et sa durée de diffusion
WHAT MAKES IT STRONG  : le mécanisme visuel, en une phrase
WHAT WILL BE LOCKED   : structure, proportions, hiérarchie, densité, échelle produit,
                        échelle sujet, placement, vide, rapport texte/image
WHAT WILL BE ADAPTED  : produit → MS-810, marque → Raselio, copy → français Raselio,
                        persona → Michel 45-65, preuve → uniquement des données réelles,
                        offre → 34,99 €
```

**Le brand DNA ne bouge pas.** Parker fournit l'architecture. `brand-lens.md` et `visual-quality-doctrine.md` fournissent l'identité. Le test du §11 s'applique à chaque sortie : logo masqué, est-ce qu'on reconnaît encore Raselio ? Si les 30 créatives ont l'air de venir de 30 marques, c'est un échec de branding, même si chaque image est belle.

**Le visual gap test du §10 reste manuel.** Référence Parker / référence art direction / génération Raselio, côte à côte : même **niveau**, pas même design. Plus amateur, plus Canva, plus IA, plus dropshipping, moins brandé → REJECT, et la cause part dans `winners/REJECTION_LOG.md`. **Ce test est celui de Dylan, pas le mien** — je ne vois aucune des images, ni celles du corpus, ni celles que je génère.

**Ordre de priorité pour ouvrir les familles manquantes**, du plus rentable au moins :

1. **A8 (callout)** — aucun blocage, parle à l'acheteur réel, produisible aujourd'hui.
2. **A6 (schéma éclaté)** — deux des trois plus vieux runners du corpus, et le MS-810 a les specs publiées pour le faire proprement.
3. **A3 (before/after horodaté)** — le plus gros trou, contournable par l'horloge ou le proxy.
4. **A13 (question)** — dérivée gratuite de W-B, qui est déjà TIER 1.
5. **A4 (us vs them)** — faisable, à condition de couper d'abord les trois annonces montrant une boîte Grümwise.
6. **A12 (cadeau)** — nouvel acheteur, Noël à trois mois.
7. **A15 (founder)** — débloquée par une photo de Dylan.
8. **A7 (avis)** — débloquée par un email aux 11 acheteurs.
9. **A5 (offre)** — débloquée par une décision commerciale et le coût produit dans Shopify.

Familles fermées et pourquoi : **A14** (aucune presse), **A16** (aucun entrepôt), **A7** tant qu'il n'y a pas un vrai avis.

---

## 4. Ce que ce document ne contient pas

- **Aucune image vue.** `auth.heyparker.ai` est bloqué par le proxy de sortie, comme le CDN Higgsfield. Les colonnes art direction du §2 de Dylan (crop, contraste, texture, polish, style photo, point focal) et la notation /10 du §3 ne sont pas remplies, et elles ne peuvent pas l'être depuis cette session.
- **Aucune donnée Grüns.** La fiche Parker existe, elle est vide : 0 annonce scrapée.
- **Aucun contenu du board `YT_Statics_All`.** Trois routes fermées, détaillées en §0.
- **Aucun asset concurrent réutilisé.** Ce document décode des logiques de composition. Il ne copie aucun visuel, aucun logo, aucun packaging, aucun wording mot pour mot.

---

## Sources

- Parker MCP `search_competitor_facebook_ads`, mode `discover`, corpus global, pulls du 2026-09-09 : Mars Men (1 784 annonces analysées), Happy Mammoth (3 191), Jones Road Beauty (1 692), O Positiv (1 629), Hollow Alpaca Socks (1 464), PetLab Co. (788), Wild Roman (177).
- Parker MCP `search_swipe_file`, mode `list_boards` — 8 boards dans l'org, tous vides, aucun nommé `YT_Statics_All`.
- `WebFetch` sur `app.heyparker.ai` — `EGRESS_BLOCKED`, deux tentatives.
- `visual-quality-doctrine.md` — la loi visuelle Raselio du 2026-09-09.
- `winners/WINNERS_MASTER_RASELIO.md` — familles W-A à W-E, dénominateurs, acheteur réel.
- `competitors/_mecanismes-a-decliner.md` — mécanismes M1 à M8, corpus Manscaped.
- `CLAUDE.md` — les trois règles dures.
