import React from "react";

interface PatternProps {
  className?: string;
  opacity?: number;
}

export function GeometricPattern({ className = "w-full h-full", opacity = 0.15 }: PatternProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="sci-lattice" width="40" height="40" patternUnits="userSpaceOnUse">
          {/* Hexagon & Star-lattice node pattern — geometric crystallography motif */}
          <path
            d="M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="none"
          />
          <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sci-lattice)" />
    </svg>
  );
}

export function RosetteOrnament({ className = "w-48 h-48", opacity = 0.18 }: PatternProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="1" />
      {/* 8-pointed star / rosette overlay */}
      <polygon
        points="100,20 125,75 180,100 125,125 100,180 75,125 20,100 75,75"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <polygon
        points="100,20 125,75 180,100 125,125 100,180 75,125 20,100 75,75"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        transform="rotate(45 100 100)"
      />
    </svg>
  );
}
