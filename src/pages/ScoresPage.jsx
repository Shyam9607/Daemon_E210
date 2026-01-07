import React from 'react';
import { db } from '../data/mockDB';

const ScoresPage = () => {
    const { examScores } = db.student;

    return (
        <div id="page-exam-scores" className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Examination Scores</h1>
            <p className="text-slate-500 mb-8">Academic performance record for Semester 5</p>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-4 font-semibold rounded-tl-xl text-sm uppercase tracking-wider">Course Code</th>
                            <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Course Title</th>
                            <th className="px-6 py-4 font-semibold text-center text-sm uppercase tracking-wider">Credits</th>
                            <th className="px-6 py-4 font-semibold text-center rounded-tr-xl text-sm uppercase tracking-wider">Grade</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        {examScores.map((score, index) => (
                            <tr key={score.code} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                <td className="px-6 py-4 font-mono text-blue-600">{score.code}</td>
                                <td className="px-6 py-4">{score.course}</td>
                                <td className="px-6 py-4 text-center text-slate-500">{score.credits}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`
                                inline-block w-8 h-8 leading-8 rounded-full text-sm font-bold
                                ${score.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                                            score.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}
                            `}>
                                        {score.grade}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-end">
                <div className="bg-blue-50 px-6 py-4 rounded-lg border border-blue-100 flex items-center gap-8">
                    <div className="text-center">
                        <div className="text-xs text-blue-500 uppercase font-bold tracking-wider">SGPA</div>
                        <div className="text-2xl font-bold text-blue-700">9.2</div>
                    </div>
                    <div className="w-px h-8 bg-blue-200"></div>
                    <div className="text-center">
                        <div className="text-xs text-blue-500 uppercase font-bold tracking-wider">CGPA</div>
                        <div className="text-2xl font-bold text-blue-700">8.9</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoresPage;
