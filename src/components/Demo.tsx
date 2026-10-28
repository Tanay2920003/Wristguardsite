"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BellRing, Fingerprint, Lock, MapPin, Siren, Watch } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Cmd = "ring" | "lock" | "locate" | "sos";
type State = "idle" | Cmd;

const CMDS: { id: Cmd; label: string; icon: typeof BellRing; tone: string }[] = [
  { id: "ring", label: "Ring", icon: BellRing, tone: "bg-primary text-ink" },
  { id: "lock", label: "Lock", icon: Lock, tone: "bg-white text-ink" },
  { id: "locate", label: "Locate", icon: MapPin, tone: "bg-accent text-ink" },
  { id: "sos", label: "SOS", icon: Siren, tone: "bg-danger text-white" },
];

const LOG: Record<Cmd, string[]> = {
  ring: ["watch → cmd RING", "fcm push delivered", "phone: silent mode overridden", "phone: alarm playing 🔊"],
  lock: ["watch → cmd LOCK", "fcm push delivered", "phone: device admin lockNow()", "phone: screen locked 🔒"],
  locate: ["watch → cmd LOCATE", "fcm push delivered", "phone: GPS fix ±6 m", "watch ← 28.6139° N, 77.2090° E 📍"],
  sos: ["watch → cmd SOS", "phone: screen locked 🔒", "phone: alarm playing 🔊", "watch ← location received 📍"],
};

function stamp() {
  const d = new Date();
  return `${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}.${String(d.getMilliseconds()).padStart(3, "0").slice(0, 2)}`;
}

export default function Demo() {
  const [state, setState] = useState<State>("idle");
  const [log, setLog] = useState<{ t: string; m: string; k: number }[]>([
    { t: "--:--.--", m: "paired · Galaxy Watch ↔ Pixel 8", k: 0 },
  ]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const key = useRef(1);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function fire(cmd: Cmd) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState(cmd);
    LOG[cmd].forEach((m, i) => {
      timers.current.push(
        setTimeout(() => setLog((l) => [...l.slice(-6), { t: stamp(), m, k: key.current++ }]), i * 220),
      );
    });
    timers.current.push(setTimeout(() => setState("idle"), 4200));
  }

  const ringing = state === "ring" || state === "sos";
  const locked = state === "lock" || state === "sos";
  const located = state === "locate" || state === "sos";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
      {/* WATCH */}
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]" />
          <div className="relative grid h-[272px] w-[272px] place-items-center rounded-full border-[10px] border-zinc-950 bg-black">
            <div className="pointer-events-none absolute inset-3 rounded-full border border-white/5" />
            <p className="pointer-events-none absolute top-8 font-mono text-[11px] tracking-[0.18em] text-foreground/45">
              {state === "idle" ? "TAP A COMMAND" : `${state.toUpperCase()} SENT`}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {CMDS.map(({ id, label, icon: Icon, tone }) => (
                <button
                  key={id}
                  onClick={() => fire(id)}
                  aria-label={`${label} phone`}
                  className={`flex h-[76px] w-[76px] flex-col items-center justify-center gap-1 rounded-full text-[11px] font-bold transition active:scale-90 ${
                    state === id ? `${tone} shadow-[0_0_30px_-4px_currentColor]` : "bg-white/[0.07] text-foreground/85 hover:bg-white/[0.13]"
                  }`}
                >
                  <Icon size={22} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-foreground/45">
          <Watch size={14} /> Your watch
        </p>
      </div>

      {/* LINK */}
      <div className="hidden h-px w-24 items-center lg:flex">
        <div className="relative h-px w-full bg-white/10">
          <AnimatePresence>
            {state !== "idle" && (
              <motion.span
                key={state + log.length}
                initial={{ left: "0%", opacity: 1 }}
                animate={{ left: "100%", opacity: 0.4 }}
                transition={{ duration: 0.45, ease: "easeIn" }}
                className="absolute -top-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_#6cff5b]"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* PHONE */}
      <div className="flex flex-col items-center gap-5">
        <div className={`relative h-[400px] w-[200px] rounded-[2.4rem] border-[7px] border-zinc-800 bg-zinc-950 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.9)] ${ringing ? "animate-shake" : ""}`}>
          <div className="absolute left-1/2 top-2.5 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-black" />
          <div className="relative h-full w-full overflow-hidden rounded-[1.9rem]">
            <div className="flex justify-between px-5 pt-3 text-[10px] font-medium text-foreground/60">
              <span>10:09</span>
              <span>82%</span>
            </div>

            {located && (
              <div className="absolute inset-0 grid-bg opacity-60" />
            )}
            {located && (
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 400" aria-hidden>
                <path d="M-10 300 Q 90 210 220 120" stroke="rgba(255,255,255,0.14)" strokeWidth="14" fill="none" />
                <path d="M40 -10 L 120 420" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
              </svg>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4 text-center">
              <div className="relative grid h-24 w-24 place-items-center">
                {ringing && (
                  <>
                    <span className="absolute inset-0 rounded-full border-2 border-primary animate-ripple" />
                    <span className="absolute inset-0 rounded-full border-2 border-primary animate-ripple [animation-delay:0.5s]" />
                  </>
                )}
                <motion.div
                  key={state}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`grid h-20 w-20 place-items-center rounded-full ${
                    state === "idle" ? "bg-white/[0.06] text-foreground/40" : state === "sos" ? "bg-danger text-white" : "bg-primary text-ink"
                  }`}
                >
                  {state === "idle" && <Fingerprint size={34} />}
                  {state === "ring" && <BellRing size={34} />}
                  {state === "lock" && <Lock size={34} />}
                  {state === "locate" && <MapPin size={34} />}
                  {state === "sos" && <Siren size={34} />}
                </motion.div>
              </div>
              <div>
                <p className="font-display text-xl font-bold">
                  {{ idle: "Phone idle", ring: "Ringing", lock: "Locked", locate: "Location sent", sos: "SOS active" }[state]}
                </p>
                <p className="mt-1 text-xs text-foreground/50">
                  {{
                    idle: "Waiting for your watch",
                    ring: "Loud alarm, even on silent",
                    lock: "Fingerprint needed to open",
                    locate: "Coordinates pushed to watch",
                    sos: "Locked · ringing · located",
                  }[state]}
                </p>
              </div>
            </div>
            {locked && <div className="absolute inset-x-0 bottom-0 h-1 bg-primary" />}
          </div>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/45">Your phone</p>
      </div>

      {/* LOG */}
      <div className="lg:col-span-3">
        <div className="panel mx-auto max-w-2xl rounded-2xl p-4 font-mono text-xs sm:text-[13px]">
          <div className="mb-3 flex items-center gap-2 text-foreground/40">
            <span className="h-2 w-2 rounded-full bg-primary" /> live event log
          </div>
          <ul className="space-y-1.5" aria-live="polite">
            {log.map((l) => (
              <motion.li key={l.k} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
                <span className="shrink-0 text-foreground/30">{l.t}</span>
                <span className="text-foreground/80">{l.m}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
