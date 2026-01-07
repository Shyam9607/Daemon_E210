import React from 'react';
import { db } from '../data/mockDB';

const FeePage = () => {
    const { fees } = db.student;

    return (
        <div id="page-fee" className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Financials</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Status Card */}
                <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-blue-100 text-lg font-medium mb-1">Total Pending Dues</h2>
                        <div className="text-5xl font-bold mb-6">₹{fees.pending.toLocaleString()}</div>
                        <div className="flex gap-4">
                            <button
                                id="btn-make-payment"
                                className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg shadow-md hover:bg-blue-50 transition-colors"
                            >
                                Pay Now
                            </button>
                            <button className="px-6 py-3 bg-blue-500/30 text-white font-medium rounded-lg border border-blue-400/30 hover:bg-blue-500/50 transition-colors">
                                Download Invoice
                            </button>
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                        <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.29 0 2.13-.81 2.13-1.88 0-1.09-.86-1.72-2.43-2.09l-1.12-.27c-2-.48-3.32-1.78-3.32-3.42 0-1.78 1.44-2.9 3.19-3.26V4h2.67v1.93c1.5.25 2.76 1.25 2.87 3.01h-2.1c-.13-.88-1.03-1.55-2.06-1.55-1.14 0-1.88.75-1.88 1.55 0 .89.77 1.44 2.12 1.76l1.24.29c2.26.54 3.65 1.83 3.65 3.55 0 1.83-1.52 3.09-3.51 3.26z" /></svg>
                    </div>
                </div>

                {/* Quick Stats or Info */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            ✓
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">No Late Fees</h3>
                        <p className="text-slate-500 text-sm mt-1">You are consistently paying on time. Keep it up!</p>
                    </div>
                </div>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Transaction History</h3>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                            <th className="px-6 py-3 font-semibold">Date</th>
                            <th className="px-6 py-3 font-semibold">Transaction ID</th>
                            <th className="px-6 py-3 font-semibold text-right">Amount</th>
                            <th className="px-6 py-3 font-semibold text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {fees.history.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">{tx.date}</td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">TXN-{tx.id}8829{tx.id}</td>
                                <td className="px-6 py-4 text-right font-medium">₹{tx.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeePage;
