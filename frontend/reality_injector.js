console.log('[Daemon V2] Reality Injector Active');

// --- VISUAL CORTEX (Extraction) ---
const VisualCortex = {
    _nodeMap: new Map(), // ID -> Element
    _idCounter: 100,

    reset() {
        this._nodeMap.clear();
        this._idCounter = 100;
    },

    register(el) {
        const id = "N-" + (this._idCounter++);
        this._nodeMap.set(id, el);
        // Tag element for debugging (optional, can be removed for stealth)
        el.dataset.daemonId = id;
        return id;
    },

    getElement(id) {
        return this._nodeMap.get(id);
    },

    isVisible(el) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
    },

    cleanLabel(text) {
        return (text || '').replace(/\s+/g, ' ').trim().slice(0, 100);
    },

    scanPage() {
        this.reset();
        const targets = [];

        // Scan Buttons/Links
        const interactables = document.querySelectorAll('button, a, input, textarea, select, [role="button"]');

        interactables.forEach(el => {
            if (!this.isVisible(el)) return;

            const tag = el.tagName.toLowerCase();
            let label = this.cleanLabel(el.innerText || el.value || el.getAttribute('aria-label') || el.placeholder);

            if (!label && tag !== 'input') return; // Skip unlabeled, unless input

            const nid = this.register(el);

            targets.push({
                id: nid,
                tag: tag,
                label: label,
                type: el.type || null
            });
        });

        return targets.slice(0, 50); // Limit to 50 items to keep Prompt small
    }
};

// --- KINETIC EFFECTOR (Action) ---
const KineticEffector = {

    async highlight(el) {
        el.classList.add('flux-lock-on');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await new Promise(r => setTimeout(r, 800)); // Visual wait
        el.classList.remove('flux-lock-on');
    },

    async perform(operation) {
        const el = VisualCortex.getElement(operation.target_id);
        if (!el) throw new Error(`Target Lost: ${operation.target_id}`);

        await this.highlight(el);

        if (operation.operation === 'TYPE') {
            el.focus();
            el.value = ''; // Clean
            // Detailed Simulate Typing
            const txt = operation.payload || '';
            for (let char of txt) {
                el.value += char;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                await new Promise(r => setTimeout(r, 20));
            }
            el.dispatchEvent(new Event('change', { bubbles: true }));

            // Auto-Enter
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));

        } else if (operation.operation === 'CLICK') {
            el.click(); // Simple click usually works, fallback if needed
            // Dispatch synthetic if needed
            ['mousedown', 'mouseup'].forEach(evt =>
                el.dispatchEvent(new MouseEvent(evt, { bubbles: true }))
            );
        } else if (operation.operation === 'SCROLL') {
            // Already scrolled in highlight
        }
    }
};

// --- SIGNAL RECEIVER ---
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.signal === 'SCAN_REQUEST') {
        const data = VisualCortex.scanPage();
        sendResponse({ nodes: data });
    }
    else if (msg.signal === 'EXECUTE_OP') {
        KineticEffector.perform(msg.payload)
            .then(() => sendResponse({ success: true }))
            .catch(e => sendResponse({ success: false, error: e.message }));
        return true; // Async
    }
});
