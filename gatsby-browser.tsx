import React from "react";
import { GatsbyBrowser } from "gatsby";

import Layout from "./src/components/layout";

import "./src/styles/font.css";
import "./src/styles/global.css";
import "./src/styles/theme.css";
import "./src/styles/variables.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = (args) => {
  const { element, props } = args;

  return <Layout {...props}>{element}</Layout>;
};
