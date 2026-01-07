console.log('OmniNav Content Script Loaded');

// --- Extractor Logic (Inline for simplicity without bundler) ---
function getUniqueSelector(element) {
    if (element.id) {
        return `#${CSS.escape(element.id)}`;
    }
    let path = [];
    while (element.nodeType === Node.ELEMENT_NODE) {
        let selector = element.nodeName.toLowerCase();
        if (element.id) {
            selector += `#${CSS.escape(element.id)}`;
            path.unshift(selector);
            break;
        } else {
            let sibling = element;
            let nth = 1;
            while (sibling = sibling.previousElementSibling) {
                if (sibling.nodeName.toLowerCase() == selector)
                    nth++;
            }
            if (nth != 1)
                selector += `:nth-of-type(${nth})`;
        }
        path.unshift(selector);
        element = element.parentNode;
    }
    return path.join(" > ");
}

function getVisibleText(element) {
    if (!element.offsetParent) return '';
    return element.innerText.trim();
}

function elementIsVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
}

function getPageContext() {
    const context = {
        url: window.location.href,
        title: document.title,
        timestamp: Date.now(),
        headings: [],
        links: [],
        buttons: [],
        inputs: []
    };

    // Extract Headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
        const text = getVisibleText(el);
        if (text) {
            context.headings.push({
                level: el.tagName.toLowerCase(),
                text: text,
                selector: getUniqueSelector(el)
            });
        }
    });

    // Extract Links (limit)
    const allLinks = Array.from(document.querySelectorAll('a'));
    for (const el of allLinks.slice(0, 50)) {
        const text = getVisibleText(el);
        if (text && el.href) {
            context.links.push({
                text: text,
                href: el.href,
                selector: getUniqueSelector(el)
            });
        }
    }

    // Extract Buttons
    document.querySelectorAll('button, [role="button"], input[type="submit"], input[type="button"]').forEach(el => {
        const text = getVisibleText(el) || el.value || el.getAttribute('aria-label') || 'Button';
        if (elementIsVisible(el)) {
            context.buttons.push({
                text: text.substring(0, 50),
                selector: getUniqueSelector(el)
            });
        }
    });

    // Extract Inputs
    document.querySelectorAll('input:not([type="hidden"]), textarea, select').forEach(el => {
        if (elementIsVisible(el)) {
            let label = '';
            if (el.id) {
                const labelElem = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
                if (labelElem) label = labelElem.innerText.trim();
            }
            context.inputs.push({
                type: el.tagName.toLowerCase() === 'input' ? el.type : el.tagName.toLowerCase(),
                placeholder: el.placeholder || '',
                label: label,
                selector: getUniqueSelector(el)
            });
        }
    });

    return context;
}
// --- End Extractor Logic ---

// Function to inject the UI
async function injectUI() {
    if (document.getElementById('omninav-root')) return;

    const container = document.createElement('div');
    container.id = 'omninav-root';

    // Use Shadow DOM to isolate styles
    const shadow = container.attachShadow({ mode: 'open' });

    // Fetch the UI HTML
    try {
        const response = await fetch(chrome.runtime.getURL('ui.html'));
        const html = await response.text();

        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', chrome.runtime.getURL('ui.css'));

        shadow.appendChild(link);
        shadow.appendChild(wrapper);

        document.body.appendChild(container);

        initializeLogic(shadow);
    } catch (e) {
        console.error("OmniNav: Failed to load UI", e);
    }
}

function initializeLogic(shadowRoot) {
    const sendBtn = shadowRoot.getElementById('omninav-send-btn');
    const input = shadowRoot.getElementById('omninav-input');
    const messages = shadowRoot.getElementById('omninav-messages');
    const closeBtn = shadowRoot.getElementById('omninav-close-btn');
    const minimizeBtn = shadowRoot.getElementById('omninav-minimize-btn');
    const container = document.getElementById('omninav-root').shadowRoot.querySelector('.omninav-widget');

    // Minimize / Maximize Logic
    function toggleMinimize() {
        container.classList.toggle('minimized');
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMinimize();
        });
    }

    // Allow clicking the bubble header to expand if maximized logic was separate, 
    // but here clicking the minimized bubble (wrapper) should expand it.
    container.querySelector('.omninav-header').addEventListener('click', () => {
        if (container.classList.contains('minimized')) {
            toggleMinimize();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const root = document.getElementById('omninav-root');
            if (root) root.remove();
        });
    }

    if (sendBtn && input) {
        // ... (Send logic remains)
        const handleSend = () => {
            const text = input.value;
            if (text.trim()) {
                addMessage(messages, text, 'user');
                input.value = '';
                sendMessageToBackend(text, messages);
            }
        };
        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
}

function addMessage(container, text, type) {
    if (type === 'loading') {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message loading typing-indicator';
        loadingDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        container.appendChild(loadingDiv);
        container.scrollTop = container.scrollHeight;
        return;
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.textContent = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

async function sendMessageToBackend(text, container) {
    try {
        addMessage(container, '...', 'loading');

        // SCAN PAGE CONTEXT
        const pageContext = getPageContext();
        console.log("Sending context:", pageContext);

        const response = await fetch('http://localhost:3000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: text,
                context: pageContext
            })
        });

        const data = await response.json();

        // Remove loading indicator
        const loader = container.querySelector('.loading');
        if (loader) loader.remove();

        if (data.response) {
            addMessage(container, data.response, 'assistant');
        } else {
            addMessage(container, 'I received an empty response. Try again?', 'error');
        }

        // Execute Actions
        if (data.data && data.data.actions) {
            executeActions(data.data.actions, container);
        }

    } catch (err) {
        const loader = container.querySelector('.loading');
        if (loader) loader.remove();

        addMessage(container, '⚠️ Cannot reach OmniNav Brain. Is the backend server running?', 'error');
        console.error("OmniNav Connection Error:", err);
    }
}

function executeActions(actions, container) {
    // Clear previous highlights
    document.querySelectorAll('.omninav-highlight').forEach(el => el.classList.remove('omninav-highlight'));

    let missingElements = [];

    actions.forEach(async (action) => {
        const el = document.querySelector(action.selector);

        if (!el) {
            console.warn("OmniNav Action Failed: Element not found", action.selector);
            missingElements.push(action.selector);
            return;
        }

        if (action.type === 'highlight' || action.type === 'click') {
            el.classList.add('omninav-highlight');
        }

        if (action.type === 'scroll' || action.type === 'highlight' || action.type === 'click') {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        if (action.type === 'click') {
            // Wait for visual feedback before clicking
            setTimeout(() => {
                el.click();
            }, 1500);
        }
    });

    if (missingElements.length > 0) {
        // Optional: Notify user if something critical was missed, 
        // but often silence is better than spamming errors for minor things.
        console.log("Some elements were not found:", missingElements);
    }
}

// Inject immediately
injectUI();
