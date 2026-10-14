/**
 * SAFRIN AALIYA — PORTFOLIO JAVASCRIPT
 * Pure vanilla JS (ES6+): accessible nav, active-link tracking,
 * contact form feedback, header polish on scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const MOBILE_BREAKPOINT = 860; // keep in sync with the CSS hamburger breakpoint

  // -------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION DRAWER
  // -------------------------------------------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && siteNav) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(isExpanded));
      siteNav.classList.toggle('open', isExpanded);
      document.body.style.overflow = isExpanded && window.innerWidth <= MOBILE_BREAKPOINT ? 'hidden' : '';
    };

    navToggle.addEventListener('click', () => toggleMenu());

    siteNav.addEventListener('click', (e) => {
      if (e.target.closest('a') && siteNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (
        siteNav.classList.contains('open') &&
        !siteNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // Reset drawer state if the viewport grows past the mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_BREAKPOINT && siteNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. ACTIVE NAV LINK ON SCROLL
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isCurrent);
          if (isCurrent) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // -------------------------------------------------------------------------
  // 3. CONTACT FORM
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const feedbackBox = document.getElementById('form-feedback');
  let feedbackTimer;

  if (contactForm && feedbackBox) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      feedbackBox.className = 'form-feedback-box success-notice active';
      feedbackBox.innerHTML = `
        <div class="feedback-headline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
          <strong>Submitted successfully!</strong>
        </div>
        <p>Thank you for reaching out. Your message has been received.</p>
      `;

      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      contactForm.reset();

      // Hide the message again after 6 seconds
      clearTimeout(feedbackTimer);
      feedbackTimer = setTimeout(() => {
        feedbackBox.classList.remove('active');
      }, 6000);
    });
  }

  // -------------------------------------------------------------------------
  // 4. HEADER SHADOW ON SCROLL
  // -------------------------------------------------------------------------
  const header = document.querySelector('.site-header');

  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }
});