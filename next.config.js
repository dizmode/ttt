/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'tshirtsthattalk.space' }],
        destination: 'https://tshirtsthattalk.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
