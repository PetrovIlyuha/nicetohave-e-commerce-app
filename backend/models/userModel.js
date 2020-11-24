import mongoose from 'mongoose';
// const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, index: true },
    avatar: { type: String },
    role: { type: String, default: 'subscriber' },
    cart: {
      type: Array,
      default: [],
    },
    address: { type: String },
    // wishlist: [{ type: ObjectId, ref: 'product' }],
  },
  { timestamps: true },
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
