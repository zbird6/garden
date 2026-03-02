<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const images = ref([
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    title: '风景照片 1',
    description: '美丽的自然风光',
    source: 'https://unsplash.com/photos/FoKO4DpXamI',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    title: '风景照片 2',
    description: '山川河流',
    source: 'https://unsplash.com/photos/u5n8I8eMlQI',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    title: '风景照片 3',
    description: '森林湖泊',
    source: 'https://unsplash.com/photos/x8hR9rK9uS8',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    title: '风景照片 4',
    description: '日出晨光',
    source: 'https://unsplash.com/photos/wEaRfO1G5rA',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    title: '风景照片 5',
    description: '森林深处',
    source: 'https://unsplash.com/photos/6hQfTbKkL5Q',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800',
    title: '风景照片 6',
    description: '瀑布景观',
    source: 'https://unsplash.com/photos/o0n6hVt1t3M',
  },
])

const selectedImage = ref(null)
const lightboxOpen = ref(false)

const openLightbox = (image) => {
  selectedImage.value = image
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  selectedImage.value = null
  document.body.style.overflow = 'auto'
}

const navigateImage = (direction) => {
  const index = images.value.findIndex((img) => img.id === selectedImage.value.id)
  const newIndex = direction === 'next' ? index + 1 : index - 1

  if (newIndex >= 0 && newIndex < images.value.length) {
    selectedImage.value = images.value[newIndex]
  }
}

const handleKeydown = (event) => {
  if (!lightboxOpen.value) return

  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    navigateImage('next')
  } else if (event.key === 'ArrowLeft') {
    navigateImage('prev')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="gallery-container">
    <div class="grid">
      <div
        v-for="image in images"
        :key="image.id"
        class="gallery-item"
        @click="openLightbox(image)"
      >
        <img :src="image.src" :alt="image.title" loading="lazy" />
        <div class="overlay">
          <div class="overlay-content">
            <h3>{{ image.title }}</h3>
            <p>{{ image.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 灯箱 -->
    <Transition name="fade">
      <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
        <button class="close-btn" @click.stop="closeLightbox">×</button>
        <button
          v-if="images.indexOf(selectedImage) > 0"
          class="nav-btn prev"
          @click.stop="navigateImage('prev')"
        >
          ‹
        </button>
        <button
          v-if="images.indexOf(selectedImage) < images.length - 1"
          class="nav-btn next"
          @click.stop="navigateImage('next')"
        >
          ›
        </button>

        <div class="lightbox-content" @click.stop>
          <img :src="selectedImage.src" :alt="selectedImage.title" />
          <div class="lightbox-info">
            <h2>{{ selectedImage.title }}</h2>
            <p>{{ selectedImage.description }}</p>
            <a
              :href="selectedImage.source"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
            >
              查看原文 ↗
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.gallery-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
  aspect-ratio: 4/3;
  background: #f3f4f6;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 2rem 1rem 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item:hover .overlay {
  transform: translateY(0);
}

.overlay-content {
  color: white;
}

.overlay-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.overlay-content p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

/* 灯箱样式 */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.1);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 3rem;
  line-height: 1;
  cursor: pointer;
  padding: 1rem;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-btn.prev {
  left: 1rem;
}

.nav-btn.next {
  right: 1rem;
}

.lightbox-content {
  max-width: 900px;
  width: 100%;
}

.lightbox-content img {
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.lightbox-info {
  text-align: center;
  color: white;
}

.lightbox-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.lightbox-info p {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  opacity: 0.8;
}

.source-link {
  display: inline-block;
  color: #0ea5e9;
  text-decoration: none !important;
  font-weight: 500;
  transition: color 0.2s;
}

.source-link:hover {
  color: #38bdf8;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .lightbox {
    padding: 1rem;
  }

  .nav-btn {
    font-size: 2rem;
    padding: 0.5rem;
  }
}
</style>
