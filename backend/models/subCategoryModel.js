import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const subCategorySchema = new mongoose.Schema(
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
    image: { type: String, required: true },
    parent: { type: ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true },
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
