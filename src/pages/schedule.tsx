import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import * as style from "src/pages/schedule.module.css";
import HeadLayout from "src/components/layouts/headLayout";
import Button from "src/components/buttons/button";
import { formatDate } from "src/helpers/date";

export default function Schedule(): React.JSX.Element {
  const data = useStaticQuery<Queries.ScheduleQuery>(graphql`
    query Schedule {
      scheduleDays: allMarkdownRemark(
        filter: { fileRelativeDirectory: { eq: "schedule" } }
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          ...ScheduleDayFragment
        }
      }
    }
  `);

  return (
    <div className={style.schedule}>
      {data.scheduleDays.nodes.map((node) => {
        const { title, date, pre_bar } = node.frontmatter ?? {};
        if (!title || !date || !node.slug) {
          return null;
        }

        return (
          <div key={node.id}>
            <Button
              color={pre_bar ? "accent3" : undefined}
              size="large"
              to={node.slug}
              banner={pre_bar ? "Pre bar" : formatDate(date, { format: "short" })}
            >
              {title}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export function Head() {
  return <HeadLayout pageTitle="Schedule" />;
}
