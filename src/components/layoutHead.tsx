import { graphql, useStaticQuery } from "gatsby";
import React from "react";

type Props = {
  pageTitle?: string;
};

export default function LayoutHead(props: Props): React.JSX.Element {
  const { pageTitle: pageTitle } = props;

  const data = useStaticQuery<Queries.LayoutHeadQuery>(graphql`
    query LayoutHead {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <title>
        {pageTitle ?? ""}
        {pageTitle ? " - " : ""}
        {data.site?.siteMetadata?.title ?? ""}
      </title>
    </>
  );
}
