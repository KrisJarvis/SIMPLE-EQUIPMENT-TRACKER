import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import EquipmentList from '../components/EquipmentList';
import EquipmentForm from '../components/EquipmentForm';
import ConfirmDialog from '../components/ConfirmDialog';

const Dashboard = () => {
    const [equipment, setEquipment] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/equipment');
            setEquipment(response.data);
        } catch (error) {
            console.error('Error fetching equipment:', error);
            toast.error('Failed to load equipment list');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddClick = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            await api.delete(`/equipment/${deleteId}`);
            setEquipment(prev => prev.filter(item => item._id !== deleteId));
            toast.success('Equipment removed successfully');
        } catch (error) {
            console.error('Error deleting equipment:', error);
            toast.error('Could not delete equipment');
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteId(null);
        }
    };

    const handleFormSubmit = async (data) => {
        try {
            if (editingItem) {
                const response = await api.put(`/equipment/${editingItem._id}`, data);
                setEquipment(prev => prev.map(item => item._id === editingItem._id ? response.data : item));
                toast.success('Equipment updated successfully');
            } else {
                const response = await api.post('/equipment', data);
                setEquipment(prev => [response.data, ...prev]);
                toast.success('New equipment added to inventory');
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving equipment:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredEquipment = React.useMemo(() => {
        let result = [...equipment];

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.type.toLowerCase().includes(lowerQuery)
            );
        }

        if (statusFilter !== 'All') {
            result = result.filter(item => item.status === statusFilter);
        }

        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [equipment, searchQuery, statusFilter, sortConfig]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-slate-100 sm:text-3xl sm:tracking-tight">
                        Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Overview of all active machinery and maintenance schedules.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 sm:flex-none">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                            type="text"
                            placeholder="Search equipment..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2.5 rounded-xl border-slate-800 bg-slate-900 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full sm:w-64 shadow-sm placeholder:text-slate-600"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 pl-4 pr-10 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Under Maintenance">Maintenance</option>
                        </select>
                        <Filter className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                    </div>

                    <button
                        onClick={handleAddClick}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                        Add New
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-slate-500 font-medium">Loading inventory...</p>
                    </div>
                </div>
            ) : (
                <EquipmentList
                    equipment={filteredEquipment}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                />
            )}

            {isModalOpen && (
                <EquipmentForm
                    onSubmit={handleFormSubmit}
                    onClose={() => setIsModalOpen(false)}
                    initialData={editingItem}
                />
            )}

            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteId(null);
                }}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default Dashboard;
