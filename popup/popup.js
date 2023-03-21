const startButton = document.querySelector(".activation-button"),
  stopButton = document.querySelector(".deactivation-button"),
  errorMessage = document.querySelector(".error-message"),
  contentMessage = document.querySelector(".content-message");

startButton.addEventListener("click", async () => {
  // console.log("clicked");
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { data: "start" }, (res) => {
    if (res?.msg) {
      contentMessage.classList.remove("error");
      contentMessage.textContent = res.msg;
      startButton.disabled = true;
      stopButton.disabled = false;
    }
  });
});

stopButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { data: "stop" }, (res) => {
    if (res?.msg) {
      contentMessage.classList.remove("error");
      contentMessage.textContent = res.msg;
      startButton.disabled = false;
      stopButton.disabled = true;
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request?.error) {
    contentMessage.classList.add("error");
    contentMessage.textContent = request.error;
    startButton.disabled = false;
    stopButton.disabled = true;
  }
});
