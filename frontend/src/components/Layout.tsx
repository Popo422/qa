import { Outlet } from 'react-router';
import SidebarLayout from './SidebarLayout';
import { Volume2, Home, Bot, BarChart3, Users, FileText, LogOut } from 'lucide-react';
import { Toaster } from './ui/sonner';

const sidebarItems = [
  { icon: Volume2, label: 'Audio Evaluation', href: '/audio-evaluation' },
  { icon: Home, label: 'Manager Dashboard', href: '/dashboard' },
  { icon: Bot, label: 'AI Dashboard', href: '/ai-dashboard' },
  { icon: BarChart3, label: 'Agent Statistics', href: '/agent-statistics' },
  { icon: Users, label: 'Manage Users', href: '/manage-users' },
  { icon: FileText, label: 'Rubrics', href: '/rubrics' },
  { icon: LogOut, label: 'Logout', href: '/logout' },
];

export const Layout = () => {
  return (
    <SidebarLayout 
      title="Dashboard" 
      sidebarItems={sidebarItems}
    >
      <Outlet />
      <Toaster />
    </SidebarLayout>
  );
};
