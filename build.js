const fs = require('fs');
const path = require('path');
const OUT = __dirname;

const NAV = [
  ['index.html', 'Home'], ['about.html', 'About'], ['treatments.html', 'Treatments'], ['conditions.html', 'Conditions'],
  ['gallery.html', 'Gallery'], ['blog.html', 'Blog'], ['faq.html', 'FAQ'], ['contact.html', 'Contact'],
];
const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.2 2 11.4c0 2.1.8 4.1 2.1 5.7L3 22l5.1-1.6c1.2.5 2.5.7 3.9.7 5.5 0 10-4.2 10-9.7S17.5 2 12 2z"/></svg>';

const DRAFT = '<div class="draft-flag">Draft text for Dr. Kishim to review and approve before the site goes live.</div>';

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
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<link rel="icon" type="image/png" href="logo.png">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
  <header class="top">
    <a class="brand" href="index.html" style="text-decoration:none"><img src="logo.png" alt="Zmedspa logo" width="44" height="44"><span>Zmedspa<small>Dr. Ismaila Kishim, Dermatology</small></span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav id="site-nav" aria-label="Main">
      ${nav}
      <a class="cta" href="book.html">Book appointment</a>
    </nav>
  </header>
${head}
  <main id="main">
${flag ? DRAFT : ''}
${body}
  </main>

  <footer>
    <div class="cols">
      <div><strong>Dr. Ismaila Kishim, Dermatology</strong><br>Zmedspa (MZ Derma Clinics)<br>Klimmat Plaza, Asba and Dantata Street, Gwarinpa 2, Abuja<br>Monday to Saturday, 11:00 am to 7:00 pm</div>
      <div><h4>Pages</h4><a href="about.html">About</a><a href="treatments.html">Treatments</a><a href="conditions.html">Conditions</a><a href="gallery.html">Gallery</a></div>
      <div><h4>More</h4><a href="blog.html">Blog</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a><a href="book.html">Book appointment</a></div>
    </div>
    <div>Information on this site is general and does not replace a consultation. In an emergency, go to the nearest hospital.</div>
  </footer>
</div>
<a class="wa-float" href="https://wa.me/2349161036572" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_ICON}<span>WhatsApp</span></a>
<script src="site.js"></script>
</body>
</html>
`;
}

function head(eyebrow, h1, lead) {
  return `  <div class="page-head">
    <div class="eyebrow">${eyebrow}</div>
    <h1>${h1}</h1>
    <p>${lead}</p>
  </div>`;
}
const cta = (text) => `
    <div class="cta-band">
      <h2>Ready to book?</h2>
      <p>${text || 'Choose an in-person visit at the clinic or an online consultation, and I will confirm a time with you on WhatsApp.'}</p>
      <div class="actions"><a class="btn primary" href="book.html">Book an appointment</a><a class="btn ghost" href="faq.html">Read the FAQ</a></div>
    </div>`;
const write = (f, html) => { fs.writeFileSync(path.join(OUT, f), html); console.log('wrote', f); };

// ---------- Services data ----------
const services = [
  { id: 'skin', name: 'Skin', blurb: 'Conditions and treatments affecting the skin.', items: ['Acne and acne scars', 'Eczema and dermatitis', 'Psoriasis, fungal and other skin infections'],
    long: 'Skin concerns are the most common reason people see a dermatologist. After examining your skin, I explain what is causing the problem and set out a treatment plan you can follow at home.' },
  { id: 'hair', name: 'Hair', blurb: 'Hair and scalp concerns.', items: ['Hair loss', 'Dandruff and scalp conditions', 'Scalp infections'],
    long: 'Hair loss and scalp problems have many possible causes. A careful history and examination help find the cause so treatment is aimed at the right problem.' },
  { id: 'nails', name: 'Nails', blurb: 'Nail conditions and care.', items: ['Fungal nail infection', 'Nail psoriasis and other nail disorders', 'Ingrown nails'],
    long: 'Nail problems can be slow to treat, so an early and accurate diagnosis matters. I look at the nail, explain the cause and discuss realistic timelines.' },
  { id: 'aesthetic', name: 'Aesthetic medicine', blurb: 'Treatments to refresh and renew the skin.', items: ['Botulinum toxin', 'Dermal fillers', 'Collagen skin boosters', 'Chemical peels'],
    long: 'Aesthetic treatments begin with a consultation, where we talk about what you would like to change and which options suit your skin.' },
  { id: 'laser', name: 'Laser and hair removal', blurb: 'Laser and electrolysis treatments.', items: ['Laser hair removal', 'Electrolysis hair removal', 'Laser skin rejuvenation', 'Laser removal of skin growths'],
    long: 'Laser treatments are planned around your skin type and goals. Most need more than one session, and I explain the number of sessions and the aftercare at your consultation.' },
  { id: 'surgery', name: 'Cutaneous surgery', blurb: 'Minor surgical procedures for the skin.', items: ['Cyst removal', 'Lipoma removal', 'Cryotherapy', '<span class="ph">[Rest of the list to be confirmed by Dr. Kishim]</span>'],
    long: 'Minor skin procedures are done in the clinic. I explain the procedure, the aftercare and what to expect before we begin.' },
  { id: 'allergic', name: 'Allergic and occupational dermatology', blurb: 'Skin problems caused by allergy or by work.', items: ['Contact allergy and patch testing', 'Work-related skin disease', 'Hand eczema'],
    long: 'Some skin problems are triggered by something you touch at home or at work. Finding the trigger is often the key to clearing the problem.' },
];

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
    <div class="hero-copy">
      <div class="eyebrow">Dermatology and dermatosurgery</div>
      <h1>Clear answers for your skin, hair and nails.</h1>
      <p class="lead">I see patients with skin, hair and nail concerns, and I explain your diagnosis and treatment in plain language. I practise at Zmedspa (MZ Derma Clinics) in Gwarinpa, Abuja.</p>
      <div class="actions">
        <a class="btn primary" href="book.html">Book an appointment</a>
        <a class="btn ghost" href="treatments.html">See what I treat</a>
      </div>
    </div>
    <div class="hero-photo">
      <img class="portrait" src="images/portrait.jpg" alt="Dr. Ismaila Kishim in blue scrubs" width="640" height="800">
      <div class="name-tag"><strong>Dr. Ismaila Kishim, MD</strong><span>Dermatology and dermatosurgery</span></div>
    </div>
  </div>`;
  const body = `
    <section id="about">
      <div class="head"><span class="pill">About me</span><h2>Meet your dermatologist</h2></div>
      <p class="about-text">I am a dermatologist with an MSc in Dermatology and Dermatosurgery. I am currently a clinical fellow in allergic and occupational dermatology, laser and cutaneous surgery at the Institute of Dermatology in Bangkok, Thailand. I treat conditions of the skin, hair and nails, and I explain every diagnosis and treatment plan in plain language so you know what to expect.</p>
      <div class="facts">
        <div class="fact brown"><small>Qualifications</small><div><div class="big">MD, MSc</div><div class="desc">Dermatology and Dermatosurgery</div></div></div>
        <div class="fact cream">
          <small class="text">Clinical fellowship</small>
          <img src="images/certificate.jpg" alt="Dr. Kishim receiving a fellowship certificate at the Institute of Dermatology, Bangkok" loading="lazy" width="800" height="799">
          <div class="text"><div class="big" style="font-size:2rem">Bangkok</div><div class="desc">Institute of Dermatology, Thailand. Allergic and occupational dermatology, laser and cutaneous surgery.</div></div>
        </div>
        <div class="fact photo">
          <img src="images/laser-room.jpg" alt="Laser machines and a cryotherapy flask in the clinic treatment room" loading="lazy" width="800" height="1000">
          <small class="top-label">Clinic hours</small>
          <div><div class="big" style="font-size:2.4rem">Mon to Sat</div><div class="desc">11:00 am to 7:00 pm, Gwarinpa 2, Abuja</div></div>
        </div>
      </div>
      <div class="actions" style="justify-content:center;margin-top:28px"><a class="btn ghost" href="about.html">More about me</a></div>
    </section>

    <section id="services">
      <div class="head"><span class="pill">Treatments</span><h2>What I treat</h2>
        <p class="section-intro">I explain each condition in plain language so you know what to expect before your visit.</p></div>
      <div class="services">
${services.map((s, i) => `        <a class="tile" href="treatments.html#${s.id}"><span class="tag">0${i + 1}</span><h3>${s.name}</h3><p>${s.blurb}</p><span class="more">Learn more &rarr;</span></a>`).join('\n')}
      </div>
    </section>

    <section id="clinic">
      <div class="head"><span class="pill">The clinic</span>
        <p class="statement"><b>Dermatology, aesthetic medicine</b> and <b>cutaneous surgery</b> in one considered clinic, with care that continues <span>beyond treatment.</span></p></div>
      <div class="circles">
        <img src="images/procedure.png" alt="Dr. Kishim performing a laser procedure, wearing a mask and protective eyewear" loading="lazy" width="400" height="400">
        <img src="images/laser-room.jpg" alt="Two laser machines and a cryotherapy flask in the clinic treatment room" loading="lazy" width="800" height="1000">
        <img src="images/portrait.jpg" alt="Dr. Ismaila Kishim in blue scrubs" loading="lazy" width="640" height="800">
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
${cta()}`;
  return page({ file: 'index.html', title: 'Dr. Ismaila Kishim, Dermatology', desc: 'Dermatology practice for skin, hair and nail concerns in Gwarinpa, Abuja. Request an in-person or online appointment.', head: hero, body, flag: false });
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
write('about.html', page({ file: 'about.html', title: 'About Dr. Ismaila Kishim, Dermatologist in Abuja', desc: 'Dr. Ismaila Kishim is a dermatologist and dermatosurgeon with an MSc in Dermatology and Dermatosurgery and a fellowship at the Institute of Dermatology, Bangkok.',
  head: head('About me', 'Meet Dr. Ismaila Kishim', 'A dermatologist who explains your diagnosis and treatment in plain language.'),
  body: `
    <section>
      <div class="prose">
        <p>I am a dermatologist with an MSc in Dermatology and Dermatosurgery. I treat conditions of the skin, hair and nails, and I explain every diagnosis and treatment plan in plain language so you know what to expect.</p>
        <h2>Training and fellowship</h2>
        <ul>
          <li>MD, Doctor of Medicine</li>
          <li>MSc in Dermatology and Dermatosurgery</li>
          <li>Clinical fellow in allergic and occupational dermatology, laser and cutaneous surgery at the Institute of Dermatology, Bangkok, Thailand</li>
        </ul>
        <h2>Areas of practice</h2>
        <ul><li>Medical dermatology for skin, hair and nails</li><li>Aesthetic medicine</li><li>Laser treatments and hair removal</li><li>Cutaneous (skin) surgery</li><li>Allergic and occupational dermatology</li></ul>
        <h2>How I work</h2>
        <p>Every visit begins with listening. I examine the problem, explain what I find, and agree a plan with you. You should leave knowing what is wrong, what the treatment involves and when to come back.</p>
      </div>
      <div class="facts" style="margin-top:44px">
        <div class="fact photo"><img src="images/portrait.jpg" alt="Dr. Ismaila Kishim in blue scrubs" loading="lazy" width="640" height="800"><small class="top-label">Dermatologist</small><div><div class="big" style="font-size:2.2rem">Dr. Kishim</div><div class="desc">Dermatology and dermatosurgery</div></div></div>
        <div class="fact cream"><small class="text">Clinical fellowship</small><img src="images/certificate.jpg" alt="Dr. Kishim receiving a fellowship certificate at the Institute of Dermatology, Bangkok" loading="lazy" width="800" height="799"><div class="text"><div class="big" style="font-size:2rem">Bangkok</div><div class="desc">Institute of Dermatology, Thailand</div></div></div>
        <div class="fact brown"><small>Qualifications</small><div><div class="big">MD, MSc</div><div class="desc">Dermatology and Dermatosurgery</div></div></div>
      </div>
    </section>
${cta()}` }));

// ---------- TREATMENTS ----------
write('treatments.html', page({ file: 'treatments.html', title: 'Dermatology Treatments in Gwarinpa, Abuja | Dr. Kishim', desc: 'Skin, hair and nail treatments, aesthetic medicine, laser and hair removal, cutaneous surgery and allergic dermatology at Zmedspa, Gwarinpa, Abuja.', flag: true,
  head: head('Treatments', 'What I treat and how I can help', 'Medical, aesthetic, laser and surgical dermatology under one roof.'),
  body: `
    <section>
${services.map((s, i) => `      <div class="detail" id="${s.id}">
        <div><div class="num">0${i + 1}</div><h2>${s.name}</h2></div>
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
write('conditions.html', page({ file: 'conditions.html', title: 'Common Skin, Hair and Nail Conditions | Dr. Kishim', desc: 'Plain-language guides to common skin, hair and nail conditions, and when to see a dermatologist.', flag: true,
  head: head('Conditions', 'Common conditions, in plain language', 'A short guide to what I see most often, and when it is worth booking a visit.'),
  body: `
    <section>
      <div class="grid3">
${conditions.map(c => `        <a class="tile" href="treatments.html#${c[3]}"><span class="tag">${TAGS[c[3]]}</span><h3>${c[0]}</h3><p>${c[1]}</p><p><b>See a doctor if:</b> ${c[2]}</p><span class="more">Related treatments &rarr;</span></a>`).join('\n')}
      </div>
      <p class="note" style="text-align:center;margin-top:24px">This page is general information. Please book a consultation for a proper diagnosis.</p>
    </section>
${cta()}` }));

// ---------- GALLERY ----------
write('gallery.html', page({ file: 'gallery.html', title: 'Clinic Gallery | Dr. Ismaila Kishim', desc: 'Photos of the Zmedspa clinic, laser equipment and procedures in Gwarinpa, Abuja.', flag: false,
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
write('blog.html', page({ file: 'blog.html', title: 'Skin Health Articles | Dr. Ismaila Kishim', desc: 'Plain-language articles on skin, hair and nail health from Dr. Ismaila Kishim.', flag: true,
  head: head('Blog', 'Skin health, explained', 'Short, practical articles you can read before your visit.'),
  body: `
    <section>
      <div class="grid3">
${articles.map(a => `        <a class="tile" href="blog-${a.slug}.html"><span class="tag">${a.tag}</span><h3>${a.title}</h3><p>${a.summary}</p><span class="more">Read article &rarr;</span></a>`).join('\n')}
      </div>
    </section>
${cta()}` }));
articles.forEach(a => write(`blog-${a.slug}.html`, page({ file: 'blog.html', title: `${a.title} | Dr. Ismaila Kishim`, desc: a.summary, flag: true,
  head: head(a.tag, a.title, a.summary),
  body: `
    <p class="crumbs"><a href="blog.html">&larr; All articles</a></p>
    <section style="padding-top:32px"><article class="prose">${a.body}<p class="note" style="margin-top:28px">This article is general information and does not replace a consultation.</p></article></section>
${cta()}` })));

// ---------- FAQ ----------
const faqs = JSON.parse(read('content/faq.json')).items.map(i => [i.question, i.answer]);
write('faq.html', page({ file: 'faq.html', title: 'Frequently Asked Questions | Dr. Ismaila Kishim', desc: 'Answers to common questions about appointments, online consultations, costs and the clinic.', flag: true,
  head: head('FAQ', 'Questions patients often ask', 'If your question is not here, message me on WhatsApp.'),
  body: `
    <section>
      <div class="faq">
${faqs.map(f => `        <details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('\n')}
      </div>
    </section>
${cta('Still unsure? Send a message and I will help you choose.')}` }));

// ---------- BOOK ----------
write('book.html', page({ file: 'book.html', title: 'Book an Appointment | Dr. Ismaila Kishim', desc: 'Request an in-person or online dermatology appointment with Dr. Ismaila Kishim in Gwarinpa, Abuja.', flag: false,
  head: head('Book', 'Request an appointment', 'Send me your details and I will confirm a time with you on WhatsApp.'),
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
            <label for="concern">What can I help you with?<textarea id="concern" name="concern" placeholder="A few words about your skin, hair or nail concern"></textarea></label>
            <a class="btn primary" id="waLink" href="https://wa.me/" target="_blank" rel="noopener" style="text-align:center">Continue on WhatsApp</a>
            <p class="note">The button opens WhatsApp with your message filled in. Nothing is sent until you press send in WhatsApp.</p>
          </form>
        </div>
        <div class="card" ${CARD}>
          <h3 style="margin-bottom:18px">Clinic details</h3>
          ${DETAILS}
        </div>
      </div>
    </section>` }));

// ---------- CONTACT ----------
const MAPQ = 'Klimmat%20Plaza%2C%20Asba%20and%20Dantata%20Street%2C%20Gwarinpa%202%2C%20Abuja';
write('contact.html', page({ file: 'contact.html', title: 'Contact and Directions | Dr. Ismaila Kishim', desc: 'Address, opening hours, phone and map for Zmedspa (MZ Derma Clinics), Gwarinpa 2, Abuja.', flag: false,
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
