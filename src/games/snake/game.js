/**
 * 贪吃蛇游戏逻辑
 */
export class SnakeGame {
  constructor(canvas, config = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.gridSize = config.gridSize || 20
    this.gameSpeed = config.gameSpeed || 150

    // 游戏状态
    this.snake = []
    this.food = {}
    this.direction = 'right'
    this.nextDirection = 'right'
    this.score = 0
    this.isPlaying = false
    this.isGameOver = false
    this.gameLoop = null

    // 回调函数
    this.onScoreUpdate = config.onScoreUpdate || (() => {})
    this.onGameOver = config.onGameOver || (() => {})

    this.init()
  }

  init() {
    // 初始化画布大小
    this.canvas.width = 400
    this.canvas.height = 400

    // 初始化蛇
    const startX = Math.floor(this.canvas.width / this.gridSize / 2)
    const startY = Math.floor(this.canvas.height / this.gridSize / 2)
    this.snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ]

    // 生成食物
    this.generateFood()

    // 绘制初始状态
    this.draw()
  }

  start() {
    if (this.isPlaying) return
    this.isPlaying = true
    this.isGameOver = false
    this.gameLoop = setInterval(() => this.update(), this.gameSpeed)
  }

  pause() {
    if (!this.isPlaying) return
    this.isPlaying = false
    clearInterval(this.gameLoop)
  }

  reset() {
    this.pause()
    this.score = 0
    this.direction = 'right'
    this.nextDirection = 'right'
    this.isGameOver = false
    this.init()
    this.onScoreUpdate(0)
  }

  update() {
    if (this.isGameOver) {
      this.pause()
      return
    }

    // 更新方向
    this.direction = this.nextDirection

    // 计算新蛇头位置
    const head = { ...this.snake[0] }

    switch (this.direction) {
      case 'up':
        head.y -= 1
        break
      case 'down':
        head.y += 1
        break
      case 'left':
        head.x -= 1
        break
      case 'right':
        head.x += 1
        break
    }

    // 检查碰撞
    if (this.checkCollision(head)) {
      this.gameOver()
      return
    }

    // 移动蛇
    this.snake.unshift(head)

    // 检查是否吃到食物
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10
      this.onScoreUpdate(this.score)
      this.generateFood()
    } else {
      this.snake.pop()
    }

    this.draw()
  }

  checkCollision(head) {
    // 检查墙壁碰撞
    if (
      head.x < 0 ||
      head.x >= this.canvas.width / this.gridSize ||
      head.y < 0 ||
      head.y >= this.canvas.height / this.gridSize
    ) {
      return true
    }

    // 检查自身碰撞
    return this.snake.some((segment) => segment.x === head.x && segment.y === head.y)
  }

  generateFood() {
    const maxX = Math.floor(this.canvas.width / this.gridSize)
    const maxY = Math.floor(this.canvas.height / this.gridSize)

    do {
      this.food = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
      }
    } while (this.snake.some((segment) => segment.x === this.food.x && segment.y === this.food.y))
  }

  draw() {
    // 清空画布
    this.ctx.fillStyle = '#f9fafb'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // 绘制网格
    this.drawGrid()

    // 绘制食物
    this.drawFood()

    // 绘制蛇
    this.drawSnake()
  }

  drawGrid() {
    this.ctx.strokeStyle = '#e5e7eb'
    this.ctx.lineWidth = 0.5

    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.canvas.height)
      this.ctx.stroke()
    }

    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.canvas.width, y)
      this.ctx.stroke()
    }
  }

  drawSnake() {
    this.snake.forEach((segment, index) => {
      this.ctx.fillStyle = index === 0 ? '#0ea5e9' : '#38bdf8'
      this.ctx.fillRect(
        segment.x * this.gridSize + 1,
        segment.y * this.gridSize + 1,
        this.gridSize - 2,
        this.gridSize - 2
      )

      // 绘制蛇头眼睛
      if (index === 0) {
        this.ctx.fillStyle = 'white'
        const eyeOffset = 4
        const eyeSize = 3

        if (this.direction === 'right') {
          this.ctx.fillRect(
            segment.x * this.gridSize + this.gridSize - eyeOffset - eyeSize,
            segment.y * this.gridSize + eyeOffset,
            eyeSize,
            eyeSize
          )
          this.ctx.fillRect(
            segment.x * this.gridSize + this.gridSize - eyeOffset - eyeSize,
            segment.y * this.gridSize + this.gridSize - eyeOffset - eyeSize - eyeSize,
            eyeSize,
            eyeSize
          )
        } else if (this.direction === 'left') {
          this.ctx.fillRect(
            segment.x * this.gridSize + eyeOffset,
            segment.y * this.gridSize + eyeOffset,
            eyeSize,
            eyeSize
          )
          this.ctx.fillRect(
            segment.x * this.gridSize + eyeOffset,
            segment.y * this.gridSize + this.gridSize - eyeOffset - eyeSize - eyeSize,
            eyeSize,
            eyeSize
          )
        } else if (this.direction === 'up') {
          this.ctx.fillRect(
            segment.x * this.gridSize + eyeOffset,
            segment.y * this.gridSize + eyeOffset,
            eyeSize,
            eyeSize
          )
          this.ctx.fillRect(
            segment.x * this.gridSize + this.gridSize - eyeOffset - eyeSize,
            segment.y * this.gridSize + eyeOffset,
            eyeSize,
            eyeSize
          )
        } else {
          this.ctx.fillRect(
            segment.x * this.gridSize + eyeOffset,
            segment.y * this.gridSize + this.gridSize - eyeOffset - eyeSize - eyeSize,
            eyeSize,
            eyeSize
          )
          this.ctx.fillRect(
            segment.x * this.gridSize + this.gridSize - eyeOffset - eyeSize,
            segment.y * this.gridSize + this.gridSize - eyeOffset - eyeSize - eyeSize,
            eyeSize,
            eyeSize
          )
        }
      }
    })
  }

  drawFood() {
    this.ctx.fillStyle = '#ef4444'
    this.ctx.beginPath()
    this.ctx.arc(
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2,
      this.gridSize / 2 - 2,
      0,
      Math.PI * 2
    )
    this.ctx.fill()

    // 绘制高光
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    this.ctx.beginPath()
    this.ctx.arc(
      this.food.x * this.gridSize + this.gridSize / 2 - 3,
      this.food.y * this.gridSize + this.gridSize / 2 - 3,
      3,
      0,
      Math.PI * 2
    )
    this.ctx.fill()
  }

  gameOver() {
    this.isGameOver = true
    this.onGameOver()
  }

  changeDirection(newDirection) {
    const opposites = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left',
    }

    if (opposites[newDirection] !== this.direction) {
      this.nextDirection = newDirection
    }
  }
}
