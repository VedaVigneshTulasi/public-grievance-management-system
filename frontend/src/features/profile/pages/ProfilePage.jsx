import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <PageHeader
          title="My Profile"
          subtitle="Citizen Account Information"
        />

        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-slate-50 px-8 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-6">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#0B2E59] text-4xl font-bold text-white shadow-sm">
                  {user?.name?.charAt(0) || "C"}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Citizen Profile</p>
                  <h2 className="mt-3 text-4xl font-bold text-[#0B2E59]">
                    {user?.name || "Unknown User"}
                  </h2>
                  <p className="mt-2 text-slate-600">{user?.email || "No email provided"}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Account Status</p>
                <p className="mt-3 text-2xl font-semibold text-emerald-600">Active</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-8 pb-8 sm:px-10 sm:pb-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0B2E59] mb-4">Account Details</h3>
              <div className="space-y-5 text-slate-700">
                <div className="grid gap-2">
                  <span className="text-slate-500 uppercase tracking-[0.16em] text-xs">Role</span>
                  <span className="font-semibold">{user?.role || "Citizen"}</span>
                </div>
                <div className="grid gap-2">
                  <span className="text-slate-500 uppercase tracking-[0.16em] text-xs">Joined</span>
                  <span className="font-semibold">{joinedDate}</span>
                </div>
                <div className="grid gap-2">
                  <span className="text-slate-500 uppercase tracking-[0.16em] text-xs">Phone</span>
                  <span className="font-semibold">{user?.phone || "Not provided"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0B2E59] mb-4">Profile Summary</h3>
              <p className="text-slate-600 leading-7">
                Your account is set up as a citizen profile. Keep this information current to receive complaint updates and portal notifications.
              </p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Notifications</p>
                  <p className="mt-2 text-sm text-slate-700">Enabled for complaint status updates.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Identity</p>
                  <p className="mt-2 text-sm text-slate-700">Authenticated citizen account.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;