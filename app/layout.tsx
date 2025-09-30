"use client";

import React, { PropsWithChildren } from "react";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="id">
      <head />
      <body className={`${inter.variable} min-h-screen bg-white text-gray-900 antialiased`}>
        <Header />
        <main id="main" className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
