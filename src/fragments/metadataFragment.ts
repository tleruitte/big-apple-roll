import { graphql } from "gatsby";

export const metadataFragment = graphql`
  fragment MetadataFragment on MarkdownRemark {
    id
    fileName
    fileRelativeDirectory
    frontmatter {
      title
      year
    }
  }
`;
