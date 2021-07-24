const CopyPlugin = require('copy-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    // copy files you're interested in
    if (!dev) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [{ from: 'blog', to: 'blog' }],
        })
      );
    }

    return config;
  },
};

module.exports = withPlugins([bundleAnalyzer], nextConfig);
