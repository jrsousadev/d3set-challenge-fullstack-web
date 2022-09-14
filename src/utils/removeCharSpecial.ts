export const removeCharSpecial = (value: string) => {
  const newValue = value
    .replace('-', '')
    .replace('.', '')
    .replace('.', '')
    .replace('.', '')
    .replace('(', '')
    .replace(')', '')
    .replace('_________', '')
    .replace('/', '')
    .replace('_', '')
    .replace('_', '')
    .replace(/\s/g, '')
    .replace(/\s/g, '')
    .replace(/\s/g, '');

  const noIsValid = newValue.indexOf('_') !== -1 || newValue.indexOf('.') !== -1 || newValue.indexOf('/') !== -1;

  if (noIsValid) {
    return '';
  }

  return newValue;
};
