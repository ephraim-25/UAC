# 🚀 Checklist de Déploiement Vercel - UAC RDC Frontend

## ✅ Corrections Appliquées

- [x] **Next.js 16.1.1 → 15.1.6** (version stable production-ready)
- [x] **React 19.2.3 → 18.3.1** (version stable)
- [x] **Correction de l'ordre des imports** dans `layout.tsx`
- [x] **Optimisation de `next.config.ts`** pour Vercel

---

## 📋 Configuration Vercel (Dashboard)

### 1. **Framework Preset**
```
Next.js
```
*(Détecté automatiquement)*

### 2. **Root Directory**
```
uac-platform/frontend
```
⚠️ **CRITIQUE** : Si le repo contient `backend/` et `frontend/`, définir le Root Directory.

### 3. **Build Command**
```
npm run build
```
*(Par défaut, mais vérifier)*

### 4. **Output Directory**
```
.next
```
*(Laisser vide ou `.next` - Vercel gère automatiquement)*

### 5. **Install Command**
```
npm install
```
*(Par défaut)*

### 6. **Node.js Version**
```
20.x
```
*(Recommandé pour Next.js 15)*

---

## 🔧 Variables d'Environnement (si nécessaire)

Pour l'instant, **AUCUNE** variable d'environnement requise pour le frontend seul.

Quand vous connecterez le backend :
```
NEXT_PUBLIC_API_URL=https://votre-backend-url.com
```

---

## 📦 Commandes Locales (Vérification)

Avant de push sur GitHub, tester localement :

```bash
cd uac-platform/frontend
npm install
npm run build
npm run start
```

Vérifier que `http://localhost:3000` fonctionne sans erreur 404.

---

## 🎯 Étapes de Déploiement

1. **Commit & Push** les changements :
   ```bash
   git add .
   git commit -m "fix: downgrade Next.js 15.1.6 + React 18.3.1 pour compatibilité Vercel"
   git push origin main
   ```

2. **Sur Vercel Dashboard** :
   - Aller dans **Settings** → **General**
   - Vérifier **Root Directory** = `uac-platform/frontend`
   - Vérifier **Framework Preset** = `Next.js`
   - **Sauvegarder**

3. **Redeploy** :
   - Aller dans **Deployments**
   - Cliquer sur **Redeploy** sur le dernier déploiement
   - Ou attendre le déploiement automatique après le push

4. **Vérification** :
   - Le build doit se terminer avec succès
   - La route `/` doit être accessible
   - Pas d'erreur 404

---

## 🐛 Troubleshooting

### Si 404 persiste après ces corrections :

1. **Vérifier les logs Vercel** :
   - Aller dans **Deployments** → Cliquer sur le déploiement → **View Function Logs**

2. **Vérifier la structure** :
   - `src/app/page.tsx` doit exister ✅
   - `src/app/layout.tsx` doit exister ✅

3. **Forcer un rebuild complet** :
   - Dans Vercel : **Settings** → **General** → **Clear Build Cache**
   - Puis **Redeploy**

4. **Vérifier le Root Directory** :
   - Si le repo est monorepo, le Root Directory est **OBLIGATOIRE**

---

## 📊 Structure Validée

```
uac-platform/frontend/
├── src/
│   └── app/
│       ├── layout.tsx ✅
│       ├── page.tsx ✅
│       ├── globals.css ✅
│       └── ...
├── package.json ✅ (Next.js 15.1.6)
├── next.config.ts ✅
└── tsconfig.json ✅
```

---

## ✨ Résultat Attendu

- ✅ Build réussi sur Vercel
- ✅ Site accessible sur `https://votre-projet.vercel.app`
- ✅ Route `/` fonctionne
- ✅ Pas d'erreur 404
- ✅ Prêt pour connexion backend NestJS

---

**Date de correction** : $(date)
**Version Next.js** : 15.1.6 (stable)
**Version React** : 18.3.1 (stable)
