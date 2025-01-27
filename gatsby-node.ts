import path from "node:path";

import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import { sortBy } from "lodash";
import FilterWarningsPlugin from "webpack-filter-warnings-plugin";

import { GalleryYearTemplateContext } from "src/templates/galleryYearTemplate";
import { ScheduleDayTemplateContext } from "src/templates/scheduleDayTemplate";
import { ScheduleEventTemplateContext } from "src/templates/scheduleEventTemplate";
import { ShopProductTemplateContext } from "src/templates/shopProductTemplate";

export const createPages: GatsbyNode["createPages"] = async (args) => {
  const { actions, graphql, reporter } = args;
  const { createPage } = actions;

  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      galleryYears: allMarkdownRemark(
        filter: { fileRelativeDirectory: { eq: "gallery" } }
        sort: { fileName: ASC }
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
      shopProducts: allMarkdownRemark(filter: { fileRelativeDirectory: { eq: "shop" } }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Gallery year templates
  result.data.galleryYears.edges.forEach(({ node, previous, next }) => {
    if (!node.slug) {
      return;
    }
    const context: GalleryYearTemplateContext = {
      galleryYearId: node.id,
      previousGalleryYearId: previous?.id,
      nextGalleryYearId: next?.id,
    };
    createPage({
      component: path.resolve(`./src/templates/galleryYearTemplate.tsx`),
      path: node.slug,
      context,
    });
  });

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

  // Shop product templates
  result.data.shopProducts.edges.forEach(({ node }) => {
    if (!node.slug) {
      return;
    }
    const context: ShopProductTemplateContext = {
      shopProductId: node.id,
    };
    createPage({
      component: path.resolve(`./src/templates/shopProductTemplate.tsx`),
      path: node.slug,
      context,
    });
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MarkdownRemark implements Node {
      fileName: String! @proxy(from: "fields.fileName")
      fileRelativeDirectory: String! @proxy(from: "fields.fileRelativeDirectory")
      linkedFiles: [File!]! @link(from: "fields.linkedFiles___NODE")
      slug: String! @proxy(from: "fields.slug")
    }
  `);
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  getNodesByType,
  actions,
}) => {
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
        const fileName = parentNode.name;
        createNodeField({
          node,
          name: "fileName",
          value: fileName,
        });

        const fileRelativeDirectory = parentNode.relativeDirectory;
        createNodeField({
          node,
          name: "fileRelativeDirectory",
          value: fileRelativeDirectory,
        });

        if (typeof fileName === "string") {
          const allFileNodes = getNodesByType(`File`);
          const linkedFileNodes = sortBy(
            allFileNodes.filter((fileNode) => {
              return (
                fileNode.relativeDirectory === fileRelativeDirectory &&
                typeof fileNode.name === "string" &&
                fileNode.name.startsWith?.(fileName) &&
                fileNode.extension !== parentNode.extension
              );
            }),
            (fileNode) => fileNode.name,
          );

          createNodeField({
            node,
            name: "linkedFiles___NODE",
            value: linkedFileNodes.map((fileNode) => fileNode.id),
          });
        }
      }
    }
  }
};

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};
