import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

/**
 * Three.js star field with 5000 points.
 * Camera zooms forward on Z-axis via GSAP on mount.
 */
export function StarField({ onZoomComplete }) {
  const pointsRef = useRef();
  const { camera } = useThree();
  const hasZoomed = useRef(false);

  // Build star geometry
  const [positions, colors] = React.useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#FFB6C1'),
      new THREE.Color('#E6E6FA'),
      new THREE.Color('#c49fff'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200 - 50;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  // Camera zoom animation
  useEffect(() => {
    if (hasZoomed.current) return;
    hasZoomed.current = true;

    camera.position.set(0, 0, 50);

    gsap.to(camera.position, {
      z: -20,
      duration: 5,
      ease: 'power2.inOut',
      onComplete: () => onZoomComplete?.(),
    });
  }, [camera, onZoomComplete]);

  // Gentle rotation
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

export default StarField;
