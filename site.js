(function () {
  var WHATSAPP_NUMBER = '2349161036572'; // digits only, with country code, no + or spaces
  var root = document.documentElement;
  var header = document.querySelector('header.top');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
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
    var targets = document.querySelectorAll('.head, .about-text, .fact, .service, .tile, .detail, .gallery figure, .circles img, .circles-caption, .book-panel .card, .cta-band, .faq details, footer');
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
})();
