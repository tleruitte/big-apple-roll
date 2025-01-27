import { graphql } from "gatsby";

export const galleryYearFragment = graphql`
  fragment GalleryYearFragment on MarkdownRemark {
    id
    fileName
    fileRelativeDirectory
    slug
    frontmatter {
      links
    }
  }
`;
