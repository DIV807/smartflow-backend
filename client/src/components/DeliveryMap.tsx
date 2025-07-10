export default function DeliveryMap() {
  const routeStats = {
    totalDistance: "247 km",
    avgTime: "2h 15m",
    fuelSaved: "156L"
  };

  const activeRoutes = [
    { name: "Route A", color: "bg-green-500" },
    { name: "Route B", color: "bg-blue-500" },
    { name: "Route C", color: "bg-orange-500" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-smartflow-dark-navy">Live Delivery Routes</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">3 Active Routes</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
            alt="Delivery routes map showing optimized paths across the city" 
            className="w-full h-full object-cover" 
          />
          
          {/* Route efficiency overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-smartflow-primary mb-1">87%</div>
                <div className="text-sm text-gray-600">Route Efficiency</div>
              </div>
            </div>
          </div>
          
          {/* Active route indicators */}
          <div className="absolute top-4 left-4 space-y-2">
            {activeRoutes.map((route, index) => (
              <div key={index} className="flex items-center bg-white/90 rounded-full px-3 py-1 shadow-sm">
                <div className={`w-2 h-2 ${route.color} rounded-full mr-2 animate-pulse`}></div>
                <span className="text-xs font-medium">{route.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-smartflow-dark-navy">{routeStats.totalDistance}</div>
            <div className="text-xs text-gray-500">Total Distance</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-smartflow-dark-navy">{routeStats.avgTime}</div>
            <div className="text-xs text-gray-500">Avg. Time</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-smartflow-eco-accent">{routeStats.fuelSaved}</div>
            <div className="text-xs text-gray-500">Fuel Saved</div>
          </div>
        </div>
      </div>
    </div>
  );
}
