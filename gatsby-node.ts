import path from "path";

import { GatsbyNode } from "gatsby";

import { ScheduleTemplateContext } from "./src/templates/scheduleTemplate";

export const createPages: GatsbyNode["createPages"] = async (args) => {
  const { actions, graphql, reporter } = args;
  const { createPage } = actions;

  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      allMarkdownRemark {
        nodes {
          id
          frontmatter {
            slug
          }
          parent {
            ... on File {
              relativePath
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data?.allMarkdownRemark.nodes.forEach((node) => {
    if (
      node.parent &&
      "relativePath" in node.parent &&
      node.parent.relativePath?.startsWith("schedule") &&
      node.frontmatter?.slug
    ) {
      const context: ScheduleTemplateContext = {
        id: node.id,
      };
      createPage({
        component: path.resolve(`./src/templates/scheduleTemplate.tsx`),
        path: `/schedule/${node.frontmatter.slug}`,
        context,
      });
    }
  });
};
