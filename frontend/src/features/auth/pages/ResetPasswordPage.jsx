import { useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../services/authService";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/common/PageHeader";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, newPassword, confirmPassword });
      toast.success("Password reset successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <PageHeader title="Reset Password" subtitle="Enter the token and your new password" />

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <Input label="Token" name="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter token" />
        <Input label="New Password" type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" />
        <Input label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />

        <Button type="submit" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
