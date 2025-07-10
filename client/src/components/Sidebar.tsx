import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { 
  Zap, 
  LayoutDashboard, 
  Package, 
  Truck, 
  BarChart3, 
  Settings, 
  LogOut 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { authApi } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Truck, label: "Deliveries", href: "/deliveries" },
  { icon: BarChart3, label: "Insights", href: "/insights" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [location, setLocation] = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      setLocation("/");
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    },
    onError: () => {
      // Even if the API call fails, we should still log out locally
      logout();
      setLocation("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="bg-white w-64 shadow-lg border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-smartflow-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold text-smartflow-dark-navy">SmartFlow</span>
        </div>
      </div>
      
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <li key={item.label}>
                <Link href={item.href}>
                  <div className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "text-smartflow-dark-navy bg-smartflow-primary/10"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}>
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-smartflow-primary" : ""}`} />
                    {item.label}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-100"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="w-5 h-5 mr-3" />
          {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );
}
