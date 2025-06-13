import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { OrderTable } from "../components/OrderTable";

const Orders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Management</h1>
            <p className="text-muted-foreground">Track and update order status</p>
          </div>
          <OrderFilters
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
          />

          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default Orders;
