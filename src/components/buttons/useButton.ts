import { navigate } from "gatsby";
import { useCallback } from "react";

export type ButtonProps = {
  id?: string;
  internalHref?: string | null;
  externalHref?: string | null;
  onClick?: React.MouseEventHandler;
};

const useButton = (props: ButtonProps) => {
  const { id, internalHref, externalHref, onClick } = props;

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (internalHref !== undefined && internalHref !== null) {
        navigate(internalHref);
      }

      if (externalHref !== undefined && externalHref !== null) {
        window.open(externalHref, "_blank");
      }

      onClick?.(event);
    },
    [internalHref, externalHref, onClick],
  );

  return {
    id,
    handleClick,
  };
};

export default useButton;
