import React, { useCallback } from "react";

type Props = {
  type: "text" | "email" | "tel" | "date";
  value: string;
  onChange: (value: string) => void;
};

export default function TextInput(props: Props): React.JSX.Element | null {
  const { type = "text", value, onChange } = props;

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return <input type={type} value={value} onChange={handleOnChange} />;
}
