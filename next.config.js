const { DeleteSourceMapsPlugin } = require('webpack-delete-sourcemaps-plugin');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.plugins.push(new DeleteSourceMapsPlugin({ isServer, keepServerSourcemaps: true }))
    return config
  }
}

module.exports = nextConfig
