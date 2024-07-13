/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
    
  },
  images: {
    domains: ["images.unsplash.com"],
  }
  
};

export default nextConfig;
