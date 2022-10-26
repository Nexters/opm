/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    loader: "akamai",
    path: "/",
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
    localeDetection: false,
  }
};

module.exports = nextConfig;
