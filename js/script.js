/**
 * SAFRIN AALIYA — PORTFOLIO JAVASCRIPT
 * Pure vanilla JS (ES6+): accessible nav, active-link tracking,
 * honest front-end form feedback, header polish on scroll.
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
  // 3. CONTACT FORM (front-end demonstration)
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const feedbackBox = document.getElementById('form-feedback');

  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  if (contactForm && feedbackBox) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const nameInput = document.getElementById('name');
      const userName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'there';
      const mailSubject = encodeURIComponent('Portfolio Inquiry: ' + userName);

      feedbackBox.className = 'form-feedback-box demo-notice active';
      feedbackBox.innerHTML = `
        <div class="feedback-headline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <strong>Front-End Demonstration Mode</strong>
        </div>
        <p>Thank you for testing the form, <strong>${escapeHtml(userName)}</strong>!</p>
        <p>
          This is a <em>front-end assignment project</em> without an email delivery backend,
          so your message has <strong>not</strong> been sent anywhere.
        </p>
        <p>
          To contact me directly, use:
          <a class="feedback-link" href="mailto:safrinaaliya910@gmail.com?subject=${mailSubject}">safrinaaliya910@gmail.com</a>
        </p>
      `;

      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      contactForm.reset();
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