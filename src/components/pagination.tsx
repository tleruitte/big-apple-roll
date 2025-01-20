import React from "react";

import TextButton from "src/components/buttons/textButton";
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
          <TextButton internalHref={previousSlug}>← {previousTitle}</TextButton>
        </div>
      ) : null}
      {nextSlug && nextTitle ? (
        <div className={style.paginationNext}>
          <TextButton internalHref={nextSlug}>{nextTitle} →</TextButton>
        </div>
      ) : null}
    </div>
  );
}
