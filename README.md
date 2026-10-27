# BLACKOUT website

Live at **https://adamusulaiman-codes.github.io/blackout/**

Static site for **BLACKOUT**, created by **achlys20**.

- `index.html` — landing page
- `play/` — Godot HTML5 build (`index.html` at the root of this folder)
- `downloads/` — macOS and Windows zips
- `assets/` — stills, cover, fonts

## Run locally

```bash
cd "blackout-web"
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## GitHub Pages

The site is built for the repository root:

1. Push to `main`.
2. Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`.
3. `.nojekyll` is included.

The host must serve `.wasm` as `application/wasm` (GitHub Pages does). Browser audio starts after the Play click. On touch devices the game shows twin-stick controls; add `?touch=1` to a direct `play/index.html` URL to preview them on desktop.

## Credits

Created by achlys20. Built with Godot 4.7.1. Fonts: Bebas Neue and IBM Plex Mono under the SIL Open Font License.
