var p = Object.defineProperty;
var h = (l, t, e) => (t in l ? p(l, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (l[t] = e));
var u = (l, t, e) => (h(l, typeof t != "symbol" ? t + "" : t, e), e);
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) a(i);
    new MutationObserver((i) => {
        for (const o of i) if (o.type === "childList") for (const s of o.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && a(s);
    }).observe(document, { childList: !0, subtree: !0 });
    function e(i) {
        const o = {};
        return (
            i.integrity && (o.integrity = i.integrity),
            i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
            i.crossOrigin === "use-credentials" ? (o.credentials = "include") : i.crossOrigin === "anonymous" ? (o.credentials = "omit") : (o.credentials = "same-origin"),
            o
        );
    }
    function a(i) {
        if (i.ep) return;
        i.ep = !0;
        const o = e(i);
        fetch(i.href, o);
    }
})();
class m {
    constructor(t) {
        u(this, "defaults", {
            oldestFirst: !0,
            text: "Toastify is awesome!",
            node: void 0,
            duration: 3e3,
            selector: void 0,
            callback: function () {},
            destination: void 0,
            newWindow: !1,
            close: !1,
            gravity: "toastify-top",
            positionLeft: !1,
            position: "",
            backgroundColor: "",
            avatar: "",
            className: "",
            stopOnFocus: !0,
            onClick: function () {},
            offset: { x: 0, y: 0 },
            escapeMarkup: !0,
            ariaLive: "polite",
            style: { background: "" }
        });
        (this.options = {}), (this.toastElement = null), (this._rootElement = document.body), this._init(t);
    }
    showToast() {
        if (
            ((this.toastElement = this._buildToast()),
            typeof this.options.selector == "string"
                ? (this._rootElement = document.getElementById(this.options.selector))
                : this.options.selector instanceof HTMLElement || this.options.selector instanceof ShadowRoot
                  ? (this._rootElement = this.options.selector)
                  : (this._rootElement = document.body),
            !this._rootElement)
        )
            throw "Root element is not defined";
        return (
            this._rootElement.insertBefore(this.toastElement, this._rootElement.firstChild),
            this._reposition(),
            this.options.duration > 0 &&
                (this.toastElement.timeOutValue = window.setTimeout(() => {
                    this._removeElement(this.toastElement);
                }, this.options.duration)),
            this
        );
    }
    hideToast() {
        this.toastElement.timeOutValue && clearTimeout(this.toastElement.timeOutValue), this._removeElement(this.toastElement);
    }
    _init(t) {
        (this.options = Object.assign(this.defaults, t)),
            this.options.backgroundColor && console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.'),
            (this.toastElement = null),
            (this.options.gravity = t.gravity === "bottom" ? "toastify-bottom" : "toastify-top"),
            (this.options.stopOnFocus = t.stopOnFocus === void 0 ? !0 : t.stopOnFocus),
            t.backgroundColor && (this.options.style.background = t.backgroundColor);
    }
    _buildToast() {
        if (!this.options) throw "Toastify is not initialized";
        let t = document.createElement("div");
        (t.className = `toastify on ${this.options.className}`), (t.className += ` toastify-${this.options.position}`), (t.className += ` ${this.options.gravity}`);
        for (const e in this.options.style) t.style[e] = this.options.style[e];
        if ((this.options.ariaLive && t.setAttribute("aria-live", this.options.ariaLive), this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE)) t.appendChild(this.options.node);
        else if ((this.options.escapeMarkup ? (t.innerText = this.options.text) : (t.innerHTML = this.options.text), this.options.avatar !== "")) {
            let e = document.createElement("i");
            (e.className = "toastify-avatar " + this.options.avatar), this.options.position == "left" ? t.appendChild(e) : t.insertAdjacentElement("afterbegin", e);
        }
        if (this.options.close === !0) {
            let e = document.createElement("button");
            (e.type = "button"),
                e.setAttribute("aria-label", "Close"),
                (e.className = "toast-close"),
                (e.innerHTML = "&#10006;"),
                e.addEventListener("click", (i) => {
                    i.stopPropagation(), this._removeElement(this.toastElement), window.clearTimeout(this.toastElement.timeOutValue);
                });
            const a = window.innerWidth > 0 ? window.innerWidth : screen.width;
            this.options.position == "left" && a > 360 ? t.insertAdjacentElement("afterbegin", e) : t.appendChild(e);
        }
        if (
            (this.options.stopOnFocus &&
                this.options.duration > 0 &&
                (t.addEventListener("mouseover", (e) => {
                    window.clearTimeout(t.timeOutValue);
                }),
                t.addEventListener("mouseleave", () => {
                    t.timeOutValue = window.setTimeout(() => {
                        this._removeElement(t);
                    }, this.options.duration);
                })),
            typeof this.options.destination < "u" &&
                t.addEventListener("click", (e) => {
                    e.stopPropagation(), this.options.newWindow === !0 ? window.open(this.options.destination, "_blank") : (window.location = this.options.destination);
                }),
            typeof this.options.onClick == "function" &&
                typeof this.options.destination > "u" &&
                t.addEventListener("click", (e) => {
                    e.stopPropagation(), this.options.onClick();
                }),
            typeof this.options.offset == "object")
        ) {
            const e = this._getAxisOffsetAValue("x", this.options),
                a = this._getAxisOffsetAValue("y", this.options),
                i = this.options.position == "left" ? e : `-${e}`,
                o = this.options.gravity == "toastify-top" ? a : `-${a}`;
            t.style.transform = `translate(${i},${o})`;
        }
        return t;
    }
    _removeElement(t) {
        (t.className = t.className.replace(" on", "")),
            window.setTimeout(() => {
                this.options.node && this.options.node.parentNode && this.options.node.parentNode.removeChild(this.options.node),
                    t.parentNode && t.parentNode.removeChild(t),
                    this.options.callback.call(t),
                    this._reposition();
            }, 400);
    }
    _reposition() {
        let t = { top: 15, bottom: 15 },
            e = { top: 15, bottom: 15 },
            a = { top: 15, bottom: 15 },
            i = this._rootElement.querySelectorAll(".toastify"),
            o;
        for (let s = 0; s < i.length; s++) {
            i[s].classList.contains("toastify-top") === !0 ? (o = "toastify-top") : (o = "toastify-bottom");
            let n = i[s].offsetHeight;
            o = o.substr(9, o.length - 1);
            let r = 15;
            (window.innerWidth > 0 ? window.innerWidth : screen.width) <= 360
                ? ((i[s].style[o] = `${a[o]}px`), (a[o] += n + r))
                : i[s].classList.contains("toastify-left") === !0
                  ? ((i[s].style[o] = `${t[o]}px`), (t[o] += n + r))
                  : ((i[s].style[o] = `${e[o]}px`), (e[o] += n + r));
        }
    }
    _getAxisOffsetAValue(t, e) {
        return e.offset[t] ? (isNaN(e.offset[t]) ? e.offset[t] : `${e.offset[t]}px`) : "0px";
    }
}
function d(l) {
    return new m(l);
}
function c(l = "", t = 3e3, e = null, { iconClassName: a = void 0, background: i = void 0, border: o = void 0, fontColor: s = void 0 } = {}) {
    let n = { iconClassName: a, background: i, border: o, fontColor: s };
    if ((Object.keys(n).forEach((r) => n[r] === void 0 && delete n[r]), e)) {
        let r = {};
        switch (e) {
            case "primary":
                r = { iconClassName: "bi-info-lg", background: "#cfe2ff", border: "1px solid #9ec5fe", fontColor: "#0a58ca" };
                break;
            case "success":
                r = { iconClassName: "bi-check-lg", background: "#d1e7dd", border: "1px solid #a3cfbb", fontColor: "#146c43" };
                break;
            case "warning":
                r = { iconClassName: "bi-exclamation-lg", background: "#ffe69c", border: "1px solid #ffd746", fontColor: "#997404" };
                break;
            case "danger":
                r = { iconClassName: "bi-x-circle", background: "#f8d7da", border: "1px solid #f1aeb5", fontColor: "#b02a37" };
                break;
        }
        n = { ...r, ...n };
    }
    d({
        text: l,
        duration: t,
        close: !0,
        gravity: "bottom",
        position: "right",
        stopOnFocus: !0,
        style: { color: n.fontColor, background: n.background, fontSize: "1.1em", borderRadius: "6px", border: n.border, boxShadow: "rgb(0 0 0 / 10%) 2px -2px 5px 2px" },
        avatar: n.iconClassName
    }).showToast();
}
c("I just want to notify you.", -1, "primary");
c("Hello World!", -1, "success");
c("Hello World!", -1, "success", { iconClassName: "bi-heart" });
c("Ow man, what are you doing? What are you doing? are you doing? you doing? doing? ing?", -1, "warning");
c("Get out of there quickly!", -1, "danger");
var y = ["linear-gradient(to right, #00b09b, #96c93d)", "linear-gradient(to right, #ff5f6d, #ffc371)"],
    f = 0;
d({ text: "Hi", duration: 4500, destination: "https://github.com/apvarun/toastify-js", newWindow: !0, gravity: "top", position: "left" }).showToast();
setTimeout(function () {
    d({ text: "Simple JavaScript Toasts", gravity: "top", position: "center", style: { background: "#0f3443" } }).showToast();
}, 1e3);
var g = {
        text: "Happy toasting!",
        duration: 2500,
        callback: function () {
            console.log("Toast hidden");
        },
        close: !0,
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
    },
    b = d(g);
setTimeout(function () {
    b.showToast();
}, 4500);
setTimeout(function () {
    d({ text: "Highly customizable", gravity: "bottom", position: "left", close: !0, style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" } }).showToast();
}, 3e3);
document.getElementById("new-toast").addEventListener("click", function () {
    d({ text: "I am a toast", duration: 3e3, close: !!(f % 3), style: { background: y[f % 2] } }).showToast(), f++;
});
