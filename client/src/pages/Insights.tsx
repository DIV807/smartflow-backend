import Sidebar from "@/components/Sidebar";
import { BarChart3, TrendingUp, Target, Truck } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import EcoTracker from "@/components/EcoTracker";
import { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { BASE_URL } from "@/config/api";


export default function Insights() {
  const insightCards = [
    {
      title: "Forecast Accuracy",
      value: "94.2%",
      description: "AI prediction rate",
      changePercent: "3%",
      changeType: "positive" as const,
      icon: Target,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      changeBadgeColor: "text-purple-600 bg-purple-100"
    },
    {
      title: "Cost Efficiency",
      value: "87.5%",
      description: "operational score",
      changePercent: "5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      changeBadgeColor: "text-green-600 bg-green-100"
    },
    {
      title: "Performance Index",
      value: "92",
      description: "overall rating",
      changePercent: "7",
      changeType: "positive" as const,
      icon: BarChart3,
      iconBgColor: "bg-smartflow-primary/10",
      iconColor: "text-smartflow-primary",
      changeBadgeColor: "text-smartflow-primary bg-smartflow-primary/10"
    }
  ];


  const [forecastData, setForecastData] = useState<any[]>([]);
const [stockoutData, setStockoutData] = useState<string | null>(null);
const [routeData, setRouteData] = useState<any | null>(null);
const [loading, setLoading] = useState(false);


  
  useEffect(() => {
  const fetchAll = async () => {
    setLoading(true);
    try {
      // 1️⃣ Forecast
      const forecastRes = await fetch("${BASE_URL}/api/inventory/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            { Date: "2024-06-01", Weekly_Sales: 1200 },
            { Date: "2024-06-08", Weekly_Sales: 1300 },
            { Date: "2024-06-15", Weekly_Sales: 1250 },
            { Date: "2024-06-22", Weekly_Sales: 1400 }
          ],
          days: 7
        })
      });
      const forecastJson = await forecastRes.json();
      setForecastData(forecastJson.forecast);

      // 2️⃣ Stockout
      const stockoutRes = await fetch("${BASE_URL}/api/inventory/stockout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temp: 70,
          fuel: 3.5,
          cpi: 220,
          unemp: 6
        })
      });
      const stockoutJson = await stockoutRes.json();
      setStockoutData(stockoutJson.alert);

      // 3️⃣ Route Optimization
      const routeRes = await fetch("${BASE_URL}/api/routes/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coords: [
            [26.91, 75.78],
            [26.92, 75.79],
            [26.93, 75.80]
          ]
        })
      });
      const routeJson = await routeRes.json();
      setRouteData(routeJson);
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
}, []);





  return (
    <div className="flex h-screen bg-smartflow-light-bg">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-smartflow-dark-navy">Business Insights</h1>
            <p className="text-gray-600">AI-powered analytics and performance metrics</p>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {insightCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>

          <EcoTracker />

          <div className="bg-white shadow rounded p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4 text-smartflow-dark-navy">
    Sales Forecast
  </h2>
  {loading ? (
    <p>Loading forecast...</p>
  ) : (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={forecastData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="predicted_sales"
          stroke="#3b82f6"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )}
</div>

<div className="bg-white shadow rounded p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4 text-smartflow-dark-navy">
    Stockout Prediction
  </h2>
  {loading ? <p>Loading stockout...</p> : <p>{stockoutData}</p>}
</div>


<div className="bg-white shadow rounded p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4 text-smartflow-dark-navy">
    Route Optimization
  </h2>
  {loading ? (
    <p>Loading routes...</p>
  ) : (
    <p className="text-lg">
      🚚 Estimated Fuel Saved:{" "}
      <span className="font-semibold text-green-600">
        {routeData?.fuel_saved} liters
      </span>
    </p>
  )}
  <p className="flex items-center text-lg">
  <Truck className="h-5 w-5 mr-2 text-green-600" />
  Estimated Fuel Saved:{" "}
  <span className="font-semibold text-green-600 ml-1">
    {routeData?.fuel_saved} liters
  </span>
</p>

</div>



    

        </main>
      </div>
    </div>
  );
}