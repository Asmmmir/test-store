export function formatPriceToCurrentRate(price: number, rate: number) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(price * rate);
}


