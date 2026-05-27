import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';

/**
 * 3D gift box with animated lid opening on click.
 */
export function GiftBox3D({ onOpen }) {
  const lidRef = useRef();
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (opened || !lidRef.current) return;
    setOpened(true);

    gsap.to(lidRef.current.rotation, {
      x: -Math.PI * 0.7,
      duration: 0.8,
      ease: 'back.out(1.2)',
      onComplete: () => onOpen?.(),
    });
    gsap.to(lidRef.current.position, {
      y: 1.2,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  // Gentle idle float
  useFrame(({ clock }) => {
    if (lidRef.current && !opened) {
      lidRef.current.position.y =
        0.55 + Math.sin(clock.elapsedTime * 1.5) * 0.02;
    }
  });

  return (
    <group onClick={handleClick} style={{ cursor: 'pointer' }}>
      {/* Box body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#4a1942" />
      </mesh>
      {/* Ribbon vertical */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 1.02, 1.52]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      {/* Ribbon horizontal */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.52, 1.02, 0.12]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>

      {/* Lid */}
      <group ref={lidRef} position={[0, 0.55, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 0.2, 1.6]} />
          <meshStandardMaterial color="#2d1b4e" />
        </mesh>
        {/* Bow */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#ff8fa3" />
        </mesh>
      </group>
    </group>
  );
}

export default GiftBox3D;
