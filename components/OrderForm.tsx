"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "../types/product";
import { formatCurrency } from "../utils/currency";
import { formatWhatsAppUrl, buildOrderMessage } from "../utils/whatsapp";
import useGsapScroll from "../hooks/useGsapScroll";

type OrderItem = {
  id: string;
  qty: number;
  size?: string;
  note?: string;
};

type Props = {
  products: Product[];
  whatsappNumber: string;
};

export default function OrderForm({ products, whatsappNumber }: Props) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement | null>(null);

  useGsapScroll(ref, { stagger: 0.05 });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("zhkitchen_cart_v1");
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("zhkitchen_cart_v1", JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string, size?: string, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === productId && p.size === size);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += qty;
        return copy;
      }
      return [...prev, { id: productId, qty, size }];
    });
  };

  const removeItem = (productId: string, size?: string) => {
    setItems((prev) => prev.filter((p) => !(p.id === productId && p.size === size)));
  };

  const updateQty = (productId: string, size: string | undefined, qty: number) => {
    setItems((prev) =>
      prev.map((p) => (p.id === productId && p.size === size ? { ...p, qty: Math.max(1, qty) } : p))
    );
  };

  const orderSummary = useMemo(() => {
    return items.map((it) => {
      const prod = products.find((p) => p.id === it.id)!;
      return {
        ...it,
        name: prod.name,
        price: prod.price,
        total: prod.price * it.qty
      };
    });
  }, [items, products]);

  const total = useMemo(() => orderSummary.reduce((s, i) => s + i.total, 0), [orderSummary]);

  function validate() {
    if (items.length === 0) {
      setError("Pilih setidaknya satu item sebelum memesan.");
      return false;
    }
    if (!name.trim()) {
      setError("Mohon isi nama Anda.");
      return false;
    }
    if (!address.trim()) {
      setError("Mohon isi alamat pengiriman.");
      return false;
    }
    setError(null);
    return true;
  }

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    const message = buildOrderMessage(orderSummary, total, name, address);
    const href = formatWhatsAppUrl(whatsappNumber || "+6281234567890", message);
    window.open(href, "_blank");
  };

  return (
    <div ref={ref}>
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-md p-4"
      >
        <h2 className="text-lg font-semibold mb-2">Formulir Pesanan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm">Nama</label>
            <input
              className="w-full mt-1 p-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Nama"
              required
            />
          </div>

          <div>
            <label className="text-sm">Alamat</label>
            <input
              className="w-full mt-1 p-2 border rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-label="Alamat"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Ringkasan Pesanan</h3>
          <div className="mt-2 space-y-2">
            {orderSummary.length === 0 ? (
              <div className="text-sm text-gray-500">Belum ada item yang ditambahkan.</div>
            ) : (
              orderSummary.map((it) => (
                <div key={`${it.id}-${it.size ?? "none"}`} className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{it.name} {it.size ? `(${it.size})` : ""}</div>
                    <div className="text-sm text-gray-500">Rp {it.price.toLocaleString("id-ID")}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQty(it.id, it.size, it.qty - 1)}
                      aria-label="Kurangi jumlah"
                      className="px-2 py-1 bg-gray-100 rounded"
                    >
                      -
                    </button>
                    <div className="px-3">{it.qty}</div>
                    <button
                      type="button"
                      onClick={() => updateQty(it.id, it.size, it.qty + 1)}
                      aria-label="Tambah jumlah"
                      className="px-2 py-1 bg-gray-100 rounded"
                    >
                      +
                    </button>
                    <div className="w-28 text-right font-medium">{formatCurrency(it.total)}</div>
                    <button
                      onClick={() => removeItem(it.id, it.size)}
                      type="button"
                      aria-label="Hapus"
                      className="ml-2 text-sm text-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-xl font-semibold">{formatCurrency(total)}</div>
          </div>

          <div className="flex flex-col items-end">
            {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onSubmit}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Pesan via WhatsApp
            </motion.button>
          </div>
        </div>
      </motion.form>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Tambah Item</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between border p-2 rounded">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{formatCurrency(p.price)}</div>
              </div>
              <div>
                <button
                  onClick={() => addItem(p.id, p.sizes?.[0], 1)}
                  className="bg-primary text-white px-3 py-1 rounded"
                  aria-label={`Tambah ${p.name}`}
                >
                  Tambah
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
