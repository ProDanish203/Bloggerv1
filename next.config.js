/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],
        domains: ["img.freepik.com", "w0.peakpx.com", "www.verdict.co.uk", "images.pexels.com"]
    }
}

module.exports = nextConfig
