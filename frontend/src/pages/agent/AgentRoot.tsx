import { Outlet } from "react-router";
import SidebarLayout from "../../components/SidebarLayout";
import { Home, Users, Settings, BarChart3, Package, Briefcase } from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/agent' },
  { icon: Briefcase, label: 'Tasks', href: '/agent/tasks' },
  { icon: Users, label: 'Clients', href: '/agent/clients' },
  { icon: Package, label: 'Projects', href: '/agent/projects' },
  { icon: BarChart3, label: 'Reports', href: '/agent/reports' },
  { icon: Settings, label: 'Settings', href: '/agent/settings' },
];

export default function AgentRoot() {
  return (
    <SidebarLayout 
      title="Agent Portal" 
      sidebarItems={sidebarItems}
    >
      <Outlet />
    </SidebarLayout>
  );
}