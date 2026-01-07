import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CourseContextLayout from './layouts/CourseContextLayout';

// Dashboard Pages
import RegistrationPage from './pages/RegistrationPage';
import FeePage from './pages/FeePage';
import LibraryPage from './pages/LibraryPage';
import ScoresPage from './pages/ScoresPage';
import PersonalPage from './pages/PersonalPage';

// Course Pages
import CourseHome from './pages/course/CourseHome';
import Syllabus from './pages/course/Syllabus';
import Assignments from './pages/course/Assignments';
import Resources from './pages/course/Resources';
import { CourseCalendar, CourseTests, CourseForums, CourseAnnouncements } from './pages/course/ExtraPages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Main Dashboard Routes */}
        <Route index element={<RegistrationPage />} />
        <Route path="financials" element={<FeePage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="exam-scores" element={<ScoresPage />} />
        <Route path="personal" element={<PersonalPage />} />

        {/* Course Context Routes */}
        <Route path="course/:courseId" element={<CourseContextLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<CourseHome />} />
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="resources" element={<Resources />} />
          <Route path="calendar" element={<CourseCalendar />} />
          <Route path="tests" element={<CourseTests />} />
          <Route path="forums" element={<CourseForums />} />
          <Route path="announcements" element={<CourseAnnouncements />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
