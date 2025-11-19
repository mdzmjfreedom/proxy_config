// // Stash: HTTP Response Script
// // 功能：将自定义规则插入到 rules 最前面（不排序、不修改原有规则）
//
// // 在这里填你的规则（按顺序）
// const customRules = [
//     "DOMAIN-SUFFIX,smoot.apple.com,🇺🇲 美国Z01",
//     "DOMAIN,guzzoni.apple.com,🇺🇲 美国Z01",
//     "DOMAIN,apple-relay.cloudflare.com,🇺🇲 美国Z01",
//     "DOMAIN,apple-relay.fastly-edge.com,🇺🇲 美国Z01",
//     "DOMAIN,cp4.cloudflare.com,🇺🇲 美国Z01",
//     "DOMAIN,apple-relay.apple.com,🇺🇲 美国Z01"
// ];
//
// module.exports = async function (resp) {
//     let config = JSON.parse(resp.body);
//
//     // 原 config 中可能没有 rules
//     let rules = config.rules || [];
//
//     // 将自定义规则追加到最前面
//     config.rules = [...customRules, ...rules];
//
//     return {
//         body: JSON.stringify(config)
//     };
// };

module.exports = async function (ctx) {
    try {
        let configText = ctx.response.body; // 获取远程 YAML 文本

        // 你的自定义规则
        const myRules = [
            "DOMAIN-SUFFIX,smoot.apple.com,🇺🇲 美国Z01",
            "DOMAIN,guzzoni.apple.com,🇺🇲 美国Z01",
            "DOMAIN,apple-relay.cloudflare.com,🇺🇲 美国Z01",
            "DOMAIN,apple-relay.fastly-edge.com,🇺🇲 美国Z01",
            "DOMAIN,cp4.cloudflare.com,🇺🇲 美国Z01",
            "DOMAIN,apple-relay.apple.com,🇺🇲 美国Z01"
        ];

        // 匹配 YAML 的 rules: 块
        const ruleHeaderRegex = /^rules:\s*\n/mi;

        if (ruleHeaderRegex.test(configText)) {
            const insertText = myRules.map(r => `  - ${r}`).join("\n") + "\n";
            configText = configText.replace(ruleHeaderRegex, match => match + insertText);
        }

        ctx.response.body = configText; // 输出修改后的 YAML

    } catch (e) {
        console.log("MyRuleInject Error:", e);
    }
};