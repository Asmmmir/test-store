import { computed, ref, watch, type Ref } from "vue"
import type { ICartItem, IProduct } from "@/types/products.types"

export function useCart(products: Ref<IProduct[]>) {
    const cart = ref<ICartItem[]>([])


    // Добавление в корзину
    function onAddToCart(product: IProduct ) {
        const cartItem = cart.value.find((item: ICartItem) => item.id === product.id)


        if (product.quantity === 0) return

        if (cartItem) {
            if (cartItem.quantity < product.quantity) {
                cartItem.quantity += 1
            }

            return
        }

        cart.value.push({
            group: product.group,
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            limit: product.quantity
        })
    }

    // Удаление из корзины
    function onRemoveFromCart(product: IProduct) {
        const findItem = cart.value.findIndex(item => item.id === product.id)

        if (findItem !== -1) {
            cart.value.splice(findItem, 1)
        }
    }

    // Смена кол-ва товаров в корзине
    function onChangeQuantity(id: number, quantity: number) {
        const cartItem = cart.value.find(item => item.id === id)

        // Тут защита от null
        if (!quantity) {
            return 1
        }

        if (!cartItem) return

        if (quantity <= 0) {
            onRemoveFromCart(cartItem)
            return
        }

        cartItem.quantity = quantity
    }


    // Общая цена
    const totalPrice = computed(() => {
        return cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    })



    // Здесь фильтруем, если с данных пришло quantity:0, чтобы в корзине тоже очищалось
    // Также если мы закупили 10 товаров и с данных пришло уже 5, то меняем на 5, так как это минимально от 10
    // Соответственно, если покупаем 50 товаров, и пришло 90, то 50 останется

    watch(products, (products) => {
        cart.value = cart.value.filter((item) => {
            const product = products.find((product) => product.id === item.id)

            if (!product || product.quantity <= 0) return false

            item.price = product.price
            item.limit = product.quantity

            item.quantity = Math.min(item.quantity, product.quantity)

            return true
        })
    })

    return {
        cart,
        totalPrice,
        onAddToCart,
        onRemoveFromCart,
        onChangeQuantity
    }
}