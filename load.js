// chrome.storage.sync.get([
//     'on',
//     'gmailSender',
//     'gmailSubject',
//   ], function(data) {

//     if(data.on){      
//       Object.keys(config).forEach((key)=>{
//         document.querySelectorAll(config[key]).forEach((item)=>{
//           blurHandler(config[key], data[key])
//         })
//       })
//     }
//     else{
//       Object.keys(config).forEach((key)=>{
//         document.querySelectorAll(config[key]).forEach((item)=>{
//           item.classList.remove("privacifyblur")
//         })
//       })
//     }
// });

chrome.runtime.sendMessage("Loaded")
