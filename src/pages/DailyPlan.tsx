
import Layout from "@/components/layouts/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const DailyPlan = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Daily Plan</h1>
            <p className="text-muted-foreground mt-1">AI-powered schedule for May 17, 2025</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button>Today</Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate Plan
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-right font-medium text-sm w-20">
                    9:00 AM
                    <div className="text-xs text-muted-foreground">1 hour</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-brand-blue p-3 rounded-lg">
                      <h3 className="font-medium">Deep Work: Project Planning</h3>
                      <p className="text-sm text-muted-foreground">Focus on planning upcoming project milestones</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-right font-medium text-sm w-20">
                    10:00 AM
                    <div className="text-xs text-muted-foreground">1 hour</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-brand-purple/20 p-3 rounded-lg">
                      <h3 className="font-medium">Team Meeting</h3>
                      <p className="text-sm text-muted-foreground">Weekly status update with the development team</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-right font-medium text-sm w-20">
                    11:00 AM
                    <div className="text-xs text-muted-foreground">1 hour</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-task-low p-3 rounded-lg">
                      <h3 className="font-medium">Email & Communication</h3>
                      <p className="text-sm text-muted-foreground">Respond to pending emails and messages</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-right font-medium text-sm w-20">
                    12:00 PM
                    <div className="text-xs text-muted-foreground">1 hour</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted p-3 rounded-lg">
                      <h3 className="font-medium">Lunch Break</h3>
                      <p className="text-sm text-muted-foreground">Time to recharge</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-right font-medium text-sm w-20">
                    1:00 PM
                    <div className="text-xs text-muted-foreground">1 hour</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-brand-blue p-3 rounded-lg">
                      <h3 className="font-medium">Deep Work: Create PRD</h3>
                      <p className="text-sm text-muted-foreground">Work on the product requirements document</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-right font-medium text-sm w-20">
                    2:00 PM
                    <div className="text-xs text-muted-foreground">1 hour</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-task-medium p-3 rounded-lg">
                      <h3 className="font-medium">Client Call</h3>
                      <p className="text-sm text-muted-foreground">Review project progress with the client</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-right font-medium text-sm w-20">
                    3:00 PM
                    <div className="text-xs text-muted-foreground">1 hour</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-brand-blue p-3 rounded-lg">
                      <h3 className="font-medium">Deep Work: Presentation Prep</h3>
                      <p className="text-sm text-muted-foreground">Prepare slides for stakeholder meeting</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-right font-medium text-sm w-20">
                    4:00 PM
                    <div className="text-xs text-muted-foreground">1 hour</div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-task-high p-3 rounded-lg">
                      <h3 className="font-medium">Project Review</h3>
                      <p className="text-sm text-muted-foreground">End of week project review with stakeholders</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Today's Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Productivity Stats</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Deep Work</span>
                      <span>3 hours</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Meetings</span>
                      <span>3 hours</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Breaks</span>
                      <span>1 hour</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Top Priorities</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-task-high"></div>
                    <span className="text-sm">Create PRD for new mobile app</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-task-medium"></div>
                    <span className="text-sm">Prepare stakeholder presentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-task-medium"></div>
                    <span className="text-sm">Review team project plan</span>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">AI Suggestions</h3>
                <div className="bg-secondary/80 p-3 rounded-lg text-sm">
                  <p className="mb-2">You have 3 consecutive meetings in the afternoon. Consider adding short breaks between them.</p>
                  <Button size="sm" variant="outline" className="w-full">Apply Suggestion</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DailyPlan;
