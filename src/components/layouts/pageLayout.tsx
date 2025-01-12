import clsx from "clsx";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

import * as style from "src/components/layouts/pageLayout.module.css";

type Props = {
  children: React.ReactNode;
};

export default function PageLayout(props: Props): React.JSX.Element {
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
          <Link to="/" className={style.headerLogo} draggable={false}>
            {data.site?.siteMetadata?.title ?? ""}
          </Link>
          <nav className={style.headerNav}>
            <Link to="/schedule/" className={style.headerNavItem} draggable={false}>
              Schedule
            </Link>
            <Link to="/hotel/" className={style.headerNavItem} draggable={false}>
              Hotel
            </Link>
            <Link to="/sponsors/" className={style.headerNavItem} draggable={false}>
              Sponsors
            </Link>
            <Link to="/shop/" className={style.headerNavItem} draggable={false}>
              Shop
            </Link>
          </nav>
        </div>
      </header>
      <main className={clsx(style.main, style.content)}>{children}</main>
    </>
  );
}
