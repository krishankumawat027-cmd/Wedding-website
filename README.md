# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Wedding invitation placeholders

- Replace the illustrative gallery images in `src/assets/` and update the `gallery` array in `src/routes/index.tsx` with real, consented photos.
- Replace the sample audio at `public/music/wedding.mp3` with your own licensed wedding music; keep the filename or update the audio source in `src/routes/index.tsx`.
- Update the exact venue and address in the venue section once confirmed. The current map link points only to Shrimadhopur.
- Wedding Blessings is a preview-only interaction. Blessings are not delivered or saved; connect a backend before sharing the site as a live wishes collection tool.
- The venue QR code lives at public/images/location-qr.png, copied unmodified. Set VENUE_MAP_URL in src/routes/index.tsx to change where Get Directions points.

## Venue QR code

- The uploaded venue QR image goes at `public/images/location-qr.png`, copied unmodified (no cropping, resizing or recoloring) — it then appears automatically in the Venue section. Until then a "QR code coming soon" placeholder shows.
- Set `VENUE_MAP_URL` near the top of `src/routes/index.tsx` to the real Google Maps link (e.g. the QR code destination) to enable the "Get Directions" button; until then it stays disabled.
