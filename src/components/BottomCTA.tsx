import React from 'react';

const BottomCTA = () => {
  return (
    <div
      className="mt-16 rounded-xl p-8 text-center text-white shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
      style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
    >
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Contact */}
        <a
          href="/contact"
          className="px-6 py-3 rounded-xl font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg bg-[#005596] text-white"
        >
          Contact
        </a>

        {/* Privacy Policy */}
        <a
          href="/privacy"
          className="px-6 py-3 rounded-xl font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg bg-[#54B948] text-white"
        >
          Privacy Policy
        </a>

        {/* Terms of Service */}
        <a
          href="/terms"
          className="px-6 py-3 rounded-xl font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg bg-white text-neutral-900"
        >
          Terms of Service
        </a>
      </div>
    </div>
  );
};

export default BottomCTA;
