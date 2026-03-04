/**
 * 乒乓球游戏逻辑
 */

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
}

interface Score {
  player: number
  ai: number
}

interface GameConfig {
  onScoreUpdate?: (score: Score) => void
  onGameOver?: () => void
}

export class PongGame {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  // 游戏配置
  private paddleHeight: number
  private paddleWidth: number
  private ballSize: number

  // 游戏状态
  private playerY: number
  private aiY: number
  private ball: Ball
  private playerScore: number
  private aiScore: number
  private isPlaying: boolean
  private isGameOver: boolean
  private gameLoop: number | null
  private aiSpeed: number

  // 回调函数
  private onScoreUpdate: (score: Score) => void
  private onGameOver: () => void

  constructor(canvas: HTMLCanvasElement, config: GameConfig = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!

    // 游戏配置
    this.paddleHeight = 80
    this.paddleWidth = 10
    this.ballSize = 10

    // 游戏状态
    this.playerY = 0
    this.aiY = 0
    this.ball = { x: 0, y: 0, vx: 0, vy: 0 }
    this.playerScore = 0
    this.aiScore = 0
    this.isPlaying = false
    this.isGameOver = false
    this.gameLoop = null
    this.aiSpeed = 4

    // 回调函数
    this.onScoreUpdate = config.onScoreUpdate || (() => {})
    this.onGameOver = config.onGameOver || (() => {})

    this.init()
  }

  private init(): void {
    // 初始化画布大小
    this.canvas.width = 600
    this.canvas.height = 400

    // 初始化位置
    this.playerY = this.canvas.height / 2 - this.paddleHeight / 2
    this.aiY = this.canvas.height / 2 - this.paddleHeight / 2
    this.resetBall()

    // 绘制初始状态
    this.draw()
  }

  start(): void {
    if (this.isPlaying) return
    this.isPlaying = true
    this.gameLoop = window.setInterval(() => this.update(), 16)
  }

  pause(): void {
    if (!this.isPlaying) return
    this.isPlaying = false
    if (this.gameLoop) {
      clearInterval(this.gameLoop)
    }
  }

  reset(): void {
    this.pause()
    this.playerScore = 0
    this.aiScore = 0
    this.isGameOver = false
    this.playerY = this.canvas.height / 2 - this.paddleHeight / 2
    this.aiY = this.canvas.height / 2 - this.paddleHeight / 2
    this.resetBall()
    this.onScoreUpdate({ player: 0, ai: 0 })
    this.draw()
  }

  private resetBall(): void {
    this.ball.x = this.canvas.width / 2
    this.ball.y = this.canvas.height / 2
    this.ball.vx = Math.random() > 0.5 ? 5 : -5
    this.ball.vy = Math.random() * 4 - 2
  }

  private update(): void {
    if (this.isGameOver) {
      this.pause()
      return
    }

    // 移动球
    this.ball.x += this.ball.vx
    this.ball.y += this.ball.vy

    // 上下边界碰撞
    if (this.ball.y <= 0 || this.ball.y >= this.canvas.height - this.ballSize) {
      this.ball.vy = -this.ball.vy
    }

    // 玩家挡板碰撞
    if (
      this.ball.x <= this.paddleWidth &&
      this.ball.y + this.ballSize >= this.playerY &&
      this.ball.y <= this.playerY + this.paddleHeight
    ) {
      this.ball.vx = Math.abs(this.ball.vx) + 0.5
      this.ball.vy =
        (this.ball.y + this.ballSize / 2 - (this.playerY + this.paddleHeight / 2)) * 0.3
    }

    // AI 挡板碰撞
    if (
      this.ball.x >= this.canvas.width - this.paddleWidth - this.ballSize &&
      this.ball.y + this.ballSize >= this.aiY &&
      this.ball.y <= this.aiY + this.paddleHeight
    ) {
      this.ball.vx = -(Math.abs(this.ball.vx) + 0.5)
      this.ball.vy = (this.ball.y + this.ballSize / 2 - (this.aiY + this.paddleHeight / 2)) * 0.3
    }

    // 得分判定
    if (this.ball.x < 0) {
      this.aiScore++
      this.onScoreUpdate({ player: this.playerScore, ai: this.aiScore })
      this.resetBall()
    } else if (this.ball.x > this.canvas.width) {
      this.playerScore++
      this.onScoreUpdate({ player: this.playerScore, ai: this.aiScore })
      this.resetBall()
    }

    // 游戏结束判定
    if (this.playerScore >= 5 || this.aiScore >= 5) {
      this.isGameOver = true
      this.onGameOver()
      return
    }

    // AI 移动
    this.updateAI()

    // 绘制
    this.draw()
  }

  private updateAI(): void {
    const paddleCenter = this.aiY + this.paddleHeight / 2
    const targetY = this.ball.y - this.paddleHeight / 2

    if (paddleCenter < this.ball.y - 20) {
      this.aiY += this.aiSpeed
    } else if (paddleCenter > this.ball.y + 20) {
      this.aiY -= this.aiSpeed
    }

    // 边界限制
    this.aiY = Math.max(0, Math.min(this.canvas.height - this.paddleHeight, this.aiY))
  }

  movePlayer(deltaY: number): void {
    this.playerY += deltaY
    this.playerY = Math.max(0, Math.min(this.canvas.height - this.paddleHeight, this.playerY))
  }

  private draw(): void {
    // 清空画布
    this.ctx.fillStyle = '#f9fafb'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // 绘制中线
    this.ctx.strokeStyle = '#e5e7eb'
    this.ctx.setLineDash([10, 10])
    this.ctx.beginPath()
    this.ctx.moveTo(this.canvas.width / 2, 0)
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height)
    this.ctx.stroke()
    this.ctx.setLineDash([])

    // 绘制玩家挡板
    this.ctx.fillStyle = '#0ea5e9'
    this.ctx.fillRect(0, this.playerY, this.paddleWidth, this.paddleHeight)

    // 绘制 AI 挡板
    this.ctx.fillStyle = '#ef4444'
    this.ctx.fillRect(
      this.canvas.width - this.paddleWidth,
      this.aiY,
      this.paddleWidth,
      this.paddleHeight
    )

    // 绘制球
    this.ctx.fillStyle = '#1f2937'
    this.ctx.beginPath()
    this.ctx.arc(
      this.ball.x + this.ballSize / 2,
      this.ball.y + this.ballSize / 2,
      this.ballSize / 2,
      0,
      Math.PI * 2
    )
    this.ctx.fill()

    // 绘制分数
    this.ctx.font = '48px Arial'
    this.ctx.fillStyle = '#0ea5e9'
    this.ctx.fillText(this.playerScore.toString(), 100, 60)
    this.ctx.fillStyle = '#ef4444'
    this.ctx.fillText(this.aiScore.toString(), this.canvas.width - 100, 60)
  }
}
