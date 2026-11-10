const languageButton = document.querySelector(".language-switch");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (languageButton) {
  let language = document.documentElement.lang.toLowerCase().startsWith("zh") ? "zh" : "en";
  languageButton.addEventListener("click", () => {
    language = language === "en" ? "zh" : "en";
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.querySelectorAll("[data-en][data-zh]").forEach((el) => {
      el.textContent = el.dataset[language];
    });
    languageButton.textContent = language === "en" ? "中文" : "EN";
  });
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

// Portfolio category filtering.
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");
filterButtons.forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle("active", item === button));
  portfolioCards.forEach((card) => card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter));
}));

// Portfolio image lightbox.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxClose = document.querySelector(".lightbox-close");
if (lightbox && lightboxImage && lightboxTitle && lightboxDescription && lightboxClose) {
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = "";
  };
  portfolioCards.forEach((card) => card.addEventListener("click", () => {
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
  }));
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target.dataset.close === "true") closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

// Inline SVG brand marks: no icon font or third-party image dependency required.
const iconSvg = {
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 2 17.7L.5 23.5l6-1.6A11.8 11.8 0 0 0 20.5 3.5ZM12 21a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.5.9.9-3.4-.2-.4A9.7 9.7 0 1 1 12 21Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6.2-.5c.1-.2 0-.4 0-.6l-1-2.2c-.2-.5-.5-.4-.7-.4H7.2c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4a12 12 0 0 0 4.7 4.2c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4s.3-1.3.2-1.4-.2-.2-.5-.4Z"/></svg>',
  wechat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.8 3C5.1 3 1.3 6 1.3 9.7c0 2.1 1.3 4 3.3 5.2l-.8 2.5 3-1.5c.9.3 1.9.5 3 .5-.2-.6-.3-1.2-.3-1.8 0-3.3 3.2-6 7.1-6h.7C16.5 5.4 13.5 3 9.8 3Zm-3 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5 1.4c-3.3 0-6 2-6 4.7s2.7 4.7 6 4.7c.8 0 1.5-.1 2.2-.4l2.4 1.2-.7-2c1.3-.9 2.1-2.1 2.1-3.5 0-2.7-2.7-4.7-6-4.7Zm-2.1 4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Zm4.2 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.2H7.7V13h2.7v8h3.1Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.6" cy="6.6" r="1.2"/></svg>',
  xiaohongshu: '<svg viewBox="0 0 32 24" aria-hidden="true"><rect x="1" y="2" width="30" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="16" y="16" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor">小红书</text></svg>',
  tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 7.3a6.7 6.7 0 0 1-4.1-1.4v8.2a5.8 5.8 0 1 1-5-5.7v3.2a2.7 2.7 0 1 0 1.9 2.6V2.5h3.1c.2 2.3 1.8 4.2 4.1 4.6v.2Z"/></svg>'
};

const iconStyle = document.createElement("style");
iconStyle.textContent = `
  .social-links a,.contact-actions .button{display:inline-flex;align-items:center;justify-content:center;gap:10px}
  .social-links a{min-height:42px;padding:8px 12px;border:1px solid rgba(255,255,255,.13);transition:color .2s,border-color .2s,background .2s}
  .social-links a:hover{border-color:rgba(215,179,106,.7);background:rgba(215,179,106,.05)}
  .brand-icon{width:20px;height:20px;display:inline-flex;flex:0 0 20px;align-items:center;justify-content:center}
  .brand-icon svg{width:100%;height:100%;fill:currentColor}
  .social-links .brand-icon{width:21px;height:21px;flex-basis:21px}
  .contact-actions .brand-icon{width:19px;height:19px;flex-basis:19px}
  .wechat-copy-status{width:100%}
  .social-links a[aria-disabled="true"]{opacity:.55;cursor:default}
  .wechat-button.is-copied{border-color:rgba(215,179,106,.8);color:#d7b36a}
`;
document.head.appendChild(iconStyle);

const addIcon = (element, key, label) => {
  if (!element || !iconSvg[key]) return;
  element.replaceChildren();
  const icon = document.createElement("span");
  icon.className = "brand-icon";
  icon.innerHTML = iconSvg[key];
  icon.setAttribute("aria-hidden", "true");
  const text = document.createElement("span");
  text.textContent = label;
  element.append(icon, text);
};

// Social links in footer use their respective icons; TikTok remains a visible placeholder until its account exists.
const socialConfig = [
  ["Facebook", "facebook"],
  ["Instagram", "instagram"],
  ["小红书", "xiaohongshu"],
  ["TikTok", "tiktok"]
];
document.querySelectorAll(".social-links a").forEach((link) => {
  const match = socialConfig.find(([name]) => link.textContent.trim().toLowerCase() === name.toLowerCase());
  if (!match) return;
  addIcon(link, match[1], match[0]);
  if (match[0] === "TikTok" && (!link.getAttribute("href") || link.getAttribute("href") === "#")) {
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("title", "TikTok account coming soon");
  }
});

const whatsappLink = document.getElementById("whatsapp-link");
const wechatButton = document.querySelector(".wechat-button");
const wechatStatus = document.querySelector(".wechat-copy-status");
addIcon(whatsappLink, "whatsapp", "WhatsApp");
addIcon(wechatButton, "wechat", "WeChat: aurainklab888");

if (wechatButton) {
  wechatButton.addEventListener("click", async () => {
    const id = "aurainklab888";
    const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(id);
      if (wechatStatus) wechatStatus.textContent = isChinese ? `已复制微信号：${id}` : `WeChat ID copied: ${id}`;
    } catch {
      if (wechatStatus) wechatStatus.textContent = isChinese ? `请在微信中搜索：${id}` : `Search this ID in WeChat: ${id}`;
    }
    wechatButton.classList.add("is-copied");
  });
}

const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = new Date().getFullYear();

// Set the WhatsApp business number here in international format (digits only) when available.
const WHATSAPP_NUMBER = "";
if (WHATSAPP_NUMBER && whatsappLink) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AURA INK LAB, I'd like to enquire about a tattoo.")}`;
}
