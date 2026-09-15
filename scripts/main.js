(function () {
    'use strict';

    function updateLayout() {
        const navBar = document.querySelector('.nav-bar');
        if (!navBar) return;

        const navHeight = navBar.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);

        const hourglass = document.getElementById('hourglass');
        if (!hourglass) return;

        const countdownSection = document.getElementById('countdown-section');
        if (!countdownSection) return;

        const sectionWidth = countdownSection.clientWidth;
        const sectionHeight = countdownSection.clientHeight;

        const maxSize = 512;
        const hgSize = Math.min(sectionWidth * 0.6, sectionHeight * 0.6, maxSize);
        const scale = hgSize / 512;

        hourglass.style.setProperty('--hg-scale', scale);
    }

    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateLayout, 100);
    }

    function initDropdown() {
        const toggle = document.getElementById('dropdownToggle');
        const menu = document.getElementById('dropdownMenu');

        if (!toggle || !menu) {
            console.warn('Dropdown elements not found');
            return;
        }

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        console.log('Dropdown initialized');
    }

    function init() {
        updateLayout();
        initDropdown();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
})();