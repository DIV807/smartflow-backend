import Sidebar from "@/components/Sidebar";
import { Settings as SettingsIcon, User, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-smartflow-light-bg">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-smartflow-dark-navy">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and system settings</p>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl grid gap-8">
            
            {/* Profile Settings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-smartflow-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-smartflow-primary" />
                </div>
                <h2 className="text-xl font-semibold text-smartflow-dark-navy">Profile Settings</h2>
              </div>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name || ""} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ""} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your company name" className="mt-2" />
                </div>
                <Button className="w-fit bg-smartflow-primary text-white hover:bg-smartflow-primary/90">
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-smartflow-dark-navy">Notification Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-smartflow-dark-navy">Low Stock Alerts</h3>
                    <p className="text-sm text-gray-600">Get notified when inventory levels are low</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-smartflow-dark-navy">Route Optimization</h3>
                    <p className="text-sm text-gray-600">Receive updates on delivery route improvements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-smartflow-dark-navy">Weekly Reports</h3>
                    <p className="text-sm text-gray-600">Get weekly performance and sustainability reports</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-smartflow-dark-navy">Security Settings</h2>
              </div>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="mt-2" />
                </div>
                <Button variant="outline" className="w-fit">
                  Update Password
                </Button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}