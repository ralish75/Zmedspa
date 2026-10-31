const fs = require('fs');
const path = require('path');
const OUT = __dirname;
// Set LIVE to true at launch (after Dr. Kishimi approves the text) to let search engines index the site.
const LIVE = false;
// Newsletter: paste the signup form address from Brevo, MailerLite or similar into action, and the name of its email field.
// While action is empty the signup block is not shown on the site.
const NEWSLETTER = { action: '', emailField: 'EMAIL' };
function newsletter() {
  if (!NEWSLETTER.action) return '';
  return `
    <div class="news">
      <div><h2>Skin health tips, in your inbox</h2><p>Occasional, practical articles from Zmedspa. No spam.</p></div>
      <form action="${NEWSLETTER.action}" method="post" target="_blank">
        <label class="sr" for="nl-email">Email address</label>
        <input type="text" name="email_address_check" value="" class="sr" tabindex="-1" autocomplete="off" aria-hidden="true"><input type="hidden" name="locale" value="en">
        <div class="news-row"><input id="nl-email" name="${NEWSLETTER.emailField}" type="email" required autocomplete="email" placeholder="Your email address"><button class="btn primary" type="submit">Subscribe</button></div>
        <p class="note">By subscribing you agree to receive occasional emails from Zmedspa. You can unsubscribe at any time.</p>
      </form>
    </div>`;
}
const LD = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'MedicalClinic',
  name: 'Zmedspa (MZ Derma Clinics)', medicalSpecialty: 'Dermatologic',
  telephone: '+2349161036572',
  address: { '@type': 'PostalAddress', streetAddress: 'Klimmat Plaza, Asba and Dantata Street, Gwarinpa 2', addressLocality: 'Abuja', addressCountry: 'NG' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '11:00', closes: '19:00' }],
  employee: { '@type': 'Physician', name: 'Dr. Ismaila Kishimi', medicalSpecialty: 'Dermatologic' },
});

const NAV = [
  ['index.html', 'Home'], ['about.html', 'About'], ['treatments.html', 'Treatments'], ['conditions.html', 'Conditions'],
  ['gallery.html', 'Gallery'], ['blog.html', 'Blog'], ['faq.html', 'FAQ'], ['contact.html', 'Contact'],
];
const THEME_ICONS = '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg><svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.8 4.8l1.8 1.8M17.4 17.4l1.8 1.8M4.8 19.2l1.8-1.8M17.4 6.6l1.8-1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>';
const TOP_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V6M5.5 12.5 12 6l6.500 6.500" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const BIO_P = "Dr. Ismaila Kishimi is a medical doctor (MBBS) from the Faculty of Medicine, Ahmadu Bello University, with a postgraduate diploma in family medicine from the National Postgraduate Medical College of Nigeria. He earned an MSc in Dermatology and Dermatosurgery at the Institute of Dermatology, Bangkok, Thailand, where he spent three years training in dermatology, dermatosurgery and aesthetic techniques, and went on to fellowship training in allergic and occupational dermatology and in laser and cutaneous surgery at the same institute.";
const TEAM_P = "At Zmedspa, the team treats conditions of the skin, hair and nails and explains every diagnosis and treatment plan in plain language, so you know what to expect.";
const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.2 2 11.4c0 2.1.8 4.1 2.1 5.7L3 22l5.1-1.6c1.2.5 2.5.7 3.9.7 5.5 0 10-4.2 10-9.7S17.5 2 12 2z"/></svg>';


function page({ file, title, desc, head, body, flag }) {
  const nav = NAV.map(([f, l]) => `<a href="${f}"${f === file ? ' aria-current="page"' : ''}>${l}</a>`).join('\n      ');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${desc}">
<meta name="color-scheme" content="light dark">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Zmedspa">
${LIVE ? '' : '<meta name="robots" content="noindex">'}
<script type="application/ld+json">${LD}</script>
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<link rel="icon" type="image/png" href="logo.png">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&display=swap">
<script>try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
  <header class="top">
    <a class="brand" href="index.html" style="text-decoration:none"><img src="logo.png" alt="Zmedspa logo" width="44" height="44"><span>Zmedspa<small>Dermatology &amp; aesthetic clinic</small></span></a>
    <nav id="site-nav" aria-label="Main">
      ${nav}
      <a class="cta" href="book.html">Book appointment</a>
    </nav>
    <div class="tools">
      <button class="theme-btn" type="button" aria-label="Switch to dark mode">${THEME_ICONS}<span class="theme-label">Dark</span></button>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    </div>
  </header>
${head}
  <main id="main">
${body}
  </main>

  <footer>
    <div class="cols">
      <div><strong>Zmedspa</strong> (MZ Derma Clinics)<br>Dermatology and aesthetic clinic, led by Dr. Ismaila Kishimi<br>Klimmat Plaza, Asba and Dantata Street, Gwarinpa 2, Abuja<br>Monday to Saturday, 11:00 am to 7:00 pm</div>
      <div><h4>Pages</h4><a href="about.html">About</a><a href="treatments.html">Treatments</a><a href="conditions.html">Conditions</a><a href="gallery.html">Gallery</a></div>
      <div><h4>More</h4><a href="blog.html">Blog</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a><a href="book.html">Book appointment</a></div>
    </div>
    <div>Information on this site is general and does not replace a consultation. In an emergency, go to the nearest hospital.</div>
  </footer>
</div>
<button class="totop" type="button" aria-label="Back to top">${TOP_ICON}</button>
<a class="wa-float" href="https://wa.me/2349161036572" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_ICON}<span>WhatsApp</span></a>
<script src="site.js"></script>
</body>
</html>
`;
}

function head(eyebrow, h1, lead) {
  return `  <div class="page-head">
    <span class="burst" aria-hidden="true"></span><span class="burst b2" aria-hidden="true"></span>
    <div class="eyebrow">${eyebrow}</div>
    <h1>${h1}</h1>
    <p>${lead}</p>
  </div>`;
}
const cta = (text) => `
    <div class="cta-band">
      <h2>Ready to book?</h2>
      <p>${text || 'Choose an in-person visit at the clinic or an online consultation, and we will confirm a time with you on WhatsApp.'}</p>
      <div class="actions"><a class="btn primary" href="book.html">Book an appointment</a><a class="btn ghost" href="faq.html">Read the FAQ</a></div>
    </div>`;
const write = (f, html) => { fs.writeFileSync(path.join(OUT, f), html); console.log('wrote', f); };

// ---------- Services data ----------
const services = [
  { id: 'skin', name: 'Skin', blurb: 'Common skin conditions, diagnosed and treated.',
    long: 'Skin concerns are the most common reason people see a dermatologist. After examining your skin, we explain what is causing the problem and set out a treatment plan you can follow at home.',
    items: ['Acne', 'Atopic dermatitis (eczema)', 'Seborrheic dermatitis', 'Skin infections and infestations'] },
  { id: 'hair', name: 'Hair', blurb: 'Hair loss and scalp concerns.',
    long: 'Hair loss has many possible causes. A careful history and examination, with simple tests where needed, help find the cause so treatment is aimed at the right problem.',
    items: ['Alopecias, scarring and non-scarring', 'Hair mount for hair analysis and diagnosis', 'Scalp biopsy where needed'] },
  { id: 'nails', name: 'Nails', blurb: 'Nail disease and nail surgery.',
    long: 'Nail problems can be slow to treat, so an early and accurate diagnosis matters. We look at the nail, explain the cause and discuss realistic timelines, and we perform nail surgery in the clinic.',
    items: ['Nail infections', 'Ingrown toenail surgery', 'Dystrophic nail surgery', 'Nail bed and matrix biopsies', 'Partial and complete nail avulsion with matricectomy', 'Lister\u2019s granuloma surgery', 'Pincer nail surgery with flap reconstruction', 'Glomus tumour removal', 'Subungual foreign body removal'] },
  { id: 'aesthetic', name: 'Aesthetic medicine', blurb: 'Treatments to refresh and renew the skin.',
    long: 'Aesthetic treatments begin with a consultation, where we talk about what you would like to change and which options suit your skin.',
    items: ['Botulinum toxin', 'Hyaluronic acid dermal fillers (volumising)', 'Collagen biostimulators (PLLA, CAHA)', 'Skin boosters (Pink Glow, Amber Glow, PDRN, exosomes)', 'Microneedling, with actives or PRP', 'PRP injections'] },
  { id: 'peels', name: 'Chemical peels', blurb: 'Peels for pigmentation, acne, texture and scars.',
    long: 'Peels are chosen for your skin type and concern. We explain the number of sessions and how to care for your skin afterwards.',
    items: ['Brightening and depigmenting peels (Melanostop, BSK, Cosmelan)', 'Resurfacing peels, superficial and medium depth with TCA', 'Body peels for keratosis pilaris', 'Acne-specific peels (salicylic acid, azelan)', 'TCA CROSS for acne scars'] },
  { id: 'laser', name: 'Laser and hair removal', blurb: 'Laser treatments and permanent hair removal.',
    long: 'Laser treatments are planned around your skin type and goals. Most need more than one session, and we explain the number of sessions and the aftercare at your consultation.',
    items: ['CO2 laser for skin lesions: dermatosis papulosa nigra (DPN), warts, seborrheic keratosis, syringoma and sebaceous gland hyperplasia', 'CO2 laser resurfacing', 'Pigment removal laser (1064 nm Q-switched Nd:YAG)', 'Hair removal laser (1064 nm long-pulsed Nd:YAG)', 'Electrolysis for permanent hair removal', 'Carbon peeling'] },
  { id: 'surgery', name: 'Cutaneous surgery and biopsies', blurb: 'Skin biopsies and minor surgical procedures.',
    long: 'Minor skin procedures are done in the clinic. We explain the procedure, the aftercare and what to expect before we begin.',
    items: ['Excisional and incisional biopsies of skin lesions', 'Punch biopsies of skin, scalp and nails', 'Shave biopsies', 'Lipoma excision', 'Inclusion and steatocystoma cyst excision', 'Removal of skin tags, seborrheic keratosis, xanthelasma, syringoma and sebaceous gland hypertrophy with CO2 laser or electrocautery', 'Wart removal (genital, plantar and body) with CO2 laser, electrocautery or cryotherapy'] },
  { id: 'scars', name: 'Scar and keloid treatment', blurb: 'Treatment for keloids, acne scars and tribal marks.',
    long: 'Scars need a plan matched to the type of scar and your skin. We explain the options, how many sessions to expect and the aftercare.',
    items: ['Keloid injections', 'Cryotherapy for keloids', 'Keloid excision', 'Acne scar treatment: subcision, punch elevation, punch excision, TCA CROSS and CO2 laser resurfacing', 'Tribal mark revision surgery'] },
  { id: 'cryo', name: 'Cryotherapy', blurb: 'Freezing treatment for warts, skin growths and keloids.',
    long: 'Cryotherapy uses extreme cold to treat selected skin growths. We explain what to expect during and after treatment.',
    items: ['Intralesional cryotherapy for keloids', 'Cryotherapy for plantar and palmar warts', 'Skin tags and seborrheic keratosis'] },
  { id: 'allergic', name: 'Allergic and occupational dermatology', blurb: 'Skin problems caused by allergy or by work.',
    long: 'Some skin problems are triggered by something you touch at home or at work. Finding the trigger is often the key to clearing the problem.',
    items: ['Contact allergy and patch testing', 'Work-related skin disease', 'Hand eczema'] },
  { id: 'diagnostics', name: 'Dermatology investigations', blurb: 'In-clinic tests to confirm a diagnosis.',
    long: 'A correct diagnosis comes first. These simple in-clinic tests help us confirm what is causing your problem.',
    items: ['Dermoscopy', 'Wood\u2019s lamp examination', 'Hair mount for hair analysis and diagnosis', 'Skin scrapings for KOH microscopy'] },
];

// Line icons for each treatment area (24x24, drawn with currentColor strokes).
const ICONS = {
  skin: '<path d="M12 3.5c3 4 5.5 6.8 5.5 10a5.5 5.5 0 0 1-11 0c0-3.2 2.5-6 5.5-10z"/><path d="M9.3 14.2a2.8 2.8 0 0 0 2.4 2.5"/>',
  hair: '<path d="M6 3.5c2.2 3-2.2 5 0 8.500s-2.200 5 0 8.500"/><path d="M12 3.5c2.2 3-2.2 5 0 8.500s-2.200 5 0 8.500"/><path d="M18 3.5c2.2 3-2.2 5 0 8.500s-2.200 5 0 8.500"/>',
  nails: '<path d="M8 21V11a4 4 0 0 1 8 0v10"/><path d="M10 11V9.800a2 2 0 0 1 4 0V11z"/>',
  aesthetic: '<path d="M11 3l1.900 5.100L18 10l-5.100 1.900L11 17l-1.900-5.100L4 10l5.100-1.900z"/><path d="M18.500 15.500v4M16.500 17.500h4"/>',
  peels: '<path d="M9.500 3h5"/><path d="M10.500 3v5.500L5.200 18a2 2 0 0 0 1.800 3h10a2 2 0 0 0 1.800-3L13.500 8.500V3"/><path d="M8 15h8"/>',
  laser: '<path d="M13 2.500L5 13.500h6l-1 8 8-11h-6z"/>',
  surgery: '<circle cx="6" cy="6" r="2.500"/><circle cx="6" cy="18" r="2.500"/><path d="M8 7.500L20 17M8 16.500L20 7"/>',
  scars: '<g transform="rotate(-40 12 12)"><rect x="2" y="8.500" width="20" height="7" rx="3.500"/><path d="M9.500 8.500v7M14.500 8.500v7"/></g>',
  cryo: '<path d="M12 2.500v19M3.800 7.250l16.400 9.500M3.800 16.750l16.400-9.500"/><path d="M9.500 4.500L12 7l2.500-2.500M9.500 19.500L12 17l2.500 2.500"/>',
  allergic: '<rect x="7" y="2.500" width="10" height="19" rx="2.500"/><circle cx="10.200" cy="7.500" r="1.300"/><circle cx="13.800" cy="7.500" r="1.300"/><circle cx="10.200" cy="12" r="1.300"/><circle cx="13.800" cy="12" r="1.300"/><circle cx="10.200" cy="16.500" r="1.300"/><circle cx="13.800" cy="16.500" r="1.300"/>',
  diagnostics: '<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500L21 21"/><path d="M8.500 10.500h4M10.500 8.500v4"/>',
};
const icon = (id) => '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + ICONS[id] + '</svg>';

// ---------- Articles ----------
const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');
function inline(t) {
  return t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
// Small markdown renderer: paragraphs, ## headings, - lists, **bold**, [links](url).
function md(text) {
  const out = []; let list = [];
  const flush = () => { if (list.length) { out.push('<ul>' + list.map(x => '<li>' + inline(x) + '</li>').join('') + '</ul>'); list = []; } };
  text.replace(/\r/g, '').split(/\n\s*\n/).forEach(block => {
    block.split('\n').forEach(line => {
      if (/^\s*[-*] /.test(line)) list.push(line.replace(/^\s*[-*] /, ''));
      else if (/^##\s/.test(line)) { flush(); out.push('<h2>' + inline(line.replace(/^##\s+/, '')) + '</h2>'); }
      else if (line.trim()) { flush(); out.push('<p>' + inline(line.trim()) + '</p>'); }
    });
    flush();
  });
  return out.join('\n');
}
function frontmatter(raw) {
  const m = raw.replace(/\r/g, '').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  m[1].split('\n').forEach(l => { const k = l.indexOf(':'); if (k > 0) meta[l.slice(0, k).trim()] = l.slice(k + 1).trim().replace(/^"(.*)"$/, '$1'); });
  return { meta, body: m[2] };
}
// Remove old generated article pages so deleted posts disappear.
fs.readdirSync(__dirname).filter(f => /^blog-.+\.html$/.test(f)).forEach(f => fs.unlinkSync(path.join(__dirname, f)));
const articles = fs.readdirSync(path.join(__dirname, 'content/blog')).filter(f => f.endsWith('.md')).map(f => {
  const { meta, body } = frontmatter(read('content/blog/' + f));
  return { slug: f.replace(/\.md$/, ''), tag: meta.tag || 'Article', title: meta.title, summary: meta.summary || '', date: meta.date || '', body: md(body) };
}).sort((a, b) => String(b.date).localeCompare(String(a.date)));

// ---------- HOME ----------
const home = (() => {
  const hero = `  <div class="hero">
    <span class="burst" aria-hidden="true"></span><span class="burst b2" aria-hidden="true"></span>
    <div class="hero-copy">
      <div class="eyebrow">Zmedspa &middot; MZ Derma Clinics</div>
      <h1>Dermatology</h1>
      <p class="tagline">Clear answers for your skin, hair and nails.</p>
      <p class="lead">Zmedspa (MZ Derma Clinics) in Gwarinpa, Abuja offers medical, aesthetic and surgical dermatology, led by Dr. Ismaila Kishimi. We explain every diagnosis and treatment in plain language, so you know what to expect.</p>
      <div class="actions">
        <a class="btn primary" href="book.html">Book an appointment</a>
        <a class="btn ghost" href="treatments.html">See what we treat</a>
      </div>
    </div>
    <div class="hero-photo">
      <img class="portrait" src="images/portrait.jpg" alt="Dr. Ismaila Kishimi in blue scrubs" width="640" height="800">
      <div class="name-tag"><strong>Dr. Ismaila Kishimi, MBBS, MSc</strong><span>Dermatology and dermatosurgery</span></div>
    </div>
  </div>`;
  const body = `
    <div class="stats" aria-label="Zmedspa at a glance">
      <div class="stat"><b>${services.length}</b><span>areas of care</span></div>
      <div class="stat"><b>6</b><span>days a week, 11 am to 7 pm</span></div>
      <div class="stat"><b>2</b><span>ways to consult: in person or online</span></div>
    </div>

    <section id="about">
      <div class="head"><span class="pill">About the doctor</span><h2>Meet your dermatosurgeon</h2></div>
      <p class="about-text">Dr. Ismaila Kishimi is a medical doctor (MBBS) from the Faculty of Medicine, Ahmadu Bello University, with a postgraduate diploma in family medicine from the National Postgraduate Medical College of Nigeria. He earned an MSc in Dermatology and Dermatosurgery at the Institute of Dermatology, Bangkok, Thailand, where he spent three years training in dermatology, dermatosurgery and aesthetic techniques, and went on to fellowship training in allergic and occupational dermatology and in laser and cutaneous surgery at the same institute. At Zmedspa, the team treats conditions of the skin, hair and nails and explains every diagnosis and treatment plan in plain language, so you know what to expect.</p>
      <div class="facts">
        <div class="fact brown"><small>Qualifications</small><div><div class="big">MBBS, MSc</div><div class="desc">Dermatology and Dermatosurgery</div></div></div>
        <div class="fact cream">
          <small class="text">Clinical fellowship</small>
          <img src="images/certificate.jpg" alt="Dr. Kishimi receiving a fellowship certificate at the Institute of Dermatology, Bangkok" loading="lazy" width="800" height="799">
          <div class="text"><div class="big" style="font-size:2rem">Bangkok</div><div class="desc">Institute of Dermatology, Thailand. Allergic and occupational dermatology, laser and cutaneous surgery.</div></div>
        </div>
        <div class="fact photo">
          <img src="images/laser-room.jpg" alt="Laser machines and a cryotherapy flask in the clinic treatment room" loading="lazy" width="800" height="1000">
          <small class="top-label">Clinic hours</small>
          <div><div class="big" style="font-size:2.4rem">Mon to Sat</div><div class="desc">11:00 am to 7:00 pm, Gwarinpa 2, Abuja</div></div>
        </div>
      </div>
      <div class="actions" style="justify-content:center;margin-top:28px"><a class="btn ghost" href="about.html">More about Dr. Kishimi</a></div>
    </section>

    <section id="services">
      <div class="head"><span class="pill">Treatments</span><h2>What we treat</h2>
        <p class="section-intro">We explain each condition in plain language so you know what to expect before your visit.</p></div>
      <div class="collage">
        <figure class="c1"><img src="images/laser-room.jpg" alt="Laser machines and a cryotherapy flask in the clinic treatment room" loading="lazy"></figure>
        <figure class="c2"><img src="images/chemical-peel.jpg" alt="A bowl of peel solution, a flat brush and folded gauze on a pale green surface" loading="lazy"></figure>
        <div class="c4">Medical, aesthetic, laser and surgical dermatology under one roof.</div>
        <figure class="c3"><img src="images/certificate.jpg" alt="Dr. Kishimi receiving a fellowship certificate at the Institute of Dermatology, Bangkok" loading="lazy"></figure>
      </div>
      <div class="services">
${services.map((s, i) => `        <a class="tile" href="treatments.html#${s.id}"><span class="ico-badge">${icon(s.id)}</span><h3>${s.name}</h3><p>${s.blurb}</p><span class="more">Learn more &rarr;</span></a>`).join('\n')}
      </div>
    </section>

    <section id="clinic">
      <div class="head"><span class="pill">The clinic</span>
        <p class="statement"><b>Dermatology, aesthetic medicine</b> and <b>cutaneous surgery</b> in one considered clinic, with care that continues <span>beyond treatment.</span></p></div>
      <div class="circles">
        <img src="images/procedure.png" alt="Dr. Kishimi performing a laser procedure, wearing a mask and protective eyewear" loading="lazy" width="400" height="400">
        <img src="images/laser-room.jpg" alt="Two laser machines and a cryotherapy flask in the clinic treatment room" loading="lazy" width="800" height="1000">
        <img src="images/portrait.jpg" alt="Dr. Ismaila Kishimi in blue scrubs" loading="lazy" width="640" height="800">
      </div>
      <p class="circles-caption">Laser procedures &middot; Laser and cryotherapy equipment &middot; Consultations</p>
      <div class="actions" style="justify-content:center;margin-top:28px"><a class="btn ghost" href="gallery.html">See the gallery</a></div>
    </section>

    <section id="learn">
      <div class="head"><span class="pill">Learn</span><h2>From the blog</h2></div>
      <div class="grid3">
${articles.map(a => `        <a class="tile" href="blog-${a.slug}.html"><span class="tag">${a.tag}</span><h3>${a.title}</h3><p>${a.summary}</p><span class="more">Read article &rarr;</span></a>`).join('\n')}
      </div>
    </section>
${newsletter()}
${cta()}`;
  return page({ file: 'index.html', title: 'Zmedspa | Dermatology and Aesthetic Clinic in Gwarinpa, Abuja', desc: 'Zmedspa (MZ Derma Clinics) is a dermatology and aesthetic clinic in Gwarinpa, Abuja, led by Dr. Ismaila Kishimi. Request an in-person or online appointment.', head: hero, body, flag: false });
})();


write('index.html', home);

const CARD = 'style="background:var(--surface);border:1px solid var(--line)"';
const DETAILS = `<dl>
            <div><dt>Clinic</dt><dd>Zmedspa (MZ Derma Clinics)</dd></div>
            <div><dt>Address</dt><dd>Klimmat Plaza, Asba and Dantata Street, Gwarinpa 2, Abuja</dd></div>
            <div><dt>Opening hours</dt><dd>Monday to Saturday, 11:00 am to 7:00 pm</dd></div>
            <div><dt>Phone and WhatsApp</dt><dd><a href="tel:+2349161036572">0916 103 6572</a></dd></div>
          </dl>`;

// ---------- ABOUT ----------
write('about.html', page({ file: 'about.html', title: 'About Dr. Ismaila Kishimi, Dermatologist in Abuja', desc: 'Dr. Ismaila Kishimi is a dermatologist and dermatosurgeon with an MSc in Dermatology and Dermatosurgery and a fellowship at the Institute of Dermatology, Bangkok.',
  head: head('About the doctor', 'Meet Dr. Ismaila Kishimi', 'A dermatosurgeon who explains every diagnosis and treatment in plain language.'),
  body: `
    <section>
      <div class="prose">
        <p>${BIO_P}</p>
        <p>${TEAM_P}</p>
        <h2>Training and qualifications</h2>
        <ul>
          <li>MBBS, Faculty of Medicine, Ahmadu Bello University</li>
          <li>Postgraduate diploma in family medicine, National Postgraduate Medical College of Nigeria</li>
          <li>MSc in Dermatology and Dermatosurgery, Institute of Dermatology, Bangkok, Thailand (three years of training in dermatology, dermatosurgery and aesthetic techniques)</li>
          <li>Fellowship training in allergic and occupational dermatology, and in laser and cutaneous surgery, Institute of Dermatology, Bangkok</li>
        </ul>
        <h2>Areas of practice</h2>
        <ul><li>Clinical dermatology for skin, hair and nails</li><li>Dermatosurgery, biopsies and nail surgery</li><li>Scar and keloid treatment</li><li>Laser and hair removal</li><li>Chemical peels and aesthetic medicine</li><li>Allergic and occupational dermatology</li></ul>
        <h2>How we work</h2>
        <p>Every visit begins with listening. We examine the problem, explain what we find, and agree a plan with you. You should leave knowing what is wrong, what the treatment involves and when to come back.</p>
      </div>
      <div class="facts" style="margin-top:44px">
        <div class="fact photo"><img src="images/portrait.jpg" alt="Dr. Ismaila Kishimi in blue scrubs" loading="lazy" width="640" height="800"><small class="top-label">Dermatologist</small><div><div class="big" style="font-size:2.2rem">Dr. Kishimi</div><div class="desc">Dermatology and dermatosurgery</div></div></div>
        <div class="fact cream"><small class="text">Clinical fellowship</small><img src="images/certificate.jpg" alt="Dr. Kishimi receiving a fellowship certificate at the Institute of Dermatology, Bangkok" loading="lazy" width="800" height="799"><div class="text"><div class="big" style="font-size:2rem">Bangkok</div><div class="desc">Institute of Dermatology, Thailand</div></div></div>
        <div class="fact brown"><small>Qualifications</small><div><div class="big">MBBS, MSc</div><div class="desc">Dermatology and Dermatosurgery</div></div></div>
      </div>
    </section>
${cta()}` }));

// ---------- TREATMENTS ----------
write('treatments.html', page({ file: 'treatments.html', title: 'Dermatology Treatments in Gwarinpa, Abuja | Zmedspa', desc: 'Skin, hair and nail treatments, aesthetic medicine, laser and hair removal, cutaneous surgery and allergic dermatology at Zmedspa, Gwarinpa, Abuja.', flag: true,
  head: head('Treatments', 'What we treat and how we can help', 'Medical, aesthetic, laser and surgical dermatology under one roof.'),
  body: `
    <section>
${services.map((s, i) => `      <div class="detail" id="${s.id}">
        <div><div class="ico-badge big">${icon(s.id)}</div><h2>${s.name}</h2></div>
        <div>
          <p>${s.long}</p>
          <ul>${s.items.map(x => `<li>${x}</li>`).join('')}</ul>
          <p>Whether a treatment is right for you, how many sessions it needs and the cost are all discussed at your consultation.</p>
          <div class="actions" style="margin-top:16px"><a class="btn ghost" href="book.html">Book a consultation</a></div>
        </div>
      </div>`).join('\n')}
    </section>
${cta()}` }));

// ---------- CONDITIONS ----------
const conditions = [
  ['Acne and acne scars', 'Blocked, inflamed pores that cause spots, deep lumps and sometimes marks or scars.', 'Spots that are painful, scarring, or not improving with simple care.', 'skin'],
  ['Eczema and dermatitis', 'Dry, itchy, inflamed skin that can flare up and settle again.', 'Weeping or cracked skin, poor sleep from itching, or a rash that keeps returning.', 'skin'],
  ['Psoriasis', 'Thick, scaly, well-defined patches, often on the elbows, knees and scalp.', 'Patches that spread, crack, or affect the joints or nails.', 'skin'],
  ['Fungal skin infections', 'Itchy, ring-shaped or scaly patches caused by fungus, such as ringworm.', 'A rash that is spreading or has not cleared after a short course of home treatment.', 'skin'],
  ['Hair loss', 'Thinning or shedding that can have many causes, from genes to stress to scalp disease.', 'Sudden shedding, bald patches, or thinning that worries you.', 'hair'],
  ['Dandruff and scalp conditions', 'Flaking, itching or redness of the scalp.', 'Flaking with redness, sores or hair loss.', 'hair'],
  ['Fungal nail infection', 'Thickened, discoloured or crumbly nails, most often on the toes.', 'Changes to the nail that are spreading or painful.', 'nails'],
  ['Contact allergy', 'A rash triggered by something that touches the skin, such as a metal, cosmetic or work material.', 'A rash on the hands or face that keeps returning without a clear cause.', 'allergic'],
  ['Hand eczema', 'Dry, cracked, itchy hands, often linked to wet work or irritants.', 'Cracks that bleed, or hand problems that affect your work.', 'allergic'],
];
const TAGS = { skin: 'Skin', hair: 'Hair', nails: 'Nails', allergic: 'Allergy' };
write('conditions.html', page({ file: 'conditions.html', title: 'Common Skin, Hair and Nail Conditions | Zmedspa', desc: 'Plain-language guides to common skin, hair and nail conditions, and when to see a dermatologist.', flag: true,
  head: head('Conditions', 'Common conditions, in plain language', 'A short guide to what we see most often, and when it is worth booking a visit.'),
  body: `
    <section>
      <div class="grid3">
${conditions.map(c => `        <a class="tile" href="treatments.html#${c[3]}"><span class="tag">${TAGS[c[3]]}</span><h3>${c[0]}</h3><p>${c[1]}</p><p><b>See a doctor if:</b> ${c[2]}</p><span class="more">Related treatments &rarr;</span></a>`).join('\n')}
      </div>
      <p class="note" style="text-align:center;margin-top:24px">This page is general information. Please book a consultation for a proper diagnosis.</p>
    </section>
${cta()}` }));

// ---------- GALLERY ----------
write('gallery.html', page({ file: 'gallery.html', title: 'Clinic Gallery | Zmedspa', desc: 'Photos of the Zmedspa clinic, laser equipment and procedures in Gwarinpa, Abuja.', flag: false,
  head: head('Gallery', 'Inside the clinic', 'Treatment room, equipment and procedures.'),
  body: `
    <section>
      <div class="gallery">
${JSON.parse(read('content/gallery.json')).items.map(g => `        <figure><img src="${g.image}" alt="${g.alt || ''}" loading="lazy"><figcaption>${g.caption || ''}</figcaption></figure>`).join('\n')}
      </div>
      <p class="note" style="text-align:center;margin-top:24px"><span class="ph">[Before-and-after photos can be added here once patients have given written consent]</span></p>
    </section>
${cta()}` }));

// ---------- BLOG ----------
write('blog.html', page({ file: 'blog.html', title: 'Skin Health Articles | Zmedspa', desc: 'Plain-language articles on skin, hair and nail health from Dr. Ismaila Kishimi.', flag: true,
  head: head('Blog', 'Skin health, explained', 'Short, practical articles you can read before your visit.'),
  body: `
    <section>
      <div class="grid3">
${articles.map(a => `        <a class="tile" href="blog-${a.slug}.html"><span class="tag">${a.tag}</span><h3>${a.title}</h3><p>${a.summary}</p><span class="more">Read article &rarr;</span></a>`).join('\n')}
      </div>
    </section>
${newsletter()}
${cta()}` }));
articles.forEach(a => write(`blog-${a.slug}.html`, page({ file: 'blog.html', title: `${a.title} | Zmedspa`, desc: a.summary, flag: true,
  head: head(a.tag, a.title, a.summary),
  body: `
    <p class="crumbs"><a href="blog.html">&larr; All articles</a></p>
    <section style="padding-top:32px"><article class="prose">${a.body}<p class="note" style="margin-top:28px">This article is general information and does not replace a consultation.</p></article></section>
${cta()}` })));

// ---------- FAQ ----------
const faqs = JSON.parse(read('content/faq.json')).items.map(i => [i.question, i.answer]);
write('faq.html', page({ file: 'faq.html', title: 'Frequently Asked Questions | Zmedspa', desc: 'Answers to common questions about appointments, online consultations, costs and the clinic.', flag: true,
  head: head('FAQ', 'Questions patients often ask', 'If your question is not here, message us on WhatsApp.'),
  body: `
    <section>
      <div class="faq">
${faqs.map(f => `        <details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('\n')}
      </div>
    </section>
${cta('Still unsure? Send a message and we will help you choose.')}` }));

// ---------- BOOK ----------
write('book.html', page({ file: 'book.html', title: 'Book an Appointment | Zmedspa', desc: 'Request an in-person or online dermatology appointment with Dr. Ismaila Kishimi in Gwarinpa, Abuja.', flag: false,
  head: head('Book', 'Request an appointment', 'Send us your details and we will confirm a time with you on WhatsApp.'),
  body: `
    <section id="book" style="padding-top:40px">
      <div class="visit">
        <div class="card" ${CARD}>
          <form id="bookForm">
            <label for="name">Full name<input id="name" name="name" type="text" autocomplete="name" placeholder="Your name"></label>
            <label for="phone">Phone number<input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="Include country code"></label>
            <fieldset style="border:0;padding:0;margin:0"><legend style="font-size:14px;font-weight:600;margin-bottom:6px">Type of consultation</legend>
              <div class="choice">
                <label><input type="radio" name="kind" value="In person at the clinic" checked> In person</label>
                <label><input type="radio" name="kind" value="Online"> Online</label>
              </div>
            </fieldset>
            <label for="when">Preferred day<select id="when" name="when"><option>Any weekday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></label>
            <label for="time">Preferred time<select id="time" name="time"><option>Any time</option><option>Late morning (11 am to 1 pm)</option><option>Afternoon (1 pm to 4 pm)</option><option>Late afternoon (4 pm to 7 pm)</option></select></label>
            <label for="concern">How can we help you?<textarea id="concern" name="concern" placeholder="A few words about your skin, hair or nail concern"></textarea></label>
            <a class="btn primary" id="waLink" href="https://wa.me/" target="_blank" rel="noopener" style="text-align:center">Continue on WhatsApp</a>
            <p class="note">The button opens WhatsApp with your message filled in. Nothing is sent until you press send in WhatsApp.</p>
          </form>
        </div>
        <div class="card" ${CARD}>
          <figure class="card-img"><img src="images/consultation.jpg" alt="A dermatologist in a white coat consulting with a patient at a desk in a bright room" loading="lazy"><figcaption>Illustrative image</figcaption></figure>
          <h3 style="margin-bottom:18px">Clinic details</h3>
          ${DETAILS}
        </div>
      </div>
    </section>` }));

// ---------- CONTACT ----------
const MAPQ = 'Klimmat%20Plaza%2C%20Asba%20and%20Dantata%20Street%2C%20Gwarinpa%202%2C%20Abuja';
write('contact.html', page({ file: 'contact.html', title: 'Contact and Directions | Zmedspa', desc: 'Address, opening hours, phone and map for Zmedspa (MZ Derma Clinics), Gwarinpa 2, Abuja.', flag: false,
  head: head('Contact', 'Visit or contact the clinic', 'Gwarinpa 2, Abuja. Monday to Saturday, 11:00 am to 7:00 pm.'),
  body: `
    <section id="contact" style="padding-top:40px">
      <div class="visit">
        <div class="card" ${CARD}>
          <h3 style="margin-bottom:18px">Clinic details</h3>
          ${DETAILS}
          <div class="actions" style="margin-top:22px"><a class="btn primary" href="book.html">Book an appointment</a></div>
        </div>
        <div class="card" ${CARD}>
          <div class="map" style="margin-top:0"><iframe title="Map of the clinic in Gwarinpa 2, Abuja" src="https://maps.google.com/maps?q=${MAPQ}&amp;z=16&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><a href="https://www.google.com/maps/search/?api=1&amp;query=${MAPQ}" target="_blank" rel="noopener">Open in Google Maps</a></div>
        </div>
      </div>
    </section>` }));

// ---------- 404 ----------
write('404.html', page({ file: '404.html', title: 'Page not found | Zmedspa', desc: 'This page could not be found.', flag: false,
  head: head('404', 'We could not find that page', 'The link may be old or mistyped.'),
  body: `
    <section style="padding-top:40px;text-align:center">
      <div class="actions" style="justify-content:center"><a class="btn primary" href="index.html">Back to home</a><a class="btn ghost" href="book.html">Book an appointment</a></div>
    </section>` }));
// 404 can be served from any path, so make its links root-relative.
fs.writeFileSync(path.join(OUT, '404.html'), fs.readFileSync(path.join(OUT, '404.html'), 'utf8').replace('<head>', '<head>\n<base href="/">'));
