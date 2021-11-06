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
    const mo = new MutationObserver(() => {
      lodash_throttle(this.applyContents, 1e3);
    });
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
      if (r.content && !r.content.startsWith("<")) {
        r.content = `<div>${r.content}</div>`;
      }
      switch (r.action) {
        case "innerHTML":
          if (el.innerHTML === r.content)
            return;
          el.innerHTML = r.content;
          break;
        case "remove":
          el.parentNode.removeChild(el);
          break;
        case "insertBefore":
          this.insertBeforeElement(el, r.content);
          break;
        case "insertChildAfterBegin":
          this.insertFirstChildToElement(el, r.content);
          break;
        case "insertChildBeforeEnd":
          this.insertLastChildToElement(el, r.content);
          break;
        case "insertAfter":
          this.insertAfterElement(el, r.content);
          break;
      }
    });
  }
  insertBeforeElement(el, content) {
    const prevNode = el.previousSibling;
    if (prevNode && prevNode.innerHTML === content)
      return;
    el.insertAdjacentHTML("beforebegin", content);
  }
  insertFirstChildToElement(el, content) {
    const firstChild = el.firstChild;
    if (firstChild && firstChild.innerHTML === content)
      return;
    el.insertAdjacentHTML("afterbegin", content);
  }
  insertLastChildToElement(el, content) {
    const lastChild = el.lastChild;
    if (lastChild && lastChild.innerHTML === content)
      return;
    el.insertAdjacentHTML("beforeend", content);
  }
  insertAfterElement(el, content) {
    const lastChild = el.lastChild;
    if (lastChild && lastChild.innerHTML === content)
      return;
    el.insertAdjacentHTML("afterend", content);
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
