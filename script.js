const g = document.getElementById("greeting");
const btn = document.getElementById("askName");
const themeBtn = document.getElementById("theme-toggle");
const burger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const body = document.body;

// Greeting
function showGreeting(name) {
  g.textContent = name 
  ? "Hello, " + name + "!"
  : 'Welcome!';
}

function askName() {
  const name = prompt("What is your name?");
  if (name) localStorage.setItem("visitorName", name);
  else localStorage.removeItem("visitorName");
  showGreeting(localStorage.getItem("visitorName"));
}

btn.addEventListener("click", askName);
showGreeting(localStorage.getItem("visitorName"));

// Theme toggle
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeBtn.textContent = "Светлая тема";
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeBtn.textContent = isDark ? "Светлая тема" : "Тёмная тема";
});

// Burger menu
burger.addEventListener("click", () => {
  const expanded = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!expanded));
  menu.classList.toggle("open");
});

menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && window.innerWidth <= 768) {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
});

// Кнопка «Наверх»
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Порог появления (в пикселях)
const SHOW_AFTER = 300;

// Следим за прокруткой и показываем/скрываем кнопку
window.addEventListener('scroll', () => {
  if (window.scrollY > SHOW_AFTER) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// Плавно прокручиваем к началу страницы
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Плавная прокрутка без подсветки активного пункта
document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});

// При открытии страницы с хэшем (#about) — плавно скроллим к секции
window.addEventListener('load', () => {
  const { hash } = window.location;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

//Сообщение
setTimeout(() => {
  alert("👋 Want to say hi? Click 'Contact'!");
}, 15000);