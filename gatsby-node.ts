import path from "node:path";

import { GatsbyNode } from "gatsby";

import { ScheduleDayTemplateContext } from "src/templates/scheduleDayTemplate";
import { ScheduleEventTemplateContext } from "src/templates/scheduleEventTemplate";

export const createPages: GatsbyNode["createPages"] = async (args) => {
  const { actions, graphql, reporter } = args;
  const { createPage } = actions;

  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      scheduleDays: allMarkdownRemark(
        filter: { fileRelativeDirectory: { eq: "schedule" } }
        sort: { frontmatter: { date: ASC } }
      ) {
        edges {
          node {
            id
            fileName
          }
          previous {
            id
          }
          next {
            id
          }
        }
      }
      scheduleEvents: allMarkdownRemark(
        filter: { fileRelativeDirectory: { regex: "/^schedule/.*/" } }
        sort: { frontmatter: { date: ASC } }
      ) {
        edges {
          node {
            id
            fileName
            fileRelativeDirectory
          }
          previous {
            id
          }
          next {
            id
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
  result.data.scheduleDays.edges.forEach(({ node, previous, next }) => {
    const context: ScheduleDayTemplateContext = {
      scheduleDayId: node.id,
      previousScheduleDayId: previous?.id,
      nextScheduleDayId: next?.id,
      scheduleEventsFileRelativeDirectoryRegex: `/^schedule/${node.fileName}/`,
    };
    createPage({
      component: path.resolve(`./src/templates/scheduleDayTemplate.tsx`),
      path: `/schedule/${node.fileName}`,
      context,
    });
  });

  // Schedule event templates
  result.data.scheduleEvents.edges.forEach(({ node, previous, next }) => {
    const context: ScheduleEventTemplateContext = {
      scheduleEventId: node.id,
      previousScheduleEventId: previous?.id,
      nextScheduleEventId: next?.id,
    };
    createPage({
      component: path.resolve(`./src/templates/scheduleEventTemplate.tsx`),
      path: `/${node.fileRelativeDirectory}/${node.fileName}`,
      context,
    });
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
    type MarkdownRemark implements Node {
      fileName: String @proxy(from: "fields.fileName")
      fileRelativeDirectory: String @proxy(from: "fields.fileRelativeDirectory")
    }
  `);
  };

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;

  // Add file information on MarkdownRemark nodes
  if (node.internal.type === "MarkdownRemark" && node.parent) {
    const parentNode = getNode(node.parent);
    if (parentNode) {
      createNodeField({
        node,
        name: "fileName",
        value: parentNode.name,
      });
      createNodeField({
        node,
        name: "fileRelativeDirectory",
        value: parentNode.relativeDirectory,
      });
    }
  }
};
