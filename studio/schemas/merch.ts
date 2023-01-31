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
      description: "For now, add cents as zeroes, ie 500 = $5",
      type: "number",
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
      name: "size",
      title: "Size",
      description: "i.e. 3x3",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      description: "i.e. sticker, print, card",
      type: "string",
    },
    {
      name: "currency",
      title: "Currency",
      description: "Keep this 'usd' for the purposes of this tutorial",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  initialValue: {
    currency: "usd",
  },
}
