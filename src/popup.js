const createContent = () => {
  const div = document.createElement("div");
  div.className = "Query__Search_content";
  return div;
};

/** @param {[key: string, val: string]} pair */
const createRow = (pair) => {
  const row = document.createElement("div");
  row.className = "Query__Search_row";

  const title = document.createElement("div");
  title.className = "Query__Search_title";
  title.innerText = pair[0];
  row.appendChild(title);

  const textarea = document.createElement("textarea");
  textarea.className = "Query__Search_textarea";
  textarea.value = pair[1];
  textarea.setAttribute("data-key", pair[0]);
  row.appendChild(textarea);

  return row;
};

const dealSearch = ({ url, content }) => {
  const root = document.querySelector(".Query__Search");
  const searchParams = new URLSearchParams(url.search);
  for (let pair of searchParams.entries()) {
    const row = createRow(pair);
    content.appendChild(row);
  }
  root.appendChild(content);
};

const dealBtn = ({ url, urlTextarea, tabs, content }) => {
  /** 确认按钮 */
  const btn = document.querySelector("#jump");
  /** 预览按钮 */
  const preview = document.querySelector("#preview");
  /** 新增按钮 */
  const add = document.querySelector("#add");

  preview.onclick = btn.onclick = function () {
    const value = document.querySelectorAll(".Query__Search_textarea");
    value.forEach((item) => {
      if (item.value) {
        url.searchParams.set(item.getAttribute("data-key"), item.value);
      } else {
        url.searchParams.delete(item.getAttribute("data-key"));
      }
    });
    const newUrl = url.toString();
    console.log(newUrl);
    const type = this.getAttribute("data-type");
    switch (type) {
      case "preview":
        urlTextarea.value = newUrl;
        break;
      default:
        chrome.tabs.update(tabs[0].id, { url: newUrl });
        break;
    }
  };

  add.onclick = function () {
    const key = prompt("key是?");
    if (!key) {
      return;
    }
    const row = createRow([key, ""]);
    content.appendChild(row);
  };
};

const main = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = new URL(tabs[0].url);
    const urlTextarea = document.querySelector(
      "#Query__Search_header_textarea"
    );
    urlTextarea.value = url;
    const content = createContent();
    dealSearch({ url, content });
    dealBtn({
      url,
      urlTextarea,
      tabs,
      content,
    });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  main();
});
