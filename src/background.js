import {wsBridge} from './background-tools';

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript(null, {
    file: 'scripts/content-script.js'
  });
});

chrome.runtime.onConnect.addListener((port) => {
  wsBridge.openConnection(port);
});
