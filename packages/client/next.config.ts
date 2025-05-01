import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'none'; connect-src 'self' http://localhost:3000;",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
