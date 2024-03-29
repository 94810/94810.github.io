import axios from "axios";
import path from "path";

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
  entry: path.join(__dirname, "src", "index.tsx"),
  siteRoot: "https://94810.github.io",
  getRoutes: async () => [
    {
      path: "/",
      component: "src/pages/index",
    },
  ],
  plugins: [
    "react-static-plugin-typescript",
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages"),
      },
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
  ],
};
