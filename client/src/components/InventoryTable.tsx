interface InventoryItem {
  name: string;
  sku: string;
  currentStock: number;
  maxStock: number;
  status: "critical" | "low" | "normal";
}

const mockInventoryData: InventoryItem[] = [
  {
    name: "Premium Coffee Beans",
    sku: "PCB-001",
    currentStock: 12,
    maxStock: 100,
    status: "critical"
  },
  {
    name: "Organic Tea Selection",
    sku: "OTS-042",
    currentStock: 25,
    maxStock: 150,
    status: "low"
  },
  {
    name: "Artisan Chocolates",
    sku: "AC-789",
    currentStock: 8,
    maxStock: 80,
    status: "critical"
  }
];

export default function InventoryTable() {
  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case "critical":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "low":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-green-100 text-green-800`;
    }
  };

  const criticalCount = mockInventoryData.filter(item => item.status === "critical").length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-smartflow-dark-navy">Low Stock Alerts</h2>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            {criticalCount} Critical
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockInventoryData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-smartflow-dark-navy">{item.name}</div>
                  <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-smartflow-dark-navy font-medium">{item.currentStock}</span>
                  <span className="text-gray-500">/ {item.maxStock}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(item.status)}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="text-smartflow-primary hover:text-smartflow-primary/80 text-sm font-medium transition-colors">
          View all inventory →
        </button>
      </div>
    </div>
  );
}
