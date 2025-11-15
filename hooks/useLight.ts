import { useState } from 'react';

export type ColorTemperature = 'warm' | 'neutral' | 'cool' | 'daylight';

export interface LightState {
  powerOn: boolean;
  brightness: number;
  colorTemp: ColorTemperature;
}

export const useLight = (initialState?: Partial<LightState>) => {
  const [powerOn, setPowerOn] = useState(initialState?.powerOn ?? true);
  const [brightness, setBrightness] = useState(initialState?.brightness ?? 70);
  const [colorTemp, setColorTemp] = useState<ColorTemperature>(
    initialState?.colorTemp ?? 'warm'
  );

  const clear = () => {
    setPowerOn(false);
    setBrightness(0);
  };

  return {
    powerOn,
    brightness,
    colorTemp,
    setPowerOn,
    setBrightness,
    setColorTemp,
    clear,
  };
};