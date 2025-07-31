import { useNavigate, useLocation } from 'react-router';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

interface SidebarLayoutProps {
  children: React.ReactNode
  sidebarItems: SidebarItem[]
}

export default function SidebarLayout({ children, sidebarItems }: SidebarLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const Sidebar = ({ className = '' }: { className?: string }) => (
    <div className={`bg-white w-64 min-h-screen ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-center">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-12 w-auto"
          />
        </div>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item) => {
          const isActive = currentPath === item.href;
          const isLogout = item.label === 'Logout';
          
          if (isLogout) {
            return (
              <button
                key={item.href}
                onClick={() => {
                  // Handle logout functionality here
                  console.log('Logout clicked');
                }}
                className="flex items-center justify-end px-6 py-3 transition-colors relative text-gray-500 hover:bg-red-50 hover:text-gray-600 w-full text-right"
              >
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          }
          
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`flex items-center justify-end px-6 py-3 transition-colors relative w-full text-right ${
                isActive 
                  ? 'text-gray-600' 
                  : 'text-gray-500 hover:bg-red-50 hover:text-gray-600'
              }`}
              style={isActive ? {
                position: 'relative',
              } : {}}
            >
              {isActive && (
                <div 
                  className="absolute top-0 left-0 h-full w-1/5 z-0"
                  style={{
                    background: 'linear-gradient(to right, rgba(216, 4, 12, 1) 0%, rgba(216, 4, 12, 0.2) 0%, transparent 100%, transparent 100%)',
                    borderRadius: '0 8px 8px 0'
                  }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        {children}
      </div>
    </div>
  )
}