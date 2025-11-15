import React, { useState } from 'react';

interface SavePresetModalProps {
  isVisible: boolean;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export const SavePresetModal: React.FC<SavePresetModalProps> = ({
  isVisible,
  onConfirm,
  onCancel
}) => {
  const [presetName, setPresetName] = useState('');

  const handleConfirm = () => {
    if (presetName.trim()) {
      onConfirm(presetName.trim());
      setPresetName('');
    }
  };

  const handleCancel = () => {
    setPresetName('');
    onCancel();
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-gray-800 rounded-xl p-6 w-96 shadow-2xl'>
        <h2 className='text-xl font-semibold mb-4'>Give me a name</h2>

        <input
          type='text'
          placeholder='Name it'
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          className='w-full px-4 py-2 bg-gray-700 rounded-lg mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <p className='text-gray-400 text-sm mb-6'>
          By adding this effect as a present you can reuse this
          anytime.
        </p>

        <div className='flex justify-end space-x-3'>
          <button
            onClick={handleCancel}
            className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className='px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors'
          >
            Save Preset
          </button>
        </div>
      </div>
    </div>
  );
};