import clsx from "clsx";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import React, { useCallback, useState } from "react";

import IconButton from "src/components/buttons/iconButton";
import LinkButton from "src/components/buttons/linkButton";
import { IconName } from "src/components/icon";
import * as style from "src/components/layouts/pageLayout.module.css";
import PageLayoutNav from "src/components/layouts/pageLayoutNav";

type Props = {
  children: React.ReactNode;
};

export default function PageLayout(props: Omit<PageProps, "children"> & Props): React.JSX.Element {
  const { location, children } = props;

  const { metadata } = useStaticQuery<Queries.LayoutQuery>(graphql`
    query Layout {
      metadata: markdownRemark(fileName: { eq: "metadata" }, fileRelativeDirectory: { eq: "" }) {
        ...MetadataFragment
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
          <LinkButton internalHref="/" noDecoration>
            <span className={style.headerLogo}>{metadata?.frontmatter?.title ?? ""}</span>
          </LinkButton>
          <div className={style.desktopNav}>
            <PageLayoutNav location={location} />
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
          <LinkButton internalHref="/" noDecoration onClick={handleCloseMenu}>
            <span className={style.headerLogo}>{metadata?.frontmatter?.title ?? ""}</span>
          </LinkButton>
          <PageLayoutNav location={location} mobile onClick={handleCloseMenu} />
        </div>
      ) : null}
    </>
  );
}
