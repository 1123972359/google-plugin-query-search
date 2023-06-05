// 监听浏览器启动事件
chrome.runtime.onStartup.addListener(() => {
  console.log("插件已启动");
});

// 监听插件安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已安装");
});

// 处理来自内容脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("收到来自内容脚本的消息:", message);
  // 在这里执行相应的操作，并通过sendResponse回复消息
});

// 在插件启动时执行的逻辑
console.log("插件启动");

// 可以在这里编写其他的逻辑和功能
