"use client";

import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type Props = PropsWithChildren<{
  maxWidth?: string;
}>;

export default function Layout({ children, maxWidth = "max-w-3xl" }: Props) {
  return (
    <div className={`mx-auto ${maxWidth} px-4`}>
      <motion.div initial="hidden" animate="visible" variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } }
      }}>
        {children}
      </motion.div>
    </div>
  );
}
