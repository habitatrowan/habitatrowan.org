import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#005596] dark:text-[#54B948]">Terms of Service</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Effective Date: September 18, 2025</p>
        </header>

        <div className="space-y-8 text-neutral-800 dark:text-neutral-200">
          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Acceptance of Terms</h2>
            <p>
              By accessing or using this website, you agree to these Terms of Service. If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Use of Website</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the site for lawful purposes only.</li>
              <li>Do not interfere with, disrupt, or attempt to gain unauthorized access to the site or related systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Intellectual Property</h2>
            <p>
              Content on this site (text, graphics, logos, images) is owned by Habitat for Humanity of Rowan County or its licensors
              and protected by law. You may not reproduce, distribute, or create derivative works without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Donations</h2>
            <p>
              Donations made through this site are processed by third-party providers. We use commercially reasonable efforts to safeguard
              transactions, but we are not responsible for third-party systems. Donations are typically final unless required otherwise by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Third-Party Links</h2>
            <p>
              External links are provided for convenience. We do not control or endorse third-party sites and are not responsible for their content or practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Disclaimers</h2>
            <p>
              We strive for accuracy but provide the site “as is” without warranties of any kind, express or implied, including fitness for a particular purpose and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Habitat for Humanity of Rowan County is not liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Updates will be posted here with a new effective date. Continued use constitutes acceptance of changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of North Carolina, without regard to conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#005596] dark:text-[#54B948] mb-2">Contact Us</h2>
            <p>
              Questions about these Terms? Contact us at <a href="mailto:info@habitatrowan.org" className="underline text-[#005596] dark:text-[#54B948]">info@habitatrowan.org</a> or (704) 642-1222.
            </p>
          </section>

          <section className="text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              This document is a general template and not legal advice. Consult counsel for your specific situation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
