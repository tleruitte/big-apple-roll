import React from "react";

import TextButton from "src/components/buttons/textButton";
import Icon, { IconName } from "src/components/icon";
import * as style from "src/components/navigation.module.css";

type Props = {
  previousSlug?: string;
  previousTitle?: string;
  nextSlug?: string;
  nextTitle?: string;
};

export default function Navigation(props: Props): React.JSX.Element {
  const { previousSlug, previousTitle, nextSlug, nextTitle } = props;

  return (
    <div className={style.navigation}>
      {previousSlug && previousTitle ? (
        <div className={style.previous}>
          <TextButton internalHref={previousSlug}>
            <span className={style.label}>
              <Icon name={IconName.ArrowLeft} size="small" /> {previousTitle}
            </span>
          </TextButton>
        </div>
      ) : null}
      {nextSlug && nextTitle ? (
        <div className={style.next}>
          <TextButton internalHref={nextSlug}>
            <span className={style.label}>
              {nextTitle} <Icon name={IconName.ArrowRight} size="small" />
            </span>
          </TextButton>
        </div>
      ) : null}
    </div>
  );
}
