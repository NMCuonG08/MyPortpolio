// theme toggle
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initTheme = saved || (prefersDark ? "dark" : "light");
root.setAttribute("data-theme", initTheme);
toggle.textContent = initTheme === "dark" ? "◑" : "◐";
toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  toggle.textContent = next === "dark" ? "◑" : "◐";
});

// scroll reveal
const reveals = document.querySelectorAll("[data-reveal]");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
reveals.forEach((el) => io.observe(el));

// active nav link
const links = document.querySelectorAll(".nav__links a");
const sections = [...links].map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = "#" + e.target.id;
        links.forEach((l) => (l.style.color = l.getAttribute("href") === id ? "var(--accent)" : ""));
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach((s) => spy.observe(s));

// keyboard: press "g" then a letter to jump
const map = { w: "#work", e: "#experience", s: "#stack", c: "#contact", t: "#top" };
let lastKey = 0;
document.addEventListener("keydown", (ev) => {
  if (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA") return;
  const k = ev.key.toLowerCase();
  if (k in map && Date.now() - lastKey < 800) {
    document.querySelector(map[k])?.scrollIntoView({ behavior: "smooth" });
  }
  lastKey = Date.now();
});