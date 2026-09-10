---
brand: raselio
doc: voc-pain-phrase
generated_on: 2026-09-06
refresh_by: 2026-12-06
corpus_profile: personas/voice-of-customer/voc-corpus-profile.md
customer_snippets_captured: 0
brand_projected_entries_quarantined: 9
category_entries: 5
corpus_denominator: 2 enregistrements de langage client lus sur 2 existants, tirés de Parker le 2026-09-06, dont 1 seul porte du langage exploitable ; ni l'un ni l'autre n'est une phrase de douleur. Surface de diffusion : 163 annonces Raselio, 43 270 impressions, 1 084 clics, 2 431 sessions, 11 commandes
sources_read: [Parker MCP brand_id a81e7c77-ca41-4cbd-acf8-ec27ea58eb37 — search_facebook_ad_comments_sql et semantic (2 lignes), search_customer_reviews_sql et semantic (0), semantic_search_post_purchase_survey (0), get_brand_persona, appelés le 2026-09-06, personas/voice-of-customer/voc-corpus-profile.md, source-pulls/shopify-store-and-product.md, source-pulls/drive-30-statiques-meta-plan-2026-09-03.md, source-pulls/drive-30-creas-json-2026-09-03.md, source-pulls/drive-9-ads-statiques-prompts-2026-08-23.md, source-pulls/gmail-brand-signals.md, sub-context-docs/reputation-analysis.md, sub-context-docs/community-and-forums.md, sub-context-docs/customer-journey-and-persona-discovery.md, WebSearch 2026-09-06]
sources_missing: [customer-reviews, ad-comments, post-purchase-surveys, reddit, other-reviews, organic-social]
persona_slugs_available: aucun. `personas/personas-profile.md` n'existe pas au 2026-09-06, donc tous les identity_tag et behavioral_signal_tag sont null par obligation et non par jugement
methods_loaded: [creative-strategy-context/customer-review-mining-method.md, creative-strategy-context/persona-research-and-creative-strategy-process.md]
data_limitations: [Aucune phrase de douleur écrite par un client de Raselio n'existe et aucune n'a donc été capturée. Le corpus client entier compte 2 enregistrements, tirés en direct de Parker le 2026-09-06, deux commentaires publicitaires, et aucun des deux ne nomme une douleur. Les autres surfaces sont vides et l'absence est confirmée par l'outil et non déduite : 0 avis, 0 sondage post-achat, aucun outil Reddit dans cette installation, 0 verbatim de forum sur 13 lectures refusées le 2026-09-06 plus 4 refusées pour cette passe, 0 message client dans 46 fils Gmail. Les tags identité et signal comportemental sont tous null parce qu'aucun slug persona n'existe encore dans personas-profile.md. La récurrence est plafonnée à 1 par construction sur un dénominateur de 2. La matière textuelle volumineuse est écrite par la marque et rangée en annexe A, hors du bac client, avec brand_self_echo à true. Le langage de catégorie vient de deux sources incomplètes : des thèmes résumés par WebSearch, et des citations sans marque, sans date et sans lien tirées du document de contexte de marque Parker.]
---

# VoC pain phrase - Raselio

## Ce que cette passe a trouvé

**Zéro phrase de douleur écrite par un client. Le corpus client entier compte deux lignes, et aucune des deux ne nomme une douleur.**

Voici comment j'y arrive, source par source, parce que le résultat n'a de valeur que si la piste est vérifiable.

**J'ai interrogé les sources, je n'ai pas déduit leur absence.** La marque existe désormais dans Parker MCP, brand_id `a81e7c77-ca41-4cbd-acf8-ec27ea58eb37`, ce qui n'était pas le cas quand les premières passes de ce build ont tourné. Les outils ont donc été appelés pour de vrai le 2026-09-06.

Commentaires publicitaires : `search_facebook_ad_comments_sql` renvoie `total: 2`, confirmé par la passe sémantique qui déclare `totalCommentsAnalyzed: 2`. C'est le corpus complet, pas un échantillon. Les deux lignes sont « Plus rien de la bête sauvage qui sommeille en nous. » du 2026-08-31 et « Lol » du 2026-09-01. Ni l'une ni l'autre ne nomme une douleur : la première construit une image et porte une résistance, elle est capturée dans `voc-metaphor.md` et `voc-objection.md` ; la seconde fait trois caractères.

Avis : `search_customer_reviews_sql` et sa version sémantique renvoient 0, avec un message explicite de l'outil disant que la base ne contient aucun avis pour cette marque et que ce n'est pas un problème d'accès. Sondages post-achat : `semantic_search_post_purchase_survey` renvoie `totalResponsesForBrand: 0`. Reddit : aucun outil Reddit n'existe dans cette installation Parker, c'est une capacité absente et non un accès refusé. Historique de conversations Parker : 0 fil.

Réputation tierce : six requêtes de marque le 2026-09-06 ne renvoient aucune page qui mentionne Raselio. Forums et avis marketplace : treize lectures directes refusées le 2026-09-06, quatre de plus refusées pour cette passe, dont Wikipédia, ce qui montre que le blocage est global. Compte publicitaire : la copie existe, mais c'est la marque qui l'écrit, et la méthode dit explicitement de surveiller cette source le plus durement pour l'écho de marque.

**Le fait qui compte le plus dans cette liste.** Deux commentaires pour 43 270 impressions et 1 084 clics, soit 0,046 commentaire pour mille impressions, zéro like et zéro réponse de la marque. Les gens voient ces publicités et ne réagissent pas. Sur un échantillon aussi mince, je le note comme une observation et pas comme un diagnostic, mais c'est la vraie forme du silence de cette marque : pas un accès bloqué, une absence d'écho.

**Le seul message entrant du périmètre n'est pas un client.** Verified. Un message de formulaire reçu le 2026-08-26, signé « Sodiq », demande « Hello, can i know when you will ship if a customer should order today? ». Les quatre messages suivants du même fil sont une offre commerciale de « Emprofit Solution » à faire croître la boutique contre 2 % de commission. C'est du démarchage. Ce message n'entre pas dans le corpus et il est nommé ici pour qu'aucun run futur ne le repêche comme la première phrase de client de la marque.

**Le dénominateur, posé une fois pour toutes.** 0 phrase de douleur client sur 2 enregistrements de langage client lus. Deux, c'est le corpus entier, pas un échantillon. Aucune récurrence supérieure à 1 n'est possible sur deux lignes, donc aucun motif de douleur ne peut être établi, et aucun ne l'est. La surface de diffusion derrière ce dénominateur est de 163 annonces, 43 270 impressions, 1 084 clics, 2 431 sessions sur 90 jours et 11 commandes. Onze acheteurs, zéro mot d'eux : les deux seuls mots que la marque possède viennent de gens qui n'ont pas acheté.

**Pourquoi je ne remplis pas le bac avec la copie de la marque, alors qu'elle est bonne.** La règle de la passe est écrite noir sur blanc : la description de la douleur par la marque ne qualifie pas, sauf si un vrai client l'a reprise à son compte, et une phrase qui n'apparaît que dans de la copie de marque est un écho, pas une phrase de douleur client. Ici, aucune de ces phrases n'apparaît ailleurs que dans de la copie de marque, parce qu'il n'existe aucun autre endroit où elles pourraient apparaître. La condition d'entrée n'est donc pas remplie une seule fois, et le bac reste vide.

Le risque de faire autrement est concret et il est déjà présent dans les documents de l'équipe. La créa 16 fait dire à « Hervé D. · Achat vérifié ★★★★★ » : « Franchement, je retenais mon souffle à chaque passage. » Cette phrase a la forme exacte d'une pépite. Elle en a le rythme, la spécificité, la charge émotionnelle. Elle est inventée, l'équipe l'écrit elle-même dans son brief du 2026-09-03. Si une passe VoC accepte de la copie de marque dans le bac client, c'est exactement ce genre de ligne qui finit par revenir dans six mois présentée comme la voix d'un client.

**Ce que ça veut dire pour le prochain run.** La douleur que Raselio vend, l'appréhension avant le passage de la lame, est une hypothèse. Elle est plausible, elle est cohérente, la catégorie la connaît. Elle n'a jamais été prononcée par un client de cette marque. La distance entre « plausible » et « prononcé » est tout le travail qui reste.

## Pain phrases

**Aucune. 0 phrase capturée sur 2 enregistrements de langage client lus.**

Le bac est vide après interrogation, pas par défaut d'accès. Le schéma reste posé ci-dessous pour que la prochaine passe sache exactement dans quelle forme verser ce qu'elle trouvera, et pour qu'il soit visible qu'aucun champ n'a été rempli par déduction.

```yaml
# 0 entrée.
# Corpus client interrogé le 2026-09-06 via Parker : 2 commentaires publicitaires au total.
# Aucun des deux ne nomme une douleur. « Lol » ne porte aucun langage ; « Plus rien de la
# bête sauvage qui sommeille en nous. » construit une image et porte une résistance, elle est
# capturée dans voc-metaphor.md et voc-objection.md, pas ici.
# Schéma en attente de la prochaine source réelle :
# - snippet: [verbatim exact du client]
#   category: pain_phrase
#   identity_tag: null        # aucun slug disponible, personas-profile.md n'existe pas
#   behavioral_signal_tag: null
#   source:
#     type: [review | ad-comment | post-purchase-survey | brand-reputation | reddit | other-review | ad-account]
#     platform: null
#     review_id: null
#     date: null
#     url: null
#   recurrence: null          # aucun dénominateur de langage client n'existe
#   source_diversity: []
#   first_seen: null
#   last_seen: null
#   confidence: null
#   brand_self_echo: null
#   notes: null
```

## Annexe A — Langage de douleur projeté par la marque

**Ceci n'est pas du langage client. C'est ce que Raselio suppose que son client ressent, écrit par Raselio.** Chaque entrée porte `brand_self_echo: true` par construction, `confidence: thin` par construction, et ne doit jamais être citée comme la parole d'un client. Sa valeur est d'être une hypothèse précise, datée et testable : quand les commentaires publicitaires seront enfin lus, cette liste dira si la marque a visé juste.

```yaml
- snippet: "Vous connaissez ce moment. La tondeuse approche, vous retenez votre souffle, et chaque passage se fait les dents serrées."
  category: brand_projected_pain
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
  notes: "Copie de marque, jamais prononcée par un client. C'est la phrase pivot de tout le positionnement : elle réapparaît en titre de créa, « 58 ans. Fini de retenir ma respiration. » créa 27, en garantie, « Si vous retenez encore votre respiration à chaque passage, on vous rembourse » créa 12, et en meme, « Il y a deux types d'hommes » créa 22. Dénominateur : elle apparaît sous une forme ou une autre dans 6 des 30 fiches créa du 2026-09-03, stated d'après le manifeste de l'équipe. Six sur trente, c'est la mesure de la conviction de la marque, pas de celle du client."

- snippet: "Personne n'en parle, mais tout le monde la connaît : cette micro-hésitation avant de poser la lame. Ce réflexe de contracter tout le corps."
  category: brand_projected_pain
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
  notes: "La marque affirme ici l'universalité de la douleur, « tout le monde la connaît », sans aucune donnée. C'est l'affirmation la plus exposée du corpus projeté et celle qui gagnerait le plus à être vérifiée dans les commentaires publicitaires."

- snippet: "Vous faites l'effort de vous entretenir. Et 72 heures plus tard, la zone est couverte de petits boutons rouges et de poils incarnés."
  category: brand_projected_pain
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
  notes: "La fenêtre de 72 heures est le seul chiffre spécifique du corpus projeté de douleur, et c'est aussi le seul point où le langage de catégorie converge, voir l'annexe B. C'est donc l'hypothèse la mieux étayée du lot, sans être pour autant une phrase de client de Raselio."

- snippet: "Ça pique 3 jours après ? Vous rasez trop court."
  category: brand_projected_pain
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 15 du lot du 2026-09-03, titre chargé
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  notes: "Version courte de la douleur précédente, écrite pour un titre. La marque note elle-même dans son brief que la headline en cours était « Ça pique à la repousse ? », donc la formulation bouge encore."

- snippet: "Soyons honnêtes : cette zone, vous ne la voyez jamais entièrement. Vous devinez, vous passez la tondeuse au jugé, et vous vérifiez du bout des doigts en espérant que c'est régulier."
  category: brand_projected_pain
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
  notes: "Douleur de visibilité. Reprise en créa 14, « Vous voyez enfin ce que vous rasez. », et en créa 30 avec l'angle presbytie, « Passé 50 ans, on voit moins bien de près. »"

- snippet: "Deux jours de peau lisse, puis une semaine de repousse dure qui gratte, qui pique, et qui se remarque. Y compris dans les moments où vous auriez préféré qu'on remarque autre chose."
  category: brand_projected_pain
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
  notes: "La seule entrée du corpus projeté qui lie la douleur physique à une gêne sociale et intime. Elle porte la charge émotionnelle la plus forte et elle est aussi la plus invérifiable sans parole de client."

- snippet: "Ce n'est pas la flemme. C'est la logistique : s'installer dans la salle de bain, trouver le bon moment, et finir par retrouver des poils sur le lavabo. Que quelqu'un d'autre risque de voir avant vous."
  category: brand_projected_pain
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
  notes: "Douleur de friction et de gêne domestique. C'est l'angle le moins repris dans les créas, une seule des 30 fiches le porte, ce qui en fait la douleur projetée la moins testée du lot."

- snippet: "Vous retenez votre souffle. Vous vérifiez au toucher. Ça pique 3 jours après. Si vous vous reconnaissez dans deux de ces signes, ce n'est pas vous le problème : c'est l'outil."
  category: brand_projected_pain
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: Meta, créa 19 du lot du 2026-09-03, texte principal
    review_id: null
    date: 2026-09-03
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-09-03
  last_seen: 2026-09-06
  confidence: thin
  brand_self_echo: true
  notes: "La marque a elle-même compilé sa liste de douleurs en six signes : retenir son souffle, vérifier au toucher, ça pique trois jours après, petites coupures, poils incarnés, remettre à demain. C'est le résumé le plus utile du corpus projeté, et le meilleur questionnaire à poser à de vrais clients."

- snippet: "TU RETIENS TA RESPIRATION À CHAQUE PASSAGE."
  category: brand_projected_pain
  identity_tag: null
  behavioral_signal_tag: null
  source:
    type: ad-account
    platform: document équipe « 9 ads statiques + prompts », concept AD 2.1, texte visible
    review_id: null
    date: 2026-08-23
    url: null
  recurrence: null
  source_diversity: [ad-account]
  first_seen: 2026-08-23
  last_seen: 2026-08-23
  confidence: thin
  brand_self_echo: true
  notes: "Ère tutoiement. Ce lot du 2026-08-23 visait « Kevin, 27 ans » et parlait à la deuxième personne du singulier. Le lot du 2026-09-03 vouvoie et vise 45 ans et plus. La même douleur a donc été écrite deux fois pour deux clients supposés différents en onze jours, ce qui montre à quel point le langage de douleur de cette marque est un pari mouvant et non une observation."
```

## Annexe B — Douleur de la catégorie, clients d'autres marques

**Deux sources, toutes deux incomplètes, aucune n'est un client de Raselio.**

**B1. Citations de catégorie tirées du document de contexte de marque Parker.** `get_brand_persona`, appelé le 2026-09-06, renvoie un document qui contient des phrases entre guillemets et qui dit lui-même d'où elles viennent : « Based on competitive review analysis and category-level customer language ». Ce sont donc des avis de clients d'autres marques, en anglais. Aucune ne porte le nom de sa marque, aucune ne porte de date, aucune ne porte de lien. La méthode dit qu'une citation sans date est une preuve affaiblie ; ici il manque aussi la marque et la source. Elles sont `stated`, `thin`, provenance incomplète, et ne peuvent servir ni de preuve ni de citation attribuable.

| Verbatim | Douleur qu'il porte | Convergence avec ce que Raselio projette |
|---|---|---|
| « Taking any type of razor or trimmer to your nether regions can be daunting and time consuming. » | Appréhension, et perte de temps | Forte sur l'appréhension. **La perte de temps est une douleur que Raselio ne nomme nulle part** |
| « I'm sure many men can relate to finishing a trim session with a few nicks and cuts. » | Coupures, formulées comme une expérience partagée | Forte. C'est presque exactement l'argument de la créa 06, « 0 coupure » |
| « Worried about cutting myself » et « fear of pain » | Peur de se blesser, à l'état brut | Forte. C'est le socle du positionnement de Raselio |
| « Using a beard trimmer for everything » et « felt like the wrong tool » | Frustration de l'outil inadapté | Très forte. C'est l'argument central de la marque, et c'est la seule convergence qui vaut d'être notée comme un appui réel |
| « I've tried traditional razors and other electric razors » | Langage des alternatives ratées | Moyenne. Raselio attaque la tondeuse à barbe et parle peu du rasoir jetable |

**B2. Thèmes résumés par WebSearch, aucun verbatim.** Toute lecture directe du web est refusée par le proxy réseau : quatre tentatives le 2026-09-06, quatre `EGRESS_BLOCKED`, dont Wikipédia. Ces lignes ne sont pas des citations.

| Thème de douleur | Marque dont les clients sont concernés | Source | Statut |
|---|---|---|---|
| La peur de la coupure et de l'accroc dans la zone sensible domine ce que les acheteurs disent chercher | Manscaped Lawn Mower 5.0 | résumé WebSearch de pages d'avis Best Buy et Walmart, requête lancée le 2026-09-06 | Paraphrase d'outil. Pages non ouvertes, EGRESS_BLOCKED |
| Les démangeaisons se déclarent 24 à 72 heures après le rasage, au moment de la repousse, et le poil coupé en biseau est désigné comme la cause | catégorie, contenus Braun et Gillette France | résumé WebSearch, requête française lancée le 2026-09-06 | Paraphrase d'outil. Converge avec la fenêtre de 72 heures que Raselio met en avant |
| La lame émoussée est désignée comme la vraie cause des coupures, plus souvent que la technique de l'utilisateur | Philips OneBlade, Manscaped | résumé WebSearch de tests et comparatifs, 2026-09-06 | Paraphrase d'outil. Converge avec l'angle « Ce n'est pas votre peau. C'est la lame. » de Raselio |

**Ce que j'en fais, et ce que je n'en fais pas.** J'en fais une note de convergence. Plusieurs des douleurs que Raselio projette, la peur de se couper, le mauvais outil, la fenêtre de trois jours et la responsabilité de la lame, existent bien comme repères dans la conversation de catégorie. Une seule douleur du langage de catégorie n'apparaît nulle part chez Raselio : le temps que ça prend. Je n'en fais pas une validation. Ces thèmes et ces citations viennent de clients d'autres marques, en anglais pour la plupart, sans marque nommée, sans date et sans texte source relu. Ils rendent l'hypothèse de Raselio plus crédible. Ils ne la prouvent pas.

## Open loops

**1. Les publicités de cette marque ne provoquent presque aucune réaction écrite.**

Observation. Les 163 annonces Raselio ont porté 43 270 impressions et 1 084 clics entre le 2026-08-10 et le 2026-09-06, verified sur le compte, et le corpus de commentaires que Parker renvoie compte exactement 2 lignes, zéro like, zéro réponse. Soit 0,046 commentaire pour mille impressions.

Pull. **Surprise.** Il fired quand la source que je croyais fermée s'est ouverte et n'a rendu que deux lignes : je m'attendais à un corpus non lu, j'ai trouvé un corpus quasi inexistant.

Question. Pourquoi ces publicités ne font-elles réagir personne par écrit ?

Justification. Si le format statique est la cause, la marque a un levier de format à essayer. Si c'est le sujet, trop intime pour commenter sous son vrai nom, alors les commentaires ne seront jamais une source de langage pour cette marque et il faut aller chercher ailleurs, dans un sondage post-achat par exemple.

Territoire. Messaging.

**2. La douleur que la marque met au centre, l'appréhension avant le passage.**

Observation. « Vous retenez votre souffle » est la phrase pivot de Raselio : elle porte l'advertorial, six des trente fiches créa du 2026-09-03, la garantie et un meme. Elle n'a jamais été prononcée par un client de cette marque, verified, puisqu'aucun client n'a écrit un mot.

Pull. **Tension.** Il fired sur l'écart entre le poids que la marque donne à cette phrase, six créas sur trente, et le nombre de fois où un client l'a dite, zéro sur zéro.

Question. Qu'est-ce qui, chez un homme de 55 ans qui achète cette tondeuse, pèse le plus au moment de décider ?

Justification. Si l'appréhension n'est pas ce qui pèse le plus, la marque a construit tout son messaging sur une douleur secondaire, et le levier réel est ailleurs, peut-être dans la visibilité ou dans la repousse.

Territoire. Personas.

**3. Le décalage de registre entre les deux lots de créas, à onze jours d'écart.**

Observation. Le lot du 2026-08-23 tutoie et vise « Kevin, 27 ans ». Le lot du 2026-09-03 vouvoie et vise 45 ans et plus. La même douleur, retenir sa respiration, est écrite deux fois pour deux clients supposés différents, stated d'après les deux documents de l'équipe.

Pull. **Surprise.** Il fired parce que je ne m'attendais pas à voir le client supposé changer de génération en onze jours sans qu'un seul mot de client réel soit intervenu entre les deux.

Question. Qu'est-ce qui a fait basculer la marque d'un client de 27 ans à un client de 55 ans ?

Justification. Si la bascule vient des seuls chiffres d'achat, elle est solide et il faut la pousser. Si elle vient d'une intuition, la prochaine bascule sera aussi rapide et le messaging ne se stabilisera jamais.

Territoire. Personas.

**4. Le vide de collecte, alors que onze appareils sont livrés.**

Observation. Onze commandes livrées entre le 2026-08-26 et le 2026-09-04, verified, et aucun dispositif ne demande à ces onze acheteurs ce qu'ils en pensent. Aucune application d'avis, aucun e-mail post-achat de sondage, aucun formulaire.

Pull. **Gap.** Il fired quand j'ai vu que la marque affiche « 1 734 avis » sur sa landing et n'a rien mis en place pour en obtenir un seul.

Question. Qu'est-ce qui empêche aujourd'hui la marque de demander un retour à ses onze premiers acheteurs ?

Justification. Onze retours, c'est peu, mais c'est la différence entre un corpus vide et un corpus. Le premier verbatim réel change plus le travail créatif que trente créas de plus.

Territoire. Produit.

Boucle réservée à la marque : la boucle 4 ne peut être fermée que par Dylan, puisqu'elle porte sur une décision d'outillage de la boutique.

---

**Méthodes chargées :** `parker-system/creative-strategy-context/customer-review-mining-method.md` et `parker-system/creative-strategy-context/persona-research-and-creative-strategy-process.md`, lues avant l'analyse. Appliquées ici : les trois détecteurs séparés, la règle qu'un compte n'est pas une significativité sans dénominateur, la règle qu'une citation sans date est une preuve affaiblie, la liste d'exclusion dont la ligne sur le langage de marque renvoyé à la marque, le marquage d'écho, le marquage d'ère, la discipline de couverture de sources et la discipline d'intégrité des données.

This is everything I know about mining customer reviews for creative material.
