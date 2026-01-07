import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Sidebar />
            <TopBar />

            {/* 
        Main Content Area 
        ml-64: Offsets the fixed Sidebar (width 16rem/256px)
        pt-16: Offsets the fixed TopBar (height 4rem/64px)
      */}
            <main className="ml-64 pt-16 min-h-screen transition-all duration-300">
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
