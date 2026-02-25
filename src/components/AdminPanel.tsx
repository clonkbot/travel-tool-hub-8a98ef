import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [passcode, setPasscode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState("");

  const leads = useQuery(
    api.leads.listLeads,
    authenticated ? { passcode: enteredPasscode } : "skip"
  );
  const csvData = useQuery(
    api.leads.exportLeadsCSV,
    authenticated ? { passcode: enteredPasscode } : "skip"
  );

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setEnteredPasscode(passcode);
    setAuthenticated(true);
  };

  const handleExport = () => {
    if (!csvData) return;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Admin Access</h2>
          <button
            onClick={onBack}
            className="text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
              Admin Passcode
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all"
          >
            Access Admin
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Email Leads</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            disabled={!csvData}
            className="px-4 py-2 bg-teal-500/20 text-teal-400 text-sm font-medium rounded-lg hover:bg-teal-500/30 transition-colors disabled:opacity-50"
          >
            Export CSV
          </button>
          <button
            onClick={onBack}
            className="text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      {leads === undefined ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/50">No leads yet or invalid passcode</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-white/50 text-sm">{leads.length} leads collected</p>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {leads.map((lead: { _id: string; email: string; country: string; lifestyle: string; travelerType: string; total: number; createdAt: number }) => (
              <div
                key={lead._id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-medium">{lead.email}</p>
                    <p className="text-white/50 text-xs mt-1">
                      {lead.country} • {lead.lifestyle} • {lead.travelerType} • ${lead.total}/mo
                    </p>
                  </div>
                  <p className="text-white/30 text-xs">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
