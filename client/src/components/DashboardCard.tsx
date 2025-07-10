import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  changePercent: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  changeBadgeColor: string;
}

export default function DashboardCard({
  title,
  value,
  description,
  changePercent,
  changeType,
  icon: Icon,
  iconBgColor,
  iconColor,
  changeBadgeColor
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <span className={`text-xs font-medium ${changeBadgeColor} px-2 py-1 rounded-full`}>
          {changeType === "positive" ? "+" : "-"}{changePercent}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-smartflow-dark-navy">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  );
}
