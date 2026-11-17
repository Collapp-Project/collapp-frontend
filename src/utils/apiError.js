/** Clave que usa el backend para los errores de validación que no son de un campo. */
export const FORM_ERROR_KEY = "_form";

/** Normaliza un error de axios al contrato ApiError del backend. */
export const getApiError = (err) => {
  const response = err?.response;
  const data = response?.data;

  const validationErrors = data?.fields ?? {};
  const formError = validationErrors[FORM_ERROR_KEY] ?? null;

  const fieldErrors = { ...validationErrors };
  delete fieldErrors[FORM_ERROR_KEY];

  return {
    status: response?.status ?? null,
    code: data?.error ?? null,
    message: data?.message ?? null,
    fieldErrors,
    formError,
  };
};

/** Mensaje del backend, o el de respaldo si la respuesta no trae ninguno. */
export const getErrorMessage = (err, fallback) => getApiError(err).message || fallback;

/** `true` si hay errores asociados a campos concretos del formulario. */
export const hasFieldErrors = (apiError) => Object.keys(apiError.fieldErrors).length > 0;
