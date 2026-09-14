
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
        const maxSize = 1024;
        const hgSize = Math.min(sectionWidth * 0.65, sectionHeight * 0.75, maxSize);

        hourglass.style.width = `${hgSize}px`;
        hourglass.style.height = `${hgSize}px`;

        const scale = hgSize / 512;
        hourglass.style.setProperty('--hg-scale', scale);
    }

    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateLayout, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateLayout);
    } else {
        updateLayout();
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
})();