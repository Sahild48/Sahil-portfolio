/* ══════════════════════════════════════════════════════════════
   GALLERY & LIGHTBOX LOGIC (gallery.js)
   Handles category filtering (All, C++ Game, Blueprint Game, Photography),
   dynamic grid population for all 3 sections,
   and section-isolated responsive lightbox.
   ══════════════════════════════════════════════════════════════ */

(function initGallerySystem() {
  // Helper to escape HTML characters in captions and alt text
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── 1. GALLERY FILTERING ───────────────────────────────────
  const filterBtns = document.querySelectorAll('.gal-filter');
  const secCpp     = document.getElementById('galSectionCpp');
  const secBp      = document.getElementById('galSectionBlueprints');
  const secPhoto   = document.getElementById('galSectionPhotography');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active button style
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter || 'all';

        if (secCpp && secBp && secPhoto) {
          if (filter === 'all') {
            secCpp.style.display = '';
            secBp.style.display = '';
            secPhoto.style.display = '';
          } else if (filter === 'cpp') {
            secCpp.style.display = '';
            secBp.style.display = 'none';
            secPhoto.style.display = 'none';
          } else if (filter === 'blueprints') {
            secCpp.style.display = 'none';
            secBp.style.display = '';
            secPhoto.style.display = 'none';
          } else if (filter === 'photography') {
            secCpp.style.display = 'none';
            secBp.style.display = 'none';
            secPhoto.style.display = '';
          }
        }
      });
    });
  }

  // ── 2. DYNAMIC GRID RENDERING ──────────────────────────────
  const gridCpp = document.getElementById('galGridCpp');
  const gridBp  = document.getElementById('galGridBlueprints');
  const gridPhoto = document.getElementById('galGridPhotography');

  // Render C++ Game 16:9 Grid (6 items)
  if (gridCpp && typeof GALLERY_CPP_GAMES !== 'undefined') {
    gridCpp.innerHTML = GALLERY_CPP_GAMES.map((item, idx) => {
      const src = item.src || item.fallback || '';
      const fallback = item.fallback || src;
      const title = item.title || item.caption || `C++ Screenshot ${idx + 1}`;
      const alt = item.alt || title;
      const isWebp = src.endsWith('.webp');

      return `
        <div class="gal-game-card" data-section="cpp" data-index="${idx}" role="button" tabindex="0" aria-label="${escapeHtml(title)}">
          <div class="gal-game-card__media">
            <div class="gal-placeholder-box">
              <picture>
                ${isWebp ? `<source srcset="${src}" type="image/webp" />` : ''}
                <img src="${fallback}" alt="${escapeHtml(alt)}" class="gal-card-img" loading="lazy" />
              </picture>
            </div>
            <div class="gal-card__hover-fx"></div>
          </div>
          <div class="gal-game-card__footer">
            <span class="gal-card-caption">${escapeHtml(title)}</span>
            <span class="gal-card-zoom-hint">Enlarge ⤢</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Blueprint Game 16:9 Grid (6 items)
  if (gridBp && typeof GALLERY_BP_GAMES !== 'undefined') {
    gridBp.innerHTML = GALLERY_BP_GAMES.map((item, idx) => {
      const src = item.src || item.fallback || '';
      const fallback = item.fallback || src;
      const title = item.title || item.caption || `Blueprint Screenshot ${idx + 1}`;
      const alt = item.alt || title;
      const isWebp = src.endsWith('.webp');

      return `
        <div class="gal-game-card" data-section="blueprints" data-index="${idx}" role="button" tabindex="0" aria-label="${escapeHtml(title)}">
          <div class="gal-game-card__media">
            <div class="gal-placeholder-box">
              <picture>
                ${isWebp ? `<source srcset="${src}" type="image/webp" />` : ''}
                <img src="${fallback}" alt="${escapeHtml(alt)}" class="gal-card-img" loading="lazy" />
              </picture>
            </div>
            <div class="gal-card__hover-fx"></div>
          </div>
          <div class="gal-game-card__footer">
            <span class="gal-card-caption">${escapeHtml(title)}</span>
            <span class="gal-card-zoom-hint">Enlarge ⤢</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Photography Masonry Grid (10 items)
  if (gridPhoto && typeof GALLERY_PHOTOS !== 'undefined') {
    gridPhoto.innerHTML = GALLERY_PHOTOS.map((photo, idx) => {
      const thumbWebp = photo.thumbWebp ? `<source srcset="${photo.thumbWebp}" type="image/webp" />` : '';
      const thumbImg = photo.thumb || photo.src;
      const tag = photo.tag || 'Photography';
      const alt = photo.alt || photo.title || 'Photograph';

      return `
        <div class="gal-photo-card" data-section="photography" data-index="${idx}" role="button" tabindex="0" aria-label="${escapeHtml(alt)}">
          <div class="gal-photo-card__media">
            <picture>
              ${thumbWebp}
              <img src="${thumbImg}" alt="${escapeHtml(alt)}" class="gal-photo-img" loading="lazy" />
            </picture>
            <div class="gal-photo-card__overlay">
              <span class="gal-photo-tag">${escapeHtml(tag)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── 3. LIGHTBOX SYSTEM (Section-Isolated Navigation) ────────
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox) {
    const lbImg         = document.getElementById('lightboxImg');
    const lbPlaceholder = document.getElementById('lightboxPlaceholder');
    const lbTitle       = document.getElementById('lightboxTitle');
    const lbCaption     = document.getElementById('lightboxCaption');
    const lbCounter     = document.getElementById('lightboxCounter');
    const lbClose       = document.getElementById('lightboxClose');
    const lbPrev        = document.getElementById('lightboxPrev');
    const lbNext        = document.getElementById('lightboxNext');
    const lbBackdrop    = document.getElementById('lightboxBackdrop');
    const lbAlbumLink   = lightbox.querySelector('.lightbox__album-link');

    let currentSectionList = (typeof GALLERY_CPP_GAMES !== 'undefined') ? GALLERY_CPP_GAMES : [];
    let currentPhotoIdx    = 0;

    function updateLightboxContent(idx) {
      if (!currentSectionList || currentSectionList.length === 0) return;
      currentPhotoIdx = (idx + currentSectionList.length) % currentSectionList.length;
      const item = currentSectionList[currentPhotoIdx];

      // Counter: "1 / 6", "1 / 10", "1 / 13"
      if (lbCounter) {
        lbCounter.textContent = `${currentPhotoIdx + 1} / ${currentSectionList.length}`;
      }

      // Title & Caption
      const displayTitle = item.title || item.caption || `Image ${currentPhotoIdx + 1}`;
      if (lbTitle) {
        lbTitle.textContent = displayTitle;
      }
      if (lbCaption) {
        lbCaption.textContent = '';
        lbCaption.style.display = 'none';
      }

      // Manage Full Album link in lightbox
      if (lbAlbumLink) {
        const isPhotoSection = item.section === 'photography';
        const isAlreadyFullAlbum = typeof FULL_ALBUM_PHOTOS !== 'undefined' && 
          (currentSectionList === FULL_ALBUM_PHOTOS || currentSectionList.length >= FULL_ALBUM_PHOTOS.length);
        if (isPhotoSection && !isAlreadyFullAlbum) {
          lbAlbumLink.style.display = '';
          lbAlbumLink.textContent = 'View Full Album \u2192';
        } else {
          lbAlbumLink.style.display = 'none';
        }
      }

      // Load full-resolution image on demand
      const fullSrc = item.full || item.src || item.fallback;
      if (lbImg && fullSrc) {
        lbImg.onload = () => {
          lbImg.style.display = 'block';
          if (lbPlaceholder) lbPlaceholder.style.display = 'none';
        };
        lbImg.onerror = () => {
          lbImg.style.display = 'none';
          if (lbPlaceholder) {
            lbPlaceholder.style.display = 'flex';
            const span = lbPlaceholder.querySelector('span');
            if (span) span.textContent = `${displayTitle} (${fullSrc})`;
          }
        };
        lbImg.src = fullSrc;
        lbImg.alt = item.alt || displayTitle;
      } else if (lbImg) {
        lbImg.style.display = 'none';
        if (lbPlaceholder) lbPlaceholder.style.display = 'flex';
      }
    }

    function openSectionLightbox(list, startIndex = 0) {
      if (!list || list.length === 0) return;
      currentSectionList = list;
      updateLightboxContent(startIndex);

      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-locked');
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-locked');
    }

    function nextPhoto() {
      updateLightboxContent(currentPhotoIdx + 1);
    }

    function prevPhoto() {
      updateLightboxContent(currentPhotoIdx - 1);
    }

    // Attach click listeners to C++ Game cards
    if (gridCpp) {
      gridCpp.querySelectorAll('.gal-game-card').forEach((card, idx) => {
        card.addEventListener('click', () => {
          openSectionLightbox(GALLERY_CPP_GAMES, idx);
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openSectionLightbox(GALLERY_CPP_GAMES, idx);
          }
        });
      });
    }

    // Attach click listeners to Blueprint Game cards
    if (gridBp) {
      gridBp.querySelectorAll('.gal-game-card').forEach((card, idx) => {
        card.addEventListener('click', () => {
          openSectionLightbox(GALLERY_BP_GAMES, idx);
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openSectionLightbox(GALLERY_BP_GAMES, idx);
          }
        });
      });
    }

    // Photography active items list (starts with GALLERY_PHOTOS, expands to FULL_ALBUM_PHOTOS)
    let currentPhotoSet = (typeof GALLERY_PHOTOS !== 'undefined') ? [...GALLERY_PHOTOS] : [];

    // Photography masonry grid click/keydown delegation (handles both initial and dynamically loaded photos)
    if (gridPhoto) {
      gridPhoto.addEventListener('click', (e) => {
        const card = e.target.closest('.gal-photo-card');
        if (!card) return;
        const idx = parseInt(card.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          openSectionLightbox(currentPhotoSet, idx);
        }
      });
      gridPhoto.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const card = e.target.closest('.gal-photo-card');
          if (!card) return;
          e.preventDefault();
          const idx = parseInt(card.getAttribute('data-index'), 10);
          if (!isNaN(idx)) {
            openSectionLightbox(currentPhotoSet, idx);
          }
        }
      });
    }

    // Attach click listener to "View Full Album" button -> loads remaining photos inline below
    const fullAlbumBtn = document.getElementById('openFullAlbumBtn');
    if (fullAlbumBtn) {
      fullAlbumBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof FULL_ALBUM_PHOTOS !== 'undefined' && gridPhoto) {
          const remainingPhotos = FULL_ALBUM_PHOTOS.slice(currentPhotoSet.length);
          if (remainingPhotos.length > 0) {
            const startIdx = currentPhotoSet.length;
            const newCardsHtml = remainingPhotos.map((photo, relIdx) => {
              const idx = startIdx + relIdx;
              const thumbWebp = photo.thumbWebp ? `<source srcset="${photo.thumbWebp}" type="image/webp" />` : '';
              const thumbImg = photo.thumb || photo.src;
              const tag = photo.tag || 'Photography';
              const alt = photo.alt || photo.title || 'Photograph';

              return `
                <div class="gal-photo-card gal-photo-card--loaded" data-section="photography" data-index="${idx}" role="button" tabindex="0" aria-label="${escapeHtml(alt)}">
                  <div class="gal-photo-card__media">
                    <picture>
                      ${thumbWebp}
                      <img src="${thumbImg}" alt="${escapeHtml(alt)}" class="gal-photo-img" loading="lazy" />
                    </picture>
                    <div class="gal-photo-card__overlay">
                      <span class="gal-photo-tag">${escapeHtml(tag)}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('');
            gridPhoto.insertAdjacentHTML('beforeend', newCardsHtml);
            currentPhotoSet = [...FULL_ALBUM_PHOTOS];
          }
        }

        // Smoothly fade out and hide the CTA button container
        const ctaWrap = fullAlbumBtn.closest('.gal-album-cta');
        if (ctaWrap) {
          ctaWrap.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          ctaWrap.style.opacity = '0';
          ctaWrap.style.transform = 'translateY(8px)';
          setTimeout(() => {
            ctaWrap.style.display = 'none';
          }, 300);
        } else {
          fullAlbumBtn.style.display = 'none';
        }
      });
    }

    // Inside-modal "View Full Album" link handler
    if (lbAlbumLink) {
      lbAlbumLink.addEventListener('click', (e) => {
        if (typeof FULL_ALBUM_PHOTOS !== 'undefined' && currentSectionList !== FULL_ALBUM_PHOTOS) {
          e.preventDefault();
          if (fullAlbumBtn && currentPhotoSet.length < FULL_ALBUM_PHOTOS.length) {
            fullAlbumBtn.click();
          }
          openSectionLightbox(FULL_ALBUM_PHOTOS, currentPhotoIdx);
        }
      });
    }

    // Photography page cards — build an inline list from data-photo-full attributes
    const photoCards = document.querySelectorAll('.photo-card');
    if (photoCards.length > 0) {
      // Build the image list on the fly from the DOM attributes
      const photoPageList = Array.from(photoCards).map(card => ({
        full:    card.dataset.photoFull || '',
        src:     card.dataset.photoFull || '',
        title:   card.dataset.photoTitle || '',
        caption: card.dataset.photoCaption || '',
        alt:     card.dataset.photoTitle || 'Photograph',
        section: 'photography'
      }));

      photoCards.forEach((card, idx) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
          if (e.target.closest('.gal-card__album-btn')) return;
          e.preventDefault();
          openSectionLightbox(photoPageList, idx);
        });
      });
    }


    // Lightbox modal controls
    if (lbClose)    lbClose.addEventListener('click', closeLightbox);
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
    if (lbNext)     lbNext.addEventListener('click', nextPhoto);
    if (lbPrev)     lbPrev.addEventListener('click', prevPhoto);

    // Keyboard controls (Esc, ArrowLeft, ArrowRight)
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextPhoto();
      } else if (e.key === 'ArrowLeft') {
        prevPhoto();
      }
    });

    // Global helpers
    window.openSectionLightbox = openSectionLightbox;
    window.openPhotoLightbox = (photoId) => {
      const idx = GALLERY_PHOTOS.findIndex(p => p.id === photoId);
      openSectionLightbox(GALLERY_PHOTOS, idx !== -1 ? idx : 0);
    };
  }

  // ── 3. VIDEO SLOTS & LAZY LOADING ───────────────────────────
  function initVideoSystem() {
    const videoSections = document.querySelectorAll('.proj-videos');
    if (videoSections.length === 0) return;

    videoSections.forEach(section => {
      const isPhotoAlbum = window.location.pathname.includes('photography') || section.closest('.photography-page');
      const projectKey = section.dataset.projectKey || (window.location.pathname.includes('cpp') ? 'cpp' : (window.location.pathname.includes('blueprints') ? 'blueprints' : ''));

      let dataList = [];
      if (isPhotoAlbum && typeof PHOTO_ALBUM !== 'undefined') {
        dataList = PHOTO_ALBUM.videos || [];
      } else if (projectKey && typeof PROJECT_VIDEOS !== 'undefined') {
        dataList = PROJECT_VIDEOS[projectKey] || [];
      }

      const slots = section.querySelectorAll('.video-slot');
      let hasAnyActiveVideo = false;

      slots.forEach((slot, index) => {
        const dataItem = dataList[index];
        let src = slot.dataset.videoSrc || (dataItem ? dataItem.src : '');
        const existingSource = slot.querySelector('video source');
        if (!src && existingSource && existingSource.getAttribute('src')) {
          src = existingSource.getAttribute('src');
        }
        const existingIframe = slot.querySelector('iframe');
        if (!src && existingIframe && existingIframe.getAttribute('src')) {
          src = existingIframe.getAttribute('src');
        }

        if (dataItem) {
          if (dataItem.title) {
            const titleEl = slot.querySelector('.video-info__title');
            if (titleEl) titleEl.textContent = dataItem.title;
          }
          if (dataItem.caption) {
            const descEl = slot.querySelector('.video-info__desc');
            if (descEl) descEl.textContent = dataItem.caption;
          }
        }

        if (src && src.trim() !== '') {
          hasAnyActiveVideo = true;
          slot.dataset.videoSrc = src;
          const container = slot.querySelector('.video-container');
          const placeholder = slot.querySelector('.video-placeholder');
          if (placeholder) placeholder.style.display = 'none';

          const isEmbed = src.includes('youtube.com') || src.includes('youtu.be') || src.includes('vimeo.com');

          if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  obs.unobserve(entry.target);
                  mountVideo(container, src, isEmbed);
                }
              });
            }, { rootMargin: '200px 0px' });
            observer.observe(slot);
          } else {
            mountVideo(container, src, isEmbed);
          }
        } else {
          // If no source is provided, remove empty video/iframe tags to prevent broken players
          const emptyVideos = slot.querySelectorAll('video, iframe');
          emptyVideos.forEach(v => v.remove());

          // On photography page, optional video section is completely hidden if empty
          if (isPhotoAlbum) {
            slot.style.display = 'none';
          }
        }
      });

      if (isPhotoAlbum && !hasAnyActiveVideo) {
        section.style.display = 'none';
      }
    });
  }

  function mountVideo(container, src, isEmbed) {
    if (!container) return;
    if (isEmbed) {
      let iframe = container.querySelector('iframe.video-iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.className = 'video-iframe';
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('title', 'Gameplay video player');
        container.appendChild(iframe);
      }
      iframe.src = src;
      iframe.classList.remove('is-hidden');
    } else {
      let video = container.querySelector('video.video-player');
      if (!video) {
        video = document.createElement('video');
        video.className = 'video-player';
        video.controls = true;
        video.preload = 'none';
        const source = document.createElement('source');
        source.type = 'video/mp4';
        video.appendChild(source);
        container.appendChild(video);
      }
      const source = video.querySelector('source') || video;
      source.src = src;
      video.load();
      video.classList.remove('is-hidden');
    }
  }

  initVideoSystem();
})();
