// Mobile navigation toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('#navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Add animation on scroll for game cards
const gameCards = document.querySelectorAll('.game-card');

if (gameCards.length > 0) {
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const fadeInOnScroll = new IntersectionObserver((entries, fadeInOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                fadeInOnScroll.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    gameCards.forEach(card => {
        fadeInOnScroll.observe(card);
    });
}

// Add active class to current page in nav
const currentLocation = window.location.href;
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
    if (item.href === currentLocation) {
        item.classList.add('active');
    }
});
