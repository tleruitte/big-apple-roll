import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import SurfaceButton from "src/components/buttons/surfaceButton";
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
        <SurfaceButton internalHref="/hotel/">Book a room</SurfaceButton>
        <SurfaceButton internalHref="/registration/">Register</SurfaceButton>
      </div>
    </>
  );
}

export function Head() {
  return <HeadLayout />;
}
