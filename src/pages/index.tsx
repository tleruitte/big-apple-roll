import React from "react";
import { StaticImage } from "gatsby-plugin-image";

import * as style from "src/pages/index.module.css";
import Button from "src/components/button";
import LayoutHead from "src/components/layoutHead";

export default function Index() {
  return (
    <>
      <div className={style.logo}>
        <StaticImage
          src="../images/logo.png"
          alt="Logo"
          placeholder="none"
          layout="fixed"
          width={500}
        />
      </div>
      <div className={style.date}>August 1-4, 2024</div>
      <div className={style.menu}>
        <Button label="Book a room" to="/hotel/" />
        <Button label="Schedule" to="/schedule/" />
      </div>
    </>
  );
}

export function Head() {
  return <LayoutHead />;
}
