"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

const QA = [
  {
    q: "When does Pro launch?",
    a: "Soon. Pro will start with a 7-day free trial, so you can try Locate, SOS and the rest before paying anything. Follow on X to hear the moment it goes live.",
  },
  {
    q: "Does it work when the phone is switched off?",
    a: "No app can reach a phone that is fully powered off. Remote Lock helps here: the phone locks behind your fingerprint, so a thief can't easily pull down quick settings to kill Wi-Fi or data and buy themselves time.",
  },
  {
    q: "Will it drain my battery?",
    a: "No. Both apps sleep until a Firebase Cloud Messaging push wakes them. There is no background polling, so idle drain is close to zero on the phone and the watch.",
  },
  {
    q: "Which watches are supported?",
    a: "Any Wear OS 3+ watch: Galaxy Watch 4, 5, 6, 7 and Ultra, Pixel Watch 1–3, TicWatch Pro 3/5, Fossil Gen 6 and more. Apple Watch is not supported.",
  },
  {
    q: "Does it need the phone nearby?",
    a: "Ring works over Bluetooth when you're close. Lock, Locate and SOS also work at long range when both devices are on Wi-Fi or mobile data.",
  },
  {
    q: "Is my data private?",
    a: "Commands travel through your own Google-secured Firebase path. There is no middle server reading your location, and the phone app sits behind a biometric lock.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/8 border-y border-white/8">
      {QA.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-lg font-bold sm:text-xl">{item.q}</span>
              <Plus size={20} className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <p className="overflow-hidden pr-10 leading-relaxed text-foreground/60">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
