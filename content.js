
const adSelectors = [
  ".ad",
  ".ads",
  ".advert",
  ".advertisement",
  "[id^=ad_]",
  "[class^=ad_]"
];

function hideAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = "none";
    });
  });
}

hideAds();

const observer = new MutationObserver(hideAds);
observer.observe(document.body, { childList: true, subtree: true });
