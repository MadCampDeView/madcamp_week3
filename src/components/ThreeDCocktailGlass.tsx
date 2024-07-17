// src/components/ThreeDCocktailGlass.tsx

'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, DirectionalLight } from 'three';
import { a, useSpring, config } from '@react-spring/three';

interface GlassProps {
  modelPath: string;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

const Glass: React.FC<GlassProps> = ({ modelPath, isHovered, setIsHovered }) => {
  const { scene } = useGLTF(modelPath);
  const glassRef = useRef<THREE.Group>(null);
  const [position, setPosition] = useState({ x: 0, y: -2.25, z: 0 });

  // Traverse the scene and apply transparency to all materials
  scene.traverse((child) => {
    if ((child as any).isMesh) {
      const mesh = child as Mesh;
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material: MeshStandardMaterial) => {
          material.transparent = true;
          material.opacity = 0.5;
        });
      } else {
        const material = mesh.material as MeshStandardMaterial;
        material.transparent = true;
        material.opacity = 0.5;
      }
    }
  });

  useFrame((state) => {
    if (glassRef.current) {
      const time = state.clock.getElapsedTime();
      const newX = Math.sin(time * 0.5) * 0.1; // Subtle X-axis movement
      const newY = Math.sin(time * 2) * 0.1; // Up and down movement
      const newZ = Math.cos(time * 0.5) * 0.1; // Subtle Z-axis movement

      setPosition({ x: newX, y: -2.25 + newY, z: newZ });

      if (!isHovered) {
        glassRef.current.rotation.y += 0.025; // Rotate slowly around the Y-axis
      } else {
        glassRef.current.rotation.y += 0.010;
      }
    }
  });

  const introProps = useSpring({
    from: { opacity: 0, scale: 0.2 },
    to: { opacity: 1, scale: 0.8 },
    config: { duration: 750, easing: (t) => t * (2 - t) }, // cubic-bezier(0.4, 0, 0.2, 1) approximation
  });

  const props = useSpring({
    scale: isHovered ? 0.82 : 0.8,
    position: [position.x, position.y, position.z], // Apply mysterious floating movement to position
    config: config.wobbly,
  });

  return (
    <a.primitive
      ref={glassRef}
      object={scene}
      position={props.position}
      scale={introProps.scale} // Use introProps scale for intro animation
      rotation={[0.1, 0, 0.1]} // Tilt the glass a bit
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      style={introProps} // Apply introProps for intro animation
    />
  );
};

interface ThreeDCocktailGlassProps {
  modelPath: string;
}

const ThreeDCocktailGlass: React.FC<ThreeDCocktailGlassProps> = ({ modelPath }) => {
  const lightRef = useRef<DirectionalLight>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Canvas
      style={{ width: '100%', height: '100vh' }}
      camera={{ position: [0, 1.5, 6], fov: 50 }} // Adjust the camera position here
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={lightRef}
        position={[0, 5, 6]} // Fixed light position
        intensity={isHovered ? 3 : 2} // Change intensity on hover
      />
      <Suspense fallback={null}>
        <Glass modelPath={modelPath} isHovered={isHovered} setIsHovered={setIsHovered} />
      </Suspense>
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default ThreeDCocktailGlass;
