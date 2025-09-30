"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { Product as ProductType } from "../types/product";

const ProductCard = dynamic(() => import("./ProductCard"), { ssr: false });

type Props = {
  products: ProductType[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </motion.div>
  );
}
