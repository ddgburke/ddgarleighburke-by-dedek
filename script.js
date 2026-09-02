// ===============================
// MOBILE NAVIGATION
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


// ===============================
// DARK / LIGHT MODE
// ===============================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeToggle.textContent = isLight ? "☀" : "◐";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀";
}


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        navLinks.forEach(link => {
          link.classList.remove("active");

          if (
            link.getAttribute("href") ===
            `#${entry.target.id}`
          ) {
            link.classList.add("active");
          }
        });

      }

    });
  },
  {
    rootMargin: "-30% 0px -60% 0px"
  }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});


// ===============================
// SYSTEM MODAL
// ===============================

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const systemInformation = {

  AEGIS: {
    title: "AEGIS",
    text:
      "The Aegis Combat System is an integrated naval combat system that combines sensors, computers, displays and weapon-control functions into a coordinated defensive architecture."
  },

  RADAR: {
    title: "RADAR",
    text:
      "Arleigh Burke-class ships use sophisticated radar systems as part of their sensor suite. Radar provides information used by the ship's combat system to maintain awareness of the surrounding environment."
  },

  VLS: {
    title: "VERTICAL LAUNCH",
    text:
      "The Mk 41 Vertical Launching System provides a flexible method for carrying and launching compatible missile systems. Specific configurations vary across ships and upgrades."
  },

  AVIATION: {
    title: "AVIATION",
    text:
      "Arleigh Burke-class destroyers include facilities that support helicopter operations, extending the ship's ability to conduct maritime missions beyond the immediate vessel."
  }

};

document.querySelectorAll(".system-card").forEach(card => {

  card.addEventListener("click", () => {

    const info = systemInformation[card.dataset.info];

    modalTitle.textContent = info.title;
    modalText.textContent = info.text;

    modal.classList.add("show");

  });

});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", event => {

  if (event.target === modal) {
    modal.classList.remove("show");
  }

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    modal.classList.remove("show");
  }

});


// ===============================
// INTERACTIVE SHIP PROFILE
// ===============================

const shipParts = {

  "Bridge": {
    title: "Bridge",
    description:
      "The bridge is the primary area used for navigation and ship handling. It provides personnel with visibility and systems necessary for maneuvering the vessel."
  },

  "Radar": {
    title: "Radar / Sensor Area",
    description:
      "The ship's sensor architecture provides information about the surrounding environment and supports the broader combat-system picture."
  },

  "Flight Deck": {
    title: "Flight Deck",
    description:
      "The flight deck and associated aviation facilities allow compatible helicopters to operate from the destroyer."
  }

};

const partTitle = document.getElementById("partTitle");
const partDescription = document.getElementById("partDescription");

document.querySelectorAll(".hotspot").forEach(button => {

  button.addEventListener("click", () => {

    const part = shipParts[button.dataset.part];

    partTitle.textContent = part.title;
    partDescription.textContent = part.description;

  });

});


// ===============================
// FACT GENERATOR
// ===============================

const facts = [

  "USS Arleigh Burke was named after Admiral Arleigh Burke, a highly decorated U.S. Navy officer.",

  "DDG-51 is the lead ship of the Arleigh Burke class, which became one of the U.S. Navy's major destroyer classes.",

  "The ship was commissioned in 1991.",

  "The Arleigh Burke class was designed around the Aegis combat system.",

  "The class has been produced across multiple configurations and generations, commonly referred to as different 'Flights'.",

  "The ship's design combines multiple naval mission capabilities within one platform."

];

const factText = document.getElementById("factText");
const factIndex = document.getElementById("factIndex");
const nextFact = document.getElementById("nextFact");

let currentFact = 0;

nextFact.addEventListener("click", () => {

  currentFact++;

  if (currentFact >= facts.length) {
    currentFact = 0;
  }

  factText.style.opacity = "0";

  setTimeout(() => {

    factText.textContent = facts[currentFact];

    factIndex.textContent =
      String(currentFact + 1).padStart(2, "0");

    factText.style.opacity = "1";

  }, 180);

});


// ===============================
// KEYBOARD ACCESSIBILITY
// ===============================

document.querySelectorAll("button").forEach(button => {

  button.addEventListener("keydown", event => {

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
    }

  });

});
