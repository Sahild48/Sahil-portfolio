# Photography Assets

Drop your photography images and high-resolution captures here.

### Suggested File Naming:
- `photo-01-thumb.jpg` (compact grid thumbnail)
- `photo-01.jpg` (full resolution for lightbox modal)
- `photo-02-thumb.jpg` / `photo-02.jpg`
- `photo-03-thumb.jpg` / `photo-03.jpg`
- `photo-04-thumb.jpg` / `photo-04.jpg`
- `photo-05-thumb.jpg` / `photo-05.jpg`
- `photo-06-thumb.jpg` / `photo-06.jpg`

### Quick Start:
1. Drop files in this folder.
2. Add one line to `assets/js/gallery-data.js` under `GALLERY_DATA` or `PHOTO_ALBUM.photos`:
   ```js
   thumb: 'assets/photography/photo-01-thumb.jpg',
   full:  'assets/photography/photo-01.jpg'
   ```
3. You should never need to touch the layout code!
