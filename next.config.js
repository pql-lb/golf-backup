/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
