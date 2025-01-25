import { useCallback } from "react";

/**
 * Usage:
 * ```
 * const callback = useCallbackId(useCallback((id, event) => { ... }, []))
 *
 * // render
 * <span data-id="id" onClick={callback}>...</span>
 * ```
 */
const useCallbackId = <
  Event extends React.UIEvent | React.FormEvent,
  CallbackId extends (id: string, event: Event) => void,
>(
  callback: CallbackId,
): ((event: Event) => void) => {
  return useCallback(
    (event: Event) => {
      const id = (() => {
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
          return "";
        }

        const idContainer = target.closest("[data-id]");
        const id = idContainer instanceof HTMLElement ? (idContainer?.dataset.id ?? "") : "";
        return id;
      })();

      return callback(id, event);
    },
    [callback],
  );
};

export default useCallbackId;
