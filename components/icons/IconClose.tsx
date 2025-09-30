"use client";

import React from "react";

type Props = { size?: number; className?: string; title?: string };

export default function IconClose({ size = 20, className = "", title }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? "img" : "presentation"} aria-label={title}>
      {title ? <title>{title}</title> : null}
      <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
