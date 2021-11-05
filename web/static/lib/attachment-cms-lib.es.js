var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AttachmentCMS {
  constructor(token, baseUrl) {
    __publicField(this, "url");
    __publicField(this, "token");
    __publicField(this, "contents");
    const urlParams = new URLSearchParams(window.location.search);
    const queryToken = urlParams.get("token");
    if (queryToken) {
      this.token = queryToken;
      this.url = baseUrl ? `${baseUrl}/contents/limited` : "https://attachment-cms.dev/contents/limited";
    } else {
      this.token = token;
      this.url = baseUrl ? `${baseUrl}/contents` : "https://attachment-cms.dev/contents";
    }
  }
  async run() {
    await this.fetchContents();
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => {
        this.applyContents();
        this.observeElement();
      });
    } else {
      this.applyContents();
      this.observeElement();
    }
  }
  async fetchContents() {
    const url = `${this.url}?token=${this.token}`;
    const response = await fetch(url);
    const data = await response.json();
    this.contents = this.extractMatchedContents(data.contents);
  }
  extractMatchedContents(data) {
    const pathList = Object.keys(data);
    const currentPath = window.location.pathname;
    return pathList.filter((path) => {
      const regex = new RegExp(String.raw`^${path}$`, "i");
      return currentPath.match(regex);
    }).map((path) => data[path]).flat();
  }
  observeElement() {
    const bodyElement = document.getElementsByTagName("body")[0];
    const mo = new MutationObserver((mutationsList) => {
      console.log(mutationsList);
      this.applyContents();
    });
    const config = {
      attributes: false,
      attributeOldValue: false,
      characterData: true,
      characterDataOldValue: true,
      childList: true,
      subtree: true
    };
    mo.observe(bodyElement, config);
  }
  applyContents() {
    this.contents.forEach((r) => {
      const el = document.querySelector(r.selector);
      if (!el)
        return;
      switch (r.action) {
        case "innerHTML":
          el.innerHTML = r.content;
          break;
        case "remove":
          el.parentNode.removeChild(el);
          break;
        case "insertBefore":
          el.insertAdjacentHTML("beforebegin", r.content);
          break;
        case "insertChildAfterBegin":
          el.insertAdjacentHTML("afterbegin", r.content);
          break;
        case "insertChildBeforeEnd":
          el.insertAdjacentHTML("beforeend", r.content);
          break;
        case "insertAfter":
          el.insertAdjacentHTML("afterend", r.content);
          break;
      }
    });
  }
}
if (window.AttachmentConfig) {
  const { url, token } = window.AttachmentConfig;
  new AttachmentCMS(token, url).run();
}
export { AttachmentCMS };
