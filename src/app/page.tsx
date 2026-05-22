"use client";

import { motion } from "framer-motion";
import { 
  Smartphone, 
  Watch, 
  Shield, 
  BellRing, 
  Lock, 
  Moon, 
  Zap, 
  ArrowRight,
  EyeOff,
  ServerOff,
  CheckCircle2,
  Play,
  Activity,
  MapPin,
  Info,
  Wifi,
  X
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  const [demoState, setDemoState] = useState<"idle" | "ringing" | "locked" | "locating">("idle");

  // Reset demo state after a while
  useEffect(() => {
    if (demoState !== "idle") {
      const timer = setTimeout(() => setDemoState("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [demoState]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6">
        {/* Radar Background Animation */}
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center opacity-30 pointer-events-none">
          <div className="absolute w-[800px] h-[800px] rounded-full border border-primary/20 bg-primary/5 animate-pulse-slow"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full border border-primary/30" style={{ animation: "ping 6s cubic-bezier(0, 0, 0.2, 1) infinite" }}></div>
          <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/40"></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -rotate-45"></div>
          <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent transform -rotate-45"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 text-center lg:text-left"
          >
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_-10px_#6CFF5B] border-2 border-primary/20 flex items-center justify-center">
                <Image src="/icon.png" alt="Watch Lock & Find Logo" width={96} height={96} className="w-full h-full object-cover" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card w-fit mx-auto lg:mx-0 border-primary/30 text-primary">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-sm font-medium tracking-wide">Watch Lock & Find beta</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Find. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald">Lock.</span><br/>Protect.
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto lg:mx-0">
              Instantly find and secure your Android phone directly from your Galaxy Watch. Your phone, always within reach.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <motion.a 
                href="https://play.google.com/store/apps/details?id=com.wristguard.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary-dark text-background font-bold py-3 px-6 rounded-full shadow-[0_0_30px_-5px_#6CFF5B] transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <Play size={24} className="fill-current text-background" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] uppercase font-semibold">Get it on</span>
                  <span className="text-lg">Google Play</span>
                </div>
              </motion.a>
              <motion.a 
                href="#demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card font-medium py-4 px-8 rounded-full flex items-center gap-2 w-full sm:w-auto justify-center text-foreground/80 hover:text-foreground"
              >
                <Play size={20} className="text-primary" /> See How It Works
              </motion.a>
            </div>
          </motion.div>

          {/* Hero Images - Phone & Watch */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] flex items-center justify-center lg:justify-end perspective-[1000px]"
            onMouseEnter={() => setIsHoveringPhone(true)}
            onMouseLeave={() => setIsHoveringPhone(false)}
          >
            {/* Connection Line */}
            <svg className="absolute w-full h-full pointer-events-none z-0" style={{ filter: "drop-shadow(0 0 8px #6CFF5B)" }}>
              <motion.path
                d="M 200,300 Q 300,200 400,300"
                fill="transparent"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                className="hidden lg:block opacity-50"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6CFF5B" stopOpacity="0" />
                  <stop offset="50%" stopColor="#6CFF5B" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Phone Mockup */}
            <motion.div 
              animate={{ 
                rotateY: isHoveringPhone ? -10 : -15,
                rotateX: isHoveringPhone ? 5 : 10,
                z: isHoveringPhone ? 50 : 0
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-[280px] h-[580px] rounded-[3rem] border-[8px] border-zinc-800 bg-black shadow-2xl overflow-hidden z-10 hidden sm:block"
            >
              {/* Screen Content */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black p-6 flex flex-col items-center">
                <div className="w-32 h-6 bg-black rounded-b-3xl absolute top-0"></div> {/* Notch */}
                
                <div className="mt-20 flex flex-col items-center gap-6 w-full">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center relative">
                    <Shield className="text-primary w-12 h-12" />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-primary"
                    />
                  </div>
                  <h2 className="text-xl font-medium text-white text-center">Watch Lock & Find Active</h2>
                  
                  <div className="w-full space-y-3 mt-8">
                    <div className="h-16 w-full glass-card rounded-2xl flex items-center px-4 gap-4">
                      <Lock className="text-primary" />
                      <div className="flex-1">
                        <div className="h-2 w-20 bg-white/20 rounded-full mb-2"></div>
                        <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-16 w-full glass-card rounded-2xl flex items-center px-4 gap-4">
                      <BellRing className="text-primary" />
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-white/20 rounded-full mb-2"></div>
                        <div className="h-2 w-28 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Watch Mockup */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotateZ: isHoveringPhone ? -5 : 0
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { type: "spring" }
              }}
              className="absolute lg:-left-16 bottom-10 lg:bottom-32 w-[220px] h-[220px] rounded-full border-[6px] border-zinc-700 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden flex items-center justify-center"
            >
              {/* Watch Straps */}
              <div className="absolute top-[-20px] w-24 h-6 bg-zinc-800 rounded-t-lg"></div>
              <div className="absolute bottom-[-20px] w-24 h-6 bg-zinc-800 rounded-b-lg"></div>
              
              {/* Watch Screen Content */}
              <div className="w-[92%] h-[92%] bg-black rounded-full p-4 flex flex-col items-center justify-center gap-3">
                <span className="text-primary font-medium text-sm">10:09 AM</span>
                <div className="grid grid-cols-2 gap-2 w-full px-2">
                  <div className="bg-primary/20 aspect-square rounded-2xl flex items-center justify-center">
                    <BellRing className="text-primary w-8 h-8" />
                  </div>
                  <div className="bg-accent/20 aspect-square rounded-2xl flex items-center justify-center">
                    <Lock className="text-accent w-8 h-8" />
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 mt-1">Watch Lock & Find</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Forgot where you left or lost your phone?</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">The panic is real. Whether it's buried in the couch or left behind at a coffee shop, we've all been there.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-3 md:p-4 rounded-[2rem] transform md:-rotate-2 hover:rotate-0 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity rounded-[2rem]"></div>
              <img 
                src="https://images.ctfassets.net/16nm6vz43ids/4vD81JGt6p6lZlqw5egaSk/13e0b956c6e9b7c72a798e9178e407ff/How_to_find_lost_Android_phone_-_Asurion.jpg?fm=webp&q=65" 
                alt="Searching for lost phone" 
                className="w-full h-64 md:h-80 rounded-[1.5rem] object-cover"
              />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                <p className="text-white font-bold text-xl md:text-2xl">The Panic Search</p>
                <p className="text-white/70 text-sm md:text-base">"It was just here a minute ago!"</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-3 md:p-4 rounded-[2rem] transform md:rotate-2 hover:rotate-0 transition-all duration-500 relative overflow-hidden bg-white/5"
            >
              <img 
                src="/cartoon.png" 
                alt="Panic of losing phone cartoon" 
                className="w-full h-64 md:h-80 rounded-[1.5rem] object-contain bg-white"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Command your phone from your wrist</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">Powerful features designed specifically for the Galaxy Watch and Wear OS ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Phone Dashboard", desc: "Control center with Biometric lock, Live Status, and Last Command/Location mapping.", color: "text-primary" },
              { icon: Lock, title: "Instant Screen Lock", desc: "Lock your phone remotely in one tap from the watch. Keeps your data secure.", color: "text-accent" },
              { icon: BellRing, title: "Find Phone", desc: "Ring your phone instantly from your watch. Overrides silent mode effortlessly.", color: "text-primary" },
              { icon: MapPin, title: "GPS Locate", desc: "Forces the phone to push its latest GPS coordinates straight to your watch.", color: "text-emerald" },
              { icon: Zap, title: "SOS Mode", desc: "A single button that simultaneously Locks, Rings, and Locates the phone in emergencies.", color: "text-yellow-400" },
              { icon: Activity, title: "Quick Access Tile", desc: "Trigger commands with a quick swipe right on your watch, without even opening the app.", color: "text-blue-400" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl group relative overflow-hidden"
              >
                <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[50px] opacity-20 rounded-full transition-opacity group-hover:opacity-40 bg-current ${feature.color}`}></div>
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shadow-lg border border-white/5 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight relative z-10">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE DEMO */}
      <section id="demo" className="py-24 px-6 bg-black/50 relative border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Try the experience</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            
            {/* Interactive Watch */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-[200px] h-[200px] rounded-full border-4 border-zinc-700 bg-zinc-900 relative z-10 flex items-center justify-center overflow-hidden">
                <div className="w-[90%] h-[90%] bg-black rounded-full flex flex-col items-center justify-center p-4">
                  <span className="text-zinc-500 text-[10px] font-medium mb-3">Tap to Demo</span>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-[130px]">
                    <div onClick={() => setDemoState("ringing")} className={`aspect-square rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 ${demoState === "ringing" ? "bg-primary text-black shadow-[0_0_15px_#6CFF5B]" : "bg-primary/20 text-primary"}`}>
                      <BellRing size={20} className={demoState === "ringing" ? "animate-bounce" : ""} />
                    </div>
                    <div onClick={() => setDemoState("locked")} className={`aspect-square rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 ${demoState === "locked" ? "bg-accent text-black shadow-[0_0_15px_#00E5FF]" : "bg-accent/20 text-accent"}`}>
                      <Lock size={20} className={demoState === "locked" ? "animate-pulse" : ""} />
                    </div>
                    <div onClick={() => setDemoState("locating")} className={`col-span-2 aspect-[3/1] rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ${demoState === "locating" ? "bg-emerald text-black shadow-[0_0_15px_#00D26A]" : "bg-emerald/20 text-emerald"}`}>
                      <MapPin size={18} className={demoState === "locating" ? "animate-bounce" : ""} />
                      <span className="text-sm font-semibold">Map</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-foreground/70 font-medium">Your Watch</p>
            </div>

            {/* Connection Animation */}
            <div className="hidden md:flex flex-col items-center justify-center w-32 relative">
              <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                  animate={demoState !== "idle" ? { x: ["-100%", "200%"] } : { opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
              <Zap className={`absolute text-primary transition-opacity ${demoState !== "idle" ? "opacity-100" : "opacity-0"}`} />
            </div>

            {/* Responsive Phone */}
            <div className="relative">
              <div className={`absolute -inset-8 rounded-[4rem] blur-2xl transition-all duration-500 opacity-0 ${demoState === "ringing" ? "bg-primary/30 opacity-100" : demoState === "locked" ? "bg-accent/30 opacity-100" : demoState === "locating" ? "bg-emerald/30 opacity-100" : ""}`}></div>
              <div className="w-[220px] h-[450px] rounded-[2.5rem] border-4 border-zinc-800 bg-zinc-950 relative z-10 overflow-hidden flex flex-col items-center justify-center">
                {demoState === "idle" && (
                  <div className="text-zinc-600 flex flex-col items-center gap-2">
                    <Smartphone size={32} />
                    <span>Phone is idle</span>
                  </div>
                )}
                {demoState === "ringing" && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <motion.div 
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                      className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-black"
                    >
                      <BellRing size={36} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white text-center">Finding<br/>Phone...</h3>
                  </motion.div>
                )}
                {demoState === "locked" && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4 w-full h-full bg-accent/10 justify-center relative"
                  >
                    <div className="absolute top-0 w-full h-1 bg-accent animate-pulse" />
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-black shadow-[0_0_20px_#00E5FF]"
                    >
                      <Lock size={36} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-accent text-center">Device<br/>Locked</h3>
                  </motion.div>
                )}
                {demoState === "locating" && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4 w-full h-full justify-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#00D26A 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    <motion.div 
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-emerald rounded-full flex items-center justify-center text-black z-10 shadow-[0_0_30px_#00D26A]"
                    >
                      <MapPin size={36} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-emerald text-center z-10">Location<br/>Found</h3>
                  </motion.div>
                )}
              </div>
              <p className="mt-6 text-foreground/70 font-medium">Your Phone</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card w-fit mx-auto mb-6 border-accent/30 text-accent">
              <span className="text-sm font-medium tracking-wide">The upgrade you need</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">More than just "Find My"</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">See how Watch Lock & Find goes beyond the basic utility included with your smartwatch.</p>
          </div>
          
          <div className="glass-card overflow-hidden rounded-[2.5rem] p-0">
            <div className="grid grid-cols-3 gap-4 p-6 md:p-8 border-b border-white/5 bg-black/40">
              <div className="font-semibold text-foreground/50 text-xs md:text-sm uppercase tracking-wider pl-2 md:pl-4 flex items-center">Feature</div>
              <div className="font-semibold text-center text-foreground/50 text-xs md:text-sm uppercase tracking-wider flex items-center justify-center">Default "Find My"</div>
              <div className="font-bold text-center text-primary text-xs md:text-sm uppercase tracking-wider flex items-center justify-center">Watch Lock & Find</div>
            </div>
            
            <div className="divide-y divide-white/5 bg-black/20">
              {[
                { name: "Ring phone from watch", traditional: true, pro: true },
                { name: "Instantly lock phone screen", traditional: false, pro: true },
                { name: "Force GPS location push", traditional: false, pro: true },
                { name: "SOS Mode (Lock + Ring + Map)", traditional: false, pro: true },
                { name: "Quick Access Watch Tile", traditional: false, pro: true },
                { name: "Biometric app protection", traditional: false, pro: true },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 p-6 md:p-8 items-center hover:bg-white/5 transition-colors">
                  <div className="font-medium text-sm md:text-base pl-2 md:pl-4">{row.name}</div>
                  <div className="flex justify-center">
                    {row.traditional ? (
                      <CheckCircle2 className="text-foreground/40" size={24} />
                    ) : (
                      <div className="w-4 h-px bg-white/20 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.pro ? (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(108,255,91,0.2)]">
                        <CheckCircle2 className="text-primary" size={20} />
                      </div>
                    ) : (
                      <div className="w-4 h-px bg-white/20 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT EXISTS */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto glass-card border-l-4 border-l-accent p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-tight">
            No more searching for your phone in the dark.
            <br />
            No more panic when it's out of sight.
          </h2>
          
          <div className="space-y-4 text-lg text-foreground/80">
            <p className="flex items-start gap-3">
              <CheckCircle2 className="text-accent shrink-0 mt-1" />
              <span>Instantly locate a misplaced device, overriding silent modes effortlessly.</span>
            </p>
            <p className="flex items-start gap-3">
              <CheckCircle2 className="text-accent shrink-0 mt-1" />
              <span>Secure your data immediately with a single tap on your wrist if you leave your phone unattended.</span>
            </p>
            <p className="flex items-start gap-3">
              <CheckCircle2 className="text-accent shrink-0 mt-1" />
              <span>Give your smartwatch a powerful, practical security purpose.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 5. PRICING */}
      <section className="py-24 px-6 bg-zinc-950/50 border-y border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose your protection</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">Start with the basics for free, or unlock the full security suite for a small one-time fee.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-10 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p className="text-foreground/50 mb-8">Basic utility to find your phone around the house.</p>
              <div className="text-4xl font-bold mb-8">₹0</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20}/> Ring Phone (BT only)</li>
                <li className="flex items-center gap-3 text-foreground/40"><X size={20}/> Remote Lock</li>
                <li className="flex items-center gap-3 text-foreground/40"><X size={20}/> GPS Locate</li>
                <li className="flex items-center gap-3 text-foreground/40"><X size={20}/> SOS Mode</li>
                <li className="flex items-center gap-3 text-foreground/40"><X size={20}/> Battery on Watch</li>
              </ul>
            </div>
            {/* Pro Plan */}
            <div className="glass-card bg-gradient-to-b from-primary/10 to-transparent border-primary/30 p-10 flex flex-col relative overflow-hidden">
              <div className="absolute top-6 right-6 px-3 py-1 bg-primary text-black text-xs font-bold rounded-full uppercase tracking-wider">Recommended</div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Pro Plan</h3>
              <p className="text-foreground/50 mb-8">The complete anti-theft and remote utility suite.</p>
              <div className="text-4xl font-bold mb-2">₹99 <span className="text-lg text-foreground/50 font-normal">One-Time Buy</span></div>
              <p className="text-sm text-primary/80 mb-6">No recurring subscriptions. Yours forever.</p>
              <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-black font-bold mb-8 shadow-[0_0_20px_-5px_#6CFF5B] transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Upgrade to Pro (₹99)
              </button>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20}/> Ring Phone (Anywhere)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20}/> Remote Lock</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20}/> GPS Locate</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20}/> SOS Mode</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20}/> Battery on Watch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPATIBILITY & 7. SECURITY */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Compatibility */}
          <div className="glass-card bg-gradient-to-br from-zinc-900/80 to-black p-10 relative overflow-hidden flex flex-col justify-between h-full group">
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <Watch size={200} />
            </div>
            <div className="relative z-10 flex-1">
              <h3 className="text-2xl font-bold mb-6">Works with your gear.</h3>
              <ul className="space-y-4 font-medium text-foreground/80 text-lg mb-8">
                <li className="flex items-center gap-3"><Image src="/next.svg" width={0} height={0} className="hidden" alt="hidden"/>Galaxy Watch Ultra</li>
                <li className="flex items-center gap-3">Galaxy Watch 7 / 6 / 5 / 4</li>
                <li className="flex items-center gap-3">Pixel Watch Series</li>
                <li className="flex items-center gap-3">All Wear OS 3+ Devices</li>
              </ul>
            </div>
            <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
              <a href="#compatibility" className="inline-flex items-center gap-2 text-primary hover:text-white font-medium transition-colors">
                View Full Compatibility Report <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Security */}
          <div className="glass-card bg-zinc-950 p-10 border border-primary/20 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-20 pointer-events-none blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-primary w-8 h-8" />
                <h3 className="text-2xl font-bold text-primary">The Technical Edge.</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <ServerOff size={18} className="text-primary"/> Serverless Architecture
                  </div>
                  <p className="text-sm text-foreground/50">Direct Firebase writes ensure blazing fast, secure remote actions without middleware.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Lock size={18} className="text-primary"/> Biometric Gate
                  </div>
                  <p className="text-sm text-foreground/50">The phone app is protected by Fingerprint/Face ID lock screen.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Smartphone size={18} className="text-primary"/> Companion Sync
                  </div>
                  <p className="text-sm text-foreground/50">Install on phone, and seamlessly sync to your Wear OS watch instantly.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Shield size={18} className="text-primary"/> Privacy First
                  </div>
                  <p className="text-sm text-foreground/50">All data travels through your private Google-secured database.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. DETAILED COMPATIBILITY REPORT */}
      <section className="py-24 px-6 border-t border-white/5 bg-black/40" id="compatibility">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card w-fit mx-auto mb-6 border-primary/30 text-primary">
              <Info size={16} />
              <span className="text-sm font-medium tracking-wide">Version 1.7 (Code 14)</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Device Compatibility Report</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">Detailed system requirements for the Watch Lock & Find ecosystem.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="glass-card p-8 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-xl font-bold">1. Mobile Phone (Android)</h3>
              </div>
              <ul className="space-y-4 text-foreground/70">
                <li className="flex flex-col"><strong className="text-foreground">Minimum OS:</strong> Android 8.0 (Oreo) / API Level 26</li>
                <li className="flex flex-col"><strong className="text-foreground">Target OS:</strong> Android 15.0 / API Level 35</li>
                <li className="flex flex-col"><strong className="text-foreground">Hardware Requirements:</strong> 
                  <span className="pl-4 mt-1 border-l-2 border-white/10 text-sm">
                    • Biometric Sensor (Fingerprint or Face Unlock) OR Secure PIN/Pattern fallback.<br/>
                    • GPS / Location Sensor (Required for Locate and SOS features).<br/>
                    • Active Internet Connection (WiFi, 4G, or 5G).<br/>
                    • Vibrator motor.
                  </span>
                </li>
              </ul>
            </div>

            {/* Watch */}
            <div className="glass-card p-8 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center">
                  <Watch size={24} />
                </div>
                <h3 className="text-xl font-bold">2. Smartwatch (Wear OS)</h3>
              </div>
              <ul className="space-y-4 text-foreground/70">
                <li className="flex flex-col"><strong className="text-foreground">Minimum OS:</strong> Wear OS 3.0 / API Level 30</li>
                <li className="flex flex-col"><strong className="text-foreground">Target OS:</strong> Wear OS 5.0 / API Level 35</li>
                <li className="flex flex-col"><strong className="text-foreground">Supported Models:</strong> Samsung Galaxy Watch 4/5/6/7/Ultra, Pixel Watch 1/2/3, TicWatch Pro 3/5, Fossil Gen 6, etc.</li>
                <li className="flex flex-col"><strong className="text-foreground">Screen Support:</strong> Fully optimized for Circular watch faces. Compatible with Square Wear OS watch faces.</li>
                <li className="flex flex-col"><strong className="text-foreground">Hardware Requirements:</strong> Bluetooth 4.2+ (for local ringing). WiFi or LTE SIM (required for Pro "Out-of-Range" commands).</li>
              </ul>
            </div>

            {/* Software */}
            <div className="glass-card p-8 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald/20 text-emerald flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold">3. Software & Account</h3>
              </div>
              <ul className="space-y-4 text-foreground/70">
                <li className="flex flex-col"><strong className="text-foreground">Google Play Services:</strong> Must be installed and up-to-date on both devices.</li>
                <li className="flex flex-col"><strong className="text-foreground">Google Account:</strong> Required on both devices for secure cloud synchronization.</li>
                <li className="flex flex-col"><strong className="text-foreground">Companion Linking:</strong> Both apps must be installed using the same Google Account to ensure background communication via Firebase works correctly.</li>
                <li className="flex flex-col"><strong className="text-foreground">Device Admin:</strong> Phone must allow "Device Administrator" permissions to enable the Remote Lock feature.</li>
              </ul>
            </div>

            {/* Connectivity */}
            <div className="glass-card p-8 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center">
                  <Wifi size={24} />
                </div>
                <h3 className="text-xl font-bold">4. Connectivity Performance</h3>
              </div>
              <ul className="space-y-4 text-foreground/70">
                <li className="flex flex-col"><strong className="text-foreground">Bluetooth-Only Mode:</strong> Best for local "Find my Phone" (Ring feature).</li>
                <li className="flex flex-col"><strong className="text-foreground">Cloud Mode (LTE/WiFi):</strong> Required for "Lock," "Locate," and "SOS" features when the devices are separated by a long distance.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 px-6 relative z-10 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">Everything you need to know about Watch Lock & Find.</p>
          </div>
          <div className="space-y-6">
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Does it work when the phone is off?</h3>
              <p className="text-foreground/70 pl-4 border-l-2 border-white/5">No app can function if the device is completely powered off. However, the Remote Lock feature prevents thieves from accessing your quick settings to turn off WiFi/Mobile Data or power off the device easily without your biometric authentication, buying you valuable time to locate it.</p>
            </div>
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Does it drain battery?</h3>
              <p className="text-foreground/70 pl-4 border-l-2 border-white/5">No. Both the watch and phone applications are highly optimized to run purely via Firebase Cloud Messaging push notifications. There are no heavy background polling services. It consumes virtually 0% battery when idle.</p>
            </div>
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Which watches are supported?</h3>
              <p className="text-foreground/70 pl-4 border-l-2 border-white/5">Any smartwatch running Wear OS 3.0 or higher. This includes the Samsung Galaxy Watch 4, 5, 6, 7, and Ultra, as well as Google Pixel Watches and newer TicWatch models. Apple Watches are not supported.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-32 px-6 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5"></div>
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to secure your phone from your wrist?</h2>
          <p className="text-xl text-foreground/60 mb-10">Be among the first to upgrade your smartwatch experience.</p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <motion.a 
              href="https://play.google.com/store/apps/details?id=com.wristguard.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-dark text-black font-bold py-3 px-8 rounded-full shadow-[0_0_30px_-5px_#6CFF5B] transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Play size={28} className="fill-current" />
              <div className="flex flex-col items-start leading-tight text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider">Download on</span>
                <span className="text-xl tracking-tight">Google Play</span>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

    </main>
  );
}
