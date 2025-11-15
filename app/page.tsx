'use client';

import { useState, useCallback } from 'react';
import {
    FanDevice,
    LightDevice,
    Toast,
    SavePresetModal,
    Sidebar,
} from '../components';
import { useFan, useLight, usePresets, FanState, LightState, Preset } from '../hooks';

export default function Home() {
    const [activeTab, setActiveTab] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Device state hooks
    const fanHook = useFan({ powerOn: true, speed: 70 });
    const lightHook = useLight({ powerOn: true, brightness: 70, colorTemp: 'warm' });

    // Preset management
    const { presets, savePreset, getPresetInfo } = usePresets();

    // Keep track of current device states for presets
    const [fanState, setFanState] = useState<FanState>({ powerOn: true, speed: 70 });
    const [lightState, setLightState] = useState<LightState>({
        powerOn: true,
        brightness: 70,
        colorTemp: 'warm'
    });

    const handleClear = useCallback(() => {
        if (activeTab === 'fan') {
            fanHook.clear();
        } else if (activeTab === 'light') {
            lightHook.clear();
        }
    }, [activeTab, fanHook, lightHook]);

    const handleSavePreset = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleSavePresetConfirm = useCallback((name: string) => {
        if (activeTab === 'fan') {
            savePreset(name, fanState, 'fan');
        } else if (activeTab === 'light') {
            savePreset(name, lightState, 'light');
        }

        setToastMessage(`Preset "${name}" saved`);
        setShowToast(true);
        setShowModal(false);
    }, [activeTab, fanState, lightState, savePreset]);

    const handleToastHide = useCallback(() => {
        setShowToast(false);
    }, []);

    const handlePresetSelect = useCallback((preset: Preset) => {
        setActiveTab(preset.type);

        if (preset.type === 'fan') {
            fanHook.setPowerOn(preset.powerOn);
            fanHook.setSpeed(preset.speed);
        } else if (preset.type === 'light') {
            lightHook.setPowerOn(preset.powerOn);
            if (preset.brightness !== undefined) {
                lightHook.setBrightness(preset.brightness);
            }
            if (preset.colorTemp !== undefined) {
                lightHook.setColorTemp(preset.colorTemp);
            }
        }
    }, [fanHook, lightHook]);

    const handleFanStateChange = useCallback((state: FanState) => {
        setFanState(state);
    }, []);

    const handleLightStateChange = useCallback((state: LightState) => {
        setLightState(state);
    }, []);

    return (
        <div className='flex h-screen bg-gray-900 text-white font-sans'>
            <Sidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onPresetSelect={handlePresetSelect}
                presets={presets}
                getPresetInfo={getPresetInfo}
            />

            {/* Main Canvas Area */}
            <div className='flex-1 p-6 bg-[#030712]'>
                <div className='h-full flex flex-col'>
                    {/* Canvas Title with Buttons */}
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-medium'>
                            {activeTab === 'fan' ? 'Testing Canvas' : '3D Canvas'}
                        </h1>
                        {activeTab && (
                            <div className='flex space-x-3'>
                                <button
                                    onClick={handleClear}
                                    className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleSavePreset}
                                    className='px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors'
                                >
                                    Save Preset
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Canvas Area */}
                    <div className='flex-1 bg-[#0A101D] rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center relative'>
                        {activeTab === 'fan' ? (
                            <FanDevice
                                initialState={{ powerOn: true, speed: 70 }}
                                onStateChange={handleFanStateChange}
                            />
                        ) : activeTab === 'light' ? (
                            <LightDevice
                                initialState={{ powerOn: true, brightness: 70, colorTemp: 'warm' }}
                                onStateChange={handleLightStateChange}
                            />
                        ) : (
                            <p className='text-gray-500 text-lg'>Drag anything here</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Save Preset Modal */}
            <SavePresetModal
                isVisible={showModal}
                onConfirm={handleSavePresetConfirm}
                onCancel={() => setShowModal(false)}
            />

            {/* Toast Notification */}
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onHide={handleToastHide}
            />

            <style jsx global>{`
                .fan-rotating {
                    animation: rotate var(--rotation-duration) linear infinite;
                    animation-play-state: var(--animation-state);
                }

                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes slide-up {
                    0% {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }

                input[type='range']::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #3b82f6;
                    border-radius: 50%;
                    cursor: pointer;
                }

                input[type='range']::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #3b82f6;
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                }
            `}</style>
        </div>
    );
}