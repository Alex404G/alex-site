"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { MessageSquarePlus } from "lucide-react";
import { useContactModal } from "./contact-modal";

export function StickyCta() {
  const { open } = useContactModal();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [600, 800], [0, 1]);
  const y = useTransform(scrollY, [600, 800], [16, 0]);
  const pathname = usePathname();
  const onAuto = pathname.startsWith("/automatisations");
  const onVisi = pathname.startsWith("/visibilite");

  const grad = onAuto
    ? "var(--grad-signature)"
    : onVisi
      ? "var(--grad-visi)"
      : "var(--grad-warm)";
  const shadow = onAuto
    ? "0 20px 60px -15px rgba(184,69,232,0.6), inset 0 1px 0 rgba(255,255,255,0.2)"
    : onVisi
      ? "0 20px 60px -15px rgba(43,201,138,0.5), inset 0 1px 0 rgba(255,255,255,0.25)"
      : "0 20px 60px -15px rgba(255,122,77,0.55), inset 0 1px 0 rgba(255,255,255,0.25)";
  const ink = onAuto ? "text-white" : "text-void-0";

  return (
    <motion.button
      style={{ opacity, y }}
      onClick={open}
      aria-label="Ouvrir le contact"
      className="group fixed bottom-6 right-6 z-40 hidden cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-medium md:inline-flex"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span aria-hidden className="absolute inset-0 rounded-full" style={{ background: grad }} />
      <span aria-hidden className="absolute inset-0 rounded-full" style={{ boxShadow: shadow }} />
      <MessageSquarePlus className={`relative h-4 w-4 ${ink}`} strokeWidth={2} />
      <span className={`relative ${ink}`}>Contact</span>
    </motion.button>
  );
}
