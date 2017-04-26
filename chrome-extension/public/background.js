chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });
});

var rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.facebook.com', schemes: ['https'] }
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.tabs.executeScript(null, {file: "script.js"}, (results)=>{console.log(results)});
