'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SpreadEffect from './SpreadEffect';

interface TransitionContextProps {
  triggerTransition: (color: string, x: number, y: number, targetUrl: string) => void;
}

const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [spreadParams, setSpreadParams] = useState<{ color: string; x: number; y: number } | null>(null);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const router = useRouter();

  const triggerTransition = useCallback((color: string, x: number, y: number, url: string) => {
    setSpreadParams({ color, x, y });
    setTargetUrl(url);
  }, []);

  const handleAnimationEnd = () => {
    if (targetUrl) {
      router.push(targetUrl);
      setTargetUrl(null);
    }
    setTimeout(() => {
      setSpreadParams(null);
    }, 100); // Slight delay to ensure navigation starts before removing the effect
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {spreadParams && (
        <SpreadEffect
          color={spreadParams.color}
          x={spreadParams.x}
          y={spreadParams.y}
          onAnimationEnd={handleAnimationEnd}
        />
      )}
    </TransitionContext.Provider>
  );
};
