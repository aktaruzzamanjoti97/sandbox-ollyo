import { useState } from 'react';
import { FanState, LightState, ColorTemperature } from './index';

export type Preset = {
  name: string;
  powerOn: boolean;
  speed: number;
  brightness?: number;
  colorTemp?: ColorTemperature;
  type: 'fan' | 'light';
};

export const usePresets = () => {
  const [presets, setPresets] = useState<Preset[]>([]);

  const savePreset = (
    name: string,
    deviceState: FanState | LightState,
    type: 'fan' | 'light'
  ) => {
    const preset: Preset = {
      name,
      powerOn: deviceState.powerOn,
      speed: type === 'fan' ? (deviceState as FanState).speed : 0,
      brightness: type === 'light' ? (deviceState as LightState).brightness : undefined,
      colorTemp: type === 'light' ? (deviceState as LightState).colorTemp : undefined,
      type,
    };

    setPresets([...presets, preset]);
  };

  const deletePreset = (index: number) => {
    setPresets(presets.filter((_, i) => i !== index));
  };

  const getPresetInfo = (preset: Preset) => {
    if (preset.type === 'fan') {
      return `${preset.powerOn ? 'ON' : 'OFF'} • ${preset.speed}% Speed`;
    } else {
      return `${preset.powerOn ? 'ON' : 'OFF'} • ${preset.brightness}% Brightness`;
    }
  };

  return {
    presets,
    savePreset,
    deletePreset,
    getPresetInfo,
  };
};