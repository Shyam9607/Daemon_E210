import React, { useState } from 'react';
import { db } from '../data/mockDB';

const PersonalPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        ...db.student,
        phone: "+91 98765 43210",
        email: "prudhvi.manvith@unisphere.edu",
        address: "Room 304, Block A, Mens Hostel"
    });

    return (
        <div id="page-personal" className="max-w-3xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Personal Details</h1>
                    <p className="text-slate-500 mt-1">Manage your personal information and contact details.</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${isEditing ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 text-white'}`}
                >
                    {isEditing ? 'Cancel' : 'Edit Details'}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
                {/* Header Background */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700"></div>

                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6 flex justify-between items-end">
                        <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                            <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-3xl font-bold">
                                {formData.name.charAt(0)}
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-70 disabled:cursor-not-allowed text-slate-800 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Registration Number</label>
                                <input
                                    type="text"
                                    disabled
                                    value={formData.regNo}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 font-medium cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    disabled={!isEditing}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-70 text-slate-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    disabled={!isEditing}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-70 text-slate-800"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-500 mb-1">Current Address</label>
                                <textarea
                                    rows="2"
                                    disabled={!isEditing}
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-70 text-slate-800"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                                <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-md">
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;
