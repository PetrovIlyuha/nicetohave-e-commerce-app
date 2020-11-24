import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Category name is required',
      minlength: [3, 'category name must be at least 4 characters long'],
      maxlength: [40, 'category name must not exceed 28 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true },
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
