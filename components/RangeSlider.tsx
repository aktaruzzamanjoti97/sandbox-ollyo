import React from 'react';

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  unit?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  label,
  showValue = true,
  unit = '%'
}) => {
  return (
    <div className='flex items-center justify-between'>
      {label && (
        <span className='text-sm font-medium text-gray-300'>{label}</span>
      )}
      <div className='flex items-center space-x-3 flex-1 ml-8'>
        <input
          type='range'
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer'
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${value}%, #374151 ${value}%, #374151 100%)`,
          }}
        />
        {showValue && (
          <span className='text-sm text-gray-300 w-12 text-right'>
            {value}{unit}
          </span>
        )}
      </div>
    </div>
  );
};