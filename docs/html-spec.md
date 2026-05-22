# HTML Slideshow Spec

Design and technical specifications for self-contained HTML presentation files generated from PDF slides.

---

## File Conventions

- **Output location:** `html-source/<name>.html` (source of truth)
- **Served location:** `public/<name>.html` (copy for Next.js — keep in sync)
- **Naming:** kebab-case matching the course name (e.g. `healthy-cooking.html`)

---

## Generation

Use PyMuPDF (`fitz`) to render each PDF page as a base64-encoded PNG at **2× resolution** (for crisp display on retina screens). All images are embedded inline — the resulting file is fully self-contained with no external dependencies.

```python
import fitz, base64, os

doc = fitz.open("presentation.pdf")
slides = []
for page in doc:
    mat = fitz.Matrix(2, 2)          # 2× scale
    pix = page.get_pixmap(matrix=mat, alpha=False)
    slides.append(base64.b64encode(pix.tobytes("png")).decode("ascii"))
doc.close()
```

After generating, copy the file from `html-source/` to `public/`:
```bash
cp html-source/<name>.html public/<name>.html
```

---

## Layout

```
body (dark bg, flex column, centered)
  └── .viewer       ← slide canvas
  └── .controls     ← Prev button · counter · Next button
  └── .dots         ← one dot per slide
  └── .hint         ← keyboard shortcut label
```

### Body
```css
background: #1a1a1a;
display: flex; flex-direction: column;
align-items: center; justify-content: center;
min-height: 100vh;
padding: 12px; gap: 14px;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Viewer (.viewer)
Scales to fill as much of the screen as possible while maintaining 16:9 aspect ratio:
```css
width: 100%;
max-width: min(95vw, calc(85vh * 16 / 9));
aspect-ratio: 16 / 9;
background: #000;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 24px 64px rgba(0,0,0,0.6);
```

### Slides (.slide / .slide img)
```css
/* .slide */
width: 100%; height: 100%;
display: flex; (flex when active, none when hidden)
align-items: center; justify-content: center;

/* .slide img */
width: 100%; height: 100%;
object-fit: contain;
display: block;
```

---

## Controls

### Buttons (Prev / Next)
```css
background: rgba(255,255,255,0.12);
border: 1px solid rgba(255,255,255,0.18);
color: #fff;
border-radius: 8px;
padding: 12px 32px;
font-size: 17px;
font-weight: 500;
transition: background 0.15s;
```
Hover: `background: rgba(255,255,255,0.22)`  
Disabled: `opacity: 0.3`

### Slide Counter (.counter)
```css
color: rgba(255,255,255,0.7);
font-size: 18px;
min-width: 90px;
text-align: center;
letter-spacing: 0.04em;
```
Format: `1 / 11`

### Dot Indicators (.dot)
24×24px tap target (WCAG 2.5.8) with an 8px visual dot rendered via `::after`:
```css
/* .dot — 24×24px clickable target */
width: 24px; height: 24px;
border-radius: 50%;
background: rgba(255,255,255,0.25);
cursor: pointer;
transition: background 0.15s, transform 0.15s;
border: none; padding: 0;
display: flex; align-items: center; justify-content: center;

/* .dot::after — 8px visual indicator */
content: ''; display: block;
width: 8px; height: 8px;
border-radius: 50%;
background: currentColor;
transition: transform 0.15s;
```
Active dot: `background: #fff; transform: scale(1.3)`  
Hover: `background: rgba(255,255,255,0.5)`

### Keyboard Hint (.hint)
```css
color: rgba(255,255,255,0.3);
font-size: 12px;
letter-spacing: 0.03em;
```
Text: `← → arrow keys to navigate · N slides`

---

## Navigation Behavior

- **Arrow keys:** `ArrowLeft` / `ArrowUp` → previous; `ArrowRight` / `ArrowDown` → next
- **Dot clicks:** jump directly to any slide
- **Prev/Next buttons:** step one slide at a time; disabled at first/last slide
- First slide shown on load; all others `display: none`

---

## Linking from the Courses Page

Add an `href` prop to the course entry in `app/courses/page.tsx`:

```ts
{
  name: "Course Name",
  description: "...",
  category: "Wellness",
  href: "/course-file-name.html",
}
```

CourseCard automatically wraps in a `<Link>` when `href` is provided.
