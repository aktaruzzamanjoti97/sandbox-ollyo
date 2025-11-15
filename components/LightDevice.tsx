import React from 'react';
import Image from 'next/image';
import { PowerToggle } from './PowerToggle';
import { RangeSlider } from './RangeSlider';
import { useLight, ColorTemperature } from '../hooks';
import { LightState } from '../hooks';

interface LightDeviceProps {
  initialState?: Partial<LightState>;
  onStateChange?: (state: LightState) => void;
}

const colorOptions: Record<ColorTemperature, { bg: string }> = {
  warm: { bg: 'bg-[#FFE5B4]' },
  neutral: { bg: 'bg-[#F0F8FF]' },
  cool: { bg: 'bg-[#87CEEB]' },
  daylight: { bg: 'bg-[#FFB6C1]' },
};

const colorShadowMap: Record<ColorTemperature, string> = {
  warm: '255, 229, 180',
  neutral: '240, 248, 255',
  cool: '135, 206, 235',
  daylight: '255, 182, 193',
};

export const LightDevice: React.FC<LightDeviceProps> = ({
  initialState,
  onStateChange
}) => {
  const {
    powerOn,
    brightness,
    colorTemp,
    setPowerOn,
    setBrightness,
    setColorTemp,
  } = useLight(initialState);

  React.useEffect(() => {
    onStateChange?.({ powerOn, brightness, colorTemp });
  }, [powerOn, brightness, colorTemp, onStateChange]);

  const getLightShadow = () => {
    if (!powerOn || brightness === 0) return {};

    const shadowIntensity = brightness / 100;
    const shadowSize = 20 + shadowIntensity * 80;
    const shadowOpacity = 0.2 + shadowIntensity * 0.7;
    const shadowColor = colorShadowMap[colorTemp];

    return {
      boxShadow: `
        0 0 ${shadowSize}px rgba(${shadowColor}, ${shadowOpacity}),
        0 0 ${shadowSize * 1.5}px rgba(${shadowColor}, ${shadowOpacity * 0.6}),
        0 0 ${shadowSize * 2}px rgba(${shadowColor}, ${shadowOpacity * 0.3})
      `,
    };
  };

  return (
    <>
      {/* 3D Light Sphere */}
      <div className='relative w-64 h-49 flex items-center justify-center'>
        {powerOn ? (
          <div style={getLightShadow()} className='rounded-full'>
            <Image
              src='/lightTo.png'
              alt='light to'
              width={128}
              height={196}
              className='bg-transparent'
              style={{
                filter: `brightness(1.2) contrast(1.1) ${
                  brightness > 50 ? '' : 'brightness(0.8)'
                }`,
                mixBlendMode: 'screen',
              }}
            />
          </div>
        ) : (
          <div>
            <Image
              src='/lightOff.png'
              alt='light off'
              width={128}
              height={196}
            />
          </div>
        )}
      </div>

      {/* Light Controls */}
      <div className='absolute bottom-0 left-0 right-0 p-6 rounded-b-lg'>
        <div className='max-w-md mx-auto bg-[#131B2A] p-6 border border-gray-500 rounded-2xl'>
          <PowerToggle
            isOn={powerOn}
            onChange={setPowerOn}
          />

          {/* Color Temperature */}
          <div className='mb-4'>
            <span className='text-sm font-medium text-gray-300 block mb-2'>
              Color Temperature
            </span>
            <div className='flex space-x-2'>
              {(Object.keys(colorOptions) as ColorTemperature[]).map((temp) => (
                <button
                  key={temp}
                  onClick={() => setColorTemp(temp)}
                  className={`w-12 h-12 rounded-lg ${
                    colorTemp === temp ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className={`w-full h-full ${colorOptions[temp].bg} rounded-lg`}></div>
                </button>
              ))}
            </div>
          </div>

          <RangeSlider
            value={brightness}
            onChange={setBrightness}
            label='Brightness'
          />
        </div>
      </div>
    </>
  );
};