import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-smartflow-dark-navy to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="text-smartflow-dark-navy">Predict.</span>{" "}
              <span className="text-smartflow-primary">Deliver.</span>{" "}
              <span className="text-smartflow-eco-accent">Save.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 leading-relaxed">
              AI-powered retail management that predicts stock shortages, optimizes delivery routes, and tracks your environmental impact in real-time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-smartflow-primary text-white hover:bg-smartflow-primary/90 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
                  Start Free Trial
                </Button>
              </Link>
             <Button 
  size="lg"
  className="bg-white text-smartflow-dark-navy border border-gray-400 hover:bg-smartflow-dark-navy hover:text-white px-8 py-3 text-lg font-semibold rounded-xl transition-colors duration-300"
>
  Watch Demo
</Button>

            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="SmartFlow dashboard preview showing analytics and inventory management" 
              className="rounded-2xl shadow-2xl border border-gray-700 w-full" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-smartflow-dark-navy/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
