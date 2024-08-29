const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const output = process.env.NEXT_OUTPUT || undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: output,
    images: {
        remotePatterns: [
            {
                protocol: strapiUrl.split(':')[0],
                hostname: strapiUrl.split('/').slice(-1)[0],
            },
        ],
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
}

module.exports = nextConfig
