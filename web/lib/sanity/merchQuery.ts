// web/lib/sanity/merchQuery.js

//protip: we install sanity's groq package
//for syntax highlighting and the ability to run
//groq queries within VScode
//read more at https://www.npmjs.com/package/groq
import groq from "groq"

export const merchQuery = groq`
*[_type=="merch"]{
    name,
    artist,
    price,
    description,
    size,
    category,
    "id": _id,
    "images": images[].asset->url,
    currency,
    hidden,
    soldOut,
    tags
  }`
