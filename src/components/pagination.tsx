import { Link } from "gatsby";
import React from "react";

import * as style from "src/components/pagination.module.css";

type Props = {
  previousHref?: string;
  previousTitle?: string;
  nextHref?: string;
  nextTitle?: string;
};

export default function Pagination(props: Props): React.JSX.Element {
  const { previousHref, previousTitle, nextHref, nextTitle } = props;

  return (
    <div className={style.pagination}>
      {previousHref && previousTitle ? (
        <div className={style.paginationPrevious}>
          <Link to={previousHref}>← {previousTitle}</Link>
        </div>
      ) : null}
      {nextHref && nextTitle ? (
        <div className={style.paginationNext}>
          <Link to={nextHref}>{nextTitle} →</Link>
        </div>
      ) : null}
    </div>
  );
}
