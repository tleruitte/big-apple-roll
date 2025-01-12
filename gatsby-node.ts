import path from "node:path";

import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

import { ScheduleDayTemplateContext } from "src/templates/scheduleDayTemplate";
import { ScheduleEventTemplateContext } from "src/templates/scheduleEventTemplate";
import { ShopItemTemplateContext } from "src/templates/shopItemTemplate";

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
            slug
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
            slug
          }
          previous {
            id
          }
          next {
            id
          }
        }
      }
      shopItems: allMarkdownRemark(filter: { fileRelativeDirectory: { eq: "shop" } }) {
        edges {
          node {
            id
            slug
            fileName
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
    if (!node.slug) {
      return;
    }
    const context: ScheduleDayTemplateContext = {
      scheduleDayId: node.id,
      previousScheduleDayId: previous?.id,
      nextScheduleDayId: next?.id,
      scheduleEventsSlugRegex: `/^${node.slug}.+/`,
    };
    createPage({
      component: path.resolve(`./src/templates/scheduleDayTemplate.tsx`),
      path: node.slug,
      context,
    });
  });

  // Schedule event templates
  result.data.scheduleEvents.edges.forEach(({ node, previous, next }) => {
    if (!node.slug) {
      return;
    }
    const context: ScheduleEventTemplateContext = {
      scheduleEventId: node.id,
      previousScheduleEventId: previous?.id,
      nextScheduleEventId: next?.id,
    };
    createPage({
      component: path.resolve(`./src/templates/scheduleEventTemplate.tsx`),
      path: node.slug,
      context,
    });
  });

  // Shop item templates
  result.data.shopItems.edges.forEach(({ node }) => {
    if (!node.slug) {
      return;
    }
    const context: ShopItemTemplateContext = {
      shopItemId: node.id,
      shopImagesNameRegex: `/^${node.fileName}.+/`,
    };
    createPage({
      component: path.resolve(`./src/templates/shopItemTemplate.tsx`),
      path: node.slug,
      context,
    });
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MarkdownRemark implements Node {
      fileName: String @proxy(from: "fields.fileName")
      fileRelativeDirectory: String @proxy(from: "fields.fileRelativeDirectory")
      slug: String @proxy(from: "fields.slug")
    }
  `);
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // Add file information on MarkdownRemark nodes
  if (node.internal.type === "MarkdownRemark") {
    // Create slug field on markdown nodes
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });

    // Create file fields on markdown nodes
    if (node.parent) {
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
  }
};
