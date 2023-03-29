/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io", "media4.giphy.com"],
  },
}

module.exports = nextConfig
