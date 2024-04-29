export const validateEmail = (_: any, value: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailRegex.test(value)) {
    return Promise.reject(new Error("Email không hợp lệ"));
  }
  return Promise.resolve();
};
