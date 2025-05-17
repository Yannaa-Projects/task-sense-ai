
import { Card, CardContent } from "@/components/ui/card";
import { CheckCheck, Clock, CalendarDays, AlertCircle, ListTodo } from "lucide-react";

const DashboardMetrics = () => {
  const metrics = [
    { 
      title: "Total Tasks",
      value: "24",
      change: "+5 from last week",
      icon: <ListTodo className="h-5 w-5" />,
      color: "bg-brand-blue"
    },
    {
      title: "Completed",
      value: "16",
      change: "67% completion rate",
      icon: <CheckCheck className="h-5 w-5" />,
      color: "bg-task-completed"
    },
    {
      title: "Hours Focused",
      value: "18.5",
      change: "+2.5 from last week",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-brand-peach"
    },
    {
      title: "High Priority",
      value: "3",
      change: "Due within 24h",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "bg-task-high"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={metric.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
              </div>
              <div className={`w-10 h-10 rounded-full ${metric.color} flex items-center justify-center opacity-80`}>
                {metric.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
