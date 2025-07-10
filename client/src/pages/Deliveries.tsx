import Sidebar from "@/components/Sidebar";
import { Truck, Clock, MapPin } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import DeliveryMap from "@/components/DeliveryMap";
import { useState } from "react";
import RouteMap from "@/components/RouteMap";

import { BASE_URL } from "@/config/api";



export default function Deliveries() {
  const deliveryCards = [
    {
      title: "Active Routes",
      value: "8",
      description: "currently running",
      changePercent: "2",
      changeType: "positive" as const,
      icon: Truck,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      changeBadgeColor: "text-blue-600 bg-blue-100"
    },
    {
      title: "Avg Delivery Time",
      value: "2.3h",
      description: "per route",
      changePercent: "15%",
      changeType: "negative" as const,
      icon: Clock,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      changeBadgeColor: "text-green-600 bg-green-100"
    },
    {
      title: "Distance Saved",
      value: "247km",
      description: "today",
      changePercent: "8%",
      changeType: "positive" as const,
      icon: MapPin,
      iconBgColor: "bg-smartflow-eco-accent/20",
      iconColor: "text-smartflow-eco-accent",
      changeBadgeColor: "text-smartflow-eco-accent bg-smartflow-eco-accent/20"
    }
  ];



  
const [coordsInput, setCoordsInput] = useState<string>("");
const [optimizationResult, setOptimizationResult] = useState<any>(null);
const [loading, setLoading] = useState(false);

const optimizeRoutes = async () => {
  setLoading(true);
  setOptimizationResult(null);

  try {
    const coords = coordsInput
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line)
      .map((line) => {
        const [lat, lon] = line.split(",").map(Number);
        return [lat, lon];
      });

    const res = await fetch("${BASE_URL}/api/routes/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coords }),
    });
    const data = await res.json();
    setOptimizationResult(data);
  } catch (err) {
    setOptimizationResult({ error: "Error optimizing routes." });
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex h-screen bg-smartflow-light-bg">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-smartflow-dark-navy">Delivery Management</h1>
            <p className="text-gray-600">Track routes and optimize delivery efficiency</p>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {deliveryCards.map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
          </div>

          <DeliveryMap />



  <div className="bg-white shadow rounded p-6 mt-8 space-y-4">
  <h2 className="text-xl font-semibold text-smartflow-dark-navy">
    Route Optimization
  </h2>
  <label className="block font-medium">
    Coordinates (one per line: lat,lon)
  </label>
  <textarea
    value={coordsInput}
    onChange={(e) => setCoordsInput(e.target.value)}
    placeholder="Example:\n26.91,75.78\n26.92,75.79"
    className="w-full border rounded p-3 h-32"
  />

  <button
    onClick={optimizeRoutes}
    disabled={loading}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
  >
    {loading ? "Optimizing..." : "Optimize Routes"}
  </button>

  {optimizationResult && !optimizationResult.error && (
    <div className="mt-4 space-y-4">
      <p>
        <strong>Fuel Saved:</strong>{" "}
        {optimizationResult.fuel_saved} units
      </p>
      <h3 className="font-semibold">Clusters:</h3>
      <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
        {JSON.stringify(optimizationResult.clusters, null, 2)}
      </pre>
      <h3 className="font-semibold">Optimized Path:</h3>
      <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
        {JSON.stringify(optimizationResult.optimized_path, null, 2)}
      </pre>
    </div>
  )}

  {optimizationResult && optimizationResult.optimized_path && (
  <div className="bg-white shadow rounded p-6 mt-6">
    <h2 className="text-xl font-semibold mb-4 text-smartflow-dark-navy">
      Map Visualization
    </h2>
    <RouteMap
      points={optimizationResult.optimized_path.map((coord) => ({
        lat: coord[0],
        lon: coord[1],
        cluster: Object.keys(optimizationResult.clusters).find((k) =>
          optimizationResult.clusters[k].some(
            (p) => p.lat === coord[0] && p.lon === coord[1]
          )
        ) || "0"
      }))}
    />
  </div>
)}


  {optimizationResult?.error && (
    <p className="text-red-600">{optimizationResult.error}</p>
  )}
</div>



        </main>
      </div>
    </div>
  );
}