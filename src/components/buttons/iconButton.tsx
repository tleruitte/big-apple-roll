import React from "react";

import * as style from "src/components/buttons/iconButton.module.css";
import useButton, { ButtonProps } from "src/components/buttons/useButton";
import Icon, { IconName } from "src/components/icon";

type Props = {
  iconName: IconName;
} & ButtonProps;

export default function IconButton(props: Props): React.JSX.Element | null {
  const { iconName } = props;

  const { id, handleClick } = useButton(props);

  return (
    <div className={style.iconButton} data-id={id} onClick={handleClick}>
      <Icon name={iconName}></Icon>
    </div>
  );
}
