/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const config = require("./config")
module.exports = {
  siteMetadata: {
    title: `My Gatsby Blog with wpgraphql`,
    description: `My awesome blog`,
    Author: `Alexandra Spalato`,
  },
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        // This type will contain remote schema Query type
        typeName: `WPGraphQL`,
        // This is field under which it's accessible
        fieldName: `wpgraphql`,
        // Url to query from
        url: `${config.wordPressUrl}/graphql`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
