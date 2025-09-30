Vercel Deployment Checklist

1) Environment variables
   - Set NEXT_PUBLIC_WHATSAPP_NUMBER in Project Settings on Vercel.
   - Optionally set NEXT_PUBLIC_SITE_TITLE and NEXT_PUBLIC_DEFAULT_CURRENCY.

2) Build configuration
   - Build Command: npm run build
   - Output Directory: (leave empty or default for Next.js)

3) Framework detection
   - Vercel auto-detects Next.js from package.json.

4) vercel.json
   - Included in project to help routing and env exposure during build.

5) Image assets
   - Put images in public/images/ with the recommended filenames:
     hero.jpg, product-ayam-bumbu.jpg, product-sop-ikan.jpg, product-nasi-goreng.jpg, product-kerupuk.jpg, product-es-teh.jpg

6) Test locally
   - npm run dev (port 3000)
   - npm run build && npm run start to validate production build

7) Troubleshooting
   - 404 images -> ensure images exist under public/images.
   - GSAP registration issues -> ensure useGsapScroll imports correctly; rebuild.

8) Optimization tips
   - Dynamic import heavy components (OrderForm, ProductCard).
   - Only mark components "use client" when necessary.
