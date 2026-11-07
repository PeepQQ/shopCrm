export const subtractPercent = (value: number, percent: number) => {
  return value * (1 - percent / 100);
};

export const getDecreasePercent = (oldValue: number, newValue: number) => {
  return ((oldValue - newValue) / oldValue) * 100;
};

export const toFixedLength = (
  value: string | number,
  length: number,
): number => {
  return Number(Number(value).toFixed(length));
};

export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email);
};
