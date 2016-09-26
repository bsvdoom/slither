/**
 * Created by wanghx on 4/23/16.
 *
 * main
 *
 */
var l = console.log.bind(console)


import Stats from './stats.js';
import Snake from './elements/Snake';
import Food from './elements/Food';
import frame from './frame';
import map from './map';

const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const canvas = document.getElementById('cas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// fps状态
const stats = new Stats();

document.body.appendChild(stats.dom);

// 初始化地图对象
map.init({
  canvas,
  width: 10000,
  height: 10000,
});

// 初始化视窗对象
frame.init({
  x: 1000,
  y: 1000,
  width: canvas.width,
  height: canvas.height
});


// 创建蛇类对象
const snake = new Snake({
  x: frame.x + frame.width / 2,
  y: frame.y + frame.height / 2,
  size: 40,
  length: 10
});

socket.emit('born', frame)

// 食物生成方法
const foodsNum = 1000;
const foods = [];
function createFood(num) {
  for (let i = 0; i < num; i++) {
    const point = ~~(Math.random() * 30 + 50);
    const size = ~~(point / 3);

    foods.push(new Food({
      x: ~~(Math.random() * (map.width - 2 * size) + size),
      y: ~~(Math.random() * (map.height - 2 * size) + size),
      size, point
    }));
  }
}

// 生成机器蛇
const robotsNum = 0;
const robots = [];
function createRobots(num) {
  for (let i = 0; i < num; i++) {
    const size = 40;

    robots.push(new Snake({
      x: ~~(Math.random() * (map.width - 2 * size) + size),
      y: ~~(Math.random() * (map.height - 2 * size) + size),
      size,
      length: 10,
      fillColor: '#ccc',
      robot: true
    }))
  }
}

/**
 * 碰撞检测
 * @param dom
 * @param dom2
 * @param isRect   是否为矩形
 */
function collision(dom, dom2, isRect) {
  const disX = dom.x - dom2.x;
  const disY = dom.y - dom2.y;

  if (isRect) {
    return Math.abs(disX) < (dom.width + dom2.width)
      && Math.abs(disY) < (dom.height + dom2.height);
  }

  return Math.hypot(disX, disY) < (dom.width + dom2.width) / 2;
}

// 创建一些食物
createFood(foodsNum);

// 创建一些机器人
createRobots(robotsNum);

// 动画逻辑
const timeout = 0;
let time = new Date();
function animate() {
  const ntime = new Date();

  stats.begin();

  if (ntime - time > timeout) {
    map.clear();

    // 让视窗跟随蛇的位置更改而更改
    frame.track(snake);

    map.render();

    // 渲染食物, 以及检测食物与蛇头的碰撞
    foods.slice(0).forEach(food => {
      food.render();

      if (food.visible && collision(snake.header, food)) {
        const added = snake.eat(food);
        foods.splice(foods.indexOf(food), 1);
        createFood(1);

        // 调整地图缩放比例, 调整缩放比例的时候会更新图层, 所以不再次更新
        map.setScale(map.scale + added / (snake.header.width * 3));

        return;
      }

//      for (let i = 0; i < robots.length; i++) {
//        const robot = robots[i];
//        if(collision(robot.header, food)) {
//          foods.splice(foods.indexOf(food), 1);
//          robot.eat(food);
//          createFood(1);
//
//          break;
//        }
//      }
    });

    for (let i = 0; i < robots.length; i++) {
      const robot = robots[i];
      if (!robot.time || !robot.nextTime || (ntime - robot.time) > robot.nextTime) {
        robot.time = new Date();
        robot.nextTime = Math.random() * 5000;
        robot.header.directTo(Math.random() * Math.PI * 2);
      }

      robot.render();
    }

    snake.render();

    map.renderSmallMap();

    map.update();

    time = ntime;
  }

  stats.end();


  // console.log(snake.bodys)
  // console.log(snake)
  socket.emit('report', snake);





  raf(animate);
}

animate();