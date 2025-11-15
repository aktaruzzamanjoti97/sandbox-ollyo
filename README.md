# Sandbox-Ollyo

A modern, interactive device control application built with Next.js and TypeScript. This application provides a clean interface for controlling fan and light devices with preset management functionality.

## 🚀 Features

- **Device Control**: Interactive controls for fan speed and light brightness/color temperature
- **Preset Management**: Save and load device configurations as presets
- **Modern UI**: Clean, responsive design with smooth animations
- **Real-time Updates**: Live device state changes with visual feedback
- **TypeScript**: Full type safety and better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **State Management**: Custom React Hooks

## 📁 Project Structure

```
sandbox-ollyo/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application page
├── components/            # Reusable UI components
│   ├── FanDevice.tsx      # Fan control component
│   ├── LightDevice.tsx    # Light control component
│   ├── PowerToggle.tsx    # Power switch component
│   ├── RangeSlider.tsx    # Custom range slider
│   ├── SavePresetModal.tsx # Preset save dialog
│   ├── Sidebar.tsx        # Navigation and presets sidebar
│   ├── Toast.tsx          # Notification component
│   └── index.ts           # Component exports
├── hooks/                 # Custom React hooks
│   ├── useFan.ts          # Fan state management
│   ├── useLight.ts        # Light state management
│   ├── usePresets.ts      # Preset management
│   └── index.ts           # Hook exports
├── utils/                 # Utility functions
│   └── styles.tsx         # Global styles
└── public/                # Static assets
    ├── fan.png            # Fan image asset
    ├── lightOff.png       # Light off state image
    └── lightTo.png        # Light on state image
```

## 🏗️ Architecture

The application follows a modular architecture with clear separation of concerns:

### Components
- **Reusable UI Components**: Extracted common UI elements like toggles and sliders
- **Device-Specific Components**: Dedicated components for fan and light devices
- **Presentational Components**: Layout and UI-only components

### Custom Hooks
- **useFan**: Manages fan state (power, speed, animations)
- **useLight**: Manages light state (power, brightness, color temperature)
- **usePresets**: Handles preset creation, storage, and retrieval

### State Management
- Local component state for UI interactions
- Custom hooks for device-specific logic
- Preset system for saving/loading device configurations

## 🎯 Key Components

### Device Control
- **Fan Control**: Adjustable speed (0-100%) with animated rotation
- **Light Control**: Brightness (0-100%) and color temperature settings
- **Power Management**: Individual power controls for each device

### Preset System
- **Save Presets**: Store current device configurations
- **Load Presets**: Apply saved configurations to devices
- **Visual Feedback**: Toast notifications for user actions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sandbox-ollyo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- Custom hooks for state management
- Component composition over inheritance

## 📦 Build and Deploy

### Build for Production

```bash
npm run build
```

### Deploy on Vercel

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically

For other deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev/)