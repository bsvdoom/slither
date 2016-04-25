/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__(1);\n\n\n/*****************\n ** WEBPACK FOOTER\n ** multi main\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("/**\n * Created by wanghx on 4/23/16.\n *\n * main\n *\n */\n'use strict';\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nvar _snake = __webpack_require__(2);\n\nvar _snake2 = _interopRequireDefault(_snake);\n\nvar _thirdStatsMin = __webpack_require__(3);\n\nvar _thirdStatsMin2 = _interopRequireDefault(_thirdStatsMin);\n\nvar sprites = [];\nvar RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {\n  window.setTimeout(callback, 1000 / 60);\n};\n\nvar canvas = document.getElementById('cas');\nvar ctx = canvas.getContext('2d');\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\n\nvar stats = new _thirdStatsMin2['default']();\nstats.setMode(0);\nstats.domElement.style.position = 'absolute';\nstats.domElement.style.right = '0px';\nstats.domElement.style.top = '0px';\ndocument.body.appendChild(stats.domElement);\n\nfunction init() {\n  var snake = new _snake2['default']({\n    ctx: ctx,\n    x: canvas.width / 2,\n    y: canvas.height / 2,\n    r: 25,\n    length: 40,\n    color: {\n      r: 255,\n      g: 255,\n      b: 255,\n      a: 1\n    }\n  });\n\n  sprites.push(snake);\n\n  window.onmousemove = function (e) {\n    e = e || window.event;\n\n    snake.moveTo(e.clientX, e.clientY);\n  };\n\n  animate();\n}\n\nvar time = new Date();\nvar timeout = 0;\nfunction animate() {\n  var ntime = new Date();\n\n  if (ntime - time > timeout) {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n    sprites.forEach(function (sprite) {\n      sprite.render();\n    });\n\n    time = ntime;\n  }\n\n  stats.update();\n\n  RAF(animate);\n}\n\ninit();\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/main.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/main.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("/**\n * Created by wanghx on 4/23/16.\n *\n * snake\n *\n */\n'use strict';\n\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar SPEED = 1.8;\n\n// 蛇头和蛇身的基类\n\nvar Base = (function () {\n  function Base(options) {\n    _classCallCheck(this, Base);\n\n    this.ctx = options.ctx;\n    this.x = options.x;\n    this.y = options.y;\n    this.r = options.r;\n\n    // 皮肤颜色\n    this.color_1 = 'rgba(' + options.color.r + ',' + options.color.g + ',' + options.color.b + ',' + (options.color.a || 1) + ')';\n    // 描边颜色\n    this.color_2 = '#000';\n\n    this.vx = 0;\n    this.vy = 0;\n    this.tox = this.x;\n    this.toy = this.y;\n\n    // 生成元素图片镜像\n    this.createImage();\n  }\n\n  // 蛇的身躯类\n\n  /**\n   * 生成图片镜像\n   */\n\n  _createClass(Base, [{\n    key: 'createImage',\n    value: function createImage() {\n      this.img = document.createElement('canvas');\n      this.img.width = this.r * 2 + 10;\n      this.img.height = this.r * 2 + 10;\n      this.imgctx = this.img.getContext('2d');\n\n      this.imgctx.lineWidth = 2;\n      this.imgctx.save();\n      this.imgctx.beginPath();\n      this.imgctx.arc(this.img.width / 2, this.img.height / 2, this.r, 0, Math.PI * 2);\n      this.imgctx.fillStyle = this.color_1;\n      this.imgctx.strokeStyle = this.color_2;\n      this.imgctx.stroke();\n      this.imgctx.fill();\n      this.imgctx.restore();\n    }\n\n    /**\n     * 给予目标点, 计算速度\n     * @param x\n     * @param y\n     */\n  }, {\n    key: 'moveTo',\n    value: function moveTo(x, y) {\n      this.tox = x;\n      this.toy = y;\n\n      var dis_x = this.tox - this.x;\n      var dis_y = this.toy - this.y;\n      var dis = Math.sqrt(dis_x * dis_x + dis_y * dis_y);\n\n      this.vy = dis_y * (SPEED / dis);\n      this.vx = dis_x * (SPEED / dis);\n    }\n\n    /**\n     * 更新位置\n     */\n  }, {\n    key: 'update',\n    value: function update() {\n      this.x += this.vx;\n      this.y += this.vy;\n    }\n\n    /**\n     * 渲染镜像图片\n     * @param nx 渲染的x位置, 可不传\n     * @param ny 渲染的y位置, 可不传\n     */\n  }, {\n    key: 'render',\n    value: function render(nx, ny) {\n      var x = nx === undefined ? this.x : nx;\n      var y = ny === undefined ? this.y : ny;\n\n      this.ctx.drawImage(this.img, x - this.img.width / 2, y - this.img.height / 2);\n    }\n  }]);\n\n  return Base;\n})();\n\nvar Body = (function (_Base) {\n  _inherits(Body, _Base);\n\n  function Body(options) {\n    _classCallCheck(this, Body);\n\n    _get(Object.getPrototypeOf(Body.prototype), 'constructor', this).call(this, options);\n\n    this.aims = [];\n  }\n\n  // 蛇头类\n\n  // 身躯跟头部的运动轨迹不同, 身躯要走完当前目标后才进入下一个目标\n\n  _createClass(Body, [{\n    key: 'moveTo',\n    value: function moveTo(x, y) {\n      this.aims.push({ x: x, y: y });\n\n      if (this.tox == this.x && this.toy == this.y) {\n        var naim = this.aims.shift();\n        _get(Object.getPrototypeOf(Body.prototype), 'moveTo', this).call(this, naim.x, naim.y);\n      }\n    }\n  }, {\n    key: 'update',\n    value: function update() {\n      _get(Object.getPrototypeOf(Body.prototype), 'update', this).call(this);\n\n      // 到达目的地设置x为目标x\n      if (Math.abs(this.tox - this.x) <= SPEED) {\n        this.x = this.tox;\n      }\n\n      // 到达目的地设置y为目标y\n      if (Math.abs(this.toy - this.y) <= SPEED) {\n        this.y = this.toy;\n      }\n    }\n  }]);\n\n  return Body;\n})(Base);\n\nvar Header = (function (_Base2) {\n  _inherits(Header, _Base2);\n\n  function Header(options) {\n    _classCallCheck(this, Header);\n\n    _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).call(this, options);\n\n    this.vx = SPEED;\n    this.aims = [];\n    this.angle = 0;\n  }\n\n  /**\n   * 蛇类\n   */\n\n  /**\n   * 添加画眼睛的功能\n   */\n\n  _createClass(Header, [{\n    key: 'createImage',\n    value: function createImage() {\n      _get(Object.getPrototypeOf(Header.prototype), 'createImage', this).call(this);\n      var self = this;\n      var eye_r = this.r * 3 / 7;\n\n      // 画左眼\n      drawEye(this.img.width / 2 + this.r - eye_r, this.img.height / 2 - this.r + eye_r);\n\n      // 画右眼\n      drawEye(this.img.width / 2 + this.r - eye_r, this.img.height / 2 + this.r - eye_r);\n\n      function drawEye(eye_x, eye_y) {\n        self.imgctx.beginPath();\n        self.imgctx.fillStyle = '#fff';\n        self.imgctx.strokeStyle = self.color_2;\n        self.imgctx.arc(eye_x, eye_y, eye_r, 0, Math.PI * 2);\n        self.imgctx.fill();\n        self.imgctx.stroke();\n\n        self.imgctx.beginPath();\n        self.imgctx.fillStyle = '#000';\n        self.imgctx.arc(eye_x + eye_r / 2, eye_y, 3, 0, Math.PI * 2);\n        self.imgctx.fill();\n      }\n    }\n\n    /**\n     * 这里不进行真正的移动, 而是计算移动位置与目前位置的补间位置, 目的是为了让蛇的转弯不那么突兀\n     */\n  }, {\n    key: 'moveTo',\n    value: function moveTo(x, y) {\n      if (!this.aims.length) return this.aims.push({ x: x, y: y });\n\n      var olderAim = this.aims[this.aims.length - 1];\n      var dis_x = x - olderAim.x;\n      var dis_y = y - olderAim.y;\n      var dis = Math.sqrt(dis_x * dis_x + dis_y * dis_y);\n\n      if (dis > 30) {\n        var part = ~ ~(dis / 30);\n        for (var i = 1; i <= part; i++) {\n\n          // 记录的目标点不超过20个\n          if (this.aims.length > 20) this.aims.shift();\n\n          this.aims.push({\n            x: olderAim.x + dis_x * i / part,\n            y: olderAim.y + dis_y * i / part\n          });\n        }\n      } else {\n        this.aims[this.aims.length - 1] = { x: x, y: y };\n      }\n    }\n  }, {\n    key: 'update',\n    value: function update() {\n      var time = new Date();\n\n      // 每隔一段时间获取一次目标位置集合中的数据, 进行移动\n      if ((!this.time || time - this.time > 50) && this.aims.length) {\n        var aim = this.aims.shift();\n\n        _get(Object.getPrototypeOf(Header.prototype), 'moveTo', this).call(this, aim.x, aim.y);\n\n        // 调整头部的方向\n        this.angle = Math.atan(this.vy / this.vx) + (this.vx < 0 ? Math.PI : 0);\n\n        this.time = time;\n      }\n\n      _get(Object.getPrototypeOf(Header.prototype), 'update', this).call(this);\n    }\n\n    /**\n     * 根据角度来绘制不同方向的蛇头\n     */\n  }, {\n    key: 'render',\n    value: function render() {\n      //绘制补间点\n      //const self = this;\n      //this.aims.forEach(function(aim){\n      //  self.ctx.fillRect(aim.x - 1, aim.y - 1, 2, 2);\n      //});\n\n      // 要旋转至相应角度\n      this.ctx.save();\n      this.ctx.translate(this.x, this.y);\n      this.ctx.rotate(this.angle);\n      _get(Object.getPrototypeOf(Header.prototype), 'render', this).call(this, 0, 0);\n      this.ctx.restore();\n    }\n  }]);\n\n  return Header;\n})(Base);\n\nvar Snake = (function () {\n  function Snake(options) {\n    _classCallCheck(this, Snake);\n\n    this.length = options.length;\n\n    // 创建脑袋\n    this.header = new Header(options);\n\n    // 创建身躯\n    this.bodys = [];\n    var body_dis = options.r * 0.6;\n    for (var i = 0; i < this.length; i++) {\n      options.x -= body_dis;\n      options.r -= 0.2;\n\n      this.bodys.push(new Body(options));\n    }\n  }\n\n  /**\n   * 蛇的移动就是头部的移动\n   */\n\n  _createClass(Snake, [{\n    key: 'moveTo',\n    value: function moveTo(x, y) {\n      this.header.moveTo(x, y);\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      // 蛇的身躯沿着蛇头的运动轨迹运动\n      for (var i = this.bodys.length - 1; i >= 0; i--) {\n        var body = this.bodys[i];\n        var front = this.bodys[i - 1] || this.header;\n\n        body.moveTo(front.x, front.y);\n\n        body.update();\n        body.render();\n      }\n\n      this.header.update();\n      this.header.render();\n    }\n  }]);\n\n  return Snake;\n})();\n\nexports['default'] = Snake;\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/snake.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/snake.js?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("// stats.js - http://github.com/mrdoob/stats.js\n\"use strict\";\n\nvar Stats = function Stats() {\n  function f(a, e, b) {\n    a = document.createElement(a);a.id = e;a.style.cssText = b;return a;\n  }function l(a, e, b) {\n    var c = f(\"div\", a, \"padding:0 0 3px 3px;text-align:left;background:\" + b),\n        d = f(\"div\", a + \"Text\", \"font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:\" + e);d.innerHTML = a.toUpperCase();c.appendChild(d);a = f(\"div\", a + \"Graph\", \"width:74px;height:30px;background:\" + e);c.appendChild(a);for (e = 0; 74 > e; e++) a.appendChild(f(\"span\", \"\", \"width:1px;height:30px;float:left;opacity:0.9;background:\" + b));return c;\n  }function m(a) {\n    for (var b = c.children, d = 0; d < b.length; d++) b[d].style.display = d === a ? \"block\" : \"none\";n = a;\n  }function p(a, b) {\n    a.appendChild(a.firstChild).style.height = Math.min(30, 30 - 30 * b) + \"px\";\n  }var q = self.performance && self.performance.now ? self.performance.now.bind(performance) : Date.now,\n      k = q(),\n      r = k,\n      t = 0,\n      n = 0,\n      c = f(\"div\", \"stats\", \"width:80px;opacity:0.9;cursor:pointer\");c.addEventListener(\"mousedown\", function (a) {\n    a.preventDefault();m(++n % c.children.length);\n  }, !1);var d = 0,\n      u = Infinity,\n      v = 0,\n      b = l(\"fps\", \"#0ff\", \"#002\"),\n      A = b.children[0],\n      B = b.children[1];c.appendChild(b);var g = 0,\n      w = Infinity,\n      x = 0,\n      b = l(\"ms\", \"#0f0\", \"#020\"),\n      C = b.children[0],\n      D = b.children[1];c.appendChild(b);if (self.performance && self.performance.memory) {\n    var h = 0,\n        y = Infinity,\n        z = 0,\n        b = l(\"mb\", \"#f08\", \"#201\"),\n        E = b.children[0],\n        F = b.children[1];c.appendChild(b);\n  }m(n);return { REVISION: 14, domElement: c, setMode: m, begin: function begin() {\n      k = q();\n    }, end: function end() {\n      var a = q();g = a - k;w = Math.min(w, g);x = Math.max(x, g);C.textContent = (g | 0) + \" MS (\" + (w | 0) + \"-\" + (x | 0) + \")\";p(D, g / 200);t++;if (a > r + 1E3 && (d = Math.round(1E3 * t / (a - r)), u = Math.min(u, d), v = Math.max(v, d), A.textContent = d + \" FPS (\" + u + \"-\" + v + \")\", p(B, d / 100), r = a, t = 0, void 0 !== h)) {\n        var b = performance.memory.usedJSHeapSize,\n            c = performance.memory.jsHeapSizeLimit;h = Math.round(9.54E-7 * b);y = Math.min(y, h);z = Math.max(z, h);E.textContent = h + \" MB (\" + y + \"-\" + z + \")\";p(F, b / c);\n      }return a;\n    }, update: function update() {\n      k = this.end();\n    } };\n};\"object\" === typeof module && (module.exports = Stats);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/third/stats.min.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/third/stats.min.js?");

/***/ }
/******/ ]);