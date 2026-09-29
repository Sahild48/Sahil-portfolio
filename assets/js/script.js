/* ═══════════════════════════════════════════════════
   PORTFOLIO  —  script.js
   Fixed transition system: JS-only inline styles,
   no CSS transition on .page, no "vanish on return" bug
   ═══════════════════════════════════════════════════ */

const PAGE_ORDER  = ['home', 'about', 'edu', 'projects', 'gallery', 'connect'];
const DARK_PAGES  = [];
const DURATION_MS = 580;
const EASING      = 'cubic-bezier(0.65, 0, 0.35, 1)';
const TRANSITION  = `opacity ${DURATION_MS}ms ${EASING}, transform ${DURATION_MS}ms ${EASING}`;
let currentPage    = 'home';
let isTransitioning = false;
let boundaryArmed   = null; // tracks scroll boundary state for Projects & Gallery

// ─────────────────────────────────────────────────
// Theme init — reads saved preference on load
// (toggleDarkMode itself is defined inline in <head>)
// ─────────────────────────────────────────────────
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const html = document.documentElement;
  if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
  } else if (savedTheme === 'light') {
    html.setAttribute('data-theme', 'light');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }
}

// Initialize theme immediately
initTheme();

// ─────────────────────────────────────────────────
// Core: navigate to a page
// ─────────────────────────────────────────────────
function navigateTo(target) {
  const pagesContainer = document.getElementById('pages');
  if (!pagesContainer) {
    window.location.href = `index.html#${target}`;
    return;
  }
  if (target === currentPage || isTransitioning) return;
  isTransitioning = true;
  boundaryArmed = null; // reset boundary state on any page change

  const navLinksEl = document.getElementById('navLinks');
  if (navLinksEl) navLinksEl.classList.remove('mobile-open');

  const outEl  = document.getElementById(`page-${currentPage}`);
  const inEl   = document.getElementById(`page-${target}`);

  const forward = PAGE_ORDER.indexOf(target) > PAGE_ORDER.indexOf(currentPage);
  const offset  = forward ? 70 : -70;

  // ── Step 1: position incoming page off-screen instantly (no transition)
  setStyle(inEl, {
    transition: 'none',
    transform:  `translateX(${offset}px)`,
    opacity:    '0',
    pointerEvents: 'none',
  });

  // ── Step 2: force reflow so the browser registers the starting position
  void inEl.offsetHeight;

  // ── Step 3: enable transition then animate both pages simultaneously
  setStyle(outEl, {
    transition: TRANSITION,
    transform:  `translateX(${-offset}px)`,
    opacity:    '0',
    pointerEvents: 'none',
  });

  setStyle(inEl, {
    transition: TRANSITION,
    transform:  'translateX(0)',
    opacity:    '1',
    pointerEvents: 'all',
  });

  // ── Step 4: trigger companion and UI update in sync with the page animation
  currentPage = target;
  updateUI(target);
  if (typeof updateCompanionForPage === 'function') {
    updateCompanionForPage(target);
  }

  // Keep URL hash and session storage in sync so refresh preserves the current page
  try {
    history.replaceState(null, '', '#' + target);
    sessionStorage.setItem('portfolio-current-page', target);
  } catch (err) {}

  setTimeout(() => {
    // Snap outgoing back to default (invisible but position-reset) without animating
    setStyle(outEl, {
      transition: 'none',
      transform:  'translateX(0)',
      opacity:    '0',
      pointerEvents: 'none',
    });
    // Force the style flush so the transition:none is applied before next paint
    void outEl.offsetHeight;
    // Clear transition so it's ready for future use
    outEl.style.transition = '';

    isTransitioning = false;
  }, DURATION_MS + 60);
}

// ─────────────────────────────────────────────────
// Helper: apply multiple inline styles at once
// ─────────────────────────────────────────────────
function setStyle(el, styles) {
  Object.assign(el.style, styles);
}

// ─────────────────────────────────────────────────
// Update nav buttons, dots, body class
// ─────────────────────────────────────────────────
function updateUI(page) {
  // Nav buttons
  document.querySelectorAll('.nav__btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  // Indicator dots
  document.querySelectorAll('.pg-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.page === page);
  });

  // Dark-page body class (connect page)
  document.body.classList.toggle('pg-dark', DARK_PAGES.includes(page));
}

// ─────────────────────────────────────────────────
// Init: show starting page on load without flicker
// Supports staying on the current page across refreshes
// ─────────────────────────────────────────────────
(function init() {
  const pagesContainer = document.getElementById('pages');
  if (!pagesContainer) return; // Standalone detail page

  const hash = window.location.hash.replace('#', '');
  const sessionPage = sessionStorage.getItem('portfolio-current-page');

  let startPage = 'home';
  if (hash && PAGE_ORDER.includes(hash)) {
    startPage = hash;
  } else if (sessionPage && PAGE_ORDER.includes(sessionPage)) {
    startPage = sessionPage;
  }

  const startEl = document.getElementById(`page-${startPage}`);
  if (!startEl) return;

  currentPage = startPage;
  updateUI(startPage);

  // Sync hash and sessionStorage immediately on load
  try {
    history.replaceState(null, '', '#' + startPage);
    sessionStorage.setItem('portfolio-current-page', startPage);
  } catch (err) {}

  // Explicitly ensure all OTHER pages are hidden and non-interactive
  PAGE_ORDER.forEach(p => {
    if (p !== startPage) {
      const el = document.getElementById(`page-${p}`);
      if (el) {
        setStyle(el, {
          transition: 'none',
          transform:  'translateX(0)',
          opacity:    '0',
          pointerEvents: 'none',
        });
      }
    }
  });

  // Start slightly below and invisible
  setStyle(startEl, {
    transition: 'none',
    transform:  'translateY(18px)',
    opacity:    '0',
    pointerEvents: 'none',
  });

  // After a tiny delay (ensures CSS is parsed), animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setStyle(startEl, {
        transition: `opacity 0.7s ease, transform 0.7s ease`,
        transform:  'translateY(0)',
        opacity:    '1',
        pointerEvents: 'all',
      });

      if (typeof updateCompanionForPage === 'function') {
        updateCompanionForPage(startPage);
      }

      // Once settled, clear inline transition (page keeps opacity:1, transform:0)
      setTimeout(() => {
        startEl.style.transition = '';
      }, 750);
    });
  });
})();

// Persist active page on beforeunload so refresh always stays on the current page
window.addEventListener('beforeunload', () => {
  try {
    sessionStorage.setItem('portfolio-current-page', currentPage);
  } catch (err) {}
});

// Listen for hashchange (e.g. browser back/forward or direct hash links)
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && PAGE_ORDER.includes(hash) && hash !== currentPage) {
    navigateTo(hash);
  }
});

// ─────────────────────────────────────────────────
// Keyboard navigation
// ─────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  const idx = PAGE_ORDER.indexOf(currentPage);
  if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && idx < PAGE_ORDER.length - 1) {
    navigateTo(PAGE_ORDER[idx + 1]);
  }
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && idx > 0) {
    navigateTo(PAGE_ORDER[idx - 1]);
  }
});
// ─────────────────────────────────────────────────
// Mouse wheel navigation
// For Projects & Gallery: stop at boundary, require second scroll to navigate.
// For all other pages: single scroll navigates pages.
// ─────────────────────────────────────────────────
let wheelCooldown = false;

// Pages that have their own internal scrollable content
const SCROLL_PAGES = ['projects', 'gallery'];

document.addEventListener('wheel', e => {
  if (wheelCooldown || isTransitioning) return;

  // For pages with internal scrollable content, apply 2-step boundary logic
  if (SCROLL_PAGES.includes(currentPage)) {
    const containerSelector = currentPage === 'projects' ? '.pg-projects' : '.pg-gallery';
    const activePageEl = document.getElementById(`page-${currentPage}`);
    const container = activePageEl ? activePageEl.querySelector(containerSelector) : null;

    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const goingDown = e.deltaY > 0;
      const goingUp   = e.deltaY < 0;

      if (goingDown) {
        const atBottom = scrollTop + clientHeight >= scrollHeight - 8;

        if (!atBottom) {
          // Mid-content — scroll the container, don't navigate
          container.scrollTop += e.deltaY;
          boundaryArmed = null;
          return;
        } else {
          // At bottom boundary
          if (boundaryArmed !== 'bottom') {
            // First time at bottom — arm & stay
            boundaryArmed = 'bottom';
            return;
          }
          // Already armed — let fall through to page navigation
        }
      }

      if (goingUp) {
        const atTop = scrollTop <= 8;

        if (!atTop) {
          // Mid-content — scroll the container, don't navigate
          container.scrollTop += e.deltaY;
          boundaryArmed = null;
          return;
        } else {
          // At top boundary
          if (boundaryArmed !== 'top') {
            // First time at top — arm & stay
            boundaryArmed = 'top';
            return;
          }
          // Already armed — let fall through to page navigation
        }
      }
    }
  }

  // Standard page navigation (non-scrollable pages or armed boundary)
  boundaryArmed = null;
  wheelCooldown = true;
  setTimeout(() => { wheelCooldown = false; }, DURATION_MS + 150);

  const idx = PAGE_ORDER.indexOf(currentPage);
  if (e.deltaY > 0 && idx < PAGE_ORDER.length - 1) navigateTo(PAGE_ORDER[idx + 1]);
  if (e.deltaY < 0 && idx > 0)                     navigateTo(PAGE_ORDER[idx - 1]);
}, { passive: true });

// ─────────────────────────────────────────────────
// Touch / swipe navigation
// ─────────────────────────────────────────────────
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  if (isTransitioning) return;
  const dx = touchStartX - e.changedTouches[0].clientX;
  const dy = touchStartY - e.changedTouches[0].clientY;
  // Only trigger on mostly-horizontal swipes
  if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 40) return;

  const idx = PAGE_ORDER.indexOf(currentPage);
  if (dx > 0 && idx < PAGE_ORDER.length - 1) navigateTo(PAGE_ORDER[idx + 1]);
  if (dx < 0 && idx > 0)                     navigateTo(PAGE_ORDER[idx - 1]);
}, { passive: true });

// ─────────────────────────────────────────────────
// Mobile hamburger menu
// ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('mobile-open');
  });

  // Close mobile menu when a nav button is clicked
  navLinks.querySelectorAll('.nav__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });

  // Close mobile menu when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('mobile-open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('mobile-open');
    }
  });
}

// ─────────────────────────────────────────────────
// Camera Eye-tracking & Face Transitions
// ─────────────────────────────────────────────────

// Track cursor to move the eyes inside the SVG and rotate the 3D camera body in WebGL space
document.addEventListener('mousemove', (e) => {
  if (currentPage !== 'home') return; // only track on landing page

  // 1. Move camera pupils inside SVG
  const cameraSvg = document.getElementById('camera-svg');
  if (cameraSvg) {
    const rect = cameraSvg.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height * 0.55;

    const dx = e.clientX - eyeCenterX;
    const dy = e.clientY - eyeCenterY;
    const dist = Math.hypot(dx, dy) || 1;

    const maxMove = 15;
    const moveX = (dx / dist) * Math.min(Math.abs(dx) * 0.12, maxMove);
    const moveY = (dy / dist) * Math.min(Math.abs(dy) * 0.12, maxMove);

    const eyes = document.querySelectorAll('.camera-eyes');
    eyes.forEach(eye => {
      eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }

  // 2. Rotate the entire 3D camera body in WebGL space using camera-orbit
  const modelViewer = document.getElementById('camera-3d');
  if (modelViewer) {
    const wX = window.innerWidth / 2;
    const wY = window.innerHeight / 2;
    const normX = (e.clientX - wX) / wX; // -1 (left) to +1 (right)
    const normY = (e.clientY - wY) / wY; // -1 (top) to +1 (bottom)

    // Wide 3D rotation angles so the 3D camera body physically turns to face the cursor:
    // Azimuth (horizontal turn toward cursor): -32deg to +32deg
    // Polar (vertical pitch angle): 72deg to 108deg
    const azimuth = (-normX * 32).toFixed(1);
    const polar = (90 - normY * 18).toFixed(1);

    modelViewer.setAttribute('camera-orbit', `${azimuth}deg ${polar}deg 105%`);

    // Shift face overlay in sync with the 3D screen turning
    const faceOverlay = document.querySelector('.h-face-overlay');
    if (faceOverlay) {
      const faceShiftX = normX * 45; // -45px to +45px
      const faceShiftY = normY * 30; // -30px to +30px
      faceOverlay.style.transform = `translate(calc(-50% + ${faceShiftX.toFixed(1)}px), calc(-50% + ${faceShiftY.toFixed(1)}px))`;
    }
  }
});

const faces = ['face-happy', 'face-curious', 'face-giggle'];
let currentFaceIndex = 0;

function switchCameraFace() {
  const faceGroup = document.getElementById('camera-face-group');
  if (!faceGroup) return;

  // Hide current face
  const currentFaceId = faces[currentFaceIndex];
  const currentFaceEl = document.getElementById(currentFaceId);
  if (currentFaceEl) {
    currentFaceEl.style.display = 'none';
  }

  // Go to next face
  currentFaceIndex = (currentFaceIndex + 1) % faces.length;
  const nextFaceId = faces[currentFaceIndex];
  const nextFaceEl = document.getElementById(nextFaceId);
  if (nextFaceEl) {
    nextFaceEl.style.display = 'block';
  }
}

// Start interval for face switching every 4.5 seconds
setInterval(switchCameraFace, 4500);

// ─────────────────────────────────────────────────
// Mouse Click Effects — Originkit Sniper & Particles
// ─────────────────────────────────────────────────
let clickEffectsContainer;

function getClickContainer() {
  if (!clickEffectsContainer) {
    clickEffectsContainer = document.createElement('div');
    clickEffectsContainer.id = 'click-effects-container';
    Object.assign(clickEffectsContainer.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      zIndex: '999999',
      overflow: 'hidden'
    });
    document.body.appendChild(clickEffectsContainer);
  }
  return clickEffectsContainer;
}

function createClickEffect(x, y) {
  const container = getClickContainer();
  const effectSize = 90;
  const color = '#FA5F05'; // Vivid Orange accent color

  // 1. Sniper Crosshair Ticks & Expanding Ring (SVG)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', effectSize);
  svg.setAttribute('height', effectSize);
  Object.assign(svg.style, {
    position: 'absolute',
    left: `${x - effectSize / 2}px`,
    top: `${y - effectSize / 2}px`,
    pointerEvents: 'none',
    overflow: 'visible'
  });

  const center = effectSize / 2;
  const angles = [0, 90, 180, 270];

  angles.forEach(deg => {
    const rad = (deg * Math.PI) / 180;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const startDist = 6;
    const endDist = 22;

    const x1 = center + startDist * Math.cos(rad);
    const y1 = center + startDist * Math.sin(rad);
    const x2 = center + endDist * Math.cos(rad);
    const y2 = center + endDist * Math.sin(rad);

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'square');
    svg.appendChild(line);

    const moveDist = 18;
    const moveX = moveDist * Math.cos(rad);
    const moveY = moveDist * Math.sin(rad);

    line.animate([
      { transform: 'translate(0, 0)', opacity: 1, strokeWidth: '2px' },
      { transform: `translate(${moveX}px, ${moveY}px)`, opacity: 0, strokeWidth: '0px' }
    ], {
      duration: 350,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    });
  });

  // Expanding Ring Pulse
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', center);
  circle.setAttribute('cy', center);
  circle.setAttribute('r', '10');
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', color);
  circle.setAttribute('stroke-width', '2');
  svg.appendChild(circle);

  circle.animate([
    { transform: 'scale(0.5)', transformOrigin: 'center center', opacity: 1, strokeWidth: '2px' },
    { transform: 'scale(2.2)', transformOrigin: 'center center', opacity: 0, strokeWidth: '0px' }
  ], {
    duration: 320,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards'
  });

  container.appendChild(svg);
  setTimeout(() => svg.remove(), 400);

  // 2. 8 Micro Radial Shooting Particles
  const particleAngles = [
    Math.PI / 6, Math.PI / 3, (2 * Math.PI) / 3, (5 * Math.PI) / 6,
    (7 * Math.PI) / 6, (4 * Math.PI) / 3, (5 * Math.PI) / 3, (11 * Math.PI) / 6
  ];

  particleAngles.forEach(rad => {
    const p = document.createElement('div');
    const size = 4;
    Object.assign(p.style, {
      position: 'absolute',
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: '50%',
      pointerEvents: 'none'
    });

    const dist = 36 + Math.random() * 14;
    const targetX = Math.cos(rad) * dist;
    const targetY = Math.sin(rad) * dist;

    container.appendChild(p);

    p.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${targetX}px, ${targetY}px) scale(0)`, opacity: 0 }
    ], {
      duration: 380,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    });

    setTimeout(() => p.remove(), 400);
  });
}

// Global click event listener
document.addEventListener('click', (e) => {
  createClickEffect(e.clientX, e.clientY);
});

// ─────────────────────────────────────────────────
// 2D Camera Companion Logic
// ─────────────────────────────────────────────────
const companion               = document.getElementById('companionCam');
const bubble                  = document.getElementById('companionBubble');
const eduCompanionSlot        = document.getElementById('eduCompanionSlot');
const projCompanionSlot       = document.getElementById('projCompanionSlot');
const galCompanionSlot        = document.getElementById('galCompanionSlot');
const connectCompanionSlot    = document.getElementById('connectCompanionSlot');
const companionOriginalParent = companion ? companion.parentElement : null;
const cam2dFaces              = ['cam2d-happy', 'cam2d-curious', 'cam2d-wink', 'cam2d-excited'];
let cam2dFaceIdx              = 0;
let bubbleTimeout             = null;

const companionExtras = [
  "Still here!",
  "Psst, scroll!",
  "Ping!",
  "Loading fun..."
];

// Page-specific messages the companion says
const pageMessages = {
  home: [
    "Welcome, player!",
    "Press start.",
    "Unreal Engine 5.",
    "Scroll down!"
  ],
  about: [
    "C++ and Blueprints.",
    "Gameplay programmer.",
    "Building, learning.",
    "Nice to meet you!"
  ],
  edu: [
    "Class of 2027.",
    "Thapar student.",
    "Always learning."
  ],
  projects: [
    "Click one!",
    "Made in Unreal."
  ],
  gallery: [
    "Say cheese!",
    "Snap, snap!",
    "Nice shot!",
    "Game screens.",
    "Pick a frame."
  ],
  connect: [
    "Let's talk!",
    "Say hello.",
    "Email me!",
    "Open to Opportunities",
    "Hire Sahil?"
  ],
  cpp: [
    "C++ inside.",
    "Check mechanics.",
    "Swing, hit!",
    "Code meets art."
  ],
  blueprints: [
    "Nodes everywhere.",
    "Blueprint magic.",
    "Wire it up!",
    "Visual scripting."
  ],
  photography: [
    "Framing shots.",
    "Eye for light.",
    "Click, click!"
  ]
};

function getCompanionMessage(page) {
  const specific = pageMessages[page] || [];
  if (specific.length > 0 && (Math.random() < 0.75 || companionExtras.length === 0)) {
    return specific[Math.floor(Math.random() * specific.length)];
  }
  const pool = specific.length > 0 ? [...specific, ...companionExtras] : companionExtras;
  return pool[Math.floor(Math.random() * pool.length)];
}

function cam2dSetFace(faceId) {
  cam2dFaces.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === faceId ? 'block' : 'none';
  });
}

function showCompanionBubble(text) {
  if (!bubble) return;
  clearTimeout(bubbleTimeout);
  bubble.textContent = text;
  bubble.classList.remove('visible');
  void bubble.offsetWidth; // force reflow
  bubble.classList.add('visible');

  bubbleTimeout = setTimeout(() => {
    bubble.classList.remove('visible');
    bubble.style.opacity = '0';
  }, 2600);
}

let teleportTimeout1 = null;
let teleportTimeout2 = null;

function dockCompanionForPage(page) {
  if (!companion) return;
  if (page === 'edu' && eduCompanionSlot) {
    if (companion.parentElement !== eduCompanionSlot) {
      eduCompanionSlot.appendChild(companion);
    }
  } else if (page === 'projects' && projCompanionSlot) {
    if (companion.parentElement !== projCompanionSlot) {
      projCompanionSlot.appendChild(companion);
    }
  } else if (page === 'gallery' && galCompanionSlot) {
    if (companion.parentElement !== galCompanionSlot) {
      galCompanionSlot.appendChild(companion);
    }
  } else if (page === 'connect' && connectCompanionSlot) {
    if (companion.parentElement !== connectCompanionSlot) {
      connectCompanionSlot.appendChild(companion);
    }
  } else if (companionOriginalParent && companion.parentElement !== companionOriginalParent) {
    companionOriginalParent.appendChild(companion);
  }
}

function updateCompanionForPage(page) {
  if (!companion) return;

  clearTimeout(teleportTimeout1);
  clearTimeout(teleportTimeout2);

  // Home Page: mini companion removed on home page
  if (page === 'home') {
    if (bubble) bubble.classList.remove('visible');
    if (!companion.classList.contains('cam-teleport-out') && companion.style.display !== 'none' && companion.style.opacity === '1') {
      companion.classList.remove('cam-idle', 'cam-teleport-in');
      companion.classList.add('cam-teleport-out');
      teleportTimeout1 = setTimeout(() => {
        companion.style.display = 'none';
        companion.style.opacity = '0';
        companion.style.pointerEvents = 'none';
        companion.classList.remove('pos-home', 'pos-about', 'pos-edu', 'pos-projects', 'pos-gallery', 'pos-connect', 'pos-cpp', 'pos-blueprints', 'pos-photography', 'cam-teleport-out', 'cam-idle');
      }, 210);
    } else {
      companion.style.display = 'none';
      companion.style.opacity = '0';
      companion.style.pointerEvents = 'none';
      companion.classList.remove('pos-home', 'pos-about', 'pos-edu', 'pos-projects', 'pos-gallery', 'pos-connect', 'pos-cpp', 'pos-blueprints', 'pos-photography', 'cam-teleport-out', 'cam-idle', 'cam-teleport-in');
    }
    return;
  }

  // Restore display for all other pages
  companion.style.display = '';

  // If currently hidden or starting fresh: teleport directly in at new spot
  if (companion.style.opacity === '0' || !companion.classList.contains('cam-idle')) {
    dockCompanionForPage(page);
    companion.classList.remove('pos-home', 'pos-about', 'pos-edu', 'pos-projects', 'pos-gallery', 'pos-connect', 'pos-cpp', 'pos-blueprints', 'pos-photography', 'cam-teleport-out', 'cam-idle');
    companion.classList.add(`pos-${page}`);
    companion.style.opacity = '1';
    companion.style.pointerEvents = 'auto';
    companion.classList.add('cam-teleport-in');

    cam2dFaceIdx = (cam2dFaceIdx + 1) % cam2dFaces.length;
    cam2dSetFace(cam2dFaces[cam2dFaceIdx]);

    setTimeout(() => showCompanionBubble(getCompanionMessage(page)), 420);

    teleportTimeout2 = setTimeout(() => {
      companion.classList.remove('cam-teleport-in');
      companion.classList.add('cam-idle');
    }, 460);
    return;
  }

  // Standard Page-to-Page: 1. Teleport Out (200ms shrink & flash)
  companion.classList.remove('cam-idle', 'cam-teleport-in');
  companion.classList.add('cam-teleport-out');
  if (bubble) bubble.classList.remove('visible');

  // 2. While invisible (at 210ms), switch dock parent & position class seamlessly
  teleportTimeout1 = setTimeout(() => {
    dockCompanionForPage(page);
    companion.classList.remove('pos-home', 'pos-about', 'pos-edu', 'pos-projects', 'pos-gallery', 'pos-connect', 'pos-cpp', 'pos-blueprints', 'pos-photography', 'cam-teleport-out');
    companion.classList.add(`pos-${page}`);
    companion.style.opacity = '1';
    companion.style.pointerEvents = 'auto';

    // 3. Teleport In at the new spot with bouncy materialization!
    void companion.offsetWidth; // force reflow
    companion.classList.add('cam-teleport-in');

    // Cycle expression and pop voice line
    cam2dFaceIdx = (cam2dFaceIdx + 1) % cam2dFaces.length;
    cam2dSetFace(cam2dFaces[cam2dFaceIdx]);

    setTimeout(() => showCompanionBubble(getCompanionMessage(page)), 420);

    // 4. Return to smooth idle bobbing
    teleportTimeout2 = setTimeout(() => {
      companion.classList.remove('cam-teleport-in');
      companion.classList.add('cam-idle');
    }, 460);
  }, 210);
}

// Click companion — click bounce, cycle face & show message
companion && companion.addEventListener('click', (e) => {
  e.stopPropagation();
  cam2dFaceIdx = (cam2dFaceIdx + 1) % cam2dFaces.length;
  cam2dSetFace(cam2dFaces[cam2dFaceIdx]);

  // Cheerful click bounce
  companion.style.transform = 'scale(0.88) rotate(-5deg)';
  setTimeout(() => {
    companion.style.transform = '';
  }, 160);

  showCompanionBubble(getCompanionMessage(currentPage));
});

// Auto face cycling every 3.5s
setInterval(() => {
  cam2dFaceIdx = (cam2dFaceIdx + 1) % cam2dFaces.length;
  cam2dSetFace(cam2dFaces[cam2dFaceIdx]);
}, 3500);

// Init: set correct state on load
updateCompanionForPage('home');

// ─────────────────────────────────────────────────
// Connect Page: Copy Buttons & Resume Check
// ─────────────────────────────────────────────────
(function initConnectFeatures() {
  function setupCopyButton(btnId, textToCopy) {
    const copyBtn = document.getElementById(btnId);
    if (!copyBtn) return;
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const label = copyBtn.querySelector('.copy-text');

      function showCopied() {
        if (label) label.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          if (label) label.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(showCopied).catch(() => {
          fallbackCopy(textToCopy);
          showCopied();
        });
      } else {
        fallbackCopy(textToCopy);
        showCopied();
      }
    });
  }

  setupCopyButton('copyEmailBtn', 'sahil41657@gmail.com');
  setupCopyButton('copyGithubBtn', 'https://github.com/Sahild48');
  setupCopyButton('copyLinkedinBtn', 'https://www.linkedin.com/in/sahild48');

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(ta);
  }

  // Hide Download Resume button if file does not exist
  const resumeBtn = document.getElementById('downloadResumeBtn');
  if (resumeBtn) {
    const resumeUrl = resumeBtn.getAttribute('href') || 'assets/resume.pdf';
    fetch(resumeUrl, { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          resumeBtn.style.display = 'none';
        }
      })
      .catch(() => {
        resumeBtn.style.display = 'none';
      });
  }
})();
