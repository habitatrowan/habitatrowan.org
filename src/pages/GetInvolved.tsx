import React, { useState, useEffect, useRef } from "react";
import GetInvolved_Volunteers from "../components/GetInvolved_Volunteers";
import GetInvolved_VolunteerSignup from "../components/GetInvolved_Form";
import GetInvolved_SupportNav from "../components/GetInvolved_SupportNav";
import GetInvolved_SupportContent from "../components/GetInvolved_SupportContent";
import GetInvolved_DonateItems from "../components/GetInvolved_Items";
import GetInvolved_Cars from "../components/GetInvolved_Cars";

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
const PAYPAL_DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=XRMX4AF5DFV62";

const NEUTRAL_TEXT = "text-neutral-900";
const NEUTRAL_MUTED = "text-neutral-600";
const NEUTRAL_CARD = "bg-white";
const NEUTRAL_BORDER = "border border-neutral-200";
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
  "#cars": "#donate-cars",
};

const HEADER_OFFSET = 96;

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
  const volunteerRef = useReveal();
  const cardRef = useReveal();
  const signupRef = useReveal();
  const supportHeaderRef = useReveal();
  const supportNavRef = useReveal();
  const supportCardRef = useReveal();
  const donateHeaderRef = useReveal();
  const itemsCardRef = useReveal();
  const pickupCardRef = useReveal();
  const carsHeaderRef = useReveal();
  const carsCardRef = useReveal();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-8 reveal">
          <h1 className="text-4xl font-extrabold mb-4 text-neutral-900">
            Get Involved
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Join our community of volunteers and supporters to help us build
            homes, communities, and hope in Rowan County.
          </p>
        </div>

        <div className="h-px w-full bg-neutral-200 mb-16" />

        <section id="volunteer" className="mb-20 scroll-mt-[var(--header-offset)]">
          <div ref={volunteerRef} />

          <div ref={cardRef} className={`max-w-5xl mx-auto reveal ${CARD_BASE} p-8`}>
            <GetInvolved_Volunteers />
            <div ref={signupRef} className="mt-8">
              <GetInvolved_VolunteerSignup pdfUrl={SIGNUP_PDF_URL} />
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-neutral-200 mb-16" />

        <section id="support" className="mb-16 scroll-mt-[var(--header-offset)]">
          <span id="support-nav" className="block h-0" />
          <div ref={supportHeaderRef} className="text-center mb-6 reveal">
            <h2 className="text-3xl font-extrabold mb-3 text-neutral-900">
              Support Us
            </h2>
            <p className={`text-lg ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
              Explore different ways to support our mission through monetary
              donations, land contributions, professional services, and eBay
              partnerships.
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

          <div className="h-px w-full bg-neutral-200 mb-16" />

          <div
            ref={supportCardRef}
            className={`max-w-5xl mx-auto ${CARD_BASE} p-8 space-y-10 reveal`}
          >
            <GetInvolved_SupportContent donateUrl={PAYPAL_DONATE_URL} />
          </div>

          <div className="h-px w-full bg-neutral-200 mb-16" />
        </section>

        <section id="donate-items" className="scroll-mt-[var(--header-offset)]">
          <div
            ref={donateHeaderRef}
            className="max-w-5xl mx-auto mt-8 mb-4 text-center reveal"
          >
            <h2 className="text-3xl font-extrabold mb-3 text-neutral-900">
              Donate Items
            </h2>
            <p className={`text-lg ${NEUTRAL_MUTED}`}>
              Use our Donate Items tool below to see if your item is accepted
              and how you can contribute.
            </p>
          </div>

          <div className="h-px w-full bg-neutral-200 mb-16" />

          <div
            ref={itemsCardRef}
            className={`max-w-5xl mx-auto mt-2 ${CARD_BASE} p-8 reveal`}
          >
            <GetInvolved_DonateItems />
          </div>

          <div
            ref={pickupCardRef}
            className={`max-w-3xl mx-auto mt-6 ${CARD_BASE} p-6 text-center space-y-4 reveal`}
          >
            <p className={`text-lg ${NEUTRAL_MUTED}`}>
              Larger items or entire households can be scheduled for pickup by calling
              our Donations Manager at 704-642-1222 ext.103 or by using the link below.
            </p>
            <a
              href="https://forms.gle/EhLVBXRqxc3r3oReA"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#005596] to-[#54B948] p-[1px] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54B948]"
            >
              <span className="inline-flex w-full items-center justify-center rounded-lg bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition group-hover:bg-white/15">
                Schedule Pickup Online
              </span>
            </a>
          </div>
        </section>

        <div className="h-px w-full bg-neutral-200 my-16" />

        <section id="donate-cars" className="scroll-mt-[var(--header-offset)]">
          <div
            ref={carsHeaderRef}
            className="max-w-5xl mx-auto mt-8 mb-4 text-center reveal"
          >
            <h2 className="text-3xl font-extrabold mb-3 text-neutral-900">
              Donate Cars
            </h2>
            <p className={`text-lg ${NEUTRAL_MUTED}`}>
              Did you know by donating your vehicle to Habitat you can help
              build and repair affordable homes while also helping the
              environment?
            </p>
          </div>

          <div
            ref={carsCardRef}
            className={`max-w-5xl mx-auto mt-2 ${CARD_BASE} p-8 reveal`}
          >
            <GetInvolved_Cars />
          </div>
        </section>
      </div>

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
