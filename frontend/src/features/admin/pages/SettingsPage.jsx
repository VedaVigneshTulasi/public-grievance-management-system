import { useEffect, useState } from "react";
import { Save, Bell, Lock, Database, Mail, Globe } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader.jsx";
import { getSystemSettings, updateSystemSettings } from "../services/adminService";

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    systemName: "Public Grievance Management System",
    maxComplaintFileSize: 5,
    autoComplaintAssignment: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    complaintsPerPage: 10,
    complaintExpiryDays: 30,
    averageResolutionTarget: 7,
  });

  const [changes, setChanges] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSystemSettings();
      setSettings(data.settings || settings);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    setChanges({ ...changes, [key]: value });
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    try {
      await updateSystemSettings(changes);
      toast.success("Settings saved successfully");
      setChanges({});
      setHasChanges(false);
      loadSettings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings");
    }
  };

  const handleResetChanges = () => {
    setChanges({});
    setHasChanges(false);
    loadSettings();
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <PageHeader
        title="System Settings"
        subtitle="Configure system-wide settings and preferences"
      />

      {/* General Settings */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2">
          <Globe className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">General Settings</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              System Name
            </label>
            <input
              type="text"
              value={settings.systemName}
              onChange={(e) => handleChange("systemName", e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Name displayed throughout the system</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Complaints Per Page
            </label>
            <input
              type="number"
              value={settings.complaintsPerPage}
              onChange={(e) => handleChange("complaintsPerPage", parseInt(e.target.value))}
              min="5"
              max="100"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Default pagination size</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max File Upload Size (MB)
            </label>
            <input
              type="number"
              value={settings.maxComplaintFileSize}
              onChange={(e) => handleChange("maxComplaintFileSize", parseInt(e.target.value))}
              min="1"
              max="50"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum file size for attachments</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Complaint Expiry (Days)
            </label>
            <input
              type="number"
              value={settings.complaintExpiryDays}
              onChange={(e) => handleChange("complaintExpiryDays", parseInt(e.target.value))}
              min="1"
              max="365"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Days before old complaints auto-archive</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Avg Resolution Target (Days)
            </label>
            <input
              type="number"
              value={settings.averageResolutionTarget}
              onChange={(e) => handleChange("averageResolutionTarget", parseInt(e.target.value))}
              min="1"
              max="90"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Target resolution time for metrics</p>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2">
          <Bell className="text-orange-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">Notification Settings</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800">Email Notifications</h3>
              <p className="text-sm text-gray-600 mt-1">
                Send email notifications for complaint updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange("emailNotifications", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800">SMS Notifications</h3>
              <p className="text-sm text-gray-600 mt-1">Send SMS alerts for critical complaints</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleChange("smsNotifications", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Feature Settings */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2">
          <Database className="text-purple-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">Feature Settings</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800">Auto Complaint Assignment</h3>
              <p className="text-sm text-gray-600 mt-1">
                Automatically assign complaints to departments
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoComplaintAssignment}
                onChange={(e) => handleChange("autoComplaintAssignment", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800">Maintenance Mode</h3>
              <p className="text-sm text-gray-600 mt-1">
                Put system in maintenance mode (citizens cannot create new complaints)
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2">
          <Lock className="text-red-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">Security Settings</h2>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Security settings like password policies and two-factor
            authentication are managed by your system administrator. Contact support for changes.
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSaveSettings}
          disabled={!hasChanges}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
            hasChanges
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Save size={20} />
          Save Changes
        </button>

        {hasChanges && (
          <button
            onClick={handleResetChanges}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {hasChanges && (
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded">
          <p className="text-sm text-yellow-800">
            You have unsaved changes. Click "Save Changes" to apply them.
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
