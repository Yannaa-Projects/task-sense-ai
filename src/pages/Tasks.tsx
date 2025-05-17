
import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter } from "lucide-react";
import TaskList from "@/components/tasks/TaskList";

const Tasks = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage and organize your tasks</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
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
                <TaskList />
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
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-4">This tab is still in development</p>
                  <Button variant="outline">View All Tasks</Button>
                </div>
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
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-4">This tab is still in development</p>
                  <Button variant="outline">View All Tasks</Button>
                </div>
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
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-4">This tab is still in development</p>
                  <Button variant="outline">View All Tasks</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tasks;
