"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// A procedural 3D "Robot/Medic Drone" built with primitives so we don't need an external .glb file immediately.
// It features a floating body, a screen/eye area, and little antennas.
function ProceduralBot({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  // Bobbing and looking around animation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating/breathing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Look towards mouse when hovered, otherwise slow rotation
      if (hovered) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          (state.mouse.x * Math.PI) / 4,
          0.1
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          -(state.mouse.y * Math.PI) / 4,
          0.1
        );
      } else {
        groupRef.current.rotation.y += 0.01;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.05);
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Body / Head (Rounded Box) */}
        <mesh ref={headRef} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1, 1, 8, 8, 8]} />
          <meshStandardMaterial color={hovered ? "#F8BBD0" : "#FFFFFF"} roughness={0.1} metalness={0.2} />
        </mesh>

        {/* Screen/Faceplate */}
        <mesh position={[0, 0, 0.51]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Glowing Eyes */}
        <mesh position={[-0.2, 0.05, 0.52]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={hovered ? "#FFF" : "#64B5F6"} />
        </mesh>
        <mesh position={[0.2, 0.05, 0.52]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={hovered ? "#FFF" : "#64B5F6"} />
        </mesh>

        {/* Little smile */}
        <mesh position={[0, -0.15, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI]} />
          <meshBasicMaterial color={hovered ? "#FFF" : "#64B5F6"} />
        </mesh>

        {/* Antennas */}
        <mesh position={[-0.4, 0.6, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color="#B0BEC5" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0.4, 0.6, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color="#B0BEC5" roughness={0.4} metalness={0.8} />
        </mesh>
        
        {/* Antenna Orbs */}
        <mesh position={[-0.4, 0.75, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#F06292" emissive="#F06292" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.4, 0.75, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#F06292" emissive="#F06292" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ChatbotModel() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="w-full h-full cursor-pointer"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        {/* Soft, professional lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} intensity={0.5} angle={0.3} penumbra={1} />
        
        {/* Studio environment reflections */}
        <Environment preset="city" />

        {/* The procedurally generated bot */}
        <ProceduralBot hovered={hovered} />

        {/* Subtle drop shadow underneath the bot */}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={5} blur={2.5} far={2} />
        
        {/* Allows the user to rotate the bot slightly, but springs back */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
