"use client";

import React from "react";
import dynamic from "next/dynamic";

type Props = {
  name: "whatsapp" | "cart" | "menu" | "close";
  size?: number;
  className?: string;
};

export default function IconLazyLoader({ name, size = 20, className = "" }: Props) {
  const map: Record<string, any> = {
    whatsapp: dynamic(() => import("./icons/IconWhatsapp"), { ssr: false }),
    cart: dynamic(() => import("./icons/IconCart"), { ssr: false }),
    menu: dynamic(() => import("./icons/IconMenu"), { ssr: false }),
    close: dynamic(() => import("./icons/IconClose"), { ssr: false })
  };

  const Comp = map[name];
  return <Comp size={size} className={className} />;
}
