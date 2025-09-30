# Zhkitchen (Next.js App Router) - Ready for Vercel

Project: Zhkitchen - Masakan Rumahan  
Framework: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP

This repository is prepared to be deployed to Vercel with minimal setup. It uses static JSON product data and client-side ordering via WhatsApp.

## Features
- Next.js App Router structure (app/)
- Tailwind CSS for styling
- Framer Motion for micro-interactions
- GSAP ScrollTrigger for scroll reveals
- Dynamic imports to reduce initial JS
- WhatsApp ordering integration
- Ready-to-deploy Vercel config (vercel.json)

## Prerequisites
- Node.js 18+ (recommended)
- npm (or pnpm/yarn)
- Vercel account for deployment

## Installation (Local)
1. Clone the repository or copy files into a folder.
2. Install dependencies:
   npm install

3. Copy environment variables:
   cp .env.example .env.local
   Edit .env.local and set NEXT_PUBLIC_WHATSAPP_NUMBER to your WhatsApp number, e.g. +6281234567890

## Run (Development)
npm run dev

Open http://localhost:3000

## Build & Start (Production simulation)
npm run build
npm start

## Environment Variables
- NEXT_PUBLIC_WHATSAPP_NUMBER — required for WhatsApp integrations
- NEXT_PUBLIC_SITE_TITLE — optional
- NEXT_PUBLIC_DEFAULT_CURRENCY — optional (default IDR)

Do not commit private keys or sensitive tokens. Use Vercel Project Settings to set production environment variables.

## Vercel Deployment
1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project into Vercel.
3. Ensure the Build Command is `npm run build`.
4. Configure environment variables in Vercel (NEXT_PUBLIC_WHATSAPP_NUMBER, etc).
5. Deploy.

This repo includes vercel.json to help routing and environment exposure.

## Images
Place recommended images in `public/images/`:
- hero.jpg (2000x1200)
- product-ayam-bumbu.jpg (1200x800)
- product-sop-ikan.jpg
- product-nasi-goreng.jpg
- product-kerupuk.jpg
- product-es-teh.jpg

See README_IMAGES_ADVICE.txt for details.

## Testing
Run Jest tests:
npm test

A basic test is included for ProductCard.

## Accessibility
- Focus outlines and aria attributes added to key interactive elements.
- Forms use labels and semantic HTML.

## Customization
- Colors and tokens: `styles/tokens.css` and `tailwind.config.cjs`.
- Products: `data/products.json`
- Add/remove images in `public/images/`

## WhatsApp Ordering
The OrderForm composes a message using `utils/whatsapp.ts` and opens a wa.me link:
Example:
window.open(formatWhatsAppUrl('+6281234567890', message))

Message template:
Pesanan Zhkitchen:
- 1x Ayam Bumbu (regular): Rp 45.000
Total: Rp 45.000
Nama: Nama Anda
Alamat: Alamat Anda

## Troubleshooting
- Missing images -> add images in public/images
- GSAP issues -> rebuild; GSAP plugin is registered inside the useGsapScroll hook.
- Env vars not set -> Vercel requires setting env vars in Project Settings

## License
MIT (see LICENSE.md)
