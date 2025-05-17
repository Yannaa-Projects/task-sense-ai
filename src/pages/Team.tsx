
import Layout from "@/components/layouts/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ChevronDown, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Team Lead",
      avatar: "AJ",
      tasks: { completed: 16, total: 24 },
      focus: 18.5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Product Manager",
      avatar: "SJ",
      tasks: { completed: 12, total: 18 },
      focus: 15.2
    },
    {
      id: 3,
      name: "Tom Parker",
      role: "UI Designer",
      avatar: "TP",
      tasks: { completed: 8, total: 14 },
      focus: 12.5
    },
    {
      id: 4,
      name: "Rachel Davis",
      role: "QA Engineer",
      avatar: "RD",
      tasks: { completed: 20, total: 22 },
      focus: 16.8
    },
    {
      id: 5,
      name: "Michael Rodriguez",
      role: "Backend Developer",
      avatar: "MR",
      tasks: { completed: 14, total: 19 },
      focus: 17.3
    },
    {
      id: 6,
      name: "Emily White",
      role: "Frontend Developer",
      avatar: "EW",
      tasks: { completed: 10, total: 15 },
      focus: 14.7
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team</h1>
            <p className="text-muted-foreground mt-1">Manage your team members and their tasks</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
            <Button variant="outline">
              This Week
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="workload">Workload</TabsTrigger>
          </TabsList>
          <TabsContent value="members" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Team Members</CardTitle>
                <CardDescription>View and manage your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="task-card">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <span className="font-medium">{member.avatar}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Tasks</span>
                            <span>{member.tasks.completed}/{member.tasks.total} completed</span>
                          </div>
                          <Progress value={(member.tasks.completed / member.tasks.total) * 100} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span>Focus Time</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {member.focus}h
                          </span>
                        </div>
                        
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Track performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <p className="text-muted-foreground mb-4">This tab is still in development</p>
                <Button variant="outline">View Team Members</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="workload" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Team Workload</CardTitle>
                <CardDescription>Balance workload across team members</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <p className="text-muted-foreground mb-4">This tab is still in development</p>
                <Button variant="outline">View Team Members</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Team;
