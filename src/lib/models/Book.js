import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this book.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  author: {
    type: String,
    required: [true, "Please provide the author's name."],
    maxlength: [60, "Author's name cannot be more than 60 characters"],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  category: {
    type: String,
    required: [true, 'Please specify the category of your book.'],
  },
  available_quantity: {
    type: Number,
    required: [true, 'Please specify the available quantity.'],
    min: [0, 'Quantity cannot be less than 0'],
  },
  image_url: {
    type: String,
    required: [true, 'Please provide an image url for this book.'],
  },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
