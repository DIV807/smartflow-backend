import Sidebar from "@/components/Sidebar";
import { Package, AlertTriangle, TrendingUp } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import InventoryTable from "@/components/InventoryTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { BASE_URL } from "@/config/api";



export default function Inventory() {
  const inventoryCards = [
    {
      title: "Total Products",
      value: "2,847",
      description: "items in stock",
      changePercent: "5%",
      changeType: "positive" as const,
      icon: Package,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      changeBadgeColor: "text-blue-600 bg-blue-100"
    },
    {
      title: "Low Stock Items",
      value: "12",
      description: "need restocking",
      changePercent: "3",
      changeType: "negative" as const,
      icon: AlertTriangle,
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
      changeBadgeColor: "text-red-600 bg-red-100"
    },
    {
      title: "Stock Value",
      value: "$847K",
      description: "total inventory",
      changePercent: "12%",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      changeBadgeColor: "text-green-600 bg-green-100"
    }
  ];



  const { data: forecastData, isLoading: forecastLoading, isError } = useQuery({
  queryKey: ["inventoryForecast"],
  queryFn: async () => {
    const res = await fetch("${BASE_URL}/api/inventory/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          { Date: "2024-06-01", Weekly_Sales: 20000 },
          { Date: "2024-06-08", Weekly_Sales: 21000 },
          { Date: "2024-06-15", Weekly_Sales: 19000 }
        ],
        days: 7
      })
    });
    if (!res.ok) throw new Error("Error fetching forecast");
    return res.json();
  }
});

const [stockoutInput, setStockoutInput] = useState({
  temp: "",
  fuel: "",
  cpi: "",
  unemp: ""
});
const [stockoutResult, setStockoutResult] = useState<string | null>(null);
const [stockoutLoading, setStockoutLoading] = useState(false);

const checkStockout = async () => {
  setStockoutLoading(true);
  setStockoutResult(null);
  try {
    const res = await fetch("${BASE_URL}/api/inventory/stockout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        temp: parseFloat(stockoutInput.temp),
        fuel: parseFloat(stockoutInput.fuel),
        cpi: parseFloat(stockoutInput.cpi),
        unemp: parseFloat(stockoutInput.unemp)
      })
    });
    const data = await res.json();
    setStockoutResult(data.alert);
  } catch (err) {
    setStockoutResult("Error fetching prediction.");
  } finally {
    setStockoutLoading(false);
  }
};



  return (
    <div className="flex h-screen bg-smartflow-light-bg">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-smartflow-dark-navy">Inventory Management</h1>
            <p className="text-gray-600">Monitor stock levels and manage your inventory efficiently</p>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {inventoryCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>

          <InventoryTable />

          <div className="mt-8">
  <h2 className="text-xl font-semibold mb-4 text-smartflow-dark-navy">
    Inventory Forecast
  </h2>

  {forecastLoading && <p className="text-gray-600">Loading forecast...</p>}

  {isError && (
    <p className="text-red-600">Error loading forecast data.</p>
  )}

  {forecastData && (
    <div className="bg-white shadow rounded">
  <div className="grid grid-cols-2 border-b p-3 font-semibold text-gray-700">
    <div>Date</div>
    <div>Predicted Sales</div>
  </div>
  {forecastData.forecast.map((item: any) => (
    <div
      key={item.date}
      className="grid grid-cols-2 border-b p-3 hover:bg-gray-50"
    >
      <div>{item.date}</div>
      <div className="text-right font-medium">{Number(item.predicted_sales).toLocaleString()}
</div>
    </div>
  ))}
</div>

  )}
</div>
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4 text-smartflow-dark-navy">
    Forecast Chart
  </h2>
 <div className="bg-white shadow rounded p-4">
  {forecastLoading && (
    <p className="text-gray-600">Loading chart...</p>
  )}
  {isError && (
    <p className="text-red-600">Error loading forecast data.</p>
  )}
  {forecastData && (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={forecastData.forecast}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => Number(value).toLocaleString()} />
        <Line
          type="monotone"
          dataKey="predicted_sales"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )}
</div>

</div>



<div className="mt-12">
  <h2 className="text-xl font-semibold mb-4 text-smartflow-dark-navy">
    Stockout Prediction
  </h2>

  <div className="bg-white shadow rounded p-6 space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {["temp", "fuel", "cpi", "unemp"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium capitalize mb-1">
            {field}
          </label>
          <input
            type="number"
            value={(stockoutInput as any)[field]}
            onChange={(e) =>
              setStockoutInput((prev) => ({
                ...prev,
                [field]: e.target.value
              }))
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}
    </div>

    <button
      onClick={checkStockout}
      disabled={stockoutLoading}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {stockoutLoading ? "Checking..." : "Check Stockout"}
    </button>

    {stockoutResult && (
      <div
        className={`mt-4 font-medium ${
          stockoutResult.includes("✅")
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {stockoutResult}
      </div>
    )}
  </div>
</div>



        </main>
      </div>
    </div>
  );
}