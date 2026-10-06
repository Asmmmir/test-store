<script setup lang="ts">
import CartItem from "@/components/Cart/CartItem.vue"
import { useStore } from "@/composables/useStore"

import { formatPriceToCurrentRate } from "@/helpers/_formatPrice"


const { cart, totalPrice, currentRate } = useStore()


</script>

<template>
  <div class="cart">
    <CartItem
        v-for="item in cart"
        :item="item"
        :key="item.id"
    />

    <div>
        <span>Общая стоимость: </span>
        <span class="cart__total" v-text="formatPriceToCurrentRate(totalPrice, currentRate)" />
    </div>
  </div>
</template>


<style scoped lang="scss">
.cart {
  grid-area: cart;
  padding: 1rem;

  &__total {
    font-size: 2rem;
  }
}
</style>
