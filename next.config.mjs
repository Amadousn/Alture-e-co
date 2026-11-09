/** @type {import('next').NextConfig} */


const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  // trailingSlash: true,
  // No Next.js badge in the corner, even on the local preview.
  devIndicators: false,
};

export default nextConfig;
