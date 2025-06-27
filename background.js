
chrome.runtime.onInstalled.addListener(() => {
  const RULESET_ID = "ruleset_1";
  const rules = {
    id: RULESET_ID,
    rules: []
  };

  fetch("rules.json")
    .then(response => response.json())
    .then(data => {
      rules.rules = data.map((rule, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: "block" },
        condition: { urlFilter: rule.urlFilter }
      }));

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.rules.map(rule => rule.id),
        addRules: rules.rules
      });
    });
});
