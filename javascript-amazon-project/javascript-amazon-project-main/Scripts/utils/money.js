
// 7. Created a utility for prices

export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2)
}

export default formatCurrency