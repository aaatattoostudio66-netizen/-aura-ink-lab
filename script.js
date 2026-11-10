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

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

      portfolioCards.forEach((card) => {
        const show = selectedFilter === "all" || card.dataset.category === selectedFilter;
        card.classList.toggle("hidden", !show);
      });
    });
  });
}

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
    if (event.target.dataset.close === "true" || event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

const whatsappLink = document.getElementById("whatsapp-link");
const wechatButton = document.querySelector(".wechat-button");
const wechatCopyStatus = document.querySelector(".wechat-copy-status");

if (wechatButton && wechatCopyStatus) {
  wechatButton.addEventListener("click", async () => {
    const wechatId = "aurainklab888";
    const isChinese = document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith("zh");

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(wechatId);
        wechatCopyStatus.textContent = isChinese ? `已复制微信号：${wechatId}` : `WeChat ID copied: ${wechatId}`;
      } else {
        wechatCopyStatus.textContent = isChinese ? `请搜索微信号：${wechatId}` : `Search WeChat ID: ${wechatId}`;
      }
    } catch (error) {
      wechatCopyStatus.textContent = isChinese ? `请搜索微信号：${wechatId}` : `Search WeChat ID: ${wechatId}`;
    }
  });
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const WHATSAPP_NUMBER = "";
if (WHATSAPP_NUMBER && whatsappLink) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello AURA INK LAB, I'd like to enquire about a tattoo.")}`;
}
