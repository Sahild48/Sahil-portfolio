/* ══════════════════════════════════════════════════════════════
   IMAGE SCROLLER COMPONENT & MECHANICS RENDERER (image-scroller.js)
   Reusable horizontal image scroller with:
   - Click-drag & touch swipe with scroll-snap
   - Left / Right arrow navigation (hover visible on desktop)
   - Synchronized dots indicator & slide counter
   - Keyboard accessible (Left/Right arrow keys)
   - Lazy loading support
   - Dynamic data-driven section renderer for project breakdowns
   - Fullscreen Zoom Lightbox modal for high-res image viewing
   ══════════════════════════════════════════════════════════════ */

(function(global) {
  'use strict';

  /**
   * Initializes interactive controls for a single .img-scroller element.
   * @param {HTMLElement} scrollerEl
   */
  function initImageScroller(scrollerEl) {
    if (!scrollerEl || scrollerEl.dataset.initialized === 'true') return;
    scrollerEl.dataset.initialized = 'true';

    const track = scrollerEl.querySelector('.img-scroller__track');
    const prevBtn = scrollerEl.querySelector('.img-scroller__btn--prev');
    const nextBtn = scrollerEl.querySelector('.img-scroller__btn--next');
    const dots = scrollerEl.querySelectorAll('.img-scroller__dot');
    const items = scrollerEl.querySelectorAll('.img-scroller__item');
    const totalItems = items.length;

    if (!track || totalItems <= 1) return;

    let currentIndex = 0;
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasMoved = false;

    function getSlideWidth() {
      return track.clientWidth || (items[0] && items[0].offsetWidth) || 1;
    }

    function updateState() {
      const slideWidth = getSlideWidth();
      const currentScroll = track.scrollLeft;
      const index = Math.round(currentScroll / slideWidth);
      currentIndex = Math.max(0, Math.min(index, totalItems - 1));

      // Synchronize dots
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      // Update button states
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex === totalItems - 1;
      }
    }

    function scrollToSlide(index) {
      const targetIndex = Math.max(0, Math.min(index, totalItems - 1));
      const slideWidth = getSlideWidth();
      track.scrollTo({
        left: targetIndex * slideWidth,
        behavior: 'smooth'
      });
      setTimeout(updateState, 320);
    }

    // Prev / Next button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollToSlide(currentIndex + 1);
      });
    }

    // Dot button click listeners
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(dot.dataset.index, 10);
        if (!isNaN(targetIdx)) {
          scrollToSlide(targetIdx);
        }
      });
    });

    // Keyboard arrow navigation
    scrollerEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToSlide(currentIndex + 1);
      }
    });

    // Desktop Click-and-Drag interaction
    track.addEventListener('mousedown', (e) => {
      if (e.target.closest('.img-scroller__btn')) return;
      isDown = true;
      hasMoved = false;
      track.classList.add('is-dragging');
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      const slideWidth = getSlideWidth();
      const currentScroll = track.scrollLeft;
      const index = Math.round(currentScroll / slideWidth);
      scrollToSlide(index);
    });

    track.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      const slideWidth = getSlideWidth();
      const currentScroll = track.scrollLeft;
      const index = Math.round(currentScroll / slideWidth);
      scrollToSlide(index);
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.2;
      if (Math.abs(walk) > 5) {
        hasMoved = true;
      }
      track.scrollLeft = scrollStart - walk;
    });

    // Prevent click triggering if dragging occurred
    track.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        hasMoved = false;
      }
    }, true);

    // Scroll listener with debounced state update
    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateState, 50);
    }, { passive: true });

    // Window resize observer
    window.addEventListener('resize', () => {
      const slideWidth = getSlideWidth();
      track.scrollLeft = currentIndex * slideWidth;
      updateState();
    });

    // Initial state
    updateState();
  }

  /**
   * Initializes all .img-scroller elements within a container.
   * @param {HTMLElement|Document} container
   */
  function initAllImageScrollers(container = document) {
    const scrollers = container.querySelectorAll('.img-scroller');
    scrollers.forEach(initImageScroller);
  }

  /**
   * Generates the HTML for an image scroller component.
   * @param {Array} images
   * @param {string} scrollerId
   */
  function createScrollerHtml(images, scrollerId) {
    const count = images.length;
    const itemsHtml = images.map((item, i) => `
      <figure class="img-scroller__item">
        <div class="img-scroller__img-wrap">
          <img src="${item.src}" alt="${item.alt || item.caption}" loading="lazy" class="img-scroller__img" />
        </div>
        <div class="img-scroller__caption-bar">
          <p class="img-scroller__caption">${item.caption}</p>
          <span class="img-scroller__counter">${i + 1} / ${count}</span>
        </div>
      </figure>
    `).join('');

    const dotsHtml = images.map((_, i) => `
      <button class="img-scroller__dot ${i === 0 ? 'is-active' : ''}" data-index="${i}" aria-label="Go to image ${i + 1} of ${count}" type="button"></button>
    `).join('');

    return `
      <div class="img-scroller" ${scrollerId ? `id="${scrollerId}-scroller"` : ''} tabindex="0" role="region" aria-label="Image gallery scroller">
        <div class="img-scroller__wrapper">
          <button class="img-scroller__btn img-scroller__btn--prev" aria-label="Previous image" type="button" disabled>
            <span aria-hidden="true">&#8249;</span>
          </button>
          <div class="img-scroller__track">
            ${itemsHtml}
          </div>
          <button class="img-scroller__btn img-scroller__btn--next" aria-label="Next image" type="button">
            <span aria-hidden="true">&#8250;</span>
          </button>
        </div>
        <div class="img-scroller__dots" role="tablist" aria-label="Image navigation dots">
          ${dotsHtml}
        </div>
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════
  // FULLSCREEN LIGHTBOX FOR HIGH-RES SCREENSHOT VIEWING
  // ══════════════════════════════════════════════════════════════
  let lightboxEl, lbImg, lbTitle, lbCaption, lbCounter, lbClose, lbPrev, lbNext, lbBackdrop;
  let activeImageList = [];
  let activeImageIdx = 0;
  let lightboxInitialized = false;

  function initProjectLightbox() {
    if (lightboxInitialized) return;
    lightboxEl = document.getElementById('lightboxModal');
    if (!lightboxEl) return;
    lightboxInitialized = true;

    lbImg      = document.getElementById('lightboxImg');
    lbTitle    = document.getElementById('lightboxTitle');
    lbCaption  = document.getElementById('lightboxCaption');
    lbCounter  = document.getElementById('lightboxCounter');
    lbClose    = document.getElementById('lightboxClose');
    lbPrev     = document.getElementById('lightboxPrev');
    lbNext     = document.getElementById('lightboxNext');
    lbBackdrop = document.getElementById('lightboxBackdrop');

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
    if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

    document.addEventListener('keydown', (e) => {
      if (!lightboxEl.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Mobile touch swipe inside lightbox
    let touchStartX = 0;
    lightboxEl.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightboxEl.addEventListener('touchend', (e) => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) {
        navigateLightbox(dx > 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  function openLightbox(imageList, startIndex = 0) {
    initProjectLightbox();
    if (!lightboxEl || !imageList || imageList.length === 0) return;
    activeImageList = imageList;
    activeImageIdx = Math.max(0, Math.min(startIndex, imageList.length - 1));

    updateLightboxView();
    lightboxEl.classList.add('is-open');
    lightboxEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-locked');
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('is-open');
    lightboxEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-locked');
  }

  function navigateLightbox(dir) {
    if (!activeImageList || activeImageList.length <= 1) return;
    activeImageIdx = (activeImageIdx + dir + activeImageList.length) % activeImageList.length;
    updateLightboxView();
  }

  function updateLightboxView() {
    const item = activeImageList[activeImageIdx];
    if (!item) return;

    if (lbImg) {
      lbImg.src = item.full || item.src;
      lbImg.alt = item.alt || item.caption || '';
      lbImg.style.display = 'block';
      lbImg.style.opacity = '1';
    }
    if (lbTitle) {
      lbTitle.textContent = item.title || 'Project Screenshot';
    }
    if (lbCaption) {
      lbCaption.textContent = item.caption || item.alt || '';
    }
    if (lbCounter) {
      lbCounter.textContent = `${activeImageIdx + 1} / ${activeImageList.length}`;
    }

    if (lbPrev) lbPrev.style.display = activeImageList.length > 1 ? 'flex' : 'none';
    if (lbNext) lbNext.style.display = activeImageList.length > 1 ? 'flex' : 'none';
  }

  /**
   * Helper to build a unified list of all images across project overview and mechanics.
   */
  function buildProjectImageList(overview, mechanics) {
    const allImages = [];

    // 1. Overview image if present
    if (overview && overview.overviewImage) {
      allImages.push({
        src: overview.overviewImage.src,
        full: overview.overviewImage.full || overview.overviewImage.src,
        alt: overview.overviewImage.alt,
        caption: overview.overviewImage.caption,
        title: (overview.title || 'Project') + ' (Overview)'
      });
    }

    // 2. Strip images (forestStrip / villageStrip / strip)
    const stripItems = overview ? (overview.forestStrip || overview.villageStrip || overview.strip) : null;
    if (Array.isArray(stripItems)) {
      stripItems.forEach(v => {
        allImages.push({
          src: v.src,
          full: v.full || v.fallback || v.src,
          alt: v.alt,
          caption: v.caption,
          title: v.title || (overview.stripTitle || 'Environment Preview')
        });
      });
    }

    // 3. Mechanics rows in order
    if (Array.isArray(mechanics)) {
      mechanics.forEach(m => {
        // Flat-row: single image per row
        if (m.image) {
          allImages.push({
            src: m.image.src,
            full: m.image.full || m.image.src,
            alt: m.image.alt,
            caption: m.image.caption,
            title: m.badge && m.badge.includes('\u00b7') ? `${m.badge} — ${m.title}` : m.title
          });
        }
        // Legacy: mainImage
        if (m.mainImage) {
          allImages.push({
            src: m.mainImage.src,
            full: m.mainImage.full || m.mainImage.src,
            alt: m.mainImage.alt,
            caption: m.mainImage.caption,
            title: m.title
          });
        }
        // Legacy: extraImages
        if (Array.isArray(m.extraImages)) {
          m.extraImages.forEach(extra => {
            allImages.push({
              src: extra.src,
              full: extra.full || extra.fallback || extra.src,
              alt: extra.alt,
              caption: extra.caption,
              title: extra.label ? `${m.title} — ${extra.label}` : m.title
            });
          });
        }
        // Legacy: heroImage
        if (m.heroImage) {
          allImages.push({
            src: m.heroImage.src,
            full: m.heroImage.full || m.heroImage.src,
            alt: m.heroImage.alt,
            caption: m.heroImage.caption,
            title: m.title + ' (Overview)'
          });
        }
        // Legacy: scroller frames
        if (Array.isArray(m.scroller)) {
          m.scroller.forEach(s => {
            allImages.push({
              src: s.src,
              full: s.full || s.src,
              alt: s.alt,
              caption: s.caption,
              title: m.title
            });
          });
        }
      });
    }

    return allImages;
  }

  /**
   * Binds click handlers to images in a container so clicking opens the lightbox.
   * @param {HTMLElement} container
   * @param {Array} [mechanics]
   * @param {Object} [overview]
   * @param {Array} [customImageList]
   */
  function bindLightboxTriggers(container, mechanics, overview, customImageList) {
    initProjectLightbox();

    // Use custom list (e.g. unified across page) or build from parameters
    const allImages = Array.isArray(customImageList) && customImageList.length > 0
      ? customImageList
      : buildProjectImageList(overview, mechanics);

    // Attach click handlers to all image wrappers
    const wrappers = container.querySelectorAll('.mech-single-media, .mech-extra-thumb, .village-strip__card, .img-scroller__img-wrap, .proj-overview-img-wrap');
    wrappers.forEach(wrap => {
      wrap.setAttribute('role', 'button');
      wrap.setAttribute('tabindex', '0');
      wrap.setAttribute('aria-label', 'Click to view full image in lightbox');

      const triggerOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dataFull = wrap.dataset.full;
        const img = wrap.querySelector('img');
        const imgSrc = img ? img.getAttribute('src') : null;
        
        let foundIdx = -1;
        if (dataFull) {
          foundIdx = allImages.findIndex(item => item.full === dataFull || item.src === dataFull);
        }
        if (foundIdx < 0 && imgSrc) {
          foundIdx = allImages.findIndex(item => item.src === imgSrc || item.full === imgSrc);
        }
        openLightbox(allImages, foundIdx >= 0 ? foundIdx : 0);
      };

      wrap.onclick = triggerOpen;
      wrap.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          triggerOpen(e);
        }
      };
    });
  }

  /**
   * Renders the unified project overview hero block
   * (shared between C++ and Blueprints pages, driven entirely by data)
   * Fields: heroImage, tag, title, description, chips, stripTitle, forestStrip / villageStrip
   * @param {string|HTMLElement} containerId
   * @param {Object} data
   */
  function renderProjectOverview(containerId, data) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container || !data) return;

    // Chips / Tags
    const chipsList = Array.isArray(data.chips) ? data.chips : (Array.isArray(data.tags) ? data.tags : []);
    const tagsHtml = chipsList.map(chip => `<span class="proj-tag-pill">${chip}</span>`).join('');

    // Single description paragraph - NO duplicate sentence
    let descText = '';
    if (typeof data.description === 'string' && data.description.trim()) {
      descText = data.description.trim();
    } else if (Array.isArray(data.description) && data.description.length > 0) {
      descText = data.description[0].trim();
    } else if (data.heroSentence) {
      descText = data.heroSentence.trim();
    } else if (data.tagline) {
      descText = data.tagline.trim();
    }
    const descHtml = descText ? `<p class="proj-desc-p">${descText}</p>` : '';

    // Action buttons: "Back to Projects", "Watch Gameplay" (if video clips section exists), and hidden slots
    const targetVideoSection = data.videosSectionId
      || (document.getElementById('gameplayClips') ? 'gameplayClips' : (document.getElementById('bpVideosSection') ? 'bpVideosSection' : null));
    
    const watchGameplayTopBtn = (targetVideoSection && data.watchGameplayInTopActions) ? `
      <a href="#${targetVideoSection}" class="proj-back-btn proj-back-btn--gameplay" id="heroWatchGameplayBtn">
        <span class="ext-btn-icon">▶</span> Watch Gameplay &darr;
      </a>
    ` : '';

    const watchGameplayHtml = (targetVideoSection && !data.watchGameplayInTopActions) ? `
      <a href="#${targetVideoSection}" class="proj-ext-btn proj-ext-btn--video">
        <span class="ext-btn-icon">▶</span> Watch Gameplay &darr;
      </a>
    ` : '';

    const extLinksHtml = `
      <div class="proj-detail__links">
        ${watchGameplayHtml}
        ${data.githubUrl ? `<a href="${data.githubUrl}" class="proj-ext-btn proj-ext-btn--github" id="githubLink" target="_blank" rel="noopener noreferrer"><span class="ext-btn-icon">⌥</span> GitHub Repository &rarr;</a>` : ''}
        ${data.videoUrl ? `<a href="${data.videoUrl}" class="proj-ext-btn proj-ext-btn--video" id="videoLink" target="_blank" rel="noopener noreferrer"><span class="ext-btn-icon">▶</span> Watch Gameplay Video &rarr;</a>` : ''}
      </div>
    `;

    // Strip (THE FOREST / THE VILLAGE)
    const stripList = Array.isArray(data.forestStrip)
      ? data.forestStrip
      : (Array.isArray(data.villageStrip) ? data.villageStrip : (Array.isArray(data.strip) ? data.strip : null));
    const stripTitle = data.stripTitle || (data.forestStrip ? 'THE FOREST' : 'THE VILLAGE');

    const stripHtml = Array.isArray(stripList) && stripList.length > 0 ? `
      <div class="village-strip" aria-label="${stripTitle} environment previews">
        <span class="village-strip__label">${stripTitle}</span>
        <div class="village-strip__row">
          ${stripList.map((item, vIdx) => `
            <figure class="village-strip__card" role="button" tabindex="0" data-full="${item.full || item.src}" aria-label="View ${item.title || 'Preview image'} in lightbox">
              <picture>
                ${item.src.endsWith('.webp') ? `<source srcset="${item.src}" type="image/webp" />` : ''}
                <img src="${item.fallback || item.src}" alt="${item.alt || item.title}" class="village-strip__img" loading="lazy" />
              </picture>
              <figcaption class="village-strip__caption">${item.title}</figcaption>
            </figure>
          `).join('')}
        </div>
      </div>
    ` : '';

    const heroBgImg = data.heroImage || data.heroBg || '';
    const heroBgHtml = heroBgImg ? `
      <div class="proj-hero-bg" aria-hidden="true" style="background-image: url('${heroBgImg}');"></div>
    ` : '';

    container.innerHTML = `
      ${heroBgHtml}
      <div class="proj-top-actions">
        <a href="index.html#projects" class="proj-back-btn">&larr; Back to Projects</a>
        ${watchGameplayTopBtn}
      </div>

      <div class="proj-overview-text">
        <span class="proj-detail__tag">${data.tag || 'Unreal Engine 5'}</span>
        <h1 class="proj-detail__title">${data.title}</h1>
        
        ${descHtml}

        <div class="proj-tags-list" role="list" aria-label="Project tags">
          ${tagsHtml}
        </div>

        ${data.credit ? `<p class="proj-credit-line">${data.credit}</p>` : ''}

        ${extLinksHtml}

        ${stripHtml}
      </div>
    `;

    // Smooth scroll for top "Watch Gameplay" button
    const heroWatchBtn = container.querySelector('#heroWatchGameplayBtn');
    if (heroWatchBtn && targetVideoSection) {
      heroWatchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(targetVideoSection);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', `#${targetVideoSection}`);
          }
        }
      });
    }

    // Bind lightbox if triggers exist in overview
    bindLightboxTriggers(container, [], data);
  }

  /**
   * Renders the mechanics sections dynamically into a container.
   * Supports two data shapes:
   *   - Flat row:   { image, badge, title, desc }     (BP_PROJECT_MECHANICS)
   *   - Legacy row: { mainImage, extraImages, ... }   (CPP_PROJECT_MECHANICS)
   * @param {string|HTMLElement} containerId
   * @param {Array} mechanics
   */
  function renderMechanics(containerId, mechanics) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container || !Array.isArray(mechanics)) return;

    container.innerHTML = mechanics.map((m, idx) => {
      let mediaHtml = '';

      // ── Flat-row: single image per row (natural aspect ratio) ─
      if (m.image && !m.mainImage) {
        const imgEl = m.image.src && m.image.src.endsWith('.webp')
          ? `<picture><source srcset="${m.image.src}" type="image/webp" /><img src="${m.image.fallback || m.image.src}" ${m.image.srcset ? `srcset="${m.image.srcset}"` : ''} alt="${m.image.alt || m.title}" loading="lazy" class="mech-img mech-img--natural" /></picture>`
          : `<img src="${m.image.src}" ${m.image.srcset ? `srcset="${m.image.srcset}"` : ''} alt="${m.image.alt || m.title}" loading="lazy" class="mech-img mech-img--natural" />`;

        mediaHtml = `
          <figure class="mech-single-media" role="button" tabindex="0" data-full="${m.image.full || m.image.src}" aria-label="Click to enlarge ${m.title}">
            ${imgEl}
            ${m.image.caption ? `<figcaption class="mech-single-caption">${m.image.caption}</figcaption>` : ''}
          </figure>
        `;

      // ── Legacy: mainImage + optional extra thumbnails ─────────
      } else if (m.mainImage) {
        const extraHtml = Array.isArray(m.extraImages) && m.extraImages.length > 0 ? `
          <div class="mech-extra-strip">
            <span class="mech-extra-label">Additional Views:</span>
            <div class="mech-extra-thumbs">
              ${m.extraImages.map((extra, eIdx) => `
                <div class="mech-extra-thumb" role="button" tabindex="0" data-full="${extra.full || extra.src}" aria-label="Open ${extra.label || extra.alt || 'screenshot'} in lightbox">
                  <picture>
                    ${extra.src.endsWith('.webp') ? `<source srcset="${extra.src}" type="image/webp" />` : ''}
                    <img src="${extra.fallback || extra.src}" alt="${extra.alt || ''}" loading="lazy" class="mech-extra-thumb-img" />
                  </picture>
                  <span class="mech-extra-thumb-title">${extra.label || `View 0${eIdx + 1}`}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '';

        mediaHtml = `
          <div class="mech-media-stack">
            <figure class="mech-single-media" role="button" tabindex="0" data-full="${m.mainImage.full || m.mainImage.src}" aria-label="Open ${m.title} in lightbox">
              <picture>
                ${m.mainImage.src.endsWith('.webp') ? `<source srcset="${m.mainImage.src}" type="image/webp" />` : ''}
                <img src="${m.mainImage.src}" ${m.mainImage.srcset ? `srcset="${m.mainImage.srcset}"` : ''} ${m.mainImage.sizes ? `sizes="${m.mainImage.sizes}"` : ''} alt="${m.mainImage.alt || m.title}" loading="lazy" class="mech-img" />
              </picture>
              ${m.mainImage.caption ? `<figcaption class="mech-single-caption">${m.mainImage.caption}</figcaption>` : ''}
            </figure>
            ${extraHtml}
          </div>
        `;
      } else if (m.heroImage && m.scroller) {
        mediaHtml = `
          <div class="mech-composite-media">
            <figure class="mech-single-media" role="button" tabindex="0" data-full="${m.heroImage.full || m.heroImage.src}">
              <img src="${m.heroImage.src}" alt="${m.heroImage.alt || m.title}" loading="lazy" class="mech-img" />
              ${m.heroImage.caption ? `<figcaption class="mech-single-caption">${m.heroImage.caption}</figcaption>` : ''}
            </figure>
            <div class="mech-composite-label">Step-by-Step Rig Breakdown</div>
            ${createScrollerHtml(m.scroller, m.id)}
          </div>
        `;
      } else if (m.scroller && m.scroller.length > 1) {
        mediaHtml = createScrollerHtml(m.scroller, m.id);
      }

      return `
        <section class="mech-row" id="${m.id || 'mech-' + (idx + 1)}">
          <div class="mech-media">
            ${mediaHtml}
          </div>
          <div class="mech-content">
            <span class="mech-badge">${m.badge}</span>
            <h3 class="mech-title">${m.title}</h3>
            ${m.desc ? `<p class="mech-desc">${m.desc}</p>` : ''}
          </div>
        </section>
      `;
    }).join('');

    // Initialize all scrollers inside the rendered container
    initAllImageScrollers(container);

    // Bind lightbox zoom triggers
    bindLightboxTriggers(container, mechanics, null);
  }

  /**
   * Detects YouTube or Vimeo URLs and converts them to standard embed iframe URLs.
   * @param {string} url
   * @returns {string|null}
   */
  function getEmbedUrl(url) {
    if (!url || typeof url !== 'string') return null;
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return null;
  }

  /**
   * Renders the Gameplay Clips grid/player dynamically from data.
   * Supports local HTML5 video (mp4) and YouTube/Vimeo embeds.
   * When only 1 video is present, centers with 1000px max-width.
   * @param {string|HTMLElement} containerId
   * @param {Array} videos
   */
  function renderGameplayVideos(containerId, videos) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container || !Array.isArray(videos)) return;

    if (videos.length === 1) {
      container.classList.add('video-grid--single');
    } else {
      container.classList.remove('video-grid--single');
    }

    container.innerHTML = videos.map((v, idx) => {
      const embedUrl = getEmbedUrl(v.src);
      if (embedUrl) {
        return `
          <div class="video-slot video-slot--embed" id="video-slot-${idx + 1}">
            <div class="video-container">
              <iframe
                class="video-player-iframe"
                src="${embedUrl}"
                title="${v.title || v.caption || 'Gameplay Video'}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
            </div>
            <div class="video-info">
              <p class="video-info__caption">${v.caption || ''}</p>
            </div>
          </div>
        `;
      }

      return `
        <div class="video-slot" id="video-slot-${idx + 1}">
          <div class="video-container">
            <video
              class="video-player"
              controls
              playsinline
              preload="none"
              muted
              poster="${v.poster || v.fallbackPoster || ''}"
              aria-label="${v.caption || v.title || 'Gameplay Video'}">
              <source src="${v.src}" type="video/mp4">
              <p>Your browser does not support HTML5 video.</p>
            </video>
          </div>
          <div class="video-info">
            <p class="video-info__caption">${v.caption || ''}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Auto-mount mechanics data and gameplay clips for project-cpp.html & project-blueprints.html
  function autoMountProjectData() {
    // Mount C++ Project if container exists
    const cppOverviewEl = document.getElementById('cppOverview');
    const cppEl = document.getElementById('cppMechanics');
    const cppVidsEl = document.getElementById('cppVideosGrid');
    const hasCpp = (cppOverviewEl && typeof CPP_PROJECT_OVERVIEW !== 'undefined') || (cppEl && typeof CPP_PROJECT_MECHANICS !== 'undefined');
    if (hasCpp) {
      if (cppOverviewEl && typeof CPP_PROJECT_OVERVIEW !== 'undefined') {
        renderProjectOverview(cppOverviewEl, CPP_PROJECT_OVERVIEW);
      }
      if (cppEl && typeof CPP_PROJECT_MECHANICS !== 'undefined') {
        renderMechanics(cppEl, CPP_PROJECT_MECHANICS);
      }
      if (cppVidsEl && typeof CPP_PROJECT_VIDEOS !== 'undefined') {
        renderGameplayVideos(cppVidsEl, CPP_PROJECT_VIDEOS);
      }
      const cppUnified = buildProjectImageList(
        typeof CPP_PROJECT_OVERVIEW !== 'undefined' ? CPP_PROJECT_OVERVIEW : null,
        typeof CPP_PROJECT_MECHANICS !== 'undefined' ? CPP_PROJECT_MECHANICS : null
      );
      if (cppOverviewEl) bindLightboxTriggers(cppOverviewEl, null, null, cppUnified);
      if (cppEl) bindLightboxTriggers(cppEl, null, null, cppUnified);
    }

    // Mount Blueprints Project if container exists
    const bpOverviewEl = document.getElementById('bpOverview');
    const bpEl = document.getElementById('bpMechanics');
    const bpVidsEl = document.getElementById('bpVideosGrid');
    const hasBp = (bpOverviewEl && typeof BP_PROJECT_OVERVIEW !== 'undefined') || (bpEl && typeof BP_PROJECT_MECHANICS !== 'undefined');
    if (hasBp) {
      if (bpOverviewEl && typeof BP_PROJECT_OVERVIEW !== 'undefined') {
        renderProjectOverview(bpOverviewEl, BP_PROJECT_OVERVIEW);
      }
      if (bpEl && typeof BP_PROJECT_MECHANICS !== 'undefined') {
        renderMechanics(bpEl, BP_PROJECT_MECHANICS);
      }
      if (bpVidsEl && typeof BP_PROJECT_VIDEOS !== 'undefined' && BP_PROJECT_VIDEOS.length > 0) {
        renderGameplayVideos(bpVidsEl, BP_PROJECT_VIDEOS);
      }
      // Unified list: Village strip (Aerial first, Ground-level second) + all 13 mechanics rows in order
      const bpUnified = buildProjectImageList(
        typeof BP_PROJECT_OVERVIEW !== 'undefined' ? BP_PROJECT_OVERVIEW : null,
        typeof BP_PROJECT_MECHANICS !== 'undefined' ? BP_PROJECT_MECHANICS : null
      );
      if (bpOverviewEl) bindLightboxTriggers(bpOverviewEl, null, null, bpUnified);
      if (bpEl) bindLightboxTriggers(bpEl, null, null, bpUnified);
    }
  }

  // Export functions to global scope
  global.initImageScroller = initImageScroller;
  global.initAllImageScrollers = initAllImageScrollers;
  global.renderMechanics = renderMechanics;
  global.renderGameplayVideos = renderGameplayVideos;
  global.renderProjectOverview = renderProjectOverview;
  global.createScrollerHtml = createScrollerHtml;
  global.openLightbox = openLightbox;
  global.closeLightbox = closeLightbox;
  global.autoMountProjectData = autoMountProjectData;

  // Mount immediately if DOM elements exist, or on DOMContentLoaded
  if (document.getElementById('cppOverview') || document.getElementById('cppMechanics') || document.getElementById('bpOverview') || document.getElementById('bpMechanics')) {
    autoMountProjectData();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMountProjectData);
  } else {
    autoMountProjectData();
  }
})(typeof window !== 'undefined' ? window : this);



