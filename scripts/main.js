function updateLayout() {
    const navHeight = document.querySelector('.nav-bar').offsetHeight;
    document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);

    const countdownSection = document.getElementById('countdown-section');
    if (!countdownSection) return;

    const sectionWidth = countdownSection.clientWidth;
    const sectionHeight = countdownSection.clientHeight;
    const maxSize = 1024;
    const hgSize = Math.min(sectionWidth * 0.75, sectionHeight * 0.75, maxSize);

    const hourglass = document.getElementById('hourglass');
    hourglass.style.width = `${hgSize}px`;
    hourglass.style.height = `${hgSize}px`;

    const scale = hgSize / 512;
    hourglass.style.setProperty('--hg-scale', scale);
}

window.addEventListener('load', updateLayout);
window.addEventListener('resize', updateLayout);