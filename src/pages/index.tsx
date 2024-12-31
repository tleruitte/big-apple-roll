import React from "react";
import { StaticImage } from "gatsby-plugin-image";

import * as style from "src/pages/index.module.css";
import Button from "src/components/button";
import LayoutHead from "src/components/layoutHead";

export default function Index() {
  return (
    <>
      <div className={style.indexLogo}>
        <StaticImage
          src="../images/logo.png"
          alt="Logo"
          placeholder="none"
          layout="fixed"
          width={500}
        />
      </div>
      <div className={style.indexDate}>August 1-4, 2023</div>
      <div className={style.indexMenu}>
        <Button label="Book a room" to="/hotel/" />
        <Button label="Schedule" to="/schedule/" />
      </div>
    </>
  );
}

export function Head() {
  return <LayoutHead />;
}
