import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

interface AuthScreenProps {
  onClose?: () => void;
}

export function AuthScreen({ onClose }: AuthScreenProps) {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      await signIn("password", formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn("anonymous");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to continue as guest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">
          {flow === "signIn" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-white/50 text-sm mt-1">
          {flow === "signIn"
            ? "Sign in to save your relocation plans"
            : "Create an account to save your plans"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-teal-400/80 font-medium">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
          />
        </div>

        <input name="flow" type="hidden" value={flow} />

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all disabled:opacity-50"
        >
          {loading ? "Loading..." : flow === "signIn" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-slate-900 text-white/40">or</span>
        </div>
      </div>

      <button
        onClick={handleAnonymous}
        disabled={loading}
        className="w-full py-3 bg-white/5 border border-white/10 text-white/80 font-medium rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
      >
        Continue as Guest
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          className="text-teal-400 text-sm hover:text-teal-300 transition-colors"
        >
          {flow === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full py-2 text-white/40 text-sm hover:text-white/60 transition-colors"
        >
          Skip for now
        </button>
      )}
    </div>
  );
}
