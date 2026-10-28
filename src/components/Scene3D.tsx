"use client";
/* eslint-disable react-hooks/immutability -- three.js objects are mutated imperatively inside useFrame, the standard r3f pattern */

import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const GREEN = "#6cff5b";
const MODES = ["ring", "lock", "locate"] as const;
type Mode = (typeof MODES)[number];
const MODE_SECONDS = 3.2;

// Lucide icon paths (24x24 viewBox), drawn onto the screen canvases.
const ICONS: Record<Mode, string[]> = {
  ring: ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"],
  lock: ["M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", "M7 11V7a5 5 0 0 1 10 0v4"],
  locate: ["M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", "M15 10a3 3 0 1 1-6 0a3 3 0 0 1 6 0z"],
};
const LABEL: Record<Mode, [string, string]> = {
  ring: ["RINGING", "Alarm overrides silent"],
  lock: ["LOCKED", "Screen locked remotely"],
  locate: ["LOCATED", "GPS sent to your wrist"],
};

function modeAt(t: number): { mode: Mode; p: number } {
  const i = Math.floor(t / MODE_SECONDS) % MODES.length;
  return { mode: MODES[i], p: (t % MODE_SECONDS) / MODE_SECONDS };
}

function drawIcon(ctx: CanvasRenderingContext2D, mode: Mode, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const d of ICONS[mode]) ctx.stroke(new Path2D(d));
  ctx.restore();
}

function useCanvasTexture(w: number, h: number) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return { canvas, ctx: canvas.getContext("2d")!, tex };
  }, [w, h]);
}

function drawWatch(ctx: CanvasRenderingContext2D, t: number) {
  const S = 512, c = S / 2;
  const { mode, p } = modeAt(t);
  ctx.clearRect(0, 0, S, S);
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(c, c, c, 0, Math.PI * 2);
  ctx.fill();

  // glow
  const g = ctx.createRadialGradient(c, c * 0.95, 10, c, c, c);
  g.addColorStop(0, "rgba(108,255,91,0.28)");
  g.addColorStop(1, "rgba(108,255,91,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  // progress ring
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(c, c, c - 34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = GREEN;
  ctx.beginPath();
  ctx.arc(c, c, c - 34, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, p * 1.6));
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "500 26px monospace";
  ctx.textAlign = "center";
  ctx.fillText("10:09", c, 112);

  // icon disc
  ctx.fillStyle = "rgba(108,255,91,0.14)";
  ctx.beginPath();
  ctx.arc(c, c - 4, 74, 0, Math.PI * 2);
  ctx.fill();
  const pulse = mode === "ring" ? Math.sin(t * 22) * 4 : 0;
  drawIcon(ctx, mode, c + pulse, c - 4, 84, GREEN);

  ctx.fillStyle = "#fff";
  ctx.font = "700 38px sans-serif";
  ctx.fillText(LABEL[mode][0], c, c + 124);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "400 22px sans-serif";
  ctx.fillText("My Phone · 82%", c, c + 160);
}

function drawPhone(ctx: CanvasRenderingContext2D, t: number) {
  const W = 512, H = 1056, cx = W / 2;
  const { mode, p } = modeAt(t);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, mode === "ring" ? "#0f1f10" : "#0b0e10");
  bg.addColorStop(1, "#050607");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "500 26px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("10:09", 40, 58);
  ctx.textAlign = "right";
  ctx.fillText("82%", W - 40, 58);
  ctx.textAlign = "center";

  const cy = 430;
  if (mode === "locate") {
    // map grid
    ctx.strokeStyle = "rgba(108,255,91,0.12)";
    ctx.lineWidth = 2;
    for (let x = 0; x < W; x += 48) { ctx.beginPath(); ctx.moveTo(x, 140); ctx.lineTo(x, 760); ctx.stroke(); }
    for (let y = 140; y < 760; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 18;
    ctx.beginPath(); ctx.moveTo(-20, 620); ctx.quadraticCurveTo(220, 470, W + 20, 300); ctx.stroke();
  }
  for (let i = 0; i < 3; i++) {
    const k = (p * 1.5 + i / 3) % 1;
    ctx.strokeStyle = `rgba(108,255,91,${(1 - k) * 0.6})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, 90 + k * 170, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = GREEN;
  ctx.beginPath();
  ctx.arc(cx, cy, 92, 0, Math.PI * 2);
  ctx.fill();
  const shake = mode === "ring" ? Math.sin(t * 30) * 6 : 0;
  drawIcon(ctx, mode, cx + shake, cy, 96, "#07090a");

  ctx.fillStyle = "#fff";
  ctx.font = "800 54px sans-serif";
  ctx.fillText(LABEL[mode][0], cx, 760);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "400 28px sans-serif";
  ctx.fillText(LABEL[mode][1], cx, 808);
  ctx.fillText("from Galaxy Watch", cx, 846);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundRect(ctx, 60, 920, W - 120, 76, 38);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "600 26px sans-serif";
  ctx.fillText(mode === "lock" ? "Unlock with fingerprint" : "Swipe to dismiss", cx, 967);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function Watch(props: ThreeElements["group"]) {
  const screen = useCanvasTexture(512, 512);
  useFrame(({ clock }) => {
    drawWatch(screen.ctx, clock.elapsedTime);
    screen.tex.needsUpdate = true;
  });
  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => (i / 60) * Math.PI * 2), []);
  const metal = { color: "#3a3f45", metalness: 0.95, roughness: 0.28 };
  return (
    <group {...props}>
      {/* straps */}
      {[1, -1].map((s) => (
        <group key={s} position={[0, s * 1.55, -0.28]} rotation={[s * 0.42, 0, 0]}>
          <RoundedBox args={[1.12, 1.5, 0.2]} radius={0.09} smoothness={4}>
            <meshStandardMaterial color="#121416" roughness={0.75} metalness={0.1} />
          </RoundedBox>
        </group>
      ))}
      {/* case */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.08, 1.12, 0.42, 96]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      {/* bezel */}
      <mesh position={[0, 0, 0.21]}>
        <torusGeometry args={[1.0, 0.09, 24, 128]} />
        <meshStandardMaterial color="#1b1e21" metalness={0.9} roughness={0.35} />
      </mesh>
      {ticks.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 1.0, Math.sin(a) * 1.0, 0.3]} rotation={[0, 0, a]}>
          <boxGeometry args={[i % 5 === 0 ? 0.08 : 0.04, 0.012, 0.01]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#cfd6d2" : "#6b726e"} />
        </mesh>
      ))}
      {/* screen */}
      <mesh position={[0, 0, 0.215]}>
        <circleGeometry args={[0.9, 96]} />
        <meshBasicMaterial map={screen.tex} toneMapped={false} />
      </mesh>
      {/* glass sheen */}
      <mesh position={[0, 0, 0.225]}>
        <circleGeometry args={[0.92, 96]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.07} roughness={0.05} metalness={0} clearcoat={1} />
      </mesh>
      {/* buttons */}
      {[0.38, -0.38].map((y) => (
        <mesh key={y} position={[1.14, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.14, 24]} />
          <meshStandardMaterial {...metal} />
        </mesh>
      ))}
    </group>
  );
}

function Phone(props: ThreeElements["group"]) {
  const screen = useCanvasTexture(512, 1056);
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    drawPhone(screen.ctx, t);
    screen.tex.needsUpdate = true;
    if (ref.current) {
      const ringing = modeAt(t).mode === "ring";
      ref.current.rotation.z = ringing ? Math.sin(t * 40) * 0.025 : 0;
    }
  });
  return (
    <group {...props}>
      <group ref={ref}>
        <RoundedBox args={[1.62, 3.3, 0.17]} radius={0.16} smoothness={6}>
          <meshStandardMaterial color="#1d2024" metalness={0.9} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, 0.0865]}>
          <planeGeometry args={[1.5, 3.1]} />
          <meshBasicMaterial map={screen.tex} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.42, 0.088]}>
          <circleGeometry args={[0.035, 24]} />
          <meshBasicMaterial color="#000" />
        </mesh>
      </group>
    </group>
  );
}

function Signal({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const curve = useMemo(() => {
    const mid = from.clone().lerp(to, 0.5).add(new THREE.Vector3(0, 0.9, 0.6));
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [from, to]);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.006, 8, false), [curve]);
  const dots = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    dots.current.forEach((m, i) => {
      if (!m) return;
      const k = (clock.elapsedTime * 0.55 + i / 4) % 1;
      m.position.copy(curve.getPoint(k));
      m.scale.setScalar(0.6 + Math.sin(k * Math.PI) * 0.8);
    });
  });
  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial color={GREEN} transparent opacity={0.25} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(m) => { if (m) dots.current[i] = m; }}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color={GREEN} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }, dt) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * 0.35, 3, dt);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -pointer.y * 0.2, 3, dt);
    ref.current.position.y = Math.sin(t * 0.8) * 0.06;
  });
  return <group ref={ref}>{children}</group>;
}

export default function Scene3D() {
  const watchPos = useMemo(() => new THREE.Vector3(-0.8, -0.35, 0.7), []);
  const phonePos = useMemo(() => new THREE.Vector3(1.3, 0.25, -0.5), []);

  useEffect(() => () => THREE.Cache.clear(), []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7.8], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="3D model of a smartwatch ringing, locking and locating a phone"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-3, -1, 3]} intensity={18} color={GREEN} distance={8} />
      <Rig>
        <Phone position={phonePos.toArray()} rotation={[0.05, -0.38, 0.06]} />
        <Watch position={watchPos.toArray()} rotation={[0.1, 0.4, -0.12]} scale={0.95} />
        <Signal from={watchPos.clone().add(new THREE.Vector3(0.3, 0.3, 0.3))} to={phonePos.clone().add(new THREE.Vector3(-0.3, 0.2, 0.2))} />
      </Rig>
      <ContactShadows position={[0, -2.3, 0]} opacity={0.5} scale={10} blur={2.6} far={4} color="#000" />
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 1, 1]} />
        <Lightformer intensity={1.2} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer intensity={0.8} color={GREEN} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      </Environment>
    </Canvas>
  );
}
