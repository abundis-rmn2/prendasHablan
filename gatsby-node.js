/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require("path");

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allCompleteDataCsv {
        nodes {
          INDICIO
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const indicios = result.data.allCompleteDataCsv.nodes;

  indicios.forEach((item) => {
    createPage({
      path: `/indicio/${item.INDICIO}`,
      component: path.resolve("./src/templates/indicio.js"),
      context: {
        INDICIO: item.INDICIO,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type CsvData implements Node {
      indicio: String
    }
  `);
};
