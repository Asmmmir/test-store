<script setup lang="ts">
import { ShoppingCartOutlined } from "@ant-design/icons-vue"
import { formatPriceToCurrentRate } from "@/helpers/_formatPrice"
import type { IProduct } from "@/types/products.types"
import { useStore } from "@/composables/useStore"

interface IProps {
  products: IProduct[]
}

defineProps<IProps>()

const { currentRate, priceTrends, disableButtonByLimit, onAddToCart  } = useStore()
</script>

<template>
  <div class="product"
       v-for="(item, idx) in products"
       :key="item.id"
  >
    <div class="product__item">
      <div class="product__item-info">
        <span v-text="item.name" />

        <span v-text="`(${item.quantity})`" />
      </div>
      <div class="product__actions">
        <span :class="['product__actions__price', {
          'product__actions__price--up': priceTrends[item.id] === 'up',
           'product__actions__price--down': priceTrends[item.id] === 'down'
        }]" v-text="formatPriceToCurrentRate(item.price, currentRate)" />

        <a-button
            @click="onAddToCart(item)"
            type="primary"
            :disabled="disableButtonByLimit(item)"
        >
          <template #icon>
            <ShoppingCartOutlined />
          </template>
          Купить
        </a-button>

      </div>
    </div>
    <a-divider v-if="idx !== products.length - 1" />
  </div>
</template>


<style scoped lang="scss">
.product__item {
  display: flex;
  justify-content: space-between;
}

.product__item-info {
  flex-basis: 60%;
}

.product__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product__actions__price {
  border: 1px solid gray;
  border-radius: 4px;
  padding: .2rem;
  min-width: 70px;

  &--up {
    border-color: tomato;
    border-width: 2px;
  }

  &--down {
    border-color: green;
    border-width: 2px;
  }
}


</style>