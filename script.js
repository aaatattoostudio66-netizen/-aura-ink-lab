const switcher = document.querySelector(".language-switch");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (switcher) {
  let language = "en";

  switcher.addEventListener("click", () => {
    language = language === "en" ? "zh" : "en";
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.querySelectorAll("[data-en][data-zh]").forEach((el) => {
      el.textContent = el.dataset[language];
    });
    switcher.textContent = language === "en" ? "中文" : "EN";
  });
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxClose = document.querySelector(".lightbox-close");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

    portfolioCards.forEach((card) => {
      const category = card.dataset.category;
      const show = selectedFilter === "all" || category === selectedFilter;
      card.classList.toggle("hidden", !show);
    });
  });
});

portfolioCards.forEach((card) => {
  card.addEventListener("click", () => {
    const imageSrc = card.querySelector("img").src;
    const title = card.dataset.title || "Artwork";
    const description = card.dataset.description || "Tattoo artwork preview.";

    lightboxImage.src = imageSrc;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true" || event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const WHATSAPP_NUMBER = "";
const whatsappLink = document.getElementById("whatsapp-link");
if (WHATSAPP_NUMBER && whatsappLink) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AURA INK LAB, I'd like to enquire about a tattoo.")}`;
}
