import path from "path";

import { GatsbyNode } from "gatsby";

import { ScheduleDayTemplateContext } from "src/templates/scheduleDayTemplate";

export const createPages: GatsbyNode["createPages"] = async (args) => {
  const { actions, graphql, reporter } = args;
  const { createPage } = actions;

  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      scheduleDays: allFile(filter: { relativeDirectory: { eq: "schedule" } }) {
        nodes {
          name
        }
      }
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

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Schedule day templates
  result.data.scheduleDays.nodes.forEach((node) => {
    const context: ScheduleDayTemplateContext = {
      day: node.name,
      relativeDirectoryRegex: `^schedule/${node.name}/`,
    };
    createPage({
      component: path.resolve(`./src/templates/scheduleDayTemplate.tsx`),
      path: `/schedule/${node.name}`,
      context,
    });
  });

  // result.data.allMarkdownRemark.nodes.forEach((node) => {
  //   if (
  //     node.parent &&
  //     "relativePath" in node.parent &&
  //     node.parent.relativePath?.startsWith("schedule") &&
  //     node.frontmatter?.slug
  //   ) {
  //     const context: ScheduleTemplateContext = {
  //       id: node.id,
  //     };
  //     createPage({
  //       component: path.resolve(`./src/templates/scheduleTemplate.tsx`),
  //       path: `/schedule/${node.frontmatter.slug}`,
  //       context,
  //     });
  //   }
  // });
};
