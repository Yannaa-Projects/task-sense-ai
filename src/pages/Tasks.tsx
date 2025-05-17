
import { useState } from "react";
import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import TaskList from "@/components/tasks/TaskList";
import TaskFormDialog from "@/components/tasks/TaskFormDialog";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "completed";
  dueDate: string;
  completed: boolean;
  assignedTo?: string;
}

const Tasks = () => {
  const { toast } = useToast();
  
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

  const [activeTab, setActiveTab] = useState("all");

  const handleTaskCreate = (newTask: Task) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
    toast({
      title: "Task Created",
      description: `"${newTask.title}" has been added to your tasks`,
    });
  };

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
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tasks;
