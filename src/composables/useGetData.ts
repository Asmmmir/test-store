import { computed, type Ref } from "vue"
import type { IData } from "@/types/data.types"
import type { IProduct } from "@/types/products.types"

const PRODUCTS_KEYS = {
    NAME: 'N',
    ID: 'T',
    QUANTITY: 'P',
    GROUP: 'G',
    LIST: 'B',
    PRICE: 'C'
} as const

export function useGetData(data: Ref<IData> | null, names: any) {

    const list = computed(() => {
        const grouped: Record<string, IProduct[]> = {}

        // Создаем группы например Еда: []
        for (const key in names) {
            const groupName = names[key][PRODUCTS_KEYS.GROUP]
            grouped[groupName] = []
        }

        if (!data || !data.value) {
            return grouped
        }

        if (data.value.Value.Goods) {
        for (const item of data.value.Value.Goods) {
            // Находим группу
            const group = names[item[PRODUCTS_KEYS.GROUP]]

            if (!group) continue

            // Вытягиваем из нее продукты
            const product = group[PRODUCTS_KEYS.LIST]?.[item[PRODUCTS_KEYS.ID]]

            if (!product) continue


            // Берем название группы: Книги, Еда итд
            const groupName = group[PRODUCTS_KEYS.GROUP]
            const groupItems = grouped[groupName]

            if (!groupItems) continue

            // Заполняем мапу с grouped, чтобы привести к виду - Еда: [...]
            groupItems.push({
                group: groupName,
                name: product[PRODUCTS_KEYS.NAME],
                id: item[PRODUCTS_KEYS.ID],
                quantity: item[PRODUCTS_KEYS.QUANTITY],
                price: item[PRODUCTS_KEYS.PRICE]
            })
        }
        }
        return grouped
    })

    // Делаем массив из всех продуктов в данных, чтобы далее сравнивать цены
    const products = computed(() => Object.values(list.value).flat())

    return {
        list,
        products
    }
}
