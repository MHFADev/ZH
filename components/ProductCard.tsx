"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "../types/product";
import { formatCurrency } from "../utils/currency";

type Props = {
  product: Product;
  onAdd?: (orderItem: { id: string; name: string; price: number; qty: number; size?: string }) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
      className="bg-white border border-gray-100 rounded-md p-3 flex flex-col"
    >
      <motion.div whileHover={{ scale: 1.02 }} className="rounded-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={1200}
          height={800}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={80}
          className="w-full h-44 object-cover rounded-md"
        />
      </motion.div>

      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-base">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm font-medium">{formatCurrency(product.price)}</div>
        <div>
          <button
            className="ml-3 inline-flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-md text-sm"
            aria-label={`Tambah ${product.name}`}
            onClick={() =>
              onAdd?.({
                id: product.id,
                name: product.name,
                price: product.price,
                qty: 1,
                size: product.sizes?.[0]
              })
            }
          >
            Tambah
          </button>
        </div>
      </div>
    </motion.article>
  );
}
