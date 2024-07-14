// components/SpreadEffect.tsx
'use client';

import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const SpreadEffectContainer = styled.div<{ color: string; x: number; y: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ color }) => color};
  z-index: 1000;
  animation: spreadEffect 1s forwards; /* Set the animation duration here */
  clip-path: circle(0% at ${({ x, y }) => `${x}px ${y}px`});

  @keyframes spreadEffect {
    0% {
      clip-path: circle(0% at ${({ x, y }) => `${x}px ${y}px`});
    }
    100% {
      clip-path: circle(150% at ${({ x, y }) => `${x}px ${y}px`});
    }
  }
`;

interface SpreadEffectProps {
  color: string;
  x: number;
  y: number;
  onAnimationEnd: () => void;
}

const SpreadEffect: React.FC<SpreadEffectProps> = ({ color, x, y, onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onAnimationEnd, 500); // Trigger 100ms before the animation ends
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return <SpreadEffectContainer color={color} x={x} y={y} />;
};

export default SpreadEffect;
