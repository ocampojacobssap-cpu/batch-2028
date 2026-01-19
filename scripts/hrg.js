const countDownDate = new Date("January 29, 2026, 14:00:00").getTime();
const startDate = new Date("January 1, 2026, 00:00:00 ").getTime();

window.addEventListener("DOMContentLoaded", () => {
    const now = Date.now();

    const progress = (now - startDate) / (countDownDate - startDate);
    const percent = Math.min(Math.max(progress * 100, 0), 100);

    document.getElementById("sand-top").style.height = (100-percent) + "%";
    document.getElementById("sand-bottom").style.height = percent + "%";

    console.log("Initial sand fill:", percent.toFixed(2) + "%");
});

var x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance <= 0) {
        clearInterval(x);
        countdown.innerHTML = "Batch Kitajawari"; /* edit nyo once ano na name natin */
        document.title = "Home - Batch Kitajawari";
        document.getElementById("sand-top").style.height = "0%";
        document.getElementById("sand-bottom").style.height = "100%";
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML =
        (days ? days + " Days " : "") +
        (hours ? hours + " Hours<br> " : "") +
        (minutes ? minutes + " Minutes " : "") +
        seconds + " Seconds ";

    document.title = "Home - Batch 2028";

    const hgElement = document.getElementById('hourglass');
    const hgScale = parseFloat(getComputedStyle(hgElement).getPropertyValue('--hg-scale')) || 1;

    const numGrains = 1;
    for (let i = 0; i < numGrains; i++) {
        const grain = document.createElement('div');
        grain.classList.add('sand-grain');

        grain.style.left = Math.random() * 8 * hgScale + "px";

        const delay = Math.random() * 10000;
        const durationGrain = 400 + Math.random() * 400;
        grain.style.animationDelay = delay + 'ms';
        grain.style.animationDuration = durationGrain + 'ms';

        grain.addEventListener("animationend", () => {
            grain.remove();
        })

        document.getElementById('grain-container').appendChild(grain);
    }

}, 1000);