# Site du collectif Venerque Autrement

https://venerque-autrement.fr/

## Formulaire de contact (Supabase + Infomaniak)

Le formulaire `/contact` appelle l’Edge Function `send-contact-email`, qui envoie le message via SMTP Infomaniak (`mail.infomaniak.com`, port **465** SSL — le port 587 est bloqué par Supabase).

Protections anti-abus : allowlist CORS, honeypot `company`, rate limit (5 req / 15 min / IP, en mémoire par isolate), plafonds de longueur sur les champs.

1. Copier [`.env.example`](.env.example) vers `.env.local` et renseigner `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Créer un mot de passe SMTP pour `contact@venerque-autrement.fr` dans le Manager Infomaniak.
3. Déployer la function :

```bash
supabase link --project-ref <ref>
supabase secrets set \
  SMTP_HOSTNAME=mail.infomaniak.com \
  SMTP_PORT=465 \
  SMTP_SECURE=true \
  SMTP_USERNAME=contact@venerque-autrement.fr \
  SMTP_PASSWORD='…' \
  SMTP_FROM=contact@venerque-autrement.fr \
  CONTACT_TO=contact@venerque-autrement.fr
supabase functions deploy send-contact-email
```

Test local de la function :

```bash
cp supabase/.env.local.example supabase/.env.local
# renseigner SMTP_PASSWORD
supabase functions serve send-contact-email --env-file ./supabase/.env.local
```
