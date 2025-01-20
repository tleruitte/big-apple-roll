import { navigate, PageProps } from "gatsby";
import { useCallback, useMemo } from "react";

export type ButtonProps = {
  id?: string;
  internalHref?: string | null;
  location?: PageProps["location"];
  externalHref?: string | null;
  onClick?: React.MouseEventHandler;
};

const useButton = (props: ButtonProps) => {
  const { id, internalHref, location, externalHref, onClick } = props;

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

  const isCurrent = useMemo(() => {
    return internalHref && location?.pathname.startsWith(internalHref);
  }, [internalHref, location?.pathname]);

  return {
    id,
    isCurrent,
    handleClick,
  };
};

export default useButton;
