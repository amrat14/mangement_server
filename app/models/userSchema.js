import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    school_name: { type: String, default: "" },
    school_id: { type: String, default: "" },
    display_picture: { type: String, default: "" },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    password: { type: String, default: "" },
    address: { type: String, default: "" },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    pincode: { type: Number, default: "" },
    role: { type: String, default: "" },
    permission_type: { type: String, default: "" },
    auth_key: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, index: { unique: true } },
    is_verified: { type: Boolean, default: false },
    is_loggedin: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    created_by: { type: String, default: "" },
    updated_by: { type: String, default: "" }
  },
  { timestamps: true }
);
userSchema.method({
  saveData: async function () {
    return this.save();
  },
});
userSchema.static({
  findData: function (findObj) {
    return this.find(findObj);
  },
  findOneData: function (findObj) {
    return this.findOne(findObj);
  },
  findOneAndUpdateData: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      upsert: false,
      new: true,
      setDefaultsOnInsert: true,
    });
  },
  registerUser: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  },
  findOneDataAndDelete: function (findObj) {
    return this.findOneAndDelete(findObj);
  },

  findAndUpdate: function (findObj, updateObj) {
    return this.update(findObj, updateObj);
  },

  findDataWithAggregate: function (findObj) {
    return this.aggregate(findObj);
  },
});
module.exports = mongoose.model("a0_user", userSchema);
