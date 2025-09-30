"use client";

import React from "react";
import { motion } from "framer-motion";
import IconLazyLoader from "./IconLazyLoader";

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+6281234567890";
  const whatsappHref = formatWhatsAppUrl(phone, "Halo Zhkitchen, saya ingin bertanya...");

  return (
    <footer className="mt-12 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3">
            <img src="/images/hero.jpg" alt="Zhkitchen" width={40} height={40} className="rounded-md object-cover" />
            <div>
              <div className="font-semibold">Zhkitchen</div>
              <div className="text-sm text-gray-500">Masakan Rumahan</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-3">© {new Date().getFullYear()} Zhkitchen. Semua hak cipta dilindungi.</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <nav aria-label="footer">
            <a href="#" className="text-sm text-gray-700 hover:text-primary mr-4">Menu</a>
            <a href="#" className="text-sm text-gray-700 hover:text-primary mr-4">FAQ</a>
            <a href="#" className="text-sm text-gray-700 hover:text-primary">Kebijakan</a>
          </nav>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi via WhatsApp"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md text-sm"
          >
            <IconLazyLoader name="whatsapp" />
            Hubungi
          </a>
        </div>
      </motion.div>
    </footer>
  );
}

function formatWhatsAppUrl(phone: string, text: string) {
  const normalized = phone.replace(/\D/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}
