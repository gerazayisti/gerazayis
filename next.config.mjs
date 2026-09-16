/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Le temps de rapatrier les visuels en local (/public/departements/…),
    // on pointe vers les photos déjà en ligne sur l'ancien site.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "facsciences.uy1.cm",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
