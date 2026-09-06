---
brand: raselio
doc: voc-metaphor
generated_on: 2026-09-06
refresh_by: 2026-12-06
corpus_profile: personas/voice-of-customer/voc-corpus-profile.md
customer_snippets_captured: 0
brand_projected_entries_quarantined: 7
category_theme_entries: 1
corpus_denominator: 0 enregistrement de langage client sur 0 reçu
sources_read: [personas/voice-of-customer/voc-corpus-profile.md, source-pulls/shopify-store-and-product.md, source-pulls/drive-30-statiques-meta-plan-2026-09-03.md, source-pulls/drive-30-creas-json-2026-09-03.md, source-pulls/drive-9-ads-statiques-prompts-2026-08-23.md, source-pulls/drive-higgsfield-prompts-final-2026-09-03.md, sub-context-docs/brand-identity-analysis.md, WebSearch 2026-09-06]
sources_missing: [customer-reviews, ad-comments, post-purchase-surveys, reddit, other-reviews, organic-social]
persona_slugs_available: aucun. `personas/personas-profile.md` n'existe pas au 2026-09-06
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md]
data_limitations: [Aucune métaphore de client n'existe et aucune n'a été capturée. La métaphore est, avec l'allitération, l'un des deux signaux que la méthode range en priorité haute, et c'est aussi la catégorie que le modèle du template désigne comme la plus susceptible d'être enseignée par la marque plutôt qu'apportée par le client. Ici le risque est total : 100 % des images disponibles sont écrites par la marque, donc toute image reprise en aval sans le drapeau d'écho serait une invention pure. Aucun verbatim de catégorie n'est atteignable, toute lecture directe du web étant refusée par le proxy.]
---

# VoC metaphor - Raselio

## Ce que cette passe a trouvé

**Zéro métaphore de client. Cent pour cent des images disponibles sont écrites par la marque.**

Cette catégorie est celle où le garde-fou compte le plus, et le template le dit explicitement : la métaphore est la catégorie la plus susceptible d'être enseignée par la marque plutôt qu'apportée par le client. Chez Raselio, ce n'est pas un risque, c'est l'état de fait complet. Il n'existe pas une seule image produite par un client, parce qu'il n'existe pas un seul client qui ait écrit.

**Et la marque en produit beaucoup, de bonne qualité.** C'est précisément ce qui rend cette passe dangereuse. « Découper au cutter ce qui demande un scalpel » est une comparaison forte, exacte et mémorable. « Cette séance qui ressemble plus à du déminage qu'à de l'entretien » est du bon travail. « Vous ne feriez pas ça à un kiwi » est le genre d'image qui, dans un vrai corpus d'avis, serait une pépite immédiate. Aucune des trois ne vient d'un client. Elles viennent d'un rédacteur qui travaille bien.

**La piste de recherche.** Les sept surfaces de la méthode ont été visées et le détail complet est dans `voc-corpus-profile.md` : 0 avis, 0 sondage, 0 commentaire publicitaire lu sur 163 annonces et 1 084 clics, 0 verbatim de forum sur 13 lectures refusées le 2026-09-06 plus 4 refusées aujourd'hui, 0 message client dans 46 fils Gmail, 6 requêtes de marque qui ne rendent aucune page mentionnant Raselio.

**Une observation qui vaut d'être notée, parce qu'elle porte sur le vocabulaire de la catégorie et pas sur une métaphore.** La recherche de marque « Raselio tondeuse avis forum » renvoie neuf forums de tondeuses à gazon, verified par la passe `community-and-forums` du 2026-09-06. L'index lit « tondeuse » comme un outil de jardin. Ce n'est pas une métaphore de client, c'est une collision de vocabulaire, et elle est rangée dans `voc-category-jargon` où elle a de la valeur.

**Sur l'allitération.** Le drapeau d'allitération ne peut être posé sur aucune entrée client, faute d'entrée. Il est posé où il s'applique sur les entrées projetées de l'annexe, parce que la passe d'assemblage a besoin de savoir que la phonétique est déjà travaillée par la marque.

## Metaphors

**Aucune. 0 métaphore capturée sur 0 enregistrement de langage client disponible.**

```yaml
# 0 entrée.
# Aucune analogie construite par un client de Raselio n'existe au 2026-09-06.
# Schéma en attente : voir voc-pain-phrase.md, même structure, avec category: metaphor
# et le champ supplémentaire alliteration: [true|false].
```

## Annexe A — Images construites par la marque

**Ceci n'est pas du langage client.** Ce sont les modèles mentaux que Raselio propose à son client. `brand_self_echo: true` par construction. La passe d'assemblage doit les traiter comme des hypothèses de cadrage, et le jour où l'une d'elles réapparaît dans un commentaire publicitaire, ce sera un signal d'adoption, pas de découverte.

```yaml
- snippet: "Utiliser le même outil pour les deux, c'est découper au cutter ce qui demande un scalpel."
  category: brand_projected_metaphor
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: page advertorial raselio.com /pages/pourquoi-pas-votre-tondeuse-a-barbe, section 1
    review_id: null
    date: 2026-08-31
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-31
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  alliteration: false
  notes: "L'image maîtresse de la marque : le mauvais outil sur la bonne zone. Elle porte tout l'argumentaire de différenciation contre la tondeuse à barbe. Image sous-jacente commune avec « Voici ce que votre tondeuse à barbe fait à cette zone » créa 25 et « Vous ne feriez pas ça à un kiwi » créa 05."

- snippet: "Cette séance qui ressemble plus à du déminage qu'à de l'entretien."
  category: brand_projected_metaphor
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: page advertorial raselio.com, section 2
    review_id: null
    date: 2026-08-31
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-31
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  alliteration: false
  notes: "Image de danger et de tension. C'est la plus chargée émotionnellement du corpus projeté, et celle dont le registre irait le moins bien à une audience de 55 ans et plus si elle était poussée trop loin. Voice-check : transformable."

- snippet: "Vous ne feriez pas ça à un kiwi."
  category: brand_projected_metaphor
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 05 du lot du 2026-09-03, titre chargé, complété à l'image par « Alors pourquoi à vous ? »
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  alliteration: false
  notes: "Substitution par un objet, imposée par la règle de conformité Meta de la marque : l'anatomie n'est jamais montrée, des proxies la remplacent, kiwis, ballons, mosaïques de pixels, serviettes, boxers, stated d'après les documents d'équipe du 2026-08-23 et du 2026-09-03. La métaphore ici n'est pas seulement une figure de style, c'est une contrainte de plateforme transformée en angle."

- snippet: "Elle épouse les reliefs au lieu de les attaquer."
  category: brand_projected_metaphor
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: page advertorial raselio.com, section 2
    review_id: null
    date: 2026-08-31
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-31
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  alliteration: false
  notes: "Personnification de l'outil, opposition épouser contre attaquer. Reprise sous forme raccourcie dans le texte principal de la créa 05."

- snippet: "Une lame droite sur une peau qui bouge. C'est là que ça dérape."
  category: brand_projected_metaphor
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: document équipe « 9 ads statiques + prompts », axe 1
    review_id: null
    date: 2026-08-23
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-23
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  alliteration: true
  notes: "Allitération en d, droite, dérape, plus le d de peau qui bouge en écho consonantique. C'est la ligne la plus phonétiquement travaillée du corpus projeté, et c'est le genre de rythme que la méthode signale comme le deuxième signal de priorité haute. Écrite par la marque, ère tutoiement, reprise dans le texte principal de la créa 05 du 2026-09-03."

- snippet: "Il y a deux types d'hommes."
  category: brand_projected_metaphor
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 22 du lot du 2026-09-03, titre chargé
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  alliteration: false
  notes: "Cadre de partage du monde en deux camps, complété à l'image par « Tondeuse à barbe : vous retenez votre respiration. / Raselio : vous respirez. » Ce n'est pas une comparaison objet contre objet mais une carte d'identité sociale, ce qui la rapproche de l'aspiration. Elle est aussi listée dans voc-aspirational."

- snippet: "Le facteur ne saura rien. Elle, si."
  category: brand_projected_metaphor
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 13 du lot du 2026-09-03, titre chargé
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  alliteration: false
  notes: "Figure de discrétion construite sur deux témoins opposés, l'un qui ne doit pas voir et l'autre qui doit remarquer. Elle suppose un homme en couple hétérosexuel, hypothèse que la passe customer-journey a déjà nommée comme un blanc, aucune donnée ne la confirme ni ne l'infirme."
```

## Annexe B — Images de catégorie, clients d'autres marques

| Image ou cadrage de catégorie | Marque concernée | Source | Statut |
|---|---|---|---|
| Le débat de la catégorie se formule comme un arbitrage entre rasage de près et sécurité, l'outil étant décrit comme prudent ou agressif plutôt que comme efficace ou non | Philips OneBlade Intimate | résumé WebSearch d'un comparatif français, 2026-09-06 | Paraphrase d'outil, page non ouverte. Ce n'est pas une métaphore de client, c'est un cadre de comparaison de rédacteurs spécialisés |

**Aucune métaphore de client d'aucune marque n'a pu être lue.** Quatre lectures directes tentées le 2026-09-06, quatre `EGRESS_BLOCKED`. Les résumés WebSearch ne restituent pas d'images, seulement des thèmes.

## Open loops

**1. La marque a écrit toutes les images, et personne ne sait laquelle le client reprend.**

Observation. Sept images construites par la marque, aucune reprise observée, parce qu'il n'existe aucune surface où une reprise pourrait être observée. Verified.

Pull. **Gap.** Il fired quand j'ai constaté que la catégorie de langage la plus riche de cette marque est aussi celle où le taux d'adoption par le client est structurellement inconnaissable aujourd'hui.

Question. Quelles images les clients emploient-ils spontanément pour parler de cet outil et de cette zone ?

Justification. Une image que le client apporte lui-même vaut plus qu'une image qu'on lui enseigne, et c'est le seul moyen de savoir si « cutter contre scalpel » parle ou si elle ne parle qu'au rédacteur.

Territoire. Messaging.

**2. Le kiwi, la mosaïque de pixels et le ballon sont des contraintes de plateforme devenues des angles.**

Observation. La règle interne de la marque, stated d'après ses documents du 2026-08-23 et du 2026-09-03, interdit de montrer l'anatomie et impose des proxies. La créa 05 en a tiré un titre entier, « Vous ne feriez pas ça à un kiwi. »

Pull. **Résonance.** Il fired parce qu'une contrainte de conformité s'est transformée en la meilleure figure de style du corpus, ce qui est rare et intéressant.

Question. Comment les hommes de cette catégorie parlent-ils de cette zone quand ils ne peuvent pas la nommer ?

Justification. Si le contournement est déjà naturel chez le client, la marque peut aller beaucoup plus loin sur ce terrain sans risquer ni la plateforme ni le mauvais goût.

Territoire. Messaging.

**3. Le registre glisse entre deux niveaux de langue sur la même page.**

Observation. L'advertorial titre « Vos couilles sont une zone sensible. » et la page « Notre Histoire » écrit « Le maillot, le pubis, l'aine, l'entrejambe… ». Verified sur l'export du 2026-09-06. Le brief du 2026-09-03 teste explicitement cet écart, stated : « Vocabulaire sobre (« Là-dessous ») vs cru (« Couilles ») ».

Pull. **Tension.** Il fired parce que deux registres opposés cohabitent sur le même site pour la même audience de 55 ans et plus.

Question. Quel mot les hommes de 55 ans et plus emploient-ils eux-mêmes pour cette zone ?

Justification. Le choix du mot conditionne toute la voix de la marque, et pour l'instant il est arbitré par un test de créas plutôt que par une écoute.

Territoire. Messaging.

---

**Méthodes chargées :** `parker-system/creative-strategy-context/customer-review-mining-method.md` et `parker-system/creative-strategy-context/persona-research-and-creative-strategy-process.md`. Les deux signaux de priorité haute de la méthode, la métaphore et l'allitération, ont été traités séparément et le drapeau d'allitération a été posé sur l'entrée qui le mérite.

This is everything I know about mining customer reviews for creative material.
