import { useState } from 'react';

export interface FanState {
  powerOn: boolean;
  speed: number;
}

export const useFan = (initialState?: Partial<FanState>) => {
  const [powerOn, setPowerOn] = useState(initialState?.powerOn ?? true);
  const [speed, setSpeed] = useState(initialState?.speed ?? 70);

  const clear = () => {
    setPowerOn(false);
    setSpeed(0);
  };

  const getRotationDuration = () => {
    if (speed === 0 || !powerOn) return 'infinite';
    
    const duration = Math.max(0.1, 2.01 - speed * 0.0191);
    return `${duration}s`;
  };

  const getAnimationState = () => {
    return speed === 0 || !powerOn ? 'paused' : 'running';
  };

  return {
    powerOn,
    speed,
    setPowerOn,
    setSpeed,
    clear,
    getRotationDuration,
    getAnimationState,
  };
};
