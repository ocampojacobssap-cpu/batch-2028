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

        if (!toggle || !menu) return;

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
    }

    function initSongPlayer() {
        const audio = document.getElementById('songAudio');
        const playBtn = document.getElementById('songPlayBtn');
        const playIcon = document.getElementById('songPlayIcon');
        const progressFill = document.getElementById('songProgressFill');
        const progressBar = document.querySelector('.song-progress-bar');
        const currentTimeEl = document.getElementById('songCurrentTime');
        const durationEl = document.getElementById('songDuration');

        if (!audio || !playBtn || !playIcon) return;

        function formatTime(seconds) {
            if (!isFinite(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }

        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });

        audio.addEventListener('play', () => {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            playBtn.classList.add('is-playing');
            playBtn.setAttribute('aria-label', 'Pause batch song');
        });

        audio.addEventListener('pause', () => {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            playBtn.classList.remove('is-playing');
            playBtn.setAttribute('aria-label', 'Play batch song');
        });

        audio.addEventListener('loadedmetadata', () => {
            if (durationEl) durationEl.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100 || 0;
            if (progressFill) progressFill.style.width = percent + '%';
            if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = clickX / rect.width;
                if (isFinite(audio.duration)) {
                    audio.currentTime = percent * audio.duration;
                }
            });
        }

        audio.addEventListener('ended', () => {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            playBtn.classList.remove('is-playing');
            if (progressFill) progressFill.style.width = '0%';
            if (currentTimeEl) currentTimeEl.textContent = '0:00';
        });
    }

    function init() {
        updateLayout();
        initDropdown();
        initSongPlayer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
})();