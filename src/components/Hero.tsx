"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, BellRing, Lock, MapPin } from "lucide-react";
import { X_URL } from "./links";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-56 w-56 rounded-full border border-primary/30 animate-pulse" />
    </div>
  ),
});

const fade = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: [0.2, 0.7, 0.2, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 text-center lg:text-left">
          <motion.div {...fade(0)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 py-1.5 pl-2 pr-4 font-mono text-xs uppercase tracking-[0.14em] text-primary">
            <span className="rounded-full bg-primary px-2 py-0.5 font-semibold text-ink">Soon</span>
            <span className="hidden sm:inline">Pro launching · </span>7-day free trial
          </motion.div>

          <motion.h1 {...fade(0.08)} className="font-display text-[2.7rem] font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-[5.4rem]">
            Lost your phone?
            <br />
            <span className="text-primary text-glow">Tap your wrist.</span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-lg lg:mx-0">
            Watch Lock &amp; Find turns your Galaxy Watch into a remote for your Android phone. Ring it on silent, lock it in a cafe, or pull its GPS location to your wrist in one tap. No laptop, no login, no 2FA.
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-ink shadow-[0_0_50px_-12px_#6cff5b] transition hover:brightness-110 sm:w-auto"
            >
              Get launch updates
              <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 px-7 py-4 font-medium text-foreground/85 transition hover:border-white/30 hover:text-foreground sm:w-auto"
            >
              Try the live demo
            </a>
          </motion.div>

          <motion.ul {...fade(0.32)} className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground/50 lg:justify-start">
            <li className="flex items-center gap-2"><BellRing size={14} className="text-primary" /> Rings on silent</li>
            <li className="flex items-center gap-2"><Lock size={14} className="text-primary" /> Locks instantly</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> GPS to wrist</li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="relative h-[420px] sm:h-[540px] lg:h-[640px]"
        >
          <Scene3D />
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/35">
            Move your cursor
          </div>
        </motion.div>
      </div>
    </section>
  );
}
