"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import IconLazyLoader from "./IconLazyLoader";

const IconMenu = dynamic(() => import("./icons/IconMenu"), { ssr: false });
const IconClose = dynamic(() => import("./icons/IconClose"), { ssr: false });

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="container mx-auto px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/hero.jpg" alt="Zhkitchen logo" width={48} height={48} className="rounded-md object-cover" priority />
            <span className="font-semibold text-lg">Zhkitchen</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4" aria-label="Primary">
          <Link href="#" className="text-sm text-gray-700 hover:text-primary">Menu</Link>
          <Link href="#" className="text-sm text-gray-700 hover:text-primary">Tentang</Link>
          <Link href="#" className="text-sm text-gray-700 hover:text-primary">Kontak</Link>
          <a
            href={formatWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-md text-sm"
            aria-label="Chat via WhatsApp"
          >
            <IconLazyLoader name="whatsapp" />
            Pesan
          </a>
        </nav>

        <div className="md:hidden">
          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </motion.div>

      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden border-t border-gray-100 bg-white"
        >
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link href="#" className="py-2 text-gray-700">Menu</Link>
            <Link href="#" className="py-2 text-gray-700">Tentang</Link>
            <Link href="#" className="py-2 text-gray-700">Kontak</Link>
            <a
              href={formatWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-md text-sm"
            >
              <IconLazyLoader name="whatsapp" />
              Pesan via WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function formatWhatsAppHref() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+6281234567890";
  const text = encodeURIComponent("Halo, saya ingin memesan dari Zhkitchen.");
  // normalize phone: remove non-digits and leading +
  const normalized = phone.replace(/\D/g, "");
  return `https://wa.me/${normalized}?text=${text}`;
}
