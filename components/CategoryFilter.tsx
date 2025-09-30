"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
};

export default function CategoryFilter({ categories, selected, onChange }: Props) {
  const list = ["all", ...categories];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 items-center">
        {list.map((cat) => {
          const isActive = selected === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => onChange(cat)}
              whileHover={{ scale: 1.03 }}
              className={`px-3 py-1.5 rounded-full text-sm focus:outline-none transition-colors ${
                isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
              }`}
              aria-pressed={isActive}
            >
              {cat === "all" ? "Semua" : capitalize(cat)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
