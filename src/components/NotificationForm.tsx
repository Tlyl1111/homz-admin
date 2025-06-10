
import { useState } from "react";
import { X, Send } from "lucide-react";

interface NotificationFormProps {
  onClose: () => void;
}

export const NotificationForm = ({ onClose }: NotificationFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'general',
    recipients: 'all'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending notification:', formData);
    // Here you would send the notification to the database
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Gửi thông báo</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại thông báo
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">Thông báo chung</option>
              <option value="promotion">Khuyến mãi</option>
              <option value="order">Đơn hàng</option>
              <option value="new_product">Sản phẩm mới</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Người nhận
            </label>
            <select
              value={formData.recipients}
              onChange={(e) => setFormData({...formData, recipients: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả người dùng</option>
              <option value="active">Người dùng hoạt động</option>
              <option value="vip">Khách hàng VIP</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Nhập tiêu đề thông báo..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Nhập nội dung thông báo..."
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Send size={16} />
            Gửi thông báo
          </button>
        </div>
      </form>
    </div>
  );
};
