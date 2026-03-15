/* ===== NAVBAR TOGGLE ===== */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

/* ===== NAVBAR SCROLL STYLE ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== SCROLL TO TOP BUTTON ===== */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== STATS COUNTER ===== */
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) counterObserver.observe(statsSection);

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item     = btn.closest('.faq-item');
        const answer   = item.querySelector('.faq-answer');
        const isOpen   = btn.getAttribute('aria-expanded') === 'true';

        // Close all
        document.querySelectorAll('.faq-question').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
            b.closest('.faq-item').querySelector('.faq-answer').classList.remove('open');
        });

        // Open clicked if it was closed
        if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            answer.classList.add('open');
        }
    });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '✅ Message Sent!';
        btn.disabled = true;
        btn.style.background = '#00b89a';
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            btn.style.background = '';
            contactForm.reset();
        }, 3500);
    });
}

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id], header section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active-link',
                    link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));