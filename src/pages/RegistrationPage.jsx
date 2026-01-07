import React, { useState } from 'react';

const RegistrationPage = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Complete Student Profile", done: true },
        { id: 2, text: "Upload High School Transcripts", done: true },
        { id: 3, text: "Pay Semester 1 Fees", done: false },
        { id: 4, text: "Register for Hostel (Optional)", done: false },
        { id: 5, text: "Submit Anti-Ragging Affidavit", done: true },
        { id: 6, text: "Collect ID Card", done: false },
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    return (
        <div id="page-registration" className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Registration Checklist</h1>
                <p className="text-slate-500 mt-2">Complete these steps to finalize your semester registration.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <span className="font-semibold text-slate-700">Progress</span>
                    <span className="text-blue-600 font-bold">
                        {Math.round((tasks.filter(t => t.done).length / tasks.length) * 100)}%
                    </span>
                </div>

                <div className="divide-y divide-slate-100">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`p-5 flex items-center transition-colors hover:bg-slate-50 cursor-pointer ${task.done ? 'bg-blue-50/30' : ''}`}
                            onClick={() => toggleTask(task.id)}
                        >
                            <div className={`
                w-6 h-6 rounded border-2 flex items-center justify-center mr-4 transition-colors
                ${task.done ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}
              `}>
                                {task.done && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                            </div>
                            <span className={`text-lg ${task.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                                {task.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
