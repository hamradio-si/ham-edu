const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const output = process.env.OUTPUT || undefined;

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
}

module.exports = nextConfig
