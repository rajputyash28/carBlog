/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com', 'upload.wikimedia.org']
  },
  // Enable static optimization
  trailingSlash: true,
  // Optimize for static export
  experimental: {
    optimizeCss: true,
  },
  // Compress output
  compress: true,
  // Enable SWC minification
  swcMinify: true,
  // Optimize images
  optimizeFonts: true,
};

module.exports = nextConfig;