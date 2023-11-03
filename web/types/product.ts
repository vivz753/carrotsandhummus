export type Product = {
  name: string
  artist: string
  price: number
  description?: string
  size?: string
  category?: string
  images: string[]
  id: string
  currency: "USD"
  hidden: boolean
  soldOut?: boolean
  tags?: string[]
}
