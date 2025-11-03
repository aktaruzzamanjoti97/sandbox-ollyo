'use client';

import { Fan, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
	const [activeTab, setActiveTab] = useState('light');
	const [powerOn, setPowerOn] = useState(true);
	const [speed, setSpeed] = useState(70);

	// Calculate rotation duration based on speed (0-100)
	// Speed 0 = stopped, Speed 100 = fastest rotation (0.1 seconds per rotation)
	const getRotationDuration = () => {
		if (speed === 0 || !powerOn) return 'infinite';
		// Map speed to duration with much faster rotation:
		// Speed 1 -> 2s, Speed 50 -> 0.4s, Speed 100 -> 0.1s
		const duration = Math.max(0.1, 2.01 - (speed * 0.0191));
		return `${duration}s`;
	};

	const getAnimationState = () => {
		return speed === 0 || !powerOn ? 'paused' : 'running';
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
				<div className='mt-auto'>
					<h3 className='text-sm font-medium text-gray-400 mb-3'>
						Saved Presets
					</h3>
					<p className='text-gray-500 text-sm'>Nothing added yet</p>
				</div>
			</div>

			{/* Main Canvas Area */}
			<div className='flex-1 p-6'>
				<div className='h-full flex flex-col'>
					{/* Canvas Title */}
					<h1 className='text-2xl font-medium mb-6'>Testing Canvas</h1>

					{/* Canvas Area */}
					<div className='flex-1 bg-gray-800 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center relative'>
						{activeTab === 'fan' ? (
							<>
								{/* Fan Crosshair Graphic */}
								<div className='relative'>
									<div
										className='fan-rotating'
										style={{
											'--rotation-duration': getRotationDuration(),
											'--animation-state': getAnimationState(),
										} as React.CSSProperties}
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
								<div className='absolute bottom-0 left-0 right-0  p-6 rounded-b-lg'>
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
