
import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const DashboardStats = () => {
  const { data: ordersCount } = useQuery({
    queryKey: ['orders-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('Orders')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: usersCount } = useQuery({
    queryKey: ['users-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('Users')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: productsCount } = useQuery({
    queryKey: ['products-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('Products')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: totalRevenue } = useQuery({
    queryKey: ['total-revenue'],
    queryFn: async () => {
      const { data } = await supabase
        .from('Orders')
        .select('total_amount');
      
      const total = data?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      return total;
    }
  });

  const stats = [
    {
      title: "Total Orders",
      value: ordersCount?.toLocaleString() || "0",
      change: "+12%",
      changeType: "increase",
      icon: ShoppingCart,
      color: "primary"
    },
    {
      title: "Users",
      value: usersCount?.toLocaleString() || "0",
      change: "+8%",
      changeType: "increase",
      icon: Users,
      color: "secondary"
    },
    {
      title: "Products",
      value: productsCount?.toLocaleString() || "0",
      change: "+3%",
      changeType: "increase",
      icon: Package,
      color: "accent"
    },
    {
      title: "Revenue",
      value: `$${totalRevenue?.toLocaleString() || "0"}`,
      change: "+18%",
      changeType: "increase",
      icon: DollarSign,
      color: "muted"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      primary: "bg-primary/10 text-primary",
      secondary: "bg-secondary/20 text-secondary-foreground",
      accent: "bg-accent/20 text-accent-foreground",
      muted: "bg-muted/20 text-muted-foreground"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
