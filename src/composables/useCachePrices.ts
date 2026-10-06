import { type Ref, ref, watch } from "vue"
import type { ICachePrice } from "@/types/data.types"


export function useCachePrices(products: Ref<ICachePrice[]>, rate: Ref<number>) {

    // В данном решении мы создаем мапу cachePrices из id:price

    // Потом в priceTrends заполняем id: up|down в зависимости от того, в какую сторону увеличилась стоимость
    // Не стал делать priceTrends тоже через new Map() так как записываем в ref(). Да и никогда так не делал :)

    const cachePrices = new Map<number, number>()
    const priceTrends = ref<Record<number, 'up' | 'down'>>({})


    function setCachePrices() {
        const nextTrends: Record<number, 'up' | 'down'> = { ...priceTrends.value }

        for (const product of products.value) {
            const currentPrice = product.price * rate.value
            const prevPrice = cachePrices.get(product.id)
            if (prevPrice === undefined) {
                cachePrices.set(product.id, currentPrice)
                continue
            }
            if (currentPrice > prevPrice) {
                nextTrends[product.id] = 'up'
            } else if (currentPrice < prevPrice) {
                nextTrends[product.id] = 'down'
            }
            cachePrices.set(product.id, currentPrice)
        }
        priceTrends.value = nextTrends
    }


    // Костыль, чтобы setCachePrices отрабатывал 1 раз после смены курса доллара

    let batchTimer: ReturnType<typeof setTimeout> | null = null

    watch(() => [rate.value, products.value], () => {
        if (batchTimer) {
            clearTimeout(batchTimer)
        }

        batchTimer = setTimeout(() => {
            batchTimer = null
            setCachePrices()
        }, 0)
    })


    return { priceTrends }
}
