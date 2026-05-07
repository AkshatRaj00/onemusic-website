document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const typingText = document.getElementById("typing-text");

  // --- Typing effect ---
  const phrases = [
    "Free. Open Source. Built for music lovers.",
    "No ads. No subscription. No limits.",
    "Smart autoplay. Clean UI. Instant play."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!typingText) return;

    if (!deleting) {
      charIndex++;
      typingText.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1200);
        return;
      }
    } else {
      charIndex--;
      typingText.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeLoop, deleting ? 35 : 55);
  }

  typeLoop();

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // --- Scroll reveal ---
  const revealItems = document.querySelectorAll("section, .card, .contact-card, .screenshots img, .video-box, .hero-logo");

  revealItems.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((el) => observer.observe(el));

  // --- Sticky glass nav on scroll ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("glass-nav");
    } else {
      header.classList.remove("glass-nav");
    }
  });

  // --- Floating particles ---
  function spawnParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 5 + 3;
    const left = Math.random() * window.innerWidth;
    const duration = Math.random() * 5 + 6;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}px`;
    particle.style.bottom = `-20px`;
    particle.style.animationDuration = `${duration}s`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), duration * 1000);
  }

  setInterval(spawnParticle, 300);

  // --- Magnetic hover for buttons and cards ---
  const hoverTargets = document.querySelectorAll(".btn, .card, .contact-card");

  hoverTargets.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.04}px, ${y * 0.04}px) scale(1.02)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  // --- Mouse glow ---
  const glow = document.createElement("div");
  glow.style.position = "fixed";
  glow.style.width = "320px";
  glow.style.height = "320px";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "0";
  glow.style.background = "radial-gradient(circle, rgba(255,122,24,0.12) 0%, rgba(255,122,24,0.04) 35%, transparent 70%)";
  glow.style.transform = "translate(-50%, -50%)";
  glow.style.filter = "blur(10px)";
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
});