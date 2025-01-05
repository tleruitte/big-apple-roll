import { Link } from "gatsby";
import React from "react";

import * as style from "src/components/pagination.module.css";

type Props = {
  previousSlug?: string;
  previousTitle?: string;
  nextSlug?: string;
  nextTitle?: string;
};

export default function Pagination(props: Props): React.JSX.Element {
  const { previousSlug, previousTitle, nextSlug, nextTitle } = props;

  return (
    <div className={style.pagination}>
      {previousSlug && previousTitle ? (
        <div className={style.paginationPrevious}>
          <Link to={previousSlug}>← {previousTitle}</Link>
        </div>
      ) : null}
      {nextSlug && nextTitle ? (
        <div className={style.paginationNext}>
          <Link to={nextSlug}>{nextTitle} →</Link>
        </div>
      ) : null}
    </div>
  );
}
