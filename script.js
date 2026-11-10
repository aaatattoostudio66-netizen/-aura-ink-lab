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

// Refined brand mark display: preserve the entire logo without cropping.
document.querySelectorAll(".brand .brand-mark").forEach(mark => {
  const logo = document.createElement("img");
  logo.src = "logo.png";
  logo.alt = "AURA INK LAB logo";
  logo.className = "brand-logo";
  Object.assign(logo.style, {
    display: "block",
    width: "52px",
    height: "52px",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    objectPosition: "center",
    background: "transparent",
    border: "0",
    borderRadius: "0",
    padding: "0",
    flexShrink: "0"
  });
  mark.replaceWith(logo);
});

// Golden-ratio-inspired hero composition (approximately 61.8% / 38.2%).
const brandLayout = document.createElement("style");
brandLayout.textContent = `
  .hero { position: relative; isolation: isolate; }
  .hero-watermark {
    left: 61.8%;
    top: 52%;
    width: min(61.8vw, 780px);
    height: min(76vh, 700px);
    object-fit: contain;
    opacity: .12;
  }
  .hero-content {
    position: absolute;
    left: 9%;
    top: 50%;
    width: min(61.8%, 620px);
    max-width: 620px;
    margin: 0;
    padding-top: 0;
    transform: translateY(-50%);
  }
  .hero-content h1 {
    max-width: 10ch;
    line-height: .96;
    letter-spacing: .015em;
    margin: 22px 0;
  }
  .hero-sub { max-width: 34ch; line-height: 1.7; }
  .hero-index { right: 6.2%; bottom: 6.2%; }
  .brand { gap: 16px; }
  .brand-logo { object-fit: contain; object-position: center; }
  @media (max-width: 680px) {
    .hero-watermark {
      left: 61.8%;
      top: 48%;
      width: 88vw;
      height: 58vh;
      opacity: .10;
    }
    .hero-content {
      left: 8%;
      top: 52%;
      width: 84%;
      max-width: none;
      transform: translateY(-50%);
    }
    .hero-content h1 { font-size: clamp(46px, 13vw, 64px); }
    .hero-index { right: 6%; bottom: 4%; }
    .brand { gap: 10px; }
    .brand-logo { width: 42px !important; height: 42px !important; }
  }
`;
document.head.appendChild(brandLayout);

// Add the studio's WhatsApp number here in international format, without + or spaces.
// Example format only: 60123456789
const WHATSAPP_NUMBER = "";
if (WHATSAPP_NUMBER) {
  document.getElementById("whatsapp-link").href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AURA INK LAB, I'd like to enquire about a tattoo.")}`;
}
