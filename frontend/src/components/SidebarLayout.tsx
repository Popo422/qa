interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

interface SidebarLayoutProps {
  children: React.ReactNode
  title: string
  sidebarItems: SidebarItem[]
}

export default function SidebarLayout({ children, title, sidebarItems }: SidebarLayoutProps) {
  const currentPath = window.location.pathname;

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
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center justify-end px-6 py-3 transition-colors relative ${
                isActive 
                  ? 'text-gray-600 sidebar-active' 
                  : 'text-gray-500 hover:bg-red-50 hover:text-gray-600'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              <style jsx>{`
                .sidebar-active::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 20%;
                  height: 100%;
                  background: linear-gradient(to right, rgba(216, 4, 12, 1) 0%, rgba(216, 4, 12, 0.2) 0%, transparent 100%, transparent 100%);
                  border-radius: 0 8px 8px 0;
                  z-index: 1;
                }
              `}</style>
            </a>
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