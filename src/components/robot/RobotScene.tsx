import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import Robot3D from "./Robot3D";

interface RobotSceneProps {
  active?: boolean;
}

export default function RobotScene({
  active = true,
}: RobotSceneProps) {
  return (
    <div className="h-[520px] w-[420px]">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0.2, 6]}
          fov={35}
        />

        <ambientLight intensity={0.45} />

        <directionalLight
          position={[3, 5, 4]}
          intensity={2}
        />

        <pointLight
          position={[-3, 2, 2]}
          intensity={15}
          distance={8}
          color="#c9a76a"
        />

        <pointLight
          position={[3, 1, -3]}
          intensity={8}
          distance={7}
          color="#8c7b5c"
        />

        <Float
          speed={0.7}
          rotationIntensity={0.01}
          floatIntensity={0.08}
        >
          <Robot3D active={active} />
        </Float>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}