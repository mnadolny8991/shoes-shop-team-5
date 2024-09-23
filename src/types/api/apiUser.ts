export type ApiUserAttributes = {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
};

export type ApiUser = {
  data: {
    id: number;
    attributes: ApiUserAttributes;
  };
};

export type ApiLoginResponse = {
  jwt: string;
  user: ApiUserAttributes & { id: number };
};
