
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { UserTable } from "../components/UserTable";
import { UserFilters } from "../components/UserFilters";
import { NotificationForm } from "../components/NotificationForm";
import { Bell } from "lucide-react";

const Users = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    role: ""
  });

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleRoleChange = (role: string) => {
    setFilters(prev => ({ ...prev, role }));
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
              <p className="text-muted-foreground">User list and send notifications</p>
            </div>
            
          </div>

          

          {showNotificationForm ? (
            <NotificationForm onClose={() => setShowNotificationForm(false)} />
          ) : (
            <UserTable filters={filters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
