import names from "@/constants/names.json"
import { ref } from "vue"
import { createSharedComposable, useFetch} from '@vueuse/core'
import { useGetData } from "@/composables/useGetData"
import { useCachePrices } from "@/composables/useCachePrices"
import { useCart } from "@/composables/useCart"
import type { IData } from "@/types/data.types"
import type { IProduct } from "@/types/products.types.ts";

export const useStore = createSharedComposable(() => {
    const currentRate = ref(20)
    const { data, error, isFetching, execute } = useFetch<IData>('/data.json', { cache: 'no-store' }).json()
    const { list, products } = useGetData(data, names)
    const { priceTrends } = useCachePrices(products, currentRate)
    const { cart,
        totalPrice,
        onAddToCart,
        onRemoveFromCart,
        onChangeQuantity } = useCart(products)

    async function updateRate() {
        await execute()
        currentRate.value = Math.floor(Math.random() * 61) + 20
    }


    function disableButtonByLimit(product: IProduct) {
        const isLimit = cart.value.find(item => item.id === product.id)?.quantity ?? 0
        return product.quantity === 0 || isLimit >= product.quantity
    }

    return {
        currentRate,
        data,
        error,
        isFetching,
        list,
        priceTrends,
        cart,
        totalPrice,
        updateRate,
        onAddToCart,
        onRemoveFromCart,
        onChangeQuantity,
        disableButtonByLimit
    }
})