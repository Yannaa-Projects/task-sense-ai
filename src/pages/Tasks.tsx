import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import TaskList from "@/components/tasks/TaskList";
import TaskFormDialog from "@/components/tasks/TaskFormDialog";
import TaskEditDialog from "@/components/tasks/TaskEditDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "completed";
  dueDate: string;
  completed: boolean;
  assignedTo?: string;
}

interface SupabaseTask {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  due_date: string;
  completed: boolean;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

// Convert Supabase task to our application Task format
const mapSupabaseTask = (task: SupabaseTask): Task => ({
  id: task.id,
  title: task.title,
  description: task.description || "",
  priority: task.priority as "low" | "medium" | "high" | "completed",
  dueDate: task.due_date,
  completed: task.completed,
  assignedTo: task.assigned_to || undefined
});

// Convert our application Task to Supabase format
const mapToSupabaseTask = (task: Task): {
  title: string;
  description: string | null;
  priority: string;
  due_date: string;
  completed: boolean;
  assigned_to: string | null;
} => ({
  title: task.title,
  description: task.description || null,
  priority: task.priority,
  due_date: task.dueDate,
  completed: task.completed,
  assigned_to: task.assignedTo || null
});

const Tasks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState("all");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Fetch tasks from Supabase
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }

      return (data as SupabaseTask[]).map(mapSupabaseTask);
    }
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Task) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert(mapToSupabaseTask(newTask))
        .select("*")
        .single();
      
      if (error) throw new Error(error.message);
      return mapSupabaseTask(data as SupabaseTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const { data, error } = await supabase
        .from("tasks")
        .update(mapToSupabaseTask(task))
        .eq("id", task.id)
        .select("*")
        .single();
      
      if (error) throw new Error(error.message);
      return mapSupabaseTask(data as SupabaseTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const handleTaskCreate = (newTask: Task) => {
    createTaskMutation.mutate(newTask, {
      onSuccess: (createdTask) => {
        toast({
          title: "Task Created",
          description: `"${createdTask.title}" has been added to your tasks`,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  const handleTaskStatusToggle = (taskId: string) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) return;

    const completed = !taskToUpdate.completed;
    const updatedTask = {
      ...taskToUpdate,
      completed,
      priority: completed ? "completed" : taskToUpdate.priority
    };

    updateTaskMutation.mutate(updatedTask, {
      onSuccess: () => {
        toast({
          title: completed ? "Task Completed" : "Task Reopened",
          description: `"${updatedTask.title}" has been ${completed ? "marked as complete" : "reopened"}`,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  const handleTaskEdit = (task: Task) => {
    setTaskToEdit(task);
    setEditDialogOpen(true);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    updateTaskMutation.mutate(updatedTask, {
      onSuccess: () => {
        toast({
          title: "Task Updated",
          description: `"${updatedTask.title}" has been updated`,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  const getFilteredTasks = (tabName: string) => {
    switch (tabName) {
      case "mine":
        return tasks.filter(task => !task.completed && task.assignedTo === "Alex Johnson");
      case "overdue":
        return tasks.filter(task => 
          !task.completed && 
          new Date(task.dueDate) < new Date()
        );
      case "completed":
        return tasks.filter(task => task.completed);
      case "all":
      default:
        return tasks;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage and organize your tasks</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <TaskFormDialog onTaskCreated={handleTaskCreate} />
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mine">Assigned to Me</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Tasks</CardTitle>
                <CardDescription>View and manage all of your tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList 
                  tasks={getFilteredTasks("all")}
                  onTaskStatusChange={handleTaskStatusToggle}
                  onTaskEdit={handleTaskEdit}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mine" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>Tasks assigned to you</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList 
                  tasks={getFilteredTasks("mine")}
                  onTaskStatusChange={handleTaskStatusToggle}
                  onTaskEdit={handleTaskEdit}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="overdue" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Overdue Tasks</CardTitle>
                <CardDescription>Tasks that are past their due date</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList 
                  tasks={getFilteredTasks("overdue")}
                  onTaskStatusChange={handleTaskStatusToggle}
                  onTaskEdit={handleTaskEdit}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Completed Tasks</CardTitle>
                <CardDescription>Tasks you've already completed</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList 
                  tasks={getFilteredTasks("completed")}
                  onTaskStatusChange={handleTaskStatusToggle}
                  onTaskEdit={handleTaskEdit}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <TaskEditDialog 
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          task={taskToEdit}
          onTaskUpdated={handleTaskUpdate}
        />
      </div>
    </Layout>
  );
};

export default Tasks;
