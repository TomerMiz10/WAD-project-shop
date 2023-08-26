const axios = require('axios');

// Function to extract a book cover image from the API
const extractBookCoverImage = async (title, author) => {
    try {
        // Encode the book title and author name for the URL
        const encodedTitle = encodeURIComponent(title);
        const encodedAuthor = encodeURIComponent(author);

        const response = await axios.get(`https://bookcover-api.herokuapp.com/bookcover?book_title=${encodedTitle}&author_name=${encodedAuthor}`);
        const imageUrl = response.data.url;

        console.log('Book cover image extracted and saved successfully.');

        return imageUrl;

    } catch (error) {
        console.error('Error extracting book cover image:', error);
    }
};

module.exports = {
    extractBookCoverImage
};
