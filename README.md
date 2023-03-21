# Speak - Chrome extension

**Speak** is a Chrome extension, using the Speech Recognition API to provide a speech-to-text interface as an overlay on a website.
The main goal is to allow people to make their presentations more accessible for the deaf and hard-of-hearing.

**Important note:**

_As any speech recognition system, it is not working perfectly but hopefully it can still be somehow useful and will probably improve over time._

## Installation

To install the extension, follow these steps:

- Clone this repository to your local machine by running the below command:

  ```
  git clone https://github.com/hashmat-noorani/speak-chrome-extension.git
  ```

- Unzip the cloned file.
- Open Chrome and navigate to
  ```
  chrome://extensions
  ```
- Enable Developer mode by clicking the toggle switch in the upper-right corner.
- Click the "Load unpacked" button and select the unzipped folder.

## Usage:

- Click on the extension in your browser's menu bar.
- Click on the "Start" button.
- Allow access to your microphone if you haven't already.
- Detection:
  - If the website you are currently trying to use this extension on is **blocking access to AudioCapture**, you will see an **error message displayed**.
  - If you do **not see an error message**, you should be able to **start speaking** and see an overlay appear on the page with the **caption**.
- Click on the extension logo again in the menu bar to close the extension.

- To stop the tracking, open the extension and click on the "Stop" button.

## Tech stack:

- HTML/CSS/JS
- Speech Recognition API

## Current known issues:

- The recognition is not always very accurate

## Privacy

This extension requires the following permissions:

- tabs: Allows the extension to interact with browser tabs.
