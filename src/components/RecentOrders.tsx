import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const RecentOrders = () => {
  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('Orders')
        .select(`
          order_id,
          total_amount,
          status,
          order_date,
          product_name,
          color,
          Users!Orders_user_id_fkey(Name)
        `)
        .order('order_date', { ascending: false })
        .limit(4);

      return data || [];
    }
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800", 
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };

    const labels = {
      pending: "Pending",
      processing: "Processing",
      delivered: "Delivered",
      cancelled: "Cancelled"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Recent Orders</h3>
        <p className="text-sm text-muted-foreground">Latest orders from customers</p>
      </div>

      <div className="space-y-4">
        {recentOrders?.map((order) => (
          <div key={order.order_id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{order.order_id}</span>
                {getStatusBadge(order.status || 'pending')}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{order.Users?.Name || 'Unknown Customer'}</p>
              <p className="text-sm text-muted-foreground">{order.product_name || 'Product'}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">${order.total_amount || 0}</p>
              <p className="text-sm text-muted-foreground">
                {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-primary hover:text-primary/80 font-medium text-sm">
          View all orders →
        </button>
      </div>
    </div>
  );
};
