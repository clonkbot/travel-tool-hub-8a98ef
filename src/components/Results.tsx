import { useState } from "react";
import { useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { costData, type CostBreakdown, type Lifestyle, type HousingType, type TravelerType, type WorkStyle } from "../data/costs";
import { LeadModal } from "./LeadModal";

interface ResultsProps {
  country: string;
  city: string;
  lifestyle: Lifestyle;
  stayLength: number;
  housingType: HousingType;
  travelerType: TravelerType;
  workStyle: WorkStyle;
  breakdown: CostBreakdown;
  onReset: () => void;
  onSaved: () => void;
}

const categoryIcons: Record<string, JSX.Element> = {
  rent: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  food: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  transport: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17v4m8-4v4m-4-8V3m0 14l-4-4m4 4l4-4" />
    </svg>
  ),
  utilities: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  internet: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
  health: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  fun: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const categoryLabels: Record<string, string> = {
  rent: "Rent",
  food: "Food & Groceries",
  transport: "Transport",
  utilities: "Utilities",
  internet: "Internet & SIM",
  health: "Health/Insurance",
  fun: "Fun & Misc",
};

export function Results({
  country,
  city,
  lifestyle,
  stayLength,
  housingType,
  travelerType,
  workStyle,
  breakdown,
  onReset,
  onSaved,
}: ResultsProps) {
  const { isAuthenticated } = useConvexAuth();
  const savePlan = useMutation(api.plans.savePlan);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const countryData = costData[country.toLowerCase()];
  const countryName = countryData?.name || country;
  const confidence = countryData?.confidence || "low";

  const handleSave = async () => {
    if (!isAuthenticated) return;
    setSaving(true);
    try {
      await savePlan({
        country,
        city: city || undefined,
        lifestyle,
        stayLength,
        housingType,
        travelerType,
        workStyle,
        total: breakdown.total,
        breakdownJson: JSON.stringify(breakdown),
      });
      setSaved(true);
      onSaved();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const confidenceColors = {
    low: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    medium: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    high: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/20 rounded-full text-teal-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          {lifestyle.charAt(0).toUpperCase() + lifestyle.slice(1)} • {travelerType === "solo" ? "Solo" : "Couple"} • {stayLength} mo
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">
          {countryName} {city && <span className="text-white/50 font-normal">· {city}</span>}
        </h2>
      </div>

      {/* Total Cost */}
      <div className="relative bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30 rounded-2xl p-6 md:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-teal-400/80 text-sm uppercase tracking-wider mb-1">Estimated Monthly Cost</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-black text-white">${breakdown.total.toLocaleString()}</span>
            <span className="text-white/50 text-lg">/mo</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${confidenceColors[confidence]}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${confidence === "high" ? "bg-emerald-400" : confidence === "medium" ? "bg-blue-400" : "bg-amber-400"}`} />
              {confidence.charAt(0).toUpperCase() + confidence.slice(1)} Confidence
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(breakdown)
          .filter(([key]) => key !== "total")
          .map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                  {categoryIcons[key]}
                </div>
                <span className="text-white/80 text-sm md:text-base">{categoryLabels[key]}</span>
              </div>
              <span className="text-white font-semibold">${value.toLocaleString()}</span>
            </div>
          ))}
      </div>

      {/* Download CTA */}
      <button
        onClick={() => setShowLeadModal(true)}
        className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-base md:text-lg rounded-xl shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Full Relocation Plan (PDF)
      </button>

      {/* Secondary CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onReset}
          className="py-3 px-4 bg-white/5 border border-white/10 text-white/80 font-medium rounded-xl hover:bg-white/10 transition-all text-sm"
        >
          Compare Another
        </button>
        {isAuthenticated ? (
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="py-3 px-4 bg-white/5 border border-white/10 text-white/80 font-medium rounded-xl hover:bg-white/10 transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved!
              </>
            ) : saving ? (
              "Saving..."
            ) : (
              "Save This Plan"
            )}
          </button>
        ) : (
          <button
            disabled
            className="py-3 px-4 bg-white/5 border border-white/10 text-white/50 font-medium rounded-xl text-sm"
          >
            Sign in to Save
          </button>
        )}
      </div>

      {/* Affiliate Section */}
      <div className="mt-6 space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-white/40 font-medium">
          Recommended travel tools for this move
        </h3>
        <div className="grid grid-cols-1 gap-2">
          <a
            href={`https://traveltoolhub.com/compare/esim-providers?country=${country}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white/80 text-sm">Best eSIMs for {countryName}</span>
            </div>
            <svg className="w-4 h-4 text-white/30 group-hover:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://traveltoolhub.com/compare/vpn-providers"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-white/80 text-sm">Best VPNs for booking savings</span>
            </div>
            <svg className="w-4 h-4 text-white/30 group-hover:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://traveltoolhub.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-teal-500/10 hover:border-teal-500/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
              <span className="text-white/80 text-sm">Flights: compare prices</span>
            </div>
            <svg className="w-4 h-4 text-white/30 group-hover:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Lead Modal */}
      {showLeadModal && (
        <LeadModal
          country={country}
          city={city}
          lifestyle={lifestyle}
          stayLength={stayLength}
          housingType={housingType}
          travelerType={travelerType}
          workStyle={workStyle}
          breakdown={breakdown}
          onClose={() => setShowLeadModal(false)}
        />
      )}
    </div>
  );
}
