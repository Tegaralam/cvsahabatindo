import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { dev, isServer }) => {
        // Force disable devtool source maps in dev to prevent pdfjs-dist eval error
        if (dev && !isServer) {
            config.devtool = false; 
        }
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        return config;
    },
};

export default nextConfig;
