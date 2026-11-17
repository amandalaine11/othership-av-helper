# Othership AV Tech Helper

A public page for Othership sauna guides at Kent, Flatiron, Yorkville, and Adelaide. No login. Open it from the QR code in the AV cabinet or from an iPad home-screen bookmark.

Pick your ship (it is remembered on that device), type what is happening, and follow the guide steps one at a time. When the guide steps run out, the next fixes need the MOD on duty. The #tech-sos message is ready to copy.

Nothing you type is sent anywhere. The only login on the page is the CTRL Player login for the iPad, which guides need when CTRL Player logs them out.

## Run it locally

```bash
npm install
npm run dev
```

Open http://127.0.0.1:43123/othership-av-helper/ . The app is built for that subpath so GitHub Pages can serve it at https://amandalaine11.github.io/othership-av-helper/ .

`npm test` checks the approved steps and the search. `npm run build` writes a static site to `dist/`. Pushing `main` runs `.github/workflows/pages.yml`, which publishes `dist`.

Brand files: `public/brand/symbol.svg` and `public/brand/wordmark.png`. The symbol is also the favicon and the iPad home-screen icon.
