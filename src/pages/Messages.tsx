
import Layout from "@/components/layouts/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const Messages = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground mt-1">Team communication and updates</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-1 px-3 pb-3">
                  <div className="flex items-center gap-3 p-3 rounded-md bg-secondary">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <span className="text-sm font-medium">TS</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Team Standup</p>
                      <p className="text-xs text-muted-foreground truncate">Alex: I'll finish the PRD by EOD</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">10:30 AM</span>
                      <span className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">3</span>
                    </div>
                  </div>
                  
                  {['Design Team', 'Project X', 'Client Meeting Notes', 'Weekly Report'].map((chat, i) => (
                    <div key={chat} className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary/50 cursor-pointer">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-medium">{chat.split(' ').map(word => word[0]).join('')}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{chat}</p>
                        <p className="text-xs text-muted-foreground truncate">Last message from conversation</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">{`${Math.floor(Math.random() * 12)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <span className="text-sm font-medium">TS</span>
                </div>
                <div>
                  <div>Team Standup</div>
                  <div className="text-xs text-muted-foreground">5 members</div>
                </div>
              </CardTitle>
              <Button variant="outline" size="sm">View Info</Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] px-6 py-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">SJ</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Sarah Johnson</span>
                        <span className="text-xs text-muted-foreground">10:05 AM</span>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 mt-1">
                        <p className="text-sm">Good morning team! What's everyone working on today?</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">TP</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Tom Parker</span>
                        <span className="text-xs text-muted-foreground">10:08 AM</span>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 mt-1">
                        <p className="text-sm">I'm finalizing the design mockups for the new feature. Should be ready for review by lunch.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">RD</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Rachel Davis</span>
                        <span className="text-xs text-muted-foreground">10:12 AM</span>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 mt-1">
                        <p className="text-sm">I'm addressing the QA feedback from yesterday. There are a few bugs that need fixing before we can ship.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">MR</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Michael Rodriguez</span>
                        <span className="text-xs text-muted-foreground">10:18 AM</span>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 mt-1">
                        <p className="text-sm">Working on the backend integration for the new API. Should be done by end of day.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <span className="text-xs font-medium">AJ</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Alex Johnson</span>
                        <span className="text-xs text-muted-foreground">10:30 AM</span>
                      </div>
                      <div className="bg-primary rounded-lg p-3 mt-1">
                        <p className="text-sm text-primary-foreground">I'm working on the PRD for the mobile app. I should have it completed by end of day. Does anyone have any input before I finalize it?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <Separator className="my-3" />
              
              <div className="p-3 flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
