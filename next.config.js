/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "drive.google.com"], // Adicione o domínio do seu servidor de imagens
  },
};

module.exports = nextConfig;
