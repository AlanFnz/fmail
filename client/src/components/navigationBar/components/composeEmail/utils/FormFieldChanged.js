export const FormFieldChanged = (originalForm, currentForm) => {
  const keys = Object.keys(originalForm);
  return keys.some((key) => {
    return originalForm[key] !== currentForm[key];
  });
};

export default FormFieldChanged;
