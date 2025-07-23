import { useAuth } from "@/hooks/useAuth";
import { FaHome, FaSignInAlt, FaUserPlus, FaTachometerAlt } from "react-icons/fa";

interface MenuItem {
  name: string;
  path?: string;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  show?: boolean;
}

export const Navigation = (props: { children: any }) => {
  const { user, logout } = useAuth();

  const menuItems: MenuItem[] = [ 
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Login', path: '/login', icon: FaSignInAlt },
    { name: 'Register', path: '/register', icon: FaUserPlus },
    { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt, show: !!user },
    { name: 'Logout', icon: FaSignInAlt, onClick: logout, show: !!user }
  ];

  return (
    <div className="flex h-screen">
      <div className="fixed flex bg-primary w-full h-10">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          if (!item.path && !item.onClick) return null;
          if (item.show !== undefined && !item.show) return null;
          if (item.path) {
            return (
              <a
                key={index}
                href={item.path}
                className="flex items-center p-4 text-secondary justify-center"
              >
                <Icon className="mr-2" />
                <span>{item.name}</span>
              </a>
            );
          } else if (item.onClick) {
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="flex items-center p-4 text-secondary justify-center cursor-pointer"
              >
                <Icon className="mr-2" />
                <span>{item.name}</span>
              </button>
            );
          }
        })}
      </div>
      <div className="w-full">{props.children}</div>
    </div>
  );
};
