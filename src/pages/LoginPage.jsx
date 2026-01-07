import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaLock, FaUser } from 'react-icons/fa';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Fake Auth Logic: Immediately redirect to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

                {/* Header */}
                <div className="bg-blue-600 p-8 text-center">
                    <FaUniversity className="text-white text-5xl mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white tracking-tight">UniSphere Portal</h1>
                    <p className="text-blue-100 text-sm mt-2">University Management System</p>
                </div>

                {/* content */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Registration Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    defaultValue="UNISPHERE-CS-22001"
                                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-slate-800"
                                    readOnly // Read-only for demo "speed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    defaultValue="**************"
                                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-slate-800"
                                    readOnly
                                />
                            </div>
                        </div>

                        <button
                            id="btn-login"
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02]"
                        >
                            Secure Login
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center space-x-2">
                        <span className="h-px w-16 bg-slate-200"></span>
                        <span className="text-xs text-slate-400 uppercase font-medium">System Status</span>
                        <span className="h-px w-16 bg-slate-200"></span>
                    </div>
                    <p className="text-xs text-center text-green-600 font-bold mt-2">● All Systems Operational</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
