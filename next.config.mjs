/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sign-in",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/signin",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "/register",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/register",
        permanent: true,
      },
    ];
  },
  //Only Here for github codespaces to work
  experimental: {
    serverActions: {
      allowedOrigins: [
        "probable-barnacle-9gxjx7g7vvw27w6.github.dev",
        "github.dev",
        "localhost:3000",
      ],
    },
  },
};

export default nextConfig;
