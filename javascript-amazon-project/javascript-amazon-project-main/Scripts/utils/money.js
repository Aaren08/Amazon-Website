
// 7. Created a utility for prices

export function formatCurrency(priceCents) {
    return (priceCents / 100).toFixed(2)
}