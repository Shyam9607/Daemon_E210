# Daemon E210 V2.0

Obfuscated Neural Interface for Web Exploration.
Local-only execution. No persistent loops.

## ⚡ Setup Backend (Neural Relay)

1. Navigate to: `Daemon_E210_V2.0/backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the relay:
   ```bash
   node server.js
   ```
   *Ensures connection to local Ollama instance (llama3.2).*

## 🧩 Load Extension (Control Deck)

1. Open Chrome -> `chrome://extensions/`
2. Enable **Developer Mode**.
3. Click **Load Unpacked**.
4. Select folder: `Daemon_E210_V2.0/frontend`.
5. Open any webpage (e.g., Google, Wikipedia).
6. Click the Extension Icon -> "Open Side Panel".

## 🕹️ Demo Actions

1. **Highlight & Click**:
   - Type: *"Click the search button"*
   - Click **INITIALIZE SEQUENCE**.
   - Review proposed action.
   - Click **EXECUTE OP**.
   - *Observation: Element glows pink (flux-lock-on) before clicking.*

2. **Type**:
   - Type: *"Type 'Hello World' into the search box"*
   - Click **INITIALIZE SEQUENCE**.
   - Click **EXECUTE OP**.

## ⚠️ Notes
- Requires **Ollama** running locally: `ollama run llama3.2`
- No history memory. Every command is a fresh start.
- If "Injection Error" occurs, **refresh the target webpage**.
