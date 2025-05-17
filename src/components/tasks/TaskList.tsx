
import { useState } from "react";
import { CheckCheck, Clock, Edit, ListTodo, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import TaskHistoryDialog from "./TaskHistoryDialog";

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
  tasks: Task[];
  onTaskStatusChange: (taskId: string) => void;
  onTaskEdit?: (task: Task) => void;
}

const TaskList = ({ limit, tasks, onTaskStatusChange, onTaskEdit }: TaskListProps) => {
  const displayedTasks = limit ? tasks.slice(0, limit) : tasks;
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleViewHistory = (taskId: string) => {
    setSelectedTaskId(taskId);
    setHistoryDialogOpen(true);
  };

  return (
    <div className="space-y-3">
      {displayedTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <ListTodo className="mx-auto h-8 w-8 mb-2" />
          <p>No tasks to display</p>
        </div>
      ) : (
        displayedTasks.map(task => (
          <div 
            key={task.id} 
            className={cn(
              "task-card flex items-start gap-4 p-4 border rounded-md",
              task.completed && "opacity-70"
            )}
          >
            <Checkbox 
              checked={task.completed}
              onCheckedChange={() => onTaskStatusChange(task.id)}
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
                  "text-xs px-2 py-1 rounded-full",
                  task.priority === "high" && "bg-red-100 text-red-800",
                  task.priority === "medium" && "bg-yellow-100 text-yellow-800",
                  task.priority === "low" && "bg-blue-100 text-blue-800",
                  task.priority === "completed" && "bg-green-100 text-green-800"
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
              {onTaskEdit && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => onTaskEdit(task)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => handleViewHistory(task.id)}
              >
                <History className="h-4 w-4" />
              </Button>
              
              {task.completed && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                  <CheckCheck className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))
      )}

      <TaskHistoryDialog 
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
        taskId={selectedTaskId}
      />
    </div>
  );
};

export default TaskList;
