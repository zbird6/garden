<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { PongGame } from './game'

const canvasRef = ref(null)
const scores = ref({ player: 0, ai: 0 })
let game = null

const handleKeyDown = (event) => {
  const speed = 20

  if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
    event.preventDefault()
    game?.movePlayer(-speed)
  } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
    event.preventDefault()
    game?.movePlayer(speed)
  }
}

const startGame = () => {
  game?.start()
}

const pauseGame = () => {
  game?.pause()
}

const resetGame = () => {
  game?.reset()
}

const handleScoreUpdate = (newScores) => {
  scores.value = newScores
}

const handleGameOver = () => {
  // 游戏结束处理
}

onMounted(() => {
  if (canvasRef.value) {
    game = new PongGame(canvasRef.value, {
      onScoreUpdate: handleScoreUpdate,
      onGameOver: handleGameOver,
    })

    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  game?.pause()
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="game-container">
    <div class="game-header">
      <div class="score-display">
        <span class="label">玩家:</span>
        <span class="value">{{ scores.player }}</span>
      </div>
      <div class="score-display">
        <span class="label">AI:</span>
        <span class="value">{{ scores.ai }}</span>
      </div>
      <div class="game-controls">
        <button class="btn-primary" @click="startGame">开始游戏</button>
        <button class="btn-secondary" @click="pauseGame">暂停</button>
        <button class="btn-secondary" @click="resetGame">重新开始</button>
      </div>
    </div>

    <div class="game-canvas">
      <canvas ref="canvasRef"></canvas>
    </div>

    <div class="game-info">
      <h3>游戏说明</h3>
      <ul>
        <li>使用上/下方向键或 W/S 键控制左侧挡板</li>
        <li>将球打过去，让 AI 漏接得分</li>
        <li>先获得 5 分的一方获胜</li>
        <li>随着游戏进行，球的速度会逐渐加快</li>
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

.score-display {
  font-size: 1.25rem;
  font-weight: 600;
}

.score-display .label {
  color: #6b7280;
  font-weight: 400;
}

.score-display .value {
  color: #0ea5e9;
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

.game-controls button.btn-primary {
  background: #0ea5e9;
  color: white;
}

.game-controls button.btn-primary:hover {
  background: #0284c7;
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
}

.game-canvas canvas {
  display: block;
  margin: 0 auto;
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
}

.game-info ul {
  margin: 0;
  padding-left: 1.5rem;
}

.game-info li {
  margin-bottom: 0.25rem;
}
</style>
