import React from "react";
import { GatsbyBrowser } from "gatsby";

import PageLayout from "./src/components/layouts/pageLayout";

import "./src/components/style/variables/color.css";
import "./src/components/style/variables/font.css";
import "./src/components/style/variables/spacing.css";
import "./src/components/style/global.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = (args) => {
  const { element, props } = args;

  return <PageLayout {...props}>{element}</PageLayout>;
};
