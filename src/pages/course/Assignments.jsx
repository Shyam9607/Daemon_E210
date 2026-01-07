import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaCloudUploadAlt, FaFileAlt } from 'react-icons/fa';

const Assignments = () => {
    const { course } = useOutletContext();
    const { assignments } = course;

    return (
        <div id="course-assignments" className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-800">Assignments</h2>

            <div className="grid grid-cols-1 gap-6">
                {assignments.map((assignment) => (
                    <div key={assignment.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <FaFileAlt className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">{assignment.title}</h3>
                                    <p className="text-sm text-slate-500">Due: <span className="font-medium text-slate-700">{assignment.dueDate}</span></p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase rounded-full tracking-wide">
                                {assignment.status}
                            </span>
                        </div>

                        <div className="mt-4 p-8 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50/50 flex flex-col items-center justify-center text-center transition-colors hover:bg-blue-50 hover:border-blue-500 group">
                            <FaCloudUploadAlt className="text-4xl text-blue-300 group-hover:text-blue-500 mb-3 transition-colors" />
                            <p className="text-slate-600 font-medium mb-1">Drag and drop your solution here</p>
                            <p className="text-slate-400 text-sm mb-4">or click to browse files (PDF, ZIP, DOCX)</p>
                            <button
                                id="btn-upload-assignment"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
                            >
                                Upload Submission
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assignments;
