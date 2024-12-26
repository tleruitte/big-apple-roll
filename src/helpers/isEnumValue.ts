const isEnumValue = <EnumType extends object>(
  value: unknown,
  enumType: EnumType,
): value is EnumType[keyof EnumType] => {
  return Object.values(enumType).includes(value);
};

export default isEnumValue;
