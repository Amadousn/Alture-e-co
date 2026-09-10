---
brand: Raselio
source: Google Drive doc "integrationimagesavantapres.md" (id 1zdv-MlBpC_6QfI6D4oNpUCNkmD7cIBVJfLKzm1IgJ6k)
pulled_on: 2026-09-06
tool: mcp__Google_Drive__read_file_content
claim_status: stated     # team-authored doc = STATED brand input
window: doc modified 2026-08-31T01:06:54Z
notes: Verbatim capture. Short how-to for placing two Higgsfield-generated "avant / après" reaction images on the Raselio landing page; references landing sections "RAISON 5 (« La repousse qui pique... »)", "raison 7" and "BLOC OFFRE". HTML snippets unescaped from the export.
---

# Intégration des 2 images « avant / après » sur la landing

## Étape 1 : récupérer les images

Dans la galerie Higgsfield de la conversation, télécharge :

  - **Image 1** (grimace, bras croisés) = la « pas contente »
  - **Image 3** (sourire surpris, main sur la clavicule) = la « contente » (si tu préfères les variantes 2 ou 4, même procédure)

## Étape 2 : les uploader dans Shopify

Admin Shopify → **Contenu → Fichiers** → Téléverser les 2 images → copier l'URL de chacune.

## Étape 3 : coller les blocs dans la page

### Bloc A — dans la RAISON 5 (« La repousse qui pique... »), après le 1er paragraphe

```html
<figure style="margin:24px auto;max-width:480px;text-align:center;">
  <img src="URL_IMAGE_PAS_CONTENTE" alt="Sa réaction quand la repousse pique" style="width:100%;border-radius:12px;" loading="lazy">
  <figcaption style="margin-top:8px;font-size:14px;color:#777;font-style:italic;">Tondeuse à barbe.</figcaption>
</figure>
```

### Bloc B — juste avant le BLOC OFFRE (après la raison 7)

```html
<figure style="margin:24px auto;max-width:480px;text-align:center;">
  <img src="URL_IMAGE_CONTENTE" alt="Sa réaction quand c'est entretenu" style="width:100%;border-radius:12px;" loading="lazy">
  <figcaption style="margin-top:8px;font-size:14px;color:#777;font-style:italic;">Raselio.</figcaption>
</figure>
```

Remplace URL_IMAGE_PAS_CONTENTE et URL_IMAGE_CONTENTE par les URLs copiées à l'étape 2. Le max-width:480px garde les images à taille raisonnable sur PC (ton point sensible), et pleine largeur sur mobile.
