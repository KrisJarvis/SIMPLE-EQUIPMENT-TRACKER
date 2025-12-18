import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 pb-20">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: '#fff' },
            }
          }}
        />

        {/* Top Navigation / Brand */}
        <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-100 tracking-tight">Equip<span className="text-indigo-500">Track</span></span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center text-sm text-slate-400">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  System Operational
                </div>
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
