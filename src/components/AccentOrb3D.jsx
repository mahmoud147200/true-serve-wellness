import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingEmblem({ isDark }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const leafRef = useRef();

  const leafGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.9);
    shape.bezierCurveTo(0.75, -0.4, 0.85, 0.4, 0, 1.05);
    shape.bezierCurveTo(-0.85, 0.4, -0.75, -0.4, 0, -0.9);
    return new THREE.ShapeGeometry(shape, 16);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.45 + state.pointer.x * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.15 - state.pointer.y * 0.25;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = -0.1 + Math.sin(t * 1.6) * 0.08;
    }
    if (leafRef.current) {
      leafRef.current.position.y = 0.55 + Math.cos(t * 1.4) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Glossy Blue Sphere */}
      <mesh ref={sphereRef} position={[-0.35, -0.1, 0]}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshPhysicalMaterial
          color="#0A5CBA"
          roughness={0.12}
          metalness={0.2}
          clearcoat={1}
          emissive={isDark ? '#0288D1' : '#000000'}
          emissiveIntensity={isDark ? 0.25 : 0.05}
        />
      </mesh>

      {/* Orbiting Spine Mini-Spheres */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 1.2 - 0.3;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 1.25,
              Math.sin(angle) * 0.55 - 0.15,
              Math.sin(angle) * 0.6,
            ]}
          >
            <sphereGeometry args={[0.18 - i * 0.02, 20, 20]} />
            <meshPhysicalMaterial color="#0288D1" roughness={0.15} clearcoat={1} />
          </mesh>
        );
      })}

      {/* Floating Green Leaf Canopy */}
      <mesh
        ref={leafRef}
        geometry={leafGeo}
        position={[0.35, 0.55, 0.15]}
        rotation={[0.2, 0.3, -0.95]}
        scale={[0.75, 0.95, 0.75]}
      >
        <meshPhysicalMaterial
          color="#0A8F4A"
          emissive="#00C853"
          emissiveIntensity={0.2}
          roughness={0.2}
          clearcoat={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gold Halo Ring */}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[1.42, 0.025, 16, 64]} />
        <meshStandardMaterial color="#C9A66B" metalness={0.75} roughness={0.25} />
      </mesh>
    </group>
  );
}

export default function AccentOrb3D({ isDark, inView }) {
  return (
    <div className="w-full h-56 sm:h-64 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 4]} intensity={1.6} />
        <pointLight position={[-3, -2, 3]} intensity={1} color="#00C853" />
        <FloatingEmblem isDark={isDark} />
      </Canvas>
    </div>
  );
}
