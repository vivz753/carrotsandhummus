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
      description: "Who it was created by",
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
      description: "So far, it's just: sticker, print, card. Please let me know if you need a new category type.",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "tags",
      title: "Tags",
      description:
        "Any special attributes or mediums to display or search by i.e. charcoal, oil paint, limited edition, digital, nsfw, holiday, etc.",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "hidden",
      title: "Hidden",
      type: "boolean",
      description:
        "Prevents this product from being viewable on the website-- use when an item is out of stock and production has discontinued indefinitely.",
    },
    {
      name: "currency",
      title: "Currency",
      description: "Keep this 'USD'",
      type: "string",
    },
    {
      name: "soldOut",
      title: "Sold Out",
      description:
        "Prevents this product from being bought -- use when an item is out of stock and production has been discontinued momentarily",
      type: "boolean",
    },
    {
      name: "images",
      title: "Image(s)",
      description: "Upload one or multiple images here",
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
