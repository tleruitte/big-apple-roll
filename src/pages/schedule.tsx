import React from "react";
import { graphql, Link, PageProps, useStaticQuery } from "gatsby";
import LayoutHead from "../components/layoutHead";

export default function Schedule(props: PageProps): React.JSX.Element {
  const data = useStaticQuery<Queries.ScheduleQuery>(graphql`
    query Schedule {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/content/schedule/" } }
      ) {
        nodes {
          id
          frontmatter {
            slug
            title
          }
        }
      }
    }
  `);

  return (
    <>
      <div className="schedule">Schedule</div>
      <div>
        {data.allMarkdownRemark.nodes.map((node) => {
          const { frontmatter } = node;
          if (!frontmatter) {
            return null;
          }

          const { slug, title } = frontmatter;
          if (!slug || !title) {
            return null;
          }

          return (
            <div key={node.id}>
              <Link to={`/schedule/${slug}`}>{title}</Link>
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
