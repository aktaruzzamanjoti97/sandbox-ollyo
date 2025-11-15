import React from 'react';

interface PowerToggleProps {
  isOn: boolean;
  onChange: (isOn: boolean) => void;
  label?: string;
}

export const PowerToggle: React.FC<PowerToggleProps> = ({
  isOn,
  onChange,
  label = 'Power'
}) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-sm font-medium text-gray-300'>{label}</span>
      <button
        onClick={() => onChange(!isOn)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isOn ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};