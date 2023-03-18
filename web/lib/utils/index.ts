import { formatCurrencyString } from "use-shopping-cart"

export const currencyToString = (price: number, currency?: string) => formatCurrencyString({
	value: price,
	currency: currency ?? "USD",
	language: "en-US",
})