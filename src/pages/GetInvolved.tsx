import React, { useState, useEffect, useRef } from "react";
import ZCarousel from "../components/z_Carousel";
import GetInvolved_Volunteers from "../components/GetInvolved_Volunteers";
import GetInvolved_VolunteerSignup from "../components/GetInvolved_Form";
import GetInvolved_SupportNav from "../components/GetInvolved_SupportNav";
import GetInvolved_SupportContent from "../components/GetInvolved_SupportContent";
import GetInvolved_DonateItems from "../components/GetInvolved_Items";

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const SIGNUP_PDF_URL = "/docs/volunteer-signup.pdf";
const PAYPAL_DONATE_URL =
  "https://www.paypal.com/donate?token=BtnHtaAHXPT-E_BGE1Kbq6QDJRq1MO0DzkTPuMLg1fIBQzftnkhPIBRNjkeEty0nMFhzDcWPffj8TzM6";

const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const SUPPORT_SECTIONS = [
  { id: "support-donate", label: "Monetary Donations" },
  { id: "support-land", label: "Land Donations" },
  { id: "support-professional", label: "Professional Services" },
  { id: "support-ebay", label: "eBay" },
];

const HASH_ALIASES: Record<string, string> = {
  "#support-us": "#support",
  "#supportus": "#support",
  "#donateitems": "#donate-items",
  "#donate": "#donate-items",
  "#items": "#donate-items",
};

const HEADER_OFFSET = 96;

const photoGallery = [
  "/images/GetInvolved_gallery1.jpg",
  "/images/GetInvolved_gallery2.jpg",
  "/images/GetInvolved_gallery3.jpg",
  "/images/GetInvolved_gallery4.jpg",
  "/images/GetInvolved_gallery7.jpg",
  "/images/GetInvolved_gallery6.jpg",
];

const GetInvolved = () => {
  const [activeSupportId, setActiveSupportId] = useState<string>(SUPPORT_SECTIONS[0].id);

  const scrollToId = (raw: string) => {
    const id = raw.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const handleHash = () => {
      const raw = window.location.hash;
      if (!raw) return;
      const resolved = (HASH_ALIASES[raw] || raw).replace(/^#/, "");
      requestAnimationFrame(() => scrollToId(resolved));
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSupportId(visible.target.id);
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: [0.15, 0.3, 0.6] }
    );
    SUPPORT_SECTIONS.forEach((s) => {
      const node = document.getElementById(s.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const headerRef = useReveal();
  const carouselRef = useReveal();
  const volunteerRef = useReveal();
  const cardRef = useReveal();
  const signupRef = useReveal();
  const supportHeaderRef = useReveal();
  const supportNavRef = useReveal();
  const supportCardRef = useReveal();
  const donateHeaderRef = useReveal();
  const itemsCardRef = useReveal();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-8 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Get</span> <span className="text-[#54B948]">Involved</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Join our community of volunteers and supporters to help us build homes, communities, and hope in Rowan County.
          </p>
        </div>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        <section ref={carouselRef} className="mb-16 reveal">
          <ZCarousel
            images={photoGallery}
            intervalMs={5000}
            aspect="aspect-[16/9]"
            rounded="rounded-xl"
            alt="Habitat activity"
          />
        </section>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        <section id="volunteer" className="mb-20 scroll-mt-[var(--header-offset)]">
          <div ref={volunteerRef} className="text-center mb-10 reveal">
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-[#005596]">Volunteer</span> <span className="text-[#54B948]">Opportunities</span>
            </h2>
            <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
              Discover meaningful ways to contribute—whether through construction work, ReStore operations, committee
              participation, or student organizations.
            </p>
          </div>

          <div ref={cardRef} className={`max-w-5xl mx-auto reveal ${CARD_BASE} p-8`}>
            <GetInvolved_Volunteers />
            <div ref={signupRef} className="mt-8">
              <GetInvolved_VolunteerSignup pdfUrl={SIGNUP_PDF_URL} />
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        <section id="support" className="mb-16 scroll-mt-[var(--header-offset)]">
          <span id="support-nav" className="block h-0" />
          <div ref={supportHeaderRef} className="text-center mb-6 reveal">
            <h2 className="text-3xl font-extrabold mb-3">
              <span className="text-[#005596]">Support</span> <span className="text-[#54B948]">Us</span>
            </h2>
            <p className={`text-lg ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
              Explore different ways to support our mission through monetary donations, land contributions, professional
              services, and eBay partnerships.
            </p>
          </div>

          <div ref={supportNavRef} className="mb-8 reveal">
            <GetInvolved_SupportNav
              sections={SUPPORT_SECTIONS}
              activeId={activeSupportId}
              onSelect={(id) => {
                setActiveSupportId(id);
                scrollToId(id);
              }}
            />
          </div>

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

          <div ref={supportCardRef} className={`max-w-5xl mx-auto ${CARD_BASE} p-8 space-y-10 reveal`}>
            <GetInvolved_SupportContent donateUrl={PAYPAL_DONATE_URL} />
          </div>

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />
        </section>

        {/* Donate Items is its own header/section, outside of Support */}
        <section id="donate-items" className="scroll-mt-[var(--header-offset)]">
          <div ref={donateHeaderRef} className="max-w-5xl mx-auto mt-8 mb-4 reveal">
            <h2 className="text-3xl text-center font-extrabold mb-3">
              <span className="text-[#005596]">Donate</span> <span className="text-[#54B948]">Items</span>
            </h2>
            <p className={`text-lg text-center ${NEUTRAL_MUTED}`}>
              Use our Donate Items tool below to see if your item is accepted and how you can contribute.
            </p>
          </div>

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

          <div ref={itemsCardRef} className={`max-w-5xl mx-auto mt-2 ${CARD_BASE} p-8 reveal`}>
            <GetInvolved_DonateItems />
          </div>
        </section>
      </div>

      {/* legacy anchor kept harmlessly; aliases route #donate -> #donate-items */}
      <div id="donate" aria-hidden="true" className="h-0 w-0 overflow-hidden" />

      <style>{`
        :root { --header-offset: 96px; }
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default GetInvolved;
