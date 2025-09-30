"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import productsData from "../data/products.json";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "main" | "side" | "drink";
  image: string;
  sizes?: string[];
};

const OrderForm = dynamic(() => import("../components/OrderForm"), {
  ssr: false,
  loading: () => <div className="py-6 text-center text-sm text-gray-500">Memuat formulir pesanan...</div>
});

export default function Page() {
  const products: Product[] = productsData as Product[];
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div>
      <section className="mb-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Hero Zhkitchen"
            className="w-full h-64 object-cover rounded-md"
            loading="lazy"
          />
        </div>
      </section>

      <CategoryFilter categories={categories} selected={selectedCategory} onChange={(c) => setSelectedCategory(c)} />

      <section className="mt-6">
        <ProductGrid products={filteredProducts} />
      </section>

      <section className="mt-10">
        <OrderForm products={products} whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""} />
      </section>
    </div>
  );
}
