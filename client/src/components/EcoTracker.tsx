import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EcoTracker() {
  const ecoMetrics = {
    treesEquivalent: "47",
    milesReduced: "1,247",
    costSavings: "$3,890"
  };

  const weeklyData = [
    { week: "Week 1", height: "120px" },
    { week: "Week 2", height: "180px" },
    { week: "Week 3", height: "200px" },
    { week: "Week 4", height: "240px" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-smartflow-dark-navy">Environmental Impact Tracker</h2>
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-80 bg-gradient-to-br from-green-50 to-smartflow-eco-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Mock chart visualization */}
          <div className="absolute inset-0 flex items-end justify-around p-8">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-smartflow-eco-accent rounded-t" 
                  style={{ height: data.height }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.week}</span>
              </div>
            ))}
          </div>
          
          <div className="absolute top-6 left-6 bg-white/90 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-smartflow-eco-accent mb-1">↗ 22%</div>
            <div className="text-sm text-gray-600">Fuel Efficiency</div>
          </div>
        </div>
        
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">{ecoMetrics.treesEquivalent}</div>
            <div className="text-sm text-gray-600">Trees Equivalent</div>
            <div className="text-xs text-gray-500 mt-1">CO₂ saved this month</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">{ecoMetrics.milesReduced}</div>
            <div className="text-sm text-gray-600">Miles Reduced</div>
            <div className="text-xs text-gray-500 mt-1">Through optimization</div>
          </div>
          <div className="text-center p-4 bg-smartflow-eco-accent/10 rounded-lg">
            <div className="text-2xl font-bold text-smartflow-eco-accent mb-2">{ecoMetrics.costSavings}</div>
            <div className="text-sm text-gray-600">Cost Savings</div>
            <div className="text-xs text-gray-500 mt-1">From eco initiatives</div>
          </div>
        </div>
      </div>
    </div>
  );
}
