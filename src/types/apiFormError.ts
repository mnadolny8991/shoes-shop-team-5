export type ApiFormError = {
  error: Error;
};

export type ApiError = {
  status: number;
  name: string;
  message: string;
  details: ApiErrorDetails;
};

export type ApiErrorDetails = {
  errors: ApiErrorDetail[];
};

export type ApiErrorDetail = {
  path: string[];
  message: string;
  name: string;
};
