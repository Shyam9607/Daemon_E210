import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Syllabus = () => {
    const { course } = useOutletContext();
    const [openModule, setOpenModule] = useState(1);

    return (
        <div id="course-syllabus" className="max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Course Syllabus</h2>

            <div className="space-y-4">
                {course.syllabus.map((mod) => (
                    <div key={mod.module} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                        <button
                            onClick={() => setOpenModule(openModule === mod.module ? null : mod.module)}
                            className={`w-full flex justify-between items-center p-5 text-left transition-colors ${openModule === mod.module ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                        >
                            <span className="font-bold text-lg">Module {mod.module}: {mod.title}</span>
                            {openModule === mod.module ? <FaChevronUp /> : <FaChevronDown />}
                        </button>

                        {openModule === mod.module && (
                            <div className="p-6 bg-white border-t border-slate-100">
                                <p className="text-slate-600 mb-4">{mod.content}</p>
                                <div className="text-sm text-slate-500">
                                    <strong>Topics covered:</strong> {mod.content} and related concepts.
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Syllabus;
