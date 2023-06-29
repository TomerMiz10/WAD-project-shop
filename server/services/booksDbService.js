const Book = require("../models/bookModel");
const { getBookDetails, extractBookDescription } = require('./googlebookService');
const { extractBookCoverImage } = require('./bookimagesService');

const axios = require('axios');


const createBookByAdmin = async (data) => {
  const { bookID, title, price } = data;

  try {
    const bookDetails = await getBookDetails(title);

    // Extract the relevant book information including the image links and description
    const { imageLinks, description } = bookDetails;

    // Create a new book with the extracted information
    const newBook = new Book({ bookID, title, price, imageLinks, description });

    return await newBook.save();
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while fetching book details from the Google Books API.');
  }
};


const getAllBooks = async () => await Book.find({});

const updateBookCoverImages = async () => {
  try {
    const books = await getAllBooks();
    for (const book of books) {

      const { title, author } = book;

      const imageURL = await extractBookCoverImage(title, author);

      // Update the book's image links in the database
      await Book.findOneAndUpdate(
          { title: title },
          { $set: { image: imageURL } },
          { new: true, useFindAndModify: false }
      );
    }

    console.log('Book images updated successfully.');
  } catch (error) {
    console.error('Error extracting book cover image:', error);
  }
}

const getBooksBySearch = async (query) => {
  const searchQuery = {};

  if (query.title) {
    searchQuery.title = { $regex: query.title, $options: "i" };
  }

  if (query.author) {
    searchQuery.author = { $regex: query.author, $options: "i" };
  }

  return Book.find(searchQuery);
};

const getBookByID = async (bookID) => await Book.findOne({ bookID });

const getBooksByGenre = async (genre) => await Book.find({ genre });

module.exports = {
  createBookByAdmin,
  getAllBooks,
  getBooksBySearch,
  getBookByID,
  updateBookCoverImages,
  getBooksByGenre,
};