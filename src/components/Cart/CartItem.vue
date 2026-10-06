<script setup lang="ts">
import { useStore } from "@/composables/useStore"

import { formatPriceToCurrentRate } from "@/helpers/_formatPrice"

import { DeleteOutlined } from "@ant-design/icons-vue"
import type { ICartItem } from "@/types/products.types"

interface IProps {
  item: ICartItem
}

defineProps<IProps>()


const { onRemoveFromCart, onChangeQuantity, currentRate } = useStore()
</script>

<template>
    <div class="cart-item">
      <div class="cart-item__info">
        <span class="cart-item__category" v-text="item.group" />
        <span class="cart-item__name" v-text="item.name" />
      </div>

      <div class="cart-item__actions">

        <a-input-number
            :value="item.quantity"
            class="cart-item__quantity"
            :min="1"
            :max="item.limit"
            :precision="0"
            @update:value="(value:number) => onChangeQuantity(item.id, value)"
        />

        <a-divider type="vertical" />
        <span
            v-text="formatPriceToCurrentRate(item.price * item.quantity, currentRate)"
        />
        <a-button
            @click="onRemoveFromCart(item)"
            danger
        >
        <template #icon>
          <DeleteOutlined />
        </template>
        </a-button>
      </div>
    </div>
  <a-divider />
</template>


<style scoped>
.cart-item,
.cart-item__info,
.cart-item__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-item {
  justify-content: space-between;
}

.cart-item__category{
  border: 1px solid #fcdda8;
  background-color: #fef7e6;
  color: #f8972d;
  padding: .2rem .5rem
}

.cart-item__quantity {
  width: 5rem;
}

</style>
