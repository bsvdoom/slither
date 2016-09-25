function a(t, e) {
    var i = function() {
        function t(t) {
            return r.appendChild(t.dom),
            t
        }
        function e(t) {
            for (var e = 0; e < r.children.length; e++) r.children[e].style.display = e === t ? "block": "none";
            n = t
        }
        var n = 0,
        r = document.createElement("div");
        r.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",
        r.addEventListener("click",
        function(t) {
            t.preventDefault(),
            e(++n % r.children.length)
        },
        !1);
        var a = (performance || Date).now(),
        o = a,
        s = 0,
        h = t(new i.Panel("FPS", "#0ff", "#002")),
        l = t(new i.Panel("MS", "#0f0", "#020"));
        if (self.performance && self.performance.memory) var u = t(new i.Panel("MB", "#f08", "#201"));
        return e(0),
        {
            REVISION: 16,
            dom: r,
            addPanel: t,
            showPanel: e,
            begin: function() {
                a = (performance || Date).now()
            },
            end: function() {
                s++;
                var t = (performance || Date).now();
                if (l.update(t - a, 200), t > o + 1e3 && (h.update(1e3 * s / (t - o), 100), o = t, s = 0, u)) {
                    var e = performance.memory;
                    u.update(e.usedJSHeapSize / 1048576, e.jsHeapSizeLimit / 1048576)
                }
                return t
            },
            update: function() {
                a = this.end()
            },
            domElement: r,
            setMode: e
        }
    };
    i.Panel = function(t, e, i) {
        var n = 1 / 0,
        r = 0,
        a = Math.round,
        o = a(window.devicePixelRatio || 1),
        s = 80 * o,
        h = 48 * o,
        l = 3 * o,
        u = 2 * o,
        c = 3 * o,
        f = 15 * o,
        d = 74 * o,
        p = 30 * o,
        y = document.createElement("canvas");
        y.width = s,
        y.height = h,
        y.style.cssText = "width:80px;height:48px";
        var v = y.getContext("2d");
        return v.font = "bold " + 9 * o + "px Helvetica,Arial,sans-serif",
        v.textBaseline = "top",
        v.fillStyle = i,
        v.fillRect(0, 0, s, h),
        v.fillStyle = e,
        v.fillText(t, l, u),
        v.fillRect(c, f, d, p),
        v.fillStyle = i,
        v.globalAlpha = .9,
        v.fillRect(c, f, d, p),
        {
            dom: y,
            update: function(h, g) {
                n = Math.min(n, h),
                r = Math.max(r, h),
                v.fillStyle = i,
                v.globalAlpha = 1,
                v.fillRect(0, 0, s, f),
                v.fillStyle = e,
                v.fillText(a(h) + " " + t + " (" + a(n) + "-" + a(r) + ")", l, u),
                v.drawImage(y, c + o, f, d - o, p, c, f, d - o, p),
                v.fillRect(c + d - o, f, o, p),
                v.fillStyle = i,
                v.globalAlpha = .9,
                v.fillRect(c + d - o, f, o, a((1 - h / g) * p))
            }
        }
    },
    "object" == typeof t && (t.exports = i)
    return i
}

export default a()