/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Thiago Luiz Silva | Full Stack Developer and Tech Leader`,
    author: `Thiago Luiz Silva`,
    description: `I am a self-taught full stack developer who can quickly adapt to new circunstances. I make fast and solid web applications to solve problems while maintaining deadlines and budgets.`,
    siteUrl: `https://dev.thluiz.com/`,
    social: {
      twitter: `thluiz`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Thiago Luiz Silva | Full Stack Developer and Tech Leader`,
        short_name: `CV - Thiago Silva`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#320dad`,
        display: `standalone`,
        icon: 'src/assets/site-icon.png'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    'gatsby-plugin-netlify-cms',
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true, // Enable tailwindcss support
      }
    }
  ],
};
