/**
 * @param {object} config - 原配置文件内容
 */
function main(config) {
    // 1. 定义自定义proxies
    const selfProxies = {
        "name": "SELF-PROXIES",
        "type": "ss",
        "server": "137.184.89.173",
        "port": "45870",
        "cipher": "aes-256-cfb",
        "password": "G8Uj5D3Sh9aV1cIeFQ[sAy'R%*vd]TB4t.rO"
    };
    config['proxies'].unshift(selfProxies);

    // 1. 定义你要修改的策略组名称
    const targetGroupName = "🔰 选择节点";

    // 3. 遍历并修改
    if (config['proxy-groups']) {
        config['proxy-groups'].forEach(group => {
            if (group.name === targetGroupName) {
                group['proxies'].unshift("SELF-PROXIES");
            }
        });
    }

    // 4. 返回修改后的配置
    return config;
}