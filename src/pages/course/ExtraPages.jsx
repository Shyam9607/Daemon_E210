import React from 'react';

export const CourseCalendar = () => (
    <div id="course-calendar" className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Course Calendar</h2>
        <div className="inline-block p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="text-slate-400 italic">Calendar Component Placeholder</div>
            <div className="mt-4 font-bold text-blue-600">Today: {new Date().toLocaleDateString()}</div>
        </div>
    </div>
);

export const CourseTests = () => (
    <div id="course-tests" className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Online Tests</h2>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Quiz 1: Introduction</h3>
            <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="q1" className="text-blue-600" />
                    <span>Compiler translates code</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="q1" className="text-blue-600" />
                    <span>Interpreter executes code</span>
                </label>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">Submit Answer</button>
        </div>
    </div>
);

export const CourseForums = () => (
    <div id="course-forums" className="h-[500px] flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 font-bold text-slate-700">Class Discussion</div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex-shrink-0"></div>
                <div className="bg-slate-100 p-3 rounded-lg rounded-tl-none text-sm">
                    Has anyone started the assignment?
                </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0"></div>
                <div className="bg-blue-50 text-blue-900 p-3 rounded-lg rounded-tr-none text-sm">
                    Yes, it's pretty tricky!
                </div>
            </div>
        </div>
        <div className="p-4 border-t flex gap-2">
            <input type="text" placeholder="Type a message..." className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Send</button>
        </div>
    </div>
);

export const CourseAnnouncements = () => {
    // Re-using logic from Home but dedicated page
    return (
        <div id="course-announcements">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">All Announcements</h2>
            <div className="p-8 text-center text-slate-500 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                No archived announcements found.
            </div>
        </div>
    )
};
