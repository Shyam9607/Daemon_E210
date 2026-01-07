import React from 'react';
import { db } from '../data/mockDB';

const LibraryPage = () => {
    const { library } = db.student;

    return (
        <div id="page-library" className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Library Profile</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Browse Catalog
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-slate-700 border-b pb-2">Borrowed Books</h2>
                    <div className="space-y-4">
                        {library.map((book) => (
                            <div key={book.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                                <div className="w-16 h-20 bg-blue-100 rounded flex items-center justify-center text-blue-400">
                                    <span className="text-2xl">📖</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-800">{book.title}</h3>
                                    <p className="text-slate-500 text-sm">{book.author}</p>
                                    <div className="mt-3 flex items-center gap-4 text-sm">
                                        <div className="text-slate-500">
                                            Expected Return: <span className="font-medium text-slate-800">{book.dueDate}</span>
                                        </div>
                                        <span className="text-orange-600 text-xs font-bold uppercase tracking-wide bg-orange-50 px-2 py-0.5 rounded">Due Soon</span>
                                    </div>
                                </div>
                                <button className="text-blue-600 text-sm font-medium hover:underline">Renew</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                        <h3 className="font-bold text-slate-800 mb-4">Library Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Books currently held</span>
                                <span className="font-bold text-slate-800">{library.length}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Max allowed</span>
                                <span className="font-bold text-slate-800">5</span>
                            </div>
                            <div className="h-px bg-slate-100 my-2"></div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Total Fines</span>
                                <span className="font-bold text-green-600">₹0.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryPage;
