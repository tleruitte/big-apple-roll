import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import HTML from "src/components/html";
import HeadLayout from "src/components/layouts/headLayout";

export default function Hotel(): React.JSX.Element {
  const { hotel } = useStaticQuery<Queries.HotelQuery>(graphql`
    query Hotel {
      hotel: markdownRemark(fileName: { eq: "hotel" }, fileRelativeDirectory: { eq: "hotel" }) {
        html
      }
    }
  `);

  return <HTML html={hotel?.html}></HTML>;
}

export function Head() {
  return <HeadLayout pageTitle="Hotel" />;
}
