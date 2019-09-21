let isActive = false;

if (isActive) {
    chrome.browserAction.setIcon({ path: "on.png" });
    console.log('on')
}
else {
    chrome.browserAction.setIcon({ path: "off.png" });
    console.log('off')
}

chrome.browserAction.onClicked.addListener((_) => {
    isActive = !isActive;
    if (isActive) {
        chrome.browserAction.setIcon({ path: "on.png" });
        console.log('on')
    }
    else {
        chrome.browserAction.setIcon({ path: "off.png" });
        console.log('off')
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(isActive)
    if (request.type == "isActive") {
        sendResponse({ result: isActive });
    }
});