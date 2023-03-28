export type Product = {
  name: string
  artist: string
  price: number
  stock?: number
  description?: string
  sizes?: string[]
  category?: string
  image?: string // TODO: remove
  images?: string[]
  id: string
  currency: "USD"
}
