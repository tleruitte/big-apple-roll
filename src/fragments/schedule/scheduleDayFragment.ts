import { graphql } from "gatsby";

export const scheduleDayFragment = graphql`
  fragment ScheduleDayFragment on MarkdownRemark {
    id
    fileName
    frontmatter {
      title
      date # Format: YYYY-MM-DD
      pre_bar # Boolean (optional)
    }
  }
`;
