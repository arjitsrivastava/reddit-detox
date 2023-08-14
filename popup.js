// Load stored settings when the popup is opened
document.addEventListener("DOMContentLoaded", () => {
    browser.storage.local.get(['startTime', 'endTime']).then((data) => {
        if (data.startTime) document.getElementById('startTime').value = data.startTime;
        if (data.endTime) document.getElementById('endTime').value = data.endTime;
    });
});

// Save the settings
document.getElementById('save').addEventListener('click', () => {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    browser.storage.local.set({ startTime, endTime });
    alert('Settings saved successfully!');
});
