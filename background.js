chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.get([
        'on',
        'gmailSender',
        'gmailSubject',
        'waProfile',
        'waMessagePreview',
        'waMessage',
        'waName'
      ], function(data) {
        data.on == null && chrome.storage.sync.set({on: true});
        data.gmailSender == null && chrome.storage.sync.set({gmailSender: true});
        data.gmailSubject == null && chrome.storage.sync.set({gmailSubject: true});
        data.waProfile == null && chrome.storage.sync.set({waProfile: true});
        data.waMessage == null && chrome.storage.sync.set({waMessage: true});
        data.waMessagePreview == null && chrome.storage.sync.set({waMessagePreview: true});
        data.waName == null && chrome.storage.sync.set({waName: true});
    });
  });
 
  chrome.storage.onChanged.addListener(async function(t){
    chrome.tabs.query({url: "https://mail.google.com/*"}, function(tabs) {
        if (tabs.length !== 0) tabs.forEach(function(tab){
            chrome.storage.sync.get([
              'on',
              'gmailSender',
              'gmailSubject',
            ], function(data){

              Object.keys(data).forEach((key)=>{
                blurHandler(key,tab.id,false)
              })

              if(data.on){
                Object.keys(data).forEach((key)=>{
                  console.log(key,tab.id,data[key]);
                  blurHandler(key,tab.id,data[key])
                })
              }
            })
        });
    });
  })

  chrome.storage.onChanged.addListener(async function(t){
    chrome.tabs.query({url: "https://web.whatsapp.com/*"}, function(tabs) {
        if (tabs.length !== 0) tabs.forEach(function(tab){
            chrome.storage.sync.get([
              'on',
              'waProfile',
              'waMessagePreview',
              'waMessage',
              'waName'
            ], function(data){

              Object.keys(data).forEach((key)=>{
                blurHandler(key,tab.id,false)
              })

              if(data.on){
                Object.keys(data).forEach((key)=>{
                  console.log(key,tab.id,data[key]);
                  blurHandler(key,tab.id,data[key])
                })
              }
            })
        });
    });
  })

  chrome.runtime.onMessage.addListener(async function(t){

    console.log("RELOAD =============")

    chrome.tabs.query({url: "https://mail.google.com/*"}, function(tabs) {
      if (tabs.length !== 0) tabs.forEach(function(tab){
          chrome.storage.sync.get([
            'on',
            'gmailSender',
            'gmailSubject',
          ], function(data){

            Object.keys(data).forEach((key)=>{
              blurHandler(key,tab.id,false)
            })

            if(data.on){
              Object.keys(data).forEach((key)=>{
                blurHandler(key,tab.id,data[key])
              })
            }
          })
      });
  });


    chrome.tabs.query({url: "https://web.whatsapp.com/*"}, function(tabs) {
        if (tabs.length !== 0) tabs.forEach(function(tab){
            chrome.storage.sync.get([
              'on',
              'waProfile',
              'waMessagePreview',
              'waMessage',
              'waName'
            ], function(data){

              Object.keys(data).forEach((key)=>{
                blurHandler(key,tab.id,false)
              })

              if(data.on){
                Object.keys(data).forEach((key)=>{
                  console.log(key,data[key],"wa tab");
                  blurHandler(key,tab.id,data[key])
                })
              }
            })
        });
    });
  })

  async function blurHandler(key,id,isBlur){
    if(isBlur){
     await chrome.scripting.insertCSS({
        files: [`css/${key}.css`],
        target: { tabId: id }, 
      })
    }
    else{
     await chrome.scripting.removeCSS({
        files: [`css/${key}.css`],
        target: { tabId: id }, 
      })
    }
  }