# Diagnostic - Système d'envoi d'email

## Vérifications à faire

### 1. Vérifier que la Edge Function est déployée

Dans votre dashboard Supabase :
- Allez dans **Edge Functions**
- Vérifiez que `send-contact-email` apparaît dans la liste
- Si elle n'est pas là, déployez-la :

```bash
export PATH="$HOME/.local/bin:$PATH"
cd /Users/paulnogaro/Desktop/agence-yl
supabase functions deploy send-contact-email
```

### 2. Vérifier le secret RESEND_API_KEY

Dans Supabase Dashboard :
- **Settings** → **Edge Functions** → **Secrets**
- Vérifiez que `RESEND_API_KEY` existe avec la valeur : `re_hoEbn2Yu_4nY7dZtdRAi7h44Q5XEegGVU`

Si ce n'est pas le cas, ajoutez-le :

```bash
export PATH="$HOME/.local/bin:$PATH"
supabase secrets set RESEND_API_KEY=re_hoEbn2Yu_4nY7dZtdRAi7h44Q5XEegGVU
```

### 3. Vérifier les logs de la fonction

Dans Supabase Dashboard :
- **Edge Functions** → `send-contact-email` → **Logs**
- Regardez les logs récents pour voir les erreurs

### 4. Tester manuellement la fonction

Vous pouvez tester la fonction directement depuis le dashboard Supabase :
- **Edge Functions** → `send-contact-email` → **Invoke**
- Utilisez ce payload de test :

```json
{
  "record": {
    "id": "test-id",
    "nom": "Test",
    "prenom": "User",
    "email": "test@example.com",
    "telephone": "0612345678",
    "pays": "France",
    "projet": "Test de l'email",
    "contact_method": "email",
    "created_at": "2025-12-21T16:00:00Z"
  }
}
```

### 5. Vérifier la console du navigateur

Quand vous testez le formulaire :
1. Ouvrez la console du navigateur (F12)
2. Remplissez et envoyez le formulaire
3. Regardez les messages dans la console
4. Notez toutes les erreurs affichées

### 6. Vérifier les emails dans Resend

Dans votre dashboard Resend :
- Allez dans **Emails** → **Logs**
- Vérifiez si les emails sont envoyés ou s'il y a des erreurs

## Problèmes courants

### Problème : La fonction n'est pas appelée
**Solution** : Vérifiez que le code client appelle bien `supabase.functions.invoke('send-contact-email', ...)`

### Problème : Erreur 401 ou 403
**Solution** : Vérifiez que le secret `RESEND_API_KEY` est bien configuré dans Supabase

### Problème : Erreur "Function not found"
**Solution** : La fonction n'est pas déployée. Déployez-la avec `supabase functions deploy send-contact-email`

### Problème : Email envoyé mais pas reçu
**Solution** : 
- Vérifiez les spams
- Vérifiez les logs Resend pour voir si l'email a été envoyé
- Vérifiez que l'adresse email `paul.nogaro@gmail.com` est correcte

## Commandes utiles

```bash
# Voir les logs de la fonction
supabase functions logs send-contact-email

# Lister les secrets
supabase secrets list

# Redéployer la fonction
supabase functions deploy send-contact-email

# Tester la fonction localement
supabase functions serve send-contact-email --no-verify-jwt
```


