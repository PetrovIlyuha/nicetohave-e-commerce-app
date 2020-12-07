import e from 'express';
import mongoose from 'mongoose';

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 40,
    default: 'Unknown Manufactuter',
  },
});

const brandModel = mongoose.model('Brand', brandSchema);

export default brandModel;
