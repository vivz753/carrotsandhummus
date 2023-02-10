import sanityClient from "@sanity/client"
export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: "production",
  //   token: 'sanity-auth-token', // or leave commented out to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-02-09",
})
