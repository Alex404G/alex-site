"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquarePlus } from "lucide-react";
import { useContactModal } from "./contact-modal";

export function StickyCta() {
  const { open } = useContactModal();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [600, 800], [0, 1]);
  const y = useTransform(scrollY, [600, 800], [16, 0]);

  return (
    <motion.button
      style={{ opacity, y }}
      onClick={open}
      aria-label="Ouvrir le formulaire de contact"
      className="group fixed bottom-6 right-6 z-40 hidden cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-medium md:inline-flex"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: "var(--grad-signature)",
          opacity: 0.85,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-xl"
        style={{ mixBlendMode: "overlay" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "0 20px 60px -15px rgba(184,69,232,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      />
      <MessageSquarePlus className="relative h-4 w-4 text-white" strokeWidth={2} />
      <span className="relative text-white">Contact</span>
    </motion.button>
  );
}
