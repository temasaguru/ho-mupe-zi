/**
 * @next/bundle-analyzerが本番環境で読み込まれないように
 * @see https://zenn.dev/catnose99/scraps/661d77118aa2af
 */
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    /**
     * tRPCで必要
     */
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    domains: [
      /**
       * Spotify CDN
       */
      'i.scdn.co',
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
