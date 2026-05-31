import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";

const ProfilePage = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Citizen Account Information"
      />

      <Card className="p-8">

        <div className="flex items-center gap-6 mb-8">

          <div className="w-24 h-24 rounded-full bg-[#0B2E59] text-white flex items-center justify-center text-3xl font-bold">

            {user?.name?.charAt(0)}

          </div>

          <div>

            <h2 className="text-3xl font-bold">

              {user?.name}

            </h2>

            <p className="text-gray-500">

              {user?.email}

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <h3 className="text-gray-500 text-sm">
              Role
            </h3>

            <p className="font-semibold">
              {user?.role}
            </p>

          </div>

          <div>

            <h3 className="text-gray-500 text-sm">
              Account Status
            </h3>

            <p className="font-semibold text-green-600">
              Active
            </p>

          </div>

        </div>

      </Card>

    </div>
  );
};

export default ProfilePage;