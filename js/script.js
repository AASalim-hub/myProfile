
// ========================================
// AA SALIM PORTFOLIO
// Main JavaScript
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.querySelector("#contact-form");
const currentYear = document.querySelector("#current-year");

// Update footer year automatically
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Mobile navigation
function closeMenu() {
  if (!menuToggle || !navMenu) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu"
    );

    navMenu.classList.toggle("open", !isExpanded);
    document.body.classList.toggle("menu-open", !isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when the user presses Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close the mobile menu when the screen becomes wider
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });
}

// Highlight the navigation link for the visible section
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = entry.target.id;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${activeId}`;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Back-to-top button
function handleScroll() {
  if (!backToTop) return;

  backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// Contact form
// Replace this address with your real email address.
const MY_EMAIL = "aasalimdev@gmail.com";

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const senderEmail = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(
      `Hello AA Salim,\n\n${message}\n\nRegards,\n${name}\n${senderEmail}`
    );

    const emailAddress = `mailto:${MY_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

    const status = document.querySelector("#form-status");

    if (MY_EMAIL === "aasalimdev@gmail.com") {
      status.textContent =
        "Please add your real email address in js/script.js before using this form.";
      return;
    }

    status.textContent =
      "Opening your email application. Please review and send your message there.";

    window.location.href = emailAddress;
  });
}
