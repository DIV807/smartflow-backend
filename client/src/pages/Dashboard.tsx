import { Bell, TrendingDown, Fuel, DollarSign, Leaf } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import InventoryTable from "@/components/InventoryTable";
import DeliveryMap from "@/components/DeliveryMap";
import EcoTracker from "@/components/EcoTracker";

export default function Dashboard() {
  const { user } = useAuth();

  const dashboardCards = [
    {
      title: "Stockout Reduction",
      value: "35%",
      description: "vs last month",
      changePercent: "35%",
      changeType: "negative" as const,
      icon: TrendingDown,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      changeBadgeColor: "text-green-600 bg-green-100"
    },
    {
      title: "Fuel Saved",
      value: "2,847L",
      description: "this month",
      changePercent: "22%",
      changeType: "positive" as const,
      icon: Fuel,
      iconBgColor: "bg-smartflow-eco-accent/20",
      iconColor: "text-smartflow-eco-accent",
      changeBadgeColor: "text-smartflow-eco-accent bg-smartflow-eco-accent/20"
    },
    {
      title: "Cost Reduction",
      value: "$12,450",
      description: "this month",
      changePercent: "18%",
      changeType: "negative" as const,
      icon: DollarSign,
      iconBgColor: "bg-smartflow-primary/10",
      iconColor: "text-smartflow-primary",
      changeBadgeColor: "text-smartflow-primary bg-smartflow-primary/10"
    },
    {
      title: "CO₂ Saved",
      value: "8.2t",
      description: "this month",
      changePercent: "15%",
      changeType: "positive" as const,
      icon: Leaf,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      changeBadgeColor: "text-green-600 bg-green-100"
    }
  ];

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex h-screen bg-smartflow-light-bg">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-smartflow-dark-navy">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your inventory.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-smartflow-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user ? getUserInitials(user.name) : "U"}
                  </span>
                </div>
                <span className="font-medium text-smartflow-dark-navy">
                  {user?.name || "User"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            {dashboardCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <InventoryTable />
            <DeliveryMap />
          </div>

          <EcoTracker />
        </main>
      </div>
    </div>
  );
}
