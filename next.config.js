/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
const runtimeCaching = require("next-pwa/cache");
const { InjectManifest } = require('workbox-webpack-plugin');

const withPWA = require("next-pwa")({
  dest: 'public',
  disable: isDev,
  skipWaiting: true,
  swSrc: "/public/custom-sw.js",
  register: true,
  buildExcludes: [
    // add buildExcludes here
    ({ asset, compilation }) => {
        if (
            asset.name.startsWith("server/") ||
            asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/)
        ) {
            return true;
        }
        if (isDev && !asset.name.startsWith("static/runtime/")) {
            return true;
        }
        return false;
    }
  ],
  // runtimeCaching: [
  //   {
  //     urlPattern: /^https:\/\/golf-pwa\.vercel\.app\/.*$/,
  //     handler: 'NetworkFirst',
  //     options: {
  //       cacheName: 'api-cache',
  //       networkTimeoutSeconds: 10,
  //       expiration: {
  //         maxEntries: 50,
  //         maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
  //       },
  //       cacheableResponse: {
  //         statuses: [0, 200],
  //       },
  //     },
  //   },
  //   {
  //     urlPattern:/^https:\/\/golf-pwa\.vercel\.app\/$/, // Caching the homepage
  //     handler: 'NetworkFirst',
  //     options: {
  //       cacheName: 'homepage-cache',
  //       expiration: {
  //         maxEntries: 1,
  //         maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
  //       },
  //       cacheableResponse: {
  //         statuses: [0, 200],
  //       },
  //     },
  //   },
  //   {
  //     urlPattern: /\.(?:png|jpg|jpeg|svg|gif|css|js)$/,
  //     handler: 'CacheFirst',
  //     options: {
  //       cacheName: 'static-assets',
  //       expiration: {
  //         maxEntries: 50,
  //         maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
  //       },
  //     },
  //   },
  // ],
});
const nextConfig = withPWA({
    experimental: {
        serverActions: {
          allowedOrigins: ['*'],
        },
    },
    webpack(config, { isServer }) {
      // if (!isServer) {
      //   config.plugins.push(
      //     new InjectManifest({
      //       swSrc: 'public/custom-sw.js',
      //       swDest: 'public/sw.js',
      //     })
      //   );
      // }
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
