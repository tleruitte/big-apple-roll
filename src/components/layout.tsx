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
      <header className={style.layoutHeader}>
        <div className={clsx(style.layoutHeaderContent, style.layoutContent)}>
          <Link to="/" className={style.layoutHeaderLogo}>
            {data.site?.siteMetadata?.title ?? ""}
          </Link>
          <nav className={style.layoutHeaderNav}>
            <Link to="/schedule/" className={style.layoutHeaderNavItem}>
              Schedule
            </Link>
            <Link to="/hotel/" className={style.layoutHeaderNavItem}>
              Hotel
            </Link>
            <Link to="/sponsors/" className={style.layoutHeaderNavItem}>
              Sponsors
            </Link>
          </nav>
        </div>
      </header>
      <main className={clsx(style.layoutMain, style.layoutContent)}>
        {children}
      </main>
    </>
  );
}
