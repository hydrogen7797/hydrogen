"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { useMotion } from "@/components/providers/Providers";

/* ------------------------------------------------------------------
   Procedural "puffy" shapes — spheres pushed outward in the XY plane
   by a radial profile, then flattened, so they read as soft
   inflated cookies (stars, clovers, suns...) like the original scene.
------------------------------------------------------------------- */
type Kind = "sphere" | "clover" | "star" | "sun" | "flower" | "sparkle";

const PROFILES: Record<Kind, { r: (t: number) => number; flatten: number }> = {
  sphere: { r: () => 1, flatten: 0.92 },
  // four round petals
  clover: { r: (t) => 0.66 + 0.44 * Math.pow(0.5 + 0.5 * Math.cos(4 * t), 0.9), flatten: 0.72 },
  // chubby five-point star
  star: { r: (t) => 0.66 + 0.62 * Math.pow(0.5 + 0.5 * Math.cos(5 * t), 1.8), flatten: 0.66 },
  // soft spiky sun
  sun: { r: (t) => 0.84 + 0.3 * Math.pow(0.5 + 0.5 * Math.cos(9 * t), 2.2), flatten: 0.7 },
  // scalloped flower
  flower: { r: (t) => 0.86 + 0.2 * Math.pow(0.5 + 0.5 * Math.cos(7 * t), 1.1), flatten: 0.74 },
  // four-point sparkle
  sparkle: { r: (t) => 0.52 + 0.86 * Math.pow(0.5 + 0.5 * Math.cos(4 * t), 3.2), flatten: 0.62 },
};

function puffyGeometry(kind: Kind) {
  const base = new THREE.SphereGeometry(1, 120, 80);
  base.deleteAttribute("uv");
  base.deleteAttribute("normal");
  const g = mergeVertices(base);
  const pos = g.attributes.position as THREE.BufferAttribute;
  const { r, flatten } = PROFILES[kind];
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    // Sphere is Y-up; treat Y as depth so shapes face the camera.
    const theta = Math.atan2(v.z, v.x);
    const eq = Math.sqrt(Math.max(0, 1 - v.y * v.y));
    const k = 1 + (r(theta) - 1) * Math.pow(eq, 0.9);
    pos.setXYZ(i, v.x * k, v.z * k, v.y * flatten);
  }
  g.computeVertexNormals();
  return g;
}

function heartGeometry() {
  const s = new THREE.Shape();
  s.moveTo(5, 5);
  s.bezierCurveTo(5, 5, 4, 0, 0, 0);
  s.bezierCurveTo(-6, 0, -6, 7, -6, 7);
  s.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
  s.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
  s.bezierCurveTo(16, 7, 16, 0, 10, 0);
  s.bezierCurveTo(7, 0, 5, 5, 5, 5);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 1.5,
    bevelEnabled: true,
    bevelSegments: 16,
    bevelSize: 3.2,
    bevelThickness: 3.6,
    curveSegments: 64,
  });
  g.center();
  g.rotateZ(Math.PI);
  const scale = 3 / 25;
  g.scale(scale, scale, scale);
  g.computeVertexNormals();
  return g;
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,0.55)");
  grd.addColorStop(0.6, "rgba(255,255,255,0.12)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Deterministic PRNG so the composition is identical on every load.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Blob = {
  mesh: THREE.Mesh;
  base: THREE.Vector3;
  phase: number;
  speed: number;
  spin: number;
};

export function HeroScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { motionOn } = useMotion();
  const motionRef = useRef(motionOn);
  useEffect(() => {
    motionRef.current = motionOn;
  }, [motionOn]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const BG = new THREE.Color("#2a5db0");
    const scene = new THREE.Scene();
    scene.background = BG;
    scene.fog = new THREE.Fog(BG, 14, 32);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 16);

    scene.add(new THREE.HemisphereLight("#c3d6ff", "#1f4590", 1.45));
    const key = new THREE.DirectionalLight("#ffffff", 1.7);
    key.position.set(-5, 9, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight("#7f9fff", 0.45);
    fill.position.set(-7, -3, 5);
    scene.add(fill);
    const pink = new THREE.PointLight("#ff4a86", 26, 6.5, 1.8);
    pink.position.set(0, 0.2, 0.2);
    scene.add(pink);

    const blobMat = new THREE.MeshPhysicalMaterial({
      color: "#3a72c8",
      roughness: 0.72,
      metalness: 0,
      sheen: 0.35,
      sheenRoughness: 0.6,
      sheenColor: new THREE.Color("#7aa4f5"),
    });

    const kinds: Kind[] = ["sphere", "clover", "star", "sun", "flower", "sparkle"];
    const geos = Object.fromEntries(kinds.map((k) => [k, puffyGeometry(k)])) as Record<Kind, THREE.BufferGeometry>;

    // ---- Lay out the blobs: dense wall behind, looser ring in front.
    const rand = mulberry32(20111);
    const blobs: Blob[] = [];
    const placed: { p: THREE.Vector3; r: number }[] = [];
    const layers = [
      { count: 30, z: [-9, -4.5], s: [1.7, 2.7], hole: 0, xr: 17, yr: 9.5 },
      { count: 26, z: [-4.5, -1.2], s: [1.2, 2.0], hole: 2.5, xr: 14, yr: 7.5 },
      { count: 16, z: [-1.2, 1.8], s: [0.9, 1.5], hole: 3.3, xr: 11.5, yr: 6.2 },
    ];
    for (const L of layers) {
      let made = 0;
      let tries = 0;
      while (made < L.count && tries < 4000) {
        tries++;
        const p = new THREE.Vector3(
          (rand() * 2 - 1) * L.xr,
          (rand() * 2 - 1) * L.yr,
          L.z[0] + rand() * (L.z[1] - L.z[0]),
        );
        if (Math.hypot(p.x, p.y * 1.25) < L.hole) continue;
        const r = L.s[0] + rand() * (L.s[1] - L.s[0]);
        if (placed.some((o) => o.p.distanceTo(p) < (o.r + r) * 0.62)) continue;
        placed.push({ p, r });
        const kind = kinds[Math.floor(rand() * kinds.length)];
        const mesh = new THREE.Mesh(geos[kind], blobMat);
        mesh.position.copy(p);
        mesh.scale.setScalar(r);
        mesh.rotation.set((rand() - 0.5) * 1.5, (rand() - 0.5) * 1.5, rand() * Math.PI * 2);
        scene.add(mesh);
        blobs.push({
          mesh,
          base: p.clone(),
          phase: rand() * Math.PI * 2,
          speed: 0.3 + rand() * 0.5,
          spin: (rand() - 0.5) * 0.12,
        });
        made++;
      }
    }

    // ---- The heart
    const heart = new THREE.Mesh(
      heartGeometry(),
      new THREE.MeshPhysicalMaterial({
        color: "#ff9f8f",
        emissive: "#ff6a6a",
        emissiveIntensity: 0.7,
        roughness: 0.38,
        sheen: 1,
        sheenColor: new THREE.Color("#ffe1d8"),
        clearcoat: 0.35,
        clearcoatRoughness: 0.4,
      }),
    );
    heart.position.set(0, 0.15, 1.6);
    scene.add(heart);

    const glowTex = glowTexture();
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: "#ff74b0",
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.scale.set(10.5, 10.5, 1);
    glow.position.set(0, 0.1, 0.6);
    scene.add(glow);

    // ---- Interaction + loop
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Keep the composition filled on tall/narrow screens.
      camera.fov = w / h < 1 ? 52 : 35;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(host);

    const timer = new THREE.Timer();
    let elapsed = 0;
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);
      if (!visible) return;
      const moving = motionRef.current;
      if (moving) elapsed += dt;

      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      for (const b of blobs) {
        b.mesh.position.y = b.base.y + Math.sin(elapsed * b.speed + b.phase) * 0.12;
        b.mesh.position.x = b.base.x + Math.cos(elapsed * b.speed * 0.7 + b.phase) * 0.06;
        if (moving) b.mesh.rotation.z += b.spin * dt;
      }

      const beat = Math.pow(Math.max(0, Math.sin(elapsed * 2.4)), 6);
      heart.scale.setScalar(1 + beat * 0.06);
      heart.rotation.y = Math.sin(elapsed * 0.7) * 0.18 + pointer.x * 0.35;
      heart.rotation.x = pointer.y * 0.2;
      glow.material.opacity = 0.75 + beat * 0.2;
      pink.intensity = 24 + beat * 10;

      camera.position.x = pointer.x * 0.7;
      camera.position.y = -pointer.y * 0.45;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      io.disconnect();
      Object.values(geos).forEach((g) => g.dispose());
      heart.geometry.dispose();
      (heart.material as THREE.Material).dispose();
      blobMat.dispose();
      glow.material.dispose();
      glowTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
