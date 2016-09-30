/**
 * Created by wanghx on 5/3/16.
 *
 * Snake
 *
 */

import map from '../map';
import SnakeBody from './SnakeBody';
import SnakeHeader from './SnakeHeader';
import { SPEED } from '../constant';

// 蛇的图片管理模块, 提供可复用的蛇镜像
const snakeImgStore = {
  store: {},

  // 获取图片
  getImage(kind, ...args) {
    const key = args.concat(kind).join('_');

    if (this.store.hasOwnProperty(key)) {
      return this.store[key];
    }

    this.store[key] = (kind === 0)
      ? this.createBodyImg.apply(this, args)
      : this.createHeaderImg.apply(this, args);

    return this.store[key];
  },

  // 创建身躯图片
  createBodyImg(width, height, fillColor, strokeColor) {
    const img = document.createElement('canvas');
    const ctx = img.getContext('2d');

    img.width = width + 4;
    img.height = height + 4;

    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(img.width / 2, img.height / 2, width / 2, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.fill();

    return img;
  },

  // 创建头部图片
  createHeaderImg(width, height, fillColor, strokeColor) {
    const img = this.createBodyImg(width, height, fillColor, strokeColor);
    const ctx = img.getContext('2d');
    const eyeRadius = width * 0.2;

    function drawEye(eyeX, eyeY) {
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = strokeColor;
      ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = '#000';
      ctx.arc(eyeX + eyeRadius / 2, eyeY, eyeRadius / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 画左眼
    drawEye(
      img.width / 2 + width / 2 - eyeRadius,
      img.height / 2 - height / 2 + eyeRadius
    );

    // 画右眼
    drawEye(
      img.width / 2 + width / 2 - eyeRadius,
      img.height / 2 + height / 2 - eyeRadius
    );

    return img;
  }
};

// 蛇类
export default class Snake {
  constructor(options) {
    // console.log(options)

    const imgWidth = 60;
    const imgHeight = 60;
    const fillColor = options.fillColor || '#fff';
    const strokeColor = options.strokeColor || '#000';

    this.bodys = [];  
    this.point = 0;


    // 是否为机器人
    this.robot = options.robot;

    // 蛇身图层
    this.bodyImage = snakeImgStore.getImage(0, imgWidth, imgHeight, fillColor, strokeColor);

    // 蛇头图层
    this.headerImage = snakeImgStore.getImage(1, imgWidth, imgHeight, fillColor, strokeColor);

    // 初始化
    this.init(options);
  }

  get x() {
    return this.header.x;
  }

  get y() {
    return this.header.y;
  }

  /**
   * 初始化蛇实例
   * @param options
   */
  init(options) {
    // console.log(options)
    // 创建脑袋
    let header = new SnakeHeader(Object.assign(options, {
      img: this.headerImage
    }));

    if(options.header){
      options.header.__proto__ = header.__proto__
      this.header = options.header
    }else{
      this.header = header
    }
    console.log(this.header)

    // 创建身躯, 给予各个身躯跟踪目标
    for (let i = 0; i < options.length; i++) {
      this.bodys.push(new SnakeBody(Object.assign(options, {
        tracer: this.bodys[i - 1] || this.header,
        img: this.bodyImage
      })));
    }

    if (!this.robot) {
      // 事件绑定
      this.binding();
    }
  }

  /**
   * 蛇与鼠标的交互事件
   */
  binding() {
    const self = this;

    // 鼠标/手指 跟蛇运动的交互事件绑定
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
      window.addEventListener('touchmove', e => {
        e.preventDefault();
        self.moveTo(e.touches[0].pageX, e.touches[0].pageY);
      });

      window.addEventListener('touchstart', e => {
        e.preventDefault();
        self.moveTo(e.touches[0].pageX, e.touches[0].pageY);
      });
    } else {
      // 蛇头跟随鼠标的移动而变更移动方向
      window.addEventListener('mousemove', (e = window.event) =>
        self.moveTo(e.clientX, e.clientY)
      );

      // 鼠标按下让蛇加速
      window.addEventListener('mousedown', self.speedUp.bind(self));

      // 鼠标抬起停止加速
      window.addEventListener('mouseup', self.speedDown.bind(self));
    }
  }

  /**
   * 加速
   */
  speedUp() {
    this.header.speed = 5;
    this.bodys.forEach(body => {
      body.speed = 5;
    });
  }

  /**
   * 恢复原速度
   */
  speedDown() {
    this.header.speed = SPEED;
    this.bodys.forEach(body => {
      body.speed = SPEED;
    });
  }

  /**
   * 根据传入坐标, 获取坐标点相对于蛇的角度
   * @param nx
   * @param ny
   */
  moveTo(nx, ny) {
    const x = nx - this.header.paintX;
    const y = this.header.paintY - ny;
    let angle = Math.atan(Math.abs(x / y));

    // 计算角度, 角度值为 0-360
    if (x > 0 && y < 0) {
      angle = Math.PI - angle;
    } else if (x < 0 && y < 0) {
      angle = Math.PI + angle;
    } else if (x < 0 && y > 0) {
      angle = Math.PI * 2 - angle;
    }

    this.header.directTo(angle);
  }

  /**
   * 吃掉食物
   * @param food
   */
  eat(food) {
    this.foodNum = this.foodNum || 0;
    this.point += food.point;
    this.foodNum++;

    // 增加分数引起虫子体积增大
    const added = food.point / 100;
    this.header.setSize(this.header.width + added);
    this.bodys.forEach(body => { body.setSize(body.width + added); });

    // 每吃两个个食物, 都增加一截身躯
    if (this.foodNum % 2 === 0) {
      const lastBody = this.bodys[this.bodys.length - 1];
      this.bodys.push(new SnakeBody({
        x: lastBody.x,
        y: lastBody.y,
        size: lastBody.width,
        tracer: lastBody,
        img: this.bodyImage
      }));
    }

    return added;
  }

  // 渲染蛇头蛇身
  render() {
    // 不让蛇走出边界, 也就是蛇头
    const whalf = this.header.width / 2;
    if (this.header.x < whalf) {
      this.header.x = whalf;
    } else if (this.header.x + whalf > map.width) {
      this.header.x = map.width - whalf;
    }

    const hhalf = this.header.height / 2;
    if (this.header.y < hhalf) {
      this.header.y = hhalf;
    } else if (this.header.y + hhalf > map.height) {
      this.header.y = map.height - hhalf;
    }

    // 渲染蛇头蛇身
    for (let i = this.bodys.length - 1; i >= 0; i--) {
      this.bodys[i].render();
    }

    this.header.render();
  }
}