import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false); // <--- Controls button state
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double clicks
    setLoading(true);
    
    try {
      await api.post("/auth/send-otp", null, { params: { email: email.trim() } });
      setStep(2);
    } catch (err) {
        console.log(err);
      alert("Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double clicks
    setLoading(true);

    try {
      // TRIM THE OTP to remove accidental spaces
      const cleanOtp = otp.trim(); 
      
      const res = await api.post("/auth/verify-otp", null, { params: { email: email.trim(), otp: cleanOtp } });
      
      localStorage.setItem("token", res.data.access_token);
      
      if (res.data.is_admin) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        localStorage.removeItem("isAdmin");
        window.location.reload(); 
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Invalid Code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md p-10 relative shadow-2xl animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-light"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-2">
            {step === 1 ? "Welcome" : "Verify"}
          </h2>
          <p className="text-gray-500 text-sm">
            {step === 1 ? "Enter your email to access your account." : `Code sent to ${email}`}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <input 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 outline-none focus:border-black placeholder:text-gray-400 text-sm font-bold"
              required
              autoFocus
            />
            <button 
              disabled={loading} // <--- Disable when loading
              className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input 
              type="text" 
              placeholder="0 0 0 0 0 0"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-4 border border-black outline-none text-center text-3xl font-black tracking-[1em]"
              maxLength={6}
              required
              autoFocus
            />
            
            <button 
              disabled={loading} // <--- Disable when loading
              className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Login"}
            </button>

            <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full text-xs text-gray-400 underline hover:text-black"
            >
                Wrong email? Go back.
            </button>
          </form>
        )}
      </div>
    </div>
  );
}