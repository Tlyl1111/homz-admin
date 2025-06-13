
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ProductTable } from "../components/ProductTable";
import { ProductForm } from "../components/ProductForm";
import { Plus } from "lucide-react";
import { ProductFilters } from "../components/ProductFilters";

const Products = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleSortChange = (sort: string) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Product Management</h1>
              <p className="text-gray-600">Add, edit, and manage products in the system</p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {!showForm && (
            <ProductFilters
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onSortChange={handleSortChange}
            />
          )}

          {showForm ? (
            <ProductForm
              product={editingProduct}
              onClose={() => setShowForm(false)}
              onSave={() => setShowForm(false)}
            />
          ) : (
            <ProductTable onEdit={handleEdit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
