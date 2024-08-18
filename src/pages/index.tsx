import "./index.css";

import React from "react";
import LayoutHead from "../components/layoutHead";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../components/button";

export default function Index() {
  return (
    <>
      <div className="index-logo">
        <StaticImage
          src="../images/logo.png"
          alt="Logo"
          placeholder="blurred"
          layout="fixed"
          width={500}
        />
      </div>
      <div className="index-date">August 1-4, 2023</div>
      <div className="index-menu">
        <Button label="Book a room" to="/hotel/" />
        <Button label="Schedule" to="/schedule/" />
      </div>
    </>
  );
}

export function Head() {
  return <LayoutHead />;
}
