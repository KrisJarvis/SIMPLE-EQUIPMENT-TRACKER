import React from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, AlertCircle, CheckCircle2, Factory, FlaskConical, Container, Settings, ChevronUp, ChevronDown, ArrowUpDown, Database } from 'lucide-react';

const EquipmentTypeIcon = ({ type }) => {
    switch (type) {
        case 'Machine': return <Settings className="w-4 h-4 text-blue-400" />;
        case 'Vessel': return <Container className="w-4 h-4 text-purple-400" />;
        case 'Tank': return <Database className="w-4 h-4 text-cyan-400" />;
        case 'Mixer': return <FlaskConical className="w-4 h-4 text-pink-400" />;
        default: return <Factory className="w-4 h-4 text-slate-400" />;
    }
};

const StatusBadge = ({ status }) => {
    const styles = {
        'Active': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 ring-emerald-500/20',
        'Inactive': 'bg-slate-500/10 text-slate-400 border-slate-500/20 ring-slate-500/20',
        'Under Maintenance': 'bg-amber-500/10 text-amber-400 border-amber-500/20 ring-amber-500/20',
    };

    const icons = {
        'Active': <CheckCircle2 className="w-3 h-3 mr-1.5" />,
        'Inactive': <AlertCircle className="w-3 h-3 mr-1.5" />,
        'Under Maintenance': <Settings className="w-3 h-3 mr-1.5 animate-spin-slow" />
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ring-1 ring-inset ${styles[status] || styles['Inactive']}`}>
            {icons[status]}
            {status}
        </span>
    );
};

const SortableHeader = ({ label, sortKey, currentSort, onSort, align = 'left' }) => {
    return (
        <th
            className={`px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer group hover:bg-slate-800/50 transition-colors ${align === 'right' ? 'text-right' : 'text-left'}`}
            onClick={() => onSort(sortKey)}
        >
            <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
                {label}
                <span className="text-slate-600 group-hover:text-indigo-400">
                    {currentSort.key === sortKey ? (
                        currentSort.direction === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    )}
                </span>
            </div>
        </th>
    );
};

const EquipmentList = ({ equipment, onEdit, onDelete, sortConfig, onSort }) => {
    if (equipment.length === 0) {
        return (
            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-12 text-center">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Factory className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-200">No equipment found</h3>
                <p className="text-slate-400 mt-1 max-w-sm mx-auto">
                    Try adjusting your search or filters, or add new equipment to the inventory.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {equipment.map((item) => (
                    <div key={item._id} className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-4 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 font-semibold border border-slate-700">
                                    {item.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-200">{item.name}</h3>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                        <EquipmentTypeIcon type={item.type} />
                                        {item.type}
                                    </div>
                                </div>
                            </div>
                            <StatusBadge status={item.status} />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                Last Cleaned: <span className="text-slate-400 font-medium">{item.lastCleanedDate ? format(new Date(item.lastCleanedDate), 'MMM d, yyyy') : '-'}</span>
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(item._id)}
                                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 border-b border-slate-800">
                                <SortableHeader label="Equipment Name" sortKey="name" currentSort={sortConfig} onSort={onSort} />
                                <SortableHeader label="Type" sortKey="type" currentSort={sortConfig} onSort={onSort} />
                                <SortableHeader label="Status" sortKey="status" currentSort={sortConfig} onSort={onSort} />
                                <SortableHeader label="Last Cleaned" sortKey="lastCleanedDate" currentSort={sortConfig} onSort={onSort} />
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {equipment.map((item) => (
                                <tr key={item._id} className="group hover:bg-slate-800/50 transition-all duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 font-semibold shadow-sm border border-slate-700">
                                                {item.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-slate-200">{item.name}</div>
                                                <div className="text-xs text-slate-500">ID: {item._id.slice(-6).toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-sm text-slate-400">
                                            <EquipmentTypeIcon type={item.type} />
                                            <span className="ml-2">{item.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-300">
                                                {item.lastCleanedDate ? format(new Date(item.lastCleanedDate), 'MMM d, yyyy') : '-'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                                                onClick={() => onEdit(item)}
                                                title="Edit Equipment"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                                                onClick={() => onDelete(item._id)}
                                                title="Delete Equipment"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EquipmentList;
