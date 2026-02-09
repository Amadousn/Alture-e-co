# Guide de Déploiement : Vercel & Namecheap

Ce guide vous explique comment mettre en ligne votre site **Alture & Co.** gratuitement via Vercel et y connecter votre nom de domaine Namecheap.

## Étape 1 : Déploiement sur Vercel

1.  Allez sur [vercel.com](https://vercel.com) et connectez-vous (ou créez un compte) avec **GitHub**.
2.  Sur votre tableau de bord, cliquez sur le bouton **"Add New..."** -> **"Project"**.
3.  Dans la liste "Import Git Repository", trouvez **Alture-e-co** et cliquez sur **"Import"**.
4.  Dans la configuration du projet :
    *   **Framework Preset** : Next.js (devrait être détecté automatiquement).
    *   **Root Directory** : `./` (par défaut).
    *   **Environment Variables** : Si vous avez des clés API (ex: `NEXTAUTH_SECRET`), ajoutez-les ici. (Pour l'instant, le projet semble utiliser des variables par défaut ou locales, mais vérifiez votre fichier `.env` local).
5.  Cliquez sur **"Deploy"**.
6.  Attendez quelques minutes. Une fois terminé, Vercel vous donnera une URL temporaire (ex: `alture-e-co.vercel.app`). Testez le site pour vérifier que tout fonctionne.

### ⚠️ Problème : "Installer l'intégration GitHub" ?

Si Vercel ne trouve pas votre dépôt ou affiche une erreur d'intégration :

1.  Sur Vercel, quand vous cliquez sur "Add New Project", cherchez un lien ou un bouton **"Adjust GitHub App Permissions"** ou **"Install GitHub App"**.
2.  Une fenêtre GitHub va s'ouvrir.
3.  Sélectionnez votre compte personnel (ou l'organisation où se trouve le dépôt).
4.  Dans les options, choisissez **"All repositories"** (ou sélectionnez spécifiquement `Alture-e-co` dans la liste "Only select repositories").
5.  Validez et enregistrez.
6.  Retournez sur Vercel, le dépôt devrait apparaître maintenant.

## Étape 2 : Configuration du Nom de Domaine (Namecheap)

Une fois le site en ligne sur Vercel :

1.  Allez dans les **Settings** de votre projet sur Vercel.
2.  Cliquez sur **"Domains"** dans le menu latéral.
3.  Entrez votre nom de domaine (ex: `altureandco.com`) dans le champ et cliquez sur **"Add"**.
4.  Vercel va vous donner des enregistrements DNS à configurer. Choisissez l'option recommandée (généralement **A Record** ou **Nameservers**).

### Configuration chez Namecheap (Méthode recommandée : DNS A Record)

1.  Connectez-vous à votre compte **Namecheap**.
2.  Allez dans **"Domain List"** et cliquez sur **"Manage"** à côté de votre domaine.
3.  Allez dans l'onglet **"Advanced DNS"**.
4.  Supprimez les enregistrements existants s'ils entrent en conflit (ex: anciens enregistrements A ou CNAME vers un parking page).
5.  Ajoutez les enregistrements fournis par Vercel. Généralement :
    *   **Type** : `A Record` | **Host** : `@` | **Value** : `76.76.21.21` (Vérifiez l'IP donnée par Vercel)
    *   **Type** : `CNAME Record` | **Host** : `www` | **Value** : `cname.vercel-dns.com` (ou votre domaine sans www)
6.  Sauvegardez les modifications.

## Étape 3 : Propagation

La propagation DNS peut prendre de quelques minutes à 48h (souvent moins d'une heure).
Sur Vercel, les indicateurs passeront au vert une fois la connexion établie. Votre site sera alors accessible via votre nom de domaine personnalisé !
