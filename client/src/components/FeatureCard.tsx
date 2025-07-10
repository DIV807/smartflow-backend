import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
}

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  iconBgColor = "bg-smartflow-primary/10",
  iconColor = "text-smartflow-primary"
}: FeatureCardProps) {
  return (
    <div className="bg-smartflow-light-bg rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-6`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold text-smartflow-dark-navy mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
