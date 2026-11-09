const switcher = document.querySelector(".language-switch");
let language = "en";
switcher.addEventListener("click", () => {
  language = language === "en" ? "zh" : "en";
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-en][data-zh]").forEach(el => {
    el.textContent = el.dataset[language];
  });
  switcher.textContent = language === "en" ? "中文" : "EN";
});
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

// Add the studio's WhatsApp number here in international format, without + or spaces.
// Example format only: 60123456789
const WHATSAPP_NUMBER = "";
if (WHATSAPP_NUMBER) {
  document.getElementById("whatsapp-link").href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AURA INK LAB, I'd like to enquire about a tattoo.")}`;
}
