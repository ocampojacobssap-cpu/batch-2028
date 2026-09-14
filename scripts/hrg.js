/* Scroll-reveal for Home & About Us sections */
(function () {
    'use strict';

    if (!('IntersectionObserver' in window)) return;

    const selectors = [
        '.home-hero-inner',
        '.home-countdown .au-section-head',
        '.countdown-wrapper',
        '.home-teaser .au-section-head',
        '.teaser-media',
        '.teaser-news',
        '.au-hero-inner',
        '.au-section-head',
        '.au-story-text',
        '.au-story-visual',
        '.au-theme-card',
        '.au-quote',
    ].join(', ');

    const targets = document.querySelectorAll(selectors);
    if (!targets.length) return;

    targets.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
})();s