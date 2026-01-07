import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaFilePdf, FaFilePowerpoint, FaDownload } from 'react-icons/fa';

const Resources = () => {
    const { course } = useOutletContext();
    const { resources } = course;

    const getIcon = (type) => {
        if (type === 'PDF') return <FaFilePdf className="text-red-500 text-2xl" />;
        if (type === 'PPT') return <FaFilePowerpoint className="text-orange-500 text-2xl" />;
        return <FaFilePdf className="text-slate-400 text-2xl" />;
    }

    return (
        <div id="course-resources" className="max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Course Resources</h2>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100 grid grid-cols-1">
                    {resources.map((res) => (
                        <div key={res.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                                    {getIcon(res.type)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{res.title}</h3>
                                    <span className="text-xs text-slate-400 font-medium uppercase">{res.type} Document</span>
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-blue-600 group-hover:bg-blue-50 rounded-full transition-all">
                                <FaDownload />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;
