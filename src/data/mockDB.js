export const db = {
    student: {
        name: "Darsi Prudhvi Manvith",
        regNo: "UNISPHERE-CS-22001",
        gpa: 8.9,
        attendance: 92,
        fees: {
            pending: 45000,
            history: [
                { id: 1, date: "2025-08-10", amount: 50000, status: "Paid" },
                { id: 2, date: "2025-01-10", amount: 45000, status: "Pending" },
            ],
        },
        examScores: [
            { code: "CSE301", course: "Operating Systems", grade: "A", credits: 4 },
            { code: "CSE302", course: "Computer Networks", grade: "A-", credits: 3 },
            { code: "MTH301", course: "Probability & Stats", grade: "B+", credits: 3 },
        ],
        library: [
            { id: 101, title: "Introduction to Algorithms", author: "Cormen", dueDate: "2026-01-15" },
            { id: 102, title: "Clean Code", author: "Robert C. Martin", dueDate: "2026-01-20" },
        ],
    },
    courses: {
        "CSE311": {
            title: "Compiler Design",
            syllabus: [
                { module: 1, title: "Lexical Analysis", content: "Tokenization, RegExp, DFA" },
                { module: 2, title: "Syntax Analysis", content: "CFGs, Parsing Tables" },
                { module: 3, title: "Semantic Analysis", content: "Type Checking, Scope Resolution" },
            ],
            announcements: [
                { id: 1, date: "2026-01-05", title: "Mid-Term Schedule", content: "Mid-terms start on Feb 10th." },
                { id: 2, date: "2026-01-02", title: "Lab Setup", content: "Please install GCC before next lab." },
            ],
            assignments: [
                { id: 1, title: "Lab 1: Lexer", dueDate: "2026-01-12", status: "Pending" },
                { id: 2, title: "Written Assignment 1", dueDate: "2026-01-18", status: "Pending" },
            ],
            resources: [
                { id: 1, title: "Lecture Notes 1", type: "PDF" },
                { id: 2, title: "Reference Book", type: "PDF" },
            ],
        },
        "CSE312": {
            title: "Distributed Systems",
            syllabus: [
                { module: 1, title: "Introduction", content: "System Models, Networking" },
                { module: 2, title: "Time & Global States", content: "Logical Clocks, Snapshots" },
            ],
            announcements: [
                { id: 1, date: "2026-01-06", title: "Project Groups", content: "Form groups of 3 by Friday." },
            ],
            assignments: [
                { id: 1, title: "Socket Programming", dueDate: "2026-01-25", status: "Pending" },
            ],
            resources: [
                { id: 1, title: "Coulouris Slides", type: "PPT" },
            ],
        },
    },
};
