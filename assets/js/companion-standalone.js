/* ═══════════════════════════════════════════════════
   2D CAMERA COMPANION ("PIXEL") — Standalone Pages
   ═══════════════════════════════════════════════════ */

(function initStandaloneCompanion() {
  const companion = document.getElementById('companionCam');
  const bubble    = document.getElementById('companionBubble');
  if (!companion) return;

  const page = document.body.getAttribute('data-companion-page') || 'cpp';

  const companionExtras = [
    "Still here!",
    "Psst, scroll!",
    "Ping!",
    "Loading fun..."
  ];

  const pageMessages = {
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

  const cam2dFaces = ['cam2d-happy', 'cam2d-curious', 'cam2d-wink', 'cam2d-excited'];
  let cam2dFaceIdx = 0;
  let bubbleTimeout = null;

  function getCompanionMessage() {
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
    void bubble.offsetWidth;
    bubble.classList.add('visible');

    bubbleTimeout = setTimeout(() => {
      bubble.classList.remove('visible');
      bubble.style.opacity = '0';
    }, 2600);
  }

  // Mount into page title slot if available, else stick to page position
  function attachToSlot() {
    const slot = document.getElementById('projCompanionSlot');
    if (slot && !slot.contains(companion)) {
      slot.appendChild(companion);
      companion.classList.remove(`pos-${page}`);
      companion.classList.add('in-slot');
      return true;
    }
    return false;
  }

  if (!attachToSlot()) {
    companion.classList.add(`pos-${page}`);
    // Check if slot renders shortly after (dynamic render)
    const checkInterval = setInterval(() => {
      if (attachToSlot()) {
        clearInterval(checkInterval);
      }
    }, 50);
    setTimeout(() => clearInterval(checkInterval), 3000);
  }

  companion.classList.add('cam-teleport-in');
  setTimeout(() => showCompanionBubble(getCompanionMessage()), 500);
  setTimeout(() => {
    companion.classList.remove('cam-teleport-in');
    companion.classList.add('cam-idle');
  }, 480);

  // Click companion
  companion.addEventListener('click', (e) => {
    e.stopPropagation();
    cam2dFaceIdx = (cam2dFaceIdx + 1) % cam2dFaces.length;
    cam2dSetFace(cam2dFaces[cam2dFaceIdx]);

    companion.style.transform = 'scale(0.88) rotate(-5deg)';
    setTimeout(() => {
      companion.style.transform = '';
    }, 160);

    showCompanionBubble(getCompanionMessage());
  });

  // Cycle face expressions periodically
  setInterval(() => {
    cam2dFaceIdx = (cam2dFaceIdx + 1) % cam2dFaces.length;
    cam2dSetFace(cam2dFaces[cam2dFaceIdx]);
  }, 3500);
})();
