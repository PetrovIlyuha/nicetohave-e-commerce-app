import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 20,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    subcategories: [
      {
        type: ObjectId,
        ref: 'SubCategory',
      },
    ],
    quantity: {
      type: Number,
      default: 1,
      required: true,
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: Boolean,
    },
    color: {
      type: String,
      enum: [
        'Black',
        'White',
        'Silver',
        'Gold',
        'Red',
        'Blue',
        'Green',
        'Orange',
        'Brown',
        'Green',
        'Blue',
      ],
    },
    brand: {
      type: ObjectId,
      ref: 'Brand',
    },
    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: 'User' },
    //   },
    // ],
  },
  { timestamps: true },
);

const productModel = mongoose.model('Product', productSchema);

export default productModel;
