/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "utfs.io",
      "res.cloudinary.com",
      "www.altnews.in",
      "picsum.photos",
      "i.pinimg.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "t3.ftcdn.net",
    ],
  },
  
};

export default config;
