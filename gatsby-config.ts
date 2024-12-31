import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: "/big-apple-roll",
  siteMetadata: {
    title: "Big Apple Roll",
    siteUrl: "https://tleruitte.github.io/",
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap`,
          },
          {
            name: "Oswald",
            file: "https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap",
          },
        ],
      },
    },
    "gatsby-plugin-dts-css-modules",
    "gatsby-plugin-image",
    "gatsby-plugin-root-import",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", disallow: "/big-apple-roll" }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `./src/content`,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
  ],
};

export default config;
