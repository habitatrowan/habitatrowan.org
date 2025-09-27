import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  /** ms between auto-advance */
  intervalMs?: number;
  /** Tailwind aspect class, e.g. "aspect-[16/9]" */
  aspect?: string;
  /** Tailwind rounded class, e.g. "rounded-xl" */
  rounded?: string;
  /** alt text for images */
  alt?: string;
  /** optional className on wrapper */
  className?: string;
  /** show dots and arrows (defaults true) */
  showControls?: boolean;
};

const FadeCarousel: React.FC<Props> = ({
  images,
  intervalMs = 4500,
  aspect = "aspect-[16/9]",
  rounded = "rounded-xl",
  alt = "carousel image",
  className = "",
  showControls = true,
}) => {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, intervalMs) as unknown as number;
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [images.length, intervalMs]);

  const prev = () => setIdx((p) => (p - 1 + images.length) % images.length);
  const next = () => setIdx((p) => (p + 1) % images.length);

  return (
    <div className={`relative w-full ${aspect} ${rounded} overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)] ${className}`}>
      {images.map((src, i) => (
        <div
          key={src + i}
          className={[
            "fade-layer absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
            "will-change-opacity",
            i === idx ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      ))}

      {showControls && (
        <>
          {/* dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={[
                  "w-3 h-3 rounded-full transition-all",
                  i === idx ? "bg-neutral-400 dark:bg-neutral-900" : "bg-neutral-300 dark:bg-neutral-600",
                ].join(" ")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35 text-white p-2 rounded-full transition-all focus:outline-none hover:ring-2 ring-neutral-300 dark:ring-neutral-700"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35 text-white p-2 rounded-full transition-all focus:outline-none hover:ring-2 ring-neutral-300 dark:ring-neutral-700"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Allow-motion override (if your global CSS reduces motion) */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .allow-motion .fade-layer {
            transition: opacity 700ms cubic-bezier(.22,.61,.36,1) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FadeCarousel;
