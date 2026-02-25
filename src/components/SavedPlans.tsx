import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { costData, type CostBreakdown } from "../data/costs";
import type { Id } from "../../convex/_generated/dataModel";

interface SavedPlansProps {
  onViewPlan: (plan: {
    country: string;
    city: string;
    lifestyle: "budget" | "comfortable" | "premium";
    stayLength: number;
    housingType: "room" | "studio" | "1br" | "2br";
    travelerType: "solo" | "couple";
    workStyle: "remote" | "local" | "student";
    breakdown: CostBreakdown;
  }) => void;
  onBack: () => void;
}

export function SavedPlans({ onViewPlan, onBack }: SavedPlansProps) {
  const plans = useQuery(api.plans.listPlans);
  const deletePlan = useMutation(api.plans.deletePlan);

  const handleDelete = async (id: Id<"savedPlans">) => {
    if (confirm("Delete this saved plan?")) {
      await deletePlan({ id });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Saved Plans</h2>
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

      {plans === undefined ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <p className="text-white/50">No saved plans yet</p>
          <p className="text-white/30 text-sm mt-1">Calculate a cost estimate and save it to see it here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan: { _id: Id<"savedPlans">; country: string; city?: string; lifestyle: string; stayLength: number; housingType: string; travelerType: string; workStyle: string; total: number; breakdownJson: string; createdAt: number }) => {
            const countryData = costData[plan.country.toLowerCase()];
            const countryName = countryData?.name || plan.country;
            const breakdown = JSON.parse(plan.breakdownJson) as CostBreakdown;

            return (
              <div
                key={plan._id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() =>
                    onViewPlan({
                      country: plan.country,
                      city: plan.city || "",
                      lifestyle: plan.lifestyle as "budget" | "comfortable" | "premium",
                      stayLength: plan.stayLength,
                      housingType: plan.housingType as "room" | "studio" | "1br" | "2br",
                      travelerType: plan.travelerType as "solo" | "couple",
                      workStyle: plan.workStyle as "remote" | "local" | "student",
                      breakdown,
                    })
                  }
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium">
                        {countryName}
                        {plan.city && (
                          <span className="text-white/50 font-normal"> · {plan.city}</span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400">
                          {plan.lifestyle}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {plan.travelerType}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {plan.stayLength} mo
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">${plan.total}</p>
                      <p className="text-xs text-white/40">/month</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/30 mt-3">
                    Saved {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                </button>
                <div className="border-t border-white/10 px-4 py-2 flex justify-end">
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="text-red-400/60 hover:text-red-400 text-xs font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
