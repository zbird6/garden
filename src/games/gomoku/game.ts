export class GomokuGame {
  private board: number[][]
  private currentPlayer: number
  private gameOver: boolean
  private winner: number | null
  private onMove: (row: number, col: number, player: number) => void
  private onGameOver: (winner: number | null) => void

  constructor(
    private size: number = 15,
    onMove: (row: number, col: number, player: number) => void,
    onGameOver: (winner: number | null) => void
  ) {
    this.board = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0))
    this.currentPlayer = 1 // 1 for black, 2 for white
    this.gameOver = false
    this.winner = null
    this.onMove = onMove
    this.onGameOver = onGameOver
  }

  getBoard(): number[][] {
    return [...this.board.map((row) => [...row])]
  }

  getCurrentPlayer(): number {
    return this.currentPlayer
  }

  getGameOver(): boolean {
    return this.gameOver
  }

  getWinner(): number | null {
    return this.winner
  }

  makeMove(row: number, col: number): boolean {
    if (this.gameOver || this.board[row][col] !== 0) {
      return false
    }

    this.board[row][col] = this.currentPlayer
    this.onMove(row, col, this.currentPlayer)

    if (this.checkWin(row, col)) {
      this.gameOver = true
      this.winner = this.currentPlayer
      this.onGameOver(this.winner)
    } else if (this.checkDraw()) {
      this.gameOver = true
      this.winner = null
      this.onGameOver(null)
    } else {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
    }

    return true
  }

  private checkWin(row: number, col: number): boolean {
    const directions = [
      [0, 1], // 水平
      [1, 0], // 垂直
      [1, 1], // 对角线
      [1, -1], // 反对角线
    ]

    for (const [dr, dc] of directions) {
      let count = 1

      // 向一个方向检查
      for (let i = 1; i < 5; i++) {
        const r = row + dr * i
        const c = col + dc * i
        if (
          r >= 0 &&
          r < this.size &&
          c >= 0 &&
          c < this.size &&
          this.board[r][c] === this.currentPlayer
        ) {
          count++
        } else {
          break
        }
      }

      // 向相反方向检查
      for (let i = 1; i < 5; i++) {
        const r = row - dr * i
        const c = col - dc * i
        if (
          r >= 0 &&
          r < this.size &&
          c >= 0 &&
          c < this.size &&
          this.board[r][c] === this.currentPlayer
        ) {
          count++
        } else {
          break
        }
      }

      if (count >= 5) {
        return true
      }
    }

    return false
  }

  private checkDraw(): boolean {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col] === 0) {
          return false
        }
      }
    }
    return true
  }

  reset(): void {
    this.board = Array(this.size)
      .fill(0)
      .map(() => Array(this.size).fill(0))
    this.currentPlayer = 1
    this.gameOver = false
    this.winner = null
  }

  // 简单的 AI 逻辑
  aiMove(): void {
    if (this.gameOver || this.currentPlayer !== 2) {
      return
    }

    // 优先进攻
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col] === 0) {
          this.board[row][col] = 2
          if (this.checkWin(row, col)) {
            this.onMove(row, col, 2)
            this.gameOver = true
            this.winner = 2
            this.onGameOver(2)
            return
          }
          this.board[row][col] = 0
        }
      }
    }

    // 其次防守
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col] === 0) {
          this.board[row][col] = 1
          if (this.checkWin(row, col)) {
            this.board[row][col] = 2
            this.onMove(row, col, 2)

            if (this.checkWin(row, col)) {
              this.gameOver = true
              this.winner = 2
              this.onGameOver(2)
            } else if (this.checkDraw()) {
              this.gameOver = true
              this.winner = null
              this.onGameOver(null)
            } else {
              this.currentPlayer = 1
            }
            return
          }
          this.board[row][col] = 0
        }
      }
    }

    // 随机落子
    const emptyCells = []
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col] === 0) {
          emptyCells.push({ row, col })
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length)
      const { row, col } = emptyCells[randomIndex]
      this.makeMove(row, col)
    }
  }
}
