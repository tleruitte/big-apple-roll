import path from "path";

import { GatsbyNode } from "gatsby";

import { ScheduleDayTemplateContext } from "src/templates/scheduleDayTemplate";
import { ScheduleEventTemplateContext } from "src/templates/scheduleEventTemplate";

export const createPages: GatsbyNode["createPages"] = async (args) => {
  const { actions, graphql, reporter } = args;
  const { createPage } = actions;

  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      scheduleDays: allFile(filter: { relativeDirectory: { eq: "schedule" } }) {
        nodes {
          id
          name
          relativeDirectory
        }
      }
      scheduleEvents: allFile(
        filter: { relativeDirectory: { regex: "/^schedule/.*/" } }
      ) {
        nodes {
          id
          name
          relativeDirectory
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
      id: node.id,
      relativeDirectoryRegex: `^${node.relativeDirectory}/${node.name}/`,
    };
    createPage({
      component: path.resolve(`./src/templates/scheduleDayTemplate.tsx`),
      path: `/${node.relativeDirectory}/${node.name}`,
      context,
    });
  });

  // Schedule event templates
  result.data.scheduleEvents.nodes.forEach((node) => {
    const context: ScheduleEventTemplateContext = {
      id: node.id,
    };
    createPage({
      component: path.resolve(`./src/templates/scheduleEventTemplate.tsx`),
      path: `/${node.relativeDirectory}/${node.name}`,
      context,
    });
  });
};
