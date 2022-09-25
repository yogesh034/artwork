export const cleanName = (_str: string) => {
  const name = _str.slice(0, -4);
  return name;
};
