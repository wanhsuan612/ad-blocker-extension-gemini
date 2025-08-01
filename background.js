
function addRules() {
  // 首先，獲取所有現有動態規則的 ID，以便在新增規則前將其移除。
  // 這可以防止 ID 衝突。
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const oldRuleIds = existingRules.map(rule => rule.id);

    // 接著，從 JSON 檔案中獲取新規則。
    fetch("rules.json")
      .then(response => response.json())
      .then(data => {
        const newRules = data.map((rule, index) => ({
          id: index + 1,
          priority: 1,
          action: { type: "block" },
          condition: { urlFilter: rule.urlFilter }
        }));

        // 以原子操作移除舊規則並加入新規則。
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: oldRuleIds,
          addRules: newRules
        });
      });
  });
}

function removeRules() {
  // 要移除規則，我們首先需要獲取當前的動態規則
  chrome.declarativeNetRequest.getDynamicRules(rules => {
    const ruleIds = rules.map(rule => rule.id);
    if (ruleIds.length > 0) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds
      });
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  // 獲取初始狀態，預設為啟用 (true)
  chrome.storage.local.get({ isEnabled: true }, (result) => {
    if (result.isEnabled) {
      addRules();
    }
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.isEnabled) {
    changes.isEnabled.newValue ? addRules() : removeRules();
  }
});
