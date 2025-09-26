import React from "react";

type Logo = {
  src: string;
  alt: string;
  href?: string; // optional click-through
};

type Props = {
  logos: Logo[];
  speedSec?: number; // lower = faster; default ~30s for a full loop
  height?: number;   // logo rail height in px (responsive max-height)
};

const PartnerLogosMarquee: React.FC<Props> = ({ logos, speedSec = 30, height = 54 }) => {
  // Duplicate the array so the end meets the start seamlessly
  const track = [...logos, ...logos];

  return (
    <div className="relative w-full">
      {/* Edge fade (mask) */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          // works in all modern browsers (uses -webkit-mask if available):
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      />

      {/* The rail */}
      <div
        className="overflow-hidden"
        style={{
          // Allow pausing on hover:
          // (We’ll set animation on the child track)
          height,
        }}
      >
        <div
          className="flex items-center gap-10 will-change-transform marquee-track"
          style={{
            animation: `logos-scroll ${speedSec}s linear infinite`,
          }}
        >
          {track.map((logo, i) => {
            const img = (
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="max-h-full object-contain block opacity-90 hover:opacity-100 transition-opacity"
                style={{ maxHeight: height, height: "auto", width: "auto" }}
              />
            );
            return (
              <div key={i} className="shrink-0 flex items-center justify-center" style={{ height }}>
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-full">
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Local styles */}
      <style>{`
        @keyframes logos-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); } /* move by half because we duplicated the list */
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PartnerLogosMarquee;
