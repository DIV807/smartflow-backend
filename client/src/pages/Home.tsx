import { TrendingUp, Route, Leaf } from "lucide-react";
import { Link } from "wouter";

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import StatsStrip from "@/components/StatsStrip";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      icon: TrendingUp,
      title: "Inventory Forecasting",
      description: "AI-powered predictions help you maintain optimal stock levels, reducing shortages by up to 35% while minimizing excess inventory."
    },
    {
      icon: Route,
      title: "Route Optimization",
      description: "Smart delivery routing reduces fuel consumption by 22% while ensuring faster deliveries and improved customer satisfaction."
    },
    {
      icon: Leaf,
      title: "Eco Impact Tracking",
      description: "Monitor and reduce your carbon footprint with real-time sustainability metrics and environmental impact reporting.",
      iconBgColor: "bg-smartflow-eco-accent/10",
      iconColor: "text-smartflow-eco-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-smartflow-light-bg">
      <NavBar />
      
      <HeroSection />
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-smartflow-dark-navy mb-4">
              Everything you need to optimize retail operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage AI to predict demand, optimize routes, and reduce environmental impact while maximizing profitability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconBgColor={feature.iconBgColor}
                iconColor={feature.iconColor}
              />
            ))}
          </div>
        </div>
      </section>
      
      <StatsStrip />
      
      {/* CTA Section */}
      <section className="py-24 bg-smartflow-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Start your free trial today
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Join over 2,000 retail managers who have transformed their operations with SmartFlow. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-smartflow-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
