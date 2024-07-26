/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa');

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  pwa: {
    dest: 'public',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/chat-golf-project.vercel.app\/.*$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
        },
      },
      {
        urlPattern: /^https:\/\/mywebsite\.com\/.*$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'static-assets',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
          },
        },
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
});

module.exports = nextConfig;
