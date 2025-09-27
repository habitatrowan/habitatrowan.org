// components/GetInvolved_Form.tsx
import React from "react";
import { Download } from "lucide-react";

type Props = { pdfUrl: string };

const GetInvolved_VolunteerSignup: React.FC<Props> = ({ }) => {
  return (
    <div className="rounded-xl p-8 bg-gradient-to-r from-[#005596] to-[#54B948] text-center">
      <h4 className="text-xl font-bold text-white mb-4">Volunteer Signup PDF</h4>
      <a
        href="/volunteer_form.pdf"
        target="_blank"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/40 bg-white/10 backdrop-blur text-white font-medium transition hover:bg-white/20"
      >
        <Download className="w-5 h-5" />
        Download Form
      </a>
    </div>
  );
};

export default GetInvolved_VolunteerSignup;
