'use client';

import { Fan, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
	const [activeTab, setActiveTab] = useState('light');
	const [powerOn, setPowerOn] = useState(true);
	const [speed, setSpeed] = useState(70);
	const [showModal, setShowModal] = useState(false);
	const [presetName, setPresetName] = useState('');
	const [savedPresets, setSavedPresets] = useState<
		Array<{ name: string; powerOn: boolean; speed: number }>
	>([]);

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

	const handleSavePreset = () => {
		// Open the modal
		setShowModal(true);
	};

	const handleSavePresetConfirm = () => {
		// Save the preset with current fan settings
		if (presetName.trim()) {
			setSavedPresets([
				...savedPresets,
				{
					name: presetName,
					powerOn: powerOn,
					speed: speed,
				},
			]);
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
	}) => {
		// Apply the preset settings
		setPowerOn(preset.powerOn);
		setSpeed(preset.speed);
	};

	const getPresetInfo = (preset: {
		name: string;
		powerOn: boolean;
		speed: number;
	}) => {
		return `${preset.powerOn ? 'ON' : 'OFF'} • ${preset.speed}% Speed`;
	};

	return (
		<div className='flex h-screen bg-gray-900 text-white font-sans'>
			{/* Left Sidebar */}
			<div className='w-64 bg-gray-800 p-6 flex flex-col'>
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
						<ul className='space-y-2'>
							{savedPresets.map((preset, index) => (
								<li
									key={index}
									onClick={() => handleSelectPreset(preset)}
									className='text-gray-300 text-sm cursor-pointer hover:text-white hover:bg-gray-700 p-2 rounded transition-colors group relative'
									title={getPresetInfo(preset)}
								>
									<div>{preset.name}</div>
									<div className='text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity'>
										{getPresetInfo(preset)}
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className='text-gray-500 text-sm'>Nothing added yet</p>
					)}
				</div>
			</div>

			{/* Main Canvas Area */}
			<div className='flex-1 p-6'>
				<div className='h-full flex flex-col'>
					{/* Canvas Title with Buttons */}
					<div className='flex justify-between items-center mb-6'>
						<h1 className='text-2xl font-medium'>
							{activeTab === 'fan' ? 'Testing Canvas' : 'Drawing Canvas'}
						</h1>
						{activeTab === 'fan' && (
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
					<div className='flex-1 bg-gray-800 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center relative'>
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
							// Placeholder for Light content
							<div className='flex flex-col items-center text-gray-500'>
								<Lightbulb size={64} />
								<p className='mt-4'>Light Control</p>
							</div>
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
