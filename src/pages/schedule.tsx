import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import LayoutHead from "src/components/layoutHead";

export default function Schedule(): React.JSX.Element {
  const data = useStaticQuery<Queries.ScheduleQuery>(graphql`
    query Schedule {
      allFile(
        filter: { relativeDirectory: { eq: "schedule" } }
        sort: { childMarkdownRemark: { frontmatter: { date: ASC } } }
      ) {
        nodes {
          name
          childMarkdownRemark {
            frontmatter {
              title
              date
              pre_bar
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <div className="schedule">Schedule</div>
      <div>
        {data.allFile.nodes.map((node) => {
          const { name } = node;
          const { title, date, pre_bar } =
            node.childMarkdownRemark?.frontmatter ?? {};
          if (!title || !date) {
            return null;
          }

          return (
            <div key={title}>
              <Link to={`/schedule/${name}`}>
                {title} {date} {pre_bar ? "PRE" : null}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function Head() {
  return <LayoutHead pageTitle="Schedule" />;
}
