import { graphql, PageProps } from "gatsby";
import React from "react";

export type ScheduleTemplateContext = {
  id: string;
};

export const query = graphql`
  query ScheduleTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;

export default function ScheduleTemplate(
  props: PageProps<Queries.ScheduleTemplateQuery, ScheduleTemplateContext>,
): React.JSX.Element {
  console.log(
    "DEBUG: schedule template",
    { props },
    JSON.stringify({}, null, 2),
  );
  const { data } = props;

  return (
    <div className="scheduleTemplate">
      {data.markdownRemark?.html ? (
        <div
          className="scheduleTemplate-description"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        ></div>
      ) : null}
    </div>
  );
}
