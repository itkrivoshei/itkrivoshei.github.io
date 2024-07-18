/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Nikita Krivoshei | Frontend Developer`,
    description: `Portfolio of Nikita Krivoshei, a frontend developer based in Berlin, Germany.`,
    author: `@itkrivoshei`,
    siteUrl: `https://kriv.dev`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
