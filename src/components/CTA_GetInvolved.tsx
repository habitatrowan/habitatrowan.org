import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { el.classList.add("cta-reveal-in"); obs.unobserve(el); }
      }),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const CTAGetInvolved = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      className="py-20"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}
    >
      <div ref={ref} className="max-w-4xl mx-auto px-4 text-center cta-reveal">
        <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase mb-3">
          <span style={{ color: "#005596" }}>Get</span>{" "}
          <span style={{ color: "#54B948" }}>Involved</span>
        </span>
        <h2
          className="font-display font-black leading-tight mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--text-primary)" }}
        >
          Ready to make a difference?
        </h2>
        <p
          className="font-body mb-10 max-w-lg mx-auto"
          style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}
        >
          Volunteer your time, donate resources, or support us financially. Every contribution builds stronger communities in Rowan County.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/get-involved#volunteer"
            className="font-body font-semibold text-sm tracking-wide px-8 py-3.5 rounded-xl w-full sm:w-auto text-center transition-all duration-200 border-2 border-[#005596] text-[#005596] hover:bg-[#005596] hover:text-white"
          >
            Volunteer With Us
          </Link>
          <Link
            to="/get-involved#support"
            className="font-body font-semibold text-sm tracking-wide px-8 py-3.5 rounded-xl w-full sm:w-auto text-center transition-all duration-200 text-white shadow-[0_4px_16px_rgba(0,85,150,0.3)] hover:shadow-[0_6px_24px_rgba(0,85,150,0.45)] hover:-translate-y-px"
            style={{ background: "linear-gradient(135deg, #005596, #54B948)" }}
          >
            Donate Now
          </Link>
        </div>
      </div>

      <style>{`
        .cta-reveal { opacity: 0; transform: translateY(24px); }
        .cta-reveal-in { opacity: 1; transform: translateY(0); transition: opacity 700ms cubic-bezier(.22,.61,.36,1), transform 700ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </section>
  );
};

export default CTAGetInvolved;
