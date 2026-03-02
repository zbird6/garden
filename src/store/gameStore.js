import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // 游戏分数
  const score = ref(0)
  const highScore = ref(0)

  // 游戏状态
  const isPlaying = ref(false)
  const isGameOver = ref(false)

  // 关卡进度
  const level = ref(1)
  const maxLevel = ref(1)

  // 计算属性
  const highScoreDisplay = computed(() => highScore.value)
  const canPlay = computed(() => !isGameOver.value)

  // 方法
  function startGame() {
    score.value = 0
    isPlaying.value = true
    isGameOver.value = false
  }

  function endGame() {
    isPlaying.value = false
    isGameOver.value = true

    if (score.value > highScore.value) {
      highScore.value = score.value
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('highScore', highScore.value.toString())
      }
    }
  }

  function addScore(points) {
    score.value += points
  }

  function nextLevel() {
    level.value += 1
    if (level.value > maxLevel.value) {
      maxLevel.value = level.value
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('maxLevel', maxLevel.value.toString())
      }
    }
  }

  function resetGame() {
    level.value = 1
    score.value = 0
    isPlaying.value = false
    isGameOver.value = false
  }

  return {
    score,
    highScore,
    isPlaying,
    isGameOver,
    level,
    maxLevel,
    highScoreDisplay,
    canPlay,
    startGame,
    endGame,
    addScore,
    nextLevel,
    resetGame,
  }
})
