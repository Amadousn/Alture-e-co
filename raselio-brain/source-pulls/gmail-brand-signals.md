---
brand: Raselio
source: Gmail (founder business inbox) — brand-related threads, Shopify order notifications, vendor/platform emails
pulled_on: 2026-09-06
tool: mcp__Gmail__search_threads, mcp__Gmail__get_thread (messageFormat PLAIN_TEXT)
claim_status: verified   # direct observation from the tool
window: inbox history 2026-07-26 → 2026-09-06 (oldest matching thread is 2026-07-26; store created 2026-07-23)
notes: Query `raselio OR cutlab` returned 46 threads in one page with no nextPageToken (resultCountEstimate 46) — exhausted. Query `from:shopify subject:(commande OR order)` matched only 2 Shopify marketing emails (order notifications are sent from t.shopifyemail.com, not shopify.com), so a second count query `subject:"Commande #" from:shopifyemail.com` was run. No thread in the inbox is a genuine customer review, return request, or complaint: the only contact-form message is a vendor pitch; the "DMCA" notice is from a non-Meta sender domain. Customer names in order-notification subjects reduced to first name + last initial; the shipping address and phone in the one order-notification body pulled were omitted. Full email addresses are shown only for the store's own support/business mailboxes and third-party vendors, never for customers.
---

# 1. Thread list — query `raselio OR cutlab` (pageSize 50, page 1 of 1)

46 threads. Date = first message date (UTC). Multi-message threads are marked with the message count.

| # | thread id | date | sender domain | subject | snippet (one line) |
|---|---|---|---|---|---|
| 1 | 1a0751b1b653110c | 2026-09-06T05:05:05Z | slack-mail.com | Real Simple Labs invited you to work together in Slack | Real Simple Labs invited you to work together 1 unread message in #parker-dylan-s-org-raselio Invited by real-simple-labs.slack.com ACCEPT INVITATION Free and no setup required. This invitation expires |
| 2 | 1a06cc2f38e7e716 | 2026-09-04T14:11:50Z | t.shopifyemail.com | [Raselio] Commande #1011 placée par Philippe M. | … a passé la commande #1011 le Sep 04 à 4:11 pm. Afficher la commande Résumé de la commande Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: Electric intimate hair removal device 34,99€ |
| 3 | 1a06afa8859b9324 | 2026-09-04T05:53:17Z | t.shopifyemail.com | [Raselio] Commande #1010 placée par Denis C. | … a passé la commande #1010 le Sep 04 à 7:53 am. Afficher la commande Résumé de la commande Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: Electric intimate hair removal device 34,99€ Sous- |
| 4 | 1a066c26d4ecc2fd | 2026-09-03T10:13:32Z | shopify.com | Les paramètres de 8piiys-jj.myshopify.com ont été modifiés | Raselio 3 septembre 2026 Paramètres de la boutique modifiés La modification suivante a été apportée récemment à votre boutique https://8piiys-jj.myshopify.com/admin : dylan ulry a modifié l'e-mail |
| 5 | 1a066b717d2db441 (3 msgs) | 2026-09-03T10:01:07Z / 10:02:36Z / 10:06:36Z | shopify.com | Une demande de changement d'e-mail a été effectuée | L'adresse e-mail de contact de votre boutique Shopify a été remplacée par Raseliopro@gmail.com — then Raseliosupport@gmail.com — then raseliosupport@gmail.com. Si vous n'êtes pas à l'origine de ce changement, annulez-le et contactez l'assistance |
| 6 | 1a0667e38f527a83 | 2026-09-03T08:59:02Z | t.shopifyemail.com | [Raselio] Commande #1009 placée par Jamin M. | … a passé la commande #1009 le Sep 03 à 10:59 am. … Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: Electric intimate hair removal device 34,99€ Sous- |
| 7 | 1a06418b1ae27bd9 | 2026-09-02T21:48:54Z | shopify.com | Vous êtes éligible aux versements rapides | Bonne nouvelle ! Vous êtes éligible à recevoir vos versements plus rapidement sur les ventes effectuées via Shopify de la part de Raselio. Pour les transactions réalisées après le 2026-09-02, les |
| 8 | 1a063e199e020f6d | 2026-09-02T20:48:43Z | t.shopifyemail.com | [Raselio] Commande #1008 placée par Michel M. | … a passé la commande #1008 le Sep 02 à 10:48 pm. … Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: Electric intimate hair removal device 34,99€ |
| 9 | 1a05c397e30132c1 | 2026-09-01T09:07:46Z | t.shopifyemail.com | [Raselio] Commande #1007 placée par Hervé F. | … a passé la commande #1007 le Sep 01 à 11:07 am. … Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: Electric intimate hair removal device 34,99€ |
| 10 | 1a05bcc4211120d8 (2 msgs) | 2026-09-01T07:08:27Z / 07:08:53Z | parcelpanel.net | Your monthly CWILL Tracking report for Aug 1, 2026 - Aug 31, 2026 | CWILL Your Monthly Report Aug 1, 2026 - Aug 31, 2026 Hi, this is your monthly report for www.raselio.com, have a check 😘 6 Total shipments - Lookups Shipments Delivery performance - Valid tracking - (2nd msg: same report for aerozya.com, 3 Total shipments) |
| 11 | 1a05715f4bd44ebd | 2026-08-31T09:10:51Z | shopify.com | Dans la poche : 6 commandes cette semaine | Commandes de la semaine de Raselio 24 août 2026 - 30 août 2026 Ventes totales 215 € Visites 470 95,8% Conversion 0,64% Total des commandes 6 lun. 0 mar. 0 mer. 2 jeu. 1 ven. 1 sam. 0 dim. 2 Meilleures |
| 12 | 1a0526e243d65654 | 2026-08-30T11:29:03Z | t.shopifyemail.com | [Raselio] Commande #1006 placée par Jean Luc V. | … a passé la commande #1006 le Aug 30 à 1:29 pm. … Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: CUTLAB-TRIM-SOLO 34,99€ Sous-total 34,99€ |
| 13 | 1a05253d0fcc6a91 | 2026-08-30T11:00:16Z | shopify.com | Compte de paiement modifié — Prochain versement dans 1 jour(s) ouvré(s) | Le compte sur lequel sont versés les paiements en EUR pour Raselio a récemment été modifié. Votre prochain versement sera retenu pendant 1 jours ouvrés afin de protéger votre compte, puis déposé le 31 |
| 14 | 1a0518aecece8c72 | 2026-08-30T07:20:53Z | t.shopifyemail.com | [Raselio] Commande #1005 placée par De Oliveira A. | … a passé la commande #1005 le Aug 30 à 9:20 am. … Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: CUTLAB-TRIM-SOLO 34,99€ Sous-total 34,99€ |
| 15 | 1a04d2d6fbc67a25 | 2026-08-29T11:00:17Z | shopify.com | Compte de paiement modifié — Prochain versement dans 2 jour(s) ouvré(s) | Le compte sur lequel sont versés les paiements en EUR pour Raselio a récemment été modifié. Votre prochain versement sera retenu pendant 2 jours ouvrés afin de protéger votre compte, puis déposé le 31 |
| 16 | 1a04807189ae504c | 2026-08-28T11:00:18Z | shopify.com | Compte de paiement modifié — Prochain versement dans 3 jour(s) ouvré(s) | … retenu pendant 3 jours ouvrés afin de protéger votre compte, puis déposé le 31 |
| 17 | 1a046d2dd4a6788d | 2026-08-28T05:23:39Z | t.shopifyemail.com | [Raselio] Commande #1004 placée par W B. | … a passé la commande #1004 le Aug 28 à 7:23 am. … Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: CUTLAB-TRIM-SOLO 34,99€ Sous-total 34,99€ Expédition 0 |
| 18 | 1a046594ab23e9bc | 2026-08-28T03:10:51Z | shopify.com | Demande d'accès à la boutique de la part de wetracked.io | Raselio 28 août 2026 wetracked.io demande un accès de collaborateur à Raselio. Afficher la demande À propos de wetracked.io Partenaire depuis février 2023 Collaborations actives 25+ marchands |
| 19 | 1a044b7025f807c9 | 2026-08-27T19:33:58Z | t.shopifyemail.com | [Raselio] Commande #1003 placée par Olivier D. | … a passé la commande #1003 le Aug 27 à 9:33 pm. … Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: CUTLAB-TRIM-SOLO 34,99€ Sous-total 34,99€ |
| 20 | 1a042e0ca6682882 | 2026-08-27T11:00:18Z | shopify.com | Compte de paiement modifié — Prochain versement dans 4 jour(s) ouvré(s) | … retenu pendant 4 jours ouvrés afin de protéger votre compte, puis déposé le 31 |
| 21 | 1a041e806a6629a1 | 2026-08-27T06:28:39Z | shopify.com | Votre compte bancaire de versement en EUR pour Raselio a changé | Raselio 27 août 2026 Votre compte bancaire de versement en EUR pour Raselio a été modifié. Désormais, les versements à venir en EUR seront déposés sur votre compte bancaire se terminant par 7720. |
| 22 | 1a041bc6fc5decec | 2026-08-27T05:41:02Z | shopify.com | Demande d'accès à la boutique de la part de 荟千物流有限公司 | Raselio 27 août 2026 荟千物流有限公司 demande un accès de collaborateur à Raselio. Afficher la demande À propos de 荟千物流有限公司 Partenaire depuis décembre 2024 Collaborations actives 25+ marchands Inscription |
| 23 | 1a03f903ac08e5fa | 2026-08-26T19:33:30Z | t.shopifyemail.com | [Raselio] Commande #1002 placée par Yannick V. | … a passé la commande #1002 le Aug 26 à 9:33 pm. … Tondeuse Intime Homme Raselio™ 34,99€ × 1 SKU: CUTLAB-TRIM-SOLO 34,99€ Sous-total 34,99€ |
| 24 | 1a03dccaf7935d33 (6 msgs) | 2026-08-26T11:20:19Z → 2026-09-03T11:03:12Z | shopify.com (form relay) / gmail.com (sender "Sodiq") / gmail.com (Dylan) | New customer message on August 26, 2026 at 1:20 pm | You received a new message from your online store's contact form. Country Code: FR Name: Sodiq … Comment: Hello, can i know when you will ship if a |
| 25 | 1a03dba0d75948c9 | 2026-08-26T10:59:57Z | t.shopifyemail.com | [Raselio] Commande #1001 placée par Daniel G. | … a passé la commande #1001 le Aug 26 à 12:59 pm. … Tondeuse Intime Homme Raselio™ 39,90€ × 1 SKU: CUTLAB-TRIM-SOLO 39,90€ Sous-total 39,90€ |
| 26 | 1a03dba096f1f892 | 2026-08-26T10:59:56Z | shopify.com | C'est le moment de percevoir votre argent | Raselio 26 août 2026 Vous allez recevoir votre paiement Ajouter un compte bancaire Félicitations ! Pour commencer à recevoir les versements de vos commandes, vous devez ajouter les informations de |
| 27 | 1a00b6e42e6fc569 | 2026-08-16T16:36:08Z | pusan.ac.kr | Notice of DMCA Infringement (Decision No. 140517526) | Hi Raselio, We are contacting you to inform you that we have received a report alleging copyright infringement in connection with content associated with your account. Based on the information provided |
| 28 | 1a002e1f42cda0c7 | 2026-08-15T00:45:45Z | gmail.com ("Drey Agency") | Re: cutlab.space | On Tue, 28 Jul 2026, 03:20 Drey Agency … wrote: Am i speaking with the customer service or store owner?.cutlab.space |
| 29 | 19fe84856b6fb945 | 2026-08-09T20:48:01Z | email.shopify.com | Trouvez les meilleurs canaux de vente pour votre boutique | Assurez-vous que vos clients savent comment vous trouver. |
| 30 | 19fc8f369739b42b | 2026-08-03T18:47:01Z | email.shopify.com | Attirez du trafic vers votre boutique pour réaliser votre première vente | Mettez en place ces actions pour donner de l'élan à Raselio |
| 31 | 19fbc1d71310d2f3 (2 msgs) | 2026-08-01T06:57:53Z / 06:58:13Z | parcelpanel.net | Your monthly CWILL Tracking report for Jul 1, 2026 - Jul 31, 2026 | CWILL Your Monthly Report Jul 1, 2026 - Jul 31, 2026 Hi, this is your monthly report for www.raselio.com, have a check 😘 - Total shipments - Lookups Shipments Delivery performance - Valid tracking - (2nd msg: same for aerozya.com) |
| 32 | 19fb070b8892e186 (2 msgs) | 2026-07-30T00:33:23Z / 00:47:26Z | parcelpanel.net | Hi dylan, let's get started with CWILL Tracking! | CWILL Hi dylan, Thanks for adding CWILL Tracking to your Shopify store — we've already helped over 500000 merchants optimize their post-purchase experience! Your branded tracking page is ready to |
| 33 | 19faf641c52456e2 | 2026-07-29T19:40:00Z | email.shopify.com | Commencez à vendre : 27 façons d'attirer plus de clients | Raselio, découvrez comment élaborer vos stratégies marketing. |
| 34 | 19fad39e4e94c850 | 2026-07-29T09:34:38Z | shopify.com | Les paramètres de 8piiys-jj.myshopify.com ont été modifiés | Raselio 29 juillet 2026 Paramètres de la boutique modifiés La modification suivante a été apportée récemment à votre boutique https://8piiys-jj.myshopify.com/admin : dylan ulry a remplacé le domaine |
| 35 | 19fad354d8004c64 | 2026-07-29T09:29:37Z | shopify.com | Mise à jour du nom de la boutique sur les relevés pour Raselio | Raselio 29 juillet 2026 Nom de la boutique automatiquement mis à jour Nous avons automatiquement mis à jour le nom de la boutique qui apparaît sur les relevés bancaires de vos clients pour les |
| 36 | 19fa943a028ff4c9 | 2026-07-28T15:06:48Z | shopify.com | Demande d'accès à la boutique de la part de OKLM PROCESS LLC | Raselio 28 juillet 2026 OKLM PROCESS LLC demande un accès collaborateur à Raselio. Afficher la demande Étudiez sa demande, notamment les parties de votre boutique qu'elle concerne. Vous pouvez la |
| 37 | 19fa1f12fd6701b2 | 2026-07-27T04:59:24Z | shopify.com | Congratulations ! Votre boutique est maintenant disponible en anglais | Les traductions automatiques sont terminées et prêtes pour 1,5 milliard locuteurs de la langue anglais. Prévisualisez votre boutique en anglais et publiez-la sur la Page des langues 448 traductions ont |
| 38 | 19fa116c7c2ce531 | 2026-07-27T01:00:51Z | ionos.fr | Confirmation de contrat | Connexion Numéro client : 365158337 Votre confirmation de contrat Bonjour Dylan Ulry , Nous vous remercions d'avoir choisi IONOS. Par cet e-mail, nous vous confirmons que votre contrat a été créé |
| 39 | 19fa116b11ea8264 | 2026-07-27T01:00:46Z | ionos.fr | Votre confirmation de commande | Connexion Numéro client : 365158337 Votre confirmation de commande Bonjour Dylan Ulry, Nous vous remercions d'avoir choisi IONOS. Votre commande est actuellement en cours de vérification. Dans de |
| 40 | 19f9cf163f7d4773 | 2026-07-26T05:41:26Z | business.facebook.com | URGENT: L'accès aux publicités de votre compte business a été rétabli | Votre demande d'examen concernant l'accès aux publicités… L'accès aux publicités de votre compte business a été rétabli Bonjour ulry, Nous avons réexaminé l'activité de votre compte |
| 41 | 19f9ce3963fe05e9 | 2026-07-26T05:26:18Z | business.facebook.com | [Action requise] Nous avons restreint votre compte business | Cutlab est restreint. Découvrez comment y remédier. Nous avons restreint votre entreprise Cutlab ID de l'entreprise 1026501147023190 Ce que cela signifie Impossible de créer ou de diffuser des |
| 42 | 19f9cdad5b95c7ab | 2026-07-26T05:16:54Z | facebookmail.com | Confirmez votre adresse e-mail professionnelle | Please confirm your email address Please click the link below to confirm that your email address for Cutlab should be updated to ulrydylan.buisness@gmail.com. Confirmer maintenant Business Manager |
| 43 | 19f9cb7dfa5bd800 (2 msgs) | 2026-07-26T04:38:42Z / 04:39:43Z | services.ovhcloud.com | [ax28963-ovh] [OVHcloud] Erreur sur l'opération ContactControlCorrect n° 596191507 du domaine cutlab.space | SAS OVH - https://www.ovh.com/ 2 rue Kellermann BP 80157 59100 Roubaix Le 26/07/2026 06:38:41 GMT+0200, Cher(e) Client(e), Une erreur est survenue sur l'opération ContactControlCorrect n° 596191507 |
| 44 | 19f9cb7d9fec4058 | 2026-07-26T04:38:41Z | services.ovhcloud.com | [OVHcloud][Action requise] Important \| Vérification du nom de domaine cutlab.space [ax28963-ovh] | Vérifiez les données associées à votre nom de domaine Chère cliente, cher client, Vous êtes l'administrateur ou l'administratrice du nom de domaine cutlab.space, actuellement enregistré chez |
| 45 | 19f9cb7d6f10a214 (2 msgs) | 2026-07-26T04:38:41Z / 04:39:42Z | services.ovhcloud.com | [OVHcloud] Action requise \| Validation de votre e-mail pour le nom de domaine cutlab.space | Vérifiez votre e-mail pour le nom de domaine cutlab.space Chère cliente, cher client, Vous êtes titulaire du nom de domaine cutlab.space, actuellement enregistré chez OVHcloud. Dans le cadre de la |
| 46 | 19f9ca35ca6e3ffa | 2026-07-26T04:16:19Z | info.hostinger.com | Il est temps de développer votre présence en ligne ! | Nous avons bien reçu votre paiement. Merci ! |

# 2. Full bodies (`get_thread`, PLAIN_TEXT)

## 2.1 Shopify weekly summary — thread 1a05715f4bd44ebd

- From: mailer@shopify.com · Date: 2026-08-31T09:10:51Z · Subject: Dans la poche : 6 commandes cette semaine

```text
Commandes de la semaine de Raselio
----------------------------------

24 août 2026 - 30 août 2026

Ventes totales

215 €

Visites

470

up arrow

95,8%

Conversion

0,64%

Total des commandes

6

lun.

0

mar.

0

mer.

2

jeu.

1

ven.

1

sam.

0

dim.

2

Meilleures ventes de la semaine

Tondeuse Intime Homme Raselio™

Tondeuse Intime H...

6 commandes

Commandes 6

#1006

( https://8piiys-jj.myshopify.com/admin/orders/13141971042635 )

1 article

( https://8piiys-jj.myshopify.com/admin/orders/13141971042635 )

34,99 €

( https://8piiys-jj.myshopify.com/admin/orders/13141971042635 )

››
( https://8piiys-jj.myshopify.com/admin/orders/13141971042635 )

#1005

( https://8piiys-jj.myshopify.com/admin/orders/13141152137547 )

1 article

( https://8piiys-jj.myshopify.com/admin/orders/13141152137547 )

34,99 €

( https://8piiys-jj.myshopify.com/admin/orders/13141152137547 )

››
( https://8piiys-jj.myshopify.com/admin/orders/13141152137547 )

#1004

( https://8piiys-jj.myshopify.com/admin/orders/13130430185803 )

1 article

( https://8piiys-jj.myshopify.com/admin/orders/13130430185803 )

34,99 €

( https://8piiys-jj.myshopify.com/admin/orders/13130430185803 )

››
( https://8piiys-jj.myshopify.com/admin/orders/13130430185803 )

#1003

( https://8piiys-jj.myshopify.com/admin/orders/13129825386827 )

1 article

( https://8piiys-jj.myshopify.com/admin/orders/13129825386827 )

34,99 €

( https://8piiys-jj.myshopify.com/admin/orders/13129825386827 )

››
( https://8piiys-jj.myshopify.com/admin/orders/13129825386827 )

#1002

( https://8piiys-jj.myshopify.com/admin/orders/13126454935883 )

1 article

( https://8piiys-jj.myshopify.com/admin/orders/13126454935883 )

34,99 €

( https://8piiys-jj.myshopify.com/admin/orders/13126454935883 )

››
( https://8piiys-jj.myshopify.com/admin/orders/13126454935883 )

#1001

( https://8piiys-jj.myshopify.com/admin/orders/13123532620107 )

1 article

( https://8piiys-jj.myshopify.com/admin/orders/13123532620107 )

39,90 €

( https://8piiys-jj.myshopify.com/admin/orders/13123532620107 )

››
( https://8piiys-jj.myshopify.com/admin/orders/13123532620107 )

Afficher toutes les commandes

Afficher toutes les commandes
( https://8piiys-jj.myshopify.com/admin/orders/ )

Shopping Bag

Shopping Bag

151 O'Connor Street,
Ground floor, Ottawa ON, K2P 2L8
```

## 2.2 CWILL monthly tracking report (August 2026) — thread 1a05bcc4211120d8

Thread has 2 messages: message 1 is for www.raselio.com, message 2 is for aerozya.com (a second store owned by the same founder — not Raselio; only the shipment count is noted). Tracking links (clickemail.parcelpanel.net) collapsed to `[link]`; all visible text kept.

### Message 1 — www.raselio.com

- From: no-reply@parcelpanel.net · Date: 2026-09-01T07:08:27Z · Subject: Your monthly CWILL Tracking report for Aug 1, 2026 - Aug 31, 2026

```text
 Your monthly CWILL Tracking report for Aug 1, 2026 - Aug 31, 2026
[ ](link)
Your Monthly Report
Aug 1, 2026 - Aug 31, 2026
Hi, this is your monthly report for [www.raselio.com](link), have a check 😘

| 6 Total shipments | - Lookups |

Shipments
Delivery performance
-
Valid tracking
-
Exceptions
-
Shipping notifications
Sent
-
Delivered
-
Opened
-
Conversion revenue
Total
-
Tracking page
-
Shipping notifications
-
[ View full analytics ](link)
Feel free to contact us if you have any questions or concerns.
[ ](link)
[Unsubscribe](link) [Privacy Policy](link) [Help Center](link)
© 2018-2026 CWILL. All Rights Reserved
Trusted by 30,000+ Shopify & DTC brands | Built for Shopify certified
[ ](link)
```

### Message 2 — aerozya.com (other store, same inbox)

- Date: 2026-09-01T07:08:53Z · Same template; `| 3 Total shipments | - Lookups |`; all other metrics `-`.

## 2.3 Contact-form thread — thread 1a03dccaf7935d33 (6 messages)

Kept in full: message 1 (inbound contact-form relay) and message 2 (Dylan's reply). Messages 3–6 (2026-08-26T13:12:53Z, 2026-08-26T13:13:50Z, 2026-08-27T12:05:24Z, 2026-09-03T11:03:12Z) are an unsolicited agency pitch from the same sender ("Emprofit Solution", emprofitsolution.com — offers to grow the store to ~$15,000 in sales for a 2% fee, attaches 3 screenshot JPGs of other stores, and follows up three times asking for a reply "INTERESTED"). Not a customer.

### Message 1 — inbound (contact form relay)

- From: mailer@shopify.com · Date: 2026-08-26T11:20:19Z · Subject: New customer message on August 26, 2026 at 1:20 pm

```text
You received a new message from your online store's contact form.

Country Code:
FR

Name:
Sodiq

Email:
[sender address — gmail.com]

Phone Number:

Comment:
Hello, can i know when you will ship if a customer should
order today?
```

### Message 2 — Dylan's reply

- From: ulrydylan.buisness@gmail.com · Date: 2026-08-26T11:20:58Z · Subject: Re: New customer message on August 26, 2026 at 1:20 pm

```text
Hello sure

Le mer. 26 août 2026 à 13:20, Raselio (Shopify) <mailer@shopify.com> a
écrit :

> You received a new message from your online store's contact form.
> *Country Code:*
>
> FR
>
> *Name:*
>
> Sodiq
>
> *Email:*
>
> [sender address — gmail.com]
>
> *Phone Number:*
>
> *Comment:*
>
> Hello, can i know when you will ship if a customer should order today?
>
>
```

## 2.4 Meta business restriction — thread 19f9ce3963fe05e9

- From: noreply@business.facebook.com · Date: 2026-07-26T05:26:18Z · Subject: [Action requise] Nous avons restreint votre compte business

```text
Meta for Business

| |

| |
| Cutlab est restreint. Découvrez comment y remédier. |

| |
| |
| |

| |
| |

| |

| Nous avons restreint votre entreprise |
| Cutlab ID de l’entreprise 1026501147023190 |

## Ce que cela signifie

| Impossible de créer ou de diffuser des publicités |
| Impossible d’utiliser ou de partager des audiences |

Pourquoi

Ce compte semble avoir été créé ou utilisé à l’aide d’une automatisation qui ne respecte pas nos règles.Cela enfreint nos Standards publicitaires en matière d’intégrité des comptes.
[Résoudre le problème](https://facebook.com/business-support-home/1026501147023190/?source=actor_enforcement_email)

| | Nos solutions techniques ont conclu que votre entreprise ne respecte pas nos Règles publicitaires. Des mesures ont donc été prises. |
| | Vous avez peut-être le droit de contester notre décision auprès d’un tribunal de votre pays. Vous pouvez peut-être soumettre notre décision à un organisme agréé de règlement des litiges. |

| Merci, |
| L’équipe Meta Business |

| |

| |

| |
| Cet e-mail a été envoyé à ulrydylan.buisness@gmail.com avec les mises à jour nécessaires. |
| |

| |

| Pages d’aide Meta Business[](https://www.facebook.com/business/help/)© 2026 Meta. Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland |
| |

| |

| |
| |
```

## 2.5 Meta ads access reinstated — thread 19f9cf163f7d4773

- From: noreply@business.facebook.com · Date: 2026-07-26T05:41:26Z · Subject: URGENT: L’accès aux publicités de votre compte business a été rétabli
- (15 minutes after the restriction email above.) Tracking URLs collapsed to `(link)`; all visible text kept.

```text
Meta for Business

| |

| |
| Votre demande d’examen concernant l’accès aux publicités… |

| |
| |
| |

| |
| |

| |

| |
| L’accès aux publicités de votre compte business a été rétabli |
| |

| Bonjour ulry, Nous avons réexaminé l’activité de votre compte et constaté qu’elle respecte nos règles publicitaires concernant les éléments professionnels(link). Votre accès aux publicités a été rétabli, et toute publicité concernée retrouvera son statut antérieur. |
| |

# Compte business Meta
(link)
Cutlab

| |

# Prochaines étapes

| | Connectez-vous à Qualité du compte |
|---|---|
| Vous y trouverez toutes les informations relatives aux résultats, ce que vous pouvez faire ensuite et des supports de formation supplémentaires sur nos politiques. |

| |

[| Manage account(link) |](link)
| |
| |

| |

| | Vous avez peut-être le droit de contester notre décision devant les tribunaux, ou de soumettre notre décision à un organisme agréé de règlement des litiges. |

| | Vous pouvez également consulter les pages d’aide Business afin d’en savoir plus sur les restrictions publicitaires(link). |

| |

| |

| |

| |

| |
| Cet e-mail a été envoyé à ulrydylan.buisness@gmail.com avec les mises à jour nécessaires. |
| |

| |

| Pages d’aide Meta Business[](https://www.facebook.com/business/help/)© 2026 Meta. Meta Platforms, Inc., 1601 Willow Rd. Menlo Park, CA 94025 |
| |

| |

| |
| |
```

## 2.6 "Notice of DMCA Infringement" — thread 1a00b6e42e6fc569

- From: niceman1999@pusan.ac.kr (a Korean university domain; the body signs as "The Meta Business Team" and the "Request a Review" link points to lnkk.it) · Date: 2026-08-16T16:36:08Z · Subject: Notice of DMCA Infringement (Decision No. 140517526)
- Surfaced by both `raselio OR cutlab` and `"Raselio" review OR avis`. Not a customer message.

```text
| |
| |

| |

| |

| |
| Hi Raselio, |
| |

| We are contacting you to inform you that we have received a report alleging copyright infringement in connection with content associated with your account. |
| |

| Based on the information provided in the report, certain materials associated with your activity may potentially infringe upon the intellectual property rights of a third party, including copyrighted content, trademarks, or other protected assets. |
| |

| In accordance with applicable intellectual property laws and our compliance procedures, we request that you provide documentation demonstrating your authorization to use the reported content. Any supporting documentation will assist us in reviewing the matter and determining an appropriate resolution. |
| |

| Protecting intellectual property rights is essential to maintaining a fair, secure, and compliant environment for all users. If you believe this notice has been issued in error, you may submit a review request together with any relevant supporting information for further review. |
| |

| |

| Request a Review[](https://lnkk.it/s/yQFYmuh) |
| |

| Important: Failure to respond within the specified timeframe may result in the suspension of your account in accordance with applicable policies while the matter remains under review. |
| |

| |
| Best regards, |

| |

| |
| The Meta Business Team |
| |

| |

| |

| |

| |

| |
| This email was sent to ulrydylan.buisness@gmail.com. If you don't want to receive these emails from Meta in the future, please unsubscribe here[](https://facebook.com/aymt/unsubscribe/?c=6759132990842098&n=1745258987540081&t=9620404198009124). |
| |

| |
| |

| |

| © 2026 Meta. Meta Platforms, Inc., 1601 Willow Rd. Menlo Park, CA 94025 |
| |

| |

| |
```

## 2.7 "Re: cutlab.space" — thread 1a002e1f42cda0c7

- From: drey77510@gmail.com ("Drey Agency") · Date: 2026-08-15T00:45:45Z · Subject: Re: cutlab.space
- Only message in thread (a re-send of a 2026-07-28 outreach). Vendor outreach, not a customer.

```text
On Tue, 28 Jul 2026, 03:20 Drey Agency, <drey77510@gmail.com> wrote:

> Am i speaking with the customer service or store owner?.cutlab.space
>
```

## 2.8 Sample order notification body — thread 1a03dba0d75948c9 (order #1001, the only 39,90 € order)

- From: store+106732650827@t.shopifyemail.com · Date: 2026-08-26T10:59:57Z · Subject: [Raselio] Commande #1001 placée par Daniel G.
- Leading CSS block, the customer's shipping address lines and phone are omitted; everything else verbatim.

```text
Daniel G. a passé la commande
#1001 le Aug 26 à 12:59 pm.

Afficher la commande
( https://8piiys-jj.myshopify.com/admin/orders/13123532620107?syclid=... )

Résumé de la commande

Tondeuse Intime Homme Raselio™

39,90€ × 1

SKU: CUTLAB-TRIM-SOLO

39,90€

Sous-total

39,90€

Expédition

0,00€

(Livraison colissimo)

Taxe

6,65€

(TVA 20.0%)

Total

39,90€EUR

Méthode de traitement des paiements

Shopify payments

Mode de livraison

Livraison colissimo

Adresse d'expédition

[omitted — Fitou, 11510, France]

Shopify

151 O'Connor Street, Ground floor, Ottawa, ON, K2P 2L8
```

# 3. Order-notification count

## 3.1 Query as specified: `from:shopify subject:(commande OR order)` (pageSize 50)

resultCountEstimate: 2 — both are Shopify marketing emails, not order notifications:

| thread id | date | sender domain | subject |
|---|---|---|---|
| 1a04e9e27d1e6e98 | 2026-08-29T17:43:01Z | email.shopify.com | Votre prochaine commande arrive. Préparez-vous à l’expédier |
| 1a04977c9f1c1e66 | 2026-08-28T17:43:00Z | email.shopify.com | Votre acheteur attend. Expédiez votre commande aujourd’hui |

## 3.2 Corrected query: `subject:"Commande #" from:shopifyemail.com` (pageSize 50, single page)

resultCountEstimate: 19 threads = **11 [Raselio] order notifications (#1001–#1011)** + 8 [Aerozya] order notifications (other store, store+101314789758, #1001–#1008; one flagged "Risque de fraude"). Raselio notifications only:

| order | date (UTC) | customer | line item | SKU in email |
|---|---|---|---|---|
| #1011 | 2026-09-04T14:11:50Z | Philippe M. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | Electric intimate hair removal device |
| #1010 | 2026-09-04T05:53:17Z | Denis C. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | Electric intimate hair removal device |
| #1009 | 2026-09-03T08:59:02Z | Jamin M. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | Electric intimate hair removal device |
| #1008 | 2026-09-02T20:48:43Z | Michel M. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | Electric intimate hair removal device |
| #1007 | 2026-09-01T09:07:46Z | Hervé F. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | Electric intimate hair removal device |
| #1006 | 2026-08-30T11:29:03Z | Jean Luc V. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | CUTLAB-TRIM-SOLO |
| #1005 | 2026-08-30T07:20:53Z | De Oliveira A. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | CUTLAB-TRIM-SOLO |
| #1004 | 2026-08-28T05:23:39Z | W B. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | CUTLAB-TRIM-SOLO |
| #1003 | 2026-08-27T19:33:58Z | Olivier D. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | CUTLAB-TRIM-SOLO |
| #1002 | 2026-08-26T19:33:30Z | Yannick V. | Tondeuse Intime Homme Raselio™ 34,99€ × 1 | CUTLAB-TRIM-SOLO |
| #1001 | 2026-08-26T10:59:57Z | Daniel G. | Tondeuse Intime Homme Raselio™ 39,90€ × 1 | CUTLAB-TRIM-SOLO |

# 4. Customer-voice searches

## 4.1 `"tondeuse"` (pageSize 50)

resultCountEstimate: 12 — the 11 Raselio order notifications listed in 3.2 plus the weekly summary thread 1a05715f4bd44ebd. No customer-authored message.

## 4.2 `"Raselio" review OR avis` (pageSize 50)

resultCountEstimate: 1 — thread 1a00b6e42e6fc569 ("Notice of DMCA Infringement", see 2.6). No customer review or "avis".

## 4.3 Customer messages / reviews / returns / complaints found

None. Across all four searches the only inbound non-platform messages are: the contact-form vendor pitch (2.3), the "DMCA" notice from a non-Meta domain (2.6), and the "Drey Agency" outreach (2.7).
