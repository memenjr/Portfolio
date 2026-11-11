(function () {
  "use strict";

  // Bordure du header au défilement
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }));

  // Fenêtres de détail des projets
  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => document.getElementById(btn.dataset.open).showModal());
  });
  document.querySelectorAll(".modal").forEach((m) => {
    m.querySelector(".modal__close").addEventListener("click", () => m.close());
    m.addEventListener("click", (e) => { if (e.target === m) m.close(); });
  });

  // Apparition douce au défilement
  const els = document.querySelectorAll(".section__head, .about__body, .project, .step, .article, .tool-box, .missions li, .table-wrap, .doc, .timeline__item, .contact");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }
})();
