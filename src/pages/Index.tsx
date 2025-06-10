
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { DashboardStats } from "../components/DashboardStats";
import { SalesChart } from "../components/SalesChart";
import { RecentOrders } from "../components/RecentOrders";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">System management overview</p>
          </div>

          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <SalesChart />
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
