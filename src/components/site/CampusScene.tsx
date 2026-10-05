import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sparkles, Html } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { buildings, type Building } from "@/data/campus";

const C = { ground: "#2f4a3a", path: "#e9e1cf", wall: "#f3ece0", roof: "#2a2e2b", tree: "#3d6b4f", gold: "#c9a45c", glass: "#9fb4a8" };

function Block({ b, active, onSelect }: { b: Building; active: boolean; onSelect?: ((id: string) => void) | undefined }) {
  const [w, h, d] = b.size;
  const isField = b.id === "sports";
  return (
    <group position={b.pos} onClick={(e) => { e.stopPropagation(); onSelect?.(b.id); }}>
      {isField ? (
        <mesh position={[0, 0.04, 0]} receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#4f7d55" />
        </mesh>
      ) : (
        <>
          <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color={active ? C.gold : C.wall} />
          </mesh>
          <mesh position={[0, h + 0.08, 0]} castShadow>
            <boxGeometry args={[w + 0.15, 0.16, d + 0.15]} />
            <meshStandardMaterial color={C.roof} />
          </mesh>
          {Array.from({ length: Math.max(1, Math.round(h / 0.55)) }).map((_, i) => (
            <mesh key={i} position={[0, 0.35 + i * 0.5, d / 2 + 0.01]}>
              <planeGeometry args={[w * 0.8, 0.18]} />
              <meshStandardMaterial color={C.glass} emissive={C.gold} emissiveIntensity={0.15} />
            </mesh>
          ))}
        </>
      )}
      <Marker y={(isField ? 0.6 : h + 0.8)} active={active} />
      {onSelect && (
        <Html position={[0, isField ? 1.1 : h + 1.35, 0]} center distanceFactor={12} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-full bg-charcoal/80 px-3 py-1 text-[11px] font-semibold tracking-wider text-ink">{b.name}</div>
        </Html>
      )}
    </group>
  );
}

function Marker({ y, active }: { y: number; active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = y + Math.sin(clock.elapsedTime * 2) * 0.12;
  });
  return (
    <mesh ref={ref} position={[0, y, 0]}>
      <octahedronGeometry args={[active ? 0.28 : 0.18]} />
      <meshStandardMaterial color={C.gold} emissive={C.gold} emissiveIntensity={active ? 2 : 1} />
    </mesh>
  );
}

function Trees({ count }: { count: number }) {
  const trees = useMemo(() => {
    const r = (s: number) => { const x = Math.sin(s * 999) * 10000; return x - Math.floor(x); };
    return Array.from({ length: count }).map((_, i) => {
      const a = r(i + 1) * Math.PI * 2, rad = 7 + r(i + 7) * 4;
      return { x: Math.cos(a) * rad, z: Math.sin(a) * rad, s: 0.6 + r(i + 3) * 0.6 };
    });
  }, [count]);
  return (
    <>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]} scale={t.s}>
          <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.07, 0.09, 0.6]} /><meshStandardMaterial color="#5a4632" /></mesh>
          <mesh position={[0, 1, 0]} castShadow><coneGeometry args={[0.45, 1.2, 6]} /><meshStandardMaterial color={C.tree} flatShading /></mesh>
        </group>
      ))}
    </>
  );
}

function Rig({ interactive, focus }: { interactive: boolean; focus?: Building | null }) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame(({ clock }) => {
    if (interactive) {
      if (focus) {
        const [x, , z] = focus.pos;
        camera.position.lerp(new THREE.Vector3(x + 4, 5, z + 6), 0.04);
        target.current.lerp(new THREE.Vector3(x, 0.8, z), 0.06);
        camera.lookAt(target.current);
      }
      return;
    }
    const t = clock.elapsedTime * 0.08;
    camera.position.x = Math.sin(t) * 14 + pointer.x * 1.5;
    camera.position.z = Math.cos(t) * 14;
    camera.position.y = 7 + pointer.y * 1;
    camera.lookAt(0, 0.5, 0);
  });
  return null;
}

export default function CampusScene({
  interactive = false, selected = null, onSelect, lite = false,
}: { interactive?: boolean; selected?: string | null; onSelect?: ((id: string) => void) | undefined; lite?: boolean }) {
  const focus = buildings.find((b) => b.id === selected) ?? null;
  const controls = useRef<any>(null);
  useEffect(() => { if (!selected && controls.current) controls.current.reset(); }, [selected]);
  return (
    <Canvas shadows={!lite} dpr={[1, lite ? 1.25 : 1.75]} camera={{ position: [10, 8, 12], fov: 40 }} onPointerMissed={() => interactive && onSelect?.("")}>
      <fog attach="fog" args={["#1d2a23", 16, 34]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 12, 6]} intensity={1.4} color="#ffe8c4" castShadow shadow-mapSize={[1024, 1024]} />
      <hemisphereLight args={["#fff4e0", "#203328", 0.4]} />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[13, 48]} />
        <meshStandardMaterial color={C.ground} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 2]}><planeGeometry args={[0.8, 12]} /><meshStandardMaterial color={C.path} /></mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 1]}><planeGeometry args={[11, 0.6]} /><meshStandardMaterial color={C.path} /></mesh>
      {buildings.map((b) => (
        <Block key={b.id} b={b} active={selected === b.id} onSelect={interactive ? onSelect : undefined} />
      ))}
      <Trees count={lite ? 14 : 34} />
      <Sparkles count={lite ? 30 : 80} scale={[20, 6, 20]} size={2.5} speed={0.3} color="#e8c98a" position={[0, 3, 0]} />
      <Rig interactive={interactive} focus={focus} />
      {interactive && <OrbitControls ref={controls} enabled={!focus} maxPolarAngle={1.25} minDistance={6} maxDistance={24} enableDamping />}
    </Canvas>
  );
}
