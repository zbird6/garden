<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { SnakeGame } from './game'

const canvasRef = ref(null)
let game = null

// 游戏状态
const score = ref(0)
const highScore = ref(0)
const isPlaying = ref(false)
const isGameOver = ref(false)

// 初始化最高分
onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    const savedHighScore = localStorage.getItem('snakeHighScore')
    if (savedHighScore) {
      highScore.value = parseInt(savedHighScore)
    }
  }
})

const handleKeyDown = (event) => {
  const keyMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w: 'up',
    s: 'down',
    a: 'left',
    d: 'right',
    W: 'up',
    S: 'down',
    A: 'left',
    D: 'right',
  }

  if (keyMap[event.key]) {
    event.preventDefault()
    game?.changeDirection(keyMap[event.key])
  }
}

const startGame = () => {
  score.value = 0
  isPlaying.value = true
  isGameOver.value = false
  game?.start()
}

const pauseGame = () => {
  game?.pause()
  isPlaying.value = false
}

const resetGame = () => {
  score.value = 0
  isPlaying.value = false
  isGameOver.value = false
  game?.reset()
}

const handleScoreUpdate = (newScore) => {
  score.value = newScore
}

const handleGameOver = () => {
  isPlaying.value = false
  isGameOver.value = true

  if (score.value > highScore.value) {
    highScore.value = score.value
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('snakeHighScore', highScore.value.toString())
    }
  }
}

onMounted(() => {
  if (canvasRef.value) {
    if (typeof localStorage !== 'undefined') {
      const savedHighScore = localStorage.getItem('snakeHighScore')
      if (savedHighScore) {
        highScore.value = parseInt(savedHighScore)
      }
    }

    game = new SnakeGame(canvasRef.value, {
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
        <span class="label">当前分数:</span>
        <span class="value">{{ score }}</span>
      </div>
      <div class="score-display">
        <span class="label">最高分:</span>
        <span class="value">{{ highScore }}</span>
      </div>
      <div class="game-controls">
        <button v-if="!isPlaying && !isGameOver" class="btn-primary" @click="startGame">
          开始游戏
        </button>
        <button v-if="isPlaying" class="btn-secondary" @click="pauseGame">暂停</button>
        <button class="btn-secondary" @click="resetGame">重新开始</button>
      </div>
    </div>

    <div class="game-canvas">
      <canvas ref="canvasRef"></canvas>
      <div v-if="isGameOver" class="game-over-overlay">
        <div class="game-over-content">
          <h2>游戏结束!</h2>
          <p>你的得分: {{ score }}</p>
          <p v-if="score === highScore">🎉 新纪录!</p>
          <button @click="startGame">再来一局</button>
        </div>
      </div>
    </div>

    <div class="game-info">
      <h3>游戏说明</h3>
      <ul>
        <li>使用方向键或 WASD 控制蛇的移动方向</li>
        <li>吃到红色食物可以增加分数并让蛇变长</li>
        <li>避免撞到墙壁或自己的身体</li>
        <li>尽可能获得更高的分数!</li>
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
  position: relative;
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

.game-over-content p {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
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
</style>
