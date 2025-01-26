import React from "react";

import TextButton from "src/components/buttons/textButton";
import Icon, { IconName } from "src/components/icon";
import * as classNames from "src/components/navigation.module.css";

type Props = {
  previousSlug?: string;
  previousTitle?: string;
  nextSlug?: string;
  nextTitle?: string;
};

export default function Navigation(props: Props): React.JSX.Element {
  const { previousSlug, previousTitle, nextSlug, nextTitle } = props;

  return (
    <div className={classNames.navigation}>
      {previousSlug && previousTitle ? (
        <div className={classNames.previous}>
          <TextButton internalHref={previousSlug}>
            <span className={classNames.label}>
              <Icon name={IconName.ArrowLeft} size="small" /> {previousTitle}
            </span>
          </TextButton>
        </div>
      ) : null}
      {nextSlug && nextTitle ? (
        <div className={classNames.next}>
          <TextButton internalHref={nextSlug}>
            <span className={classNames.label}>
              {nextTitle} <Icon name={IconName.ArrowRight} size="small" />
            </span>
          </TextButton>
        </div>
      ) : null}
    </div>
  );
}
