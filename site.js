(function () {
  var WHATSAPP_NUMBER = '2349161036572'; // digits only, with country code, no + or spaces
  var root = document.documentElement;
  var header = document.querySelector('header.top');
  var totop = document.querySelector('.totop');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
    if (totop) totop.classList.toggle('show', window.scrollY > 500);
  }
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (totop) totop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    var brand = document.querySelector('.brand'); if (brand) brand.focus({ preventScroll: true });
  });

  // Light/dark switch: remembers the visitor's choice, otherwise follows the device setting.
  var themeBtn = document.querySelector('.theme-btn');
  function currentTheme() {
    return root.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function setTheme(t, save) {
    root.dataset.theme = t;
    if (save) { try { localStorage.setItem('theme', t); } catch (e) {} }
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeBtn.querySelector('.theme-label').textContent = t === 'dark' ? 'Light' : 'Dark';
    }
  }
  setTheme(currentTheme(), false);
  if (themeBtn) themeBtn.addEventListener('click', function () { setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true); });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu: only active once JS has added .js, so the nav is always usable without it.
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Scroll animations: reveal elements as they enter the viewport.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js');
    var targets = document.querySelectorAll('.head, .about-text, .funcard, .scene, .vid, .news, .stats, .collage figure, .collage .c4, .fact, .service, .tile, .detail, .gallery figure, .circles img, .circles-caption, .book-panel .card, .cta-band, .faq details, footer');
    targets.forEach(function (el) {
      el.classList.add('reveal');
      var sibs = el.parentElement.children;
      el.style.setProperty('--d', (Array.prototype.indexOf.call(sibs, el) % 3) * 0.12 + 's');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          var st = e.target.querySelector('.statement');
          if (st) st.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    root.classList.add('js');
  }

  // Booking form: builds a WhatsApp message from the fields.
  var form = document.getElementById('bookForm');
  var link = document.getElementById('waLink');
  if (form && link) {
    var update = function () {
      var d = new FormData(form);
      var text = 'Hello, I would like to request an appointment.\n' +
        'Name: ' + (d.get('name') || '') + '\n' +
        'Phone: ' + (d.get('phone') || '') + '\n' +
        'Consultation: ' + d.get('kind') + '\n' +
        'Preferred day: ' + d.get('when') + '\n' +
        'Preferred time: ' + d.get('time') + '\n' +
        'Concern: ' + (d.get('concern') || '');
      link.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
    };
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    update();
  }

  // Background videos: muted, looping and only loaded or played while on screen. Skipped for reduced motion and data saver.
  var bgs = document.querySelectorAll('.bgvid');
  var conn = navigator.connection || {};
  var lowData = conn.saveData || /2g/.test(conn.effectiveType || '');
  if (bgs.length && !reduced && !lowData && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.getAttribute('src')) v.setAttribute('src', v.getAttribute('data-src'));
          var p = v.play(); if (p && p.catch) p.catch(function () {});
          v.classList.add('on');
        } else { v.pause(); }
      });
    }, { threshold: 0.2 });
    bgs.forEach(function (v) { vio.observe(v); });
  }

  // Count-up numbers
  var nums = document.querySelectorAll('.stat b');
  if (nums.length && !reduced && 'IntersectionObserver' in window) {
    nums.forEach(function (el) { el.setAttribute('data-n', el.textContent); el.textContent = '0'; });
    var nio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        nio.unobserve(e.target);
        var el = e.target, n = parseInt(el.getAttribute('data-n'), 10), t0 = null;
        function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { nio.observe(el); });
  }

  // Cards tilt towards the pointer (mouse only)
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.tile').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 8 + 'deg');
        el.style.setProperty('--rx', (0.5 - (e.clientY - r.top) / r.height) * 8 + 'deg');
      });
      el.addEventListener('pointerleave', function () { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
  }

  // Fun facts and jokes
  var fd = document.getElementById('fun-data');
  if (fd) {
    var data = JSON.parse(fd.textContent);
    var stage = document.querySelector('.fun-stage'), ftext = stage.querySelector('.fun-text'), flabel = stage.querySelector('.fun-label');
    var seq = { fact: [], joke: [] };
    function next(kind) {
      var arr = kind === 'fact' ? data.facts : data.jokes;
      if (!seq[kind].length) { seq[kind] = arr.map(function (_, i) { return i; }).sort(function () { return Math.random() - 0.5; }); }
      return arr[seq[kind].pop()];
    }
    document.querySelectorAll('[data-fun]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var kind = btn.getAttribute('data-fun');
        flabel.textContent = kind === 'fact' ? 'Fun fact' : 'Skin humour';
        ftext.textContent = next(kind);
        stage.classList.remove('flip'); void stage.offsetWidth;
        if (!reduced) stage.classList.add('flip');
      });
    });
  }

  // Speech bubble on the About page: tap for another message
  var bubble = document.querySelector('.bubble');
  if (bubble) {
    var lines = ['Hmm\u2026 is that a rash?', 'Don\u2019t panic. Most skin things are very treatable!', 'Sunscreen. Every. Day.', 'Have you moisturised today?', 'Let\u2019s get under your skin. Gently!', 'Skin facts are my love language.'];
    var li = 0;
    bubble.addEventListener('click', function () {
      li = (li + 1) % lines.length;
      bubble.textContent = lines[li];
      bubble.classList.remove('pop'); void bubble.offsetWidth;
      if (!reduced) bubble.classList.add('pop');
    });
  }
})();
