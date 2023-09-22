export interface UserValidated {
  token: string;
  type: string;
  roles: string[];
  expirationDate: Date;
}
