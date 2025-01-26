import React from "react";

import HeadLayout from "src/components/layouts/headLayout";

export default function NotFound404(): React.JSX.Element {
  return <h1>Not found</h1>;
}

export function Head(): React.JSX.Element {
  return <HeadLayout pageTitle="Not found" />;
}
