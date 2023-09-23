const urls = {
  gmail: "https://mail.google.com/*",
  wa: "https://web.whatsapp.com/*",
  ldn:"https://www.linkedin.com/*"
}

chrome.runtime.onInstalled.addListener(function (details) {
  resetSyncStorage();

  chrome.storage.sync.get([
    'on',
    'gmail',
    'wa'
  ], function (data) {
    data.on == null && chrome.storage.sync.set({ on: true });
    data.gmail == null && chrome.storage.sync.set({
      gmail: {
        isActive:true,
        label:'Gmail',
        dataSequence:['Enabled', 'Content', 'Sender', 'Subject', 'Attachments'],
        data:{
          Enabled:{
            label:'Enabled',
            value:true
          },
          Content: {
            label:'Content',
            value:true
          },
          Sender:{
            label:'Sender',
            value:true
          },
          Subject: {
            label:'Subject',
            value:true
          },
          Attachments: {
            label:'Attachments',
            value:true
          }
        }
      }
    })
    data.wa == null && chrome.storage.sync.set({
      wa: {
        isActive:false,
        label:'WhatsApp',
        dataSequence:['Enabled', 'GroupMembers', 'MessagePreview', 'Message', 'Name', 'Profile' ],
        data:{
          Enabled:{
            label:'Enabled',
            value:true
          },
          GroupMembers:{
            label:'Group Members',
            value:true
          },
          MessagePreview: {
            label:'Message Preview',
            value:true
          },
          Message: {
            label:'Message',
            value:true
          },
          Name: {
            label:'Name',
            value:true
          },
          Profile: {
            label:'Profile',
            value:true
          },
        }
      }
    })
    data.ldn == null && chrome.storage.sync.set({
      ldn: {
        isActive:false,
        label:'LinkedIn',
        dataSequence:['Enabled', 'Profile', 'Name', 'MessagePreview', 'Message' ],
        data:{
          Enabled:{
            label:'Enabled',
            value:true
          },
          Profile: {
            label:'Profile',
            value:true
          },
          Name:{
            label:'Name',
            value:true
          },
          MessagePreview:{
            label:'Message Preview',
            value:true
          },
          Message:{
            label:"Messages",
            value:true
          }
        }
      }
    })
  });

  Object.keys(urls).forEach((plateform)=>{
    tabHandler(plateform, urls[plateform])
  })
  
});

chrome.storage.onChanged.addListener(async function (t) {
  Object.keys(urls).forEach((plateform)=>{
    tabHandler(plateform, urls[plateform])
  })
})

chrome.runtime.onMessage.addListener(async function (t) {
  Object.keys(urls).forEach((plateform)=>{
    tabHandler(plateform, urls[plateform])
  })
})

async function blurHandler(parentKey, key, id, isBlur) {
  if (isBlur) {
    await chrome.scripting.insertCSS({
      files: [`css/${parentKey}${key}.css`],
      target: { tabId: id },
    })
  }
  else {
    await chrome.scripting.removeCSS({
      files: [`css/${parentKey}${key}.css`],
      target: { tabId: id },
    })
  }
}

function tabHandler(plateform, url) {
  chrome.tabs.query({ url: url }, function (tabs) {
    if (tabs.length !== 0) tabs.forEach(function (tab) {
      chrome.storage.sync.get([
        'on',
        plateform
      ], function (data) {
        data[plateform] && data[plateform]['dataSequence'].forEach((key) => {
          blurHandler(plateform, key, tab.id, false)
        })

        if (data && data[plateform] && data[plateform]['data']['Enabled']['value']) {
          data[plateform] &&  data[plateform]['dataSequence'].forEach((key) => {
            blurHandler(plateform, key, tab.id, data[plateform]['data'][key]['value'])
          })
        }
      })
    });
  });
}

function resetSyncStorage() {
  chrome.storage.sync.clear(function() {
    console.log('Sync storage data has been cleared.');
  });
}


