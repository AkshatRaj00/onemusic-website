document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLElement | null} */
  const header = document.querySelector(".header");
  /** @type {HTMLElement | null} */
  const typingText = document.getElementById("typing-text");

  // --- Typing effect ---
  /**
   * Immutable list of phrases cycled by the typewriter effect.
   * @constant {readonly string[]}
   */
  const phrases = Object.freeze([
    "Free. Open Source. Built for music lovers.",
    "No ads. No subscription. No limits.",
    "Smart autoplay. Clean UI. Instant play."
  ]);

  /** @type {number} Current phrase index (0..phrases.length-1) */
  let phraseIndex = 0;
  /** @type {number} Current character index within the active phrase */
  let charIndex = 0;
  /** @type {boolean} Whether the loop is currently in the deleting state */
  let deleting = false;

  /**
   * Configuration object for {@link typeLoop}.
   * All properties are optional; sensible defaults are applied when omitted.
   *
   * @typedef {Object} TypeLoopOptions
   * @property {number} [typingDelay=55]   Delay between typing characters, in milliseconds.
   * @property {number} [deletingDelay=35] Delay between deleting characters, in milliseconds.
   * @property {number} [pauseDelay=1200]  Pause after a phrase is fully typed, before deletion begins, in milliseconds.
   */

  /**
   * Drives the typing/deleting animation loop for the hero text.
   *
   * Cycles through {@link phrases} with a typewriter effect, alternating between
   * typing and deleting states with configurable delays. The function schedules
   * itself recursively via `setTimeout`, so it must be invoked once to start
   * and will continue indefinitely until the page unloads.
   *
   * @param {TypeLoopOptions} [options={}] - Animation timing options.
   * @returns {void}
   * @throws {Error} If the `#typing-text` element is not found in the DOM or if phraseIndex is out of bounds.
   * @example
   * // Default usage
   * typeLoop();
   *
   * // Custom timing
   * typeLoop({ typingDelay: 60, deletingDelay: 40, pauseDelay: 1500 });
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
   */
  function typeLoop(options = {}) {
    const {
      typingDelay = 55,
      deletingDelay = 35,
      pauseDelay = 1200
    } = options;

    if (!typingText) {
      throw new Error("typingText element not found");
    }

    const current = phrases[phraseIndex];
    if (phraseIndex < 0 || phraseIndex >= phrases.length) {
      phraseIndex = 0;
    }

    if (charIndex < 0 || charIndex > current.length) {
      charIndex = deleting ? current.length : 0;
    }

    if (!deleting) {
      charIndex++;
      typingText.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, pauseDelay, options);
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

    setTimeout(typeLoop, deleting ? deletingDelay : typingDelay, options);
  }

  typeLoop();

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      /** @type {HTMLElement | null} */
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // --- Scroll reveal ---
  /** @type {NodeListOf<Element>} */
  const revealItems = document.querySelectorAll("section, .card, .contact-card, .screenshots img, .video-box, .hero-logo");

  revealItems.forEach((el) => el.classList.add("reveal"));

  /** @type {IntersectionObserver} */
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
      header?.classList.add("glass-nav");
    } else {
      header?.classList.remove("glass-nav");
    }
  });

  /**
   * Creates and animates a single floating particle element with randomized
   * visual properties, then removes it from the DOM once its animation
   * completes.
   *
   * Particle characteristics:
   * - Size: random between 3–8 px (square)
   * - Horizontal position: random across the viewport width
   * - Vertical start: 20 px below the viewport bottom
   * - Animation duration: random between 6–11 s
   * - Cleanup: removed from the DOM after `duration * 1000` ms
   *
   * @returns {void}
   * @example
   * // Spawn a single particle
   * spawnParticle();
   *
   * // Spawn particles continuously
   * setInterval(spawnParticle, 300);
   */
  function spawnParticle() {
    /** @type {HTMLDivElement} */
    const particle = document.createElement("div");
    particle.className = "particle";

    /** @type {number} Random size between 3–8 px */
    const size = Math.random() * 5 + 3;
    /** @type {number} Random horizontal position in px */
    const left = Math.random() * window.innerWidth;
    /** @type {number} Random animation duration between 6–11 s */
    const duration = Math.random() * 5 + 6;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}px`;
    particle.style.bottom = `-20px`;
    particle.style.animationDuration = `${duration}s`;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  setInterval(spawnParticle, 300);

  // --- Magnetic hover for buttons and cards ---
  /** @type {NodeListOf<Element>} */
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
  /** @type {HTMLDivElement} */
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