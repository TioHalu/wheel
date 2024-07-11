/** @type {import('next').NextConfig} */
const nextConfig = {


    reactStrictMode: true,
    rewrites: async () => {
        return [
            {
                source: '/login',
                destination: '/',
            },
        ];
    }
};

export default nextConfig;
