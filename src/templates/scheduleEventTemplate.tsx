import { graphql, PageProps } from "gatsby";
import React from "react";

export type ScheduleEventTemplateContext = {
  id: string;
};

export const query = graphql`
  query ScheduleEventTemplate($id: String!) {
    event: file(id: { eq: $id }) {
      name
      childMarkdownRemark {
        frontmatter {
          title
          date
        }
      }
    }
  }
`;

export default function ScheduleEventTemplate(
  props: PageProps<
    Queries.ScheduleEventTemplateQuery,
    ScheduleEventTemplateContext
  >,
): React.JSX.Element {
  const { data } = props;
  const { event } = data;
  if (!event || !event.childMarkdownRemark?.frontmatter?.date) {
    return <div />;
  }

  return (
    <div className="scheduleEventTemplate">
      <h1>{event.childMarkdownRemark.frontmatter.title}</h1>
      {/* {data.markdownRemark?.html ? (
        <div
          className="scheduleEventTemplate-description"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        ></div>
      ) : null} */}
    </div>
  );
}
