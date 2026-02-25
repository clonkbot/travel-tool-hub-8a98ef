import { useState, useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Calculator } from "./components/Calculator";
import { Results } from "./components/Results";
import { SavedPlans } from "./components/SavedPlans";
import { AdminPanel } from "./components/AdminPanel";
import { AuthScreen } from "./components/AuthScreen";
import type { CostBreakdown, Lifestyle, HousingType, TravelerType, WorkStyle } from "./data/costs";

type View = "calculator" | "results" | "saved" | "auth" | "admin";

interface CalculationResult {
  country: string;
  city: string;
  lifestyle: Lifestyle;
  stayLength: number;
  housingType: HousingType;
  travelerType: TravelerType;
  workStyle: WorkStyle;
  breakdown: CostBreakdown;
}

function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [view, setView] = useState<View>("calculator");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  // Check for admin route
  useEffect(() => {
    if (window.location.pathname === "/admin/leads") {
      setView("admin");
    }
  }, []);

  const handleCalculate = (
    country: string,
    city: string,
    lifestyle: Lifestyle,
    stayLength: number,
    housingType: HousingType,
    travelerType: TravelerType,
    workStyle: WorkStyle,
    breakdown: CostBreakdown
  ) => {
    setResult({
      country,
      city,
      lifestyle,
      stayLength,
      housingType,
      travelerType,
      workStyle,
      breakdown,
    });
    setView("results");
  };

  const handleViewSavedPlan = (plan: CalculationResult) => {
    setResult(plan);
    setView("results");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <header className="relative sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">TravelToolHub</h1>
              <p className="text-[10px] text-teal-400/80 -mt-0.5">Move Abroad Calculator</p>
            </div>
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-slate-900/98 border border-white/10 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-xl z-50 overflow-hidden">
                  {isLoading ? (
                    <div className="px-4 py-3 text-white/50 text-sm">Loading...</div>
                  ) : isAuthenticated ? (
                    <>
                      <button
                        onClick={() => { setView("calculator"); setShowMenu(false); }}
                        className="w-full px-4 py-3 text-left text-white/80 hover:bg-teal-500/20 transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Calculator
                      </button>
                      <button
                        onClick={() => { setView("saved"); setShowMenu(false); }}
                        className="w-full px-4 py-3 text-left text-white/80 hover:bg-teal-500/20 transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Saved Plans
                      </button>
                      <div className="border-t border-white/10" />
                      <button
                        onClick={() => { signOut(); setShowMenu(false); }}
                        className="w-full px-4 py-3 text-left text-red-400/80 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setView("calculator"); setShowMenu(false); }}
                        className="w-full px-4 py-3 text-left text-white/80 hover:bg-teal-500/20 transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Calculator
                      </button>
                      <button
                        onClick={() => { setView("auth"); setShowMenu(false); }}
                        className="w-full px-4 py-3 text-left text-white/80 hover:bg-teal-500/20 transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Sign In
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Glass Card Container */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-sm shadow-2xl shadow-black/20">
          {view === "calculator" && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl md:text-2xl font-bold text-white">Move Abroad Cost Calculator</h2>
                <p className="text-white/50 text-sm">Plan your relocation budget in seconds</p>
              </div>
              <Calculator onCalculate={handleCalculate} />
            </div>
          )}

          {view === "results" && result && (
            <Results
              {...result}
              onReset={() => setView("calculator")}
              onSaved={() => {}}
            />
          )}

          {view === "saved" && (
            <SavedPlans
              onViewPlan={handleViewSavedPlan}
              onBack={() => setView("calculator")}
            />
          )}

          {view === "auth" && (
            <AuthScreen onClose={() => setView("calculator")} />
          )}

          {view === "admin" && (
            <AdminPanel onBack={() => setView("calculator")} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-white/5 py-3">
        <div className="max-w-lg mx-auto px-4 text-center">
          <p className="text-white/30 text-xs">
            Requested by <span className="text-white/40">@altyyy</span> · Built by <span className="text-white/40">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
