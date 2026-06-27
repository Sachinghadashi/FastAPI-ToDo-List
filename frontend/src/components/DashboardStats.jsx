import React from 'react';
import { ListTodo, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Tasks",
      value: stats?.total_tasks ?? 0,
      icon: ListTodo,
      color: "text-brand-primary",
      bg: "bg-brand-primary/10",
      border: "border-brand-primary/20"
    },
    {
      title: "Completed",
      value: stats?.completed_tasks ?? 0,
      icon: CheckCircle2,
      color: "text-brand-secondary",
      bg: "bg-brand-secondary/10",
      border: "border-brand-secondary/20"
    },
    {
      title: "Pending",
      value: stats?.pending_tasks ?? 0,
      icon: Clock,
      color: "text-brand-warning",
      bg: "bg-brand-warning/10",
      border: "border-brand-warning/20"
    },
    {
      title: "Overdue",
      value: stats?.overdue_tasks ?? 0,
      icon: AlertTriangle,
      color: "text-brand-danger",
      bg: "bg-brand-danger/10",
      border: "border-brand-danger/20",
      pulse: (stats?.overdue_tasks ?? 0) > 0
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`p-5 rounded-2xl bg-dark-card border ${card.border} transition duration-300 hover:-translate-y-1 shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-dark-muted">{card.title}</span>
              <div className={`p-2.5 rounded-xl ${card.bg} ${card.color}`}>
                <Icon className={`w-5 h-5 ${card.pulse ? "animate-pulse" : ""}`} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-dark-text">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
