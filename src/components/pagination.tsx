import React from "react";

import LinkButton from "src/components/buttons/linkButton";
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
          <LinkButton to={previousSlug}>← {previousTitle}</LinkButton>
        </div>
      ) : null}
      {nextSlug && nextTitle ? (
        <div className={style.paginationNext}>
          <LinkButton to={nextSlug}>{nextTitle} →</LinkButton>
        </div>
      ) : null}
    </div>
  );
}
