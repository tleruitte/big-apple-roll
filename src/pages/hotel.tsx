import React from "react";
import { PageProps } from "gatsby";

import LayoutHead from "../components/layoutHead";

export default function Hotel(props: PageProps): React.JSX.Element {
  return <div className="Hotel">Hotel</div>;
}

export function Head() {
  return <LayoutHead pageTitle="Hotel" />;
}
