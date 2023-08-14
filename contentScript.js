// Check if a time string is valid (matches HH:MM)
function isValidTime(time) {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
}

// Convert HH:MM time string to minutes since midnight
function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

// Determine if the current time falls within the block window
function shouldBlock(current, start, end) {
    if (start < end) {
        return current >= start && current <= end;
    } else {
        return current >= start || current <= end;
    }
}

// Display the block message
function displayBlockMessage() {
    document.documentElement.innerHTML = '';

    // Styling
    document.body.style.background = "linear-gradient(45deg, #FF4500, #FF6347)";
    document.body.style.color = "white";
    document.body.style.fontFamily = "sans-serif";
    document.body.style.textAlign = "center";
    document.body.style.padding = "10%";
    document.body.style.fontSize = "18px";

    // Message content
    let message = `
        <h1 style="font-size: 2em;">Reddit Detox</h1>
        <p>Did you know? Starting your day with social media can:</p>
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 20px;">🔹 Overwhelm your brain with information</li>
            <li style="margin-bottom: 20px;">🔹 Disturb your routine</li>
            <li style="margin-bottom: 20px;">🔹 Expose you to negativity</li>
            <li style="margin-bottom: 20px;">🔹 Decrease your attention span</li>
        </ul>
        <p>Take a break. Enjoy a peaceful morning. Reddit will be here later. ¯\\_(ツ)_/¯</p>
    `;

    document.body.innerHTML = message;
}

// Main function to check if we should block Reddit
browser.storage.local.get(['startTime', 'endTime', 'isBlocking']).then((data) => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    
    const startTime = data.startTime || "22:00";
    const endTime = data.endTime || "11:00";
    const isBlocking = data.isBlocking !== undefined ? data.isBlocking : true;

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
        return;
    }

    const currentMinutesSinceMidnight = timeToMinutes(`${currentHours}:${currentMinutes}`);
    const startMinutesSinceMidnight = timeToMinutes(startTime);
    const endMinutesSinceMidnight = timeToMinutes(endTime);

    if (shouldBlock(currentMinutesSinceMidnight, startMinutesSinceMidnight, endMinutesSinceMidnight) && isBlocking) {
        displayBlockMessage();
    }
});