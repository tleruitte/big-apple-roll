import { graphql } from "gatsby";

export const shopItemFragment = graphql`
  fragment ShopItemFragment on MarkdownRemark {
    id
    fileName
    fileRelativeDirectory
    html
    slug
    frontmatter {
      title
      order_index # Number to order items by
      price # Number (no currency symbol)
    }
  }
`;
