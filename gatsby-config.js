/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Las Prendas Hablan - Tejer.RED`,
    titleTemplate: `%s | Tejer.RED`,
    description: `Las Prendas Hablan - Tejer.RED es una plataforma para explorar indicios y más.`,
    keywords: `Las Prendas Hablan, Tejer.RED, indicios, prendas, exploración, desaparecidos, Rancho Teuchitlan, mmexico`,
    image: `https://rancho-izaguirre.abundis.com.mx/indicios/indicio.jpg`, // Default image for social sharing
    author: `Angel Abundis`,
    siteUrl: `https://lasprendashablan.tejer.red`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `csvData`,
        path: `${__dirname}/src/data/complete_data.csv`, // Path to your CSV file
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-plugin-react-helmet`,
  ],
}
