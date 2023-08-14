let isBlocking = true;
let startTime = "22:00"; // default 10 PM
let endTime = "11:00"; // default 11 AM

// Check stored settings on initialization
browser.storage.local.get(['startTime', 'endTime', 'isBlocking']).then((data) => {
  if (data.startTime) startTime = data.startTime;
  if (data.endTime) endTime = data.endTime;
  if (data.isBlocking !== undefined) isBlocking = data.isBlocking;
});

// Listen for changes in settings
browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateSettings') {
    startTime = message.data.startTime;
    endTime = message.data.endTime;
    isBlocking = message.data.isBlocking;

    // Store the updated settings
    browser.storage.local.set({ startTime, endTime, isBlocking });
  }
});
