import React from 'react';
import { useOutletContext } from 'react-router-dom';

const CourseHome = () => {
    const { course } = useOutletContext();
    const { announcements } = course;

    return (
        <div id="course-home" className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-xl font-bold text-blue-900 mb-2">Welcome to {course.title}</h2>
                <p className="text-blue-700">Check the syllabus and assignments regularly for updates.</p>
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-blue-600 rounded mr-3"></span>
                    Recent Announcements
                </h3>
                <div className="space-y-4">
                    {announcements.map((ann) => (
                        <div key={ann.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-800">{ann.title}</h4>
                                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{ann.date}</span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">{ann.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseHome;
