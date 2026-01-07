# OmniNav AI 🧭

**OmniNav** is an intelligent Chrome extension that acts as your personal website copilot. It understands the active webpage and performs navigation actions for you—highlighting buttons, scrolling to sections, and clicking links—all through a natural language chat interface.

Built for **Hacktide** hackathon.

---

## 🚀 Features

*   **Context-Aware**: Analyzes the current page (headings, links, buttons) to understand what's actionable.
*   **Visual Guidance**: Highlights elements with a neon glow to show you exactly where to look.
*   **Auto-Navigation**: Can scroll to and click elements based on your intent.
*   **Powered by Gemini**: Uses Google's **Gemini 2.5 Flash** for fast, reasoned responses.

---

## 🛠️ Installation & Setup

### Prerequisites
*   Node.js (v18 or higher)
*   Google Chrome (or Chromium-based browser)
*   A **Google Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/app/apikey))

### 1. Setup the Backend
The backend handles the AI logic and page context processing.

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` folder and add your API Key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```
4.  Start the server:
    ```bash
    node server.js
    ```
    *You should see: `Server running on http://localhost:3000`*

### 2. Load the Chrome Extension
The frontend is the interface that lives in your browser.

1.  Open Chrome and type `chrome://extensions` in the address bar.
2.  Toggle **Developer mode** (top right corner) to **ON**.
3.  Click the **Load unpacked** button (top left).
4.  Select the `frontend` folder from this project directory.
    *   *Path example: `.../Daemon_E210/frontend`*

---

## 🎮 How to Use

1.  **Open the Agent**: Visit any website (e.g., Wikipedia, GitHub, or a news site). You will see the OmniNav bubble in the bottom-right corner.
2.  **Ask a Question**:
    *   *"Where is the login button?"*
    *   *"Go to the settings page"*
    *   *"What is this page about?"*
3.  **Watch the Magic**: OmniNav will answer, highlight the relevant element, and scroll it into view.

---

## 📁 Project Structure

*   **/backend**: Node.js Express server + Gemini AI integration (`aiService.js`).
*   **/frontend**: Chrome Extension files (`manifest.json`, `content.js`, `ui.html`, `ui.css`).

---

## ⚠️ Troubleshooting

*   **"Cannot reach OmniNav Brain"**: Ensure your backend server is running on port 3000.
*   **"Model Overloaded"**: The AI might be busy. The system has auto-retry, so just wait a moment and try again.
*   **Elements not highlighting?**: Refresh the webpage. The extension needs to reload its content script on the page.
