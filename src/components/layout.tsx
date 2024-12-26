import "./layout.css";

import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

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
      <header className="layout-header">
        <div className="layout-headerContent layout-content">
          <Link to="/" className="layout-headerLogo">
            {data.site?.siteMetadata?.title ?? ""}
          </Link>
          <nav className="layout-headerNav">
            <Link to="/schedule/" className="layout-headerNavItem">
              Schedule
            </Link>
            <Link to="/hotel/" className="layout-headerNavItem">
              Hotel
            </Link>
            <Link to="/sponsors/" className="layout-headerNavItem">
              Sponsors
            </Link>
          </nav>
        </div>
      </header>
      <main className="layout-content">{children}</main>
    </>
  );
}
