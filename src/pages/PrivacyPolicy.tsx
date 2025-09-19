import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#005596] dark:text-[#54B948]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Effective Date: September 18, 2025</p>
        </header>

        <div className="space-y-8 text-neutral-800 dark:text-neutral-200">
          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Overview</h2>
            <p>
              Habitat for Humanity of Rowan County (“we,” “our,” “us”) values your privacy. This Policy explains how we
              collect, use, and protect information when you visit our website, participate in programs, or interact with us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><span className="font-medium">Personal Information:</span> name, email, phone, postal address, donation/payment details.</li>
              <li><span className="font-medium">Non-Personal Information:</span> device, browser, IP, usage data (via cookies/analytics).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Process donations and issue receipts.</li>
              <li>Communicate about volunteering, programs, and events.</li>
              <li>Respond to inquiries and provide support.</li>
              <li>Improve our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Sharing of Information</h2>
            <p>
              We do <span className="font-semibold">not sell</span> your personal information. We may share limited data with trusted
              service providers (e.g., payment processors, email platforms) under confidentiality obligations. We may disclose
              information if required by law or to protect our rights and users’ safety.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Cookies & Analytics</h2>
            <p>
              We use cookies and analytics to understand usage and improve the site. You can control cookies in your browser
              settings; disabling them may affect functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Data Security</h2>
            <p>
              We use reasonable administrative, technical, and physical safeguards. No method of transmission or storage is
              100% secure; we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Your Choices</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Opt out of marketing emails via unsubscribe links or by contacting us.</li>
              <li>Update your contact information by reaching out to us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Third-Party Links</h2>
            <p>
              Our site may link to third-party sites. We are not responsible for their content or privacy practices. Review
              their policies before providing personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Contact Us</h2>
            <p>
              Questions about this Policy? Contact us at <a href="mailto:info@habitatrowan.org" className="underline text-[#005596] dark:text-[#54B948]">info@habitatrowan.org</a> or (704) 642-1222.
            </p>
          </section>

          <section className="text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              This document is a general template and not legal advice. Consult counsel to ensure compliance with applicable laws.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
