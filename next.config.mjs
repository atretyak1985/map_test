/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.sanity.io", "via.placeholder.com"],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        // Options for @svgr/webpack, if any
                    },
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
