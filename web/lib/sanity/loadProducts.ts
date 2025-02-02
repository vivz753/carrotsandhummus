import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"

const loadProducts = async () => await client.fetch(merchQuery)

export { loadProducts }