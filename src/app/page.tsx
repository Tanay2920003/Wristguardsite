import Image from "next/image";
import {
  ArrowRight,
  BatteryMedium,
  BellRing,
  Check,
  Fingerprint,
  LayoutGrid,
  Lock,
  MapPin,
  Minus,
  ServerOff,
  Siren,
  Zap,
} from "lucide-react";
import Hero from "@/components/Hero";
import Demo from "@/components/Demo";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { PLAY_URL, PRIVACY_URL, X_URL } from "@/components/links";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-4xl font-extrabold leading-[1] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{children}</h2>;
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/8 bg-ink/70 py-2 pl-2 pr-2 backdrop-blur-xl sm:pl-3">
        <a href="#" className="flex items-center gap-2.5">
          <Image src="/icon-256.png" alt="" width={36} height={36} className="rounded-xl" priority />
          <span className="font-display text-[15px] font-bold tracking-tight">Watch Lock &amp; Find</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-foreground/60 md:flex">
          <a href="#demo" className="transition hover:text-foreground">Demo</a>
          <a href="#features" className="transition hover:text-foreground">Features</a>
          <a href="#pricing" className="transition hover:text-foreground">Pricing</a>
          <a href="#faq" className="transition hover:text-foreground">FAQ</a>
        </div>
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          Launching soon
        </a>
      </nav>
    </header>
  );
}

const WATCHES = ["Galaxy Watch Ultra", "Galaxy Watch 7", "Galaxy Watch 6", "Galaxy Watch 5", "Galaxy Watch 4", "Pixel Watch 3", "Pixel Watch 2", "TicWatch Pro 5", "Fossil Gen 6", "Any Wear OS 3+"];

function Marquee() {
  return (
    <div className="relative mt-10 overflow-hidden border-y border-white/8 py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee flex w-max gap-12 font-mono text-sm uppercase tracking-[0.16em] text-foreground/40">
        {[...WATCHES, ...WATCHES].map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w} <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  const steps = ["Find another device", "Open a browser", "Sign in to Google", "Pass 2FA… on the phone you lost", "Hope it's still nearby"];
  return (
    <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <H2>
            &ldquo;It was <span className="text-foreground/40">just here</span> a minute ago.&rdquo;
          </H2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground/60">
            The usual way to find a lost phone takes five steps and a second device, while the panic gets worse.
          </p>
          <ol className="mt-8 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-4 text-foreground/45">
                <span className="font-mono text-xs text-foreground/30">0{i + 1}</span>
                <span className="line-through decoration-danger/70 decoration-2">{s}</span>
              </li>
            ))}
            <li className="flex items-center gap-4 pt-2 text-lg font-semibold text-primary">
              <span className="font-mono text-xs">→</span> Or: one tap on your watch.
            </li>
          </ol>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-md rotate-[1.5deg] rounded-[2rem] bg-white p-6 shadow-[0_40px_120px_-30px_rgba(108,255,91,0.35)]">
            <Image src="/cartoon.webp" alt="Cartoon of someone tearing apart a sofa looking for their phone" width={800} height={800} className="h-auto w-full" />
            <div className="absolute -bottom-5 -left-4 rotate-[-4deg] rounded-full bg-primary px-5 py-2.5 font-display text-sm font-bold text-ink shadow-xl">
              Don&apos;t panic. Just tap. ⌚
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: BellRing, title: "Ring, even on silent", desc: "A loud alarm that overrides silent and DND. Ends the couch search in seconds.", span: "lg:col-span-2", big: true },
  { icon: Lock, title: "Instant remote lock", desc: "Lock the screen from your wrist before anyone can open it.", span: "" },
  { icon: MapPin, title: "GPS to your wrist", desc: "The phone pushes its latest coordinates straight to your watch.", span: "" },
  { icon: Siren, title: "SOS mode", desc: "Lock, ring and locate at once with one big button.", span: "" },
  { icon: LayoutGrid, title: "Quick-access tile", desc: "Swipe right on the watch face and fire a command without opening the app.", span: "" },
  { icon: Fingerprint, title: "Biometric gate", desc: "The phone app sits behind your fingerprint or face unlock.", span: "" },
  { icon: BatteryMedium, title: "Battery on watch", desc: "See your phone's charge level from your wrist.", span: "" },
  { icon: ServerOff, title: "Serverless & private", desc: "Direct Firebase writes, no middleman server. Push-based, so idle battery drain is close to zero.", span: "sm:col-span-2 lg:col-span-4" },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-28 sm:px-6 lg:py-36">
      <Reveal className="mb-14 max-w-2xl">
        <Eyebrow>Features</Eyebrow>
        <H2>Everything your wrist needs to rescue your phone.</H2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.title} delay={i * 0.04} className={f.span}>
              <div className={`panel group relative h-full overflow-hidden rounded-3xl p-7 transition hover:border-primary/30 ${f.big ? "lg:p-9" : ""}`}>
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/0 blur-3xl transition group-hover:bg-primary/15" />
                <div className="mb-10 grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className={`font-display font-bold tracking-tight ${f.big ? "text-3xl" : "text-xl"}`}>{f.title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/55">{f.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

const ROWS: [string, boolean][] = [
  ["Ring phone from watch", true],
  ["Instant screen lock", false],
  ["Force a GPS location push", false],
  ["SOS: lock + ring + locate", false],
  ["Quick-access watch tile", false],
  ["Biometric app protection", false],
];

function Compare() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-28 sm:px-6">
      <Reveal className="mb-12 text-center">
        <Eyebrow>Why switch</Eyebrow>
        <H2>More than the default Find&nbsp;My.</H2>
      </Reveal>
      <Reveal>
        <div className="panel overflow-hidden rounded-3xl">
          <div className="grid grid-cols-[1fr_80px_80px] items-center border-b border-white/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/45 sm:grid-cols-[1fr_140px_140px] sm:px-8">
            <span>Feature</span>
            <span className="text-center">Default</span>
            <span className="text-center text-primary">Ours</span>
          </div>
          {ROWS.map(([label, def]) => (
            <div key={label} className="grid grid-cols-[1fr_80px_80px] items-center border-b border-white/5 px-5 py-4 last:border-0 sm:grid-cols-[1fr_140px_140px] sm:px-8">
              <span className="text-sm sm:text-base">{label}</span>
              <span className="flex justify-center text-foreground/30">{def ? <Check size={18} /> : <Minus size={18} />}</span>
              <span className="flex justify-center">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-ink"><Check size={15} strokeWidth={3} /></span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-28 sm:px-6 lg:py-36">
      <Reveal className="mb-14 text-center">
        <Eyebrow>Pricing</Eyebrow>
        <H2>Start free. Go Pro when it lands.</H2>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="panel flex h-full flex-col rounded-[2rem] p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground/50">Free</p>
            <p className="mt-4 font-display text-6xl font-extrabold tracking-tight">₹0</p>
            <p className="mt-2 text-foreground/55">The two rescue buttons you need most.</p>
            <ul className="mt-8 space-y-3.5">
              {["Ring phone, even on silent", "Instant remote lock", "Quick-access watch tile", "Biometric app lock"].map((x) => (
                <li key={x} className="flex items-center gap-3"><Check size={18} className="text-primary" /> {x}</li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold transition hover:border-white/40">
                Early access on Google Play <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/40 bg-gradient-to-b from-primary/[0.13] to-primary/[0.02] p-8 sm:p-10">
            <div className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">Launching soon</div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Pro</p>
            <p className="mt-4 font-display text-6xl font-extrabold tracking-tight">
              ₹90<span className="text-2xl font-bold text-foreground/50">/month</span>
            </p>
            <p className="mt-2 text-foreground/65">7-day free trial. Save more with the yearly plan.</p>
            <ul className="mt-8 space-y-3.5">
              {["Everything in Free", "GPS locate to your wrist", "SOS mode: lock + ring + locate", "Phone battery on your watch", "Long-range commands over Wi-Fi / LTE"].map((x) => (
                <li key={x} className="flex items-center gap-3"><Check size={18} className="text-primary" /> {x}</li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-ink shadow-[0_0_40px_-10px_#6cff5b] transition hover:brightness-110">
                Notify me at launch <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const SPECS = [
  { t: "Phone", items: ["Android 8.0+ (API 26), targets Android 15", "Fingerprint, face or PIN", "GPS for Locate & SOS", "Device Admin permission for Lock"] },
  { t: "Watch", items: ["Wear OS 3.0+, targets Wear OS 5", "Galaxy Watch 4–7 & Ultra, Pixel Watch 1–3", "Round & square faces", "Bluetooth 4.2+, Wi-Fi or LTE for long range"] },
  { t: "Account", items: ["Google Play Services on both devices", "Same Google account on phone and watch", "Install on phone, auto-syncs to watch", "Bluetooth for nearby, cloud for far away"] },
];

function Compatibility() {
  return (
    <section id="compatibility" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-28 sm:px-6">
      <Reveal className="mb-12 max-w-2xl">
        <Eyebrow>Compatibility</Eyebrow>
        <H2>Works with your gear.</H2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {SPECS.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.06}>
            <div className="panel h-full rounded-3xl p-7">
              <p className="mb-6 font-display text-xl font-bold">{s.t}</p>
              <ul className="space-y-3 text-sm text-foreground/60">
                {s.items.map((x) => (
                  <li key={x} className="flex gap-3"><Zap size={14} className="mt-1 shrink-0 text-primary" /> {x}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 pb-24 pt-10 sm:px-6">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-primary/25 bg-panel px-6 py-20 text-center sm:py-28">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
          <div className="pointer-events-none absolute left-1/2 top-full h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]" />
          <div className="relative">
            <Image src="/icon-256.png" alt="Watch Lock & Find app icon" width={88} height={88} className="mx-auto mb-8 rounded-[1.6rem] shadow-[0_0_60px_-10px_#6cff5b]" />
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-[1] tracking-[-0.03em] sm:text-6xl">
              Never search the couch <span className="text-primary">again.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-foreground/60">
              Pro is launching soon with a 7-day free trial. Follow along to get it first.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-ink transition hover:brightness-110 sm:w-auto">
                Follow @Tan_appdevelope <ArrowRight size={18} />
              </a>
              <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-medium transition hover:border-white/40 sm:w-auto">
                Early access on Google Play
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm text-foreground/45 sm:flex-row">
        <p>© {new Date().getFullYear()} Watch Lock &amp; Find · Built by an indie dev in India</p>
        <div className="flex gap-6">
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Privacy</a>
          <a href="#compatibility" className="hover:text-foreground">Compatibility</a>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">X / Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-hidden">
        <Hero />
        <Marquee />
        <Problem />
        <section id="demo" className="relative scroll-mt-24 border-y border-white/8 bg-panel/60 px-4 py-28 sm:px-6 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-16 text-center">
              <Eyebrow>Live demo</Eyebrow>
              <H2>Tap the watch. Watch the phone.</H2>
              <p className="mx-auto mt-5 max-w-xl text-foreground/55">This is the real command flow, simulated in your browser. Pick a button on the watch.</p>
            </Reveal>
            <Demo />
          </div>
        </section>
        <Features />
        <Compare />
        <Pricing />
        <Compatibility />
        <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-28 sm:px-6">
          <Reveal className="mb-12">
            <Eyebrow>FAQ</Eyebrow>
            <H2>Questions, answered.</H2>
          </Reveal>
          <Faq />
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
