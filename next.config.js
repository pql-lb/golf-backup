/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

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
