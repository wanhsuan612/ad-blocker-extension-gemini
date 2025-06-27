
const adSelectors = [
  ".ad",
  ".ads",
  ".advert",
  ".advertisement",
  "[id^=ad_]",
  "[class^=ad_]"
];

const HIDE_STYLE_ID = 'ad-blocker-hide-style';
const HIDE_CLASS = 'ad-blocker-hidden-by-extension';

let observer;

function injectHideStyle() {
  if (document.getElementById(HIDE_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = HIDE_STYLE_ID;
  // 使用 !important 來覆蓋其他 display 樣式
  style.textContent = `.${HIDE_CLASS} { display: none !important; }`;
  (document.head || document.documentElement).appendChild(style);
}

function removeHideStyle() {
  const style = document.getElementById(HIDE_STYLE_ID);
  if (style) {
    style.remove();
  }
}

function hideAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add(HIDE_CLASS);
    });
  });
}

function showAds() {
  document.querySelectorAll(`.${HIDE_CLASS}`).forEach(el => {
    el.classList.remove(HIDE_CLASS);
  });
}

function setBlockingState(isEnabled) {
  if (isEnabled) {
    injectHideStyle();
    hideAds();
    if (!observer) {
      observer = new MutationObserver(hideAds);
    }
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    showAds();
    removeHideStyle();
  }
}

chrome.storage.local.get({ isEnabled: true }, (result) => {
  setBlockingState(result.isEnabled);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.isEnabled !== undefined) {
    setBlockingState(changes.isEnabled.newValue);
  }
});
