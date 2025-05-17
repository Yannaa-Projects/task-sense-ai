
import Layout from "@/components/layouts/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground mt-1">View and manage your schedule</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle>May 2025</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button>Today</Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center font-medium py-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: 35 }).map((_, i) => {
                const date = i - 3;
                const isToday = date === 17;
                const isCurrentMonth = date > 0 && date <= 31;
                
                return (
                  <div 
                    key={i} 
                    className={`h-24 border rounded-lg p-1 ${
                      isToday ? 'bg-primary/10 border-primary' : 
                      !isCurrentMonth ? 'bg-muted/30 text-muted-foreground' : 
                      ''
                    }`}
                  >
                    <div className="text-right mb-1">
                      {isCurrentMonth ? date : ''}
                    </div>
                    
                    {isToday && (
                      <div className="text-xs bg-primary text-primary-foreground p-1 rounded mb-1 truncate">
                        10:00 AM - Team Meeting
                      </div>
                    )}
                    
                    {date === 19 && (
                      <div className="text-xs bg-task-medium text-amber-800 p-1 rounded mb-1 truncate">
                        2:00 PM - Client Call
                      </div>
                    )}
                    
                    {date === 21 && (
                      <div className="text-xs bg-task-high text-red-800 p-1 rounded mb-1 truncate">
                        4:00 PM - Project Review
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Calendar;
