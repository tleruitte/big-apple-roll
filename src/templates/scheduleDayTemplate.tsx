import React from "react";

import { graphql, HeadProps, Link, PageProps } from "gatsby";

import LayoutHead from "src/components/layoutHead";
import { formatDate, formatTime } from "src/helpers/date";

export type ScheduleDayTemplateContext = {
  id: string;
  relativeDirectoryRegex: string;
};

export const query = graphql`
  query ScheduleDayTemplate($id: String!, $relativeDirectoryRegex: String!) {
    day: file(id: { eq: $id }) {
      name
      childMarkdownRemark {
        frontmatter {
          title
          date
        }
      }
    }
    events: allFile(
      sort: { childMarkdownRemark: { frontmatter: { date: ASC } } }
      filter: { relativeDirectory: { regex: $relativeDirectoryRegex } }
    ) {
      nodes {
        name
        childMarkdownRemark {
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

export default function ScheduleDayTemplate(
  props: PageProps<
    Queries.ScheduleDayTemplateQuery,
    ScheduleDayTemplateContext
  >,
): React.JSX.Element {
  const { data } = props;
  const { day, events } = data;

  console.log(
    "DEBUG: ScheduleDayTemplate",
    { props },
    JSON.stringify({}, null, 2),
  );

  if (!day || !day.childMarkdownRemark?.frontmatter?.date) {
    return <div />;
  }

  return (
    <div className="scheduleDayTemplate">
      <h1>{formatDate(day.childMarkdownRemark.frontmatter.date)}</h1>
      {events.nodes.map((node) => {
        const { title, date } = node.childMarkdownRemark?.frontmatter ?? {};
        if (!title || !date) {
          return null;
        }

        return (
          <div key={node.name}>
            {formatTime(date)}{" "}
            <Link to={`/schedule/${day.name}/${node.name}`}>{title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export function Head(
  props: HeadProps<
    Queries.ScheduleDayTemplateQuery,
    ScheduleDayTemplateContext
  >,
): React.JSX.Element {
  const { data } = props;
  return (
    <LayoutHead
      pageTitle={data.day?.childMarkdownRemark?.frontmatter?.title ?? undefined}
    />
  );
}
