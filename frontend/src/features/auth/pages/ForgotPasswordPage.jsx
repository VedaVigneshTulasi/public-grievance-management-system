import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authService";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/common/PageHeader";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setToken(res.token || null);
      toast.success(res.message || "If an account exists, instructions were sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <PageHeader title="Forgot Password" subtitle="Enter your account email to reset password" />

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address"
        />

        <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Reset Link"}</Button>
      </form>

      {token && (
        <div className="mt-6 p-4 rounded bg-slate-50 border border-slate-200">
          <p className="text-sm text-slate-600">Development token (copy to use on reset):</p>
          <pre className="mt-2 text-xs break-all text-slate-800">{token}</pre>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
