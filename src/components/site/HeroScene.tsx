import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import h11 from "@/assets/hotel/h11.jpg";
import h8 from "@/assets/hotel/h8.jpg";
import h6 from "@/assets/hotel/h6.jpg";
import h2 from "@/assets/hotel/h2.jpg";
import h3 from "@/assets/hotel/h3.jpg";
import hero from "@/assets/hotel/hero.jpg";

const slides = [hero, h11, h8, h6, h2, h3];

/* Floating particles representing forest mist + light orbs */
function Particles({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      scales[i] = Math.random() * 0.8 + 0.2;
    }
    return { positions, scales };
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    // gentle parallax follow
    ref.current.position.x += (mouse.current.x * 0.6 - ref.current.position.x) * 0.04;
    ref.current.position.y += (mouse.current.y * 0.4 - ref.current.position.y) * 0.04;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 1] += Math.sin(performance.now() * 0.0004 + arr[i]) * 0.0015;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#e8f0e2"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* Layered translucent "hill" planes that drift on mouse — evokes 3D forest depth */
function HillLayers() {
  const group = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += (mouse.current.x * 0.15 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-mouse.current.y * 0.08 - group.current.rotation.x) * 0.05;
  });

  const layers = [
    { z: -3, color: "#2a3d2c", o: 0.55, scale: 1.0, y: -1.4 },
    { z: -2, color: "#1d2c20", o: 0.7, scale: 0.85, y: -1.6 },
    { z: -1, color: "#121d14", o: 0.85, scale: 0.7, y: -1.8 },
  ];

  return (
    <group ref={group}>
    </group>
  );
}

export function HeroScene({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-forest-deep">
      {/* Image carousel background with Ken Burns */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <img
            src={s}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover ${
              i === active ? "kenburns" : ""
            }`}
          />
        </div>
      ))}

      {/* Simple black overlay for text visibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Slide indicator */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1 transition-all duration-500 ${
              i === active ? "w-10 bg-mist" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.05) translate(0,0); }
          100% { transform: scale(1.18) translate(-1%, -1%); }
        }
        .kenburns { animation: kenburns 7s ease-out forwards; }
      `}</style>
    </section>
  );
}
