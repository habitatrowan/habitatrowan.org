import React, { useEffect, useRef, useState } from "react";

export type Logo = { src: string; alt: string; href?: string };

type Props = {
  logos: Logo[];
  height?: number;
  speedSec?: number;
  gapClass?: string;
  className?: string;
};

const LogoMarquee: React.FC<Props> = ({
  logos,
  height = 150,
  speedSec = 35,
  gapClass = "gap-0",
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [shiftPx, setShiftPx] = useState(0);

  const track = [...logos, ...logos];
  const boxWidth = Math.round(height * 2);
  const imgMaxH = Math.round(height * 0.8);
  const imgMaxW = Math.round(boxWidth * 0.8);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const total = el.scrollWidth;
      setShiftPx(total / 2);
      el.style.setProperty("--shift", `-${total / 2}px`);
      el.style.setProperty("--marquee-duration", `${speedSec}s`);
    };

    const imgs = Array.from(el.querySelectorAll("img"));
    let pending = imgs.length;
    const onDone = () => {
      pending -= 1;
      if (pending <= 0) update();
    };
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", onDone);
      img.addEventListener("error", onDone);
    });

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
      });
      ro.disconnect();
    };
  }, [logos.length, speedSec]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      />
      <div className="overflow-hidden" style={{ height }}>
        <div className="group h-full w-full">
          <div
            ref={trackRef}
            className={`flex items-center ${gapClass} will-change-transform marquee-track select-none`}
            aria-label="Partner logos"
            style={{
              animation: shiftPx
                ? `logos-scroll-px var(--marquee-duration, ${speedSec}s) linear infinite`
                : `logos-scroll-50 var(--marquee-duration, ${speedSec}s) linear infinite`,
            }}
          >
            {track.map((logo, i) => {
              const imgEl = (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="block object-contain opacity-90 hover:opacity-100 transition-opacity filter grayscale brightness-0 dark:invert dark:contrast-200"
                  style={{ maxHeight: imgMaxH, maxWidth: imgMaxW }}
                />
              );
              return (
                <div
                  key={`${logo.alt}-${i}`}
                  className="shrink-0 flex items-center justify-center"
                  style={{ height, width: boxWidth }}
                >
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-full w-full"
                      aria-label={logo.alt}
                      title={logo.alt}
                    >
                      {imgEl}
                    </a>
                  ) : (
                    imgEl
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes logos-scroll-50 {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes logos-scroll-px {
          from { transform: translateX(0); }
          to   { transform: translateX(var(--shift, -50%)); }
        }
        .group:hover .marquee-track { animation-play-state: paused; }
      `}</style>
    </div>
  );
};

export default LogoMarquee;
