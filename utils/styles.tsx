export const GlobalStyles = () => (
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
);