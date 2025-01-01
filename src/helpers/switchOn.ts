const switchOn = <EnumType extends object, Result>(
  value: keyof EnumType,
  resultsByValue: Record<keyof EnumType, Result>,
): Result => {
  const result = resultsByValue[value];
  if (result === undefined) {
    throw new Error(`Missing value: ${String(value)}`);
  }
  return result;
};

export default switchOn;
