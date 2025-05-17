
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TopBar = () => {
  return (
    <header className="h-16 border-b border-border px-6 flex items-center justify-between bg-card">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search..." 
          className="pl-10 bg-background" 
        />
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive flex items-center justify-center text-[10px] text-white">
            3
          </span>
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">Team Lead</p>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
