
import { useState } from "react";
import { CheckCheck, Clock, Edit, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "completed";
  dueDate: string;
  completed: boolean;
  assignedTo?: string;
}

interface TaskListProps {
  limit?: number;
}

const TaskList = ({ limit }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([
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
    },
    {
      id: "4",
      title: "Update API documentation",
      description: "Update the documentation for the new API endpoints",
      priority: "low",
      dueDate: "2025-05-22",
      completed: false
    },
    {
      id: "5",
      title: "Approve vacation requests",
      description: "Review and approve team vacation requests for next month",
      priority: "medium",
      dueDate: "2025-05-20",
      completed: false
    },
    {
      id: "6",
      title: "Install developer tools",
      description: "Set up local development environment with the latest tools",
      priority: "completed",
      dueDate: "2025-05-16",
      completed: true
    }
  ]);

  const toggleTaskStatus = (taskId: string) => {
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

  const displayedTasks = limit ? tasks.slice(0, limit) : tasks;

  return (
    <div className="space-y-3">
      {displayedTasks.map(task => (
        <div 
          key={task.id} 
          className={cn(
            "task-card flex items-start gap-4",
            task.completed && "opacity-70"
          )}
        >
          <Checkbox 
            checked={task.completed}
            onCheckedChange={() => toggleTaskStatus(task.id)}
            className="mt-1"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "font-medium",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              <span className={cn(
                "priority-badge",
                `priority-${task.priority}`
              )}>
                {task.priority === "completed" ? "Completed" : task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {task.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              
              {task.assignedTo && (
                <span>Assigned to: {task.assignedTo}</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            
            {task.completed && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                <CheckCheck className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
