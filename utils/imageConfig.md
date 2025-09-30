next/image usage tips:

- sizes attribute for responsive images:
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

- quality: use 80 for a good balance.

- priority: set for hero images only.

- placeholder: use 'blur' with generated blurDataURL for local images if desired.

- Next's automatic optimization will generate AVIF/WebP sizes if enabled in next.config.js.

- Always host images under /public/images for easy local serving.
