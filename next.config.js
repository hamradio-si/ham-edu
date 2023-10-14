const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: strapiUrl.split(':')[0],
                hostname: strapiUrl.split('/').slice(-1)[0],
            },
        ],
    },
}

module.exports = nextConfig
