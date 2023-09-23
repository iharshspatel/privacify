let config = {};
let isExtensionActive;

function createPlatformList() {

    const platformList = document.getElementById("platformList");
    for (const platform in config) {
        const platformItem = document.createElement("li");
        platformItem.textContent = config[platform]['label'];
        platformItem.addEventListener("click", () => {

            for (const p in config) {
                config[p].isActive = false;
                document.querySelectorAll("#platformList li").forEach((item)=>{
                    item.classList.remove("active")
                })
            }

            config[platform].isActive = true;
            platformItem.classList.add("active");

            updateUI();
            updateStorage()
        });
        if(config[platform]['isActive'])platformItem.classList.add("active");
        platformList.appendChild(platformItem);
    }
}

function createSliderToggles() {
    const toggleList = document.getElementById("toggleList");
    toggleList.innerHTML = ""; 
    for (const platform in config) {
        if (config[platform].isActive) {
            const toggleContainer = document.createElement("div");
            toggleContainer.className = "toggleContainer";
            toggleList.appendChild(toggleContainer);

            config[platform]['dataSequence'].forEach((key)=>{
                const toggleBox = document.createElement("div");
                toggleBox.className = "toggleBox";

                const toggleLabel = document.createElement("label");
                toggleLabel.textContent = config[platform]['data'][key]['label'];

                const sliderToggle = document.createElement("div");
                sliderToggle.className = "sliderToggle";
                sliderToggle.dataset.platform = platform;
                if (config[platform].data[key]['value']) {
                    sliderToggle.classList.add("active");
                }
                else{
                    sliderToggle.classList.remove("active"); 
                }

                sliderToggle.addEventListener("click", () => {
                    config[platform].data[key]['value'] = !config[platform].data[key]['value'];
                    updateSliderToggleUI(sliderToggle);
                    updateStorage();
                });
                toggleBox.appendChild(toggleLabel);
                toggleBox.appendChild(sliderToggle);
                toggleContainer.appendChild(toggleBox);
            }
        )}
    }
}

function updateUI() {
    createSliderToggles();
}

function updateSliderToggleUI(sliderToggle) {
    sliderToggle.classList.toggle("active");
}

function updateStorage() {
    chrome.storage.sync.set({
        on: isExtensionActive,
        ...config
    })
}

chrome.storage.sync.get([
    'on',
    'gmail',
    'wa',
    'ldn'
], function (data) {
    config['gmail'] = data.gmail;
    config['wa'] = data.wa;
    config['ldn'] = data.ldn;
    isExtensionActive = data.on;

    createPlatformList();
    createSliderToggles();
});

