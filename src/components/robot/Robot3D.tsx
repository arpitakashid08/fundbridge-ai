import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface Robot3DProps {
  active?: boolean;
}

export default function Robot3D({ active = true }: Robot3DProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.18;

    group.current.position.y =
      Math.sin(Date.now() * 0.0007) * 0.04;
  });

  return (
    <group
      ref={group}
      scale={active ? 1.7 : 1.5}
      position={[0, -1.3, 0]}
    >
      {/* HEAD */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.72, 48, 48]} />
        <meshStandardMaterial
          color="#77736b"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* FACE */}
      <mesh position={[0, 1.2, 0.65]}>
        <sphereGeometry args={[0.57, 48, 48]} />
        <meshStandardMaterial
          color="#171717"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* LEFT EYE */}
      <mesh position={[-0.2, 1.35, 1.03]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial
          color="#d4b579"
          emissive="#8c6d38"
          emissiveIntensity={active ? 1.5 : 0.5}
        />
      </mesh>

      {/* RIGHT EYE */}
      <mesh position={[0.2, 1.35, 1.03]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial
          color="#d4b579"
          emissive="#8c6d38"
          emissiveIntensity={active ? 1.5 : 0.5}
        />
      </mesh>

      {/* NECK */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.35, 32]} />
        <meshStandardMaterial
          color="#3a3936"
          metalness={0.95}
          roughness={0.3}
        />
      </mesh>

      {/* BODY */}
      <mesh position={[0, -0.1, 0]}>
        <capsuleGeometry args={[0.7, 1.25, 16, 32]} />
        <meshStandardMaterial
          color="#3f3d39"
          metalness={0.95}
          roughness={0.28}
        />
      </mesh>

      {/* CHEST CORE */}
      <mesh position={[0, 0.05, 0.66]}>
        <cylinderGeometry args={[0.18, 0.18, 0.06, 32]} />
        <meshStandardMaterial
          color="#b3955b"
          emissive="#6f5429"
          emissiveIntensity={active ? 0.7 : 0.2}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* LEFT ARM */}
      <mesh
        position={[-0.85, -0.1, 0]}
        rotation={[0, 0, -0.12]}
      >
        <capsuleGeometry args={[0.18, 1.25, 12, 24]} />
        <meshStandardMaterial
          color="#30302d"
          metalness={0.95}
          roughness={0.3}
        />
      </mesh>

      {/* RIGHT ARM */}
      <mesh
        position={[0.85, -0.1, 0]}
        rotation={[0, 0, 0.12]}
      >
        <capsuleGeometry args={[0.18, 1.25, 12, 24]} />
        <meshStandardMaterial
          color="#30302d"
          metalness={0.95}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
