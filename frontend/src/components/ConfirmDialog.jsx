import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-800 transform transition-all animate-in fade-in zoom-in-95 duration-200">

                <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 mb-2">
                        {title || 'Confirm Action'}
                    </h3>

                    <p className="text-sm text-slate-400 mb-6">
                        {message || 'Are you sure you want to proceed? This action cannot be undone.'}
                    </p>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-500 shadow-lg shadow-rose-500/20 transition-all"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
