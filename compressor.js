/*!
 * Compressor.js v1.0.6
 * https://fengyuanchen.github.io/compressorjs
 *g
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-11-23T04:43:12.442Z
 */
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Compressor = t()
}(this, function () {
    "use strict";

    function a(e, t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
    }

    function s() {
        return (s = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a])
            }
            return e
        }).apply(this, arguments)
    }

    function t(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(t);
            e && (a = a.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })), r.push.apply(r, a)
        }
        return r
    }

    function i(i) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? t(Object(n), !0).forEach(function (e) {
                var t, r, a;
                t = i, a = n[r = e], r in t ? Object.defineProperty(t, r, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[r] = a
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(n)) : t(Object(n)).forEach(function (e) {
                Object.defineProperty(i, e, Object.getOwnPropertyDescriptor(n, e))
            })
        }
        return i
    }
    var e, L = (function (e) {
            var t, i, u, f, h, d, n;
            "undefined" != typeof window && (i = (t = window).HTMLCanvasElement && t.HTMLCanvasElement.prototype, u = t.Blob && function () {
                try {
                    return Boolean(new Blob)
                } catch (e) {
                    return !1
                }
            }(), f = u && t.Uint8Array && function () {
                try {
                    return 100 === new Blob([new Uint8Array(100)]).size
                } catch (e) {
                    return !1
                }
            }(), h = t.BlobBuilder || t.WebKitBlobBuilder || t.MozBlobBuilder || t.MSBlobBuilder, d = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, n = (u || h) && t.atob && t.ArrayBuffer && t.Uint8Array && function (e) {
                var t, r, a, i, n, o, l, s, c;
                if (!(t = e.match(d))) throw new Error("invalid data URI");
                for (r = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), a = !!t[4], i = e.slice(t[0].length), n = a ? atob(i) : decodeURIComponent(i), o = new ArrayBuffer(n.length), l = new Uint8Array(o), s = 0; s < n.length; s += 1) l[s] = n.charCodeAt(s);
                return u ? new Blob([f ? l : o], {
                    type: r
                }) : ((c = new h).append(o), c.getBlob(r))
            }, t.HTMLCanvasElement && !i.toBlob && (i.mozGetAsFile ? i.toBlob = function (e, t, r) {
                var a = this;
                setTimeout(function () {
                    r && i.toDataURL && n ? e(n(a.toDataURL(t, r))) : e(a.mozGetAsFile("blob", t))
                })
            } : i.toDataURL && n && (i.toBlob = function (e, t, r) {
                var a = this;
                setTimeout(function () {
                    e(n(a.toDataURL(t, r)))
                })
            })), e.exports ? e.exports = n : t.dataURLtoBlob = n)
        }(e = {
            exports: {}
        }, e.exports), e.exports),
        n = {
            strict: !0,
            checkOrientation: !0,
            maxWidth: 1 / 0,
            maxHeight: 1 / 0,
            minWidth: 0,
            minHeight: 0,
            width: void 0,
            height: void 0,
            quality: .8,
            mimeType: "auto",
            convertSize: 5e6,
            beforeDraw: null,
            drew: null,
            success: null,
            error: null
        },
        o = "undefined" != typeof window && void 0 !== window.document ? window : {},
        c = Array.prototype.slice;
    var r = /^image\/.+$/;

    function P(e) {
        return r.test(e)
    }
    var b = String.fromCharCode;
    var u = o.btoa;

    function f(e) {
        var t, r = new DataView(e);
        try {
            var a, i, n;
            if (255 === r.getUint8(0) && 216 === r.getUint8(1))
                for (var o = r.byteLength, l = 2; l + 1 < o;) {
                    if (255 === r.getUint8(l) && 225 === r.getUint8(l + 1)) {
                        i = l;
                        break
                    }
                    l += 1
                }
            if (i) {
                var s = i + 10;
                if ("Exif" === function (e, t, r) {
                        var a, i = "";
                        for (r += t, a = t; a < r; a += 1) i += b(e.getUint8(a));
                        return i
                    }(r, i + 4, 4)) {
                    var c = r.getUint16(s);
                    if (((a = 18761 === c) || 19789 === c) && 42 === r.getUint16(s + 2, a)) {
                        var u = r.getUint32(s + 4, a);
                        8 <= u && (n = s + u)
                    }
                }
            }
            if (n) {
                var f, h, d = r.getUint16(n, a);
                for (h = 0; h < d; h += 1)
                    if (f = n + 12 * h + 2, 274 === r.getUint16(f, a)) {
                        f += 8, t = r.getUint16(f, a), r.setUint16(f, 1, a);
                        break
                    }
            }
        } catch (e) {
            t = 1
        }
        return t
    }
    var l = /\.\d*(?:0|9){12}\d*$/;

    function C(e, t) {
        var r = 1 < arguments.length && void 0 !== t ? t : 1e11;
        return l.test(e) ? Math.round(e * r) / r : e
    }
    var h = o.ArrayBuffer,
        d = o.FileReader,
        m = o.URL || o.webkitURL,
        p = /\.\w+$/,
        g = o.Compressor;
    return function () {
        function r(e, t) {
            ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, r), this.file = e, this.image = new Image, this.options = i({}, n, {}, t), this.aborted = !1, this.result = null, this.init()
        }
        return function (e, t, r) {
            t && a(e.prototype, t), r && a(e, r)
        }(r, [{
            key: "init",
            value: function () {
                var i = this,
                    n = this.file,
                    e = this.options;
                if (function (e) {
                        return "undefined" != typeof Blob && (e instanceof Blob || "[object Blob]" === Object.prototype.toString.call(e))
                    }(n)) {
                    var o = n.type;
                    if (P(o))
                        if (m && d)
                            if (h || (e.checkOrientation = !1), m && !e.checkOrientation) this.load({
                                url: m.createObjectURL(n)
                            });
                            else {
                                var t = new d,
                                    l = e.checkOrientation && "image/jpeg" === o;
                                (this.reader = t).onload = function (e) {
                                    var t = e.target.result,
                                        r = {};
                                    if (l) {
                                        var a = f(t);
                                        1 < a || !m ? (r.url = function (e, t) {
                                            for (var r, a = [], i = new Uint8Array(e); 0 < i.length;) a.push(b.apply(null, (r = i.subarray(0, 8192), Array.from ? Array.from(r) : c.call(r)))), i = i.subarray(8192);
                                            return "data:".concat(t, ";base64,").concat(u(a.join("")))
                                        }(t, o), 1 < a && s(r, function (e) {
                                            var t = 0,
                                                r = 1,
                                                a = 1;
                                            switch (e) {
                                                case 2:
                                                    r = -1;
                                                    break;
                                                case 3:
                                                    t = -180;
                                                    break;
                                                case 4:
                                                    a = -1;
                                                    break;
                                                case 5:
                                                    t = 90, a = -1;
                                                    break;
                                                case 6:
                                                    t = 90;
                                                    break;
                                                case 7:
                                                    t = 90, r = -1;
                                                    break;
                                                case 8:
                                                    t = -90
                                            }
                                            return {
                                                rotate: t,
                                                scaleX: r,
                                                scaleY: a
                                            }
                                        }(a))) : r.url = m.createObjectURL(n)
                                    } else r.url = t;
                                    i.load(r)
                                }, t.onabort = function () {
                                    i.fail(new Error("Aborted to read the image with FileReader."))
                                }, t.onerror = function () {
                                    i.fail(new Error("Failed to read the image with FileReader."))
                                }, t.onloadend = function () {
                                    i.reader = null
                                }, l ? t.readAsArrayBuffer(n) : t.readAsDataURL(n)
                            }
                    else this.fail(new Error("The current browser does not support image compression."));
                    else this.fail(new Error("The first argument must be an image File or Blob object."))
                } else this.fail(new Error("The first argument must be a File or Blob object."))
            }
        }, {
            key: "load",
            value: function (e) {
                var t = this,
                    r = this.file,
                    a = this.image;
                a.onload = function () {
                    t.draw(i({}, e, {
                        naturalWidth: a.naturalWidth,
                        naturalHeight: a.naturalHeight
                    }))
                }, a.onabort = function () {
                    t.fail(new Error("Aborted to load the image."))
                }, a.onerror = function () {
                    t.fail(new Error("Failed to load the image."))
                }, o.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(o.navigator.userAgent) && (a.crossOrigin = "anonymous"), a.alt = r.name, a.src = e.url
            }
        }, {
            key: "draw",
            value: function (e) {
                var t = this,
                    r = e.naturalWidth,
                    a = e.naturalHeight,
                    i = e.rotate,
                    n = void 0 === i ? 0 : i,
                    o = e.scaleX,
                    l = void 0 === o ? 1 : o,
                    s = e.scaleY,
                    c = void 0 === s ? 1 : s,
                    u = this.file,
                    f = this.image,
                    h = this.options,
                    d = document.createElement("canvas"),
                    b = d.getContext("2d"),
                    m = r / a,
                    p = Math.abs(n) % 180 == 90,
                    g = Math.max(h.maxWidth, 0) || 1 / 0,
                    v = Math.max(h.maxHeight, 0) || 1 / 0,
                    y = Math.max(h.minWidth, 0) || 0,
                    w = Math.max(h.minHeight, 0) || 0,
                    O = Math.max(h.width, 0) || r,
                    U = Math.max(h.height, 0) || a;
                if (p) {
                    var B = [v, g];
                    g = B[0], v = B[1];
                    var j = [w, y];
                    y = j[0], w = j[1];
                    var k = [U, O];
                    O = k[0], U = k[1]
                }
                g < 1 / 0 && v < 1 / 0 ? g < v * m ? v = g / m : g = v * m : g < 1 / 0 ? v = g / m : v < 1 / 0 && (g = v * m), 0 < y && 0 < w ? y < w * m ? w = y / m : y = w * m : 0 < y ? w = y / m : 0 < w && (y = w * m), O < U * m ? U = O / m : O = U * m;
                var x = -(O = Math.floor(C(Math.min(Math.max(O, y), g)))) / 2,
                    A = -(U = Math.floor(C(Math.min(Math.max(U, w), v)))) / 2,
                    M = O,
                    T = U;
                if (p) {
                    var R = [U, O];
                    O = R[0], U = R[1]
                }
                d.width = O, d.height = U, P(h.mimeType) || (h.mimeType = u.type);
                var D = "transparent";
                if (u.size > h.convertSize && "image/png" === h.mimeType && (D = "#fff", h.mimeType = "image/jpeg"), b.fillStyle = D, b.fillRect(0, 0, O, U), h.beforeDraw && h.beforeDraw.call(this, b, d), !this.aborted && (b.save(), b.translate(O / 2, U / 2), b.rotate(n * Math.PI / 180), b.scale(l, c), b.drawImage(f, x, A, M, T), b.restore(), h.drew && h.drew.call(this, b, d), !this.aborted)) {
                    var E = function (e) {
                        t.aborted || t.done({
                            naturalWidth: r,
                            naturalHeight: a,
                            result: e
                        })
                    };
                    d.toBlob ? d.toBlob(E, h.mimeType, h.quality) : E(L(d.toDataURL(h.mimeType, h.quality)))
                }
            }
        }, {
            key: "done",
            value: function (e) {
                var t = e.naturalWidth,
                    r = e.naturalHeight,
                    a = e.result,
                    i = this.file,
                    n = this.image,
                    o = this.options;
                if (m && !o.checkOrientation && m.revokeObjectURL(n.src), a)
                    if (o.strict && a.size > i.size && o.mimeType === i.type && !(o.width > t || o.height > r || o.minWidth > t || o.minHeight > r)) a = i;
                    else {
                        var l = new Date;
                        a.lastModified = l.getTime(), a.lastModifiedDate = l, a.name = i.name, a.name && a.type !== i.type && (a.name = a.name.replace(p, function (e) {
                            var t = P(e) ? e.substr(6) : "";
                            return "jpeg" === t && (t = "jpg"), ".".concat(t)
                        }(a.type)))
                    }
                else a = i;
                this.result = a, o.success && o.success.call(this, a)
            }
        }, {
            key: "fail",
            value: function (e) {
                var t = this.options;
                if (!t.error) throw e;
                t.error.call(this, e)
            }
        }, {
            key: "abort",
            value: function () {
                this.aborted || (this.aborted = !0, this.reader ? this.reader.abort() : this.image.complete ? this.fail(new Error("The compression process has been aborted.")) : (this.image.onload = null, this.image.onabort()))
            }
        }], [{
            key: "noConflict",
            value: function () {
                return window.Compressor = g, r
            }
        }, {
            key: "setDefaults",
            value: function (e) {
                s(n, e)
            }
        }]), r
    }()
});