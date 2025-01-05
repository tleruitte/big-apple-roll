import { graphql } from "gatsby";

export const sponsorFragment = graphql`
  fragment SponsorFragment on MarkdownRemark {
    id
    fileName
    fileRelativeDirectory
    frontmatter {
      title # string
      type # Either "presenting", "supporting", or "general"
      url # string
    }
  }
`;
