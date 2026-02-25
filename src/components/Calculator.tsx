import { useState } from "react";
import {
  costData,
  calculateCosts,
  type Lifestyle,
  type HousingType,
  type TravelerType,
  type WorkStyle,
  type CostBreakdown,
} from "../data/costs";

interface CalculatorProps {
  onCalculate: (
    country: string,
    city: string,
    lifestyle: Lifestyle,
    stayLength: number,
    housingType: HousingType,
    travelerType: TravelerType,
    workStyle: WorkStyle,
    breakdown: CostBreakdown
  ) => void;
}

export function Calculator({ onCalculate }: CalculatorProps) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [lifestyle, setLifestyle] = useState<Lifestyle>("comfortable");
  const [stayLength, setStayLength] = useState(6);
  const [housingType, setHousingType] = useState<HousingType>("studio");
  const [travelerType, setTravelerType] = useState<TravelerType>("solo");
  const [workStyle, setWorkStyle] = useState<WorkStyle>("remote");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const countries = Object.entries(costData).map(([key, data]) => ({
    key,
    name: data.name,
  }));

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCalculate = () => {
    if (!country) return;
    const breakdown = calculateCosts(
      country,
      lifestyle,
      stayLength,
      housingType,
      travelerType,
      workStyle
    );
    onCalculate(
      country,
      city,
      lifestyle,
      stayLength,
      housingType,
      travelerType,
      workStyle,
      breakdown
    );
  };

  const selectedCountryName = countries.find((c) => c.key === country)?.name || "";

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Country Selection */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
          Destination Country *
        </label>
        <div className="relative">
          <input
            type="text"
            value={showDropdown ? searchQuery : selectedCountryName}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search countries..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
              <div className="absolute z-20 w-full mt-2 bg-slate-900/98 border border-white/10 rounded-xl shadow-2xl shadow-black/50 max-h-60 overflow-y-auto backdrop-blur-xl">
                {filteredCountries.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => {
                      setCountry(c.key);
                      setSearchQuery("");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-white/90 hover:bg-teal-500/20 transition-colors flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-xs font-medium text-teal-400">
                      {c.name.charAt(0)}
                    </span>
                    {c.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
          City (Optional)
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g., Bangkok, Lisbon..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
        />
      </div>

      {/* Lifestyle */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
          Lifestyle
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["budget", "comfortable", "premium"] as Lifestyle[]).map((l) => (
            <button
              key={l}
              onClick={() => setLifestyle(l)}
              className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                lifestyle === l
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stay Length */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
          Stay Length: <span className="text-white font-bold text-base">{stayLength} {stayLength === 1 ? "month" : "months"}</span>
        </label>
        <input
          type="range"
          min="1"
          max="12"
          value={stayLength}
          onChange={(e) => setStayLength(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-teal-500 slider-thumb"
        />
        <div className="flex justify-between text-xs text-white/40">
          <span>1 mo</span>
          <span>6 mo</span>
          <span>12 mo</span>
        </div>
      </div>

      {/* Housing Type */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
          Housing Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {([
            { key: "room", label: "Room" },
            { key: "studio", label: "Studio" },
            { key: "1br", label: "1 BR" },
            { key: "2br", label: "2 BR" },
          ] as { key: HousingType; label: string }[]).map((h) => (
            <button
              key={h.key}
              onClick={() => setHousingType(h.key)}
              className={`py-3 px-3 rounded-xl text-sm font-medium transition-all ${
                housingType === h.key
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Traveler Type */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
          Traveler Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["solo", "couple"] as TravelerType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTravelerType(t)}
              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                travelerType === t
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              {t === "solo" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Work Style */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
          Work Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { key: "remote", label: "Remote" },
            { key: "local", label: "Local Job" },
            { key: "student", label: "Student" },
          ] as { key: WorkStyle; label: string }[]).map((w) => (
            <button
              key={w.key}
              onClick={() => setWorkStyle(w.key)}
              className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                workStyle === w.key
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={!country}
        className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-lg rounded-xl shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mt-4 active:scale-[0.98]"
      >
        Calculate Costs
      </button>
    </div>
  );
}
