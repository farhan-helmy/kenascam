/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'd8f7wymmosp6f.cloudfront.net'
      
    }],
  },
};

module.exports = nextConfig;
