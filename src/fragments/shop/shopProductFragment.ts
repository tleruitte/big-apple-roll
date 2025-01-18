import { graphql } from "gatsby";

export enum ShopProductColor {
  Green = "green",
  Orange = "orange",
  Blue = "blue",
}

export const shopProductFragment = graphql`
  fragment ShopProductFragment on MarkdownRemark {
    id
    fileName
    fileRelativeDirectory
    html
    slug
    frontmatter {
      title
      color # Either "green", "orange", or "blue"
      order_index # Number to order items by
      price # Number (no currency symbol)
    }
  }
`;
