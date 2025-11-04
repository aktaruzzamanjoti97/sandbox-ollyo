'use client';

import { Fan, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
	const [activeTab, setActiveTab] = useState('');
	const [powerOn, setPowerOn] = useState(true);
	const [speed, setSpeed] = useState(70);
	const [showModal, setShowModal] = useState(false);
	const [presetName, setPresetName] = useState('');
	const [savedPresets, setSavedPresets] = useState<
		Array<{
			name: string;
			powerOn: boolean;
			speed: number;
			brightness?: number;
			colorTemp?: string;
		}>
	>([]);

	// Light specific states
	const [lightPowerOn, setLightPowerOn] = useState(true);
	const [brightness, setBrightness] = useState(70);
	const [colorTemp, setColorTemp] = useState('warm');

	// Calculate rotation duration based on speed (0-100)
	// Speed 0 = stopped, Speed 100 = fastest rotation (0.1 seconds per rotation)
	const getRotationDuration = () => {
		if (speed === 0 || !powerOn) return 'infinite';
		// Map speed to duration with much faster rotation:
		// Speed 1 -> 2s, Speed 50 -> 0.4s, Speed 100 -> 0.1s
		const duration = Math.max(0.1, 2.01 - speed * 0.0191);
		return `${duration}s`;
	};

	const getAnimationState = () => {
		return speed === 0 || !powerOn ? 'paused' : 'running';
	};

	const handleClear = () => {
		// Reset fan settings
		setPowerOn(false);
		setSpeed(0);
	};

	const handleLightClear = () => {
		// Reset light settings
		setLightPowerOn(false);
		setBrightness(0);
	};

	const handleSavePreset = () => {
		// Open the modal
		setShowModal(true);
	};

	const handleSavePresetConfirm = () => {
		// Save the preset with current device settings
		if (presetName.trim()) {
			if (activeTab === 'fan') {
				setSavedPresets([
					...savedPresets,
					{
						name: presetName,
						powerOn: powerOn,
						speed: speed,
					},
				]);
			} else {
				setSavedPresets([
					...savedPresets,
					{
						name: presetName,
						powerOn: lightPowerOn,
						speed: 0,
						brightness: brightness,
						colorTemp: colorTemp,
					},
				]);
			}
			setPresetName('');
			setShowModal(false);
		}
	};

	const handleCancel = () => {
		// Close the modal without saving
		setPresetName('');
		setShowModal(false);
	};

	const handleSelectPreset = (preset: {
		name: string;
		powerOn: boolean;
		speed: number;
		brightness?: number;
		colorTemp?: string;
	}) => {
		// Apply the preset settings
		if (preset.speed > 0) {
			// This is a fan preset
			setActiveTab('fan');
			setPowerOn(preset.powerOn);
			setSpeed(preset.speed);
		} else {
			// This is a light preset
			setActiveTab('light');
			setLightPowerOn(preset.powerOn);
			if (preset.brightness !== undefined) setBrightness(preset.brightness);
			if (preset.colorTemp !== undefined) setColorTemp(preset.colorTemp);
		}
	};

	const getPresetInfo = (preset: {
		name: string;
		powerOn: boolean;
		speed: number;
		brightness?: number;
		colorTemp?: string;
	}) => {
		if (preset.speed > 0) {
			return `${preset.powerOn ? 'ON' : 'OFF'} • ${preset.speed}% Speed`;
		} else {
			return `${preset.powerOn ? 'ON' : 'OFF'} • ${
				preset.brightness
			}% Brightness`;
		}
	};

	const getLightShadow = () => {
		if (!lightPowerOn || brightness === 0) return {};

		// Calculate shadow intensity based on brightness (0-100)
		const shadowIntensity = brightness / 100;
		const shadowSize = 20 + shadowIntensity * 80; // 20px to 100px (more dramatic increase)
		const shadowOpacity = 0.2 + shadowIntensity * 0.7; // 0.2 to 0.9 (brighter shadow)

		// Get shadow color based on color temperature
		let shadowColor;
		switch (colorTemp) {
			case 'warm':
				shadowColor = `251, 146, 60`; // orange-400
				break;
			case 'neutral':
				shadowColor = `253, 224, 71`; // yellow-300
				break;
			case 'cool':
				shadowColor = `147, 197, 253`; // blue-300
				break;
			case 'daylight':
				shadowColor = `59, 130, 246`; // blue-500
				break;
			default:
				shadowColor = `251, 146, 60`;
		}

		return {
			boxShadow: `
				0 0 ${shadowSize}px rgba(${shadowColor}, ${shadowOpacity}),
				0 0 ${shadowSize * 1.5}px rgba(${shadowColor}, ${shadowOpacity * 0.6}),
				0 0 ${shadowSize * 2}px rgba(${shadowColor}, ${shadowOpacity * 0.3})
			`,
		};
	};

	return (
		<div className='flex h-screen bg-gray-900 text-white font-sans'>
			{/* Left Sidebar */}
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
						onClick={() => setActiveTab('light')}
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
						onClick={() => setActiveTab('fan')}
					>
						<Fan size={20} className='mr-3' />
						<span>Fan</span>
					</button>
				</div>

				{/* Saved Presets Section */}
				<div className=''>
					<h3 className='text-sm font-medium text-gray-400 mb-3'>
						Saved Presets
					</h3>
					{savedPresets.length > 0 ? (
						<div className='space-y-2'>
							{savedPresets.map((preset, index) => (
								<button
									key={index}
									onClick={() => handleSelectPreset(preset)}
									className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
										false
											? 'bg-gray-700 text-white border-l-4 border-blue-500 shadow-md'
											: 'text-gray-400 hover:bg-gray-700'
									}`}
								>
									{preset.speed > 0 ? (
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
									onClick={
										activeTab === 'fan' ? handleClear : handleLightClear
									}
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
							<>
								{/* Fan Crosshair Graphic */}
								<div className='relative'>
									<div
										className='fan-rotating'
										style={
											{
												'--rotation-duration':
													getRotationDuration(),
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
									<div className='max-w-md mx-auto bg-gray-900 p-6 border border-gray-500 rounded-2xl'>
										{/* Power Toggle */}
										<div className='flex items-center justify-between mb-4'>
											<span className='text-sm font-medium text-gray-300'>
												Power
											</span>
											<button
												onClick={() => setPowerOn(!powerOn)}
												className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
													powerOn ? 'bg-blue-600' : 'bg-gray-600'
												}`}
											>
												<span
													className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
														powerOn
															? 'translate-x-6'
															: 'translate-x-1'
													}`}
												/>
											</button>
										</div>

										{/* Speed Slider */}
										<div className='flex items-center justify-between'>
											<span className='text-sm font-medium text-gray-300'>
												Speed
											</span>
											<div className='flex items-center space-x-3 flex-1 ml-8'>
												<input
													type='range'
													min='0'
													max='100'
													value={speed}
													onChange={(e) =>
														setSpeed(Number(e.target.value))
													}
													className='flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer'
													style={{
														background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${speed}%, #374151 ${speed}%, #374151 100%)`,
													}}
												/>
												<span className='text-sm text-gray-300 w-12 text-right'>
													{speed}%
												</span>
											</div>
										</div>
									</div>
								</div>
							</>
						) : activeTab === 'light' ? (
							<>
								{/* 3D Light Sphere */}

								<div className='relative w-64 h-49 flex items-center justify-center'>
									{lightPowerOn ? (
										<div
											style={getLightShadow()}
											className='rounded-full'
										>
											<Image
												src='/lightTo.png'
												alt='light to'
												width={128}
												height={196}
												className='bg-transparent'
												style={{
													filter: `brightness(1.2) contrast(1.1) ${
														brightness > 50
															? ''
															: 'brightness(0.8)'
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
									<div className='max-w-md mx-auto bg-gray-900 p-6 border border-gray-500 rounded-2xl'>
										{/* Power Toggle */}
										<div className='flex items-center justify-between mb-4'>
											<span className='text-sm font-medium text-gray-300'>
												Power
											</span>
											<button
												onClick={() =>
													setLightPowerOn(!lightPowerOn)
												}
												className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
													lightPowerOn
														? 'bg-blue-600'
														: 'bg-gray-600'
												}`}
											>
												<span
													className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
														lightPowerOn
															? 'translate-x-6'
															: 'translate-x-1'
													}`}
												/>
											</button>
										</div>

										{/* Color Temperature */}
										<div className='mb-4'>
											<span className='text-sm font-medium text-gray-300 block mb-2'>
												Color Temperature
											</span>
											<div className='flex space-x-2'>
												<button
													onClick={() => setColorTemp('warm')}
													className={`w-12 h-12 rounded-lg ${
														colorTemp === 'warm'
															? 'ring-2 ring-blue-500'
															: ''
													}`}
												>
													<div className='w-full h-full bg-orange-400 rounded-lg'></div>
												</button>
												<button
													onClick={() => setColorTemp('neutral')}
													className={`w-12 h-12 rounded-lg ${
														colorTemp === 'neutral'
															? 'ring-2 ring-blue-500'
															: ''
													}`}
												>
													<div className='w-full h-full bg-yellow-300 rounded-lg'></div>
												</button>
												<button
													onClick={() => setColorTemp('cool')}
													className={`w-12 h-12 rounded-lg ${
														colorTemp === 'cool'
															? 'ring-2 ring-blue-500'
															: ''
													}`}
												>
													<div className='w-full h-full bg-blue-300 rounded-lg'></div>
												</button>
												<button
													onClick={() => setColorTemp('daylight')}
													className={`w-12 h-12 rounded-lg ${
														colorTemp === 'daylight'
															? 'ring-2 ring-blue-500'
															: ''
													}`}
												>
													<div className='w-full h-full bg-blue-500 rounded-lg'></div>
												</button>
											</div>
										</div>

										{/* Brightness Slider */}
										<div className='flex items-center justify-between'>
											<span className='text-sm font-medium text-gray-300'>
												Brightness
											</span>
											<div className='flex items-center space-x-3 flex-1 ml-8'>
												<input
													type='range'
													min='0'
													max='100'
													value={brightness}
													onChange={(e) =>
														setBrightness(Number(e.target.value))
													}
													className='flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer'
													style={{
														background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${brightness}%, #374151 ${brightness}%, #374151 100%)`,
													}}
												/>
												<span className='text-sm text-gray-300 w-12 text-right'>
													{brightness}%
												</span>
											</div>
										</div>
									</div>
								</div>
							</>
						) : (
							// Default Fallback
							<p className='text-gray-500 text-lg'>Drag anything here</p>
						)}
					</div>
				</div>
			</div>

			{/* Save Preset Modal */}
			{showModal && (
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
								onClick={handleSavePresetConfirm}
								className='px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors'
							>
								Save Preset
							</button>
						</div>
					</div>
				</div>
			)}

			<style jsx>{`
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
