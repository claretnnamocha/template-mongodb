import { Query } from "mongoose";

interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  location?: string;
  deleted?: boolean;
  verifiedemail?: boolean;
  verifiedphone?: boolean;
  active?: boolean;
  createdAt?: Date;
  loginValidFrom?: string;
  toJSON?: Function;
  validatePassword?: Function;
  updatedAt?: Date;
  verifyToken?: string;
  resetToken?: string;
  updateToken?: string;
  tokenExpires?: string;
}

export interface UserSchema extends Query<any, any>, User {}
