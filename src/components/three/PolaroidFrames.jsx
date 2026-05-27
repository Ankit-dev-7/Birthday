import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursorPosition } from '../../hooks/useCursorPosition';
import * as THREE from 'three';

const POLAROID_POSITIONS = [
  [-4, 2, -10],
  [4, -1, -12],
  [-2, -3, -8],
  [5, 3, -15],
  [-5, 0, -14],
  [1, 4, -11],
  [3, -3, -9],
  [-3, 3, -13],
];

/**
 * Floating polaroid-style photo frames in 3D space.
 * Mouse movement applies parallax offset via useFrame.
 */
export function PolaroidFrames() {
  const groupRef = useRef();
  const cursor = useCursorPosition(0.05);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    // Map cursor to subtle rotation
    const nx = (cursor.x / window.innerWidth - 0.5) * 0.3;
    const ny = (cursor.y / window.innerHeight - 0.5) * 0.2;

    targetRotation.current.x += (ny - targetRotation.current.x) * 0.05;
    targetRotation.current.y += (nx - targetRotation.current.y) * 0.05;

    groupRef.current.rotation.x = targetRotation.current.x;
    groupRef.current.rotation.y = targetRotation.current.y;
  });

  return (
    <group ref={groupRef}>
      {POLAROID_POSITIONS.map((pos, i) => (
        <PolaroidFrame key={i} position={pos} index={i} />
      ))}
    </group>
  );
}

function PolaroidFrame({ position, index }) {
  const meshRef = useRef();
  const floatOffset = index * 0.8;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.5 + floatOffset) * 0.3;
    meshRef.current.rotation.z =
      Math.sin(clock.elapsedTime * 0.3 + floatOffset) * 0.05;
  });

  // Polaroid: white frame + photo area
  return (
    <group ref={meshRef} position={position}>
      {/* White polaroid border */}
      <mesh>
        <planeGeometry args={[1.8, 2.2]} />
        <meshBasicMaterial color="#f8f0ff" transparent opacity={0.9} />
      </mesh>
      {/* Photo area (slightly inset) */}
      <mesh position={[0, 0.15, 0.01]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial color="#2d1b4e" transparent opacity={0.8} />
      </mesh>
      {/* Heart decoration */}
      <mesh position={[0, -0.7, 0.02]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshBasicMaterial color="#FFB6C1" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default PolaroidFrames;
