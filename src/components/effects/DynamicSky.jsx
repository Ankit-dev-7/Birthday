import React from 'react';

/**
 * Fixed animated gradient background that cycles from sunset to night.
 * Uses CSS animation — zero JS overhead.
 */
export function DynamicSky() {
  return (
    <>
      <style>{`
        @keyframes skyShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .dynamic-sky {
          background: linear-gradient(
            135deg,
            #000000,
            #1a0533,
            #2d1b4e,
            #4a1942,
            #1a0533,
            #0d0020,
            #000000
          );
          background-size: 400% 400%;
          animation: skyShift 60s ease infinite;
        }
      `}</style>
      <div
        className="dynamic-sky fixed inset-0 -z-10"
        aria-hidden="true"
      />
    </>
  );
}

export default DynamicSky;
