# Krisma Bouw Website

Moderne, responsive website voor Krisma Bouw - Erkend aannemer gespecialiseerd in pleisterwerken, gyproc en renovaties.

## Features

- Modern responsive design (mobile-first)
- SEO geoptimaliseerd met Schema.org markup
- GEO tags voor lokale zichtbaarheid
- Contactformulier met reCAPTCHA beveiliging
- Email notificaties via SendGrid
- Netlify serverless functions
- Optimale performance

## Projectstructuur

```
Website - Krisma/
├── index.html              # Hoofdpagina
├── css/
│   └── style.css          # Alle styling
├── js/
│   └── main.js            # JavaScript functionaliteit
├── images/                 # Afbeeldingen (toe te voegen)
├── netlify/
│   └── functions/
│       └── contact.js     # Serverless contact handler
├── Documentatie/
│   ├── RAPPORT-WEBSITE-VERGELIJKING.md
│   ├── VERBETERPUNTEN-EN-ADVIES.md
│   └── NETLIFY-SETUP-HANDLEIDING.md
├── netlify.toml           # Netlify configuratie
├── .env.example           # Environment variables template
├── robots.txt             # SEO robots file
├── sitemap.xml            # SEO sitemap
└── README.md              # Dit bestand
```

## Quick Start

### 1. Clone de repository

```bash
git clone https://github.com/USERNAME/krisma-bouw-website.git
cd krisma-bouw-website
```

### 2. Configureer environment variables

```bash
cp .env.example .env
# Vul de waardes in
```

### 3. Deploy naar Netlify

Zie [NETLIFY-SETUP-HANDLEIDING.md](Documentatie/NETLIFY-SETUP-HANDLEIDING.md) voor volledige instructies.

## Environment Variables

| Variable | Beschrijving |
|----------|-------------|
| `EMAIL_TO` | Email adres voor contactformulier submissions |
| `EMAIL_FROM` | Afzender email adres |
| `RECAPTCHA_SITE_KEY` | Google reCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA secret key |
| `SENDGRID_API_KEY` | SendGrid API key voor email verzending |

## Documentatie

- [Rapport Website Vergelijking](Documentatie/RAPPORT-WEBSITE-VERGELIJKING.md) - Vergelijking oude vs nieuwe website
- [Verbeterpunten en Advies](Documentatie/VERBETERPUNTEN-EN-ADVIES.md) - Foto's, content en marketing tips
- [Netlify Setup Handleiding](Documentatie/NETLIFY-SETUP-HANDLEIDING.md) - Stap-voor-stap deployment guide

## Technologie Stack

- **HTML5** - Semantische markup
- **CSS3** - Custom properties, Flexbox, Grid
- **JavaScript** - Vanilla JS (geen frameworks)
- **Netlify Functions** - Serverless backend
- **SendGrid** - Email service
- **Google reCAPTCHA** - Spam protectie

## Browser Support

- Chrome (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Edge (laatste 2 versies)
- Mobile browsers

## Licentie

Private - Alle rechten voorbehouden aan Krisma Bouw.

---

Gemaakt met zorg voor Krisma Bouw.
