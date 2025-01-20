import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import React, { useCallback, useState } from "react";

import Button from "src/components/buttons/button";
import IconButton from "src/components/buttons/iconButton";
import { IconName } from "src/components/icon";
import * as style from "src/components/layouts/pageLayout.module.css";
import PageLayoutNav from "src/components/layouts/pageLayoutNav";

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
          <Button internalHref="/">
            <span className={style.headerLogo}>{data.site?.siteMetadata?.title ?? ""}</span>
          </Button>
          <div className={style.desktopNav}>
            <PageLayoutNav />
          </div>
          <div className={style.mobileMenu}>
            <IconButton iconName={IconName.Menu} onClick={handleClickMenu}></IconButton>
          </div>
        </div>
      </header>
      <main className={clsx(style.main, style.content)}>{children}</main>
      {showMenu ? (
        <div className={style.mobileNav}>
          <div className={style.mobileNavClose}>
            <IconButton iconName={IconName.Close} onClick={handleCloseMenu} />
          </div>
          <Button internalHref="/" onClick={handleCloseMenu}>
            <span className={style.headerLogo}>{data.site?.siteMetadata?.title ?? ""}</span>
          </Button>
          <PageLayoutNav mobile onClick={handleCloseMenu} />
        </div>
      ) : null}
    </>
  );
}
