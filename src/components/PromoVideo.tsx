"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function PromoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  }

  return (
    <div className="relative mx-auto w-[260px] sm:w-[300px]">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-primary/20 blur-[90px]" />
      <div className="relative rounded-[2.6rem] border-[8px] border-zinc-800 bg-black shadow-[0_50px_120px_-30px_rgba(108,255,91,0.35)]">
        <div className="absolute left-1/2 top-2.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-black" />
        <video
          ref={ref}
          className="aspect-[9/16] w-full rounded-[2rem] object-cover"
          src="/wristguard-promo.mp4"
          poster="/demo-poster.webp"
          muted
          loop
          playsInline
          preload="none"
          controls={false}
          aria-label="WristGuard feature walkthrough video"
        />
        <button
          onClick={toggle}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-primary hover:text-ink"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
