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

// Replace the text placeholder in the header and footer with the uploaded logo.
document.querySelectorAll(".brand .brand-mark").forEach(mark => {
  const logo = document.createElement("img");
  logo.src = "logo.png";
  logo.alt = "AURA INK LAB logo";
  logo.className = "brand-mark";
  Object.assign(logo.style, {
    display: "block",
    width: "46px",
    height: "46px",
    objectFit: "contain",
    background: "transparent",
    border: "0",
    borderRadius: "0",
    fontSize: "0",
    flexShrink: "0"
  });
  mark.replaceWith(logo);
});

// Add the studio's WhatsApp number here in international format, without + or spaces.
// Example format only: 60123456789
const WHATSAPP_NUMBER = "";
if (WHATSAPP_NUMBER) {
  document.getElementById("whatsapp-link").href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AURA INK LAB, I'd like to enquire about a tattoo.")}`;
}
