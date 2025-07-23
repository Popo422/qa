import { Outlet } from "react-router";
import SidebarLayout from "../../components/SidebarLayout";
import { Home, Users, Settings, BarChart3, Package, ShoppingCart } from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminRoot() {
  return (
    <SidebarLayout 
      title="Admin Panel" 
      sidebarItems={sidebarItems}
    >
      <Outlet />
    </SidebarLayout>
  );
}