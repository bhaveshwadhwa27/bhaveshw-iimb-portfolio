/**
 * BHAVESH WADHWA - PERSONAL PORTFOLIO INTERACTION SCRIPT
 * Vanilla JavaScript (No libraries or frameworks)
 * Handles:
 * 1. Mobile Navigation Toggle & Accessibility (ARIA)
 * 2. Active Navigation Spy on Scroll (Intersection Observer)
 * 3. Quick "Copy Email" interaction with visual feedback
 * 4. Header Shadow / Dynamic HUD adjustments
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. MOBILE NAVIGATION DRAWER TOGGLE
     ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    // Toggle menu visibility
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      
      if (isOpen) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. ACTIVE NAVIGATION SPY (INTERSECTION OBSERVER)
     Highlights the current active section in the navbar as user scrolls
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  }

  /* ------------------------------------------------------------------------
     3. ONE-CLICK "COPY EMAIL" WITH REALTIME FEEDBACK
     ------------------------------------------------------------------------ */
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');
  const emailToCopy = 'Bhaveshwadhwa12@gmail.com';

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        // Visual feedback
        copyText.textContent = 'COPIED!';
        copyBtn.classList.add('copied');

        setTimeout(() => {
          copyText.textContent = 'COPY';
          copyBtn.classList.remove('copied');
        }, 2200);

      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

});
