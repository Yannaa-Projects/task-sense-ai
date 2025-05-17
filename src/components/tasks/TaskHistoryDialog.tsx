
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface TaskHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string | null;
}

interface PriorityLog {
  id: string;
  task_id: string;
  task_title: string;
  previous_priority: string;
  new_priority: string;
  created_at: string;
}

const formatPriority = (priority: string) => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

const TaskHistoryDialog = ({ open, onOpenChange, taskId }: TaskHistoryDialogProps) => {
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["taskLogs", taskId],
    queryFn: async () => {
      if (!taskId) return [];
      
      const { data, error } = await supabase
        .from("task_priority_logs")
        .select("*")
        .eq("task_id", taskId)
        .order("created_at", { ascending: false });
      
      if (error) throw new Error(error.message);
      return data as PriorityLog[];
    },
    enabled: !!taskId && open
  });

  if (!taskId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Task Priority History</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center p-4">Loading history...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="mx-auto h-8 w-8 mb-2" />
            <p>No priority change history available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="border rounded-md p-3">
                <div className="text-sm font-medium mb-1">{log.task_title}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    log.previous_priority === "high" ? "bg-red-100 text-red-800" : 
                    log.previous_priority === "medium" ? "bg-yellow-100 text-yellow-800" : 
                    log.previous_priority === "low" ? "bg-blue-100 text-blue-800" : 
                    "bg-green-100 text-green-800"
                  }`}>
                    {formatPriority(log.previous_priority)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    log.new_priority === "high" ? "bg-red-100 text-red-800" : 
                    log.new_priority === "medium" ? "bg-yellow-100 text-yellow-800" : 
                    log.new_priority === "low" ? "bg-blue-100 text-blue-800" : 
                    "bg-green-100 text-green-800"
                  }`}>
                    {formatPriority(log.new_priority)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Changed on {format(new Date(log.created_at), "MMM d, yyyy 'at' h:mm a")}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskHistoryDialog;
