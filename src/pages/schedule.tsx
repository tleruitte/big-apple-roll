import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import * as style from "src/pages/schedule.module.css";
import HeadLayout from "src/components/layouts/headLayout";
import Button from "src/components/button";
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
        const { fileName } = node;
        const { title, date, pre_bar } = node.frontmatter ?? {};
        if (!title || !date) {
          return null;
        }

        return (
          <div key={node.id}>
            <Button
              color={pre_bar ? "blue" : undefined}
              size="large"
              to={`/schedule/${fileName}`}
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
  return <HeadLayout pageTitle="Schedule" />;
}
