# TODO - Krisma Bouw Website

Dit document bevat alle openstaande taken en verbeterpunten voor de website.

---

## Hoge Prioriteit (Voor Lancering)

### Technische Setup
- [ ] reCAPTCHA keys aanmaken op https://www.google.com/recaptcha/admin
  - Site key invullen in `index.html` (zoek naar `YOUR_RECAPTCHA_SITE_KEY`)
  - Secret key configureren in Netlify environment variables
- [ ] SendGrid account aanmaken op https://sendgrid.com
  - API key genereren
  - Sender email verifiëren
  - API key configureren in Netlify environment variables
- [ ] Netlify environment variables instellen:
  - `EMAIL_TO` = stijn.de.ketelaere@pandora.be
  - `EMAIL_FROM` = noreply@krisma-bouw.be
  - `RECAPTCHA_SECRET_KEY` = (van Google)
  - `SENDGRID_API_KEY` = (van SendGrid)

### Afbeeldingen (Essentieel)
- [ ] Hero achtergrond foto toevoegen (`images/hero-bg.jpg` - 1920x1080px)
- [ ] Team/bedrijfsfoto toevoegen (`images/about/team.jpg` - 800x600px)
- [ ] Minimaal 3 projectfoto's toevoegen:
  - [ ] Pleisterwerk project (`images/projects/pleisterwerk-1.jpg`)
  - [ ] Gyproc project (`images/projects/gyproc-1.jpg`)
  - [ ] Renovatie project (`images/projects/renovatie-1.jpg`)
- [ ] Social media preview afbeelding (`images/og-image.jpg` - 1200x630px)

### Content Review
- [ ] Alle teksten nalezen op correctheid
- [ ] Contactgegevens verifiëren (adres, telefoon, email)
- [ ] Google Maps embed URL controleren/updaten

---

## Medium Prioriteit (Eerste Maand)

### SEO & Analytics
- [ ] Google Analytics account aanmaken en tracking code toevoegen
- [ ] Google Search Console registreren
- [ ] Sitemap indienen bij Google
- [ ] Google Mijn Bedrijf profiel claimen en invullen

### Branding
- [ ] Favicon toevoegen (16x16, 32x32, apple-touch-icon)
- [ ] Logo afbeelding toevoegen voor structured data

### Social Proof
- [ ] 2-3 klantreviews/testimonials verzamelen
- [ ] Testimonials sectie toevoegen aan website (optioneel)

### Extra Projectfoto's
- [ ] Meer voor/na foto's verzamelen
- [ ] Projectbeschrijvingen uitbreiden met details

---

## Lage Prioriteit (Op Termijn)

### Content Uitbreiding
- [ ] FAQ sectie toevoegen met veelgestelde vragen
- [ ] Blog sectie overwegen voor SEO (optioneel)
- [ ] Meer dienst-specifieke informatie toevoegen

### Marketing
- [ ] Facebook bedrijfspagina aanmaken
- [ ] Instagram account voor projectfoto's
- [ ] Social media links toevoegen aan footer
- [ ] Google Ads campagne overwegen

### Technische Verbeteringen
- [ ] Performance audit uitvoeren (Lighthouse)
- [ ] Accessibility audit uitvoeren
- [ ] Browser testing op alle major browsers

---

## Tips voor Verbetering

### Foto's
1. **Kwaliteit boven kwantiteit** - Liever 3 goede foto's dan 10 matige
2. **Voor/na combinaties** - Zeer overtuigend voor potentiële klanten
3. **Consistente stijl** - Zelfde belichting en bewerking voor alle foto's
4. **Smartphone is OK** - Moderne smartphones maken uitstekende foto's bij daglicht
5. **Opgeruimde werkplek** - Zorg dat de omgeving netjes is op de foto

### Content
1. **Reviews zijn goud waard** - Vraag tevreden klanten om een korte quote
2. **Specifieke projectinfo** - Locatie (gemeente), materialen, doorlooptijd
3. **Vakjargon vermijden** - Schrijf voor de klant, niet voor collega's

### Marketing
1. **Google Mijn Bedrijf** - Gratis en essentieel voor lokale vindbaarheid
2. **Reageer op reviews** - Toont betrokkenheid
3. **Consistente NAP** - Naam, Adres, Telefoon overal hetzelfde

### Performance
1. **Afbeeldingen optimaliseren** - Comprimeer voor web (TinyPNG, Squoosh)
2. **Lazy loading** - Al geïmplementeerd in de code
3. **Caching** - Geconfigureerd in netlify.toml

---

## Voltooide Taken

### Website Development
- [x] Analyse bestaande website krisma-bouw.be
- [x] Moderne HTML5 structuur opgezet
- [x] Responsive CSS met mobile-first approach
- [x] JavaScript functionaliteit (menu, scroll, animaties)
- [x] Contactformulier met validatie
- [x] reCAPTCHA integratie voorbereid
- [x] Serverless function voor email verzending
- [x] SEO meta tags en Open Graph
- [x] GEO tags voor lokale SEO
- [x] Schema.org structured data
- [x] Netlify configuratie
- [x] Environment variables template
- [x] Documentatie geschreven

---

## Notities

- Website repository: https://github.com/sdksolutionsbe/website-krisma
- Netlify deploy URL: (in te vullen na deployment)
- Productie URL: https://www.krisma-bouw.be (na DNS configuratie)

---

*Laatst bijgewerkt: 22 december 2024*
