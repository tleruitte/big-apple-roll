import React from "react";

import { graphql, HeadProps, Link, PageProps } from "gatsby";

import LayoutHead from "src/components/layoutHead";
import { formatDate, formatTime } from "src/helpers/date";

export type ScheduleDayTemplateContext = {
  day: string;
  relativeDirectoryRegex: string;
};

export const query = graphql`
  query ScheduleDayTemplate($day: String!, $relativeDirectoryRegex: String!) {
    day: file(relativeDirectory: { eq: "schedule" }, name: { eq: $day }) {
      name
      childMarkdownRemark {
        frontmatter {
          title
          date
        }
      }
    }
    events: allFile(
      filter: { relativeDirectory: { regex: $relativeDirectoryRegex } }
      sort: { childMarkdownRemark: { frontmatter: { date: ASC } } }
    ) {
      nodes {
        name
        childMarkdownRemark {
          frontmatter {
            title
            time
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

  const { name } = data.day ?? {};
  const { date } = data.day?.childMarkdownRemark?.frontmatter ?? {};
  if (!name || !date) {
    return <div />;
  }

  return (
    <div className="scheduleDayTemplate">
      <h1>{formatDate(date)}</h1>
      {data.events.nodes.map((node) => {
        const { title, time } = node.childMarkdownRemark?.frontmatter ?? {};
        if (!title || !time) {
          return null;
        }

        const formattedTime = formatTime(date, time);

        return (
          <div key={node.name}>
            {formattedTime}{" "}
            <Link to={`/schedule/${name}/${node.name}`}>{title}</Link>
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
