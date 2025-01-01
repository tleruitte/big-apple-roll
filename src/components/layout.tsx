import clsx from "clsx";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

import * as style from "src/components/layout.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props): React.JSX.Element {
  const { children } = props;

  const data = useStaticQuery<Queries.LayoutQuery>(graphql`
    query Layout {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <header className={style.header}>
        <div className={clsx(style.headerContent, style.content)}>
          <Link to="/" className={style.headerLogo}>
            {data.site?.siteMetadata?.title ?? ""}
          </Link>
          <nav className={style.headerNav}>
            <Link to="/schedule/" className={style.headerNavItem}>
              Schedule
            </Link>
            <Link to="/hotel/" className={style.headerNavItem}>
              Hotel
            </Link>
            <Link to="/sponsors/" className={style.headerNavItem}>
              Sponsors
            </Link>
          </nav>
        </div>
      </header>
      <main className={clsx(style.main, style.content)}>{children}</main>
    </>
  );
}
