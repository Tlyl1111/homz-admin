
import { Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProductTableProps {
  onEdit: (product: any) => void;
}

export const ProductTable = ({ onEdit }: ProductTableProps) => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data || [];
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center text-red-600">Error loading products: {error.message}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center text-gray-500">No products found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.product_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 mr-4 flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name || 'Unnamed Product'}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {product.product_id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.price ? formatPrice(product.price) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Category {product.categoryId || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-1">
                  {product.colorsList?.split(',').map((color: string, index: number) => {
                    const colorMap: Record<string, string> = {
                      red: '#9E2C21',
                      green: '#559484',
                      blue: '#104061'
                    };

                    return (
                      <span
                        key={index}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: colorMap[color.trim()] || '#ccc' }}
                      />
                    );
                  })}
                </div>
              </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
