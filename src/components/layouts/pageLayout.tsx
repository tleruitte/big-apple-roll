import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import React, { useCallback, useState } from "react";

import Icon, { IconName } from "src/components/icon";
import * as style from "src/components/layouts/pageLayout.module.css";
import PageLayoutNav from "src/components/layouts/pageLayoutNav";
import Link from "src/components/link";

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

  const [showMenu, setShowMenu] = useState(false);

  const handleClickMenu = useCallback(() => {
    setShowMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  return (
    <>
      <header className={style.header}>
        <div className={clsx(style.headerContent, style.content)}>
          <Link to="/" className={style.headerLogo}>
            {data.site?.siteMetadata?.title ?? ""}
          </Link>
          <div className={style.desktopNav}>
            <PageLayoutNav />
          </div>
          <div className={style.mobileMenu}>
            <Link onClick={handleClickMenu}>
              <Icon name={IconName.Menu} />
            </Link>
          </div>
        </div>
      </header>
      <main className={clsx(style.main, style.content)}>{children}</main>
      {showMenu ? (
        <div className={style.mobileNav}>
          <div className={style.mobileNavClose}>
            <Link onClick={handleCloseMenu}>
              <Icon name={IconName.Close} />
            </Link>
          </div>
          <Link className={style.headerLogo} to="/" onClick={handleCloseMenu}>
            {data.site?.siteMetadata?.title ?? ""}
          </Link>
          <PageLayoutNav mobile onClick={handleCloseMenu} />
        </div>
      ) : null}
    </>
  );
}
