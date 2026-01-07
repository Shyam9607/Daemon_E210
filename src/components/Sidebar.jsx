import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserGraduate, FaMoneyBillWave, FaBook, FaClipboardList, FaIdCard, FaUniversity } from 'react-icons/fa';

const Sidebar = () => {
    const navItems = [
        { name: 'Registration', path: '/dashboard', icon: <FaClipboardList />, id: 'registration' },
        { name: 'Exam Scores', path: '/dashboard/exam-scores', icon: <FaUserGraduate />, id: 'exam-scores' },
        { name: 'Financials', path: '/dashboard/financials', icon: <FaMoneyBillWave />, id: 'fee' },
        { name: 'Library', path: '/dashboard/library', icon: <FaBook />, id: 'library' },
        { name: 'Personal', path: '/dashboard/personal', icon: <FaIdCard />, id: 'personal' },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-200 z-50 flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <FaUniversity className="text-blue-600 text-2xl mr-3" />
                <span className="font-bold text-xl text-slate-800 tracking-tight">UniSphere</span>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <NavLink
                                to={item.path}
                                id={`nav-${item.id}`}
                                className={({ isActive }) =>
                                    `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200
                  ${isActive
                                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`
                                }
                            >
                                <span className="text-lg mr-3">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-200">
                <button
                    id="btn-logout"
                    className="w-full px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
