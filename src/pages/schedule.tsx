import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import * as style from "src/pages/schedule.module.css";
import LayoutHead from "src/components/layoutHead";
import Button from "src/components/button";
import { formatDate } from "src/helpers/date";

export default function Schedule(): React.JSX.Element {
  const data = useStaticQuery<Queries.ScheduleQuery>(graphql`
    query Schedule {
      allFile(
        sort: { childMarkdownRemark: { frontmatter: { date: ASC } } }
        filter: { relativeDirectory: { eq: "schedule" } }
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
    <div className={style.schedule}>
      {data.allFile.nodes.map((node) => {
        const { name } = node;
        const { title, date, pre_bar } =
          node.childMarkdownRemark?.frontmatter ?? {};
        if (!title || !date) {
          return null;
        }

        return (
          <div key={title}>
            <Button
              color={pre_bar ? "blue" : undefined}
              size="large"
              to={`/schedule/${name}`}
              banner={
                pre_bar ? "Pre bar" : formatDate(date, { format: "short" })
              }
              label={title}
            ></Button>
          </div>
        );
      })}
    </div>
  );
}

export function Head() {
  return <LayoutHead pageTitle="Schedule" />;
}
