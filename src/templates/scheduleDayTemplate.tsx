import React from "react";
import { graphql, HeadProps, Link, PageProps } from "gatsby";

import * as style from "src/templates/scheduleDayTemplate.module.css";
import HeadLayout from "src/components/layouts/headLayout";
import { formatDate, formatTime } from "src/helpers/date";
import Pagination from "src/components/pagination";
import getParentSlug from "src/helpers/getParentSlug";

export type ScheduleDayTemplateContext = {
  scheduleDayId: string;
  previousScheduleDayId?: string;
  nextScheduleDayId?: string;
  scheduleEventsSlugRegex: string;
};

export const query = graphql`
  query ScheduleDayTemplate(
    $scheduleDayId: String!
    $previousScheduleDayId: String
    $nextScheduleDayId: String
    $scheduleEventsSlugRegex: String!
  ) {
    scheduleDay: markdownRemark(id: { eq: $scheduleDayId }) {
      ...ScheduleDayFragment
    }
    previousScheduleDay: markdownRemark(id: { eq: $previousScheduleDayId }) {
      ...ScheduleDayFragment
    }
    nextScheduleDay: markdownRemark(id: { eq: $nextScheduleDayId }) {
      ...ScheduleDayFragment
    }
    scheduleEvents: allMarkdownRemark(
      filter: { slug: { regex: $scheduleEventsSlugRegex } }
      sort: { frontmatter: { date: ASC } }
    ) {
      nodes {
        ...ScheduleEventFragment
      }
    }
  }
`;

export default function ScheduleDayTemplate(
  props: PageProps<Queries.ScheduleDayTemplateQuery, ScheduleDayTemplateContext>,
): React.JSX.Element {
  const { data } = props;
  const { scheduleDay, previousScheduleDay, nextScheduleDay, scheduleEvents } = data;

  if (!scheduleDay || !scheduleDay.frontmatter?.date) {
    return <div />;
  }

  return (
    <>
      <Pagination
        previousSlug={getParentSlug(scheduleDay?.slug)}
        previousTitle="Schedule"
      ></Pagination>
      <h1>{formatDate(scheduleDay.frontmatter.date)}</h1>
      <div className={style.events}>
        {scheduleEvents.nodes.map((node) => {
          const { title, date } = node.frontmatter ?? {};
          if (!title || !date || !node.slug) {
            return null;
          }

          return (
            <div key={node.id} className={style.event}>
              <div className={style.eventTime}>
                <span className={style.eventTimeText}>{formatTime(date)}</span>
              </div>
              <div className={style.eventSeparator}></div>
              <div className={style.eventName}>
                <span className={style.eventNameText}>
                  <Link to={node.slug} draggable={false}>
                    {title}
                  </Link>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.pagination}>
        <Pagination
          previousSlug={previousScheduleDay?.slug ?? undefined}
          previousTitle={previousScheduleDay?.frontmatter?.title ?? undefined}
          nextSlug={nextScheduleDay?.slug ?? undefined}
          nextTitle={nextScheduleDay?.frontmatter?.title ?? undefined}
        ></Pagination>
      </div>
    </>
  );
}

export function Head(
  props: HeadProps<Queries.ScheduleDayTemplateQuery, ScheduleDayTemplateContext>,
): React.JSX.Element {
  const { data } = props;
  return <HeadLayout pageTitle={data.scheduleDay?.frontmatter?.title ?? undefined} />;
}
