import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import Button from "src/components/buttons/button";
import HeadLayout from "src/components/layouts/headLayout";
import * as style from "src/pages/index.module.css";

export default function Index() {
  return (
    <>
      <div className={style.logo}>
        <StaticImage
          src="../components/images/logo.png"
          alt="Logo"
          placeholder="none"
          layout="constrained"
          width={500}
        />
      </div>
      <h2 className={style.date}>August 1-4, 2024</h2>
      <div className={style.menu}>
        <Button to="/schedule/">Schedule</Button>
        <Button to="/hotel/">Book a room</Button>
      </div>
    </>
  );
}

export function Head() {
  return <HeadLayout />;
}
