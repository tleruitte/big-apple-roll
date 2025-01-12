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
    }
  }
`;
