var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var FUNC_ERROR_TEXT = "Expected a function";
var NAN = 0 / 0;
var symbolTag = "[object Symbol]";
var reTrim = /^\s+|\s+$/g;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var nativeMax = Math.max, nativeMin = Math.min;
var now = function() {
  return root.Date.now();
};
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
    return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
function isObject(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, "");
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var lodash_throttle = throttle;
function extendHistoryEvent() {
  window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
      const event = new Event("pushstate");
      const result = target.apply(thisArg, argArray);
      window.dispatchEvent(event);
      return result;
    }
  });
  window.history.replaceState = new Proxy(window.history.replaceState, {
    apply: (target, thisArg, argArray) => {
      const event = new Event("replacestate");
      const result = target.apply(thisArg, argArray);
      window.dispatchEvent(event);
      return result;
    }
  });
}
const BASE_HTML_ID = "acms-content";
class AttachmentCMS {
  constructor(options) {
    __publicField(this, "baseUrl");
    __publicField(this, "defaultToken");
    __publicField(this, "queryToken");
    __publicField(this, "contents");
    __publicField(this, "id");
    __publicField(this, "contentsResponse");
    __publicField(this, "throttleApplyContents");
    if (!options || !options.token)
      throw new Error("Required acmst query parameter as token.");
    this.baseUrl = options && options.baseUrl || "https://api.attachment-cms.dev";
    this.defaultToken = options.token;
    this.id = options && options.id || null;
    this.throttleApplyContents = lodash_throttle(this.applyContents, options && options.throttleMs || 200);
  }
  get isClient() {
    return typeof window === "undefined";
  }
  get url() {
    return this.queryToken ? `${this.baseUrl}/contents/limited` : `${this.baseUrl}/contents`;
  }
  get token() {
    return this.queryToken || this.defaultToken;
  }
  async run() {
    if (this.isClient)
      return;
    this.queryToken = this.getQueryToken();
    this.showLimitedMode();
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
  getQueryToken() {
    let qtoken = sessionStorage.getItem("acmst");
    if (qtoken)
      return qtoken;
    const urlParams = new URLSearchParams(window.location.search);
    qtoken = urlParams.get("acmst");
    if (qtoken)
      sessionStorage.setItem("acmst", qtoken);
    return qtoken;
  }
  showLimitedMode() {
    if (!this.queryToken)
      return;
    const el = document.getElementsByTagName("body")[0];
    const content = `<div id="${BASE_HTML_ID}-limited-mark" style="position: fixed; bottom: 20px; right: 30px;background-color: #46F28D; box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5); border-radius: 6px;">
    <p style="padding: 10px; font-weight: 600;">\u9650\u5B9A\u516C\u958B<br/>by attachment CMS</p>
    </div>`;
    this.insertLastChildToElement(el, content);
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
    const currentPath = window.location.pathname.replace(/\/$/, "");
    return pathList.filter((path) => {
      path = path.replace(/\/$/, "");
      const regex = new RegExp(String.raw`^${path}$`, "i");
      return currentPath.match(regex);
    }).map((path) => data[path]).flat();
  }
  observeElement() {
    const el = this.id ? document.getElementById(this.id) : document.getElementsByTagName("body")[0];
    if (!el) {
      this.id && console.warn(`No exists html element. id: ${this.id}`);
      throw new Error("No found observed element.");
    }
    const mo = new MutationObserver(() => {
      this.throttleApplyContents();
    });
    const config = {
      attributes: false,
      characterData: true,
      childList: true,
      subtree: true
    };
    mo.observe(el, config);
  }
  applyContents() {
    this.contents.forEach((r) => {
      const target = document.querySelector(r.selector);
      if (!target)
        return;
      const htmlId = `${BASE_HTML_ID}-${r.id}`;
      const processed = document.getElementById(htmlId);
      if (processed)
        return;
      switch (r.action) {
        case "innerHTML":
          target.innerHTML = r.content;
          break;
        case "remove":
          this.removeElement(target, htmlId);
          break;
        case "insertBefore":
          this.insertBeforeElement(target, r.content);
          break;
        case "insertChildAfterBegin":
          this.insertFirstChildToElement(target, r.content);
          break;
        case "insertChildBeforeEnd":
          this.insertLastChildToElement(target, r.content);
          break;
        case "insertAfter":
          this.insertAfterElement(target, r.content);
          break;
      }
    });
  }
  removeElement(el, htmlId) {
    el.id = htmlId;
    el.setAttribute("style", "display: none;");
  }
  insertBeforeElement(el, content) {
    el.insertAdjacentHTML("beforebegin", content);
  }
  insertFirstChildToElement(el, content) {
    el.insertAdjacentHTML("afterbegin", content);
  }
  insertLastChildToElement(el, content) {
    el.insertAdjacentHTML("beforeend", content);
  }
  insertAfterElement(el, content) {
    el.insertAdjacentHTML("afterend", content);
  }
  observeHistoryState() {
    extendHistoryEvent();
    const callback = () => {
      this.contents = this.extractMatchedContents(this.contentsResponse.contents);
    };
    window.addEventListener("popstate", callback);
    window.addEventListener("pushstate", callback);
    window.addEventListener("replacestate", callback);
  }
}
if (typeof window !== "undefined" && window.AttachmentConfig) {
  new AttachmentCMS(window.AttachmentConfig).run();
}
export { AttachmentCMS };
