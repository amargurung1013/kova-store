import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

// 1. Define Types so TypeScript doesn't complain
interface ApiError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

interface LoginResponse {
  access_token: string;
  is_admin: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();

  // STATE
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // STEP 1: SEND OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ⚠️ CRITICAL FIX: Your backend expects 'email' as a Query Param
      // DO NOT change this to { email } inside the post body.
      await api.post(`/auth/send-otp?email=${encodeURIComponent(email)}`);

      setLoading(false);
      setStep("OTP");
      // Optional: alert(`OTP Sent to ${email}`);
    } catch (err: unknown) {
      console.error("OTP Error:", err);
      const apiError = err as ApiError;
      setError(
        apiError.response?.data?.detail || "Could not send OTP. Try again.",
      );
      setLoading(false);
    }
  };

  // STEP 2: VERIFY OTP
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ⚠️ CRITICAL FIX: Your backend expects 'email' and 'otp' as Query Params
      const response = await api.post<LoginResponse>(
        `/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
      );

      const { access_token } = response.data;

      // Save Token & Email
      localStorage.setItem("token", access_token);
      localStorage.setItem("userEmail", email);

      // Force a tiny reload or navigate to ensure auth state updates
      navigate("/profile");
    } catch (err: unknown) {
      console.error("Login Error:", err);
      const apiError = err as ApiError;
      setError(apiError.response?.data?.detail || "Invalid Code.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-24 px-6">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
            {step === "EMAIL" ? "Welcome Back" : "Check Your Email"}
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            {step === "EMAIL"
              ? "Enter your email to access your account"
              : `We sent a code to ${email}`}
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center uppercase tracking-wide">
            {error}
          </div>
        )}

        {/* FORM 1: EMAIL */}
        {step === "EMAIL" ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="NAME@EXAMPLE.COM"
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors uppercase placeholder:text-gray-400"
              />
            </div>
            <button
              disabled={loading}
              className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 transition-all"
            >
              {loading ? "Processing..." : "Send Login Code"}
            </button>
          </form>
        ) : (
          // FORM 2: OTP
          <form onSubmit={handleLogin} className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Enter Code
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="XXXXXX"
                className="w-full border-b border-gray-300 py-3 bg-transparent outline-none focus:border-black transition-colors uppercase placeholder:text-gray-400 text-center tracking-[0.5em] text-xl"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 transition-all"
            >
              {loading ? "Verifying..." : "Access Account"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("EMAIL");
                setError("");
              }}
              className="w-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mt-4"
            >
              Start Over
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
