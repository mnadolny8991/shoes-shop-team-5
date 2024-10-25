export type ApiError = {
  status: number;
  name: string;
  message: string;
  details: {
    [key: string]: any;
  };
};
