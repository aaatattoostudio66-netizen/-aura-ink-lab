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
      card.classList.toggle("hidden", selectedFilter !== "all" && card.dataset.category !== selectedFilter);
    });
  });
});

if (lightbox && lightboxImage && lightboxTitle && lightboxDescription && lightboxClose) {
  portfolioCards.forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector("img");
      if (!image) return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxTitle.textContent = card.dataset.title || "Artwork";
      lightboxDescription.textContent = card.dataset.description || "Tattoo artwork preview.";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target.dataset.close === "true") closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

// Show WhatsApp and WeChat together on both desktop and mobile.
const whatsappLink = document.getElementById("whatsapp-link");
if (whatsappLink) {
  const contactActions = document.createElement("div");
  contactActions.className = "contact-actions";
  whatsappLink.parentNode.insertBefore(contactActions, whatsappLink);
  contactActions.appendChild(whatsappLink);

  const wechatButton = document.createElement("button");
  wechatButton.type = "button";
  wechatButton.className = "button button-outline wechat-button";
  wechatButton.textContent = "WeChat: aurainklab888";
  wechatButton.setAttribute("aria-label", "Copy WeChat ID aurainklab888");
  contactActions.appendChild(wechatButton);

  const copyStatus = document.createElement("span");
  copyStatus.className = "wechat-copy-status";
  copyStatus.setAttribute("aria-live", "polite");
  contactActions.appendChild(copyStatus);

  const style = document.createElement("style");
  style.textContent = `
    .contact-actions{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:12px;width:100%;margin-top:8px}
    .contact-actions .button{margin:0}
    .wechat-button{font-family:inherit;cursor:pointer}
    .wechat-copy-status{flex-basis:100%;min-height:1.4em;color:rgba(255,255,255,.68);font-size:11px;letter-spacing:1px;text-align:center}
    @media(max-width:680px){.contact-actions{flex-direction:column;gap:12px}.contact-actions .button{width:min(100%,340px);min-height:48px}}
  `;
  document.head.appendChild(style);

  wechatButton.addEventListener("click", async () => {
    const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
    try {
      await navigator.clipboard.writeText("aurainklab888");
      copyStatus.textContent = isChinese ? "微信号已复制：aurainklab888" : "WeChat ID copied: aurainklab888";
    } catch {
      copyStatus.textContent = isChinese ? "请在微信中搜索：aurainklab888" : "Search this ID in WeChat: aurainklab888";
    }
  });
}

const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = new Date().getFullYear();

// Add the studio WhatsApp number in international format, without + or spaces.
const WHATSAPP_NUMBER = "";
if (WHATSAPP_NUMBER && whatsappLink) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AURA INK LAB, I'd like to enquire about a tattoo.")}`;
}
