import { navigate, PageProps } from "gatsby";
import { useCallback, useMemo } from "react";

export type ButtonProps = {
  id?: string;
  internalHref?: string | null;
  location?: PageProps["location"];
  externalHref?: string | null;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
};

const useButton = (props: ButtonProps) => {
  const { id, internalHref, location, externalHref, disabled, onClick } = props;

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        return;
      }

      if (internalHref !== undefined && internalHref !== null) {
        navigate(internalHref);
      }

      if (externalHref !== undefined && externalHref !== null) {
        window.open(externalHref, "_blank");
      }

      onClick?.(event);
    },
    [disabled, internalHref, externalHref, onClick],
  );

  const isCurrent = useMemo(() => {
    return internalHref && location?.pathname.startsWith(internalHref);
  }, [internalHref, location?.pathname]);

  return {
    id,
    disabled,
    isCurrent,
    handleClick,
  };
};

export default useButton;
