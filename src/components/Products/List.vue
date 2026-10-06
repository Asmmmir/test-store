<script setup lang="ts">
import Product from "@/components/Products/Product.vue"
import { useStore } from "@/composables/useStore"

const { list } = useStore()
</script>

<template>
  <div class="list">
    <a-collapse>
      <a-collapse-panel
          v-for="(items, header) in list"
          :key="header"
          :header="header"
          :collapsible="items.length === 0 ? 'disabled' : undefined">

         <Product :products="items"/>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
