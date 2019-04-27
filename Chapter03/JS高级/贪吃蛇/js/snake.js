// 蛇构造函数
function Snake() {
  // 蛇移动的方向
  this.direction = 'right';
  // 一组蛇节数据
  this.bodys = [
    { x: 3, y: 0, className: 'snake snake-head' },
    { x: 2, y: 0, className: 'snake snake-body' },
    { x: 1, y: 0, className: 'snake snake-body' },
  ]
}

// 根据一组蛇节绘制蛇
Snake.prototype.drawSnake = function () {
  // 循环遍历诗句生成蛇
  for (var i = 0; i < this.bodys.length; i++) {
    $('<div></div>')
      .appendTo('.map')
      .addClass(this.bodys[i].className)
      .css({ left: this.bodys[i].x * 20, top: this.bodys[i].y * 20 });
  }
}

// 蛇移动
Snake.prototype.move = function () {
  // 从蛇尾遍历，后一节设置到前一节位置，蛇头不变
  for (var i = this.bodys.length - 1; i > 0; i--) {
    this.bodys[i].x = this.bodys[i - 1].x;
    this.bodys[i].y = this.bodys[i - 1].y;
  }
  // 根据方向更改蛇头
  var head = this.bodys[0];
  if (this.direction == 'right') {
    head.x += 1;
  } else if (this.direction == 'left') {
    head.x -= 1;

  } else if (this.direction == 'top') {
    head.y -= 1;

  } else if (this.direction == 'bottom') {
    head.y += 1;

  }
  // 先清除旧的的蛇
  $('.snake').remove();
  // 重新绘制蛇
  this.drawSnake();


}

// 蛇是否死亡
Snake.prototype.isDead = function () {
  var head = this.bodys[0];
  if (head.x < 0 || head.y < 0 || head.x >= $('.map').width() / 20 || head.y >= $('.map').height() / 20) {
    return true;
  } else {
    return false;
  }
}

// 蛇吃食物
Snake.prototype.eat = function (food) {
  var head = this.bodys[0];
  if (head.x*20 == food.x && head.y*20 == food.y) {
    // 取出最后一节
    var last = this.bodys[this.bodys.length - 1];
    // 再给蛇加上一节
    this.bodys.push({ className: 'snake snake-body' });
    food.randomLocation();
    return true;
  } else {
    return false;
  }
};
 