# 🧀 Ad Blocker Chrome Extension

A simple Chrome extension that blocks ads on websites using both network request blocking and DOM manipulation.

## Features
- **Blocks network requests** to known ad servers using Chrome's Declarative Net Request API.
- **Hides ad elements** on web pages using common CSS selectors.
- **Popup UI** displays the number of ads blocked (tracked locally).
- **Easy to configure** with a JSON file of rules.

## How It Works
- **background.js**: Loads ad-blocking rules from `rules.json` and applies them as dynamic rules using the `chrome.declarativeNetRequest` API.
- **content.js**: Hides ad elements in the DOM by targeting common ad-related selectors. Uses a MutationObserver to catch dynamically loaded ads.
- **rules.json**: Contains a list of URL filters for blocking requests to known ad servers.
- **popup.html / popup.js**: Simple popup UI showing the number of blocked ads (count stored in `chrome.storage.local`).

## Installation
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this project directory.
5. The Ad Blocker extension should now appear in your browser!

## File Overview
- `manifest.json`: Extension manifest (v3) with permissions and configuration.
- `background.js`: Handles loading and updating network block rules.
- `content.js`: Hides ad elements in the DOM.
- `rules.json`: List of ad server URL filters.
- `popup.html`, `popup.js`, `popup.css`: Popup UI for the extension.
- `icons/`: Extension icons.

## Customizing Block Rules
To add or remove blocked ad servers, edit `rules.json` with new or updated `urlFilter` entries. Reload the extension in Chrome for changes to take effect.

## License
MIT License

---

**Developed June 2025**

---

Feel free to contribute or suggest improvements!
