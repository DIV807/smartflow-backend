export default function StatsStrip() {
  const stats = [
    {
      value: "35%",
      label: "Fewer Stockouts",
      description: "Average reduction in inventory shortages",
      color: "text-smartflow-primary"
    },
    {
      value: "22%",
      label: "Fuel Saved",
      description: "Through optimized delivery routes",
      color: "text-smartflow-eco-accent"
    },
    {
      value: "18%",
      label: "Cost Reduction",
      description: "In total operational expenses",
      color: "text-green-400"
    }
  ];

  return (
    <section className="py-16 bg-smartflow-dark-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Proven Results</h2>
          <p className="text-gray-300 text-lg">Join thousands of retailers already saving costs and reducing environmental impact</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-gray-400">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
