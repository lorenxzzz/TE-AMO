// ==============================
// MÚSICA
// ==============================

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const openButton = document.getElementById("openButton");

let playing = false;

function playMusic() {
    music.play()
        .then(() => {
            playing = true;
            musicButton.innerHTML = "♫ <span>Pausar</span>";
        })
        .catch(() => {
            console.log("El navegador bloqueó la reproducción automática.");
        });
}

function pauseMusic() {
    music.pause();
    playing = false;
    musicButton.innerHTML = "♫ <span>Música</span>";
}

musicButton.addEventListener("click", () => {
    if (playing) {
        pauseMusic();
    } else {
        playMusic();
    }
});


// ==============================
// BOTÓN ABRIR SORPRESA
// ==============================

openButton.addEventListener("click", () => {

    playMusic();

    document.querySelector(".intro").scrollIntoView({
        behavior: "smooth"
    });

    createParticles(15);
});


// ==============================
// CONTADOR DESDE EL 4 DE JULIO
// ==============================

const startDate = new Date("2026-07-04T00:00:00");

function updateCounter() {

    const now = new Date();

    let difference = now - startDate;

    if (difference < 0) {
        difference = 0;
    }

    const seconds = Math.floor(difference / 1000);

    const days = Math.floor(seconds / 86400);

    const hours = Math.floor(
        (seconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (seconds % 3600) / 60
    );

    const secs = seconds % 60;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(secs).padStart(2, "0");
}

updateCounter();

setInterval(updateCounter, 1000);


// ==============================
// CARTA
// ==============================

const envelope = document.getElementById("envelope");
const letterButton = document.getElementById("letterButton");

function toggleLetter() {

    envelope.classList.toggle("open");

    if (envelope.classList.contains("open")) {

        letterButton.textContent = "Cerrar carta";

        createParticles(12);

    } else {

        letterButton.textContent = "Abrir carta";

    }
}

envelope.addEventListener("click", toggleLetter);

letterButton.addEventListener("click", toggleLetter);


// ==============================
// ANIMACIÓN FINAL
// ==============================

const finalButton = document.getElementById("finalButton");

finalButton.addEventListener("click", () => {

    createParticles(70);

    finalButton.textContent = "❤️";

    finalButton.style.transform = "scale(1.2)";

    setTimeout(() => {
        finalButton.textContent = "Una última sorpresa";
        finalButton.style.transform = "";
    }, 2000);

});


// ==============================
// CORAZONES Y DESTELLOS
// ==============================

function createParticles(amount = 20) {

    const container = document.getElementById("particles");

    const symbols = ["♥", "✦", "♡", "✧", "❤"];

    for (let i = 0; i < amount; i++) {

        const particle = document.createElement("span");

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (4 + Math.random() * 5) + "s";

        particle.style.fontSize =
            (15 + Math.random() * 25) + "px";

        particle.style.opacity =
            .5 + Math.random() * .5;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 9000);
    }
}


// ==============================
// ANIMACIÓN AL HACER SCROLL
// ==============================

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(".reveal")
    .forEach(element => observer.observe(element));


// ==============================
// PARTÍCULAS SUAVES
// ==============================

setInterval(() => {

    if (Math.random() > 0.45) {
        createParticles(1);
    }

}, 1800);