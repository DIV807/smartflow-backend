import { Link, useLocation } from "wouter";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  if (location === "/dashboard") return null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-smartflow-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-smartflow-dark-navy">SmartFlow</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-gray-700 hover:text-smartflow-primary px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-smartflow-primary px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </a>
              {!isAuthenticated ? (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-smartflow-primary px-3 py-2 text-sm font-medium transition-colors">
                    Login
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-smartflow-primary text-white hover:bg-smartflow-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard">
                  <Button className="bg-smartflow-primary text-white hover:bg-smartflow-primary/90">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-smartflow-primary"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-smartflow-primary">
              Features
            </a>
            <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-smartflow-primary">
              Pricing
            </a>
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-smartflow-primary">
                  Login
                </Link>
                <Link href="/signup" className="block px-3 py-2 text-base font-medium text-smartflow-primary">
                  Get Started
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-smartflow-primary">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
