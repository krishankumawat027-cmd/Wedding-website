Wedding Invitation Website

A beautiful digital wedding invitation website for Khushboo & Shekhar.

Wedding Details

- Bride: Khushboo
- Groom: Shekhar
- Location: Shrimadhopur, Sikar, Rajasthan

Development

npm install
npm run dev

Built With

- TanStack Start
- TypeScript
- React
- Tailwind CSS

Wedding Gallery

Replace the sample gallery images in:

src/assets/

with real, consented wedding photos.

Update the gallery array in:

src/routes/index.tsx

when adding or removing photos.

Wedding Music

Replace:

public/music/wedding.mp3

with the desired licensed wedding music.

Keep the same filename, or update the audio source in:

src/routes/index.tsx

Venue & Location

Update the confirmed venue name and complete address in the venue section.

Set the Google Maps destination in:

src/routes/index.tsx

using:

VENUE_MAP_URL

The Get Directions button will use this link.

Location QR Code

Place the venue QR code at:

public/images/location-qr.png

The QR code will automatically appear in the Venue section.

Wedding Events

Update the wedding events, dates, timings and venue details in:

src/routes/index.tsx

Current events include:

- Lagan Tika
- Haldi
- Mehndi
- Sangeet

Wedding Blessings

The Wedding Blessings section is currently a preview interaction.

To save and display real guest blessings, connect a backend/database and store the submitted messages securely.

Customization

All major wedding content can be updated from:

src/routes/index.tsx

including:

- Couple names
- Wedding dates
- Event details
- Venue
- Google Maps link
- Gallery
- Music
- Wedding messages
- Other invitation content
