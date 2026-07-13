const root = document.documentElement;
const heroBg = document.querySelector("#hero-bg");
const ambientImage = document.querySelector("#ambient-image");
const sceneCards = Array.from(document.querySelectorAll(".scene-card"));
const sceneKicker = document.querySelector("#scene-kicker");
const heroTitle = document.querySelector("#hero-title");
const sceneCopy = document.querySelector("#scene-copy");
const controlButtons = Array.from(document.querySelectorAll(".frame-controls button"));
const contactForm = document.querySelector(".contact-form");

const scenes = {
  lounge: {
    image: "./assets/clean-hero-living.jpg",
    kicker: "Soft lounge collection",
    title: "Comfort",
    copy:
      "Upholstered seating, warm wood, fitted storage and gentle room styling for homes that feel calm the moment you walk in."
  },
  suite: {
    image: "./assets/clean-soft-bedroom.jpg",
    kicker: "Bedroom calm",
    title: "Rest",
    copy:
      "Panelled headboards, bedside storage and soft finishes turn the bedroom into a quiet, finished suite."
  },
  built: {
    image: "./assets/clean-kitchen.jpg",
    kicker: "Built-in precision",
    title: "Craft",
    copy:
      "Fitted kitchens, console units and TV walls bring clean lines, useful storage and a measured finish to daily spaces."
  }
};

let activeScene = "lounge";

if (window.lucide) {
  window.lucide.createIcons();
}

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--x", `${event.clientX}px`);
  root.style.setProperty("--y", `${event.clientY}px`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function setScene(key) {
  const scene = scenes[key];
  if (!scene || key === activeScene) return;

  activeScene = key;
  heroBg.style.opacity = "0";

  window.setTimeout(() => {
    heroBg.src = scene.image;
    ambientImage.src = scene.image;
    sceneKicker.textContent = scene.kicker;
    heroTitle.textContent = scene.title;
    sceneCopy.textContent = scene.copy;
    heroBg.style.opacity = "1";
  }, 180);

  sceneCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.scene === key);
  });
}

function moveScene(direction) {
  const keys = Object.keys(scenes);
  const index = keys.indexOf(activeScene);
  const next = keys[(index + direction + keys.length) % keys.length];
  setScene(next);
}

sceneCards.forEach((card) => {
  card.addEventListener("click", () => setScene(card.dataset.scene));
});

if (controlButtons[0]) {
  controlButtons[0].addEventListener("click", () => moveScene(-1));
}

if (controlButtons[1]) {
  controlButtons[1].addEventListener("click", () => moveScene(1));
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
