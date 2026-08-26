/**
 * C.J CHIJIOKE ELECTRICAL COMPANY - INTERACTIVE ENGINE
 * Location: Old Ogbo Osisi Market, close to Wetheral Junction, Owerri
 * Hotline / WhatsApp Desk: 0803 401 8669 / +234 803 401 8669
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle & Scroll Lock
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Sticky Header Scroll Shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.04)';
    }
  });

  // 3. Department Category Filter Tabs
  const tabButtons = document.querySelectorAll('.category-tabs .tab-btn');
  const productCards = document.querySelectorAll('.products-grid .product-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Instant WhatsApp Direct BOQ & Material List Dispatcher
  const whatsappDirectBtn = document.getElementById('whatsappDirectBtn');
  const boqOrderForm = document.getElementById('boqOrderForm');
  const orderSuccessAlert = document.getElementById('orderSuccessAlert');

  const STORE_PHONE = '2348034018669';

  if (whatsappDirectBtn) {
    whatsappDirectBtn.addEventListener('click', () => {
      const name = document.getElementById('clientName')?.value.trim() || 'Electrical Contractor / Client';
      const phone = document.getElementById('clientPhone')?.value.trim() || 'N/A';
      const projectType = document.getElementById('projectType')?.value || 'Building Wiring';
      const destination = document.getElementById('deliveryLocation')?.value.trim() || 'Owerri Site';
      const cableBrand = document.getElementById('cableBrandPreference')?.value || 'Cutix / Pure Copper';
      const timeline = document.getElementById('timeline')?.value || 'Immediate Dispatch';
      const materials = document.getElementById('materialList')?.value.trim() || 'Full electrical material list to confirm on WhatsApp';

      const whatsappText = `Hello C.J Chijioke Electrical Company!%0A%0A*NEW ELECTRICAL BOQ / PRICE QUOTE REQUEST:*%0A*Name / Company:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Project Type:* ${encodeURIComponent(projectType)}%0A*Delivery Location:* ${encodeURIComponent(destination)}%0A*Cable Preference:* ${encodeURIComponent(cableBrand)}%0A*Timeline:* ${encodeURIComponent(timeline)}%0A%0A*REQUIRED ELECTRICAL MATERIALS / BOQ:*%0A${encodeURIComponent(materials)}%0A%0APlease calculate the wholesale total and send the proforma invoice!`;

      const whatsappUrl = `https://wa.me/${STORE_PHONE}?text=${whatsappText}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 5. Netlify Form Submission Handler
  if (boqOrderForm) {
    boqOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(boqOrderForm);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        boqOrderForm.reset();
        if (orderSuccessAlert) orderSuccessAlert.style.display = 'flex';
      })
      .catch(() => {
        // Fallback to WhatsApp direct dispatch
        if (whatsappDirectBtn) whatsappDirectBtn.click();
      });
    });
  }

  // 6. ScrollReveal Micro-Animations
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '30px',
      duration: 800,
      delay: 100,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });

    sr.reveal('.hero-content', { delay: 100 });
    sr.reveal('.hero-visual', { delay: 200 });
    sr.reveal('.brands-bar', { delay: 150 });
    sr.reveal('.product-card', { interval: 100 });
    sr.reveal('.advantage-card', { interval: 100 });
    sr.reveal('.review-card', { interval: 100 });
    sr.reveal('.location-card', { delay: 150 });
    sr.reveal('.quote-card-container', { delay: 150 });
  }
});
