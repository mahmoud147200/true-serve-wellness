import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatItem({ speed = 1.2, floatIntensity = 0.45, rotationIntensity = 0.25, position = [0, 0, 0], children }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.position.set(
      position[0],
      position[1] + Math.sin(t) * 0.12 * floatIntensity,
      position[2]
    );
    ref.current.rotation.x = Math.sin(t * 0.7) * 0.12 * rotationIntensity;
    ref.current.rotation.z = Math.cos(t * 0.5) * 0.12 * rotationIntensity;
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

function BrandSculpture({ isDark, deviceTilt }) {
  const groupRef = useRef();
  const waveRef = useRef();
  const leavesRef = useRef();

  // 8 spheres echoing the True Serve logo's signature arc (large lead sphere + 7 tapering spine spheres)
  const spheres = useMemo(
    () => [
      { pos: [-2.85, 0.35, 0.2], radius: 0.62, color: '#0A5CBA', speed: 1.2 },
      { pos: [-1.55, 0.22, 0.1], radius: 0.28, color: '#0288D1', speed: 1.5 },
      { pos: [-0.82, 0.26, 0.0], radius: 0.26, color: '#0A5CBA', speed: 1.35 },
      { pos: [-0.1, 0.2, -0.05], radius: 0.25, color: '#0288D1', speed: 1.6 },
      { pos: [0.6, 0.12, -0.1], radius: 0.23, color: '#0A5CBA', speed: 1.45 },
      { pos: [1.28, 0.05, -0.12], radius: 0.21, color: '#0288D1', speed: 1.7 },
      { pos: [1.92, 0.06, -0.08], radius: 0.19, color: '#0A5CBA', speed: 1.5 },
      { pos: [2.52, 0.16, 0.0], radius: 0.17, color: '#0288D1', speed: 1.8 },
    ],
    []
  );

  // Leaf-shaped extruded/flattened particles drifting around the scene
  const leafParticles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      arr.push({
        id: i,
        pos: [
          Math.cos(angle) * (2.2 + (i % 3) * 0.9),
          Math.sin(angle) * (1.2 + (i % 2) * 0.7) + 0.5,
          -0.8 - (i % 4) * 0.35,
        ],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.11 + (i % 4) * 0.035,
        speed: 0.5 + (i % 5) * 0.18,
        color: i % 3 === 0 ? '#C9A66B' : i % 2 === 0 ? '#00C853' : '#0A8F4A',
      });
    }
    return arr;
  }, []);

  // Custom leaf shape geometry
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1);
    shape.bezierCurveTo(0.85, -0.5, 0.95, 0.5, 0, 1.2);
    shape.bezierCurveTo(-0.95, 0.5, -0.85, -0.5, 0, -1);
    return new THREE.ShapeGeometry(shape, 12);
  }, []);

  // Flowing wave tube curve echoing the blue swoosh in the logo
  const waveGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.8, -0.65, -0.2),
      new THREE.Vector3(-1.6, -0.15, 0.15),
      new THREE.Vector3(0.7, -0.58, 0.05),
      new THREE.Vector3(3.3, 0.05, -0.15),
    ]);
    return new THREE.TubeGeometry(curve, 44, 0.075, 12, false);
  }, []);

  const goldWaveGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.4, -0.92, -0.35),
      new THREE.Vector3(-1.2, -0.45, 0.0),
      new THREE.Vector3(1.1, -0.82, -0.1),
      new THREE.Vector3(3.5, -0.25, -0.25),
    ]);
    return new THREE.TubeGeometry(curve, 36, 0.03, 8, false);
  }, []);

  useEffect(() => {
    return () => {
      leafGeometry.dispose();
      waveGeometry.dispose();
      goldWaveGeometry.dispose();
    };
  }, [leafGeometry, waveGeometry, goldWaveGeometry]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const targetX = state.pointer.x * 0.45 + deviceTilt.current.x * 0.35;
    const targetY = state.pointer.y * 0.32 + deviceTilt.current.y * 0.25;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX * 0.4,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY * 0.3,
        0.05
      );
      groupRef.current.position.y = -0.15 + Math.sin(t * 0.8) * 0.08;
    }

    if (waveRef.current) {
      waveRef.current.position.y = Math.sin(t * 1.1) * 0.05;
    }

    if (leavesRef.current) {
      leavesRef.current.children.forEach((child, idx) => {
        const item = leafParticles[idx];
        if (!item) return;
        child.rotation.z += 0.004 * item.speed;
        child.rotation.y += 0.006 * item.speed;
        child.position.y = item.pos[1] + Math.sin(t * item.speed + idx) * 0.16;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, -1.6]} scale={[0.82, 0.82, 0.82]}>
      {/* Glossy Brand Blue Spine Spheres */}
      {spheres.map((s, idx) => (
        <FloatItem
          key={idx}
          speed={s.speed}
          rotationIntensity={0.25}
          floatIntensity={0.45}
          position={s.pos}
        >
          <mesh>
            <sphereGeometry args={[s.radius * 0.78, 28, 28]} />
            <meshPhysicalMaterial
              color={s.color}
              roughness={0.14}
              metalness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.12}
              emissive={isDark ? s.color : '#000000'}
              emissiveIntensity={isDark ? 0.22 : 0.04}
              transparent
              opacity={isDark ? 0.82 : 0.65}
            />
          </mesh>
        </FloatItem>
      ))}

      {/* Upper Green Leaf Arch echoing logo canopy */}
      <FloatItem speed={1.1} rotationIntensity={0.18} floatIntensity={0.35} position={[1.1, 1.35, -0.5]}>
        <mesh rotation={[0.15, -0.1, -1.18]} scale={[0.42, 0.65, 0.42]}>
          <primitive object={leafGeometry} attach="geometry" />
          <meshPhysicalMaterial
            color="#0A8F4A"
            emissive="#00C853"
            emissiveIntensity={isDark ? 0.25 : 0.1}
            roughness={0.25}
            metalness={0.1}
            clearcoat={0.8}
            side={THREE.DoubleSide}
            transparent
            opacity={isDark ? 0.65 : 0.45}
          />
        </mesh>
      </FloatItem>

      {/* Flowing Brand Wave Ribbon + Gold Accent Line */}
      <group ref={waveRef}>
        <mesh geometry={waveGeometry}>
          <meshPhysicalMaterial
            color="#0288D1"
            roughness={0.2}
            metalness={0.25}
            clearcoat={0.9}
            transparent
            opacity={0.82}
          />
        </mesh>
        <mesh geometry={goldWaveGeometry}>
          <meshStandardMaterial
            color="#C9A66B"
            roughness={0.25}
            metalness={0.65}
            transparent
            opacity={0.75}
          />
        </mesh>
      </group>

      {/* Drifting Green & Gold Leaf Particles */}
      <group ref={leavesRef}>
        {leafParticles.map((leaf) => (
          <mesh
            key={leaf.id}
            position={leaf.pos}
            rotation={leaf.rot}
            scale={[leaf.scale, leaf.scale * 1.25, leaf.scale]}
            geometry={leafGeometry}
          >
            <meshStandardMaterial
              color={leaf.color}
              roughness={0.3}
              metalness={0.2}
              side={THREE.DoubleSide}
              transparent
              opacity={0.68}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function checkWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function HeroScene3D({ isDark, prefersReducedMotion, inView }) {
  const [webglSupported, setWebglSupported] = useState(true);
  const deviceTilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setWebglSupported(checkWebGLAvailable());
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        deviceTilt.current.x = Math.max(-1, Math.min(1, e.gamma / 35));
        deviceTilt.current.y = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
      }
    };
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [prefersReducedMotion]);

  if (!webglSupported || prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-16 start-10 w-72 h-72 rounded-full bg-[#0A5CBA]/15 blur-3xl" />
        <div className="absolute bottom-12 end-10 w-80 h-80 rounded-full bg-[#00C853]/15 blur-3xl" />
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full opacity-25 dark:opacity-35"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="190" cy="240" r="46" fill="#0A5CBA" />
          <circle cx="275" cy="225" r="22" fill="#0288D1" />
          <circle cx="330" cy="220" r="20" fill="#0A5CBA" />
          <circle cx="385" cy="225" r="18" fill="#0288D1" />
          <circle cx="435" cy="232" r="16" fill="#0A5CBA" />
          <circle cx="480" cy="238" r="14" fill="#0288D1" />
          <path
            d="M250,190 C340,95 480,95 570,165 C460,210 350,210 250,190 Z"
            fill="#0A8F4A"
          />
          <path
            d="M140,295 C280,235 440,335 610,255"
            stroke="#0288D1"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-45 dark:opacity-55" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0, 6.2], fov: 44 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={isDark ? 0.85 : 1.15} />
        <directionalLight position={[5, 6, 5]} intensity={isDark ? 1.5 : 1.8} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={1.1} color="#00C853" />
        <pointLight position={[4, 3, 2]} intensity={0.9} color="#C9A66B" />
        <BrandSculpture isDark={isDark} deviceTilt={deviceTilt} />
      </Canvas>
    </div>
  );
}
