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
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const WHATSAPP_NUMBER = "";
const whatsappLink = document.getElementById("whatsapp-link");
if (WHATSAPP_NUMBER && whatsappLink) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AURA INK LAB, I'd like to enquire about a tattoo.")}`;
}
