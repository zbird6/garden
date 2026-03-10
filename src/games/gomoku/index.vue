<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { GomokuGame } from './game'

const game = ref(null)
const board = ref([])
const currentPlayer = ref(1)
const gameOver = ref(false)
const winner = ref(null)
const message = ref('轮到黑棋下棋')

const handleCellClick = (row, col) => {
  if (gameOver.value || board.value[row][col] !== 0) {
    return
  }

  game.value.makeMove(row, col)

  if (!gameOver.value && currentPlayer.value === 2) {
    message.value = 'AI 思考中...'
    setTimeout(() => {
      game.value.aiMove()
    }, 500)
  }
}

const handleMove = (row, col, player) => {
  board.value[row][col] = player
  currentPlayer.value = player === 1 ? 2 : 1
  message.value = currentPlayer.value === 1 ? '轮到黑棋下棋' : '轮到白棋下棋'
}

const handleGameOver = (winnerValue) => {
  gameOver.value = true
  winner.value = winnerValue
  if (winnerValue === 1) {
    message.value = '黑棋获胜！'
  } else if (winnerValue === 2) {
    message.value = '白棋获胜！'
  } else {
    message.value = '平局！'
  }
}

const resetGame = () => {
  game.value.reset()
  board.value = Array(15).fill(0).map(() => Array(15).fill(0))
  currentPlayer.value = 1
  gameOver.value = false
  winner.value = null
  message.value = '轮到黑棋下棋'
}

onMounted(() => {
  board.value = Array(15).fill(0).map(() => Array(15).fill(0))
  game.value = new GomokuGame(15, handleMove, handleGameOver)
})
</script>

<template>
  <div class="game-container">
    <div class="game-header">
      <div class="player-info">
        <div class="message">{{ message }}</div>
        <div class="player-indicator">
          <div class="player black" :class="{ active: currentPlayer === 1 }"></div>
          <div class="player white" :class="{ active: currentPlayer === 2 }"></div>
        </div>
      </div>
      <div class="game-controls">
        <button class="btn-secondary" @click="resetGame">重新开始</button>
      </div>
    </div>

    <div class="game-canvas">
      <div class="board-grid">
        <div 
          v-for="(row, rowIndex) in board" 
          :key="rowIndex" 
          class="board-row"
        >
          <div 
            v-for="(cell, colIndex) in row" 
            :key="colIndex" 
            class="board-cell"
            :class="{
              'black': cell === 1,
              'white': cell === 2
            }"
            @click="handleCellClick(rowIndex, colIndex)"
          ></div>
        </div>
      </div>
      <div v-if="gameOver" class="game-over-overlay">
        <div class="game-over-content">
          <h2>{{ winner === 1 ? '黑棋获胜！' : winner === 2 ? '白棋获胜！' : '平局！' }}</h2>
          <button @click="resetGame">再来一局</button>
        </div>
      </div>
    </div>

    <div class="game-info">
      <h3>游戏说明</h3>
      <ul>
        <li>黑棋先行，白棋后行</li>
        <li>点击棋盘落子</li>
        <li>连成五子即可获胜</li>
        <li>与 AI 对战，挑战你的棋艺</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.player-info {
  display: flex;
  flex-direction: column;
}

.message {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.player-indicator {
  display: flex;
  gap: 1rem;
}

.player {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  transition: all 0.2s;
}

.player.black {
  background: #111827;
}

.player.white {
  background: #ffffff;
  border-color: #374151;
}

.player.active {
  transform: scale(1.2);
  box-shadow: 0 0 0 2px #0ea5e9;
}

.game-controls {
  display: flex;
  gap: 0.5rem;
}

.game-controls button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.game-controls button.btn-secondary {
  background: #e5e7eb;
  color: #1f2937;
}

.game-controls button.btn-secondary:hover {
  background: #d1d5db;
}

.game-canvas {
  background: white;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 1rem;
}

.board-grid {
  display: inline-block;
  background: #e6c77b;
  border: 2px solid #8b5a2b;
  border-radius: 0.25rem;
  padding: 10px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.board-row {
  display: flex;
}

.board-cell {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(139, 90, 43, 0.3);
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}

.board-cell:hover {
  background: rgba(255, 255, 255, 0.2);
}

.board-cell.black::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #111827;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.board-cell.white::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #e5e7eb;
}

.game-info {
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.game-info h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  color: #1f2937;
}

.game-info ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #4b5563;
}

.game-info li {
  margin-bottom: 0.25rem;
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0.5rem;
}

.game-over-content {
  text-align: center;
  color: white;
}

.game-over-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.game-over-content button {
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
  border: none;
  border-radius: 0.5rem;
  background: #0ea5e9;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.game-over-content button:hover {
  background: #0284c7;
}

@media (max-width: 640px) {
  .game-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .game-controls {
    align-self: flex-end;
  }
  
  .board-cell {
    width: 24px;
    height: 24px;
  }
  
  .board-cell.black::after,
  .board-cell.white::after {
    width: 18px;
    height: 18px;
  }
}
</style>