/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/* Scroll Progress Bar */
window.addEventListener("scroll", function () {
  let winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;

  document.getElementById("progress-bar").style.width = scrolled + "%";
});


document.addEventListener("DOMContentLoaded", function () {
  const backtotop = document.querySelector(".back-to-top");

  if (!backtotop) return;

  const toggle = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add("active");
    } else {
      backtotop.classList.remove("active");
    }
  };

  window.addEventListener("scroll", toggle);
  window.addEventListener("load", toggle);

  backtotop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

  AOS.init({ duration: 800, once: true });

  const HF_URL  = "https://hdtai24-stress-prediction-app.hf.space";
  const overlay = document.getElementById('demoModalOverlay');
  const openBtn = document.getElementById('openDemoBtn');
  const closeBtn= document.getElementById('demoCloseBtn');
  const iframe  = document.getElementById('demoIframe');
  const loader  = document.getElementById('iframeLoader');

  const ragOpenBtn = document.getElementById("openRagDemoBtn");
  const ragModalOverlay = document.getElementById("ragDemoModalOverlay");
  const ragCloseBtn = document.getElementById("ragDemoCloseBtn");
  const ragIframe = document.getElementById("ragDemoIframe");
  const ragLoader = document.getElementById("ragIframeLoader");

  function openDemo() {
    if (!iframe.src || iframe.src === window.location.href) iframe.src = HF_URL;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDemo() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (ragOpenBtn) {
    ragOpenBtn.addEventListener("click", () => {
      ragModalOverlay.classList.add("active");
      ragLoader.style.display = "flex";
      ragIframe.src = "https://hdtai24-medical-rag-assistant.hf.space";
      ragIframe.onload = () => { ragLoader.style.display = "none"; };
    });

    ragCloseBtn.addEventListener("click", () => {
      ragModalOverlay.classList.remove("active");
      ragIframe.src = "";
    });

    ragModalOverlay.addEventListener("click", (e) => {
      if (e.target === ragModalOverlay) {
        ragModalOverlay.classList.remove("active");
        ragIframe.src = "";
      }
    });
  }

  iframe.addEventListener('load', () => loader.classList.add('hidden'));
  openBtn.addEventListener('click', openDemo);
  closeBtn.addEventListener('click', closeDemo);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDemo(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDemo(); });

  /* ===== Timeline scrollspy ===== */
  (function () {
    const sections = document.querySelectorAll('[id^="project-"]');
    const links = document.querySelectorAll('.timeline-link');

    function onScroll() {
      let current = sections[0]?.id;
      const offset = window.innerHeight * 0.35;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top - offset <= 0) {
          current = section.id;
        }
        section.classList.toggle('in-view', rect.top - offset <= 0 && rect.bottom - offset > 0);
      });

      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    window.addEventListener('scroll', onScroll);
    onScroll();
  })();