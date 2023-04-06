export type Product = {
  name: string
  artist: string
  price: number
  description?: string
  size?: string
  category?: string
  image?: string // TODO: remove
  images: string[]
  id: string
  currency: "USD"
  hidden: boolean
  tags?: string[]
}
