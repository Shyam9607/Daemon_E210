import React from 'react';
import { Outlet, useParams, NavLink, useLocation } from 'react-router-dom';
import { db } from '../data/mockDB';
import { FaHome, FaBookOpen, FaClipboardCheck, FaFolderOpen, FaComments, FaCalendarAlt, FaBullhorn, FaPenSquare } from 'react-icons/fa';

const CourseContextLayout = () => {
    const { courseId } = useParams();
    const location = useLocation();
    const course = db.courses[courseId];

    // If course doesn't exist, handle gracefully (could redirect or show error)
    if (!course) return <div className="p-4 text-red-500">Course not found.</div>;

    const menuItems = [
        { name: 'Home', path: 'home', icon: <FaHome />, id: 'course-home' },
        { name: 'Syllabus', path: 'syllabus', icon: <FaBookOpen />, id: 'course-syllabus' },
        { name: 'Assignments', path: 'assignments', icon: <FaClipboardCheck />, id: 'course-assignments' },
        { name: 'Resources', path: 'resources', icon: <FaFolderOpen />, id: 'course-resources' },
        { name: 'Announcements', path: 'announcements', icon: <FaBullhorn />, id: 'course-announcements' },
        { name: 'Calendar', path: 'calendar', icon: <FaCalendarAlt />, id: 'course-calendar' },
        { name: 'Tests', path: 'tests', icon: <FaPenSquare />, id: 'course-tests' },
        { name: 'Forums', path: 'forums', icon: <FaComments />, id: 'course-forums' },
    ];

    return (
        <div>
            {/* Context Header / Mega Menu */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-blue-600 px-6 py-4 text-white">
                    <h1 className="text-2xl font-bold">{courseId}: {course.title}</h1>
                    <p className="text-blue-100 text-sm mt-1">Course Management Portal</p>
                </div>

                <nav className="p-2 bg-white">
                    <ul className="flex flex-wrap gap-1">
                        {menuItems.map((item) => (
                            <li key={item.path} className="flex-1 min-w-[120px]">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex flex-col items-center justify-center py-3 px-2 rounded-lg text-sm font-medium transition-all
                    ${isActive
                                            ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                                            : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                                        }`
                                    }
                                >
                                    <span className="text-xl mb-1.5">{item.icon}</span>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[500px] p-6">
                <Outlet context={{ course }} />
            </div>
        </div>
    );
};

export default CourseContextLayout;
