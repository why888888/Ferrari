// 游戏构造函数
function Game() {
  // 创建食物对象
  this.food = new Food();
  // 随机一次食物
  this.food.randomLocation();
  // 创建蛇对象
  this.snake = new Snake();
  // 绘画蛇
  this.snake.drawSnake();
  // 游戏中产生的分数
  this.score = 0;
}

// 开始游戏
var timer;
Game.prototype.start = function () {
  clearInterval(timer);
  // 把游戏对象暂存到that中
  var that = this;
  // 开启定时器
  timer = setInterval(function () {
    // 蛇不断移动
    that.snake.move();
    // 蛇是否死亡
    var isOk = that.snake.isDead();
    if (isOk) {
      $('.dead').slideDown(500);
      clearInterval(timer);
    }
    // 吃掉食物
    var isEat = that.snake.eat(that.food);
    if (isEat) {
      that.score += 100;
      $('#score').val('分数' + that.score);
    }
  }, 100);
  // 按键控制蛇移动的方向
  $(document).keydown(function (e) { 
    var key = e.keyCode;
    if (key == 37) {
      that.snake.direction = 'left';
    }else if (key == 38) {
      that.snake.direction = 'top';
    }else if (key == 39) {
      that.snake.direction = 'right';
    }else if (key == 40) {
      that.snake.direction = 'bottom';
    }
  });
}

// 停止游戏
Game.prototype.stop = function () {
  clearInterval(timer);
}

// 重新开始游戏
Game.prototype.reStart = function () {
  location.reload();
}

