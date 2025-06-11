import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";

export const SalesChart = () => {
  const { data: salesData } = useQuery({
    queryKey: ['sales-chart'],
    queryFn: async () => {
      const { data } = await supabase
        .from('Orders')
        .select('order_date, total_amount')
        .order('order_date', { ascending: true });

      // Group by month and sum total amounts
      const monthlyData = data?.reduce((acc: any, order) => {
        if (!order.order_date || !order.total_amount) return acc;
        
        const date = new Date(order.order_date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!acc[monthKey]) {
          acc[monthKey] = {
            name: date.toLocaleDateString('en-US', { month: 'short' }),
            value: 0
          };
        }
        acc[monthKey].value += order.total_amount;
        return acc;
      }, {});

      return Object.values(monthlyData || {}).slice(-12);
    }
  });

  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(1)}K`;
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Revenue</h3>
        <p className="text-sm text-muted-foreground">Revenue statistics for the last 12 months</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Revenue']}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
