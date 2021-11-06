var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AttachmentCMS {
  constructor(options) {
    __publicField(this, "url");
    __publicField(this, "token");
    __publicField(this, "contents");
    __publicField(this, "id");
    __publicField(this, "contentsResponse");
    if (!options || !options.token)
      throw new Error("Required token.");
    const baseUrl = options && options.baseUrl || "https://attachment-cms.dev";
    const urlParams = new URLSearchParams(window.location.search);
    const queryToken = urlParams.get("token");
    if (queryToken) {
      this.token = queryToken;
      this.url = `${baseUrl}/contents/limited`;
    } else {
      this.token = options.token;
      this.url = `${baseUrl}/contents`;
    }
    this.id = options && options.id || null;
  }
  async run() {
    this.contentsResponse = await this.fetchContents();
    this.contents = this.extractMatchedContents(this.contentsResponse.contents);
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => {
        this.applyContents();
        this.observeElement();
        this.observeHistoryState();
      });
    } else {
      this.applyContents();
      this.observeElement();
      this.observeHistoryState();
    }
  }
  async fetchContents() {
    const url = `${this.url}?token=${this.token}`;
    const response = await fetch(url);
    return response.json();
  }
  extractMatchedContents(data) {
    if (!data)
      return [];
    const pathList = Object.keys(data);
    const currentPath = window.location.pathname;
    return pathList.filter((path) => {
      const regex = new RegExp(String.raw`^${path}$`, "i");
      return currentPath.match(regex);
    }).map((path) => data[path]).flat();
  }
  observeElement() {
    const el = this.id ? document.getElementById(this.id) : document.getElementsByTagName("body")[0];
    if (!el) {
      this.id && console.warn(`No exists html element. id: ${this.id}`);
      return;
    }
    const mo = new MutationObserver(() => this.applyContents());
    const config = {
      attributes: false,
      attributeOldValue: false,
      characterData: true,
      characterDataOldValue: true,
      childList: true,
      subtree: true
    };
    mo.observe(el, config);
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
  observeHistoryState() {
    window.onpopstate = () => {
      this.contents = this.extractMatchedContents(this.contentsResponse.contents);
      this.applyContents();
    };
  }
}
if (typeof window !== "undefined" && window.AttachmentConfig) {
  new AttachmentCMS(window.AttachmentConfig).run();
}
export { AttachmentCMS };
