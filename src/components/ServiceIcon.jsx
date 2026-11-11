import React from 'react';
import {
  Activity,
  Flame,
  Sparkles,
  Droplets,
  Hand,
  Bone,
  HeartHandshake,
  Leaf,
  Footprints,
  Compass,
  CircleDot,
  AlignCenter,
  Feather,
  Gem,
  StretchHorizontal,
  Dumbbell,
  UserCheck,
  Brain,
  Sun,
  Flower2,
  ShieldCheck,
  Smile,
  HeartPulse,
  RefreshCw,
  MessageCircle,
  ClipboardCheck,
  Sliders,
  Layers,
  Heart,
} from 'lucide-react';

const iconMap = {
  activity: Activity,
  flame: Flame,
  sparkles: Sparkles,
  droplets: Droplets,
  hand: Hand,
  bone: Bone,
  'heart-handshake': HeartHandshake,
  leaf: Leaf,
  footprints: Footprints,
  compass: Compass,
  'circle-dot': CircleDot,
  'align-center': AlignCenter,
  feather: Feather,
  gem: Gem,
  'stretch-horizontal': StretchHorizontal,
  dumbbell: Dumbbell,
  'user-check': UserCheck,
  brain: Brain,
  sun: Sun,
  'flower-2': Flower2,
  'shield-check': ShieldCheck,
  smile: Smile,
  'heart-pulse': HeartPulse,
  'refresh-cw': RefreshCw,
  'message-circle': MessageCircle,
  'clipboard-check': ClipboardCheck,
  sliders: Sliders,
  layers: Layers,
  heart: Heart,
};

export function DynamicIcon({ name, className = 'w-5 h-5' }) {
  const IconComp = iconMap[name] || Sparkles;
  return <IconComp className={className} aria-hidden="true" />;
}

/**
 * Custom decorative SVG artwork header for services that don't have a cropped photo,
 * echoing the True Serve brand leaf, spine-spheres, and wave motifs.
 */
export function ServiceArtwork({ serviceId, iconName, category }) {
  const palettes = {
    massage: {
      from: '#0A5CBA',
      via: '#0288D1',
      to: '#0A8F4A',
      accent: '#C9A66B',
    },
    cupping: {
      from: '#063B7A',
      via: '#0A5CBA',
      to: '#C9A66B',
      accent: '#00C853',
    },
    spa: {
      from: '#0A8F4A',
      via: '#0288D1',
      to: '#C9A66B',
      accent: '#F5EBDD',
    },
    fitness: {
      from: '#0288D1',
      via: '#0A8F4A',
      to: '#00C853',
      accent: '#C9A66B',
    },
  };

  const p = palettes[category] || palettes.massage;

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-slate-900">
      <svg
        viewBox="0 0 400 200"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${serviceId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={p.from} stopOpacity="0.92" />
            <stop offset="55%" stopColor={p.via} stopOpacity="0.85" />
            <stop offset="100%" stopColor={p.to} stopOpacity="0.92" />
          </linearGradient>
          <radialGradient id={`glow-${serviceId}`} cx="75%" cy="25%" r="60%">
            <stop offset="0%" stopColor={p.accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={p.from} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="200" fill={`url(#grad-${serviceId})`} />
        <rect width="400" height="200" fill={`url(#glow-${serviceId})`} />

        {/* Flowing brand wave */}
        <path
          d="M-20,155 C90,110 210,190 420,130 L420,210 L-20,210 Z"
          fill="rgba(255,255,255,0.08)"
        />
        <path
          d="M-20,175 C130,135 260,195 420,150"
          fill="none"
          stroke={p.accent}
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />

        {/* Brand spine-spheres arc motif */}
        <g fill="rgba(255,255,255,0.16)">
          <circle cx="75" cy="115" r="14" />
          <circle cx="112" cy="106" r="8" />
          <circle cx="138" cy="103" r="7.5" />
          <circle cx="164" cy="104" r="7" />
          <circle cx="189" cy="108" r="6.5" />
          <circle cx="213" cy="112" r="6" />
          <circle cx="235" cy="114" r="5.5" />
        </g>

        {/* Organic leaf silhouette */}
        <path
          d="M110,95 C155,35 245,25 310,65 C255,95 190,98 110,95 Z"
          fill="rgba(0, 200, 83, 0.18)"
        />
      </svg>

      {/* Center glowing glass emblem */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
        <DynamicIcon name={iconName} className="w-8 h-8 text-white drop-shadow" />
      </div>
    </div>
  );
}
