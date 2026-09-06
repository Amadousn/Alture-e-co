---
brand: raselio
doc: voc-outcome-phrase
generated_on: 2026-09-06
refresh_by: 2026-12-06
corpus_profile: personas/voice-of-customer/voc-corpus-profile.md
customer_snippets_captured: 0
brand_projected_entries_quarantined: 7
category_theme_entries: 2
corpus_denominator: 0 enregistrement de langage client sur 0 reçu ; 11 acheteurs et 0 retour d'usage écrit
sources_read: [personas/voice-of-customer/voc-corpus-profile.md, source-pulls/shopify-store-and-product.md, source-pulls/drive-30-statiques-meta-plan-2026-09-03.md, source-pulls/drive-30-creas-json-2026-09-03.md, source-pulls/shopify-orders-and-customers.md, source-pulls/gmail-brand-signals.md, sub-context-docs/reputation-analysis.md, WebSearch 2026-09-06]
sources_missing: [customer-reviews, ad-comments, post-purchase-surveys, reddit, other-reviews, organic-social]
persona_slugs_available: aucun. `personas/personas-profile.md` n'existe pas au 2026-09-06
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md]
data_limitations: [Aucun résultat rapporté par un client n'existe. 11 appareils ont été livrés entre le 2026-08-26 et le 2026-09-04 et pas un acheteur n'a écrit un mot sur ce qu'il a obtenu. Conséquence directe et la plus lourde de tout le système VoC : le gouverneur de conformité de revendication ne peut se régler contre rien d'autre que la fiche produit, donc toute promesse de résultat écrite par la marque est non substantiée par l'usage et doit être marquée gated par défaut dans la bibliothèque assemblée. Deux specs de la fiche sont elles-mêmes marquées « à confirmer » par l'équipe, le régime moteur et l'autonomie exacte.]
---

# VoC outcome phrase - Raselio

## Ce que cette passe a trouvé

**Zéro phrase de résultat écrite par un client. Onze appareils livrés, zéro retour d'usage.**

C'est la catégorie où le vide coûte le plus cher, et il faut dire pourquoi.

Une phrase de résultat est la seule chose qui prouve qu'un produit fait ce qu'il promet. C'est aussi la matière contre laquelle le gouverneur de conformité de revendication se règle : la méthode dit qu'un bout de langage magnifique devient inutilisable dès qu'il dépasse la performance réelle du produit, et la seule façon de savoir où est cette limite est de lire ce que les gens rapportent. Chez Raselio, personne ne rapporte rien. Le gouverneur ne peut donc se régler que contre la fiche produit, qui est une déclaration du vendeur, et dont deux lignes sont marquées « à confirmer » par l'équipe elle-même, le régime moteur et l'autonomie exacte.

**La conséquence pratique, écrite clairement pour la passe d'assemblage :** toute promesse de résultat de cette marque est aujourd'hui `gated`, pas `clear`. Pas parce qu'elle est fausse. Parce que rien ne permet de dire qu'elle est vraie.

**La piste de recherche.** Onze commandes entre le 2026-08-26 et le 2026-09-04, verified sur Shopify, 14 fiches clients, 0 client récurrent sur 11, 0 retour demandé, 0 réclamation sur 46 fils Gmail lus. Aucune application d'avis n'est installée, donc aucun acheteur n'a même eu l'occasion d'écrire. Les commentaires publicitaires sous 163 annonces et 1 084 clics n'ont jamais été ouverts. Toutes les surfaces tierces sont refusées par le proxy réseau, y compris aujourd'hui, quatre tentatives, quatre `EGRESS_BLOCKED`.

**Une note sur le zéro réachat.** 0 client récurrent sur 11 n'est pas un signal de mécontentement. Le produit est un appareil à 34,99 € garanti 2 ans, avec un seul SKU au catalogue. Il n'y a rien à racheter. Le champ est donc muet par construction, et le lire comme un résultat négatif serait une erreur.

## Outcome phrases

**Aucune. 0 phrase capturée sur 0 enregistrement de langage client disponible.**

```yaml
# 0 entrée.
# Aucun résultat rapporté par un client de Raselio n'existe au 2026-09-06.
# 11 acheteurs, 0 retour écrit, 0 avis, 0 sondage, 0 commentaire publicitaire lu.
# Schéma en attente de la première source réelle : voir voc-pain-phrase.md, même structure,
# avec category: outcome_phrase.
```

## Annexe A — Résultats promis par la marque

**Ceci n'est pas du langage client. Ce sont les promesses que Raselio écrit, en attente de quelqu'un pour les confirmer.** `brand_self_echo: true` et `confidence: thin` par construction. La colonne notes porte l'état du gouverneur de revendication, et il est `gated` partout, pour la raison donnée plus haut.

```yaml
- snippet: "Résultat : vous respirez normalement. La routine redevient une routine, pas une épreuve."
  category: brand_projected_outcome
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: page advertorial raselio.com /pages/pourquoi-pas-votre-tondeuse-a-barbe, section 2
    review_id: null
    date: 2026-08-31
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-31
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  claims_check: gated
  notes: "Le résultat central de la marque, symétrique exact de sa douleur centrale. Aucun client ne l'a confirmé. Gated tant qu'aucun usage réel n'est rapporté."

- snippet: "Fini le jugé. Vous voyez, donc vous maîtrisez."
  category: brand_projected_outcome
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: page advertorial raselio.com, section 4
    review_id: null
    date: 2026-08-31
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-31
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  claims_check: gated
  notes: "Résultat de visibilité, adossé à une caractéristique matérielle vérifiable, la LED intégrée. C'est le résultat projeté le plus facile à substantier le jour où un client écrit, parce qu'il est binaire : on voit ou on ne voit pas."

- snippet: "0 coupure. 0 stress. 100 % contrôle."
  category: brand_projected_outcome
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 06 du lot du 2026-09-03, titre chargé et texte présent sur l'image
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  claims_check: gated
  notes: "Revendication absolue, « 0 coupure », reprise en garantie dans la créa 18, « Zéro coupure. Ou remboursé. » Une revendication absolue sans un seul retour d'usage est le cas d'école que le gouverneur de revendication existe pour attraper. À ne pas passer en copie sans substantiation."

- snippet: "C'est exactement la différence entre « je me suis rasé » et « je suis entretenu ». La seconde version est celle qui fait bonne impression de près."
  category: brand_projected_outcome
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
  claims_check: gated
  notes: "Le seul résultat projeté qui porte un changement d'identité plutôt qu'un changement de sensation. Il chevauche l'aspiration et il est repris dans voc-aspirational."

- snippet: "Vous mettez toutes les chances de votre côté pour que la zone reste comme vous la voulez : impeccable."
  category: brand_projected_outcome
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
  claims_check: gated
  notes: "« Impeccable » est le mot de résultat le plus répété du corpus projeté : il apparaît dans 6 des 30 titres du lot du 2026-09-03, stated d'après le manifeste. Dénominateur : 6 sur 30. C'est une mesure de la répétition de la marque, pas de l'adoption par le client."

- snippet: "Quand c'est aussi simple, vous le faites vraiment. Et régulièrement."
  category: brand_projected_outcome
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: page advertorial raselio.com, section 6
    review_id: null
    date: 2026-08-31
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-31
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  claims_check: gated
  notes: "Résultat de changement d'habitude, celui qui demanderait le plus de recul pour être vérifié. Un retour à trente jours le dirait, un retour à trois jours non."

- snippet: "Avec Raselio : moins d'accrocs, moins d'irritations et une peau respectée, même sur les zones les plus fragiles."
  category: brand_projected_outcome
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: landing raselio.com /pages/7-raisons, bloc produit
    review_id: null
    date: 2026-09-06
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-06
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  claims_check: gated
  notes: "Formulation comparative prudente, « moins de », plutôt qu'absolue. C'est la version la plus défendable du même résultat, et celle qui passerait le gouverneur en premier si un jour il pouvait se régler."
```

**Une revendication à part, qui n'est pas une promesse de résultat mais une affirmation de preuve.** La FAQ de la landing écrit : « La majorité de nos clients constatent nettement moins de rougeurs et de démangeaisons qu'avec un rasoir. » Verified sur l'export du 2026-09-06. Il y a onze clients et aucun n'a constaté quoi que ce soit par écrit. Cette phrase n'est pas un résultat projeté, c'est une affirmation sur des clients qui n'ont pas parlé. Elle est classée `unusable` et elle doit être corrigée sur le site avant d'être discutée comme matériau créatif.

## Annexe B — Thèmes de résultat de la catégorie, clients d'autres marques

| Thème de résultat | Marque dont les clients sont concernés | Source | Statut |
|---|---|---|---|
| Passer du rasoir à la tondeuse avec sabot réduit nettement les boutons et les poils incarnés récurrents | catégorie, contenus français Club Cooper et Braun | résumé WebSearch, requête lancée le 2026-09-06 | Paraphrase d'outil, page non ouverte |
| L'absence de coupure et d'accroc est le résultat que les acheteurs citent en premier | Meridian, Manscaped | résumé WebSearch de pages marchandes et d'avis | Paraphrase d'outil. Des fragments entre guillemets attribués à des acheteurs vérifiés remontent dans ce résumé, sans date, sur des pages contrôlées par les marques, et n'ont pas pu être relus à la source. Traités comme non vérifiés et non repris comme citations |

## Open loops

**1. Ce que les onze premiers acheteurs ont réellement obtenu.**

Observation. Onze appareils livrés entre le 2026-08-26 et le 2026-09-04, verified, et zéro phrase sur le résultat. La marque promet « 0 coupure » et « vous respirez normalement » sans qu'aucun utilisateur n'ait dit si c'était vrai.

Pull. **Gap.** Il fired quand j'ai vu que la marque écrit une revendication absolue, « 0 coupure », avec un dénominateur d'usage rapporté de zéro.

Question. Qu'obtiennent réellement les hommes qui ont utilisé cette tondeuse pendant trois semaines ?

Justification. C'est la seule information qui permettrait de régler le gouverneur de revendication. Sans elle, chaque promesse de la marque est un risque de conformité autant qu'un pari créatif.

Territoire. Produit.

**2. Le résultat le plus facile à prouver est aussi celui que la marque met le moins en avant.**

Observation. Le résultat de visibilité, « Vous voyez enfin ce que vous rasez », s'adosse à une pièce matérielle, la LED, et il est binaire. Il ne porte que 2 des 30 fiches créa du 2026-09-03, contre 6 pour l'appréhension, stated d'après le manifeste.

Pull. **Surprise.** Il fired sur le décalage entre la facilité de preuve d'un résultat et la place que la marque lui donne.

Question. Pourquoi la marque mise-t-elle davantage sur un résultat de sensation que sur un résultat qu'un client peut constater directement ?

Justification. Si le résultat facile à prouver convertit aussi bien, il permettrait de bâtir la première preuve sociale honnête de la marque plus vite que n'importe quel autre angle.

Territoire. Messaging.

**3. Le zéro réachat sur onze acheteurs.**

Observation. 0 client récurrent sur 11, verified. Le catalogue ne compte qu'un SKU et l'appareil est garanti 2 ans, donc il n'y a rien à racheter.

Pull. **Curiosité.** Il fired parce qu'un compteur à zéro qui n'est ni bon ni mauvais signal est exactement le genre de chiffre qu'un lecteur pressé lira de travers.

Question. Que peut acheter ensuite un homme satisfait de cette tondeuse ?

Justification. La réponse détermine s'il existe une valeur vie à défendre ou si l'économie de cette marque est entièrement dans la première vente, ce qui change le seuil de coût par acquisition acceptable.

Territoire. Produit.

Boucle réservée à la marque : la boucle 3, seule l'équipe connaît sa feuille de route produit.

---

**Méthodes chargées :** `parker-system/creative-strategy-context/customer-review-mining-method.md` et `parker-system/creative-strategy-context/persona-research-and-creative-strategy-process.md`, lues avant l'analyse. Le gouverneur de conformité de revendication et le gouverneur de voix, la règle du dénominateur, la règle de la date, le marquage d'écho et le marquage d'ère ont été appliqués à chaque entrée.

This is everything I know about mining customer reviews for creative material.
