# Guide de déploiement - Notification Email

Ce guide vous explique comment déployer le système de notification par email pour les messages de contact.

## Prérequis

1. ✅ Compte Resend créé avec votre email
2. ✅ Secret `RESEND_API_KEY` ajouté dans Supabase
3. ✅ CLI Supabase installé

## Étapes de déploiement

### 1. Installer le CLI Supabase (si pas déjà fait)

```bash
npm install -g supabase
```

### 2. Se connecter à Supabase

```bash
supabase login
```

Cela ouvrira votre navigateur pour vous authentifier.

### 3. Lier votre projet Supabase

```bash
cd /Users/paulnogaro/Desktop/agence-yl
supabase link --project-ref apuptkqrzjhpgebgqbrc
```

Vous devrez entrer votre **Database Password** (mot de passe de votre base de données Supabase). Si vous ne le connaissez pas :
- Allez dans votre dashboard Supabase
- Settings → Database
- Vous pouvez réinitialiser le mot de passe si nécessaire

### 4. Déployer la Edge Function

```bash
supabase functions deploy send-contact-email
```

Cette commande va :
- Déployer la fonction sur Supabase
- Utiliser automatiquement le secret `RESEND_API_KEY` que vous avez configuré

### 5. Exécuter le script SQL mis à jour

1. Allez dans votre dashboard Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **SQL Editor**
4. Cliquez sur **New query**
5. Ouvrez le fichier `supabase_contact_messages_table.sql` et copiez-collez tout son contenu
6. Cliquez sur **Run** (ou Ctrl/Cmd + Enter)

Ce script va :
- Créer la table `contact_messages` (si pas déjà fait)
- Activer l'extension `pg_net`
- Créer la fonction `notify_new_contact_message()`
- Créer le trigger qui appelle automatiquement la fonction à chaque nouveau message

### 6. Tester le système

1. Allez sur votre site web
2. Remplissez le formulaire de contact
3. Cliquez sur "CONTINUER"
4. Vérifiez que vous recevez bien l'email sur `paul.nogaro@gmail.com`

## Vérification du déploiement

### Vérifier que la fonction est déployée

Dans votre dashboard Supabase :
- Allez dans **Edge Functions**
- Vous devriez voir `send-contact-email` dans la liste

### Vérifier les logs

Si l'email ne fonctionne pas, vérifiez les logs :
- Dans Supabase Dashboard → Edge Functions → `send-contact-email` → Logs
- Ou via la commande : `supabase functions logs send-contact-email`

## Configuration de l'email Resend

### Pour les tests (actuel)
Le code utilise actuellement `onboarding@resend.dev` comme adresse d'expéditeur. Cela fonctionne pour les tests mais les emails peuvent aller en spam.

### Pour la production (recommandé)
1. Dans Resend Dashboard, allez dans **Domains**
2. Ajoutez votre domaine (ex: `lagenceyl.com`)
3. Suivez les instructions pour vérifier le domaine (ajout de records DNS)
4. Une fois vérifié, modifiez dans `supabase/functions/send-contact-email/index.ts` :
   ```typescript
   from: 'L\'Agence YL <noreply@lagenceyl.com>', // Remplacez par votre domaine
   ```

## Dépannage

### Erreur : "pg_net extension not found"
Si vous obtenez cette erreur, exécutez d'abord dans SQL Editor :
```sql
CREATE EXTENSION IF NOT EXISTS pg_net;
```

### Erreur : "Function not found"
Vérifiez que la fonction est bien déployée :
```bash
supabase functions list
```

### Les emails ne sont pas reçus
1. Vérifiez les logs de la fonction
2. Vérifiez que le secret `RESEND_API_KEY` est bien configuré
3. Vérifiez votre boîte spam
4. Testez avec l'API Resend directement depuis leur dashboard

## Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs Supabase Edge Functions
2. Vérifiez les logs Resend dans leur dashboard
3. Assurez-vous que tous les secrets sont correctement configurés


