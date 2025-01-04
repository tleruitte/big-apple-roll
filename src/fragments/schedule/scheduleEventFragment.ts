import { graphql } from "gatsby";

export const scheduleEventFragment = graphql`
  fragment ScheduleEventFragment on MarkdownRemark {
    id
    fileName
    fileRelativeDirectory
    html
    frontmatter {
      title
      date # Format: YYYY-MM-DD HH:mm:ss
      difficulty # Either moderate
      start # string, optional
      start_map # Link to google maps, optional
      end # string, optional
      leader # string, optional
      distance # string, optional
      highlights # string, optional
      route_map # Link to google maps, optional
    }
  }
`;
