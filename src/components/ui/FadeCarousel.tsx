import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type FadeCarouselProps = {
  images: string[];
  intervalMs?: number;
  aspect?: string;  // e.g., "aspect-[16/9]"
  rounded?: string; // e.g., "rounded-xl"
  alt?: string;
};

const FadeCarousel = ({
  images,
  intervalMs = 4500,
  aspect = "aspect-[16/9]",
  rounded = "rounded-xl",
  alt = "carousel image",
}: FadeCarouselProps) => {
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

  return (
    <div className={`relative w-full ${aspect} ${rounded} overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)]`}>
      {images.map((src, i) => (
        <div
          key={src + i}
          className={[
            "fade-layer",
            "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
            "will-change-opacity",
            i === idx ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      ))}

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
        onClick={() => setIdx((p) => (p - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35 text-white p-2 rounded-full transition-all focus:outline-none hover:ring-2 ring-neutral-300 dark:ring-neutral-700"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setIdx((p) => (p + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35 text-white p-2 rounded-full transition-all focus:outline-none hover:ring-2 ring-neutral-300 dark:ring-neutral-700"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FadeCarousel;
