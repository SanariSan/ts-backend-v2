function isValidString(value?: unknown) {
  if (value !== undefined && typeof value === 'string' && value.length > 0) return true;
  return false;
}

export { isValidString };
