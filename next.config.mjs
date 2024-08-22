/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,  // 進用嚴格模式
    images: {
        domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
      },
};

export default nextConfig;
