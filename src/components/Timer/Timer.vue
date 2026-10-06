<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ReloadOutlined } from "@ant-design/icons-vue"
import { useStore } from "@/composables/useStore"

const REMAINING_TIME = 15

const { updateRate } = useStore()

const timer = ref<ReturnType<typeof setInterval> | null>(null)
const currentTime = ref(REMAINING_TIME)


function startTimer() {
  if (timer.value !== null) {
    clearInterval(timer.value)
  }

  timer.value = setInterval(() => {
    if (currentTime.value <= 1) {
      currentTime.value = REMAINING_TIME
      updateRate()
      return
    }
    currentTime.value--
  }, 1000)
}


function onReset() {
  if (timer.value) {
    clearInterval(timer.value)
  }
  currentTime.value = REMAINING_TIME
  updateRate()
  startTimer()
}

onMounted(startTimer)

onBeforeUnmount(() => {
  if (timer.value !== null) {
    clearInterval(timer.value)
  }
})

</script>

<template>
  <div class="timer">
    <div class="timer__display">
      <span>Обновление через: </span>
      <span class="time" v-text="currentTime" />
      <span>сек</span>
    </div>

    <a-button
        @click="onReset"
        type="link"
        class="reset-button"
    >
      <template #icon>
        <ReloadOutlined />
      </template>
    </a-button>
  </div>
</template>

<style scoped>

.timer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>