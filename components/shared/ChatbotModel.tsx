"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// A sleek, professional, futuristic AI Core instead of a boxy robot.
function ProfessionalAiCore({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && coreRef.current && ring1Ref.current && ring2Ref.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Core rotation
      coreRef.current.rotation.y += 0.005;
      coreRef.current.rotation.x += 0.005;

      // Ring rotation (fast and dynamic when hovered)
      const targetSpeed = hovered ? 0.05 : 0.01;
      ring1Ref.current.rotation.x += targetSpeed;
      ring1Ref.current.rotation.y += targetSpeed * 0.5;
      
      ring2Ref.current.rotation.y -= targetSpeed;
      ring2Ref.current.rotation.z += targetSpeed * 0.5;

      // Scale pulse when hovered
      const targetScale = hovered ? 1.1 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        
        {/* Outer Glass Shell (Icosahedron) */}
        <mesh ref={coreRef} castShadow receiveShadow>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshPhysicalMaterial 
            color="#FFFFFF" 
            transmission={0.9} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.1} 
            ior={1.5} 
            thickness={2} 
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            color={hovered ? "#F48FB1" : "#81D4FA"} // Baby Blooms pink or soothing blue
            emissive={hovered ? "#C2185B" : "#0277BD"} 
            emissiveIntensity={hovered ? 2 : 1} 
            toneMapped={false}
          />
        </mesh>

        {/* Orbiting Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#B0BEC5" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Orbiting Ring 2 */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.015, 16, 100]} />
          <meshStandardMaterial color="#F06292" metalness={0.9} roughness={0.1} />
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

        {/* The professional AI Core */}
        <ProfessionalAiCore hovered={hovered} />

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
