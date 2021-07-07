const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    return config;
  },
};

module.exports = withPlugins([bundleAnalyzer], nextConfig);
