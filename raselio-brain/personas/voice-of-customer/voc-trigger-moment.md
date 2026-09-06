---
brand: raselio
doc: voc-trigger-moment
generated_on: 2026-09-06
refresh_by: 2026-12-06
corpus_profile: personas/voice-of-customer/voc-corpus-profile.md
customer_snippets_captured: 0
brand_projected_entries_quarantined: 6
category_theme_entries: 1
corpus_denominator: 0 enregistrement de langage client sur 0 reçu ; 11 achats datés dont aucun n'est expliqué par son acheteur
sources_read: [personas/voice-of-customer/voc-corpus-profile.md, source-pulls/shopify-orders-and-customers.md, source-pulls/shopify-analytics.md, source-pulls/shopify-store-and-product.md, source-pulls/drive-30-statiques-meta-plan-2026-09-03.md, source-pulls/drive-30-creas-json-2026-09-03.md, source-pulls/meta-account-breakdowns.md, sub-context-docs/customer-journey-and-persona-discovery.md, WebSearch 2026-09-06]
sources_missing: [customer-reviews, ad-comments, post-purchase-surveys, reddit, other-reviews, organic-social]
persona_slugs_available: aucun. `personas/personas-profile.md` n'existe pas au 2026-09-06, donc le champ behavioral_signal_tag, que ce prompt désigne comme porteur et rarement nul, est nul partout par obligation
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md, creative-strategy-context/emotional-delivery-and-timing.md]
data_limitations: [Aucun moment déclencheur raconté par un client n'existe. Onze achats sont datés au jour près, du 2026-08-26 au 2026-09-04, et aucun ne porte la moindre indication de ce qui se passait dans la vie de l'acheteur. Le champ behavioral_signal_tag, que ce prompt désigne comme porteur et devant rarement être nul, est nul partout, faute de slugs persona et faute d'enregistrements. Les données d'horaire et de saisonnalité de la boutique décrivent quand on achète, jamais pourquoi maintenant, et les deux ne doivent pas être confondues.]
---

# VoC trigger moment - Raselio

## Ce que cette passe a trouvé

**Zéro moment déclencheur raconté par un client. Onze achats datés et pas une raison.**

Cette passe est celle où la différence entre une donnée de comportement et une parole de client est la plus facile à confondre, donc je la pose d'entrée.

**Ce que je sais, et qui n'est pas un déclencheur.** Verified sur Shopify : onze commandes entre le 2026-08-26 et le 2026-09-04, une à 39,90 € puis dix à 34,99 €. Le résumé hebdomadaire Shopify du 2026-08-31 montre la répartition de la semaine du 24 au 30 août : lundi 0, mardi 0, mercredi 2, jeudi 1, vendredi 1, samedi 0, dimanche 2. Verified sur Meta : les 6 achats attribués du périmètre Raselio, dont l'équipe note que 100 % viennent d'hommes de 45 ans et plus avec un cœur à 55-64 ans, et 100 % sur mobile pour les achats tracés, stated. Toutes ces lignes disent quand et par qui. Aucune ne dit ce qui se passait ce jour-là dans la vie de l'homme qui a payé.

**Ce que je ne peux pas faire, et que je ne fais pas.** Je ne transforme pas un pic du mercredi en déclencheur. Sur onze commandes, la répartition par jour n'a aucune force statistique, et la méthode est nette : un compte n'est pas une significativité sans dénominateur, et un échantillon sous dix enregistrements ne porte pas de motif stable. Onze commandes réparties sur sept jours, c'est du bruit.

**Pourquoi cette catégorie est particulièrement handicapée ici.** Le prompt dit que le champ de signal comportemental est porteur sur cette passe et qu'il ne devrait presque jamais être nul, parce qu'un déclencheur est par définition un état situationnel. Or `personas-profile.md` n'existe pas encore dans ce cerveau, donc aucun slug de signal n'est disponible. Le champ est nul partout, deux fois : parce qu'il n'y a pas d'enregistrement à taguer, et parce qu'il n'y aurait pas de slug avec lequel le taguer.

**Note de méthode sur le temps.** La lecture de la livraison émotionnelle nomme les quatre phases de l'achat, déclenchement, exploration, évaluation, achat, et rappelle qu'un déclencheur est le point d'entrée dans cette suite. Chez Raselio, le compte publicitaire est aujourd'hui la seule chose qui provoque l'entrée : les 2 431 sessions sur 90 jours viennent très majoritairement du trafic payé. La marque fabrique donc elle-même le déclencheur au lieu de l'attraper, ce qui est courant pour une marque de six semaines et qui a une conséquence pratique : tant qu'aucun client ne raconte un moment vécu, la marque n'a aucun moyen de savoir si elle interrompt bien ou si elle interrompt au hasard.

## Trigger moments

**Aucun. 0 moment capturé sur 0 enregistrement de langage client disponible.**

```yaml
# 0 entrée.
# Aucun récit de moment d'achat par un client de Raselio n'existe au 2026-09-06.
# 11 achats datés, 0 raison connue.
# Schéma en attente : voir voc-pain-phrase.md, même structure, avec category: trigger_moment.
# Rappel : behavioral_signal_tag devrait rarement être nul sur cette passe. Il l'est ici
# par double obligation, aucun enregistrement et aucun slug persona disponible.
```

## Annexe A — Moments déclencheurs mis en scène par la marque

**Ceci n'est pas du langage client.** Ce sont les moments que Raselio imagine, écrit et met en image. `brand_self_echo: true` par construction.

```yaml
- snippet: "Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle, et chaque passage se fait les dents serrées."
  category: brand_projected_trigger
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
  notes: "Le moment pivot de la marque. Il est écrit comme un souvenir partagé, « Vous connaissez ce moment », ce qui est une technique de reconnaissance, pas une observation. Il est à la fois une douleur et un déclencheur, et il est listé dans les deux passes."

- snippet: "Ce soir."
  category: brand_projected_trigger
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 11 du lot du 2026-09-03, texte manuscrit présent sur l'image
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  notes: "Deux mots sur un post-it. C'est le déclencheur le plus concentré du corpus projeté : une soirée prévue impose une préparation. Le titre chargé qui l'accompagne, « Impeccable en 5 minutes sous la douche. », donne le remède au même endroit."

- snippet: "Précisément la semaine où vous auriez préféré être présentable."
  category: brand_projected_trigger
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: page advertorial raselio.com, section 3
    review_id: null
    date: 2026-08-31
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-31
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  notes: "Déclencheur de mauvais timing : l'irritation arrive au pire moment. La marque suppose donc un calendrier social, jamais nommé, et jamais confirmé."

- snippet: "Y compris dans les moments où vous auriez préféré qu'on remarque autre chose."
  category: brand_projected_trigger
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: page advertorial raselio.com, section 5
    review_id: null
    date: 2026-08-31
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-31
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  notes: "Déclencheur intime, formulé par litote. C'est la seule ligne du corpus projeté qui place le moment de bascule dans une situation de couple plutôt que dans la salle de bain."

- snippet: "Elle a remarqué."
  category: brand_projected_trigger
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 17 du lot du 2026-09-03, titre chargé
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  notes: "ATTENTION. Cette créa met en scène une capture de SMS avec « Catherine ❤️ » comme interlocutrice. L'équipe écrit elle-même dans son brief du 2026-09-03 que les créas 16, 17 et 27 utilisent des prénoms fictifs de témoignage à remplacer par de vrais avis. Le titre seul est de la copie de marque et il est listé ici. La conversation attribuée à Catherine relève de la catégorie fabricated-testimonial et n'entre dans aucun bac."

- snippet: "Je remets ça à la semaine prochaine."
  category: brand_projected_trigger
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 20 du lot du 2026-09-03, case à cocher présente sur l'image
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  notes: "Déclencheur inversé : la marque met en scène le report plutôt que le passage à l'acte. Écrit à la première personne, donc à ne surtout pas confondre avec un verbatim. C'est un texte de case à cocher dans une créa."
```

## Annexe B — Moments de catégorie, clients d'autres marques

| Moment de catégorie | Marque dont les clients sont concernés | Source | Statut |
|---|---|---|---|
| Le passage du rasoir à la tondeuse est déclenché par la récurrence des boutons plutôt que par un événement social | catégorie, contenus français Club Cooper et blogs santé | résumé WebSearch, 2026-09-06 | Paraphrase d'outil, pages non ouvertes. Cadre différent de celui que Raselio met en scène, qui est plutôt social et intime |

## Open loops

**1. Onze achats datés au jour près et pas une raison.**

Observation. Onze commandes du 2026-08-26 au 2026-09-04, verified sur Shopify, avec l'heure et le montant, et aucun élément sur ce qui a poussé chacun à acheter ce jour-là.

Pull. **Gap.** Il fired quand j'ai vu que la donnée la plus précise de la marque, l'horodatage à la minute, est aussi la moins parlante.

Question. Qu'est-ce qui se passait dans la vie de ces onze hommes la semaine où ils ont acheté ?

Justification. Un déclencheur réel change le calendrier média, les visuels et le moment de la journée où la marque achète de l'attention. Onze réponses suffiraient à donner une direction.

Territoire. Personas.

**2. La marque fabrique le déclencheur au lieu de l'attraper.**

Observation. 2 431 sessions sur 90 jours, très majoritairement issues du trafic payé, verified sur les référents Shopify. Aucun canal de découverte spontanée n'existe : aucune trace web, aucun social organique, aucun bouche-à-oreille observable.

Pull. **Gap.** Il fired parce qu'une marque qui provoque 100 % de ses entrées ne peut jamais savoir quel moment de vie l'aurait amenée toute seule.

Question. Où et quand un homme cherche-t-il ce produit de lui-même, sans qu'une publicité le lui ait mis sous les yeux ?

Justification. La réponse dit s'il existe une demande de recherche à capter, ce qui ouvrirait un canal moins cher que l'interruption pure à 86 € par acquisition.

Territoire. Produit.

**3. Le moment social que la marque suppose n'a jamais été nommé.**

Observation. Trois entrées du corpus projeté supposent un calendrier social, « la semaine où vous auriez préféré être présentable », « Ce soir. », « Elle a remarqué. » Aucune ne dit quel événement c'est. Verified sur les surfaces lues.

Pull. **Curiosité.** Il fired parce que la marque parle d'un rendez-vous sans jamais dire lequel, et ce flou peut être un choix élégant ou une lacune.

Question. Quels rendez-vous précis, dans la vie d'un homme de 55 ans, font qu'il s'occupe de cette zone cette semaine-là plutôt qu'une autre ?

Justification. Un rendez-vous nommé, vacances, week-end, visite médicale, rendez-vous amoureux, permettrait des campagnes datées au lieu d'une pression constante.

Territoire. Messaging.

---

**Méthodes chargées :** `parker-system/creative-strategy-context/customer-review-mining-method.md`, `parker-system/creative-strategy-context/persona-research-and-creative-strategy-process.md` et `parker-system/creative-strategy-context/emotional-delivery-and-timing.md`, cette dernière pour la définition des quatre phases d'achat qui situe ce qu'un déclencheur est et ce qu'il n'est pas.

This is everything I know about mining customer reviews for creative material.
