
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blockedCount"], result => {
    const blockedCount = result.blockedCount || 0;
    document.getElementById("blocked-count").textContent = blockedCount;
  });
});
