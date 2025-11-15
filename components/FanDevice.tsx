import React from 'react';
import Image from 'next/image';
import { PowerToggle } from './PowerToggle';
import { RangeSlider } from './RangeSlider';
import { useFan } from '../hooks';
import { FanState } from '../hooks';

interface FanDeviceProps {
  initialState?: Partial<FanState>;
  onStateChange?: (state: FanState) => void;
}

export const FanDevice: React.FC<FanDeviceProps> = ({
  initialState,
  onStateChange
}) => {
  const {
    powerOn,
    speed,
    setPowerOn,
    setSpeed,
    getRotationDuration,
    getAnimationState,
  } = useFan(initialState);

  React.useEffect(() => {
    onStateChange?.({ powerOn, speed });
  }, [powerOn, speed, onStateChange]);

  return (
    <>
      {/* Fan Crosshair Graphic */}
      <div className='relative'>
        <div
          className='fan-rotating'
          style={
            {
              '--rotation-duration': getRotationDuration(),
              '--animation-state': getAnimationState(),
            } as React.CSSProperties
          }
        >
          <Image
            src='/fan.png'
            alt='fan'
            width={320}
            height={320}
          />
        </div>
      </div>

      {/* Power and Speed Controls */}
      <div className='absolute bottom-0 left-0 right-0 p-6 rounded-b-lg'>
        <div className='max-w-md mx-auto p-6 border border-gray-500 rounded-2xl bg-[#131B2A]'>
          <PowerToggle
            isOn={powerOn}
            onChange={setPowerOn}
          />

          <div className='mt-4'>
            <RangeSlider
              value={speed}
              onChange={setSpeed}
              label='Speed'
            />
          </div>
        </div>
      </div>
    </>
  );
};