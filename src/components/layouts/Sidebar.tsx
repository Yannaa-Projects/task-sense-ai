
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListTodo,
  ListCheck,
  CalendarDays, 
  MessageSquare,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: '/' 
    },
    { 
      title: 'Tasks', 
      icon: <ListTodo className="h-5 w-5" />, 
      path: '/tasks' 
    },
    { 
      title: 'Calendar', 
      icon: <CalendarDays className="h-5 w-5" />, 
      path: '/calendar' 
    },
    { 
      title: 'Daily Plan', 
      icon: <ListCheck className="h-5 w-5" />, 
      path: '/daily-plan' 
    },
    { 
      title: 'Messages', 
      icon: <MessageSquare className="h-5 w-5" />, 
      path: '/messages' 
    },
    { 
      title: 'Team', 
      icon: <Users className="h-5 w-5" />, 
      path: '/team' 
    }
  ];

  return (
    <aside className={cn(
      "flex flex-col h-full border-r border-border bg-card transition-all",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {!collapsed && (
          <h1 className="text-xl font-semibold bg-gradient-to-r from-brand-purple to-brand-purple-dark bg-clip-text text-transparent">
            TaskFlow AI
          </h1>
        )}
        <button 
          className="p-1 rounded-md hover:bg-secondary"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-item",
                location.pathname === item.path && "active",
                collapsed && "justify-center px-2"
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <Link 
          to="/settings"
          className={cn(
            "sidebar-item",
            location.pathname === '/settings' && "active",
            collapsed && "justify-center px-2"
          )}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
