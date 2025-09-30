import React from "react";
import { Link } from "react-router-dom";

export type Logo = { src: string; alt: string; href?: string };

type Props = {
  logos: Logo[];
  height?: number;
  gapClass?: string;
  className?: string;
  minTileWidthPx?: number;
  padPx?: number;
};

const LogoMarquee: React.FC<Props> = ({
  logos,
  height = 120,
  gapClass = "gap-6",
  className = "",
  minTileWidthPx = 160,
  padPx = 16,
}) => {
  const imgMaxH = Math.round(height * 0.8);

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`grid ${gapClass} place-content-center [grid-template-columns:repeat(auto-fit,minmax(var(--minw),1fr))]`}
        style={{ ["--minw" as any]: `${minTileWidthPx}px` }}
      >
        {logos.map((logo, i) => {
          const img = (
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="block object-contain opacity-90 hover:opacity-100 transition-opacity filter grayscale brightness-0 dark:invert dark:contrast-200"
              style={{ maxHeight: imgMaxH, maxWidth: "100%" }}
            />
          );

          return (
            <div
              key={`${logo.alt}-${i}`}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-center"
              style={{ height, padding: padPx }}
            >
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-full w-full focus:outline-none focus:ring-0"
                  aria-label={logo.alt}
                  title={logo.alt}
                >
                  {img}
                </a>
              ) : (
                img
              )}
            </div>
          );
        })}

        {/* Partner With Us tile */}
        <div
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-center text-center"
          style={{ height, padding: padPx }}
        >
          <Link
            to="/contact"
            className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-0"
          >
            Want to partner?<br />Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
