import { Schema} from "mongoose";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

let model = new Schema({
  id: { type: String, index: true },
  email: { type: String, index: true },
  firstname: { type: String },
  lastname: { type: String },
  othernames: { type: String },
  avatar: { type: String },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
    required: true,
  },
  permissions: {
    type: Array,
    default: [],
    required: true,
  },
  phone: { type: String },
  location: { type: String },
  password: {
    type: String,
    set: (value: string) => {
      const salt = bcrypt.genSaltSync();
      return (bcrypt.hashSync(value, salt));
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  verifiedemail: {
    type: Boolean,
    default: false,
    required: true,
  },
  verifiedphone: {
    type: Boolean,
    default: false,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  loginValidFrom: {
    type: String,
    default: Date.now(),
    required: true,
  },
  verifyToken: {
    type: String,
    default: null,
  },
  resetToken: {
    type: String,
    default: null,
  },
  updateToken: {
    type: String,
    default: null,
  },
  tokenExpires: {
    type: String,
    default: "0",
  }
}, { timestamps: true, collection: 'user' })


model.methods.toJSON = function () {
  const data = this._doc;

  delete data._id
  delete data.__v;
  delete data.password;
  delete data.verifyToken;
  delete data.resetToken;
  delete data.updateToken;
  delete data.tokenExpires;
  delete data.loginValidFrom;
  delete data.role;
  delete data.permissions;
  delete data.active;
  delete data.isDeleted;
  delete data.id;
  return data;
};

model.methods.validatePassword = function (val: string) {
  return bcrypt.compareSync(val, this.password);
};

const User = mongoose.model('User', model)

export { User };
