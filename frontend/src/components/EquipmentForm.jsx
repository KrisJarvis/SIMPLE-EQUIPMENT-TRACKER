import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X, Save, Calendar } from 'lucide-react';

const EquipmentForm = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Machine',
    status: 'Active',
    lastCleanedDate: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        lastCleanedDate: initialData.lastCleanedDate ? initialData.lastCleanedDate.split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md border border-slate-800 transform transition-all animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              {initialData ? 'Edit Equipment' : 'Add New Equipment'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Enter the details below to update your inventory.</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 hover:bg-slate-800 p-2 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Equipment Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-sm focus:border-indigo-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all placeholder:text-slate-600"
              placeholder="e.g. High Speed Mixer M-20"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</label>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-sm focus:border-indigo-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                >
                  <option value="Machine">Machine</option>
                  <option value="Vessel">Vessel</option>
                  <option value="Tank">Tank</option>
                  <option value="Mixer">Mixer</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-sm focus:border-indigo-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Maintenance">Maintenance</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Cleaned</label>
            <div className="relative">
              <input
                type="date"
                name="lastCleanedDate"
                value={formData.lastCleanedDate}
                onChange={handleChange}
                required
                className="w-full rounded-xl border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-sm focus:border-indigo-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all [color-scheme:dark]"
              />
              <Calendar className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 shadow-sm hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-indigo-500/20"
            >
              <Save className="w-4 h-4" />
              {initialData ? 'Update Changes' : 'Save Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default EquipmentForm;
