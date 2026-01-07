function log(msg, type = 'info') {
    const div = document.createElement('div');
    div.className = `log-entry log-${type}`;
    div.innerText = `> ${msg}`;
    document.getElementById('flight-log').appendChild(div);
}

document.getElementById('engage-btn').addEventListener('click', async () => {
    const input = document.getElementById('mission-input').value;
    if (!input) return log('Input required.', 'error');

    log('Scanning visual field...');

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.id) throw new Error("No active tab");

        // 1. SCAN
        chrome.tabs.sendMessage(tab.id, { signal: 'SCAN_REQUEST' }, (response) => {
            if (chrome.runtime.lastError) {
                return log('Injection Error: Refresh Page.', 'error');
            }
            if (!response || !response.nodes) {
                return log('Visual Cortex Empty.', 'error');
            }

            log(`Scan complete. ${response.nodes.length} targets found.`);
            log('Transmitting to Core...');

            // 2. BACKEND RELAY via BACKGROUND
            chrome.runtime.sendMessage({
                signal: 'UPLINK_DATA',
                payload: response.nodes,
                userIntent: input
            }, (relayResponse) => {
                if (!relayResponse || !relayResponse.success) {
                    return log(`Uplink Failed: ${relayResponse?.error}`, 'error');
                }

                const plan = relayResponse.uplink.data;
                renderActionProposal(plan, tab.id);
            });
        });

    } catch (e) {
        log(e.message, 'error');
    }
});

function renderActionProposal(plan, tabId) {
    log('Solution Computed.', 'success');

    const container = document.getElementById('flight-log');
    const card = document.createElement('div');
    card.className = 'action-card';

    // Detect Sequence
    const steps = plan.operation === 'SEQUENCE' ? plan.steps : [plan];

    let html = `<strong>OP: ${plan.operation} (${steps.length} steps)</strong><br/>`;
    steps.forEach((s, i) => {
        html += `${i + 1}. ${s.operation} -> ${s.target_id}<br/>`;
    });
    html += `<i>"${plan.thought || 'Ready to engage.'}"</i>`;

    card.innerHTML = html;

    const btn = document.createElement('button');
    btn.className = 'run-op-btn';
    btn.innerText = 'EXECUTE SEQUENCE';

    btn.onclick = async () => {
        btn.disabled = true;
        btn.innerText = 'EXECUTING...';

        // Execute Loop
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            log(`Running Step ${i + 1}/${steps.length}...`);

            await new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tabId, {
                    signal: 'EXECUTE_OP',
                    payload: step
                }, (res) => {
                    if (res && res.success) resolve();
                    else reject(new Error(res?.error || 'Unknown Error'));
                });
            });

            // Wait between steps
            await new Promise(r => setTimeout(r, 1500));
        }

        log('Sequence Complete.', 'success');
        btn.remove();
    };

    card.appendChild(btn);
    container.appendChild(card);
    container.scrollTop = container.scrollHeight;
}
