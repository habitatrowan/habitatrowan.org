import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, XCircle, Search } from "lucide-react";

const NEUTRAL_MUTED = "text-neutral-600";
const tabBase = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium border transition-colors";
const tabNeutral = "border-neutral-300";
const tabActiveGreen = "bg-green-600 text-white border-green-600";
const tabActiveRed = "bg-red-600 text-white border-red-600";
const tabHoverGreen = "hover:bg-green-600 hover:text-white hover:border-green-600";
const tabHoverRed = "hover:bg-red-600 hover:text-white hover:border-red-600";
const inputBase = "w-full rounded-lg border border-neutral-300 bg-white px-10 py-2 outline-none focus:ring-2 focus:ring-neutral-300:ring-neutral-700";
const chipBase = "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium";

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const GetInvolved_Items: React.FC = () => {
  const [accepted, setAccepted] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [tab, setTab] = useState<"accepted" | "rejected">("accepted");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [a, r] = await Promise.all([
          fetch("/data/GetInvolved_Accepted.json").then((res) => res.json()).catch(() => []),
          fetch("/data/GetInvolved_Denied.json").then((res) => res.json()).catch(() => []),
        ]);
        if (!alive) return;
        setAccepted(Array.isArray(a) ? a : []);
        setRejected(Array.isArray(r) ? r : []);
      } catch {
        if (!alive) return;
        setAccepted([]);
        setRejected([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const q = normalize(query);

  const acceptedFiltered = useMemo(() => {
    if (!q) return accepted;
    return accepted.filter((i) => normalize(i).includes(q));
  }, [q, accepted]);

  const rejectedFiltered = useMemo(() => {
    if (!q) return rejected;
    return rejected.filter((i) => normalize(i).includes(q));
  }, [q, rejected]);

  const overallStatus = useMemo(() => {
    if (!q) return null;
    const inA = acceptedFiltered.length > 0;
    const inR = rejectedFiltered.length > 0;
    if (inA && !inR) return "accepted";
    if (inR && !inA) return "rejected";
    if (inA && inR) return "mixed";
    return "unknown";
  }, [acceptedFiltered, rejectedFiltered, q]);

  const showBoth = q.length > 0;

  return (
    <div id="support-items" className="scroll-mt-[var(--header-offset)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("accepted")}
            className={`${tabBase} ${tab === "accepted" ? tabActiveGreen : `${tabNeutral} ${tabHoverGreen}`}`}
            disabled={showBoth}
          >
            Accepted
          </button>
          <button
            onClick={() => setTab("rejected")}
            className={`${tabBase} ${tab === "rejected" ? tabActiveRed : `${tabNeutral} ${tabHoverRed}`}`}
            disabled={showBoth}
          >
            Not Accepted
          </button>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search an item..."
            className={inputBase}
          />
        </div>
      </div>

      {overallStatus && (
        <div className="mb-4">
          {overallStatus === "accepted" && (
            <span className={`${chipBase} bg-green-600 text-white`}>
              <CheckCircle className="w-4 h-4" /> Accepted
            </span>
          )}
          {overallStatus === "rejected" && (
            <span className={`${chipBase} bg-red-600 text-white`}>
              <XCircle className="w-4 h-4" /> Not Accepted
            </span>
          )}
          {overallStatus === "mixed" && (
            <span className={`${chipBase} bg-neutral-800 text-white`}>
              <Search className="w-4 h-4" /> Matches in both lists
            </span>
          )}
          {overallStatus === "unknown" && (
            <span className={`${chipBase} bg-neutral-200 text-neutral-800`}>
              <Search className="w-4 h-4" /> Not found
            </span>
          )}
        </div>
      )}

      {!showBoth && tab === "accepted" && (
        <div className="rounded-xl p-6 border border-neutral-200">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
            {acceptedFiltered.map((item) => (
              <li key={`a-${item}`} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 w-4 h-4 text-green-600" aria-hidden="true" />
                <span className={`${NEUTRAL_MUTED} leading-tight`}>{item}</span>
              </li>
            ))}
            {acceptedFiltered.length === 0 && <li className={NEUTRAL_MUTED}>No items.</li>}
          </ul>
        </div>
      )}

      {!showBoth && tab === "rejected" && (
        <div className="rounded-xl p-6 border border-neutral-200">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
            {rejectedFiltered.map((item) => (
              <li key={`r-${item}`} className="flex items-start gap-2">
                <XCircle className="mt-0.5 w-4 h-4 text-red-600" aria-hidden="true" />
                <span className={`${NEUTRAL_MUTED} leading-tight`}>{item}</span>
              </li>
            ))}
            {rejectedFiltered.length === 0 && <li className={NEUTRAL_MUTED}>No items.</li>}
          </ul>
        </div>
      )}

      {showBoth && (
        <div className="space-y-8">
          <div className="rounded-xl p-6 border border-neutral-200">
            <h4 className="font-semibold mb-3 text-green-700">Accepted</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
              {acceptedFiltered.map((item) => (
                <li key={`a2-${item}`} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 w-4 h-4 text-green-600" aria-hidden="true" />
                  <span className={`${NEUTRAL_MUTED} leading-tight`}>{item}</span>
                </li>
              ))}
              {acceptedFiltered.length === 0 && <li className={NEUTRAL_MUTED}>No matches.</li>}
            </ul>
          </div>

          <div className="rounded-xl p-6 border border-neutral-200">
            <h4 className="font-semibold mb-3 text-red-700">Not Accepted</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
              {rejectedFiltered.map((item) => (
                <li key={`r2-${item}`} className="flex items-start gap-2">
                  <XCircle className="mt-0.5 w-4 h-4 text-red-600" aria-hidden="true" />
                  <span className={`${NEUTRAL_MUTED} leading-tight`}>{item}</span>
                </li>
              ))}
              {rejectedFiltered.length === 0 && <li className={NEUTRAL_MUTED}>No matches.</li>}
            </ul>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-neutral-500">Updated September 2025</p>
    </div>
  );
};

export default GetInvolved_Items;
