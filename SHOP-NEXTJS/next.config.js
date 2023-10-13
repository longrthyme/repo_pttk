/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,     // render once time
}

module.exports = {
  reactStrictMode: false, 
  images: {
    domains: ['res.cloudinary.com', 'th.bing.com', 's3.amazonaws.com'],
  },
}