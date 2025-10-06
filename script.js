// Dom Element sections
const form = document.querySelector(".form");
const MeassageStatus = document.querySelector("#status");
const sections = document.querySelectorAll(".section");
const loader = document.querySelector(".loading-wave");

// ===hero video background=====
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bgVideo");
  if (video) {
    video.addEventListener("loadeddata", () => {
      video.playbackRate = 0.5;
    });
  }

  // ===== RESTORE SAVED THEME =====
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = savedTheme;

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.checked = savedTheme === "dark";
  }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    document.body.dataset.theme = newTheme;

    localStorage.setItem("theme", newTheme);
  });
}

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      card.style.display =
        filter === "all" || card.dataset.category === filter ? "block" : "none";
    });
  });
});

// ===== SCROLL ANIMATIONS =====
function revealSections() {
  const triggerBottom = window.innerHeight / 1.2;
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    section.classList.toggle("show", sectionTop < triggerBottom);
  });
}

window.addEventListener("scroll", revealSections);

// ===== PAGE LOADER (FADE OUT + INITIAL SECTION REVEAL) =====
window.addEventListener("load", () => {
  revealSections();

  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }
});
async function handleSubmit(e) {
  e.preventDefault();
  const formTarget = e.target;
  MeassageStatus.textContent = "sending...";
  const data = new FormData(formTarget);
  const response = await fetch(
    "https://formsubmit.co/ajax/298430ec7d19f6d502a8577b99543ef8",
    { method: "POST", body: data }
  );
  if (response.ok) {
    MeassageStatus.textContent = "message sent successfully";
    formTarget.reset();
  } else {
    MeassageStatus.textContent = "Something went wrong. Try again.";
  }
}

form.addEventListener("submit", handleSubmit);
