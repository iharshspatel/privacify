// Checkboxes
let button = document.getElementById('switch');
let gmailSender = document.getElementById('gmailSender');
let gmailSubject = document.getElementById('gmailSubject');
let waProfile = document.getElementById('waProfile');
let waMessagePreview = document.getElementById('waMessagePreview');
let waName = document.getElementById('waName');
let waMessage = document.getElementById('waMessage');

// Message functionality
let mainContent = document.getElementById('mainContent');
let popupMessage = document.getElementById('popupMessage');

// Get and set current version
  let version = chrome.runtime.getManifest().version;


// Set current state in popup
chrome.storage.sync.get([
    'on',
    'gmailSender',
    'gmailSubject',
    'waProfile',
    'waMessagePreview',
    'waName',
    'waMessage'
  ], function(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      gmailSubject.checked=data.gmailSubject;
      gmailSender.checked=data.gmailSender;
      button.checked=data.on;
      waProfile.checked = data.waProfile;
      waMessagePreview.checked = data.waMessagePreview;
      waName.checked = data.waName;
      waMessage.checked = data.waMessage
    });
});

button.addEventListener('change', function() {
  chrome.storage.sync.set({on: this.checked});
});
// Update settings values
gmailSender.addEventListener('change', function() {
  chrome.storage.sync.set({gmailSender: this.checked});
});
gmailSubject.addEventListener('change', function() {
  chrome.storage.sync.set({gmailSubject: this.checked});
});

waProfile.addEventListener('change', function(){
  chrome.storage.sync.set({waProfile: this.checked});
})

waMessagePreview.addEventListener('change',function(){
  chrome.storage.sync.set({waMessagePreview: this.checked});
})

waName.addEventListener('change',function(){
  chrome.storage.sync.set({waName: this.checked});
})

waMessage.addEventListener('change', function(){
  chrome.storage.sync.set({waMessage: this.checked})
})

