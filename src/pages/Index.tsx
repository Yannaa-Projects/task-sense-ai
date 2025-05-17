
import Layout from "@/components/layouts/Layout";
import { 
  CalendarDays,
  ChevronDown,
  ListTodo,
  MessageSquare,
  Clock 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import TaskList from "@/components/tasks/TaskList";
import { useState } from "react";

// Define Task interface matching the one in TaskList.tsx
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "completed";
  dueDate: string;
  completed: boolean;
  assignedTo?: string;
}

// Sample tasks for the dashboard
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Create PRD for new mobile app",
    description: "Draft the initial product requirements document for the mobile application",
    priority: "high",
    dueDate: "2025-05-18",
    completed: false,
    assignedTo: "Alex Johnson"
  },
  {
    id: "2",
    title: "Review team project plan",
    description: "Review and provide feedback on the quarterly project plan",
    priority: "medium",
    dueDate: "2025-05-19",
    completed: false,
    assignedTo: "Alex Johnson"
  },
  {
    id: "3",
    title: "Prepare presentation for stakeholders",
    description: "Create slides for the monthly stakeholder meeting",
    priority: "high",
    dueDate: "2025-05-21",
    completed: false
  }
];

const Index = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  
  const handleTaskStatusToggle = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const completed = !task.completed;
        return {
          ...task,
          completed,
          priority: completed ? "completed" : task.priority
        };
      }
      return task;
    }));
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your tasks and schedule</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button>
              <ListTodo className="mr-2 h-4 w-4" />
              New Task
            </Button>
            <Button variant="outline">
              Today
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <DashboardMetrics />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tasks Overview</CardTitle>
                <CardDescription>Your tasks for this week</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <TaskList 
                limit={5} 
                tasks={tasks}
                onTaskStatusChange={handleTaskStatusToggle}
              />
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>Your scheduled events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Team Meeting</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="inline h-3 w-3 mr-1" /> 10:00 - 11:00 AM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Client Call</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="inline h-3 w-3 mr-1" /> 2:00 - 3:00 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <ListTodo className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Project Review</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="inline h-3 w-3 mr-1" /> 4:00 - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Your Daily Progress</CardTitle>
            <CardDescription>AI-suggested daily plan completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Task Completion</span>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Focus Time</span>
                  <span className="text-sm text-muted-foreground">3.5h / 5h</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Meeting Efficiency</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                View Full Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
