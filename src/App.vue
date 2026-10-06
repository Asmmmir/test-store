<script setup lang="ts">
import List from "@/components/Products/List.vue"
import Cart from "@/components/Cart/Cart.vue"
import Timer from "@/components/Timer/Timer.vue"

import { useStore } from "@/composables/useStore"


const { currentRate, data, error, isFetching } = useStore()

</script>

<template>
  <div class="app">
    <div class="main">
      <div class="rate">
        <span>Курс:</span>

        <a-input-number
            v-model:value.lazy="currentRate"
            :min="20"
            :max="80"
        />
      </div>

      <div class="list-wrapper">
        <div v-if="error">
          Не удалось обновить данные: {{ error }}
        </div>

        <List v-if="data" />

        <div v-else-if="!error && isFetching">Загрузка...</div>
      </div>
      <Timer />

      <Cart/>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-areas:
  "rate timer "
  "list cart";
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}


.rate {
  grid-area: rate;
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: center;
  justify-content: center;
  place-self: center;
}

.list-wrapper {
  grid-area: list;
}
</style>
