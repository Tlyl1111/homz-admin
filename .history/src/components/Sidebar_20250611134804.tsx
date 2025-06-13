
import { Link, useLocation } from "react-router-dom";
import { Home, Package, ShoppingCart, Users, Menu, X, List } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Orders", icon: ShoppingCart, path: "/orders" },
    { name: "Users", icon: Users, path: "/users" },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-sidebar shadow-lg transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${isOpen ? '' : 'justify-center'}`}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            {isOpen && (
              <span className="ml-3 text-xl font-bold text-sidebar-foreground">Admin</span>
            )}
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-sidebar-accent rounded-md transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav className="mt-6 px-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary border-r-2 border-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              } ${isOpen ? '' : 'justify-center'}`}
            >
              <item.icon size={20} />
              {isOpen && <span className="ml-3 font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
