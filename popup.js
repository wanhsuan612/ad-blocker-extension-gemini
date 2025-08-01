
document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggle-switch");
  const blockedCountEl = document.getElementById("blocked-count");

  // 從儲存空間獲取初始狀態並更新 UI
  chrome.storage.local.get(["isEnabled", "blockedCount"], (result) => {
    // 如果 'isEnabled' 未設定，預設為 true (啟用)
    const isEnabled = typeof result.isEnabled === "undefined" ? true : result.isEnabled;
    toggleSwitch.checked = isEnabled;

    const blockedCount = result.blockedCount || 0;
    blockedCountEl.textContent = blockedCount;
  });

  // 監聽開關的變更事件
  toggleSwitch.addEventListener("change", () => {
    const isEnabled = toggleSwitch.checked;
    chrome.storage.local.set({ isEnabled: isEnabled });
  });
});
