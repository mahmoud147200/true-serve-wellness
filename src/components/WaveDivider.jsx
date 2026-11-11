import React from 'react';

export function WaveDivider({ variant = 'default', flip = false, className = '' }) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${
        flip ? 'rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-10 sm:h-14 md:h-16 preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`wave-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A5CBA" stopOpacity="0.14" />
            <stop offset="50%" stopColor="#0A8F4A" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#C9A66B" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id={`wave-line-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A5CBA" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#00C853" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C9A66B" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path
          d="M0,36 C280,84 520,0 760,38 C1000,76 1220,16 1440,42 L1440,84 L0,84 Z"
          fill={`url(#wave-grad-${variant})`}
        />
        <path
          d="M0,44 C320,4 640,78 980,32 C1190,6 1340,38 1440,26"
          stroke={`url(#wave-line-${variant})`}
          strokeWidth="1.75"
          fill="none"
        />
      </svg>
    </div>
  );
}
