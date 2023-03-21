console.log("Speak extension running");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.data === "start") {
    isStopButtonClicked = false;
    startTracking();
    return sendResponse({ msg: "Start Speaking..." });
  } else if (request.data === "stop") {
    isStopButtonClicked = true;
    stopTracking();
    return sendResponse({ msg: "Stopped" });
  }
});

let recognition,
  captionDiv,
  isStopButtonClicked = false;

const init = () => {
  captionDiv = document.createElement("div");
  captionDiv.className = "live-caption";

  setDivStyle(captionDiv);

  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.addEventListener("result", (e) => {
    let res = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    captionDiv.textContent = res;
    document.body.appendChild(captionDiv);
  });

  recognition.onerror = (e) => {
    let errorMsg = e?.error;
    if (errorMsg === "no-speech") return;
    if (e.error === "not-allowed") {
      errorMsg =
        "AudioCapture permission has been blocked because of a Feature Policy applied to the current document. See https://goo.gl/EuHzyv for more details.";
    }
    chrome.runtime.sendMessage({ error: errorMsg || "something went wrong" });
    isStopButtonClicked = true;
    stopTracking();
  };

  recognition.onspeechstart = (e) => console.log("speech started");
  recognition.onspeechend = (e) => stopTracking();
  recognition.onend = function (e) {
    if (isStopButtonClicked) {
      stopTracking();
    } else {
      startTracking();
    }
  };
};

const startTracking = () => recognition.start();

const setDivStyle = (div) => {
  div.style.position = "fixed";
  div.style.bottom = "30px";
  div.style.left = "50%";
  div.style.textAlign = "center";
  div.style.backgroundColor = "rgba(0,0,0,0.6)";
  div.style.color = "white";
  div.style.fontSize = "20px";
  div.style.transform = "translate(-50%)";
  div.style.border = "2px solid white";
  div.style.borderRadius = "5px";
  div.style.zIndex = "10000";
  div.style.fontFamily = "Arial";
  div.style.lineHeight = "1.5em";
  div.style.maxHeight = "3em"; /* twice the line-height */
  div.style.overflow = "hidden";
  div.style.display = "flex";
  div.style.alignItems = "end";
  div.style.transition = "transform 1s ease-in-out";
};

const stopTracking = () => {
  recognition.stop();
  if (document.body.contains(captionDiv)) {
    document.body.removeChild(captionDiv);
  }
};

init();
