# Netlify Setup Handleiding - Krisma Bouw

Deze handleiding beschrijft stap voor stap hoe je de website op Netlify kunt deployen.

---

## 1. Voorbereiding

### 1.1 Benodigde Accounts
- **GitHub account** (je hebt dit al)
- **Netlify account** (je hebt dit al)
- **Google reCAPTCHA** (gratis)
- **SendGrid account** (gratis tier beschikbaar)

### 1.2 Repository Aanmaken

1. Ga naar GitHub
2. Maak een nieuwe repository: `krisma-bouw-website`
3. Push de code naar de repository:

```bash
cd "Website - Krisma"
git init
git add .
git commit -m "Initial commit: Krisma Bouw moderne website"
git branch -M main
git remote add origin https://github.com/JOUW_USERNAME/krisma-bouw-website.git
git push -u origin main
```

---

## 2. Google reCAPTCHA Setup

### 2.1 Keys Aanmaken
1. Ga naar https://www.google.com/recaptcha/admin
2. Klik op het + icoon (nieuwe site toevoegen)
3. Vul in:
   - **Label:** Krisma Bouw
   - **reCAPTCHA type:** reCAPTCHA v2 "I'm not a robot"
   - **Domains:**
     - `krisma-bouw.netlify.app`
     - `www.krisma-bouw.be`
     - `krisma-bouw.be`
     - `localhost` (voor testen)
4. Accepteer de voorwaarden
5. Klik "Verzenden"

### 2.2 Keys Bewaren
Je krijgt twee keys:
- **Site key:** (voor in de HTML)
- **Secret key:** (voor de server)

**Bewaar beide!**

### 2.3 Site Key in HTML Updaten

Open `index.html` en vervang:
```html
<div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
```

Met je echte site key:
```html
<div class="g-recaptcha" data-sitekey="6LcXXXXXXXXXXXXXXXXXXXXXXXXXX"></div>
```

---

## 3. SendGrid Setup

### 3.1 Account Aanmaken
1. Ga naar https://sendgrid.com
2. Klik "Start for Free"
3. Maak een account aan (gratis plan: 100 emails/dag)

### 3.2 API Key Genereren
1. Log in bij SendGrid
2. Ga naar **Settings > API Keys**
3. Klik **Create API Key**
4. Naam: `Krisma Bouw Website`
5. Permissions: **Restricted Access**
   - Mail Send: **Full Access**
6. Klik **Create & View**
7. **Kopieer de key** (wordt maar 1x getoond!)

### 3.3 Sender Verification
1. Ga naar **Settings > Sender Authentication**
2. Kies **Single Sender Verification** (eenvoudigste optie)
3. Voeg toe: `noreply@krisma-bouw.be` of je eigen email
4. Bevestig via de verificatie-email

---

## 4. Netlify Deployment

### 4.1 Nieuwe Site Aanmaken
1. Log in op https://app.netlify.com
2. Klik **Add new site > Import an existing project**
3. Kies **Deploy with GitHub**
4. Autoriseer Netlify (indien nodig)
5. Selecteer de repository `krisma-bouw-website`

### 4.2 Build Settings
Netlify detecteert automatisch de instellingen uit `netlify.toml`:
- **Publish directory:** `.` (root)
- **Functions directory:** `netlify/functions`

Klik **Deploy site**

### 4.3 Environment Variables Instellen

1. Ga naar **Site settings > Environment variables**
2. Klik **Add a variable**
3. Voeg toe:

| Key | Value |
|-----|-------|
| `EMAIL_TO` | `stijn.de.ketelaere@pandora.be` |
| `EMAIL_FROM` | `noreply@krisma-bouw.be` |
| `RECAPTCHA_SECRET_KEY` | `(je secret key van Google)` |
| `SENDGRID_API_KEY` | `(je API key van SendGrid)` |

4. **Redeploy** de site na het toevoegen van variables

### 4.4 Custom Domain (Optioneel)

1. Ga naar **Domain settings**
2. Klik **Add custom domain**
3. Voer in: `www.krisma-bouw.be`
4. Volg de DNS instructies

**DNS Records bij je domein provider:**
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     [jouw-site].netlify.app
```

---

## 5. Testen

### 5.1 Formulier Testen
1. Ga naar je Netlify URL: `https://[site-naam].netlify.app`
2. Scroll naar het contactformulier
3. Vul alle velden in
4. Voltooi de captcha
5. Verstuur het formulier

### 5.2 Verwacht Resultaat
- Succesmelding op de website
- Email in je inbox (`stijn.de.ketelaere@pandora.be`)
- Bevestigingsemail naar de inzender

### 5.3 Debugging
Als het niet werkt, check:
1. **Function Logs:** Netlify > Functions > contact
2. **Environment Variables:** Correct ingesteld?
3. **SendGrid:** Sender geverifieerd?
4. **reCAPTCHA:** Domein toegevoegd?

---

## 6. Checklist voor Launch

### Technisch
- [ ] Repository op GitHub
- [ ] Netlify deployment succesvol
- [ ] reCAPTCHA site key in HTML
- [ ] reCAPTCHA secret key in Netlify env
- [ ] SendGrid API key in Netlify env
- [ ] SendGrid sender geverifieerd
- [ ] Email to/from in Netlify env
- [ ] Contactformulier getest

### Content
- [ ] Hero afbeelding toegevoegd
- [ ] Team/about afbeelding toegevoegd
- [ ] Project foto's toegevoegd
- [ ] Alle teksten gecontroleerd
- [ ] Google Maps embed correct

### SEO
- [ ] Meta description correct
- [ ] OG image toegevoegd
- [ ] Schema.org data gecontroleerd
- [ ] robots.txt aanwezig (optioneel)
- [ ] sitemap.xml aangemaakt (optioneel)

### DNS (indien custom domain)
- [ ] A record ingesteld
- [ ] CNAME record ingesteld
- [ ] SSL certificaat actief (automatisch)

---

## 7. Handige Netlify Commands

### Deploy vanaf command line
```bash
# Installeer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link project
netlify link

# Deploy preview
netlify deploy

# Deploy naar productie
netlify deploy --prod
```

### Logs bekijken
```bash
netlify functions:log contact
```

---

## 8. Kosten Overzicht

| Service | Gratis Tier | Betaalde Opties |
|---------|-------------|-----------------|
| Netlify | 100GB/maand, 100 form submissions | Vanaf $19/maand |
| SendGrid | 100 emails/dag | Vanaf $15/maand |
| reCAPTCHA | Onbeperkt | Enterprise beschikbaar |
| GitHub | Onbeperkt public repos | Private vanaf $4/maand |
| **Totaal** | **€0/maand** | Naar behoefte |

---

## 9. Support

### Netlify Documentatie
https://docs.netlify.com

### SendGrid Documentatie
https://docs.sendgrid.com

### reCAPTCHA Documentatie
https://developers.google.com/recaptcha/docs/display

---

Dit document is klaar! Volg de stappen en je website staat binnen 30 minuten online.
