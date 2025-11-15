import React from 'react';
import { Fan, Lightbulb } from 'lucide-react';
import { Preset } from '../hooks';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onPresetSelect: (preset: Preset) => void;
  presets: Preset[];
  getPresetInfo: (preset: Preset) => string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onPresetSelect,
  presets,
  getPresetInfo
}) => {

  return (
    <div className='w-64 bg-[#101828] p-6 flex flex-col'>
      <h2 className='text-xl font-semibold mb-6'>Devices</h2>

      {/* Navigation Options */}
      <div className='mb-8'>
        <button
          className={`flex items-center w-full p-3 rounded-lg mb-2 transition-all duration-200 ${
            activeTab === 'light'
              ? 'bg-gray-700 text-white border-l-4 border-blue-500 shadow-md'
              : 'text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => onTabChange('light')}
        >
          <Lightbulb size={20} className='mr-3' />
          <span>Light</span>
        </button>
        <button
          className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
            activeTab === 'fan'
              ? 'bg-gray-700 text-white border-l-4 border-blue-500 shadow-md'
              : 'text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => onTabChange('fan')}
        >
          <Fan size={20} className='mr-3' />
          <span>Fan</span>
        </button>
      </div>

      {/* Saved Presets Section */}
      <div className='flex-1'>
        <h3 className='text-sm font-medium text-gray-400 mb-3'>
          Saved Presets
        </h3>
        {presets.length > 0 ? (
          <div className='space-y-2'>
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => onPresetSelect(preset)}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 text-gray-400 hover:bg-gray-700`}
              >
                {preset.type === 'fan' ? (
                  <Fan size={20} className='mr-3' />
                ) : (
                  <Lightbulb size={20} className='mr-3' />
                )}
                <div className='flex flex-col items-start'>
                  <span className='text-sm'>{preset.name}</span>
                  <span className='text-xs text-gray-500'>
                    {getPresetInfo(preset)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className='text-gray-500 text-sm'>Nothing added yet</p>
        )}
      </div>
    </div>
  );
};