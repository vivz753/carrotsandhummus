export default {
  name: "merch",
  title: "Merch",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "artist",
      title: "Artist",
      description: "who it was created by",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      description: "IMPORTANT: add 2 extra digits, i.e 500 for 5 USD",
      type: "number",
    },
    {
      name: "size",
      title: "Size",
      description: `i.e. 3" x 3" or A6`,
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      description: "i.e. sticker, print, card",
      type: "string",
    },
    {
      name: "stock",
      title: "Stock",
      description: "amount available for sale",
      type: "number",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "currency",
      title: "Currency",
      description: "Keep this 'USD'",
      type: "string",
    },
    {
      name: "images",
      title: "Image(s)",
      type: "array",
      options: {
        hotspot: true,
      },
      of: [{ type: "image" }],
    },
  ],
  initialValue: {
    currency: "USD",
  },
}
