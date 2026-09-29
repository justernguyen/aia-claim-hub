import React, { useState } from 'react';
import { X, CalendarPlus } from 'lucide-react';
import { Customer, Policy, CareActivity, CareChannel } from '../types/crm';

interface NewCareActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  policies: Policy[];
  onSubmit: (activity: Omit<CareActivity, 'id' | 'createdAt'>) => void;
}

export const NewCareActivityModal: React.FC<NewCareActivityModalProps> = ({
  isOpen,
  onClose,
  customers,
  policies,
  onSubmit,
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [channel, setChannel] = useState<CareChannel>('call');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('');
  const [status, setStatus] = useState<CareActivity['status']>('planned');

  if (!isOpen) return null;

  const currentCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];
  const customerPolicies = policies.filter((p) => p.customerId === selectedCustomerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerPhone: currentCustomer.phone,
      policyId: selectedPolicyId || customerPolicies[0]?.id || undefined,
      date,
      channel,
      title: title.trim(),
      content: content.trim(),
      result: result.trim() || undefined,
      nextAction: nextAction.trim() || undefined,
      nextFollowUpDate: nextFollowUpDate || undefined,
      status,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Ghi Nhận Chăm Sóc / Lịch Hẹn</h3>
              <p className="text-xs text-slate-400">Ghi lại tương tác tư vấn, cafe, thăm viện hoặc follow-up</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Chọn Khách hàng & HĐ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Khách hàng <span className="text-rose-500">*</span></label>
              <select
                value={selectedCustomerId}
                onChange={(e) => {
                  setSelectedCustomerId(e.target.value);
                  const p = policies.find((pol) => pol.customerId === e.target.value);
                  if (p) setSelectedPolicyId(p.id);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-aia-red"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hợp đồng liên quan</label>
              <select
                value={selectedPolicyId}
                onChange={(e) => setSelectedPolicyId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-aia-red"
              >
                <option value="">-- Không gắn HĐ cụ thể --</option>
                {customerPolicies.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} ({p.productName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ngày & Kênh tương tác */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ngày tương tác</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kênh tương tác</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as CareChannel)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
              >
                <option value="call">Gọi điện thoại</option>
                <option value="meeting">Gặp trực tiếp</option>
                <option value="coffee">Hẹn Cafe</option>
                <option value="zalo">Nhắn Zalo</option>
                <option value="gift">Gửi thiệp/quà</option>
                <option value="hospital_visit">Thăm viện</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Trạng thái việc</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CareActivity['status'])}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
              >
                <option value="planned">Cần làm (Kế hoạch)</option>
                <option value="completed">Đã hoàn thành</option>
              </select>
            </div>
          </div>

          {/* Tiêu đề & Nội dung */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Tiêu đề tương tác <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Cafe tư vấn nâng cấp thẻ sức khỏe, Nhắc phí tái tục..."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-aia-red font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nội dung trao đổi chi tiết <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ghi chú chi tiết phản hồi của khách hàng, các điểm cần lưu ý..."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-aia-red"
            />
          </div>

          {/* Kết quả */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Kết quả cuộc gặp / tư vấn</label>
            <input
              type="text"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="Ví dụ: Khách đồng ý nộp phí trước ngày 10/10, Muốn xem bảng minh họa mới..."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-aia-red"
            />
          </div>

          {/* Việc cần làm tiếp theo & Hạn follow-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200/80">
            <div>
              <label className="block font-semibold text-emerald-900 mb-1">Việc cần làm tiếp (Next Action)</label>
              <input
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="Ví dụ: In bảng minh họa, Thiết lập Auto-Debit..."
                className="w-full p-2 rounded-xl border border-emerald-300 bg-white focus:outline-aia-red"
              />
            </div>
            <div>
              <label className="block font-semibold text-emerald-900 mb-1">Ngày hẹn follow-up</label>
              <input
                type="date"
                value={nextFollowUpDate}
                onChange={(e) => setNextFollowUpDate(e.target.value)}
                className="w-full p-2 rounded-xl border border-emerald-300 bg-white font-mono"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-aia-red hover:bg-aia-red-dark text-white rounded-xl font-bold shadow-xs transition-colors"
            >
              Lưu ghi chú tương tác
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
