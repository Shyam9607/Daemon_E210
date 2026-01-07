// DOM Extractor Module

/**
 * Generates a unique CSS selector for a given element.
 * Tries to use ID, then classes, then falls back to structural path.
 */
function getUniqueSelector(element) {
    if (element.id) {
        return `#${CSS.escape(element.id)}`;
    }

    // Attempt to use classes if they look unique enough (simplified heuristic)
    if (element.className && typeof element.className === 'string') {
        const classes = element.className.split(/\s+/).filter(c => c.trim().length > 0);
        if (classes.length > 0) {
            // We typically wouldn't trust just classes uniqueness globally, 
            // but for this prototype, we'll try to use them or fallback to path.
            // A safer bet for a robust agent is full path.
        }
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

/**
 * Extracts visible text content, trimming whitespace.
 */
function getVisibleText(element) {
    // Basic visibility check
    if (!element.offsetParent) return '';
    return element.innerText.trim();
}

/**
 * Scans the page and returns a structured JSON object.
 */
export function getPageContext() {
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

    // Extract Links (limit to first 100 to avoid bloat in prototype)
    const allLinks = Array.from(document.querySelectorAll('a'));
    for (const el of allLinks.slice(0, 100)) {
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
                text: text.substring(0, 50), // Truncate long text
                selector: getUniqueSelector(el)
            });
        }
    });

    // Extract Inputs
    document.querySelectorAll('input:not([type="hidden"]), textarea, select').forEach(el => {
        if (elementIsVisible(el)) {
            let label = '';
            // Try to find label
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

function elementIsVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
}
