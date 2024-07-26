/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: isDev,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/chat-golf-project.vercel.app\/.*$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
        },
      },
      {
        urlPattern: /^https:\/\/chat-golf-project.vercel.app\/.*$/,
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
});
const nextConfig = withPWA({
    experimental: {
        serverActions: {
          allowedOrigins: ['*'],
        },
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

