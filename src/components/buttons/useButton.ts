import { navigate, PageProps, withPrefix } from "gatsby";
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

  const href = useMemo(() => {
    if (internalHref) {
      return withPrefix(internalHref);
    } else if (externalHref) {
      return externalHref;
    }
    return "";
  }, [externalHref, internalHref]);

  const isCurrent = useMemo(() => {
    return internalHref && location?.pathname.startsWith(withPrefix(internalHref));
  }, [internalHref, location?.pathname]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();

      if (disabled) {
        return;
      }

      if (internalHref !== undefined && internalHref !== null) {
        if (event.metaKey) {
          window.open(withPrefix(internalHref), "_blank");
          return;
        }

        navigate(internalHref);
      }

      if (externalHref !== undefined && externalHref !== null) {
        window.open(externalHref, "_blank");
        return;
      }

      onClick?.(event);
    },
    [disabled, internalHref, externalHref, onClick],
  );

  return {
    id,
    disabled,
    href,
    isCurrent,
    handleClick,
  };
};

export default useButton;
