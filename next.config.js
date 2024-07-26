/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: isDev,
    
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

